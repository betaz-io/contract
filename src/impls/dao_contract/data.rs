use openbrush::{contracts::access_control::*, traits::AccountId};

// RoleType = 3739740293 (0xDEE7E885)
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Manager);

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Manager {
    pub core_address: AccountId,
    pub _reserved: Option<()>,
}

impl Default for Manager {
    fn default() -> Self {
        Self {
            core_address: [0u8; 32].into(),
            _reserved: Default::default(),
        }
    }
}
