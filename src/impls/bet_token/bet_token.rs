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
    // EXECUTE FUNCTIONS
    /// Function changes state
    // Change state contract
    #[modifiers(only_owner)]
    fn change_state(&mut self) -> Result<(), Error> {
        Ok(self._switch_pause()?)
    }
}
