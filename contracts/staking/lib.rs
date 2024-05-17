#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::staking::StakingPoolContractRef;

#[openbrush::implementation(Ownable, Pausable, Upgradeable, AccessControl, AccessControlEnumerable)]
#[openbrush::contract]
pub mod staking {
    use bet_a0::{
        impls::{
            admin::*,
            staking::{data::Data, StakingPoolTraitImpl, ADMINER, *},
        },
        traits::{error::Error, staking::Psp22Ref},
    };
    use ink::{env::CallFlags, prelude::vec::Vec};
    use openbrush::{
        contracts::{
            access_control::extensions::enumerable,
            ownable::{OwnableError, *},
            pausable::{PausableError, *},
        },
        modifiers,
        traits::Storage,
    };
    use crate::staking::access_control::only_role;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct StakingPoolContract {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        data: Data,
    }

    #[ink(event)]
    pub struct StakeEvent {
        pool_staking_contract: AccountId,
        token_contract: AccountId,
        staker: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct UnstakeEvent {
        pool_staking_contract: AccountId,
        token_contract: AccountId,
        staker: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct RequestUnstakeEvent {
        pool_staking_contract: AccountId,
        token_contract: AccountId,
        staker: AccountId,
        amount: Balance,
        time_request: Timestamp,
    }

    #[ink(event)]
    pub struct CancelRequestUnstakeEvent {
        pool_staking_contract: AccountId,
        token_contract: AccountId,
        staker: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct ClaimEvent {
        pool_staking_contract: AccountId,
        token_contract: AccountId,
        staker: AccountId,
        staked_amount: Balance,
        reward_amount: Balance,
    }

    impl AdminTrait for StakingPoolContract {}
    impl StakingPoolTraitImpl for StakingPoolContract {}

    impl StakingPoolTrait for StakingPoolContract {
        // EXECUTE FUNCTIONS
        /// Function changes state
        #[ink(message)]
        #[modifiers(only_owner)]
        fn change_state(&mut self) -> Result<(), Error> {
            StakingPoolTraitImpl::change_state(self)
        }

        /// Withdraw fee
        #[ink(message)]
        fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error> {
            StakingPoolTraitImpl::withdraw_fee(self, account, value)
        }

        // SET FUNCTIONS
        #[ink(message)]
        #[modifiers(only_owner)]
        fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error> {
            StakingPoolTraitImpl::set_betaz_token_address(self, betaz_token_address)
        }

        /// Set bet az token contract
        #[ink(message)]
        #[modifiers(only_owner)]
        fn set_limit_unstake_time(&mut self, limit_unstake_time: Timestamp) -> Result<(), Error> {
            StakingPoolTraitImpl::set_limit_unstake_time(self, limit_unstake_time)
        }

        #[ink(message)]
        fn update_is_locked(&mut self, is_locked: bool) -> Result<(), Error> {
            StakingPoolTraitImpl::update_is_locked(self, is_locked)
        }

        #[ink(message)]
        #[modifiers(only_locked)]
        fn update_status_reward_distribution(&mut self, start: bool) -> Result<(), Error> {
            StakingPoolTraitImpl::update_status_reward_distribution(self, start)
        }

        #[ink(message)]
        #[modifiers(only_locked)]
        fn set_claimed_status(&mut self, staker: AccountId, status: bool) -> Result<(), Error> {
            StakingPoolTraitImpl::set_claimed_status(self, staker, status)
        }

        // GET FUNCTIONS
        /// Get bet az token contract
        #[ink(message)]
        fn get_betaz_token_address(&self) -> AccountId {
            StakingPoolTraitImpl::get_betaz_token_address(self)
        }

        /// Get bet az token contract
        #[ink(message)]
        fn get_limit_unstake_time(&self) -> Timestamp {
            StakingPoolTraitImpl::get_limit_unstake_time(self)
        }

        #[ink(message)]
        fn get_request_unstake_time(&self, account: AccountId, index: u128) -> Option<Timestamp> {
            StakingPoolTraitImpl::get_request_unstake_time(self, account, index)
        }

        #[ink(message)]
        fn get_pending_unstaking_amount(&self, account: AccountId, index: u128) -> Option<Balance> {
            StakingPoolTraitImpl::get_pending_unstaking_amount(self, account, index)
        }

        #[ink(message)]
        fn get_pending_unstaking_index(
            &self,
            account: AccountId,
            amount: Balance,
            time: Timestamp,
        ) -> Option<u128> {
            StakingPoolTraitImpl::get_pending_unstaking_index(self, account, amount, time)
        }

        #[ink(message)]
        fn get_total_staked(&self) -> Balance {
            StakingPoolTraitImpl::get_total_staked(self)
        }

        // get stake amount by account
        #[ink(message)]
        fn get_stake_amount_by_account(&self, account: AccountId) -> Balance {
            StakingPoolTraitImpl::get_stake_amount_by_account(self, account)
        }

        #[ink(message)]
        fn get_total_pending_unstaked_by_account(&self, account: AccountId) -> u64 {
            StakingPoolTraitImpl::get_total_pending_unstaked_by_account(self, account)
        }

        #[ink(message)]
        fn is_claimed(&self, account: AccountId) -> bool {
            StakingPoolTraitImpl::is_claimed(self, account)
        }

        #[ink(message)]
        fn get_reward_started(&self) -> bool {
            StakingPoolTraitImpl::get_reward_started(self)
        }

        #[ink(message)]
        fn get_is_locked(&self) -> bool {
            StakingPoolTraitImpl::get_is_locked(self)
        }

        #[ink(message)]
        fn get_staked_accounts_index_by_account(&self, account: AccountId) -> Option<u128> {
            StakingPoolTraitImpl::get_staked_accounts_index_by_account(self, account)
        }

        #[ink(message)]
        fn get_staked_accounts_by_index(&self, index: u64) -> Option<AccountId> {
            StakingPoolTraitImpl::get_staked_accounts_by_index(self, index)
        }

        #[ink(message)]
        fn get_staked_accounts_last_index(&self) -> u64 {
            StakingPoolTraitImpl::get_staked_accounts_last_index(self)
        }

        #[ink(message)]
        fn get_request_unstake_accounts_index_by_account(
            &self,
            account: AccountId,
        ) -> Option<u128> {
            StakingPoolTraitImpl::get_request_unstake_accounts_index_by_account(self, account)
        }

        #[ink(message)]
        fn get_request_unstake_accounts_by_index(&self, index: u64) -> Option<AccountId> {
            StakingPoolTraitImpl::get_request_unstake_accounts_by_index(self, index)
        }

        #[ink(message)]
        fn get_request_unstake_accounts_last_index(&self) -> u64 {
            StakingPoolTraitImpl::get_request_unstake_accounts_last_index(self)
        }

        #[ink(message)]
        fn get_reward_pool(&self) -> Balance {
            StakingPoolTraitImpl::get_reward_pool(self)
        }
        
        #[ink(message)]
        fn get_claimable_reward(&self) -> Balance {
            StakingPoolTraitImpl::get_reward_pool(self)
        }
    }

    impl StakingPoolContract {
        #[ink(constructor)]
        pub fn new(
            admin_address: AccountId,
            betaz_token_address: AccountId,
            limit_unstake_time: Timestamp,
        ) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            instance
                .initialize(admin_address, betaz_token_address, limit_unstake_time)
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
            admin_address: AccountId,
            betaz_token_address: AccountId,
            limit_unstake_time: Timestamp,
        ) -> Result<(), Error> {
            // Make sure the initial data can only be init once
            if self.data.betaz_token_address != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }
            self.data.betaz_token_address = betaz_token_address;
            self.data.limit_unstake_time = limit_unstake_time;
            self.data.admin_address = admin_address;
            access_control::Internal::_init_with_admin(self, Some(self.env().caller()));
            AccessControl::grant_role(self, ADMINER, Some(self.env().caller()))
                .expect("Can not set admin role");
            if !AccessControl::has_role(self, ADMINER, Some(admin_address)) {
                AccessControl::grant_role(self, ADMINER, Some(admin_address))
                    .expect("Can not set admin role");
            }
            Ok(())
        }

        /// Stake
        #[ink(message)]
        #[modifiers(when_not_paused)]
        #[modifiers(only_not_locked)]
        pub fn stake(&mut self, amount: Balance) -> Result<(), Error> {
            if amount == 0 {
                return Err(Error::NoAmount);
            }

            if self.data.reward_started { // only when reward distribution is not started
                return Err(Error::RewardStarted)
            }

            // Check psp22 balance and allowance of caller
            let caller = self.env().caller();
            let allowance = Psp22Ref::allowance(
                &self.data.betaz_token_address,
                caller,
                self.env().account_id(),
            );
            let balance = Psp22Ref::balance_of(&self.data.betaz_token_address, caller);
            if allowance < amount || balance < amount {
                return Err(Error::InvalidBalanceAndAllowance);
            }

            // update staking list
            let mut staked_amount = self.data.staking_list.get(&caller).unwrap_or(0);
            staked_amount = staked_amount
                .checked_add(amount)
                .ok_or(Error::CheckedOperations)?;
            self.data.staking_list.insert(&caller, &staked_amount);

            // update total staked
            self.data.total_staked = self
                .data
                .total_staked
                .checked_add(amount)
                .ok_or(Error::CheckedOperations)?;

            // transfer token to pool
            let builder = Psp22Ref::transfer_from_builder(
                &self.data.betaz_token_address,
                caller,
                self.env().account_id(),
                amount,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true));

            let result = match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => Err(Error::CannotTransfer),
            };

            if result.is_ok() {
                if self.data.is_claimed.get(&caller).is_none() {
                    self.data.is_claimed.insert(&caller, &false);
                }
                self.env().emit_event(StakeEvent {
                    pool_staking_contract: self.env().account_id(),
                    token_contract: self.data.betaz_token_address,
                    staker: caller,
                    amount,
                });
            }

            // set status staked
            if !self.data.staked_accounts.contains_value(0, &caller) {
                self.data.staked_accounts.insert(0, &caller);
            }

            Ok(())
        }

        #[ink(message)]
        #[modifiers(when_not_paused)]
        #[modifiers(only_not_locked)]
        pub fn request_unstake(&mut self, amount: Balance) -> Result<(), Error> {
            if amount == 0 {
                return Err(Error::NoAmount);
            }

            let caller = self.env().caller();

            // update staking_list
            let mut staked_amount = self.data.staking_list.get(&caller).unwrap_or(0);
            if staked_amount < amount {
                return Err(Error::InvalidUnstakedAmount);
            }
            staked_amount = staked_amount
                .checked_sub(amount)
                .ok_or(Error::CheckedOperations)?;
            self.data.staking_list.insert(&caller, &staked_amount);

            // add request unstake time
            let current_time = self.env().block_timestamp();
            let new_pending_unstake_info = PendingUnstakeInformation {
                amount,
                time: current_time,
            };
            self.data
                .pending_unstaking_list
                .insert(caller, &new_pending_unstake_info);

            // update total staked
            self.data.total_staked = self
                .data
                .total_staked
                .checked_sub(amount)
                .ok_or(Error::CheckedOperations)?;

            self.env().emit_event(RequestUnstakeEvent {
                pool_staking_contract: self.env().account_id(),
                token_contract: self.data.betaz_token_address,
                staker: caller,
                amount,
                time_request: current_time,
            });

            // set status request unstake
            if staked_amount == 0 {
                self.data.staked_accounts.remove_value(0, &caller);
            }

            if !self.data.staked_accounts.contains_value(1, &caller) {
                self.data.staked_accounts.insert(1, &caller);
            }

            Ok(())
        }

        #[ink(message)]
        #[modifiers(when_not_paused)]
        #[modifiers(only_not_locked)]
        pub fn cancel_request_unstake(&mut self, index: u128) -> Result<(), Error> {
            let account = self.env().caller();
            if let Some(pending_unstake_info) = self
                .data
                .pending_unstaking_list
                .get_value(account, &(index))
            {
                let amount = pending_unstake_info.amount;
                if amount == 0 {
                    return Err(Error::NoAmount);
                }

                let caller = self.env().caller();

                if self.data.pending_unstaking_list.count(caller) == 0 {
                    return Err(Error::CallerNotRequestUnstake);
                }

                // update staking_list
                let mut staked_amount = self.data.staking_list.get(&caller).unwrap_or(0);
                staked_amount = staked_amount
                    .checked_add(amount)
                    .ok_or(Error::CheckedOperations)?;
                self.data.staking_list.insert(&caller, &staked_amount);

                self.data
                    .pending_unstaking_list
                    .remove_index(caller, &index);

                // update total staked
                self.data.total_staked = self
                    .data
                    .total_staked
                    .checked_add(amount)
                    .ok_or(Error::CheckedOperations)?;

                self.env().emit_event(CancelRequestUnstakeEvent {
                    pool_staking_contract: self.env().account_id(),
                    token_contract: self.data.betaz_token_address,
                    staker: caller,
                    amount,
                });

                // set status staked
                if self.data.pending_unstaking_list.count(caller) == 0 {
                    self.data.staked_accounts.remove_value(1, &caller);
                }

                if !self.data.staked_accounts.contains_value(0, &caller) {
                    self.data.staked_accounts.insert(0, &caller);
                }
            } else {
                return Err(Error::InvalidInput);
            }

            Ok(())
        }

        #[ink(message)]
        #[modifiers(when_not_paused)]
        #[modifiers(only_not_locked)]
        pub fn unstake(&mut self, index: u128) -> Result<(), Error> {
            let account = self.env().caller();
            if let Some(pending_unstake_info) = self
                .data
                .pending_unstaking_list
                .get_value(account, &(index))
            {
                let amount = pending_unstake_info.amount;
                if amount == 0 {
                    return Err(Error::NoAmount);
                }

                let caller = self.env().caller();

                if self.data.pending_unstaking_list.count(caller) == 0 {
                    return Err(Error::CallerNotRequestUnstake);
                }

                let current_time = self.env().block_timestamp();

                if current_time < pending_unstake_info.time.checked_add(self.data.limit_unstake_time).unwrap() {
                    return Err(Error::NotTimeToUnstaked);
                }

                self.data
                    .pending_unstaking_list
                    .remove_index(caller, &index);

                // clear status staked
                if self.data.pending_unstaking_list.count(caller) == 0 {
                    self.data.staked_accounts.remove_value(1, &caller);
                }

                // Transfer token to caller
                let builder = Psp22Ref::transfer_builder(
                    &self.data.betaz_token_address,
                    caller,
                    amount,
                    Vec::<u8>::new(),
                )
                .call_flags(CallFlags::default().set_allow_reentry(true));

                let transfer_result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => Err(Error::CannotTransfer),
                };

                if transfer_result.is_ok() {
                    self.env().emit_event(UnstakeEvent {
                        pool_staking_contract: self.env().account_id(),
                        token_contract: self.data.betaz_token_address,
                        staker: caller,
                        amount,
                    });
                }

                return transfer_result;
            } else {
                return Err(Error::InvalidInput);
            }
        }

        /// Claim Reward
        #[ink(message)]
        #[modifiers(when_not_paused)]
        #[modifiers(only_locked)]
        pub fn claim_reward(&mut self, account: AccountId) -> Result<(), Error> {
            let is_claimed = self.data.is_claimed.get(&account);
            let pool_balance = self.env().balance();

            // Check if the claim exist and must be FALSE
            if let Some(claimed) = is_claimed {
                if claimed {
                    return Err(Error::ClaimMustBeFalse);
                } else {
                    self.data.is_claimed.insert(&account, &true); // Can only claim once

                    if self.data.total_staked == 0 {
                        return Err(Error::InvalidTotalStake);
                    }

                    // Only allow when reward distribution is started
                    if !self.data.reward_started {
                        return Err(Error::RewardNotStarted);
                    }

                    if pool_balance == 0 {
                        return Err(Error::NotEnoughBalance);
                    }

                    if let Some(stake_amount) = self.data.staking_list.get(&account){
                        let claim_amount = self.data.reward_pool
                        .checked_mul(stake_amount)
                        .ok_or(Error::CheckedOperations)?
                        .checked_div(self.data.total_staked)
                        .ok_or(Error::CheckedOperations)?;

                        if self.data.claimable_reward >= claim_amount {
                            // Send the reward to the staker
                            if let Some(claimable_reward) = self.data.claimable_reward.checked_sub(claim_amount) {
                                self.data.claimable_reward = claimable_reward;
                                if claim_amount > self.env().balance() {
                                    return Err(Error::NotEnoughBalance)
                                }
                                if self.env().transfer(account, claim_amount).is_err(){
                                    return Err(Error::CannotTransfer)
                                }
                                // Emit ClaimEvent to the network
                                self.env().emit_event(ClaimEvent {
                                    pool_staking_contract: self.env().account_id(),
                                    token_contract: self.data.betaz_token_address,
                                    staker: account,
                                    staked_amount: stake_amount,
                                    reward_amount: claim_amount,
                                });
                            } else {
                                return Err(Error::FailToDecreaseClaimableReward);
                            }                        
                        } else {
                            if self.data.claimable_reward > self.env().balance() {
                                return Err(Error::NotEnoughBalance)
                            }
                            // If there is not enough fund to pay, transfer everything in the pool to staker
                            if self.env().transfer(account, self.data.claimable_reward).is_err() {
                                return Err(Error::CannotTransfer)
                            }
                            self.env().emit_event(ClaimEvent {
                                pool_staking_contract: self.env().account_id(),
                                token_contract: self.data.betaz_token_address,
                                staker: account,
                                staked_amount: stake_amount,
                                reward_amount: self.data.claimable_reward,
                            });
                            self.data.claimable_reward = 0;
                        }
                    } else {
                        return Err(Error::NotStaked);
                    }

                    Ok(())
                }
            } else {
                return Err(Error::ClaimMustBeFalse);
            }
        }

        /// Add reward to reward_pool
        #[ink(message)]
        #[modifiers(only_locked)]
        #[modifiers(only_role(ADMINER))]
        pub fn add_reward(&mut self, reward: Balance) -> Result<(), Error> {
            if self.data.reward_started { // only when reward distribution is not started
                return Err(Error::RewardStarted)
            }

            if let Some(reward_pool) = self.data.reward_pool.checked_add(reward) {
                self.data.reward_pool = reward_pool;
                Ok(())
            } else {
                return Err(Error::RewardNotAdded);
            }
        }
    }
}
