#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::pandora::PandoraPoolContractRef;
#[openbrush::implementation(
    PSP34,
    PSP34Metadata,
    PSP34Enumerable,
    Ownable,
    Pausable,
    Upgradeable,
    AccessControl
)]
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
        contracts::psp34::extensions::{burnable::*, enumerable::*, metadata::*},
        modifiers,
        traits::{Storage, String},
    };

    use ink::{
        codegen::{EmitEvent, Env},
        reflect::ContractEventBase,
    };

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct PandoraPoolContract {
        #[storage_field]
        psp34: psp34::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        metadata: metadata::Data,
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
    pub struct PublicBuyEvent {
        buyer: Option<AccountId>,
        amounts: u64,
        betaz_price: Balance,
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

        fn _emit_public_buy_event(&self, _buyer: AccountId, _amounts: u64, _betaz_price: Balance) {
            PandoraPoolContract::emit_event(
                self.env(),
                Event::PublicBuyEvent(PublicBuyEvent {
                    buyer: Some(_buyer),
                    amounts: _amounts,
                    betaz_price: _betaz_price,
                }),
            );
        }
    }

    pub type Event = <PandoraPoolContract as ContractEventBase>::Type;

    impl PSP34Burnable for PandoraPoolContract {
        #[ink(message)]
        fn burn(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error> {
            let caller = self.env().caller();
            if let Some(token_owner) = psp34::PSP34Impl::owner_of(self, id.clone()) {
                if token_owner != account {
                    return Err(PSP34Error::Custom(String::from("not token owner")));
                }
                let allowance =
                    psp34::PSP34Impl::allowance(self, account, caller, Some(id.clone()));
                if caller == account || allowance {
                    if self.manager.locked_tokens.get(&id).is_some() {
                        self.manager.locked_tokens.remove(&id);
                        if let Some(locked_token_count) =
                            self.manager.locked_token_count.checked_sub(1)
                        {
                            self.manager.locked_token_count = locked_token_count;
                        } else {
                            return Err(PSP34Error::Custom(String::from(
                                "Locked token count error",
                            )));
                        }
                    }

                    psp34::Internal::_burn_from(self, account, id)
                } else {
                    return Err(PSP34Error::Custom(String::from(
                        "caller is not token owner or approved",
                    )));
                }
            } else {
                return Err(PSP34Error::Custom(String::from("No token owner found")));
            }
        }
    }

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
        fn lock(&mut self, token_id: Id) -> Result<(), Error> {
            PandoraPoolTraitsImpl::lock(self, token_id)
        }

        #[ink(message)]
        fn add_new_bet_session(&mut self) -> Result<(), Error> {
            PandoraPoolTraitsImpl::add_new_bet_session(self)
        }

        /// update bet session
        #[ink(message)]
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
        fn withdraw_win_amount(&mut self, winner: AccountId, session_id: u32) -> Result<(), Error> {
            PandoraPoolTraitsImpl::withdraw_win_amount(self, winner, session_id)
        }

        #[ink(message)]
        fn burn_betaz_token(&mut self) -> Result<(), Error> {
            PandoraPoolTraitsImpl::burn_betaz_token(self)
        }

        #[ink(message)]
        fn burn_ticket_used(&mut self, token_ids: Vec<Id>) -> Result<(), Error> {
            PandoraPoolTraitsImpl::burn_ticket_used(self, token_ids)
        }

        #[ink(message)]
        fn public_buy(&mut self, amounts: u64) -> Result<(), Error> {
            PandoraPoolTraitsImpl::public_buy(self, amounts)
        }

        // SET FUNCTIONS
        #[ink(message)]
        fn set_base_uri(&mut self, uri: String) -> Result<(), Error> {
            PandoraPoolTraitsImpl::set_base_uri(self, uri)
        }

        #[ink(message)]
        fn set_multiple_attributes(
            &mut self,
            token_id: Id,
            metadata: Vec<(String, String)>,
        ) -> Result<(), Error> {
            PandoraPoolTraitsImpl::set_multiple_attributes(self, token_id, metadata)
        }

        #[ink(message)]
        fn set_betaz_token_address(&mut self, account: AccountId) -> Result<(), Error> {
            PandoraPoolTraitsImpl::set_betaz_token_address(self, account)
        }

        // update nft info
        #[ink(message)]
        fn update_nft_info(
            &mut self,
            token_id: Id,
            session_id: u32,
            bet_number: u32,
            status: bool,
        ) -> Result<(), Error> {
            PandoraPoolTraitsImpl::update_nft_info(self, token_id, session_id, bet_number, status)
        }

        /// set ticket_amount_ratio
        #[ink(message)]
        fn set_session_total_ticket_amount(
            &mut self,
            session_total_ticket_amount: u128,
        ) -> Result<(), Error> {
            PandoraPoolTraitsImpl::set_session_total_ticket_amount(
                self,
                session_total_ticket_amount,
            )
        }

        /// set public_mint_price
        #[ink(message)]
        fn set_public_mint_price(&mut self, price: Balance) -> Result<(), Error> {
            PandoraPoolTraitsImpl::set_public_mint_price(self, price)
        }

        /// set max_bet_number
        #[ink(message)]
        fn set_max_bet_number(&mut self, max_bet_number: u32) -> Result<(), Error> {
            PandoraPoolTraitsImpl::set_max_bet_number(self, max_bet_number)
        }

        // GET FUNCTIONS
        /// get max_bet_number
        #[ink(message)]
        fn get_max_bet_number(&self) -> u32 {
            PandoraPoolTraitsImpl::get_max_bet_number(self)
        }

        /// get public_mint_price
        #[ink(message)]
        fn get_public_mint_price(&self) -> Balance {
            PandoraPoolTraitsImpl::get_public_mint_price(self)
        }

        /// get ticket_amount_ratio
        #[ink(message)]
        fn get_session_total_ticket_amount(&self) -> u128 {
            PandoraPoolTraitsImpl::get_session_total_ticket_amount(self)
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

        /// get betaz address
        #[ink(message)]
        fn get_betaz_token_address(&self) -> AccountId {
            PandoraPoolTraitsImpl::get_betaz_token_address(self)
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
        fn get_attributes(&self, token_id: Id, attributes: Vec<String>) -> Vec<String> {
            PandoraPoolTraitsImpl::get_attributes(self, token_id, attributes)
        }

        #[ink(message)]
        fn get_attribute_count(&self) -> u32 {
            PandoraPoolTraitsImpl::get_attribute_count(self)
        }

        #[ink(message)]
        fn get_attribute_name(&self, index: u32) -> String {
            PandoraPoolTraitsImpl::get_attribute_name(self, index)
        }

        #[ink(message)]
        fn token_uri(&self, token_id: u64) -> String {
            PandoraPoolTraitsImpl::token_uri(self, token_id)
        }

        #[ink(message)]
        fn get_owner(&self) -> Option<AccountId> {
            PandoraPoolTraitsImpl::get_owner(self)
        }

        #[ink(message)]
        fn get_last_token_id(&self) -> u64 {
            PandoraPoolTraitsImpl::get_last_token_id(self)
        }

        #[ink(message)]
        fn is_locked_nft(&self, token_id: Id) -> bool {
            PandoraPoolTraitsImpl::is_locked_nft(self, token_id)
        }

        #[ink(message)]
        fn get_locked_token_count(&self) -> u64 {
            PandoraPoolTraitsImpl::get_locked_token_count(self)
        }
    }
    impl PandoraPoolContract {
        #[ink(constructor)]
        pub fn new(
            name: String,
            symbol: String,
            admin_address: AccountId,
            betaz_token_address: AccountId,
            public_mint_price: Balance,
            session_total_ticket_amount: u128,
            max_bet_number: u32,
        ) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            metadata::Internal::_set_attribute(
                &mut instance,
                Id::U8(0),
                String::from("name"),
                name,
            );
            metadata::Internal::_set_attribute(
                &mut instance,
                Id::U8(0),
                String::from("symbol"),
                symbol,
            );
            instance
                .initialize(
                    admin_address,
                    betaz_token_address,
                    public_mint_price,
                    session_total_ticket_amount,
                    max_bet_number,
                )
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
            betaz_token_address: AccountId,
            public_mint_price: Balance,
            session_total_ticket_amount: u128,
            max_bet_number: u32,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            // Make sure the initial data can only be init once
            if self.manager.betaz_token_address != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }
            self.manager.betaz_token_address = betaz_token_address;
            self.manager.session_total_ticket_amount = session_total_ticket_amount;
            self.manager.max_bet_number = max_bet_number;
            self.manager.public_mint_price = public_mint_price;
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
        pub fn mint(&mut self) -> Result<(), Error> {
            let caller = self.env().caller();
            if let Some(last_token_id) = self.manager.last_token_id.checked_add(1) {
                self.manager.last_token_id = last_token_id;
                if psp34::Internal::_mint_to(self, caller, Id::U64(self.manager.last_token_id))
                    .is_err()
                {
                    return Err(Error::CannotMint);
                }
                return Ok(());
            } else {
                return Err(Error::CannotIncreaseLastTokenId);
            }
        }

        #[ink(message)]
        #[modifiers(only_role(ADMINER))]
        pub fn multiple_mint_ticket(&mut self, amounts: u64) -> Result<(), Error> {
            let caller = self.env().caller();
            let start = self.manager.last_token_id;
            for i in start..amounts.checked_add(start).unwrap() {
                let token_id = i.checked_add(1).unwrap();
                self.manager.last_token_id = token_id;
                if psp34::Internal::_mint_to(self, caller, Id::U64(token_id)).is_err() {
                    return Err(Error::CannotMint);
                }
            }
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_role(ADMINER))]
        pub fn mint_with_attributes(
            &mut self,
            metadata: Vec<(String, String)>,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            if let Some(last_token_id) = self.manager.last_token_id.checked_add(1) {
                self.manager.last_token_id = last_token_id;
                if psp34::Internal::_mint_to(self, caller, Id::U64(self.manager.last_token_id))
                    .is_err()
                {
                    return Err(Error::CannotMint);
                }
                if PandoraPoolTraits::set_multiple_attributes(
                    self,
                    Id::U64(self.manager.last_token_id),
                    metadata,
                )
                .is_err()
                {
                    return Err(Error::CannotSetAttributes);
                }
                return Ok(());
            } else {
                return Err(Error::CannotIncreaseLastTokenId);
            }
        }

        #[ink(message)]
        #[modifiers(only_role(ADMINER))]
        pub fn update_win_amount_and_session_status(
            &mut self,
            session_id: u32,
            win_amount: Balance,
        ) -> Result<(), Error> {
            self.manager.total_win_amounts = self
                .manager
                .total_win_amounts
                .checked_add(win_amount)
                .unwrap();
            if let Some(mut secssion_info) = self.manager.sessions.get(&session_id) {
                secssion_info.status = Finalized;
                self.manager.sessions.insert(&session_id, &secssion_info);
            } else {
                return Err(Error::SessionNotExists);
            }
            Ok(())
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}
