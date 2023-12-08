use openbrush::{
    storage::{Mapping, MultiMapping, TypeGuard, ValueGuard},
    traits::{AccountId, Balance, Timestamp},
};

#[cfg(feature = "std")]
use ink::storage::traits::StorageLayout;

#[derive(
    Copy, Clone, Debug, Ord, PartialOrd, Eq, PartialEq, Default, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct PendingUnstakeInformation {
    pub amount: Balance,
    pub time: Timestamp,
}

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub admin_address: AccountId,
    pub betaz_token_address: AccountId,
    pub staked_accounts: MultiMapping<u8, AccountId, ValueGuard<u8>>, // 0 is staked status, 1 is request unstake status
    pub staking_list: Mapping<AccountId, Balance>,
    pub limit_unstake_time: Timestamp,
    pub pending_unstaking_list: MultiMapping<AccountId, PendingUnstakeInformation, ValueGuard<AccountId>>,
    pub total_staked: Balance,
    pub is_locked: bool,
    pub reward_started: bool,
    pub is_claimed: Mapping<AccountId, bool>,
    pub reward_pool: Balance,
    pub claimable_reward: Balance,
    pub _reserved: Option<()>,
}

impl Default for Data {
    fn default() -> Self {
        Self {
            admin_address: [0u8; 32].into(),
            betaz_token_address: [0u8; 32].into(),
            staked_accounts: Default::default(), // 0 is staked status, 1 is request unstake status
            staking_list: Default::default(),
            limit_unstake_time: Default::default(),
            pending_unstaking_list: Default::default(),
            total_staked: Default::default(),
            is_locked: Default::default(),
            reward_started: Default::default(),
            is_claimed: Default::default(),
            reward_pool: Default::default(),
            claimable_reward: Default::default(),
            _reserved: Default::default(),
        }
    }
}

pub struct RequestUnstakingTimeKey;

impl<'a> TypeGuard<'a> for RequestUnstakingTimeKey {
    type Type = &'a (&'a AccountId, &'a Balance);
}
