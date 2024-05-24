#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable, Pausable, Upgradeable, AccessControl, AccessControlEnumerable)]
#[openbrush::contract]
pub mod sale {
    use bet_a0::{
        impls::{
            admin::*,
            sale::{data::Data, SalePoolTraitImpl, ADMINER, *},
        },
        traits::error::Error,
    };
    use ink::{
        codegen::{EmitEvent, Env},
        prelude::vec::Vec,
        reflect::ContractEventBase,
    };

    use openbrush::{
        contracts::{
            access_control::extensions::enumerable,
            ownable::{OwnableError, *},
            pausable::{PausableError, *},
        },
        modifiers,
        traits::Storage,
    };
    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct SalePoolContract {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        data: Data,
    }

    #[ink(event)]
    pub struct SalePoolBuyEvent {
        buyer: AccountId,
        amount: Balance,
        fee: Balance,
    }

    #[ink(event)]
    pub struct AddWhitelistEvent {
        pool_type: PoolType,
        buyer: AccountId,
        amount: Balance,
        price: Balance,
    }

    #[ink(event)]
    pub struct UpdateWhitelistEvent {
        pool_type: PoolType,
        buyer: AccountId,
        amount: Balance,
        price: Balance,
    }

    #[ink(event)]
    pub struct RemoveWhitelistEvent {
        pool_type: PoolType,
        buyer: AccountId,
    }

    #[ink(event)]
    pub struct WhitelistBuyEvent {
        pool_type: PoolType,
        buyer: AccountId,
        buy_amount: Balance,
        purchased_amount: Balance,
    }

    #[ink(event)]
    pub struct MintTokenEvent {
        contract_address: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct BurnTokenEvent {
        contract_address: AccountId,
        amount: Balance,
    }

    pub type Event = <SalePoolContract as ContractEventBase>::Type;

    impl AdminTrait for SalePoolContract {}
    impl SalePoolTraitImpl for SalePoolContract {
        // emit event
        fn _emit_sale_pool_buy_event(&self, _buyer: AccountId, _amount: Balance, _fee: Balance) {
            SalePoolContract::emit_event(
                self.env(),
                Event::SalePoolBuyEvent(SalePoolBuyEvent {
                    buyer: _buyer,
                    amount: _amount,
                    fee: _fee,
                }),
            )
        }
        fn _emit_add_whitelist_event(
            &self,
            _type: PoolType,
            _buyer: AccountId,
            _amount: Balance,
            _price: Balance,
        ) {
            SalePoolContract::emit_event(
                self.env(),
                Event::AddWhitelistEvent(AddWhitelistEvent {
                    pool_type: _type,
                    buyer: _buyer,
                    amount: _amount,
                    price: _price,
                }),
            )
        }
        fn _emit_update_whitelist_event(
            &self,
            _type: PoolType,
            _buyer: AccountId,
            _amount: Balance,
            _price: Balance,
        ) {
            SalePoolContract::emit_event(
                self.env(),
                Event::UpdateWhitelistEvent(UpdateWhitelistEvent {
                    pool_type: _type,
                    buyer: _buyer,
                    amount: _amount,
                    price: _price,
                }),
            )
        }
        fn _emit_whitelist_buy_event(
            &self,
            _type: PoolType,
            _buyer: AccountId,
            _buy_amount: Balance,
            _purchased_amount: Balance,
        ) {
            SalePoolContract::emit_event(
                self.env(),
                Event::WhitelistBuyEvent(WhitelistBuyEvent {
                    pool_type: _type,
                    buyer: _buyer,
                    buy_amount: _buy_amount,
                    purchased_amount: _purchased_amount,
                }),
            )
        }

        fn _emit_mint_token_event(&self, _contract_address: AccountId, _amount: Balance) {
            SalePoolContract::emit_event(
                self.env(),
                Event::MintTokenEvent(MintTokenEvent {
                    contract_address: _contract_address,
                    amount: _amount,
                }),
            )
        }

        fn _emit_burn_token_event(&self, _contract_address: AccountId, _amount: Balance) {
            SalePoolContract::emit_event(
                self.env(),
                Event::BurnTokenEvent(BurnTokenEvent {
                    contract_address: _contract_address,
                    amount: _amount,
                }),
            )
        }
    }

    impl SalePoolTrait for SalePoolContract {
        // EXECUTE FUNCTIONS
        /// Function changes state
        #[ink(message)]
        #[modifiers(only_owner)]
        fn change_state(&mut self) -> Result<(), Error> {
            SalePoolTraitImpl::change_state(self)
        }

        #[ink(message)]
        fn add_pool_by_pool_type(
            &mut self,
            pool_type: PoolType,
            buy_status: bool,
            end_time_buy: Timestamp,
            total_amount: Balance,
            total_purchased_amount: Balance,
            price: Balance,
        ) -> Result<(), Error> {
            SalePoolTraitImpl::add_pool_by_pool_type(
                self,
                pool_type,
                buy_status,
                end_time_buy,
                total_amount,
                total_purchased_amount,
                price,
            )
        }

        // buy with sale pool
        #[ink(message, payable)]
        fn buy_with_sale_pool(&mut self, amount: Balance) -> Result<(), Error> {
            SalePoolTraitImpl::buy_with_sale_pool(self, amount)
        }

        #[ink(message)]
        fn add_whitelist(
            &mut self,
            pool_type: PoolType,
            account: AccountId,
            amount: Balance,
            price: Balance,
        ) -> Result<(), Error> {
            SalePoolTraitImpl::add_whitelist(self, pool_type, account, amount, price)
        }

        // add whitelist
        #[ink(message)]
        fn add_multi_whitelists(
            &mut self,
            pool_type: PoolType,
            accounts: Vec<AccountId>,
            amounts: Vec<Balance>,
            prices: Vec<Balance>,
        ) -> Result<(), Error> {
            SalePoolTraitImpl::add_multi_whitelists(self, pool_type, accounts, amounts, prices)
        }

        // update whitelist
        #[ink(message)]
        fn update_multi_whitelists(
            &mut self,
            pool_type: PoolType,
            accounts: Vec<AccountId>,
            amounts: Vec<Balance>,
            prices: Vec<Balance>,
        ) -> Result<(), Error> {
            SalePoolTraitImpl::update_multi_whitelists(self, pool_type, accounts, amounts, prices)
        }

        // buy with whitelist
        #[ink(message, payable)]
        fn whitelist_buy(&mut self, pool_type: PoolType, amount: Balance) -> Result<(), Error> {
            SalePoolTraitImpl::whitelist_buy(self, pool_type, amount)
        }

        // SET FUNCTIONS
        #[ink(message)]
        #[modifiers(only_owner)]
        fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error> {
            SalePoolTraitImpl::set_betaz_token_address(self, betaz_token_address)
        }

        /// update pool info
        #[ink(message)]
        fn update_sale_pool_info_pool_type(
            &mut self,
            pool_type: PoolType,
            buy_status: bool,
            end_time_buy: Timestamp,
            total_amount: Balance,
            total_purchased_amount: Balance,
            price: Balance,
        ) -> Result<(), Error> {
            SalePoolTraitImpl::update_sale_pool_info_pool_type(
                self,
                pool_type,
                buy_status,
                end_time_buy,
                total_amount,
                total_purchased_amount,
                price,
            )
        }

        // GET FUNCTIONS
        /// Get pool sale info
        #[ink(message)]
        fn get_pool_sale_info(&self, pool_type: PoolType) -> Option<PoolSaleInfo> {
            SalePoolTraitImpl::get_pool_sale_info(self, pool_type)
        }

        /// Get pool sale info total remaining amount
        #[ink(message)]
        fn get_pool_sale_total_remaining_amount(&self, pool_type: PoolType) -> Option<Balance> {
            SalePoolTraitImpl::get_pool_sale_total_remaining_amount(self, pool_type)
        }

        /// Get account in pool type
        #[ink(message)]
        fn get_account_by_pool_type(&self, pool_type: PoolType, index: u128) -> Option<AccountId> {
            SalePoolTraitImpl::get_account_by_pool_type(self, pool_type, index)
        }

        /// Get total account in pool type
        #[ink(message)]
        fn get_total_account_by_pool_type(&self, pool_type: PoolType) -> u128 {
            SalePoolTraitImpl::get_total_account_by_pool_type(self, pool_type)
        }

        /// Get whitelist Info
        #[ink(message)]
        fn get_whitelist_info(
            &self,
            pool_type: PoolType,
            account: AccountId,
        ) -> Option<WhitelistInfo> {
            SalePoolTraitImpl::get_whitelist_info(self, pool_type, account)
        }

        /// Get bet az token contract
        #[ink(message)]
        fn get_betaz_token_address(&self) -> AccountId {
            SalePoolTraitImpl::get_betaz_token_address(self)
        }
    }

    impl SalePoolContract {
        #[ink(constructor)]
        pub fn new(admin_address: AccountId, betaz_token_address: AccountId) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            instance
                .initialize(admin_address, betaz_token_address)
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
            betaz_token_address: AccountId,
        ) -> Result<(), Error> {
            // Make sure the initial data can only be init once
            if self.data.betaz_token_address != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }
            self.data.betaz_token_address = betaz_token_address;

            access_control::Internal::_init_with_admin(self, Some(self.env().caller()));
            AccessControl::grant_role(self, ADMINER, Some(self.env().caller()))
                .expect("Can not set admin role");
            if !AccessControl::has_role(self, ADMINER, Some(admin_address)) {
                AccessControl::grant_role(self, ADMINER, Some(admin_address))
                    .expect("Can not set admin role");
            }
            Ok(())
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}
