pub use crate::traits::admin::*;
use crate::traits::error::Error;
use ink::prelude::vec::Vec;
use openbrush::{
    contracts::ownable::*,
    modifiers,
    traits::{AccountId, Balance, Storage},
};

pub trait AdminTrait: Storage<ownable::Data> {
    #[modifiers(only_owner)]
    fn withdraw_fee(&mut self, value: Balance, receiver: AccountId) -> Result<(), Error> {
        if value > Self::env().balance() {
            return Err(Error::NotEnoughBalance);
        }
        if Self::env().transfer(receiver, value).is_err() {
            return Err(Error::WithdrawFeeError);
        }
        Ok(())
    }

    fn get_balance(&self) -> Result<Balance, Error> {
        Ok(Self::env().balance())
    }

    #[modifiers(only_owner)]
    fn tranfer_psp22(
        &mut self,
        psp22_contract_address: AccountId,
        amount: Balance,
        receiver: AccountId,
    ) -> Result<(), Error> {
        let builder =
            Psp22Ref::transfer_builder(&psp22_contract_address, receiver, amount, Vec::<u8>::new());

        match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        }
    }
}
