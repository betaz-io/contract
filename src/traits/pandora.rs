use crate::impls::pandora::{NFTInfomation, SessionInfo, SessionsStatusType};
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
pub type PandoraPoolRef = dyn PandoraPoolTraits + PSP34 + PSP34Metadata + Ownable;

#[openbrush::trait_definition]
pub trait PandoraPoolTraits: PSP34 + PSP34Metadata + Ownable {
    // EXECUTE FUNCTIONS
    // Change state contract
    #[ink(message)]
    fn change_state(&mut self, state: bool) -> Result<(), Error>;

    /// Withdraw fee
    #[ink(message)]
    fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn lock(&mut self, token_id: Id) -> Result<(), Error>;

    #[ink(message)]
    fn add_new_bet_session(&mut self) -> Result<(), Error>;

    /// update bet session
    #[ink(message)]
    fn update_bet_session(
        &mut self,
        session_id: u32,
        random_number: u32,
        status_type: SessionsStatusType,
    ) -> Result<(), Error>;

    // play bet
    #[ink(message)]
    fn play(&mut self, session_id: u32, bet_number: u32, token_id: Id) -> Result<(), Error>;

    #[ink(message)]
    fn handle_find_winner(&mut self, session_id: u32, index: u128) -> Result<(), Error>;

    #[ink(message)]
    fn finalize(&mut self, session_id: u32, random_number: u32) -> Result<(), Error>;

    // withdraw by winner
    #[ink(message)]
    fn withdraw_win_amount(&mut self, winner: AccountId, session_id: u32) -> Result<(), Error>;

    #[ink(message)]
    fn burn_betaz_token(&mut self) -> Result<(), Error>;

    #[ink(message)]
    fn burn_ticket_used(&mut self, token_ids: Vec<Id>) -> Result<(), Error>;

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

    // update nft info
    #[ink(message)]
    fn update_nft_info(
        &mut self,
        token_id: Id,
        session_id: u32,
        bet_number: u32,
        status: bool,
    ) -> Result<(), Error>;

    /// set ticket_amount_ratio
    #[ink(message)]
    fn set_session_total_ticket_amount(&mut self, ticket_amount_ratio: u128) -> Result<(), Error>;

    /// set public_mint_price
    #[ink(message)]
    fn set_public_mint_price(&mut self, price: Balance) -> Result<(), Error>;

    /// set max_bet_number
    #[ink(message)]
    fn set_max_bet_number(&mut self, max_bet_number: u32) -> Result<(), Error>;

    // GET FUNCTIONS
    /// get max_bet_number
    #[ink(message)]
    fn get_max_bet_number(&self) -> u32;

    /// get public_mint_price
    #[ink(message)]
    fn get_public_mint_price(&self) -> Balance;

    /// get ticket_amount_ratio
    #[ink(message)]
    fn get_session_total_ticket_amount(&self) -> u128;

    /// get total ticket in session
    #[ink(message)]
    fn session_total_ticket_amount(&self, session_id: u32) -> u128;

    /// get total win amount
    #[ink(message)]
    fn get_total_win_amount(&self) -> Balance;

    /// get betaz address
    #[ink(message)]
    fn get_betaz_token_address(&self) -> AccountId;

    /// get last session id
    #[ink(message)]
    fn get_last_session_id(&self) -> u32;

    /// get bet session
    #[ink(message)]
    fn get_bet_session(&self, session_id: u32) -> Option<SessionInfo>;

    // get player in session
    #[ink(message)]
    fn get_players_in_session_by_index(&self, session_id: u32, index: u128) -> Option<AccountId>;

    // total player in session
    #[ink(message)]
    fn total_players_in_session(&self, session_id: u32) -> u128;

    // get total tickets win
    #[ink(message)]
    fn total_tickets_win(&self, session_id: u32, random_number: u32) -> u128;

    // get player in session
    #[ink(message)]
    fn get_player_win_amount(&self, session_id: u32, account: AccountId) -> Option<Balance>;

    // get layer_by_nft_id
    #[ink(message)]
    fn get_player_by_nft_id(&self, token_id: Id) -> Option<AccountId>;

    // get player_used_nft
    #[ink(message)]
    fn get_nft_info(&self, token_id: Id) -> Option<NFTInfomation>;

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
