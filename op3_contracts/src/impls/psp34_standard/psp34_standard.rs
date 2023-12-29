pub use crate::{
    impls::psp34_standard::{
        data,
        data::*,
        psp34_standard,
        *,
    },
    traits::psp34_standard::*,
};
use openbrush::{
    modifiers,
    modifier_definition,
    contracts::ownable::*,
    contracts::psp34::extensions::{
        enumerable::*,
        metadata::*,
    },
    traits::{
        AccountId,
        Storage,
        Balance
    },
};
use ink::prelude::{
    string::{
        String,
        ToString,
    },
    vec::Vec,
};
use ink::env::CallFlags;

use crate::traits::error::Error;

#[modifier_definition]
pub fn only_token_owner<T, F, R, E>(instance: &mut T, body: F, token_owner: AccountId) -> Result<R, E>
where
    T: Storage<Manager>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<Error>,
{
    if token_owner != T::env().caller() {
        return Err(From::from(Error::NotTokenOwner))
    }
    body(instance)
}

impl<T> Psp34Traits for T
where
    T: PSP34 + psp34::Internal 
    + Storage<metadata::Data> 
    + Storage<psp34::Data<enumerable::Balances>> 
    + Storage<ownable::Data> 
    + Storage<Manager>
{
    #[modifiers(only_owner)]
    default fn burn_betaz_token(&mut self) -> Result<(), Error> {
    
        let betaz_balance = Psp22Ref::balance_of(
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

    /// Public buy Token
    default fn public_buy(&mut self, amounts: u64) -> Result<(), Error> {
        let caller = Self::env().caller();

        let allowance = Psp22Ref::allowance(
            &self.data::<Manager>().betaz_token_address,
            caller,
            Self::env().account_id()
        );
        
        let decimal = Psp22Ref::token_decimals(&self.data::<Manager>().betaz_token_address);
        let fee: u128 = self
            .data::<Manager>()
            .betaz_token_price
            .checked_mul(10_u128.pow(decimal as u32))
            .unwrap()
            .checked_div(10_u128.pow(12 as u32))
            .unwrap()           
            .checked_mul(amounts as u128)
            .unwrap();

        let balance = Psp22Ref::balance_of(
            &self.data::<Manager>().betaz_token_address,
            caller
        );
        
        if allowance < fee || balance < fee {
            return Err(Error::InvalidBalanceAndAllowance)
        }

        // Transfer INW to token sale contract
        let builder = Psp22Ref::transfer_from_builder(
            &self.data::<Manager>().betaz_token_address,
            caller,
            Self::env().account_id(),
            fee,
            Vec::<u8>::new(),
        )
        .call_flags(CallFlags::default().set_allow_reentry(true));
        
        let transfer_result = match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => {
                Err(Error::CannotTransfer)
            }
        };

        if transfer_result.is_ok() {
            let start = self.data::<Manager>().last_token_id;
            for i in start..amounts.checked_add(start).unwrap() {
                let token_id = i.checked_add(1).unwrap();
                self.data::<Manager>().last_token_id = token_id;
                if psp34::Internal::_mint_to(self, caller, Id::U64(token_id)).is_err() {
                    return Err(Error::CannotMint);
                }
            }
        } else {
            return Err(Error::CannotTransfer);
        }

        Ok(())
    }

    /// Get Token Count
    default fn get_last_token_id(&self) -> u64 {
        return self.data::<Manager>().last_token_id
    }

    /// Lock nft - Only owner token
    #[modifiers(only_token_owner(self.owner_of(token_id.clone()).unwrap()))]
    default fn lock(&mut self, token_id: Id) -> Result<(), Error> {
        if let Some(locked_token_count) = self.data::<Manager>().locked_token_count.checked_add(1) {
            self.data::<Manager>().locked_token_count = locked_token_count;
            self.data::<Manager>().locked_tokens.insert(&token_id, &true);
            return Ok(());
        } else {
            return Err(Error::Custom(String::from("Cannot increase locked token count")));
        }
    }

    /// Check token is locked or not
    default fn is_locked_nft(&self, token_id: Id) -> bool {
        if self.data::<Manager>().locked_tokens.get(&token_id).is_some() {
            return true;
        }
        return false;
    }

    /// Get Locked Token Count
    default fn get_locked_token_count(&self) -> u64 {
        self.data::<Manager>().locked_token_count
    }

    /// Change baseURI
    #[modifiers(only_owner)]
    default fn set_base_uri(&mut self, uri: String) -> Result<(), Error> {
        self._set_attribute(Id::U8(0), String::from("baseURI").into_bytes(), uri.into_bytes());
        Ok(())
    }

    /// Only Owner can set multiple attributes to a token
    #[modifiers(only_owner)]
    default fn set_multiple_attributes(
        &mut self,
        token_id: Id,
        metadata: Vec<(String, String)>
    ) -> Result<(), Error> {
        if token_id == Id::U64(0){
            return Err(Error::InvalidInput)
        }
        if self.is_locked_nft(token_id.clone()) {
            return Err(Error::Custom(String::from("Token is locked")))
        }
        for (attribute, value) in &metadata {
            if add_attribute_name(self, &attribute.clone().into_bytes()).is_ok() {
                self._set_attribute(token_id.clone(), attribute.clone().into_bytes(), value.clone().into_bytes());
            }
        }
        Ok(())
    }

    /// Set BETAZ Contract address
    #[modifiers(only_owner)]
    default fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error> {
        self.data::<Manager>().betaz_token_address = betaz_token_address;
        Ok(())
    }

    /// Set BETAZ Contract price
    #[modifiers(only_owner)]
    default fn set_betaz_token_price(&mut self, betaz_token_price: Balance) -> Result<(), Error> {             
        self.data::<Manager>().betaz_token_price = betaz_token_price;
        Ok(())
    }

    /// Get BETAZ Contract price
    default fn get_betaz_token_price(&self) -> Balance {
        self.data::<Manager>().betaz_token_price
    }

    /// Get BETAZ Contract address
    default fn get_betaz_token_address(&self) -> AccountId {
        self.data::<Manager>().betaz_token_address
    }   

    /// Get multiple  attributes
    default fn get_attributes(&self, token_id: Id, attributes: Vec<String>) -> Vec<String> {
        let length = attributes.len();
        let mut ret = Vec::<String>::new();
        for i in 0..length {
            let attribute = attributes[i].clone();
            let value = self.get_attribute(token_id.clone(), attribute.into_bytes());
            
            if let Some(value_in_bytes) = value {
                if let Ok(value_in_string) = String::from_utf8(value_in_bytes) {
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
    default fn get_attribute_count(&self) -> u32 {
        self.data::<Manager>().attribute_count
    }
    /// Get Attribute Name
    default fn get_attribute_name(&self, index: u32) -> String {
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
    default fn token_uri(&self, token_id: u64) -> String {
        let value = self.get_attribute(Id::U8(0), String::from("baseURI").into_bytes());
        let mut token_uri = String::from("");

        if let Some(value_in_bytes) = value {
            if let Ok(value_in_string) = String::from_utf8(value_in_bytes) {
                token_uri = value_in_string;
            }                 
        }

        token_uri = token_uri + &token_id.to_string() + &String::from(".json");
        token_uri
    }

    /// Get owner address
    default fn get_owner(&self) -> AccountId {
        self.owner()
    }
}

fn add_attribute_name<T: Storage<Manager>>(
    instance: &mut T,
    attribute_input: &Vec<u8>
) -> Result<(), Error> {
    if let Ok(attr_input) = String::from_utf8((*attribute_input).clone()) {
        let exist: bool = instance.data::<Manager>().is_attribute.get(&attr_input).is_some();

        if !exist {
            if let Some(attribute_count) = instance.data::<Manager>().attribute_count.checked_add(1) {
                instance.data::<Manager>().attribute_count = attribute_count;
                let data = &mut instance.data::<Manager>();
                data.attribute_names.insert(&data.attribute_count, &attribute_input);
                data.is_attribute.insert(&attr_input, &true);
                return Ok(());
            } else {
                return Err(Error::Custom(String::from("Fail to increase attribute count"))); 
            }
        } else {
            return Err(Error::Custom(String::from("Attribute input exists"))); 
        } 
    } else {
        return Err(Error::Custom(String::from("Attribute input error")));
    }
}
