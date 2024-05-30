pub use crate::traits::errors::UpgradeableError;
use ink::env::{DefaultEnvironment, Environment};
pub type Hash = <DefaultEnvironment as Environment>::Hash;

#[ink::trait_definition]
pub trait UpgradeableTrait {
    #[ink(message)]
    fn set_code(&mut self, code_hash: Hash) -> Result<(), UpgradeableError>;
}
