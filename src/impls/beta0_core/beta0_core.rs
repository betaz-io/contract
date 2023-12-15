pub use crate::{
    impls::beta0_core::{
        beta0_core, data,
        data::{Manager, *},
        *,
    },
    traits::beta0_core::*,
};
use ink::{env::CallFlags, prelude::vec::Vec};
use openbrush::{
    contracts::{access_control::*, ownable::*, pausable::*, psp22::*},
    modifier_definition, modifiers,
    traits::{AccountId, Balance, Storage},
};

use crate::traits::error::Error;

#[modifier_definition]
pub fn only_dao_address<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Manager>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<Error>,
{
    if T::env().caller() != instance.data().dao_address {
        return Err(From::from(Error::CallerDoNotHaveVoting));
    }
    body(instance)
}

pub trait BetA0CoreTraitImpl:
    Storage<Manager>
    + Storage<pausable::Data>
    + Storage<ownable::Data>
    + access_control::MembersManager
    + access_control::Internal
    + access_control::AccessControlImpl
    + Storage<access_control::Data>
    + pausable::Internal
    + ownable::Internal
    + ownable::Ownable
    + pausable::Pausable
{
    fn add_reward_staking_pool(&mut self, _amount: Balance) -> Result<(), Error>;
    fn add_reward_pandora_pool(&mut self, amount: Balance) -> Result<(), Error>;

    // emit event
    fn _emit_transfer_staking_pool_event(&self, _staking_pool_address: AccountId, _amount: Balance);
    fn _emit_transfer_treasury_pool_event(
        &self,
        _treasury_pool_address: AccountId,
        _amount: Balance,
    );
    fn _emit_transfer_pandora_pool_event(&self, _pandora_pool_address: AccountId, _amount: Balance);
    fn _emit_mint_token_event(&self, _contract_address: AccountId, _amount: Balance);

    // EXECUTE FUNCTIONS
    // Change state contract
    #[modifiers(only_owner)]
    fn change_state(&mut self) -> Result<(), Error> {
        Ok(self._switch_pause()?)
    }

    /// tranfer token to pool
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn tranfer_token_to_pool(&mut self, pool: AccountId, amount: Balance) -> Result<(), Error> {
        let contract_balance = PSP22Ref::balance_of(
            &self.data::<data::Manager>().bet_token_address,
            Self::env().account_id(),
        );

        if contract_balance > 0 {
            assert!(PSP22Ref::transfer(
                &self.data::<data::Manager>().bet_token_address,
                pool,
                amount,
                Vec::<u8>::new()
            )
            .is_ok());
        } else {
            return Err(Error::NotEnoughBalance);
        }

        Ok(())
    }

    /// Function reward token
    #[modifiers(when_not_paused)]
    fn reward_token(&mut self, player: AccountId, bet_amount: Balance) -> Result<(), Error> {
        let to_sent = bet_amount
            .checked_mul(self.data::<data::Manager>().token_ratio as u128)
            .unwrap();
        let reward_pool_balance = self.data::<data::Manager>().pool_manager.reward_pool_amount;

        if reward_pool_balance >= to_sent {
            let builder = Psp22Ref::transfer_builder(
                &self.data::<data::Manager>().bet_token_address,
                player,
                to_sent,
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
                self.data::<data::Manager>().pool_manager.reward_pool_amount = self
                    .data::<data::Manager>()
                    .pool_manager
                    .reward_pool_amount
                    .checked_sub(to_sent)
                    .unwrap();
            }
        } else if reward_pool_balance > 0 {
            let builder = Psp22Ref::transfer_builder(
                &self.data::<data::Manager>().bet_token_address,
                player,
                reward_pool_balance,
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
                self.data::<data::Manager>().pool_manager.reward_pool_amount = self
                    .data::<data::Manager>()
                    .pool_manager
                    .reward_pool_amount
                    .checked_sub(reward_pool_balance)
                    .unwrap();
            }
        }

        Ok(())
    }

    /// Withdraw Fees
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn withdraw_fee(&mut self, account: AccountId, value: Balance) -> Result<(), Error> {
        if value > self.data::<data::Manager>().pool_manager.core_pool_amout {
            return Err(Error::NotEnoughBalance);
        }
        assert!(Self::env().transfer(account, value).is_ok());
        Ok(
            self.data::<data::Manager>().pool_manager.core_pool_amout = self
                .data::<data::Manager>()
                .pool_manager
                .core_pool_amout
                .checked_sub(value)
                .unwrap(),
        )
    }

    /// Update core pool - only owner and admin
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn update_core_pool(&mut self) -> Result<(), Error> {
        let amount = Self::env().transferred_value();
        Ok(
            self.data::<data::Manager>().pool_manager.core_pool_amout = self
                .data::<data::Manager>()
                .pool_manager
                .core_pool_amout
                .checked_add(amount)
                .unwrap(),
        )
    }

    /// Withdraw hold amount
    #[modifiers(when_not_paused)]
    fn withdraw_hold_amount(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        if let Some(hold_amount) = self.data::<Manager>().hold_amount_players.get(&receiver) {
            if hold_amount > 0 {
                if self.data::<Manager>().pool_manager.core_pool_amout == 0 || amount > hold_amount
                {
                    return Err(Error::NotEnoughBalance);
                }

                if amount <= self.data::<Manager>().pool_manager.core_pool_amout {
                    if Self::env().transfer(receiver, amount).is_err() {
                        return Err(Error::CannotTransfer);
                    }
                    self.data::<Manager>().pool_manager.core_pool_amout = self
                        .data::<Manager>()
                        .pool_manager
                        .core_pool_amout
                        .checked_sub(amount)
                        .unwrap();

                    // update hold amount
                    let new_hold_amount = hold_amount.checked_sub(amount).unwrap();
                    if amount < hold_amount {
                        self.data::<Manager>()
                            .hold_amount_players
                            .insert(receiver, &new_hold_amount);
                    } else {
                        self.data::<Manager>().hold_amount_players.remove(&receiver);
                        self.data::<Manager>()
                            .hold_players
                            .remove_value(1, &receiver);
                    }
                } else {
                    if Self::env()
                        .transfer(
                            receiver,
                            self.data::<Manager>().pool_manager.core_pool_amout,
                        )
                        .is_err()
                    {
                        return Err(Error::CannotTransfer);
                    }
                    // update hold amount
                    let new_hold_amount = hold_amount
                        .checked_sub(self.data::<Manager>().pool_manager.core_pool_amout)
                        .unwrap();

                    // update core pool
                    self.data::<Manager>().pool_manager.core_pool_amout = self
                        .data::<Manager>()
                        .pool_manager
                        .core_pool_amout
                        .checked_sub(self.data::<Manager>().pool_manager.core_pool_amout)
                        .unwrap();
                    self.data::<Manager>()
                        .hold_amount_players
                        .insert(receiver, &new_hold_amount);
                }
            }
            Ok(())
        } else {
            return Err(Error::HoldAmountPlayerNotExist);
        }
    }

    // Update reward pool - only owner and admin
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn update_reward_pool(&mut self, amount: Balance) -> Result<(), Error> {
        if amount > self.data::<Manager>().pool_manager.reward_pool_amount {
            let mint_amount = amount
                .checked_sub(self.data::<Manager>().pool_manager.reward_pool_amount)
                .unwrap();
            if Psp22Ref::mint(
                &self.data::<Manager>().bet_token_address,
                Self::env().account_id(),
                mint_amount,
            )
            .is_err()
            {
                return Err(Error::CannotMint);
            } else {
                self.data::<Manager>().pool_manager.reward_pool_amount = amount;
                self._emit_mint_token_event(Self::env().account_id(), mint_amount);
            }
        } else {
            self.data::<Manager>().pool_manager.reward_pool_amount = self
                .data::<Manager>()
                .pool_manager
                .reward_pool_amount
                .checked_add(amount)
                .unwrap();
        }
        Ok(())
    }

    // Transfer amount pandora pool
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn transfer_pandora_pool(&mut self) -> Result<(), Error> {
        let contract_balance = self.data::<Manager>().pool_manager.pandora_pool_amount;
        let contract_address = self.data::<Manager>().pandora_pool_address;

        if contract_balance > 0 {
            assert!(Self::env()
                .transfer(contract_address, contract_balance)
                .is_ok());
            self.data::<Manager>().pool_manager.pandora_pool_amount = self
                .data::<Manager>()
                .pool_manager
                .pandora_pool_amount
                .checked_sub(contract_balance)
                .unwrap();

            // Event
            self._emit_transfer_pandora_pool_event(contract_address, contract_balance);
        } else {
            return Err(Error::NotEnoughBalance);
        }

        Ok(())
    }

    // Transfer amount staking pool
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn transfer_staking_pool(&mut self) -> Result<(), Error> {
        let contract_balance = self.data::<Manager>().pool_manager.staking_pool_amount;
        let contract_address = self.data::<Manager>().staking_address;

        if contract_balance > 0 {
            assert!(Self::env()
                .transfer(contract_address, contract_balance)
                .is_ok());
            self.data::<Manager>().pool_manager.staking_pool_amount = self
                .data::<Manager>()
                .pool_manager
                .staking_pool_amount
                .checked_sub(contract_balance)
                .unwrap();

            // Event
            self._emit_transfer_staking_pool_event(contract_address, contract_balance);
        } else {
            return Err(Error::NotEnoughBalance);
        }

        Ok(())
    }

    // Transfer amount treasury pool
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn transfer_treasury_pool(&mut self) -> Result<(), Error> {
        let contract_balance = self.data::<Manager>().pool_manager.treasury_pool_amount;
        let contract_address = self.data::<Manager>().treasury_address;

        if contract_balance > 0 {
            assert!(Self::env()
                .transfer(contract_address, contract_balance)
                .is_ok());
            self.data::<Manager>().pool_manager.treasury_pool_amount = self
                .data::<Manager>()
                .pool_manager
                .treasury_pool_amount
                .checked_sub(contract_balance)
                .unwrap();

            // Event
            self._emit_transfer_pandora_pool_event(contract_address, contract_balance);
        } else {
            return Err(Error::NotEnoughBalance);
        }

        Ok(())
    }

    // SET FUNCTIONS
    /// Set min number over roll
    #[modifiers(only_owner)]
    fn set_min_number_over_roll(&mut self, min_over_number: u32) -> Result<(), Error> {
        self.data::<data::Manager>().min_over_number = min_over_number;
        Ok(())
    }

    /// Set max number over roll
    #[modifiers(only_owner)]
    fn set_max_number_over_roll(&mut self, max_over_number: u32) -> Result<(), Error> {
        self.data::<data::Manager>().max_over_number = max_over_number;
        Ok(())
    }

    /// Set min number under roll
    #[modifiers(only_owner)]
    fn set_min_number_under_roll(&mut self, min_under_number: u32) -> Result<(), Error> {
        self.data::<data::Manager>().min_under_number = min_under_number;
        Ok(())
    }

    /// Set max number under roll
    #[modifiers(only_owner)]
    fn set_max_number_under_roll(&mut self, max_under_number: u32) -> Result<(), Error> {
        self.data::<data::Manager>().max_under_number = max_under_number;
        Ok(())
    }

    /// Set over_rates and discount rate - Only Owner 2 vectors same size
    #[modifiers(only_owner)]
    fn set_rates(&mut self, over_rates: Vec<u32>, under_rates: Vec<u32>) -> Result<(), Error> {
        assert!(over_rates.len() == under_rates.len());
        self.data::<data::Manager>().over_rates = over_rates;
        self.data::<data::Manager>().under_rates = under_rates;
        Ok(())
    }

    /// Set new psp22 address
    #[modifiers(only_owner)]
    fn set_bet_token_address(&mut self, bet_token_address: AccountId) -> Result<(), Error> {
        self.data::<data::Manager>().bet_token_address = bet_token_address;
        Ok(())
    }

    /// Set new token ratio
    #[modifiers(only_owner)]
    fn set_token_ratio(&mut self, token_ratio: u32) -> Result<(), Error> {
        self.data::<data::Manager>().token_ratio = token_ratio;
        Ok(())
    }

    /// Set max bet ratio
    #[modifiers(only_owner)]
    fn set_max_bet_ratio(&mut self, max_bet_ratio: u32) -> Result<(), Error> {
        self.data::<data::Manager>().max_bet_ratio = max_bet_ratio;
        Ok(())
    }

    /// Set staking pool address
    #[modifiers(only_owner)]
    fn set_staking_address(&mut self, address: AccountId) -> Result<(), Error> {
        Ok(self.data::<data::Manager>().staking_address = address)
    }

    /// Set treasury pool address
    #[modifiers(only_owner)]
    fn set_treasury_address(&mut self, address: AccountId) -> Result<(), Error> {
        Ok(self.data::<data::Manager>().treasury_address = address)
    }

    /// Set pandora pool address
    #[modifiers(only_owner)]
    fn set_pandora_address(&mut self, address: AccountId) -> Result<(), Error> {
        Ok(self.data::<data::Manager>().pandora_pool_address = address)
    }

    /// Set oracle randomness address
    #[modifiers(only_owner)]
    fn set_oracle_randomness_address(&mut self, address: AccountId) -> Result<(), Error> {
        Ok(self.data::<data::Manager>().oracle_randomness_address = address)
    }

    /// Set limit round
    #[modifiers(only_owner)]
    fn set_round_distance(&mut self, round_distance: u64) -> Result<(), Error> {
        Ok(self.data::<data::Manager>().round_distance = round_distance)
    }

    /// set betaz address
    #[modifiers(only_owner)]
    fn set_betaz_address(&mut self, account: AccountId) -> Result<(), Error> {
        self.data::<data::Manager>().betaz_address = account;
        Ok(())
    }

    /// set percentage_rates
    #[modifiers(only_owner)]
    fn set_percentage_rates(&mut self, percentage_rates: u32) -> Result<(), Error> {
        self.data::<data::Manager>().percentage_rates = percentage_rates;
        Ok(())
    }

    /// Set dao contract address
    #[modifiers(only_owner)]
    fn set_dao_address(&mut self, address: AccountId) -> Result<(), Error> {
        Ok(self.data::<data::Manager>().dao_address = address)
    }

    // GET FUCTIONS
    /// Get platform fee amount
    fn get_platform_fee_amount(&self) -> Balance {
        self.data::<data::Manager>()
            .pool_manager
            .platform_fee_amount
    }

    /// Get dao contract address
    fn get_dao_address(&self) -> AccountId {
        self.data::<data::Manager>().dao_address
    }

    /// get percentage_rates
    fn get_percentage_rates(&self) -> u32 {
        self.data::<data::Manager>().percentage_rates
    }

    /// get betaz address
    fn get_betaz_address(&self) -> AccountId {
        self.data::<data::Manager>().betaz_address
    }

    /// get min number over roll
    fn get_min_number_over_roll(&self) -> u32 {
        self.data::<data::Manager>().min_over_number
    }

    /// get max number over roll
    fn get_max_number_over_roll(&self) -> u32 {
        self.data::<data::Manager>().max_over_number
    }

    /// get min number under roll
    fn get_min_number_under_roll(&self) -> u32 {
        self.data::<data::Manager>().min_under_number
    }

    /// get max number under roll
    fn get_max_number_under_roll(&self) -> u32 {
        self.data::<data::Manager>().max_under_number
    }

    /// Get token ratio
    fn get_token_ratio(&self) -> u32 {
        self.data::<data::Manager>().token_ratio
    }

    /// Get psp22 address
    fn bet_token_address(&self) -> AccountId {
        self.data::<data::Manager>().bet_token_address
    }

    /// Get Over Rates
    fn get_over_rates(&self) -> Vec<u32> {
        self.data::<data::Manager>().over_rates.clone()
    }

    /// Get Under Rates
    fn get_under_rates(&self) -> Vec<u32> {
        self.data::<data::Manager>().under_rates.clone()
    }

    /// Get Max Bet
    fn get_max_bet_ratio(&self) -> u32 {
        self.data::<data::Manager>().max_bet_ratio
    }

    fn get_max_bet(&self) -> u128 {
        (self.data::<data::Manager>().pool_manager.core_pool_amout)
            .checked_div(self.data::<data::Manager>().max_bet_ratio as u128)
            .unwrap()
    }

    /// get contract token balance
    fn get_token_balance(&self) -> Balance {
        PSP22Ref::balance_of(
            &self.data::<data::Manager>().bet_token_address,
            Self::env().account_id(),
        )
    }

    /// Is bet exist
    fn is_bet_available(&self, player: AccountId) -> bool {
        self.data::<data::Manager>().bets.get(&player).is_some()
    }

    /// get bet
    fn get_bet(&self, player: AccountId) -> Option<BetInformation> {
        if let Some(_bet_info) = self.data::<data::Manager>().bets.get(&player) {
            return Some(_bet_info);
        }
        return None;
    }

    /// Get core pool ratio
    fn get_core_pool_ratio(&self) -> u32 {
        self.data::<data::Manager>().pool_manager.core_pool_ratio
    }

    /// Get staking pool ratio
    fn get_staking_pool_ratio(&self) -> u32 {
        self.data::<data::Manager>().pool_manager.staking_pool_ratio
    }

    /// Get treasury pool ratio
    fn get_treasury_pool_ratio(&self) -> u32 {
        self.data::<data::Manager>()
            .pool_manager
            .treasury_pool_ratio
    }

    /// Get pandora pool ratio
    fn get_pandora_pool_ratio(&self) -> u32 {
        self.data::<data::Manager>().pool_manager.pandora_pool_ratio
    }

    /// Get staking pool address
    fn get_staking_address(&self) -> AccountId {
        self.data::<data::Manager>().staking_address
    }

    /// Get treasury pool address
    fn get_treasury_address(&self) -> AccountId {
        self.data::<data::Manager>().treasury_address
    }

    /// Get treasury pool address
    fn get_pandora_address(&self) -> AccountId {
        self.data::<data::Manager>().pandora_pool_address
    }

    /// Get reward pool amount
    fn get_reward_pool_amount(&self) -> Balance {
        self.data::<data::Manager>().pool_manager.reward_pool_amount
    }

    /// Get core pool amout
    fn get_core_pool_amout(&self) -> Balance {
        self.data::<data::Manager>().pool_manager.core_pool_amout
    }

    /// Get staking pool amount
    fn get_staking_pool_amount(&self) -> Balance {
        self.data::<data::Manager>()
            .pool_manager
            .staking_pool_amount
    }

    /// Get treasury pool amount
    fn get_treasury_pool_amount(&self) -> Balance {
        self.data::<data::Manager>()
            .pool_manager
            .treasury_pool_amount
    }

    /// Get pandora pool amount
    fn get_pandora_pool_amount(&self) -> Balance {
        self.data::<data::Manager>()
            .pool_manager
            .pandora_pool_amount
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

    /// Get oracle randomness address
    fn get_oracle_randomness_address(&self) -> AccountId {
        self.data::<Manager>().oracle_randomness_address
    }

    /// Get limit round
    fn get_round_distance(&self) -> u64 {
        self.data::<Manager>().round_distance
    }
}
