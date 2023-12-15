use ink::prelude::vec::Vec;
use ink::storage::Mapping;
use openbrush::{
    contracts::access_control::*,
    storage::{MultiMapping, ValueGuard},
    traits::{AccountId, Balance},
};

#[cfg(feature = "std")]
use ink::storage::traits::StorageLayout;

#[derive(
    Copy, Clone, Debug, Ord, PartialOrd, Eq, PartialEq, Default, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct BetInformation {
    pub is_over: u8,
    pub bet_number: u32,
    pub bet_amount: Balance,
    pub oracle_round: u64,
}

#[derive(
    Copy, Clone, Debug, Ord, PartialOrd, Eq, PartialEq, Default, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct PoolManager {
    pub core_pool_ratio: u32,
    pub staking_pool_ratio: u32,
    pub treasury_pool_ratio: u32,
    pub pandora_pool_ratio: u32,
    pub core_pool_amout: Balance,
    pub reward_pool_amount: Balance,
    pub staking_pool_amount: Balance,
    pub treasury_pool_amount: Balance,
    pub pandora_pool_amount: Balance,
    pub platform_fee_amount: Balance,
}

// RoleType = 3739740293 (0xDEE7E885)
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Manager);

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Manager {
    pub betaz_address: AccountId,
    pub over_rates: Vec<u32>,
    pub under_rates: Vec<u32>,
    pub percentage_rates: u32,
    pub max_bet_ratio: u32,
    pub bet_token_address: AccountId,
    pub staking_address: AccountId,
    pub treasury_address: AccountId,
    pub pandora_pool_address: AccountId,
    pub token_ratio: u32,
    pub bets: Mapping<AccountId, BetInformation>,
    pub min_over_number: u32,
    pub max_over_number: u32,
    pub min_under_number: u32,
    pub max_under_number: u32,
    pub hold_amount_players: Mapping<AccountId, Balance>,
    pub hold_players: MultiMapping<u8, AccountId, ValueGuard<u8>>,
    pub pool_manager: PoolManager,
    pub oracle_randomness_address: AccountId,
    pub round_distance: u64,
    pub dao_address: AccountId,
    pub _reserved: Option<()>,
}

impl Default for Manager {
    fn default() -> Self {
        Self {
            betaz_address: [0u8; 32].into(),
            over_rates: Default::default(),
            under_rates: Default::default(),
            percentage_rates: Default::default(),
            max_bet_ratio: Default::default(),
            bet_token_address: [0u8; 32].into(),
            staking_address: [0u8; 32].into(),
            treasury_address: [0u8; 32].into(),
            pandora_pool_address: [0u8; 32].into(),
            token_ratio: Default::default(),
            bets: Default::default(),
            min_over_number: Default::default(),
            max_over_number: Default::default(),
            min_under_number: Default::default(),
            max_under_number: Default::default(),
            hold_amount_players: Default::default(),
            hold_players: Default::default(),
            pool_manager: Default::default(),
            oracle_randomness_address: [0u8; 32].into(),
            round_distance: Default::default(),
            dao_address: [0u8; 32].into(),
            _reserved: Default::default(),
        }
    }
}
