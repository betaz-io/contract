use crate::traits::error::Error;
use openbrush::{
    contracts::traits::psp22::{
        extensions::{burnable::*, mintable::*, metadata::*},
        *,
    },
    modifiers,
    traits::{AccountId, Balance, Timestamp},
};

use crate::impls::sale::{PoolSaleInfo, PoolType, WhitelistInfo};
use ink::prelude::vec::Vec;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Mintable + PSP22Metadata;

#[openbrush::wrapper]
pub type SalePool = dyn SalePoolTrait;

#[openbrush::trait_definition]
pub trait SalePoolTrait {
    // EXECUTE FUNCTIONS
    /// Function changes state
    #[ink(message)]
    #[modifiers(only_owner)]
    fn change_state(&mut self) -> Result<(), Error>;

    #[ink(message)]
    fn add_pool_by_pool_type(
        &mut self,
        pool_type: PoolType,
        buy_status: bool,
        end_time_buy: Timestamp,
        total_amount: Balance,
        total_purchased_amount: Balance,
        price: Balance,
    ) -> Result<(), Error>;

    // buy with sale pool
    #[ink(message, payable)]
    fn buy_with_sale_pool(&mut self, amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn add_whitelist(
        &mut self,
        pool_type: PoolType,
        account: AccountId,
        amount: Balance,
        price: Balance,
    ) -> Result<(), Error>;

    // add whitelist
    #[ink(message)]
    fn add_multi_whitelists(
        &mut self,
        pool_type: PoolType,
        accounts: Vec<AccountId>,
        amounts: Vec<Balance>,
        prices: Vec<Balance>,
    ) -> Result<(), Error>;

    // update whitelist
    #[ink(message)]
    fn update_multi_whitelists(
        &mut self,
        pool_type: PoolType,
        accounts: Vec<AccountId>,
        amounts: Vec<Balance>,
        prices: Vec<Balance>,
    ) -> Result<(), Error>;

    // buy with whitelist
    #[ink(message, payable)]
    fn whitelist_buy(&mut self, pool_type: PoolType, amount: Balance) -> Result<(), Error>;

    // SET FUNCTIONS
    #[ink(message)]
    fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error>;

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
    ) -> Result<(), Error>;

    /// Get pool sale info
    #[ink(message)]
    fn get_pool_sale_info(&self, pool_type: PoolType) -> Option<PoolSaleInfo>;

    /// Get pool sale info total remaining amount
    #[ink(message)]
    fn get_pool_sale_total_remaining_amount(&self, pool_type: PoolType) -> Option<Balance>;

    /// Get account in pool type
    #[ink(message)]
    fn get_account_by_pool_type(&self, pool_type: PoolType, index: u128) -> Option<AccountId>;

    /// Get total account in pool type
    #[ink(message)]
    fn get_total_account_by_pool_type(&self, pool_type: PoolType) -> u128;

    /// Get whitelist Info
    #[ink(message)]
    fn get_whitelist_info(&self, pool_type: PoolType, account: AccountId) -> Option<WhitelistInfo>;

    /// Get bet az token contract
    #[ink(message)]
    fn get_betaz_token_address(&self) -> AccountId;
}
