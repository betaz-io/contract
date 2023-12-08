pub use crate::{
    impls::staking::{
        data,
        data::{Data, *},
        staking, *,
    },
    traits::staking::*,
};
use ink::primitives::AccountId;
use openbrush::{
    contracts::{access_control::*, ownable::*, pausable::*},
    modifier_definition, modifiers,
    traits::{Balance, Storage, Timestamp},
};

use crate::traits::error::{Error, LockError};

/// Throws if is_locked is false
#[modifier_definition]
pub fn only_locked<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Data>,
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
    T: Storage<Data>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<LockError>,
{
    if instance.data().is_locked == true {
        return Err(From::from(LockError::Locked));
    }
    body(instance)
}

// RoleType = 3739740293 (0xDEE7E885)
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub trait StakingPoolTraitImpl:
    Storage<Data>
    + access_control::MembersManager
    + access_control::Internal
    + access_control::AccessControlImpl
    + Storage<access_control::Data>
    + Storage<pausable::Data>
    + Storage<ownable::Data>
    + pausable::Internal
    + ownable::Internal
    + ownable::Ownable
    + pausable::Pausable
{
    // EXECUTE FUNCTIONS
    // Change state contract
    #[modifiers(only_owner)]
    fn change_state(&mut self) -> Result<(), Error> {
        Ok(self._switch_pause()?)
    }

    /// Withdraw fee
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error> {
        if value > Self::env().balance() {
            return Err(Error::NotEnoughBalance);
        }
        assert!(Self::env().transfer(account, value).is_ok());
        Ok(())
    }

    // SET FUNCTIONS
    /// Set bet az token contract
    #[modifiers(only_owner)]
    fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error> {
        self.data::<data::Data>().betaz_token_address = betaz_token_address;
        Ok(())
    }

    /// Set bet az token contract
    #[modifiers(only_owner)]
    fn set_limit_unstake_time(&mut self, limit_unstake_time: Timestamp) -> Result<(), Error> {
        self.data::<data::Data>().limit_unstake_time = limit_unstake_time;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    fn update_is_locked(&mut self, is_locked: bool) -> Result<(), Error> {
        if is_locked == self.data::<data::Data>().is_locked {
            return Err(Error::InvalidInput);
        }
        self.data::<data::Data>().is_locked = is_locked;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    #[modifiers(only_locked)]
    fn update_status_reward_distribution(&mut self, start: bool) -> Result<(), Error> {
        if start == self.data::<data::Data>().reward_started {
            return Err(Error::InvalidInput);
        }
        if start {
            self.data::<data::Data>().claimable_reward = self.data::<data::Data>().reward_pool;
        } else {
            self.data::<data::Data>().reward_pool = self.data::<data::Data>().claimable_reward; // unclaimed Rewards send back to reward_pool
            self.data::<data::Data>().claimable_reward = 0;
        }
        self.data::<data::Data>().reward_started = start;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    #[modifiers(only_locked)]
    fn set_claimed_status(&mut self, staker: AccountId, status: bool) -> Result<(), Error> {
        if self.data::<data::Data>().reward_started {
            // only when reward distribution is not started
            return Err(Error::RewardStarted);
        }
        if let Some(claimed_status) = self.data::<data::Data>().is_claimed.get(&staker) {
            if status == claimed_status {
                return Err(Error::InvalidInput);
            }
        }
        self.data::<data::Data>()
            .is_claimed
            .insert(&staker, &status); // Can only claim once

        Ok(())
    }

    // GET FUCTIONS
    /// Get bet az token contract
    fn get_betaz_token_address(&self) -> AccountId {
        self.data::<data::Data>().betaz_token_address
    }

    /// Get bet az token contract
    fn get_limit_unstake_time(&self) -> Timestamp {
        self.data::<data::Data>().limit_unstake_time
    }

    fn get_request_unstake_time(&self, account: AccountId, index: u128) -> Option<Timestamp> {
        if let Some(pending_unstake_info) = self
            .data::<data::Data>()
            .pending_unstaking_list
            .get_value(account, &(index))
        {
            Some(pending_unstake_info.time)
        } else {
            None
        }
    }

    fn get_pending_unstaking_amount(&self, account: AccountId, index: u128) -> Option<Balance> {
        if let Some(pending_unstake_info) = self
            .data::<data::Data>()
            .pending_unstaking_list
            .get_value(account, &(index))
        {
            Some(pending_unstake_info.amount)
        } else {
            None
        }
    }

    fn get_pending_unstaking_index(
        &self,
        account: AccountId,
        amount: Balance,
        time: Timestamp,
    ) -> Option<u128> {
        let pending_unstake_info = PendingUnstakeInformation { amount, time };
        self.data::<data::Data>()
            .pending_unstaking_list
            .get_index(account, &pending_unstake_info)
    }

    fn get_total_staked(&self) -> Balance {
        self.data::<data::Data>().total_staked
    }

    // get stake amount by account
    fn get_stake_amount_by_account(&self, account: AccountId) -> Balance {
        self.data::<data::Data>()
            .staking_list
            .get(&account)
            .unwrap_or(0)
    }

    fn get_total_pending_unstaked_by_account(&self, account: AccountId) -> u64 {
        self.data::<data::Data>()
            .pending_unstaking_list
            .count(account) as u64
    }

    fn is_claimed(&self, account: AccountId) -> bool {
        self.data::<data::Data>()
            .is_claimed
            .get(&account)
            .unwrap_or(false)
    }

    fn get_reward_started(&self) -> bool {
        self.data::<data::Data>().reward_started
    }

    fn get_is_locked(&self) -> bool {
        self.data::<data::Data>().is_locked
    }

    fn get_staked_accounts_index_by_account(&self, account: AccountId) -> Option<u128> {
        self.data::<data::Data>()
            .staked_accounts
            .get_index(0, &account)
    }

    fn get_staked_accounts_by_index(&self, index: u64) -> Option<AccountId> {
        self.data::<data::Data>()
            .staked_accounts
            .get_value(0, &(index as u128))
    }

    fn get_staked_accounts_last_index(&self) -> u64 {
        self.data::<data::Data>().staked_accounts.count(0) as u64
    }

    fn get_request_unstake_accounts_index_by_account(&self, account: AccountId) -> Option<u128> {
        self.data::<data::Data>()
            .staked_accounts
            .get_index(1, &account)
    }

    fn get_request_unstake_accounts_by_index(&self, index: u64) -> Option<AccountId> {
        self.data::<data::Data>()
            .staked_accounts
            .get_value(1, &(index as u128))
    }

    fn get_request_unstake_accounts_last_index(&self) -> u64 {
        self.data::<data::Data>().staked_accounts.count(1) as u64
    }

    fn get_reward_pool(&self) -> Balance {
        self.data::<data::Data>().reward_pool
    }
    
    fn get_claimable_reward(&self) -> Balance {
        self.data::<data::Data>().claimable_reward
    }
}
