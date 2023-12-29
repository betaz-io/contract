#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::pandora_psp34_standard::PandoraPsp34StandardContractRef;
#[openbrush::implementation(
    PSP34,
    PSP34Metadata,
    PSP34Enumerable,
    Ownable,
    Pausable,
    Upgradeable,
    AccessControl
)]
#[openbrush::contract]
pub mod pandora_psp34_standard {
    use bet_a0::{
        impls::{
            admin::AdminTraitImpl,
            pandora_psp34_standard::{Psp34TraitsImpl, ADMINER, *},
        },
        traits::error::Error,
    };
    use openbrush::{
        contracts::psp34::extensions::{burnable::*, enumerable::*, metadata::*},
        modifiers,
        traits::{Storage, String},
    };

    use ink::{
        codegen::{EmitEvent, Env},
        reflect::ContractEventBase,
    };

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct PandoraPsp34StandardContract {
        #[storage_field]
        psp34: psp34::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        manager: pandora_psp34_standard::data::Manager,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        admin: bet_a0::impls::admin::data::Data,
    }

    #[ink(event)]
    pub struct PublicBuyEvent {
        buyer: Option<AccountId>,
        amounts: u64,
        betaz_price: Balance,
    }

    impl AdminTraitImpl for PandoraPsp34StandardContract {}
    impl Psp34TraitsImpl for PandoraPsp34StandardContract {
        fn _emit_public_buy_event(&self, _buyer: AccountId, _amounts: u64, _betaz_price: Balance) {
            PandoraPsp34StandardContract::emit_event(
                self.env(),
                Event::PublicBuyEvent(PublicBuyEvent {
                    buyer: Some(_buyer),
                    amounts: _amounts,
                    betaz_price: _betaz_price,
                }),
            );
        }
    }

    pub type Event = <PandoraPsp34StandardContract as ContractEventBase>::Type;

    impl PSP34Burnable for PandoraPsp34StandardContract {
        #[ink(message)]
        fn burn(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error> {
            let caller = self.env().caller();
            if let Some(token_owner) = psp34::PSP34Impl::owner_of(self, id.clone()) {
                if token_owner != account {
                    return Err(PSP34Error::Custom(String::from("not token owner")));
                }
                let allowance =
                    psp34::PSP34Impl::allowance(self, account, caller, Some(id.clone()));
                if caller == account || allowance {
                    if self.manager.locked_tokens.get(&id).is_some() {
                        self.manager.locked_tokens.remove(&id);
                        if let Some(locked_token_count) =
                            self.manager.locked_token_count.checked_sub(1)
                        {
                            self.manager.locked_token_count = locked_token_count;
                        } else {
                            return Err(PSP34Error::Custom(String::from(
                                "Locked token count error",
                            )));
                        }
                    }

                    psp34::Internal::_burn_from(self, account, id)
                } else {
                    return Err(PSP34Error::Custom(String::from(
                        "caller is not token owner or approved",
                    )));
                }
            } else {
                return Err(PSP34Error::Custom(String::from("No token owner found")));
            }
        }
    }

    impl Psp34Traits for PandoraPsp34StandardContract {
        // EXECUTE FUNCTIONS
        // Change state contract
        #[ink(message)]
        fn change_state(&mut self, state: bool) -> Result<(), Error> {
            Psp34TraitsImpl::change_state(self, state)
        }


        #[ink(message)]
        fn lock(&mut self, token_id: Id) -> Result<(), Error> {
            Psp34TraitsImpl::lock(self, token_id)
        }

        #[ink(message)]
        fn burn_betaz_token(&mut self) -> Result<(), Error> {
            Psp34TraitsImpl::burn_betaz_token(self)
        }

        #[ink(message)]
        fn public_buy(&mut self, amounts: u64) -> Result<(), Error> {
            Psp34TraitsImpl::public_buy(self, amounts)
        }

        // SET FUNCTIONS
        #[ink(message)]
        fn set_base_uri(&mut self, uri: String) -> Result<(), Error> {
            Psp34TraitsImpl::set_base_uri(self, uri)
        }

        #[ink(message)]
        fn set_multiple_attributes(
            &mut self,
            token_id: Id,
            metadata: Vec<(String, String)>,
        ) -> Result<(), Error> {
            Psp34TraitsImpl::set_multiple_attributes(self, token_id, metadata)
        }

        #[ink(message)]
        fn set_betaz_token_address(&mut self, account: AccountId) -> Result<(), Error> {
            Psp34TraitsImpl::set_betaz_token_address(self, account)
        }

        /// set public_mint_price
        #[ink(message)]
        fn set_public_mint_price(&mut self, price: Balance) -> Result<(), Error> {
            Psp34TraitsImpl::set_public_mint_price(self, price)
        }

        /// get public_mint_price
        #[ink(message)]
        fn get_public_mint_price(&self) -> Balance {
            Psp34TraitsImpl::get_public_mint_price(self)
        }

        /// get betaz address
        #[ink(message)]
        fn get_betaz_token_address(&self) -> AccountId {
            Psp34TraitsImpl::get_betaz_token_address(self)
        }

        #[ink(message)]
        fn get_attributes(&self, token_id: Id, attributes: Vec<String>) -> Vec<String> {
            Psp34TraitsImpl::get_attributes(self, token_id, attributes)
        }

        #[ink(message)]
        fn get_attribute_count(&self) -> u32 {
            Psp34TraitsImpl::get_attribute_count(self)
        }

        #[ink(message)]
        fn get_attribute_name(&self, index: u32) -> String {
            Psp34TraitsImpl::get_attribute_name(self, index)
        }

        #[ink(message)]
        fn token_uri(&self, token_id: u64) -> String {
            Psp34TraitsImpl::token_uri(self, token_id)
        }

        #[ink(message)]
        fn get_owner(&self) -> Option<AccountId> {
            Psp34TraitsImpl::get_owner(self)
        }

        #[ink(message)]
        fn get_last_token_id(&self) -> u64 {
            Psp34TraitsImpl::get_last_token_id(self)
        }

        #[ink(message)]
        fn is_locked_nft(&self, token_id: Id) -> bool {
            Psp34TraitsImpl::is_locked_nft(self, token_id)
        }

        #[ink(message)]
        fn get_locked_token_count(&self) -> u64 {
            Psp34TraitsImpl::get_locked_token_count(self)
        }
    }
    impl PandoraPsp34StandardContract {
        #[ink(constructor)]
        pub fn new(
            name: String,
            symbol: String,
            admin_address: AccountId,
            betaz_token_address: AccountId,
            public_mint_price: Balance,
        ) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            metadata::Internal::_set_attribute(
                &mut instance,
                Id::U8(0),
                String::from("name"),
                name,
            );
            metadata::Internal::_set_attribute(
                &mut instance,
                Id::U8(0),
                String::from("symbol"),
                symbol,
            );
            instance
                .initialize(
                    admin_address,
                    betaz_token_address,
                    public_mint_price,
                )
                .ok()
                .unwrap();
            instance
        }

        /// Function init
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(
            &mut self,
            admin_address: AccountId,
            betaz_token_address: AccountId,
            public_mint_price: Balance,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            // Make sure the initial data can only be init once
            if self.manager.betaz_token_address != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }
            self.manager.betaz_token_address = betaz_token_address;
            self.manager.public_mint_price = public_mint_price;
            access_control::Internal::_init_with_admin(self, Some(caller));
            AccessControl::grant_role(self, ADMINER, Some(caller)).expect("Can not set admin role");
            if !AccessControl::has_role(self, ADMINER, Some(admin_address)) {
                AccessControl::grant_role(self, ADMINER, Some(admin_address))
                    .expect("Can not set admin role");
            }
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_role(ADMINER))]
        pub fn mint(&mut self) -> Result<(), Error> {
            let caller = self.env().caller();
            if let Some(last_token_id) = self.manager.last_token_id.checked_add(1) {
                self.manager.last_token_id = last_token_id;
                if psp34::Internal::_mint_to(self, caller, Id::U64(self.manager.last_token_id))
                    .is_err()
                {
                    return Err(Error::CannotMint);
                }
                return Ok(());
            } else {
                return Err(Error::CannotIncreaseLastTokenId);
            }
        }

        #[ink(message)]
        #[modifiers(only_role(ADMINER))]
        pub fn multiple_mint_ticket(&mut self, amounts: u64) -> Result<(), Error> {
            let caller = self.env().caller();
            let start = self.manager.last_token_id;
            for i in start..amounts.checked_add(start).unwrap() {
                let token_id = i.checked_add(1).unwrap();
                self.manager.last_token_id = token_id;
                if psp34::Internal::_mint_to(self, caller, Id::U64(token_id)).is_err() {
                    return Err(Error::CannotMint);
                }
            }
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_role(ADMINER))]
        pub fn mint_with_attributes(
            &mut self,
            metadata: Vec<(String, String)>,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            if let Some(last_token_id) = self.manager.last_token_id.checked_add(1) {
                self.manager.last_token_id = last_token_id;
                if psp34::Internal::_mint_to(self, caller, Id::U64(self.manager.last_token_id))
                    .is_err()
                {
                    return Err(Error::CannotMint);
                }
                if Psp34Traits::set_multiple_attributes(
                    self,
                    Id::U64(self.manager.last_token_id),
                    metadata,
                )
                .is_err()
                {
                    return Err(Error::CannotSetAttributes);
                }
                return Ok(());
            } else {
                return Err(Error::CannotIncreaseLastTokenId);
            }
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}