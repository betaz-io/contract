use crate::traits::error::Error;
use ink::prelude::{string::String, vec::Vec};
use openbrush::{
    contracts::{
        psp22::extensions::{burnable::*, mintable::*},
        psp34::extensions::{enumerable::*, metadata::*},
        traits::ownable::*,
    },
    traits::{AccountId, Balance},
};

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Mintable;

#[openbrush::wrapper]
pub type Psp34Ref = dyn PSP34;

#[openbrush::wrapper]
pub type PandoraPsp34StandardRef = dyn Psp34Traits + PSP34 + PSP34Metadata + Ownable;

#[openbrush::trait_definition]
pub trait Psp34Traits: PSP34 + PSP34Metadata + Ownable {
    // EXECUTE FUNCTIONS
    // Change state contract
    #[ink(message)]
    fn change_state(&mut self, state: bool) -> Result<(), Error>;

    #[ink(message)]
    fn lock(&mut self, token_id: Id) -> Result<(), Error>;

    #[ink(message)]
    fn burn_betaz_token(&mut self) -> Result<(), Error>;

    #[ink(message)]
    fn public_buy(&mut self, amounts: u64) -> Result<(), Error>;

    // SET FUNCTIONS
    #[ink(message)]
    fn set_base_uri(&mut self, uri: String) -> Result<(), Error>;

    #[ink(message)]
    fn set_multiple_attributes(
        &mut self,
        token_id: Id,
        metadata: Vec<(String, String)>,
    ) -> Result<(), Error>;

    #[ink(message)]
    fn set_betaz_token_address(&mut self, account: AccountId) -> Result<(), Error>;

    /// set public_mint_price
    #[ink(message)]
    fn set_public_mint_price(&mut self, price: Balance) -> Result<(), Error>;

    // GET FUNCTIONS
    /// get public_mint_price
    #[ink(message)]
    fn get_public_mint_price(&self) -> Balance;

    /// get betaz address
    #[ink(message)]
    fn get_betaz_token_address(&self) -> AccountId;

    #[ink(message)]
    fn get_attributes(&self, token_id: Id, attributes: Vec<String>) -> Vec<String>;

    #[ink(message)]
    fn get_attribute_count(&self) -> u32;

    #[ink(message)]
    fn get_attribute_name(&self, index: u32) -> String;

    #[ink(message)]
    fn token_uri(&self, token_id: u64) -> String;

    #[ink(message)]
    fn get_owner(&self) -> Option<AccountId>;

    #[ink(message)]
    fn get_last_token_id(&self) -> u64;

    #[ink(message)]
    fn is_locked_nft(&self, token_id: Id) -> bool;

    #[ink(message)]
    fn get_locked_token_count(&self) -> u64;
}