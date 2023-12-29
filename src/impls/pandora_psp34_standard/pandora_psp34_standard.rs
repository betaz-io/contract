use crate::traits::error::Error;
pub use crate::{
    impls::pandora_psp34_standard::{
        data,
        data::*,
        pandora_psp34_standard,
        *,
    },
    traits::pandora_psp34_standard::*,
};
use ink::prelude::{
    string::{String, ToString},
    vec::Vec,
};
use openbrush::{
    contracts::{
        access_control::*,
        ownable::*,
        pausable::*,
        psp22::extensions::burnable::*,
        psp34::extensions::{enumerable::*, metadata::*},
    },
    modifier_definition, modifiers,
    traits::{AccountId, Balance, Storage},
};

use ink::env::CallFlags;

#[modifier_definition]
pub fn only_token_owner<T, F, R, E>(
    instance: &mut T,
    body: F,
    token_owner: AccountId,
) -> Result<R, E>
where
    T: Storage<Manager>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<Error>,
{
    if token_owner != T::env().caller() {
        return Err(From::from(Error::NotTokenOwner));
    }
    body(instance)
}

pub trait Psp34TraitsImpl:
    Storage<Manager>
    + PSP34
    + psp34::Internal
    + Storage<psp34::Data>
    + metadata::Internal
    + metadata::PSP34MetadataImpl
    + Storage<metadata::Data>
    + ownable::Ownable
    + pausable::Pausable
    + Storage<ownable::Data>
    + Storage<pausable::Data>
    + ownable::Internal
    + pausable::Internal
    + Storage<enumerable::Data>
    + access_control::MembersManager
    + access_control::Internal
    + access_control::AccessControlImpl
    + Storage<access_control::Data>
{
    // EMIT EVENTS
    fn _emit_public_buy_event(&self, _buyer: AccountId, _amounts: u64, _betaz_price: Balance);

    // EXECUTE FUNCTIONS
    // Change state contract
    #[modifiers(only_role(ADMINER))]
    fn change_state(&mut self, state: bool) -> Result<(), Error> {
        if self._paused() == state {
            return Err(Error::InvalidState);
        }
        Ok(self._switch_pause()?)
    }

    /// Lock nft - Only owner token
    #[modifiers(only_token_owner(self.owner_of(token_id.clone()).unwrap()))]
    fn lock(&mut self, token_id: Id) -> Result<(), Error> {
        if let Some(locked_token_count) = self.data::<Manager>().locked_token_count.checked_add(1) {
            self.data::<Manager>().locked_token_count = locked_token_count;
            self.data::<Manager>()
                .locked_tokens
                .insert(&token_id, &true);
            return Ok(());
        } else {
            return Err(Error::Custom(String::from(
                "Cannot increase locked token count",
            )));
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn burn_betaz_token(&mut self) -> Result<(), Error> {
    
        let betaz_balance = PSP22Ref::balance_of(
            &self.data::<Manager>().betaz_token_address,
            Self::env().account_id(),
        );
        let result = Psp22Ref::burn(
            &self.data::<Manager>().betaz_token_address,
            Self::env().account_id(),
            betaz_balance,
        );
        if result.is_err() {
            return Err(Error::CannotBurn);
        }
        Ok(())
    }

    #[modifiers(when_not_paused)]
    fn public_buy(&mut self, amounts: u64) -> Result<(), Error> {
        let caller = Self::env().caller();

        // Transfer BETAZ Token from Caller to pandora pool Contract
        let fee: u128 = self
            .data::<Manager>()
            .public_mint_price
            .checked_mul(amounts as u128)
            .unwrap();
        let betaz_balance =
            PSP22Ref::balance_of(&self.data::<Manager>().betaz_token_address, caller);

        // Check psp22 balance and allowance of caller
        let allowance = Psp22Ref::allowance(
            &self.data::<Manager>().betaz_token_address,
            caller,
            Self::env().account_id(),
        );

        if allowance < fee || betaz_balance < fee {
            return Err(Error::InvalidBalanceAndAllowance);
        }

        let builder = PSP22Ref::transfer_from_builder(
            &self.data::<Manager>().betaz_token_address,
            caller,
            Self::env().account_id(),
            fee,
            Vec::<u8>::new(),
        )
        .call_flags(CallFlags::default().set_allow_reentry(true));

        let transfer_betaz_result = match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        };

        if transfer_betaz_result.is_ok() {
            let start = self.data::<Manager>().last_token_id;
            for i in start..amounts.checked_add(start).unwrap() {
                let token_id = i.checked_add(1).unwrap();
                self.data::<Manager>().last_token_id = token_id;
                if psp34::Internal::_mint_to(self, caller, Id::U64(token_id)).is_err() {
                    return Err(Error::CannotMint);
                }
            }

            self._emit_public_buy_event(caller, amounts, fee)
        }

        Ok(())
    }

    // SET FUNCTIONS
    /// Change baseURI
    #[modifiers(only_role(ADMINER))]
    fn set_base_uri(&mut self, uri: String) -> Result<(), Error> {
        metadata::Internal::_set_attribute(self, Id::U8(0), String::from("baseURI"), uri);
        Ok(())
    }

    /// Only Owner can set multiple attributes to a token
    #[modifiers(only_role(ADMINER))]
    fn set_multiple_attributes(
        &mut self,
        token_id: Id,
        metadata: Vec<(String, String)>,
    ) -> Result<(), Error> {
        if token_id == Id::U64(0) {
            return Err(Error::InvalidInput);
        }
        if self.is_locked_nft(token_id.clone()) {
            return Err(Error::Custom(String::from("Token is locked")));
        }
        for (attribute, value) in &metadata {
            add_attribute_name(self, &attribute.clone().into_bytes())?;
            metadata::Internal::_set_attribute(
                self,
                token_id.clone(),
                attribute.clone(),
                value.clone(),
            );
        }
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    fn set_betaz_token_address(&mut self, account: AccountId) -> Result<(), Error> {
        self.data::<Manager>().betaz_token_address = account;
        Ok(())
    }

    /// set public_mint_price
    #[modifiers(only_role(ADMINER))]
    fn set_public_mint_price(&mut self, price: Balance) -> Result<(), Error> {
        Ok(self.data::<Manager>().public_mint_price = price)
    }

    // GET FUNCTIONS
    /// get public_mint_price
    fn get_public_mint_price(&self) -> Balance {
        self.data::<Manager>().public_mint_price
    }

    /// get betaz address
    fn get_betaz_token_address(&self) -> AccountId {
        self.data::<Manager>().betaz_token_address
    }

    /// Get Token Count
    fn get_last_token_id(&self) -> u64 {
        return self.data::<Manager>().last_token_id;
    }

    /// Check token is locked or not
    fn is_locked_nft(&self, token_id: Id) -> bool {
        if self
            .data::<Manager>()
            .locked_tokens
            .get(&token_id)
            .is_some()
        {
            return true;
        }
        return false;
    }

    /// Get Locked Token Count
    fn get_locked_token_count(&self) -> u64 {
        self.data::<Manager>().locked_token_count
    }

    /// Get multiple  attributes
    fn get_attributes(&self, token_id: Id, attributes: Vec<String>) -> Vec<String> {
        let length = attributes.len();
        let mut ret = Vec::<String>::new();
        for i in 0..length {
            let attribute = attributes[i].clone();
            let value =
                metadata::PSP34MetadataImpl::get_attribute(self, token_id.clone(), attribute);

            if let Some(value_in_bytes) = value {
                if let Ok(value_in_string) = String::from_utf8(value_in_bytes.into()) {
                    ret.push(value_in_string);
                } else {
                    ret.push(String::from(""));
                }
            } else {
                ret.push(String::from(""));
            }
        }
        ret
    }

    /// Get Attribute Count
    fn get_attribute_count(&self) -> u32 {
        self.data::<Manager>().attribute_count
    }
    /// Get Attribute Name
    fn get_attribute_name(&self, index: u32) -> String {
        let attribute = self.data::<Manager>().attribute_names.get(&index);

        if let Some(value_in_bytes) = attribute {
            if let Ok(value_in_string) = String::from_utf8(value_in_bytes) {
                return value_in_string;
            } else {
                return String::from("");
            }
        } else {
            return String::from("");
        }
    }

    /// Get URI from token ID
    fn token_uri(&self, token_id: u64) -> String {
        let value =
            metadata::PSP34MetadataImpl::get_attribute(self, Id::U8(0), String::from("baseURI"));
        let mut token_uri = String::from("");

        if let Some(value_in_bytes) = value {
            if let Ok(value_in_string) = String::from_utf8(value_in_bytes.into()) {
                token_uri = value_in_string;
            }
        }

        token_uri = token_uri + &token_id.to_string() + &String::from(".json");
        token_uri
    }

    /// Get owner address
    fn get_owner(&self) -> Option<AccountId> {
        ownable::Ownable::owner(self)
    }
}

fn add_attribute_name<T: Storage<Manager>>(
    instance: &mut T,
    attribute_input: &Vec<u8>,
) -> Result<(), Error> {
    if let Ok(attr_input) = String::from_utf8((*attribute_input).clone()) {
        let exist: bool = instance
            .data::<Manager>()
            .is_attribute
            .get(&attr_input)
            .is_some();

        if !exist {
            if let Some(attribute_count) = instance.data::<Manager>().attribute_count.checked_add(1)
            {
                instance.data::<Manager>().attribute_count = attribute_count;
                let data = &mut instance.data::<Manager>();
                data.attribute_names
                    .insert(&data.attribute_count, &attribute_input);
                data.is_attribute.insert(&attr_input, &true);
                return Ok(());
            } else {
                return Err(Error::Custom(String::from(
                    "Fail to increase attribute count",
                )));
            }
        } else {
            return Err(Error::Custom(String::from("Attribute input exists")));
        }
    } else {
        return Err(Error::Custom(String::from("Attribute input error")));
    }
}
