pub use crate::{
    impls::bet_token::{
        bet_token, data,
        data::{Data, *},
        *,
    },
    traits::bet_token::*,
};
use openbrush::{
    contracts::{access_control::*, ownable::*, pausable::*, psp22::Internal},
    modifiers,
    traits::{AccountId, Balance, Storage},
};

use crate::traits::error::Error;

pub trait BetAZTraitImpl:
    Storage<data::Data>
    + Internal
    + access_control::MembersManager
    + access_control::Internal
    + access_control::AccessControlImpl
    + Storage<access_control::Data>
    + ownable::Ownable
    + Storage<ownable::Data>
    + pausable::Internal
    + Storage<pausable::Data>
{
    // emit event
    fn _emit_burn_event(&self, account: AccountId, amount: Balance);

    // EXECUTE FUNCTIONS
    /// Function changes state
    // Change state contract
    #[modifiers(only_owner)]
    fn change_state(&mut self) -> Result<(), Error> {
        Ok(self._switch_pause()?)
    }

    /// Only minter can mint
    #[modifiers(only_role(MINTER))]
    #[modifiers(when_not_paused)]
    fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), Error> {
        Ok(self._mint_to(account, amount)?)
    }

    /// Only minter can mint
    #[modifiers(only_role(ADMINER))]
    #[modifiers(when_not_paused)]
    fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), Error> {
        if self._burn_from(account, amount).is_ok() {
            self._emit_burn_event(account, amount)
        }
        Ok(())
    }

    /// Withdraw any Balance of Contract - only Owner
    #[modifiers(only_owner)]
    #[modifiers(when_not_paused)]
    fn withdraw(&mut self, value: Balance) -> Result<(), Error> {
        let caller = Self::env().caller();
        if value > Self::env().balance() {
            return Err(Error::NotEnoughBalance);
        }
        if Self::env().transfer(caller, value).is_err() {
            return Err(Error::TransferFailed);
        }
        Ok(())
    }

    // GET FUNCTIONS
    fn is_admin_address(&self, address: AccountId) -> bool {
        AccessControlImpl::has_role(self, ADMINER, Some(address))
    }

    fn is_minter_address(&self, address: AccountId) -> bool {
        AccessControlImpl::has_role(self, MINTER, Some(address))
    }

    // SET FUNCTIONS
    #[modifiers(only_owner)]
    #[modifiers(when_not_paused)]
    fn set_admin_address(&mut self, address: AccountId) -> Result<(), Error> {
        Ok(AccessControlImpl::grant_role(self, ADMINER, Some(address))
            .expect("Can not set admin role"))
    }

    #[modifiers(only_owner)]
    #[modifiers(when_not_paused)]
    fn set_minter_address(&mut self, address: AccountId) -> Result<(), Error> {
        Ok(AccessControlImpl::grant_role(self, MINTER, Some(address))
            .expect("Can not set minter role"))
    }
}
