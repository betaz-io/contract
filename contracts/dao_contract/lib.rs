#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable, Pausable, Upgradeable, AccessControl, AccessControlEnumerable)]
#[openbrush::contract]
pub mod dao_contract {
    use bet_a0::{
        impls::{
            admin::AdminTraitImpl,
            dao_contract::{data::Manager, DAOTraitsImpl, ADMINER, *},
        },
        traits::error::Error,
    };
    use ink::{codegen::EmitEvent, reflect::ContractEventBase};

    use openbrush::{
        contracts::{
            access_control::extensions::enumerable,
            ownable::{OwnableError, *},
            pausable::{PausableError, *},
        },
        modifiers,
        traits::Storage,
    };

    use crate::dao_contract::access_control::only_role;
    use beta0_core::beta0_core::BetA0CoreContractRef;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct DAOContract {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        data: Manager,
        #[storage_field]
        admin_data: bet_a0::impls::admin::data::Data,
    }

    #[ink(event)]
    pub struct UpdatePoolsRatio {
        core_pool_ratio: u32,
        staking_pool_ratio: u32,
        pandora_pool_ratio: u32,
        treasury_pool_ratio: u32,
    }

    pub type Event = <DAOContract as ContractEventBase>::Type;

    impl AdminTraitImpl for DAOContract {}
    impl DAOTraitsImpl for DAOContract {}

    impl DAOTrait for DAOContract {
        // EXECUTE FUNCTIONS
        /// Function changes state
        #[ink(message)]
        #[modifiers(only_owner)]
        fn change_state(&mut self, state: bool) -> Result<(), Error> {
            DAOTraitsImpl::change_state(self, state)
        }

        /// Withdraw fee
        #[ink(message)]
        fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error> {
            DAOTraitsImpl::withdraw_fee(self, account, value)
        }

        // SET FUNCTIONS
        #[ink(message)]
        #[modifiers(only_owner)]
        fn set_core_address(&mut self, core_address: AccountId) -> Result<(), Error> {
            DAOTraitsImpl::set_core_address(self, core_address)
        }

        // GET FUNCTIONS
        /// Get bet az token contract
        #[ink(message)]
        fn get_core_address(&self) -> AccountId {
            DAOTraitsImpl::get_core_address(self)
        }
    }

    impl DAOContract {
        #[ink(constructor)]
        pub fn new(admin_address: AccountId, core_address: AccountId) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            instance
                .initialize(admin_address, core_address)
                .ok()
                .unwrap();
            instance
        }

        // EXECUTE FUNCTIONS
        /// Function init
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(
            &mut self,
            admin_address: AccountId,
            core_address: AccountId,
        ) -> Result<(), Error> {
            // Make sure the initial data can only be init once
            if self.data.core_address != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }
            self.data.core_address = core_address;

            access_control::Internal::_init_with_admin(self, Some(self.env().caller()));
            AccessControl::grant_role(self, ADMINER, Some(self.env().caller()))
                .expect("Can not set admin role");
            if !AccessControl::has_role(self, ADMINER, Some(admin_address)) {
                AccessControl::grant_role(self, ADMINER, Some(admin_address))
                    .expect("Can not set admin role");
            }
            Ok(())
        }

        /// update UpdatePoolsRatio
        #[ink(message)]
        #[modifiers(only_role(ADMINER))]
        pub fn update_pools_ratio_core_contract(
            &mut self,
            core_pool_ratio: u32,
            staking_pool_ratio: u32,
            pandora_pool_ratio: u32,
            treasury_pool_ratio: u32,
        ) -> Result<(), Error> {
            let mut beta0_core_contract: BetA0CoreContractRef =
                ink::env::call::FromAccountId::from_account_id(self.data.core_address);
            if BetA0CoreContractRef::set_pool_ratio(
                &mut beta0_core_contract,
                core_pool_ratio,
                staking_pool_ratio,
                pandora_pool_ratio,
                treasury_pool_ratio,
            )
            .is_ok()
            {
                DAOContract::emit_event(
                    self.env(),
                    Event::UpdatePoolsRatio(UpdatePoolsRatio {
                        core_pool_ratio,
                        staking_pool_ratio,
                        pandora_pool_ratio,
                        treasury_pool_ratio,
                    }),
                );
            } else {
                return Err(Error::SetPoolRationFailed);
            }

            Ok(())
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}
