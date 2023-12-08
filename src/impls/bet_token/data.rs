use openbrush::{traits::{Balance, Timestamp}, contracts::access_control::*};

// RoleType = 3739740293 (0xDEE7E885)
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

// RoleType = 4254773782 (0xFD9AB216)
pub const MINTER: RoleType = ink::selector_id!("MINTER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub token_ratio: u32,
    pub max_buy_amount: Balance,
    pub buy_token_status: bool,
    pub amount_tokens_sold: Balance,
    pub limit_time_buy: Timestamp,
    pub end_time_buy: Timestamp,
    pub _reserved: Option<()>,
}

impl Default for Data {
    fn default() -> Self {
        Self {
            token_ratio: Default::default(),
            max_buy_amount: Default::default(),
            buy_token_status: true,
            amount_tokens_sold: Default::default(),
            limit_time_buy: Default::default(),
            end_time_buy: Default::default(),
            _reserved: Default::default(),
        }
    }
}
