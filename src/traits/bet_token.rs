use crate::traits::error::Error;
use openbrush::traits::{AccountId, Balance};

#[openbrush::wrapper]
pub type BetAZRef = dyn BetAZTrait;

#[openbrush::trait_definition]
pub trait BetAZTrait {
    // EXECUTE FUNCTION
    #[ink(message)]
    fn change_state(&mut self) -> Result<(), Error>;
    /// Only minter can mint
    #[ink(message)]
    fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), Error>;
    #[ink(message)]
    fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), Error>;
    /// Withdraw any Balance of Contract - only Owner
    #[ink(message)]
    fn withdraw(&mut self, value: Balance) -> Result<(), Error>;
    // GET FUNCTIONS
    #[ink(message)]
    fn is_admin_address(&self, address: AccountId) -> bool;

    #[ink(message)]
    fn is_minter_address(&self, address: AccountId) -> bool;

    // SET FUNCTIONS
    /// Set admin 
    #[ink(message)]
    fn set_admin_address(&mut self, address: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_minter_address(&mut self, address: AccountId) -> Result<(), Error>;
}
