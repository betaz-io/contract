use crate::impls::pandora::{NFTInfomation, SessionInfo, SessionsStatusType};
use crate::traits::error::Error;
use ink::prelude::string::String;
use openbrush::{
    contracts::{
        psp34::extensions::{burnable::*, mintable::*},
        traits::ownable::*,
    },
    traits::{AccountId, Balance},
};

#[openbrush::wrapper]
pub type Psp34Ref = dyn PSP34 + PSP34Burnable + PSP34Mintable;

#[openbrush::wrapper]
pub type PandoraPoolRef = dyn PandoraPoolTraits + Ownable;

#[openbrush::trait_definition]
pub trait PandoraPoolTraits: Ownable {
    // EXECUTE FUNCTIONS
    // Change state contract
    #[ink(message)]
    fn change_state(&mut self, state: bool) -> Result<(), Error>;

    /// Withdraw fee
    #[ink(message)]
    fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error>;

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
    fn withdraw_hold_amount(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error>;

    // SET FUNCTIONS
    #[ink(message)]
    fn set_psp34_contract_address(&mut self, account: AccountId) -> Result<(), Error>;

    /// set ticket_amount_ratio
    #[ink(message)]
    fn set_session_total_ticket_amount(&mut self, ticket_amount_ratio: u128) -> Result<(), Error>;

    /// set max_bet_number
    #[ink(message)]
    fn set_max_bet_number(&mut self, max_bet_number: u32) -> Result<(), Error>;

    /// update is locked
    #[ink(message)]
    fn update_is_locked(&mut self, is_locked: bool) -> Result<(), Error>;

    /// add chainlink request id
    #[ink(message)]
    fn add_chainlink_request_id(
        &mut self,
        session_id: u32,
        chainlink_request_id: String,
    ) -> Result<(), Error>;

    // GET FUNCTIONS
    /// Get hold amount players
    #[ink(message)]
    fn get_player_not_yet_processed(&self) -> u128;

    /// Get hold amount players
    #[ink(message)]
    fn get_hold_amount_players(&self, address: AccountId) -> Option<Balance>;

    /// Get hold players by index
    #[ink(message)]
    fn get_hold_players_by_index(&self, index: u64) -> Option<AccountId>;

    /// Get Hold Player Count
    #[ink(message)]
    fn get_hold_bidder_count(&self) -> u64;

    /// get Id in session
    #[ink(message)]
    fn get_id_in_session_by_index(&self, session_id: u32, index: u128) -> Option<Id>;

    /// get Id in session by random number
    #[ink(message)]
    fn get_id_in_session_by_random_number_and_index(
        &self,
        session_id: u32,
        random_number: u32,
        index: u128,
    ) -> Option<Id>;

    /// get total hold amount
    #[ink(message)]
    fn get_total_hold_amount(&self) -> Balance;

    /// get chainlink request id by session id
    #[ink(message)]
    fn get_chainlink_request_id_by_session_id(&self, session_id: u32) -> Option<String>;

    /// get is locked
    #[ink(message)]
    fn get_is_locked(&self) -> bool;

    /// get max_bet_number
    #[ink(message)]
    fn get_max_bet_number(&self) -> u32;

    /// get ticket_amount_ratio
    #[ink(message)]
    fn get_session_total_ticket_amount(&self) -> u128;

    /// get total ticket in session
    #[ink(message)]
    fn session_total_ticket_amount(&self, session_id: u32) -> u128;

    /// get total win amount
    #[ink(message)]
    fn get_total_win_amount(&self) -> Balance;

    /// get psp34 address
    #[ink(message)]
    fn get_psp34_contract_address(&self) -> AccountId;

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
    fn get_owner(&self) -> Option<AccountId>;
}
