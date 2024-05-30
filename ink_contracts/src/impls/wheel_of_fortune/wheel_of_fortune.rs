pub use crate::traits::errors::WheelOfFortuneError;
use ink::env::{DefaultEnvironment, Environment};
use ink::primitives::AccountId;
pub type Balance = <DefaultEnvironment as Environment>::Balance;

#[ink::storage_item]
#[derive(Debug)]
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

impl Data {
    // SET FUNCTIONS
    pub fn set_betaz_token_fee(
        &mut self,
        betaz_token_fee: Balance,
    ) -> Result<(), WheelOfFortuneError> {
        self.betaz_token_fee = betaz_token_fee;
        Ok(())
    }
    pub fn set_round_distance(&mut self, round_distance: u64) -> Result<(), WheelOfFortuneError> {
        self.round_distance = round_distance;
        Ok(())
    }
    pub fn set_amount_out_min_nft(
        &mut self,
        amount_out_min_nft: u64,
    ) -> Result<(), WheelOfFortuneError> {
        if amount_out_min_nft > self.amount_out_max_nft {
            return Err(WheelOfFortuneError::InvalidInput);
        }
        self.amount_out_min_nft = amount_out_min_nft;
        Ok(())
    }
    pub fn set_amount_out_max_nft(
        &mut self,
        amount_out_max_nft: u64,
    ) -> Result<(), WheelOfFortuneError> {
        if amount_out_max_nft < self.amount_out_min_nft {
            return Err(WheelOfFortuneError::InvalidInput);
        }
        self.amount_out_max_nft = amount_out_max_nft;
        Ok(())
    }
    pub fn set_oracle_randomness_address(
        &mut self,
        oracle_randomness_address: AccountId,
    ) -> Result<(), WheelOfFortuneError> {
        self.oracle_randomness_address = oracle_randomness_address;
        Ok(())
    }
    pub fn set_betaz_token_address(
        &mut self,
        betaz_token_address: AccountId,
    ) -> Result<(), WheelOfFortuneError> {
        self.betaz_token_address = betaz_token_address;
        Ok(())
    }
    pub fn set_psp34_contract_address(
        &mut self,
        psp34_contract_address: AccountId,
    ) -> Result<(), WheelOfFortuneError> {
        self.psp34_contract_address = psp34_contract_address;
        Ok(())
    }

    // GET FUNCTIONS
    pub fn get_betaz_token_address(&self) -> AccountId {
        self.betaz_token_address
    }
    pub fn get_psp34_contract_address(&self) -> AccountId {
        self.psp34_contract_address
    }
    pub fn get_oracle_randomness_address(&self) -> AccountId {
        self.oracle_randomness_address
    }
    pub fn get_betaz_token_fee(&self) -> Balance {
        self.betaz_token_fee
    }
    pub fn get_round_distance(&self) -> u64 {
        self.round_distance
    }
    pub fn get_amount_out_min_nft(&self) -> u64 {
        self.amount_out_min_nft
    }
    pub fn get_amount_out_max_nft(&self) -> u64 {
        self.amount_out_max_nft
    }
}
