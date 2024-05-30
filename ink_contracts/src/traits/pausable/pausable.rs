pub use crate::traits::errors::PausableError;

#[ink::trait_definition]
pub trait Pausable {
    #[ink(message)]
    fn paused(&self) -> bool;
}
