
use openbrush::{
    contracts::access_control::*,
    storage::{
        Mapping,
    },
    traits::{Balance, AccountId, ZERO_ADDRESS},
};

use ink::prelude::{
    vec::Vec,
    string::String,
};
use openbrush::{
    contracts::psp34::extensions::{
        enumerable::*,
    },
};

// ADMINER RoleType = 3739740293
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Manager);

#[derive(Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Manager {
    pub last_token_id: u64,
    pub attribute_count: u32,
    pub attribute_names: Mapping<u32, Vec<u8>>,
    pub is_attribute: Mapping<String, bool>,
    pub locked_tokens: Mapping<Id, bool>,
    pub locked_token_count: u64,
    pub betaz_token_price: Balance,
    pub betaz_token_address: AccountId,
    pub _reserved: Option<()>
}

impl Default for Manager {
    fn default() -> Self {
        Self {
            last_token_id: Default::default(),
            attribute_count: Default::default(),
            attribute_names: Default::default(),
            is_attribute: Default::default(),
            locked_tokens: Default::default(),
            locked_token_count: Default::default(),
            betaz_token_price: Default::default(),
            betaz_token_address: ZERO_ADDRESS.into(),
            _reserved: Default::default()   
        }
    }
}