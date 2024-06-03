use crate::traits::error::Error;
use openbrush::traits::{AccountId, Balance};

#[openbrush::wrapper]
pub type BetAZRef = dyn BetAZTrait;

#[openbrush::trait_definition]
pub trait BetAZTrait {
    // EXECUTE FUNCTION
    #[ink(message)]
    fn change_state(&mut self) -> Result<(), Error>;
}
