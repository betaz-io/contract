use crate::traits::error::Error;
use openbrush::{
    contracts::{
        psp22::extensions::{burnable::*, mintable::*},
        psp34::extensions::enumerable::*,
    },
    traits::{AccountId, Balance},
};

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Mintable;

#[openbrush::wrapper]
pub type Psp34Ref = dyn PSP34;

#[openbrush::wrapper]
pub type DAORef = dyn DAOTrait;

#[openbrush::trait_definition]
pub trait DAOTrait {
    // EXECUTE FUNCTIONS
    // Change state contract
    #[ink(message)]
    fn change_state(&mut self, state: bool) -> Result<(), Error>;

    /// Withdraw fee
    #[ink(message)]
    fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_core_address(&mut self, account: AccountId) -> Result<(), Error>;

    // GET FUNCTIONS
    /// get core contract address
    #[ink(message)]
    fn get_core_address(&self) -> AccountId;
}
