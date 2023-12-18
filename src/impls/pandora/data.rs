use ink::prelude::{string::String, vec::Vec};
use openbrush::{
    contracts::{access_control::*, psp34::extensions::enumerable::*},
    storage::{Mapping, MultiMapping, TypeGuard, ValueGuard},
    traits::{AccountId, Balance, Timestamp},
};

#[cfg(feature = "std")]
use ink::storage::traits::StorageLayout;

#[derive(Copy, Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub enum SessionsStatusType {
    Processing,
    Finalized,
    Completed,
}

#[derive(Copy, Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct SessionInfo {
    pub random_number: u32,
    pub status: SessionsStatusType,
}

impl Default for SessionInfo {
    fn default() -> Self {
        Self {
            random_number: Default::default(),
            status: SessionsStatusType::Processing,
        }
    }
}

#[derive(
    Copy, Clone, Debug, Ord, PartialOrd, Eq, PartialEq, Default, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct NFTInfomation {
    pub session_id: u32,
    pub bet_number: u32,
    pub time: Timestamp,
    pub used: bool,
}

// RoleType = 3739740293 (0xDEE7E885)
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Manager);

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Manager {
    pub attribute_names: Mapping<u32, Vec<u8>>,
    pub is_attribute: Mapping<String, bool>,
    pub locked_tokens: Mapping<Id, bool>,
    pub last_token_id: u64,
    pub attribute_count: u32,
    pub locked_token_count: u64,
    pub betaz_token_address: AccountId,
    // vote
    pub is_locked: bool,
    pub max_bet_number: u32,
    pub session_total_ticket_amount: u128,
    pub ticket_in_session: MultiMapping<u32, Id>, // session_id => nft_id
    pub total_win_amounts: Balance,
    pub nft_infor: Mapping<Id, NFTInfomation>,
    pub last_session_id: u32,
    pub sessions: Mapping<u32, SessionInfo>,
    pub players_in_session: MultiMapping<u32, AccountId, ValueGuard<u32>>,
    pub public_mint_price: Balance,
    pub player_win_amount: Mapping<(u32, AccountId), Balance, WinnerKey>, // (session_id, player_address) => azero
    pub ticket_player_link: MultiMapping<(u32, u32), Id, TicketKey>, // (session_id, bet_number) => nft_id
    pub player_nfts: Mapping<Id, AccountId>,
    pub chainlink_request_id_session_link: Mapping<u32, String>,
    pub hold_amount_players: Mapping<AccountId, Balance>, // hold amount
    pub hold_players: MultiMapping<u8, AccountId, ValueGuard<u8>>, 
    pub total_tickets_win: u128,
    pub _reserved: Option<()>,
}

impl Default for Manager {
    fn default() -> Self {
        Self {
            attribute_names: Default::default(),
            is_attribute: Default::default(),
            locked_tokens: Default::default(),
            last_token_id: Default::default(),
            attribute_count: Default::default(),
            locked_token_count: Default::default(),
            betaz_token_address: [0u8; 32].into(),
            // vote
            is_locked: Default::default(),
            max_bet_number: Default::default(),
            session_total_ticket_amount: Default::default(),
            ticket_in_session: Default::default(),
            total_win_amounts: Default::default(),
            nft_infor: Default::default(),
            last_session_id: Default::default(),
            sessions: Default::default(),
            players_in_session: Default::default(),
            public_mint_price:  Default::default(), // betaz token
            player_win_amount: Default::default(), // (session_id, player_address) => azero
            ticket_player_link: Default::default(), // (session_id, bet_number) => nft_id
            player_nfts: Default::default(),
            chainlink_request_id_session_link: Default::default(),
            hold_amount_players: Default::default(),
            hold_players: Default::default(),
            total_tickets_win: Default::default(),
            _reserved: Default::default(),
        }
    }
}

pub struct WinnerKey;

impl<'a> TypeGuard<'a> for WinnerKey {
    type Type = &'a (&'a u32, &'a AccountId);
}

pub struct TicketKey;

impl<'a> TypeGuard<'a> for TicketKey {
    type Type = &'a (&'a u32, &'a u32);
}
