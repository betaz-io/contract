use crate::impls::beta0_core::BetInformation;
use crate::traits::error::Error;
use ink::prelude::vec::Vec;
use openbrush::{
    contracts::traits::psp22::{
        extensions::{burnable::*, mintable::*},
        *,
    },
    traits::{AccountId, Balance},
};

#[openbrush::wrapper]
pub type BetA0CoreRef = dyn BetA0CoreTrait;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Mintable;

#[openbrush::trait_definition]
pub trait BetA0CoreTrait {
    // EXECUTE FUNCTIONS
    /// Function changes state
    #[ink(message)]
    fn change_state(&mut self) -> Result<(), Error>;

    /// tranfer token to pool
    #[ink(message)]
    fn tranfer_token_to_pool(&mut self, pool: AccountId, amount: Balance) -> Result<(), Error>;

    /// Withdraw Fees - only Owner
    #[ink(message)]
    fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error>;

    /// Withdraw Token - only Owner
    #[ink(message)]
    fn withdraw_token(&mut self, value: Balance) -> Result<(), Error>;

    /// Withdraw hold amount
    #[ink(message)]
    fn withdraw_hold_amount(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error>;

    /// Update core pool - only owner and admin
    #[ink(message, payable)]
    fn update_core_pool(&mut self) -> Result<(), Error>;

    // Update reward pool - only owner and admin
    #[ink(message)]
    fn update_reward_pool(&mut self, amount: Balance) -> Result<(), Error>;

    // Transfer amount pandora pool
    #[ink(message)]
    fn transfer_pandora_pool(&mut self) -> Result<(), Error>;

    // Transfer amount staking pool
    #[ink(message)]
    fn transfer_staking_pool(&mut self) -> Result<(), Error>;

    // Transfer amount treasury pool
    #[ink(message)]
    fn transfer_treasury_pool(&mut self) -> Result<(), Error>;
    
    // SET FUNCTIONS
    /// Set min number over roll
    #[ink(message)]
    fn set_min_number_over_roll(&mut self, min_over_number: u32) -> Result<(), Error>;

    /// Set max number over roll
    #[ink(message)]
    fn set_max_number_over_roll(&mut self, max_over_number: u32) -> Result<(), Error>;

    /// Set min number under roll
    #[ink(message)]
    fn set_min_number_under_roll(&mut self, min_under_number: u32) -> Result<(), Error>;

    /// Set max number under roll
    #[ink(message)]
    fn set_max_number_under_roll(&mut self, max_under_number: u32) -> Result<(), Error>;

    /// Set over_rates and discount rate - Only Owner 2 vectors same size
    #[ink(message)]
    fn set_rates(&mut self, over_rates: Vec<u32>, under_rates: Vec<u32>) -> Result<(), Error>;

    /// Set new psp22 address
    #[ink(message)]
    fn set_bet_token_address(&mut self, bet_token_address: AccountId) -> Result<(), Error>;

    /// Set new token ratio
    #[ink(message)]
    fn set_token_ratio(&mut self, token_ratio: u32) -> Result<(), Error>;

    /// Set max bet ratio
    #[ink(message)]
    fn set_max_bet_ratio(&mut self, max_bet_ratio: u32) -> Result<(), Error>;

    /// Set staking pool address
    #[ink(message)]
    fn set_staking_address(&mut self, address: AccountId) -> Result<(), Error>;

    /// Set treasury pool address
    #[ink(message)]
    fn set_treasury_address(&mut self, address: AccountId) -> Result<(), Error>;

    /// Set oracle randomness address
    #[ink(message)]
    fn set_oracle_randomness_address(&mut self, address: AccountId) -> Result<(), Error>;

    /// Set limit round
    #[ink(message)]
    fn set_round_distance(&mut self, round_distance: u64) -> Result<(), Error>;

    /// set betaz address
    #[ink(message)]
    fn set_betaz_address(&mut self, account: AccountId) -> Result<(), Error>;

    /// set percentage_rates
    #[ink(message)]
    fn set_percentage_rates(&mut self, percentage_rates: u32) -> Result<(), Error>;

    /// Set dao contract address
    #[ink(message)]
    fn set_dao_address(&mut self, address: AccountId) -> Result<(), Error>;

    // GET FUCTIONS
    /// Get dao contract address
    #[ink(message)]
    fn get_dao_address(&self) -> AccountId;

    /// get percentage_rates
    #[ink(message)]
    fn get_percentage_rates(&self) -> u32;

    /// get betaz address
    #[ink(message)]
    fn get_betaz_address(&self) -> AccountId;

    /// get min number over roll
    #[ink(message)]
    fn get_min_number_over_roll(&self) -> u32;

    /// get max number over roll
    #[ink(message)]
    fn get_max_number_over_roll(&self) -> u32;

    /// get min number under roll
    #[ink(message)]
    fn get_min_number_under_roll(&self) -> u32;

    /// get max number under roll
    #[ink(message)]
    fn get_max_number_under_roll(&self) -> u32;

    /// Get token ratio
    #[ink(message)]
    fn get_token_ratio(&self) -> u32;

    /// Get psp22 address
    #[ink(message)]
    fn bet_token_address(&self) -> AccountId;

    /// Get Over Rates
    #[ink(message)]
    fn get_over_rates(&self) -> Vec<u32>;

    /// Get Under Rates
    #[ink(message)]
    fn get_under_rates(&self) -> Vec<u32>;

    /// Get Max Bet
    #[ink(message)]
    fn get_max_bet_ratio(&self) -> u32;

    #[ink(message)]
    fn get_max_bet(&self) -> u128;

    /// get contract token balance
    #[ink(message)]
    fn get_token_balance(&self) -> Balance;

    /// get token balance pool
    #[ink(message)]
    fn get_token_balance_pool(&self, pool: AccountId) -> Balance;

    /// Is bet exist
    #[ink(message)]
    fn is_bet_available(&self, player: AccountId) -> bool;

    /// get bet
    #[ink(message)]
    fn get_bet(&self, player: AccountId) -> Option<BetInformation>;

    /// Get core pool ratio
    #[ink(message)]
    fn get_core_pool_ratio(&self) -> u32;

    /// Get staking pool ratio
    #[ink(message)]
    fn get_staking_pool_ratio(&self) -> u32;

    /// Get treasury pool ratio
    #[ink(message)]
    fn get_treasury_pool_ratio(&self) -> u32;

    /// Get staking pool address
    #[ink(message)]
    fn get_staking_address(&self) -> AccountId;

    /// Get treasury pool address
    #[ink(message)]
    fn get_treasury_address(&self) -> AccountId;

    /// Get reward pool amount
    #[ink(message)]
    fn get_reward_pool_amount(&self) -> Balance;

    /// Get core pool amout
    #[ink(message)]
    fn get_core_pool_amout(&self) -> Balance;

    /// Get staking pool amount
    #[ink(message)]
    fn get_staking_pool_amount(&self) -> Balance;

    /// Get treasury pool amount
    #[ink(message)]
    fn get_treasury_pool_amount(&self) -> Balance;

    /// Get hold amount players
    #[ink(message)]
    fn get_hold_amount_players(&self, address: AccountId) -> Option<Balance>;

    /// Get hold players by index
    #[ink(message)]
    fn get_hold_players_by_index(&self, index: u64) -> Option<AccountId>;

    /// Get Hold Player Count
    #[ink(message)]
    fn get_hold_bidder_count(&self) -> u64;

    /// Get oracle randomness address
    #[ink(message)]
    fn get_oracle_randomness_address(&self) -> AccountId;

    /// Get limit round
    #[ink(message)]
    fn get_round_distance(&self) -> u64;

    /// Set pandora pool address
    #[ink(message)]
    fn set_pandora_address(&mut self, address: AccountId) -> Result<(), Error>;

    /// Get pandora pool ratio
    #[ink(message)]
    fn get_pandora_pool_ratio(&self) -> u32;

    /// Get treasury pool address
    #[ink(message)]
    fn get_pandora_address(&self) -> AccountId;

    /// Get pandora pool amount
    #[ink(message)]
    fn get_pandora_pool_amount(&self) -> Balance;
}
