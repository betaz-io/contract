pub use crate::traits::errors::OwnableError;
use ink::primitives::AccountId;

#[ink::trait_definition]
pub trait Ownable {
    #[ink(message)]
    fn owner(&self) -> Option<AccountId>;
    #[ink(message)]
    fn renounce_ownership(&mut self) -> Result<(), OwnableError>;
    #[ink(message)]
    fn transfer_ownership(&mut self, new_owner: Option<AccountId>) -> Result<(), OwnableError>;
}
