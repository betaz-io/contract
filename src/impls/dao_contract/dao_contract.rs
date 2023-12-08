use crate::traits::error::Error;
pub use crate::{
    impls::dao_contract::{dao_contract, data, data::*, *},
    traits::dao_contract::*,
};
use openbrush::{
    contracts::{access_control::*, ownable::*, pausable::*},
    modifiers,
    traits::{AccountId, Balance, Storage},
};

pub trait DAOTraitsImpl:
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
        if value > Self::env().balance() {
            return Err(Error::NotEnoughBalance);
        }
        assert!(Self::env().transfer(account, value).is_ok());
        Ok(())
    }

    // SET FUNCTIONS
    #[modifiers(only_role(ADMINER))]
    fn set_core_address(&mut self, account: AccountId) -> Result<(), Error> {
        self.data::<Manager>().core_address = account;
        Ok(())
    }

    // GET FUNCTIONS
    /// get core contract address
    fn get_core_address(&self) -> AccountId {
        self.data::<Manager>().core_address
    }
}
