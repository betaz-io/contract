pub use crate::{
    impls::wheel_of_fortune::{
        data,
        data::{Data, *},
        wheel_of_fortune, *,
    },
    traits::wheel_of_fortune::*,
};
use openbrush::{
    contracts::{access_control::*, ownable::*, pausable::*},
    modifiers,
    traits::{AccountId, Balance, Storage},
};

use crate::traits::error::Error;

pub trait WheelOfFortuneTraitImpl:
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
    /// Function changes state
    // Change state contract
    #[modifiers(only_owner)]
    fn change_state(&mut self) -> Result<(), Error> {
        Ok(self._switch_pause()?)
    }

    // SET FUNCTIONS
    /// Set bet az token contract
    #[modifiers(only_owner)]
    fn set_betaz_token_fee(&mut self, betaz_token_fee: Balance) -> Result<(), Error> {
        self.data::<data::Data>().betaz_token_fee = betaz_token_fee;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_round_distance(&mut self, round_distance: u64) -> Result<(), Error> {
        self.data::<data::Data>().round_distance = round_distance;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_amount_out_min_nft(&mut self, amount_out_min_nft: u64) -> Result<(), Error> {
        self.data::<data::Data>().amount_out_min_nft = amount_out_min_nft;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_amount_out_max_nft(&mut self, amount_out_max_nft: u64) -> Result<(), Error> {
        self.data::<data::Data>().amount_out_max_nft = amount_out_max_nft;
        Ok(())
    }

    /// Set bet az token contract
    #[modifiers(only_owner)]
    fn set_oracle_randomness_address(
        &mut self,
        oracle_randomness_address: AccountId,
    ) -> Result<(), Error> {
        self.data::<data::Data>().oracle_randomness_address = oracle_randomness_address;
        Ok(())
    }

    /// Set bet az token contract
    #[modifiers(only_owner)]
    fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error> {
        self.data::<data::Data>().betaz_token_address = betaz_token_address;
        Ok(())
    }
    #[modifiers(only_owner)]
    fn set_psp34_contract_address(
        &mut self,
        psp34_contract_address: AccountId,
    ) -> Result<(), Error> {
        self.data::<data::Data>().psp34_contract_address = psp34_contract_address;
        Ok(())
    }

    // GET FUNCTIONS
    /// Get bet az token contract
    fn get_betaz_token_address(&self) -> AccountId {
        self.data::<data::Data>().betaz_token_address
    }
    /// get psp34 address
    fn get_psp34_contract_address(&self) -> AccountId {
        self.data::<data::Data>().psp34_contract_address
    }
    /// get psp34 address
    fn get_oracle_randomness_address(&self) -> AccountId {
        self.data::<data::Data>().oracle_randomness_address
    }
    fn get_betaz_token_fee(&self) -> Balance {
        self.data::<data::Data>().betaz_token_fee
    }
    fn get_round_distance(&self) -> u64 {
        self.data::<data::Data>().round_distance
    }
    fn get_amount_out_min_nft(&self) -> u64 {
        self.data::<data::Data>().amount_out_min_nft
    }
    fn get_amount_out_max_nft(&self) -> u64 {
        self.data::<data::Data>().amount_out_max_nft
    }
}
