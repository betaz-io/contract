use openbrush::{
    contracts::access_control::*,
    traits::{AccountId, Balance},
};

// RoleType = 3739740293 (0xDEE7E885)
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub oracle_randomness_address: AccountId,
    pub betaz_token_address: AccountId,
    pub psp34_contract_address: AccountId,
    pub betaz_token_fee: Balance,
    pub round_distance: u64,
    pub amount_out_min_nft: u64,
    pub amount_out_max_nft: u64,
    pub _reserved: Option<()>,
}

impl Default for Data {
    fn default() -> Self {
        Self {
            oracle_randomness_address: [0u8; 32].into(),
            betaz_token_address: [0u8; 32].into(),
            psp34_contract_address: [0u8; 32].into(),
            round_distance: Default::default(),
            betaz_token_fee: Default::default(),
            amount_out_min_nft: Default::default(),
            amount_out_max_nft: Default::default(),
            _reserved: Default::default(),
        }
    }
}
