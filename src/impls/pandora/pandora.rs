use crate::traits::error::{Error, LockError};
pub use crate::{
    impls::pandora::{
        data,
        data::*,
        pandora,
        SessionsStatusType::{Completed, Finalized, Processing},
        *,
    },
    traits::pandora::*,
};
use ink::prelude::vec::Vec;
use openbrush::{
    contracts::{access_control::*, ownable::*, pausable::*, psp34::extensions::enumerable::*},
    modifier_definition, modifiers,
    traits::{AccountId, Balance, Storage, String},
};

use ink::env::CallFlags;

/// Throws if is_locked is false
#[modifier_definition]
pub fn only_locked<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Manager>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<LockError>,
{
    if instance.data().is_locked == false {
        return Err(From::from(LockError::NotLocked));
    }
    body(instance)
}

/// Throws if is_locked is true
#[modifier_definition]
pub fn only_not_locked<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Manager>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<LockError>,
{
    if instance.data().is_locked == true {
        return Err(From::from(LockError::Locked));
    }
    body(instance)
}

// Throws if is token owner
#[modifier_definition]
pub fn only_token_owner<T, F, R, E>(
    instance: &mut T,
    body: F,
    token_owner: AccountId,
) -> Result<R, E>
where
    T: Storage<Manager>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<Error>,
{
    if token_owner != T::env().caller() {
        return Err(From::from(Error::NotTokenOwner));
    }
    body(instance)
}

pub trait PandoraPoolTraitsImpl:
    Storage<Manager>
    + ownable::Ownable
    + pausable::Pausable
    + Storage<ownable::Data>
    + Storage<pausable::Data>
    + ownable::Internal
    + pausable::Internal
    + access_control::MembersManager
    + access_control::Internal
    + access_control::AccessControlImpl
    + Storage<access_control::Data>
{
    // EMIT EVENTS
    fn _emit_play_event(
        &self,
        _session_id: u32,
        _player: AccountId,
        _token_id: Id,
        _bet_number: u32,
    );

    fn _emit_withdraw_win_amount_event(
        &self,
        _session_id: u32,
        _player: AccountId,
        _win_amount: Balance,
    );

    // EXECUTE FUNCTIONS
    // Change state contract
    #[modifiers(only_role(ADMINER))]
    fn change_state(&mut self, state: bool) -> Result<(), Error> {
        if self._paused() == state {
            return Err(Error::InvalidState);
        }
        Ok(self._switch_pause()?)
    }

    /// Withdraw fee
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error> {
        if value > self.data::<Manager>().total_win_amounts {
            return Err(Error::NotEnoughBalance);
        }
        assert!(Self::env().transfer(account, value).is_ok());
        Ok(self.data::<Manager>().total_win_amounts = self
            .data::<Manager>()
            .total_win_amounts
            .checked_sub(value)
            .unwrap())
    }

    /// add bet session
    #[modifiers(only_role(ADMINER))]
    fn add_new_bet_session(&mut self) -> Result<(), Error> {
        let last_session_id = self
            .data::<Manager>()
            .last_session_id
            .checked_add(1)
            .unwrap();
        if self
            .data::<Manager>()
            .sessions
            .get(&last_session_id)
            .is_some()
        {
            return Err(Error::SessionIsExists);
        }
        let session_info = SessionInfo {
            random_number: 0,
            status: Processing,
        };
        self.data::<Manager>()
            .sessions
            .insert(&last_session_id, &session_info);

        // update last session id
        self.data::<Manager>().last_session_id = last_session_id;
        Ok(())
    }

    /// update bet session
    #[modifiers(only_role(ADMINER))]
    fn update_bet_session(
        &mut self,
        session_id: u32,
        random_number: u32,
        status_type: SessionsStatusType,
    ) -> Result<(), Error> {
        if let Some(mut session_info) = self.data::<Manager>().sessions.get(&session_id) {
            session_info.random_number = random_number;
            session_info.status = status_type;
            self.data::<Manager>()
                .sessions
                .insert(&session_id, &session_info);
        } else {
            return Err(Error::SessionNotExists);
        }
        Ok(())
    }

    // play bet
    #[modifiers(when_not_paused)]
    #[modifiers(only_token_owner(Psp34Ref::owner_of(&self.data::<Manager>().psp34_contract_address, token_id.clone()).unwrap()))]
    #[modifiers(only_not_locked)]
    fn play(&mut self, session_id: u32, bet_number: u32, token_id: Id) -> Result<(), Error> {
        let caller = Self::env().caller();
        assert!(
            (0..=self.data::<Manager>().max_bet_number).contains(&bet_number),
            "Invalid bet number"
        );

        // check limited ticket amount in session
        let session_ticket_amount = self.data::<Manager>().ticket_in_session.count(&session_id);
        if session_ticket_amount < self.data::<Manager>().session_total_ticket_amount {
            // add ticket to session
            self.data::<Manager>()
                .ticket_in_session
                .insert(&session_id, &token_id.clone());
        } else {
            return Err(Error::TicketAmountLimitReached);
        }

        if let Some(sessions_info) = self.data::<Manager>().sessions.get(&session_id) {
            if sessions_info.status == Processing {
                // Check token lock
                if let Some(ticket_info) = self.data::<Manager>().nft_infor.get(&token_id.clone()) {
                    if ticket_info.used {
                        return Err(Error::NftIsUsed);
                    }
                }

                // Check if this contract has been approved to be able to transfer the NFT
                let allowance = Psp34Ref::allowance(
                    &self.data::<Manager>().psp34_contract_address,
                    caller,
                    Self::env().account_id(),
                    Some(token_id.clone()),
                );
                if !allowance {
                    return Err(Error::NotApproved)
                }

                // Transfer NFT from Caller to pandora pool Contract
                let builder = Psp34Ref::transfer_builder(
                    &self.data::<Manager>().psp34_contract_address,
                    Self::env().account_id(),
                    token_id.clone(),
                    Vec::<u8>::new(),
                )
                .call_flags(CallFlags::default().set_allow_reentry(true));

                let transfer_nft_result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => Err(Error::CannotTransfer),
                };

                // when transfer successfully
                if transfer_nft_result.is_ok() {
                    // add players_in_session
                    self.data::<Manager>()
                        .players_in_session
                        .insert(session_id, &caller);

                    //  add player_nfts
                    self.data::<Manager>()
                        .player_nfts
                        .insert(&token_id.clone(), &caller);

                    // add ticket_player_link
                    self.data::<Manager>()
                        .ticket_player_link
                        .insert(&(&session_id, &bet_number), &token_id.clone());

                    // add nft to nft used list
                    let nft_info = NFTInfomation {
                        session_id,
                        bet_number,
                        time: Self::env().block_timestamp(),
                        used: true,
                    };
                    self.data::<Manager>()
                        .nft_infor
                        .insert(&token_id.clone(), &nft_info);

                    // emit event play
                    self._emit_play_event(session_id, caller, token_id.clone(), bet_number);
                } else {
                    return Err(Error::CannotTransfer)
                }
            } else {
                return Err(Error::SessionNotProcessed);
            }
        } else {
            return Err(Error::SessionNotExists);
        }

        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    #[modifiers(only_locked)]
    fn handle_find_winner(&mut self, session_id: u32, index: u128) -> Result<(), Error> {
        if let Some(sessions_info) = self.data::<Manager>().sessions.get(&session_id) {
            // check total ticket win
            if self.data::<Manager>().total_tickets_win > 0 {
                // win balace
                let win_balance = self
                    .data::<Manager>()
                    .total_win_amounts
                    .checked_div(self.data::<Manager>().total_tickets_win)
                    .unwrap();

                if sessions_info.status == Completed {
                    if let Some(nft_id) = self
                        .data::<Manager>()
                        .ticket_player_link
                        .get_value(&(&session_id, &sessions_info.random_number), &index)
                    {
                        if let Some(player_address) =
                            self.data::<Manager>().player_nfts.get(&nft_id)
                        {
                            if let Some(mut win_amount) = self
                                .data::<Manager>()
                                .player_win_amount
                                .get(&(&session_id, &player_address))
                            {
                                win_amount = win_amount.checked_add(win_balance).unwrap();
                                self.data::<Manager>()
                                    .player_win_amount
                                    .insert(&(&session_id, &player_address), &win_amount)
                            } else {
                                self.data::<Manager>()
                                    .player_win_amount
                                    .insert(&(&session_id, &player_address), &win_balance)
                            }

                            // Add player amount to hold_amount_players
                            if let Some(hold_amount_player) = self
                                .data::<Manager>()
                                .hold_amount_players
                                .get(&player_address)
                            {
                                if let Some(hold_amount_bidder_tmp) =
                                    hold_amount_player.checked_add(win_balance)
                                {
                                    self.data::<Manager>()
                                        .hold_amount_players
                                        .insert(&player_address, &hold_amount_bidder_tmp);
                                } else {
                                    return Err(Error::CheckedOperations);
                                }
                            } else {
                                self.data::<Manager>()
                                    .hold_amount_players
                                    .insert(&player_address, &win_balance);
                                self.data::<Manager>()
                                    .hold_players
                                    .insert(1, &player_address);
                            }

                            // update total win amount
                            self.data::<Manager>().total_win_amounts = self
                                .data::<Manager>()
                                .total_win_amounts
                                .checked_sub(win_balance)
                                .unwrap();

                            // update total ticket win
                            self.data::<Manager>().total_tickets_win = self
                                .data::<Manager>()
                                .total_tickets_win
                                .checked_sub(1 as u128)
                                .unwrap();
                        }
                    }
                } else {
                    return Err(Error::SessionNotCompleted);
                }
            }
        } else {
            return Err(Error::SessionNotExists);
        }
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    #[modifiers(only_locked)]
    fn finalize(&mut self, session_id: u32, random_number: u32) -> Result<(), Error> {
        if let Some(mut sessions_info) = self.data::<Manager>().sessions.get(&session_id) {
            if sessions_info.status != Finalized {
                return Err(Error::SessionNotFinished);
            }
            // update session
            sessions_info.random_number = random_number;
            sessions_info.status = Completed;
            self.data::<Manager>()
                .sessions
                .insert(&session_id, &sessions_info);

            self.data::<Manager>().total_tickets_win = self
                .data::<Manager>()
                .ticket_player_link
                .count(&(&session_id, &random_number));

            // add new session
            if self.add_new_bet_session().is_err() {
                return Err(Error::AddSessionFailed);
            }
        } else {
            return Err(Error::SessionNotExists);
        }

        Ok(())
    }

    // withdraw by winner
    #[modifiers(when_not_paused)]
    fn withdraw_hold_amount(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        if let Some(hold_amount) = self.data::<Manager>().hold_amount_players.get(&receiver) {
            let total_hold_amount = Self::env()
                .balance()
                .checked_sub(self.data::<Manager>().total_win_amounts)
                .unwrap();
            if hold_amount > 0 {
                if total_hold_amount == 0 || amount > hold_amount {
                    return Err(Error::NotEnoughBalance);
                }

                if amount <= total_hold_amount {
                    if Self::env().transfer(receiver, amount).is_err() {
                        return Err(Error::CannotTransfer);
                    }

                    // update hold amount
                    let new_hold_amount = hold_amount.checked_sub(amount).unwrap();
                    if amount < hold_amount {
                        self.data::<Manager>()
                            .hold_amount_players
                            .insert(&receiver, &new_hold_amount);
                    } else {
                        self.data::<Manager>().hold_amount_players.remove(&receiver);
                        self.data::<Manager>()
                            .hold_players
                            .remove_value(1, &receiver);
                    }
                } else {
                    if Self::env().transfer(receiver, total_hold_amount).is_err() {
                        return Err(Error::CannotTransfer);
                    }
                    // update hold amount
                    let new_hold_amount = hold_amount.checked_sub(total_hold_amount).unwrap();

                    self.data::<Manager>()
                        .hold_amount_players
                        .insert(&receiver, &new_hold_amount);
                }
            }
        } else {
            return Err(Error::HoldAmountPlayerNotExist);
        }

        Ok(())
    }

    // SET FUNCTIONS
    #[modifiers(only_role(ADMINER))]
    fn set_psp34_contract_address(&mut self, account: AccountId) -> Result<(), Error> {
        self.data::<Manager>().psp34_contract_address = account;
        Ok(())
    }

    /// set ticket_amount_ratio
    #[modifiers(only_role(ADMINER))]
    fn set_session_total_ticket_amount(
        &mut self,
        session_total_ticket_amount: u128,
    ) -> Result<(), Error> {
        Ok(self.data::<Manager>().session_total_ticket_amount = session_total_ticket_amount)
    }

    /// set max_bet_number
    #[modifiers(only_role(ADMINER))]
    fn set_max_bet_number(&mut self, max_bet_number: u32) -> Result<(), Error> {
        Ok(self.data::<Manager>().max_bet_number = max_bet_number)
    }

    /// update is locked
    #[modifiers(only_role(ADMINER))]
    fn update_is_locked(&mut self, is_locked: bool) -> Result<(), Error> {
        if is_locked == self.data::<Manager>().is_locked {
            return Err(Error::InvalidInput);
        }
        self.data::<Manager>().is_locked = is_locked;
        Ok(())
    }

    /// update total win amount
    #[modifiers(only_role(ADMINER))]
    fn update_total_win_amount(&mut self, amount: Balance) -> Result<(), Error> {
        self.data::<Manager>().total_win_amounts = self
            .data::<Manager>()
            .total_win_amounts
            .checked_add(amount)
            .unwrap();
        Ok(())
    }

    /// add chainlink request id
    #[modifiers(only_locked)]
    #[modifiers(only_role(ADMINER))]
    fn add_chainlink_request_id(
        &mut self,
        session_id: u32,
        chainlink_request_id: String,
    ) -> Result<(), Error> {
        if self
            .data::<Manager>()
            .chainlink_request_id_session_link
            .get(&session_id)
            .is_some()
        {
            return Err(Error::ChainlinkRequestIdIsExists);
        }
        self.data::<Manager>()
            .chainlink_request_id_session_link
            .insert(&session_id, &chainlink_request_id);
        Ok(())
    }

    // GET FUNCTIONS
    /// Get hold amount players
    fn get_player_not_yet_processed(&self) -> u128 {
        self.data::<data::Manager>().total_tickets_win
    }

    /// Get hold amount players
    fn get_hold_amount_players(&self, address: AccountId) -> Option<Balance> {
        self.data::<data::Manager>()
            .hold_amount_players
            .get(&address)
    }

    /// Get hold players by index
    fn get_hold_players_by_index(&self, index: u64) -> Option<AccountId> {
        self.data::<Manager>()
            .hold_players
            .get_value(1, &(index as u128))
    }

    /// Get Hold Player Count
    fn get_hold_bidder_count(&self) -> u64 {
        self.data::<Manager>().hold_players.count(1) as u64
    }

    /// get Id in session
    fn get_id_in_session_by_index(&self, session_id: u32, index: u128) -> Option<Id> {
        if let Some(token_id) = self
            .data::<Manager>()
            .ticket_in_session
            .get_value(&session_id, &index)
        {
            Some(token_id)
        } else {
            return None;
        }
    }

    /// get Id in session by random number
    fn get_id_in_session_by_random_number_and_index(
        &self,
        session_id: u32,
        random_number: u32,
        index: u128,
    ) -> Option<Id> {
        if let Some(token_id) = self
            .data::<Manager>()
            .ticket_player_link
            .get_value(&(&session_id, &random_number), &index)
        {
            Some(token_id)
        } else {
            return None;
        }
    }

    /// get total hold amount
    fn get_total_hold_amount(&self) -> Balance {
        Self::env()
            .balance()
            .checked_sub(self.data::<Manager>().total_win_amounts)
            .unwrap()
    }

    /// get chainlink request id by session id
    fn get_chainlink_request_id_by_session_id(&self, session_id: u32) -> Option<String> {
        if let Some(chainlink_request_id) = self
            .data::<Manager>()
            .chainlink_request_id_session_link
            .get(&session_id)
        {
            Some(chainlink_request_id)
        } else {
            return None;
        }
    }

    /// get is locked
    fn get_is_locked(&self) -> bool {
        self.data::<Manager>().is_locked
    }

    /// get max_bet_number
    fn get_max_bet_number(&self) -> u32 {
        self.data::<Manager>().max_bet_number
    }

    /// get ticket_amount_ratio
    fn get_session_total_ticket_amount(&self) -> u128 {
        self.data::<Manager>().session_total_ticket_amount
    }

    /// get total ticket in session
    fn session_total_ticket_amount(&self, session_id: u32) -> u128 {
        self.data::<Manager>().ticket_in_session.count(&session_id)
    }

    /// get total win amount
    fn get_total_win_amount(&self) -> Balance {
        self.data::<Manager>().total_win_amounts
    }

    /// get psp34 address
    fn get_psp34_contract_address(&self) -> AccountId {
        self.data::<Manager>().psp34_contract_address
    }

    /// get last session id
    fn get_last_session_id(&self) -> u32 {
        self.data::<Manager>().last_session_id
    }

    /// get bet session
    fn get_bet_session(&self, session_id: u32) -> Option<SessionInfo> {
        if let Some(session_info) = self.data::<Manager>().sessions.get(&session_id) {
            Some(session_info)
        } else {
            return None;
        }
    }

    // get player in session
    fn get_players_in_session_by_index(&self, session_id: u32, index: u128) -> Option<AccountId> {
        if let Some(player) = self
            .data::<Manager>()
            .players_in_session
            .get_value(session_id, &index)
        {
            Some(player)
        } else {
            return None;
        }
    }

    // total player in session
    fn total_players_in_session(&self, session_id: u32) -> u128 {
        self.data::<Manager>().players_in_session.count(session_id)
    }

    // get total tickets win
    fn total_tickets_win(&self, session_id: u32, random_number: u32) -> u128 {
        self.data::<Manager>()
            .ticket_player_link
            .count(&(&session_id, &random_number))
    }

    // get player in session
    fn get_player_win_amount(&self, session_id: u32, account: AccountId) -> Option<Balance> {
        if let Some(win_amount) = self
            .data::<Manager>()
            .player_win_amount
            .get(&(&session_id, &account))
        {
            Some(win_amount)
        } else {
            return None;
        }
    }

    // get layer_by_nft_id
    fn get_player_by_nft_id(&self, token_id: Id) -> Option<AccountId> {
        if let Some(player) = self.data::<Manager>().player_nfts.get(&token_id) {
            Some(player)
        } else {
            return None;
        }
    }

    // get player_used_nft
    fn get_nft_info(&self, token_id: Id) -> Option<NFTInfomation> {
        if let Some(nft_info) = self.data::<Manager>().nft_infor.get(&token_id) {
            Some(nft_info)
        } else {
            return None;
        }
    }

    /// Get owner address
    fn get_owner(&self) -> Option<AccountId> {
        ownable::Ownable::owner(self)
    }
}
