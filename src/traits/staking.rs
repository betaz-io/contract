use crate::traits::error::Error;
use openbrush::{
    contracts::traits::psp22::*,
    modifiers,
    traits::{AccountId, Balance, Timestamp},
};

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22;

#[openbrush::wrapper]
pub type StakingPool = dyn StakingPoolTrait;

#[openbrush::trait_definition]
pub trait StakingPoolTrait {
    // EXECUTE FUNCTIONS
    /// Function changes state
    #[ink(message)]
    #[modifiers(only_owner)]
    fn change_state(&mut self) -> Result<(), Error>;

    /// Withdraw fee
    #[ink(message)]
    fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error>;

    // SET FUNCTIONS
    #[ink(message)]
    #[modifiers(only_owner)]
    fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error>;

    /// Set bet az token contract
    #[ink(message)]
    #[modifiers(only_owner)]
    fn set_limit_unstake_time(&mut self, limit_unstake_time: Timestamp) -> Result<(), Error>;

    #[ink(message)]
    #[modifiers(only_role(ADMINER))]
    fn update_is_locked(&mut self, is_locked: bool) -> Result<(), Error>;

    #[ink(message)]
    #[modifiers(only_role(ADMINER))]
    #[modifiers(only_locked)]
    fn update_status_reward_distribution(&mut self, start: bool) -> Result<(), Error>;

    #[ink(message)]
    #[modifiers(only_role(ADMINER))]
    #[modifiers(only_locked)]
    fn set_claimed_status(&mut self, staker: AccountId, status: bool) -> Result<(), Error>;

    // GET FUNCTIONS
    /// Get bet az token contract
    #[ink(message)]
    fn get_betaz_token_address(&self) -> AccountId;

    /// Get bet az token contract
    #[ink(message)]
    fn get_limit_unstake_time(&self) -> Timestamp;

    #[ink(message)]
    fn get_request_unstake_time(&self, account: AccountId, index: u128) -> Option<Timestamp>;

    #[ink(message)]
    fn get_pending_unstaking_amount(&self, account: AccountId, index: u128) -> Option<Balance>;

    #[ink(message)]
    fn get_pending_unstaking_index(&self, account: AccountId, amount: Balance, time: Timestamp) -> Option<u128>;

    #[ink(message)]
    fn get_total_staked(&self) -> Balance;

    // get stake amount by account
    #[ink(message)]
    fn get_stake_amount_by_account(&self, account: AccountId) -> Balance;

    #[ink(message)]
    fn get_total_pending_unstaked_by_account(&self, account: AccountId) -> u64;

    #[ink(message)]
    fn is_claimed(&self, account: AccountId) -> bool;

    #[ink(message)]
    fn get_reward_started(&self) -> bool;

    #[ink(message)]
    fn get_is_locked(&self) -> bool;

    #[ink(message)]
    fn get_staked_accounts_index_by_account(&self, account: AccountId) -> Option<u128>;

    #[ink(message)]
    fn get_staked_accounts_by_index(&self, index: u64) -> Option<AccountId>;

    #[ink(message)]
    fn get_staked_accounts_last_index(&self) -> u64;

    #[ink(message)]
    fn get_request_unstake_accounts_index_by_account(&self, account: AccountId) -> Option<u128>;

    #[ink(message)]
    fn get_request_unstake_accounts_by_index(&self, index: u64) -> Option<AccountId>;

    #[ink(message)]
    fn get_request_unstake_accounts_last_index(&self) -> u64;

    #[ink(message)]
    fn get_reward_pool(&self) -> Balance;
    
    #[ink(message)]
    fn get_claimable_reward(&self) -> Balance;
}
