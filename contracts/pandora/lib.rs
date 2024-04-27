#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::pandora::PandoraPoolContractRef;
#[openbrush::implementation(Ownable, Pausable, Upgradeable, AccessControl, AccessControlEnumerable)]
#[openbrush::contract]
pub mod pandora {
    use bet_a0::{
        impls::{
            admin::AdminTraitImpl,
            pandora::{PandoraPoolTraitsImpl, ADMINER, *},
        },
        traits::error::Error,
    };
    use openbrush::{
        contracts::traits::psp34::*,
        modifiers,
        traits::{Storage, String},
    };

    use ink::{
        codegen::{EmitEvent, Env},
        prelude::vec::Vec,
        reflect::ContractEventBase,
    };

    use crate::pandora::access_control::only_role;

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct PandoraPoolContract {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        manager: pandora::data::Manager,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        admin: bet_a0::impls::admin::data::Data,
    }

    #[ink(event)]
    pub struct PlayEvent {
        session_id: u32,
        player: Option<AccountId>,
        token_id: Id,
        bet_number: u32,
    }

    #[ink(event)]
    pub struct WithdrawWinAmountEvent {
        session_id: u32,
        player: Option<AccountId>,
        win_amount: Balance,
    }

    #[ink(event)]
    pub struct WithdrawHoldAmountEvent {
        receiver: Option<AccountId>,
        amount:Balance,
    }

    impl AdminTraitImpl for PandoraPoolContract {}
    impl PandoraPoolTraitsImpl for PandoraPoolContract {
        fn _emit_play_event(
            &self,
            _session_id: u32,
            _player: AccountId,
            _token_id: Id,
            _bet_number: u32,
        ) {
            PandoraPoolContract::emit_event(
                self.env(),
                Event::PlayEvent(PlayEvent {
                    session_id: _session_id,
                    player: Some(_player),
                    token_id: _token_id,
                    bet_number: _bet_number,
                }),
            );
        }

        fn _emit_withdraw_win_amount_event(
            &self,
            _session_id: u32,
            _player: AccountId,
            _win_amount: Balance,
        ) {
            PandoraPoolContract::emit_event(
                self.env(),
                Event::WithdrawWinAmountEvent(WithdrawWinAmountEvent {
                    session_id: _session_id,
                    player: Some(_player),
                    win_amount: _win_amount,
                }),
            );
        }

        fn _emit_withdraw_hold_amount_event(
            &self,
            _receiver:AccountId,
            _amount:Balance,
        ) {
            PandoraPoolContract::emit_event(
                self.env(),
                Event::WithdrawHoldAmountEvent(WithdrawHoldAmountEvent {
                    receiver: Some(_receiver),
                    amount: _amount,
                }),
            );
        }
    }

    pub type Event = <PandoraPoolContract as ContractEventBase>::Type;

    impl PandoraPoolTraits for PandoraPoolContract {
        // EXECUTE FUNCTIONS
        // Change state contract
        #[ink(message)]
        fn change_state(&mut self, state: bool) -> Result<(), Error> {
            PandoraPoolTraitsImpl::change_state(self, state)
        }

        /// Withdraw fee
        #[ink(message)]
        fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error> {
            PandoraPoolTraitsImpl::withdraw_fee(self, account, value)
        }

        #[ink(message)]
        fn add_new_bet_session(&mut self) -> Result<(), Error> {
            PandoraPoolTraitsImpl::add_new_bet_session(self)
        }

        /// update total win amount
        fn update_total_win_amount(&mut self, amount: Balance) -> Result<(), Error> {
            PandoraPoolTraitsImpl::update_total_win_amount(self, amount)
        }

        /// update bet session
        fn update_bet_session(
            &mut self,
            session_id: u32,
            random_number: u32,
            status_type: SessionsStatusType,
        ) -> Result<(), Error> {
            PandoraPoolTraitsImpl::update_bet_session(self, session_id, random_number, status_type)
        }

        // play bet
        #[ink(message)]
        fn play(&mut self, session_id: u32, bet_number: u32, token_id: Id) -> Result<(), Error> {
            PandoraPoolTraitsImpl::play(self, session_id, bet_number, token_id)
        }

        #[ink(message)]
        fn handle_find_winner(&mut self, session_id: u32, index: u128) -> Result<(), Error> {
            PandoraPoolTraitsImpl::handle_find_winner(self, session_id, index)
        }

        #[ink(message)]
        fn finalize(&mut self, session_id: u32, random_number: u32) -> Result<(), Error> {
            PandoraPoolTraitsImpl::finalize(self, session_id, random_number)
        }

        // withdraw by winner
        #[ink(message)]
        fn withdraw_hold_amount(
            &mut self,
            receiver: AccountId,
            amount: Balance,
        ) -> Result<(), Error> {
            PandoraPoolTraitsImpl::withdraw_hold_amount(self, receiver, amount)
        }

        #[ink(message)]
        fn burn_ticket_used(&mut self, token_ids: Vec<Id>) -> Result<(), Error> {
            PandoraPoolTraitsImpl::burn_ticket_used(self, token_ids)
        }

        // SET FUNCTIONS
        #[ink(message)]
        fn set_psp34_contract_address(&mut self, account: AccountId) -> Result<(), Error> {
            PandoraPoolTraitsImpl::set_psp34_contract_address(self, account)
        }

        /// set max_bet_number
        #[ink(message)]
        fn set_max_bet_number(&mut self, max_bet_number: u32) -> Result<(), Error> {
            PandoraPoolTraitsImpl::set_max_bet_number(self, max_bet_number)
        }

        /// update is locked
        #[ink(message)]
        fn update_is_locked(&mut self, is_locked: bool) -> Result<(), Error> {
            PandoraPoolTraitsImpl::update_is_locked(self, is_locked)
        }

        /// add chainlink request id
        #[ink(message)]
        fn add_chainlink_request_id(
            &mut self,
            session_id: u32,
            chainlink_request_id: String,
        ) -> Result<(), Error> {
            PandoraPoolTraitsImpl::add_chainlink_request_id(self, session_id, chainlink_request_id)
        }

        // GET FUNCTIONS
        #[ink(message)]
        fn get_player_not_yet_processed(&self) -> u128 {
            PandoraPoolTraitsImpl::get_player_not_yet_processed(self)
        }

        /// Get hold amount players
        #[ink(message)]
        fn get_hold_amount_players(&self, address: AccountId) -> Option<Balance> {
            PandoraPoolTraitsImpl::get_hold_amount_players(self, address)
        }

        /// Get hold players by index
        #[ink(message)]
        fn get_hold_players_by_index(&self, index: u64) -> Option<AccountId> {
            PandoraPoolTraitsImpl::get_hold_players_by_index(self, index)
        }

        /// get Id in session by random number
        #[ink(message)]
        fn get_id_in_session_by_random_number_and_index(
            &self,
            session_id: u32,
            random_number: u32,
            index: u128,
        ) -> Option<Id> {
            PandoraPoolTraitsImpl::get_id_in_session_by_random_number_and_index(
                self,
                session_id,
                random_number,
                index,
            )
        }

        /// Get Hold Player Count
        #[ink(message)]
        fn get_hold_player_count(&self) -> u64 {
            PandoraPoolTraitsImpl::get_hold_player_count(self)
        }

        /// get Id in session
        #[ink(message)]
        fn get_id_in_session_by_index(&self, session_id: u32, index: u128) -> Option<Id> {
            PandoraPoolTraitsImpl::get_id_in_session_by_index(self, session_id, index)
        }

        /// get total hold amount
        #[ink(message)]
        fn get_total_hold_amount(&self) -> Balance {
            PandoraPoolTraitsImpl::get_total_hold_amount(self)
        }

        /// get chainlink request id by session id
        #[ink(message)]
        fn get_chainlink_request_id_by_session_id(&self, session_id: u32) -> Option<String> {
            PandoraPoolTraitsImpl::get_chainlink_request_id_by_session_id(self, session_id)
        }
        /// get is locked
        #[ink(message)]
        fn get_is_locked(&self) -> bool {
            PandoraPoolTraitsImpl::get_is_locked(self)
        }

        /// get max_bet_number
        #[ink(message)]
        fn get_max_bet_number(&self) -> u32 {
            PandoraPoolTraitsImpl::get_max_bet_number(self)
        }

        /// get total ticket in session
        #[ink(message)]
        fn session_total_ticket_amount(&self, session_id: u32) -> u128 {
            PandoraPoolTraitsImpl::session_total_ticket_amount(self, session_id)
        }

        /// get total win amount
        #[ink(message)]
        fn get_total_win_amount(&self) -> Balance {
            PandoraPoolTraitsImpl::get_total_win_amount(self)
        }

        /// get psp34 address
        #[ink(message)]
        fn get_psp34_contract_address(&self) -> AccountId {
            PandoraPoolTraitsImpl::get_psp34_contract_address(self)
        }

        /// get last session id
        #[ink(message)]
        fn get_last_session_id(&self) -> u32 {
            PandoraPoolTraitsImpl::get_last_session_id(self)
        }

        /// get bet session
        #[ink(message)]
        fn get_bet_session(&self, session_id: u32) -> Option<SessionInfo> {
            PandoraPoolTraitsImpl::get_bet_session(self, session_id)
        }

        // get player in session
        #[ink(message)]
        fn get_players_in_session_by_index(
            &self,
            session_id: u32,
            index: u128,
        ) -> Option<AccountId> {
            PandoraPoolTraitsImpl::get_players_in_session_by_index(self, session_id, index)
        }

        // total player in session
        #[ink(message)]
        fn total_players_in_session(&self, session_id: u32) -> u128 {
            PandoraPoolTraitsImpl::total_players_in_session(self, session_id)
        }

        // get total tickets win
        #[ink(message)]
        fn total_tickets_win(&self, session_id: u32, random_number: u32) -> u128 {
            PandoraPoolTraitsImpl::total_tickets_win(self, session_id, random_number)
        }

        // get player in session
        #[ink(message)]
        fn get_player_win_amount(&self, session_id: u32, account: AccountId) -> Option<Balance> {
            PandoraPoolTraitsImpl::get_player_win_amount(self, session_id, account)
        }

        // get layer_by_nft_id
        #[ink(message)]
        fn get_player_by_nft_id(&self, token_id: Id) -> Option<AccountId> {
            PandoraPoolTraitsImpl::get_player_by_nft_id(self, token_id)
        }

        // get player_used_nft
        #[ink(message)]
        fn get_nft_info(&self, token_id: Id) -> Option<NFTInfomation> {
            PandoraPoolTraitsImpl::get_nft_info(self, token_id)
        }

        #[ink(message)]
        fn get_owner(&self) -> Option<AccountId> {
            PandoraPoolTraitsImpl::get_owner(self)
        }
    }
    impl PandoraPoolContract {
        #[ink(constructor)]
        pub fn new(
            admin_address: AccountId,
            psp34_contract_address: AccountId,
            max_bet_number: u32,
        ) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            instance
                .initialize(admin_address, psp34_contract_address, max_bet_number)
                .ok()
                .unwrap();
            instance
        }

        /// Function init
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(
            &mut self,
            admin_address: AccountId,
            psp34_contract_address: AccountId,
            max_bet_number: u32,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            // Make sure the initial data can only be init once
            if self.manager.psp34_contract_address != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }
            self.manager.psp34_contract_address = psp34_contract_address;
            self.manager.max_bet_number = max_bet_number;
            access_control::Internal::_init_with_admin(self, Some(caller));
            AccessControl::grant_role(self, ADMINER, Some(caller)).expect("Can not set admin role");
            if !AccessControl::has_role(self, ADMINER, Some(admin_address)) {
                AccessControl::grant_role(self, ADMINER, Some(admin_address))
                    .expect("Can not set admin role");
            }
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_role(ADMINER))]
        pub fn update_bet_session(
            &mut self,
            session_id: u32,
            random_number: u32,
            status_type: SessionsStatusType,
        ) -> Result<(), Error> {
            PandoraPoolTraits::update_bet_session(self, session_id, random_number, status_type)
        }

        /// update total win amount
        #[ink(message)]
        #[modifiers(only_locked)]
        #[modifiers(only_role(ADMINER))]
        pub fn update_total_win_amount(&mut self, amount: Balance) -> Result<(), Error> {
            PandoraPoolTraits::update_total_win_amount(self, amount)
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}
