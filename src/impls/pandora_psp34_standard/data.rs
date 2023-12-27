use ink::prelude::{string::String, vec::Vec};
use openbrush::{
    contracts::{access_control::*, psp34::extensions::enumerable::*},
    storage::Mapping,
    traits::{AccountId, Balance},
};

// RoleType = 3739740293 (0xDEE7E885)
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Manager);

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Manager {
    pub attribute_names: Mapping<u32, Vec<u8>>,
    pub is_attribute: Mapping<String, bool>,
    pub locked_tokens: Mapping<Id, bool>,
    pub last_token_id: u64,
    pub attribute_count: u32,
    pub locked_token_count: u64,
    pub betaz_token_address: AccountId,
    pub public_mint_price: Balance,
    pub _reserved: Option<()>,
}

impl Default for Manager {
    fn default() -> Self {
        Self {
            attribute_names: Default::default(),
            is_attribute: Default::default(),
            locked_tokens: Default::default(),
            last_token_id: Default::default(),
            attribute_count: Default::default(),
            locked_token_count: Default::default(),
            betaz_token_address: [0u8; 32].into(),
            public_mint_price: Default::default(), // betaz token
            _reserved: Default::default(),
        }
    }
}
