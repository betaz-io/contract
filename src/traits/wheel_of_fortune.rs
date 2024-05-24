use crate::traits::error::Error;
use openbrush::{
    contracts::traits::{
        psp22::{
            extensions::{burnable::*, mintable::*},
            *,
        },
        psp34::{
            extensions::{burnable::*, mintable::*},
            *,
        },
    },
    traits::{AccountId, Balance},
};

// use ink::prelude::vec::Vec;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Mintable;

#[openbrush::wrapper]
pub type Psp34Ref = dyn PSP34 + PSP34Burnable + PSP34Mintable;

#[openbrush::wrapper]
pub type WheelOfFortune = dyn WheelOfFortuneTrait;

#[openbrush::trait_definition]
pub trait WheelOfFortuneTrait {
    // EXECUTE FUNCTIONS
    /// Function changes state
    #[ink(message)]
    fn change_state(&mut self) -> Result<(), Error>;

    // SET FUNCTIONS
    #[ink(message)]
    fn set_betaz_token_fee(&mut self, betaz_token_fee: Balance) -> Result<(), Error>;
    #[ink(message)]
    fn set_round_distance(&mut self, round_distance: u64) -> Result<(), Error>;
    #[ink(message)]
    fn set_amount_out_min_nft(&mut self, amount_out_min_nft: u64) -> Result<(), Error>;
    #[ink(message)]
    fn set_amount_out_max_nft(&mut self, amount_out_max_nft: u64) -> Result<(), Error>;
    #[ink(message)]
    fn set_oracle_randomness_address(
        &mut self,
        oracle_randomness_address: AccountId,
    ) -> Result<(), Error>;
    #[ink(message)]
    fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error>;
    #[ink(message)]
    fn set_psp34_contract_address(
        &mut self,
        psp34_contract_address: AccountId,
    ) -> Result<(), Error>;

    // GET FUNCTIONS
    #[ink(message)]
    fn get_betaz_token_address(&self) -> AccountId;
    #[ink(message)]
    fn get_psp34_contract_address(&self) -> AccountId;
    #[ink(message)]
    fn get_oracle_randomness_address(&self) -> AccountId;
    #[ink(message)]
    fn get_betaz_token_fee(&self) -> Balance;
    #[ink(message)]
    fn get_round_distance(&self) -> u64;
    #[ink(message)]
    fn get_amount_out_min_nft(&self) -> u64;
    #[ink(message)]
    fn get_amount_out_max_nft(&self) -> u64;
}
