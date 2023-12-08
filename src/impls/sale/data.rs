use openbrush::{
    contracts::access_control::*,
    storage::{Mapping, MultiMapping, TypeGuard, ValueGuard},
    traits::{AccountId, Balance, Timestamp},
};

#[cfg(feature = "std")]
use ink::storage::traits::StorageLayout;

#[derive(Copy, Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub enum PoolType {
    Sale,
    PrivateInvestment,
    AirdropAndMarketing,
    Team,
    Development,
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct PoolSaleInfo {
    pub buy_status: bool,
    pub end_time_buy: Timestamp,
    pub total_amount: Balance,
    pub total_purchased_amount: Balance,
    pub price: Balance, // price azero => 1 betaz
}

#[derive(
    Copy, Clone, Debug, Ord, PartialOrd, Eq, PartialEq, Default, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct WhitelistInfo {
    pub amount: Balance,
    pub price: Balance,
    pub purchased_amount: Balance,
}

// RoleType = 3739740293 (0xDEE7E885)
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub admin_address: AccountId,
    pub betaz_token_address: AccountId,
    // Whitelist sale
    pub pool_sale_info: Mapping<PoolType, PoolSaleInfo>,
    pub whitelist_account: MultiMapping<PoolType, AccountId, ValueGuard<PoolType>>,
    pub whitelist: Mapping<(PoolType, AccountId), WhitelistInfo, WhitelistKey>,
    pub _reserved: Option<()>,
}

impl Default for Data {
    fn default() -> Self {
        Self {
            admin_address: [0u8; 32].into(),
            betaz_token_address: [0u8; 32].into(),
            // Whitelist sale
            pool_sale_info: Default::default(),
            whitelist_account: Default::default(),
            whitelist: Default::default(),
            _reserved: Default::default(),
        }
    }
}

pub struct WhitelistKey;
impl<'a> TypeGuard<'a> for WhitelistKey {
    type Type = &'a (&'a PoolType, &'a AccountId);
}
