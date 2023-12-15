#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::beta0_core::BetA0CoreContractRef;

#[openbrush::implementation(Ownable, Pausable, Upgradeable, AccessControl, AccessControlEnumerable)]
#[openbrush::contract]
pub mod beta0_core {
    use crate::beta0_core::access_control::only_role;
    use bet_a0::{
        impls::{
            admin::AdminTraitImpl,
            beta0_core::{data::Manager, BetA0CoreTraitImpl, BetInformation, ADMINER, *},
        },
        traits::error::Error,
    };
    use betaz_random::betaz_random::BetA0RandomContractRef;
    use ink::prelude::vec::Vec;
    use ink::{
        codegen::{EmitEvent, Env},
        reflect::ContractEventBase,
    };
    use openbrush::{
        contracts::{
            ownable::{OwnableError, *},
            pausable::{PausableError, *},
        },
        modifiers,
        traits::{DefaultEnv, Storage},
    };
    use pandora::pandora::PandoraPoolContractRef;
    use staking::staking::StakingPoolContractRef;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct BetA0CoreContract {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        manager: Manager,
        #[storage_field]
        admin_data: bet_a0::impls::admin::data::Data,
    }

    #[ink(event)]
    pub struct WinEvent {
        player: Option<AccountId>,
        is_over: u8,
        random_number: u32,
        bet_number: u32,
        bet_amount: Balance,
        win_amount: Balance,
        reward_amount: Balance,
        oracle_round: u64,
    }

    #[ink(event)]
    pub struct LoseEvent {
        player: Option<AccountId>,
        is_over: u8,
        random_number: u32,
        bet_number: u32,
        bet_amount: Balance,
        reward_amount: Balance,
        oracle_round: u64,
    }

    #[ink(event)]
    pub struct PlayEvent {
        player: Option<AccountId>,
        is_over: u8,
        bet_number: u32,
        bet_amount: Balance,
        oracle_round: u64,
    }

    #[ink(event)]
    pub struct TransferStakingPoolEvent {
        staking_pool_address: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct TransferPandoraPoolEvent {
        pandora_pool_address: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct TransferTreasuryPoolEvent {
        treasury_pool_address: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct MintTokenEvent {
        contract_address: AccountId,
        amount: Balance,
    }

    pub type Event = <BetA0CoreContract as ContractEventBase>::Type;

    impl AdminTraitImpl for BetA0CoreContract {}
    impl BetA0CoreTraitImpl for BetA0CoreContract {
        fn _emit_transfer_staking_pool_event(
            &self,
            _staking_pool_address: AccountId,
            _amount: Balance,
        ) {
            BetA0CoreContract::emit_event(
                self.env(),
                Event::TransferStakingPoolEvent(TransferStakingPoolEvent {
                    staking_pool_address: _staking_pool_address,
                    amount: _amount,
                }),
            );
        }
        fn _emit_transfer_treasury_pool_event(
            &self,
            _treasury_pool_address: AccountId,
            _amount: Balance,
        ) {
            BetA0CoreContract::emit_event(
                self.env(),
                Event::TransferTreasuryPoolEvent(TransferTreasuryPoolEvent {
                    treasury_pool_address: _treasury_pool_address,
                    amount: _amount,
                }),
            );
        }
        fn _emit_transfer_pandora_pool_event(
            &self,
            _pandora_pool_address: AccountId,
            _amount: Balance,
        ) {
            BetA0CoreContract::emit_event(
                self.env(),
                Event::TransferPandoraPoolEvent(TransferPandoraPoolEvent {
                    pandora_pool_address: _pandora_pool_address,
                    amount: _amount,
                }),
            );
        }
        fn _emit_mint_token_event(&self, _contract_address: AccountId, _amount: Balance) {
            BetA0CoreContract::emit_event(
                self.env(),
                Event::MintTokenEvent(MintTokenEvent {
                    contract_address: _contract_address,
                    amount: _amount,
                }),
            )
        }
    }
    impl BetA0CoreTrait for BetA0CoreContract {
        // EXECUTE FUNCTIONS
        /// Function changes state
        #[ink(message)]
        fn change_state(&mut self) -> Result<(), Error> {
            BetA0CoreTraitImpl::change_state(self)
        }

        /// tranfer token to pool
        #[ink(message)]
        fn tranfer_token_to_pool(&mut self, pool: AccountId, amount: Balance) -> Result<(), Error> {
            BetA0CoreTraitImpl::tranfer_token_to_pool(self, pool, amount)
        }

        /// Withdraw Fees - only Owner
        #[ink(message)]
        fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error> {
            BetA0CoreTraitImpl::withdraw_fee(self, account, value)
        }

        /// Update core pool - only owner and admin
        #[ink(message, payable)]
        fn update_core_pool(&mut self) -> Result<(), Error> {
            BetA0CoreTraitImpl::update_core_pool(self)
        }

        /// Withdraw hold amount
        #[ink(message)]
        fn withdraw_hold_amount(
            &mut self,
            receiver: AccountId,
            amount: Balance,
        ) -> Result<(), Error> {
            BetA0CoreTraitImpl::withdraw_hold_amount(self, receiver, amount)
        }

        // Update reward pool - only owner and admin
        #[ink(message)]
        fn update_reward_pool(&mut self, amount: Balance) -> Result<(), Error> {
            BetA0CoreTraitImpl::update_reward_pool(self, amount)
        }

        // Transfer amount pandora pool
        #[ink(message)]
        fn transfer_pandora_pool(&mut self) -> Result<(), Error> {
            BetA0CoreTraitImpl::transfer_pandora_pool(self)
        }

        // Transfer amount staking pool
        #[ink(message)]
        fn transfer_staking_pool(&mut self) -> Result<(), Error> {
            BetA0CoreTraitImpl::transfer_staking_pool(self)
        }

        // Transfer amount treasury pool
        #[ink(message)]
        fn transfer_treasury_pool(&mut self) -> Result<(), Error> {
            BetA0CoreTraitImpl::transfer_treasury_pool(self)
        }

        // SET FUNCTIONS
        /// Set min number over roll
        #[ink(message)]
        fn set_min_number_over_roll(&mut self, min_over_number: u32) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_min_number_over_roll(self, min_over_number)
        }

        /// Set max number over roll
        #[ink(message)]
        fn set_max_number_over_roll(&mut self, max_over_number: u32) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_max_number_over_roll(self, max_over_number)
        }

        /// Set min number under roll
        #[ink(message)]
        fn set_min_number_under_roll(&mut self, min_under_number: u32) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_min_number_under_roll(self, min_under_number)
        }

        /// Set max number under roll
        #[ink(message)]
        fn set_max_number_under_roll(&mut self, max_under_number: u32) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_max_number_under_roll(self, max_under_number)
        }

        /// Set over_rates and discount rate - Only Owner 2 vectors same size
        #[ink(message)]
        fn set_rates(&mut self, over_rates: Vec<u32>, under_rates: Vec<u32>) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_rates(self, over_rates, under_rates)
        }

        /// Set new psp22 address
        #[ink(message)]
        fn set_bet_token_address(&mut self, bet_token_address: AccountId) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_bet_token_address(self, bet_token_address)
        }

        /// Set new token ratio
        #[ink(message)]
        fn set_token_ratio(&mut self, token_ratio: u32) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_token_ratio(self, token_ratio)
        }

        /// Set max bet ratio
        #[ink(message)]
        fn set_max_bet_ratio(&mut self, max_bet_ratio: u32) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_max_bet_ratio(self, max_bet_ratio)
        }

        /// Set staking pool address
        #[ink(message)]
        fn set_staking_address(&mut self, address: AccountId) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_staking_address(self, address)
        }

        /// Set treasury pool address
        #[ink(message)]
        fn set_treasury_address(&mut self, address: AccountId) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_treasury_address(self, address)
        }

        /// Set oracle randomness address
        #[ink(message)]
        fn set_oracle_randomness_address(&mut self, address: AccountId) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_oracle_randomness_address(self, address)
        }

        /// Set limit round
        #[ink(message)]
        fn set_round_distance(&mut self, round_distance: u64) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_round_distance(self, round_distance)
        }

        /// set betaz address
        #[ink(message)]
        fn set_betaz_address(&mut self, account: AccountId) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_betaz_address(self, account)
        }

        /// set percentage_rates
        #[ink(message)]
        fn set_percentage_rates(&mut self, percentage_rates: u32) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_percentage_rates(self, percentage_rates)
        }

        /// Set dao contract address
        #[ink(message)]
        fn set_dao_address(&mut self, address: AccountId) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_dao_address(self, address)
        }

        // GET FUCTIONS
        /// Get platform fee amount
        #[ink(message)]
        fn get_platform_fee_amount(&self) -> Balance {
            BetA0CoreTraitImpl::get_platform_fee_amount(self)
        }

        /// Get dao contract address
        #[ink(message)]
        fn get_dao_address(&self) -> AccountId {
            BetA0CoreTraitImpl::get_dao_address(self)
        }

        /// get percentage_rates
        #[ink(message)]
        fn get_percentage_rates(&self) -> u32 {
            BetA0CoreTraitImpl::get_percentage_rates(self)
        }

        /// get betaz address
        #[ink(message)]
        fn get_betaz_address(&self) -> AccountId {
            BetA0CoreTraitImpl::get_betaz_address(self)
        }

        /// get min number over roll
        #[ink(message)]
        fn get_min_number_over_roll(&self) -> u32 {
            BetA0CoreTraitImpl::get_min_number_over_roll(self)
        }

        /// get max number over roll
        #[ink(message)]
        fn get_max_number_over_roll(&self) -> u32 {
            BetA0CoreTraitImpl::get_max_number_over_roll(self)
        }

        /// get min number under roll
        #[ink(message)]
        fn get_min_number_under_roll(&self) -> u32 {
            BetA0CoreTraitImpl::get_min_number_under_roll(self)
        }

        /// get max number under roll
        #[ink(message)]
        fn get_max_number_under_roll(&self) -> u32 {
            BetA0CoreTraitImpl::get_max_number_under_roll(self)
        }

        /// Get token ratio
        #[ink(message)]
        fn get_token_ratio(&self) -> u32 {
            BetA0CoreTraitImpl::get_token_ratio(self)
        }

        /// Get psp22 address
        #[ink(message)]
        fn bet_token_address(&self) -> AccountId {
            BetA0CoreTraitImpl::bet_token_address(self)
        }

        /// Get Over Rates
        #[ink(message)]
        fn get_over_rates(&self) -> Vec<u32> {
            BetA0CoreTraitImpl::get_over_rates(self)
        }

        /// Get Under Rates
        #[ink(message)]
        fn get_under_rates(&self) -> Vec<u32> {
            BetA0CoreTraitImpl::get_under_rates(self)
        }

        /// Get Max Bet
        #[ink(message)]
        fn get_max_bet_ratio(&self) -> u32 {
            BetA0CoreTraitImpl::get_max_bet_ratio(self)
        }

        #[ink(message)]
        fn get_max_bet(&self) -> u128 {
            BetA0CoreTraitImpl::get_max_bet(self)
        }

        /// get contract token balance
        #[ink(message)]
        fn get_token_balance(&self) -> Balance {
            BetA0CoreTraitImpl::get_token_balance(self)
        }

        /// Is bet exist
        #[ink(message)]
        fn is_bet_available(&self, player: AccountId) -> bool {
            BetA0CoreTraitImpl::is_bet_available(self, player)
        }

        /// get bet
        #[ink(message)]
        fn get_bet(&self, player: AccountId) -> Option<BetInformation> {
            BetA0CoreTraitImpl::get_bet(self, player)
        }

        /// Get core pool ratio
        #[ink(message)]
        fn get_core_pool_ratio(&self) -> u32 {
            BetA0CoreTraitImpl::get_core_pool_ratio(self)
        }

        /// Get staking pool ratio
        #[ink(message)]
        fn get_staking_pool_ratio(&self) -> u32 {
            BetA0CoreTraitImpl::get_staking_pool_ratio(self)
        }

        /// Get treasury pool ratio
        #[ink(message)]
        fn get_treasury_pool_ratio(&self) -> u32 {
            BetA0CoreTraitImpl::get_treasury_pool_ratio(self)
        }

        /// Get staking pool address
        #[ink(message)]
        fn get_staking_address(&self) -> AccountId {
            BetA0CoreTraitImpl::get_staking_address(self)
        }

        /// Get treasury pool address
        #[ink(message)]
        fn get_treasury_address(&self) -> AccountId {
            BetA0CoreTraitImpl::get_treasury_address(self)
        }

        /// Get reward pool amount
        #[ink(message)]
        fn get_reward_pool_amount(&self) -> Balance {
            BetA0CoreTraitImpl::get_reward_pool_amount(self)
        }

        /// Get core pool amout
        #[ink(message)]
        fn get_core_pool_amout(&self) -> Balance {
            BetA0CoreTraitImpl::get_core_pool_amout(self)
        }

        /// Get staking pool amount
        #[ink(message)]
        fn get_staking_pool_amount(&self) -> Balance {
            BetA0CoreTraitImpl::get_staking_pool_amount(self)
        }

        /// Get treasury pool amount
        #[ink(message)]
        fn get_treasury_pool_amount(&self) -> Balance {
            BetA0CoreTraitImpl::get_treasury_pool_amount(self)
        }

        /// Get hold amount players
        #[ink(message)]
        fn get_hold_amount_players(&self, address: AccountId) -> Option<Balance> {
            BetA0CoreTraitImpl::get_hold_amount_players(self, address)
        }

        /// Get hold players by index
        #[ink(message)]
        fn get_hold_players_by_index(&self, index: u64) -> Option<AccountId> {
            BetA0CoreTraitImpl::get_hold_players_by_index(self, index)
        }

        /// Get Hold Player Count
        #[ink(message)]
        fn get_hold_bidder_count(&self) -> u64 {
            BetA0CoreTraitImpl::get_hold_bidder_count(self)
        }

        /// Get oracle randomness address
        #[ink(message)]
        fn get_oracle_randomness_address(&self) -> AccountId {
            BetA0CoreTraitImpl::get_oracle_randomness_address(self)
        }

        /// Get limit round
        #[ink(message)]
        fn get_round_distance(&self) -> u64 {
            BetA0CoreTraitImpl::get_round_distance(self)
        }

        /// Set pandora pool address
        #[ink(message)]
        fn set_pandora_address(&mut self, address: AccountId) -> Result<(), Error> {
            BetA0CoreTraitImpl::set_pandora_address(self, address)
        }

        /// Get pandora pool ratio
        #[ink(message)]
        fn get_pandora_pool_ratio(&self) -> u32 {
            BetA0CoreTraitImpl::get_pandora_pool_ratio(self)
        }

        /// Get treasury pool address
        #[ink(message)]
        fn get_pandora_address(&self) -> AccountId {
            BetA0CoreTraitImpl::get_pandora_address(self)
        }

        /// Get pandora pool amount
        #[ink(message)]
        fn get_pandora_pool_amount(&self) -> Balance {
            BetA0CoreTraitImpl::get_pandora_pool_amount(self)
        }
    }

    impl BetA0CoreContract {
        #[ink(constructor)]
        pub fn new(
            max_bet_ratio: u32,
            token_ratio: u32,
            min_over_number: u32,
            max_over_number: u32,
            min_under_number: u32,
            max_under_number: u32,
            core_pool_ratio: u32,
            staking_pool_ratio: u32,
            treasury_pool_ratio: u32,
            pandora_pool_ratio: u32,
            // caller address
            admin_address: AccountId,
            betaz_address: AccountId,
            // contract address
            bet_token_address: AccountId,
            staking_address: AccountId,
            treasury_address: AccountId,
            pandora_address: AccountId,
            oracle_randomness_address: AccountId,
            dao_address: AccountId,
            // round_distance: u64,
        ) -> Self {
            let mut instance = Self::default();
            let caller = <Self as DefaultEnv>::env().caller();
            ownable::Internal::_init_with_owner(&mut instance, caller);
            instance
                .initialize(
                    betaz_address,
                    max_bet_ratio,
                    bet_token_address,
                    token_ratio,
                    min_over_number,
                    max_over_number,
                    min_under_number,
                    max_under_number,
                    admin_address,
                    core_pool_ratio,
                    staking_pool_ratio,
                    treasury_pool_ratio,
                    pandora_pool_ratio,
                    staking_address,
                    treasury_address,
                    pandora_address,
                    oracle_randomness_address,
                    dao_address,
                    // round_distance,
                )
                .ok()
                .unwrap();
            instance
        }

        // EXECUTE FUNCTIONS
        /// Function init
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(
            &mut self,
            betaz_address: AccountId,
            max_bet_ratio: u32,
            bet_token_address: AccountId,
            token_ratio: u32,
            min_over_number: u32,
            max_over_number: u32,
            min_under_number: u32,
            max_under_number: u32,
            admin_address: AccountId,
            core_pool_ratio: u32,
            staking_pool_ratio: u32,
            treasury_pool_ratio: u32,
            pandora_pool_ratio: u32,
            staking_address: AccountId,
            treasury_address: AccountId,
            pandora_address: AccountId,
            oracle_randomness_address: AccountId,
            dao_address: AccountId,
            // round_distance: u64,
        ) -> Result<(), Error> {
            // Make sure the initial data can only be init once
            if self.manager.bet_token_address != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }
            self.manager.over_rates = [
                0, 0, 0, 0, 103, 104, 105, 107, 108, 109, 110, 111, 113, 114, 115, 117, 118, 120,
                121, 123, 124, 126, 127, 129, 131, 133, 134, 136, 138, 140, 142, 144, 147, 149,
                151, 153, 156, 158, 161, 164, 166, 169, 172, 175, 179, 182, 185, 189, 193, 197,
                201, 205, 209, 214, 218, 223, 229, 234, 240, 246, 252, 259, 266, 273, 281, 289,
                298, 307, 317, 328, 339, 351, 364, 378, 394, 410, 428, 447, 469, 492, 518, 547,
                579, 615, 656, 703, 757, 820, 895, 985, 1094, 1231, 1407, 1641, 1970, 2462, 3283,
                4925, 9850, 0,
            ]
            .to_vec();
            self.manager.under_rates = [
                0, 9850, 4925, 3283, 2462, 1970, 1641, 1407, 1231, 1094, 985, 895, 820, 757, 703,
                656, 615, 579, 547, 518, 492, 469, 447, 428, 410, 394, 378, 364, 351, 339, 328,
                317, 307, 298, 289, 281, 273, 266, 259, 252, 246, 240, 234, 229, 223, 218, 214,
                209, 205, 201, 197, 193, 189, 185, 182, 179, 175, 172, 169, 166, 164, 161, 158,
                156, 153, 151, 149, 147, 144, 142, 140, 138, 136, 134, 133, 131, 129, 127, 126,
                124, 123, 121, 120, 118, 117, 115, 114, 113, 111, 110, 109, 108, 107, 105, 104,
                103, 0, 0, 0, 0,
            ]
            .to_vec();
            self.manager.percentage_rates = 100;
            self.manager.betaz_address = betaz_address;
            self.manager.max_bet_ratio = max_bet_ratio;
            self.manager.bet_token_address = bet_token_address;
            self.manager.token_ratio = token_ratio;
            self.manager.min_over_number = min_over_number;
            self.manager.max_over_number = max_over_number;
            self.manager.min_under_number = min_under_number;
            self.manager.max_under_number = max_under_number;
            self.manager.pool_manager.core_pool_ratio = core_pool_ratio;
            self.manager.pool_manager.staking_pool_ratio = staking_pool_ratio;
            self.manager.pool_manager.treasury_pool_ratio = treasury_pool_ratio;
            self.manager.pool_manager.pandora_pool_ratio = pandora_pool_ratio;
            self.manager.staking_address = staking_address;
            self.manager.treasury_address = treasury_address;
            self.manager.pandora_pool_address = pandora_address;
            self.manager.oracle_randomness_address = oracle_randomness_address;
            self.manager.dao_address = dao_address;
            self.manager.round_distance = 1;
            if max_bet_ratio == 0
                || core_pool_ratio == 0
                || staking_pool_ratio == 0
                || treasury_pool_ratio == 0
            {
                return Err(Error::InvalidInputRatio);
            }
            access_control::Internal::_init_with_admin(self, Some(self.env().caller()));
            AccessControl::grant_role(self, ADMINER, Some(self.env().caller()))
                .expect("Can not set admin role");
            if !AccessControl::has_role(self, ADMINER, Some(admin_address)) {
                AccessControl::grant_role(self, ADMINER, Some(admin_address))
                    .expect("Can not set admin role");
            }
            Ok(())
        }

        /// Play
        #[ink(message, payable)]
        #[modifiers(when_not_paused)]
        pub fn play(&mut self, bet_number: u32, is_over: u8) -> Result<(), Error> {
            let player = self.env().caller();
            let bet_amount = self.env().transferred_value();
            let max_bet = (self.manager.pool_manager.core_pool_amout)
                .checked_div(self.manager.max_bet_ratio as u128)
                .unwrap();

            assert!((1..=max_bet).contains(&bet_amount), "Invalid bet amount");

            if is_over == 1 {
                assert!(
                    (self.manager.min_over_number..=self.manager.max_over_number)
                        .contains(&bet_number),
                    "Invalid bet number"
                );
            } else if is_over == 0 {
                assert!(
                    (self.manager.min_under_number..=self.manager.max_under_number)
                        .contains(&bet_number),
                    "Invalid bet number"
                );
            }

            if let Some(_bet_info) = self.manager.bets.get(&player) {
                return Err(Error::BetNotFinalized);
            }

            let betaz_random_contract: BetA0RandomContractRef =
                ink::env::call::FromAccountId::from_account_id(
                    self.manager.oracle_randomness_address,
                );
            let round = BetA0RandomContractRef::get_latest_round(&betaz_random_contract);

            let oracle_round = round.checked_add(self.manager.round_distance).unwrap();

            let new_bet = BetInformation {
                is_over,
                bet_number,
                bet_amount,
                oracle_round,
            };

            // Update listed token
            self.manager.bets.insert(&player, &new_bet);

            BetA0CoreContract::emit_event(
                self.env(),
                Event::PlayEvent(PlayEvent {
                    player: Some(player),
                    is_over,
                    bet_number,
                    bet_amount,
                    oracle_round,
                }),
            );

            Ok(())
        }

        /// Finalize Bet
        #[ink(message)]
        #[modifiers(when_not_paused)]
        pub fn finalize(&mut self) -> Result<bool, Error> {
            let player = self.env().caller();
            let core_pool_ratio = self.manager.pool_manager.core_pool_ratio;
            let staking_pool_ratio = self.manager.pool_manager.staking_pool_ratio;
            let treasury_pool_ratio = self.manager.pool_manager.treasury_pool_ratio;
            let pandora_pool_ratio = self.manager.pool_manager.pandora_pool_ratio;
            if let Some(_bet_info) = self.manager.bets.get(&player) {
                let bet_number = _bet_info.bet_number.clone();
                let bet_amount = _bet_info.bet_amount.clone();
                let is_over = _bet_info.is_over.clone();
                let oracle_round = _bet_info.oracle_round.clone();
                let is_win: bool;
                let mut betaz_random_contract: BetA0RandomContractRef =
                    ink::env::call::FromAccountId::from_account_id(
                        self.manager.oracle_randomness_address,
                    );

                if let Some(random_number) = BetA0RandomContractRef::get_random_number_for_round(
                    &mut betaz_random_contract,
                    oracle_round,
                ) {
                    let mut reward_amount = bet_amount
                        .checked_mul(self.manager.token_ratio as u128)
                        .unwrap();
                    if reward_amount > self.manager.pool_manager.reward_pool_amount {
                        reward_amount = self.manager.pool_manager.reward_pool_amount
                    }

                    self.manager.bets.remove(&player);

                    if is_over == 1 {
                        assert!(
                            (self.manager.min_over_number..=self.manager.max_over_number)
                                .contains(&bet_number)
                        );
                        if random_number > bet_number {
                            // WIN
                            // How much to send to winner
                            self.manager.pool_manager.core_pool_amout = self
                                .manager
                                .pool_manager
                                .core_pool_amout
                                .checked_add(bet_amount)
                                .unwrap();
                            let win_amount = (self.manager.over_rates[bet_number as usize]
                                as Balance)
                                .checked_mul(bet_amount)
                                .unwrap()
                                .checked_div(self.manager.percentage_rates as Balance)
                                .unwrap();

                            if win_amount > self.manager.pool_manager.core_pool_amout {
                                let hold_amount = win_amount
                                    .checked_sub(self.manager.pool_manager.core_pool_amout)
                                    .unwrap();

                                // Add player amount to hold_amount_players
                                if let Some(hold_amount_player) =
                                    self.manager.hold_amount_players.get(player)
                                {
                                    if let Some(hold_amount_bidder_tmp) =
                                        hold_amount_player.checked_add(hold_amount)
                                    {
                                        self.manager
                                            .hold_amount_players
                                            .insert(player, &hold_amount_bidder_tmp);
                                    } else {
                                        return Err(Error::CheckedOperations);
                                    }
                                } else {
                                    self.manager
                                        .hold_amount_players
                                        .insert(player, &hold_amount);
                                    self.manager.hold_players.insert(1, &player);
                                }
                                let win_amount = self.manager.pool_manager.core_pool_amout;
                                assert!(self.env().transfer(player, win_amount).is_ok());
                                self.manager.pool_manager.core_pool_amout = self
                                    .manager
                                    .pool_manager
                                    .core_pool_amout
                                    .checked_sub(win_amount)
                                    .unwrap();
                            } else {
                                assert!(self.env().transfer(player, win_amount).is_ok());
                                self.manager.pool_manager.core_pool_amout = self
                                    .manager
                                    .pool_manager
                                    .core_pool_amout
                                    .checked_sub(win_amount)
                                    .unwrap();
                            }

                            // event win
                            BetA0CoreContract::emit_event(
                                self.env(),
                                Event::WinEvent(WinEvent {
                                    player: Some(player),
                                    is_over,
                                    random_number,
                                    bet_number,
                                    bet_amount,
                                    win_amount,
                                    reward_amount,
                                    oracle_round,
                                }),
                            );

                            is_win = true;
                        } else {
                            // LOSE
                            // send to pool
                            let receive_amount_core_pool = bet_amount
                                .checked_mul(core_pool_ratio as u128)
                                .unwrap()
                                .checked_div(100_u128)
                                .unwrap();
                            let receive_amount_staking_pool = bet_amount
                                .checked_mul(staking_pool_ratio as u128)
                                .unwrap()
                                .checked_div(100_u128)
                                .unwrap();
                            let receive_amount_treasury_pool = bet_amount
                                .checked_mul(treasury_pool_ratio as u128)
                                .unwrap()
                                .checked_div(100_u128)
                                .unwrap();
                            let receive_amount_pandora_pool = bet_amount
                                .checked_mul(pandora_pool_ratio as u128)
                                .unwrap()
                                .checked_div(100_u128)
                                .unwrap();

                            // send fee to owner
                            let to_sent_fee = bet_amount
                                .checked_sub(receive_amount_core_pool)
                                .unwrap()
                                .checked_sub(receive_amount_staking_pool)
                                .unwrap()
                                .checked_sub(receive_amount_treasury_pool)
                                .unwrap()
                                .checked_sub(receive_amount_pandora_pool)
                                .unwrap();
                            // fee amount
                            self.manager.pool_manager.platform_fee_amount = self
                                .manager
                                .pool_manager
                                .platform_fee_amount
                                .checked_add(to_sent_fee)
                                .unwrap();
                            // tranfer
                            assert!(self
                                .env()
                                .transfer(self.manager.betaz_address, to_sent_fee)
                                .is_ok());

                            // update pool
                            self.manager.pool_manager.core_pool_amout = self
                                .manager
                                .pool_manager
                                .core_pool_amout
                                .checked_add(receive_amount_core_pool)
                                .unwrap();
                            self.manager.pool_manager.staking_pool_amount = self
                                .manager
                                .pool_manager
                                .staking_pool_amount
                                .checked_add(receive_amount_staking_pool)
                                .unwrap();
                            self.manager.pool_manager.treasury_pool_amount = self
                                .manager
                                .pool_manager
                                .treasury_pool_amount
                                .checked_add(receive_amount_treasury_pool)
                                .unwrap();
                            self.manager.pool_manager.pandora_pool_amount = self
                                .manager
                                .pool_manager
                                .pandora_pool_amount
                                .checked_add(receive_amount_pandora_pool)
                                .unwrap();

                            // event lose
                            BetA0CoreContract::emit_event(
                                self.env(),
                                Event::LoseEvent(LoseEvent {
                                    player: Some(player),
                                    is_over,
                                    random_number,
                                    bet_number,
                                    bet_amount,
                                    reward_amount,
                                    oracle_round,
                                }),
                            );

                            is_win = false;
                        }
                    } else if is_over == 0 {
                        assert!(
                            (self.manager.min_under_number..=self.manager.max_under_number)
                                .contains(&bet_number)
                        );
                        if random_number < bet_number {
                            // WIN
                            // How much to send to winner
                            self.manager.pool_manager.core_pool_amout = self
                                .manager
                                .pool_manager
                                .core_pool_amout
                                .checked_add(bet_amount)
                                .unwrap();
                            let win_amount = (self.manager.under_rates[bet_number as usize]
                                as Balance)
                                .checked_mul(bet_amount)
                                .unwrap()
                                .checked_div(self.manager.percentage_rates as Balance)
                                .unwrap();

                            if win_amount > self.manager.pool_manager.core_pool_amout {
                                let hold_amount = win_amount
                                    .checked_sub(self.manager.pool_manager.core_pool_amout)
                                    .unwrap();

                                // Add player amount to hold_amount_players
                                if let Some(hold_amount_player) =
                                    self.manager.hold_amount_players.get(player)
                                {
                                    if let Some(hold_amount_bidder_tmp) =
                                        hold_amount_player.checked_add(hold_amount)
                                    {
                                        self.manager
                                            .hold_amount_players
                                            .insert(player, &hold_amount_bidder_tmp);
                                    } else {
                                        return Err(Error::CheckedOperations);
                                    }
                                } else {
                                    self.manager
                                        .hold_amount_players
                                        .insert(player, &hold_amount);
                                    self.manager.hold_players.insert(1, &player);
                                }
                                let win_amount = self.manager.pool_manager.core_pool_amout;
                                assert!(self.env().transfer(player, win_amount).is_ok());
                                self.manager.pool_manager.core_pool_amout = self
                                    .manager
                                    .pool_manager
                                    .core_pool_amout
                                    .checked_sub(win_amount)
                                    .unwrap();
                            } else {
                                assert!(self.env().transfer(player, win_amount).is_ok());
                                self.manager.pool_manager.core_pool_amout = self
                                    .manager
                                    .pool_manager
                                    .core_pool_amout
                                    .checked_sub(win_amount)
                                    .unwrap();
                            }

                            // event win
                            BetA0CoreContract::emit_event(
                                self.env(),
                                Event::WinEvent(WinEvent {
                                    player: Some(player),
                                    is_over,
                                    random_number,
                                    bet_number,
                                    bet_amount,
                                    win_amount,
                                    reward_amount,
                                    oracle_round,
                                }),
                            );

                            is_win = true;
                        } else {
                            // LOSE
                            // send to pool
                            let receive_amount_core_pool = bet_amount
                                .checked_mul(core_pool_ratio as u128)
                                .unwrap()
                                .checked_div(100_u128)
                                .unwrap();
                            let receive_amount_staking_pool = bet_amount
                                .checked_mul(staking_pool_ratio as u128)
                                .unwrap()
                                .checked_div(100_u128)
                                .unwrap();
                            let receive_amount_treasury_pool = bet_amount
                                .checked_mul(treasury_pool_ratio as u128)
                                .unwrap()
                                .checked_div(100_u128)
                                .unwrap();
                            let receive_amount_pandora_pool = bet_amount
                                .checked_mul(pandora_pool_ratio as u128)
                                .unwrap()
                                .checked_div(100_u128)
                                .unwrap();

                            // send fee to owner
                            let to_sent_fee = bet_amount
                                .checked_sub(receive_amount_core_pool)
                                .unwrap()
                                .checked_sub(receive_amount_staking_pool)
                                .unwrap()
                                .checked_sub(receive_amount_treasury_pool)
                                .unwrap()
                                .checked_sub(receive_amount_pandora_pool)
                                .unwrap();

                            // fee amount
                            self.manager.pool_manager.platform_fee_amount = self
                                .manager
                                .pool_manager
                                .platform_fee_amount
                                .checked_add(to_sent_fee)
                                .unwrap();
                            // tranfer
                            assert!(self
                                .env()
                                .transfer(self.manager.betaz_address, to_sent_fee)
                                .is_ok());

                            // update pool
                            self.manager.pool_manager.core_pool_amout = self
                                .manager
                                .pool_manager
                                .core_pool_amout
                                .checked_add(receive_amount_core_pool)
                                .unwrap();
                            self.manager.pool_manager.staking_pool_amount = self
                                .manager
                                .pool_manager
                                .staking_pool_amount
                                .checked_add(receive_amount_staking_pool)
                                .unwrap();
                            self.manager.pool_manager.treasury_pool_amount = self
                                .manager
                                .pool_manager
                                .treasury_pool_amount
                                .checked_add(receive_amount_treasury_pool)
                                .unwrap();
                            self.manager.pool_manager.pandora_pool_amount = self
                                .manager
                                .pool_manager
                                .pandora_pool_amount
                                .checked_add(receive_amount_pandora_pool)
                                .unwrap();

                            // event lose
                            BetA0CoreContract::emit_event(
                                self.env(),
                                Event::LoseEvent(LoseEvent {
                                    player: Some(player),
                                    is_over,
                                    random_number,
                                    bet_number,
                                    bet_amount,
                                    reward_amount,
                                    oracle_round,
                                }),
                            );

                            is_win = false;
                        }
                    } else {
                        return Err(Error::InvalidInput);
                    }

                    // reward
                    let to_sent = bet_amount
                        .checked_mul(self.manager.token_ratio as u128)
                        .unwrap();
                    assert!(BetA0CoreTraitImpl::reward_token(self, player, to_sent).is_ok());
                    return Ok(is_win);
                } else {
                    return Err(Error::NotTimeToFinalized);
                }
            } else {
                return Err(Error::BetNotExist);
            }
        }

        // Transfer pandora pool
        #[ink(message)]
        #[modifiers(when_not_paused)]
        #[modifiers(only_role(ADMINER))]
        pub fn transfer_and_update_session_pandora_pool(
            &mut self,
            session_id: u32,
        ) -> Result<(), Error> {
            let contract_balance = self.manager.pool_manager.pandora_pool_amount;
            let contract_address = self.manager.pandora_pool_address;

            if contract_balance > 0 {
                if self
                    .env()
                    .transfer(contract_address, contract_balance)
                    .is_ok()
                {
                    self.manager.pool_manager.pandora_pool_amount = self
                        .manager
                        .pool_manager
                        .pandora_pool_amount
                        .checked_sub(contract_balance)
                        .unwrap();

                    // Event
                    self._emit_transfer_pandora_pool_event(contract_address, contract_balance);
                }
            }

            let mut pandora_pool_contract: PandoraPoolContractRef =
                ink::env::call::FromAccountId::from_account_id(self.manager.pandora_pool_address);
            assert!(
                PandoraPoolContractRef::update_win_amount_and_session_status(
                    &mut pandora_pool_contract,
                    session_id,
                    contract_balance,
                )
                .is_ok()
            );

            Ok(())
        }

        // Transfer staking pool
        #[ink(message)]
        #[modifiers(when_not_paused)]
        #[modifiers(only_role(ADMINER))]
        pub fn transfer_and_update_staking_pool(&mut self) -> Result<(), Error> {
            let contract_balance = self.manager.pool_manager.staking_pool_amount;
            let contract_address = self.manager.staking_address;

            if contract_balance > 0 {
                assert!(self
                    .env()
                    .transfer(contract_address, contract_balance)
                    .is_ok());
                self.manager.pool_manager.staking_pool_amount = self
                    .manager
                    .pool_manager
                    .staking_pool_amount
                    .checked_sub(contract_balance)
                    .unwrap();

                // Event
                self._emit_transfer_staking_pool_event(contract_address, contract_balance);
            } else {
                return Err(Error::NotEnoughBalance);
            }

            let mut staking_pool_contract: StakingPoolContractRef =
                ink::env::call::FromAccountId::from_account_id(self.manager.staking_address);
            assert!(StakingPoolContractRef::add_reward(
                &mut staking_pool_contract,
                contract_balance,
            )
            .is_ok());

            Ok(())
        }

        /// Set core pool ratio
        #[modifiers(only_dao_address)]
        #[ink(message)]
        pub fn set_pool_ratio(
            &mut self,
            core_pool_ratio: u32,
            staking_pool_ratio: u32,
            pandora_pool_ratio: u32,
            treasury_pool_ratio: u32,
        ) -> Result<(), Error> {
            self.manager.pool_manager.core_pool_ratio = core_pool_ratio;
            self.manager.pool_manager.staking_pool_ratio = staking_pool_ratio;
            self.manager.pool_manager.treasury_pool_ratio = treasury_pool_ratio;
            self.manager.pool_manager.pandora_pool_ratio = pandora_pool_ratio;
            Ok(())
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}
