use crate::traits::error::Error;
use openbrush::{
    contracts::traits::psp22::*,
    traits::{AccountId, Balance},
};

#[openbrush::wrapper]
pub type BetA0AdminRef = dyn AdminTrait;
#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22;

#[openbrush::trait_definition]
pub trait AdminTrait {
    fn _emit_withdraw_fee(&self, _value: Balance, _receiver: AccountId);
    /// This function allows contract owner to withdraw contract balance to his account.
    #[ink(message)]
    fn withdraw_fee(&mut self, value: Balance, receiver: AccountId) -> Result<(), Error>;
    /// This function allow contract owner withdraw PSP22 to an account in case there is any token sent to contract by mistake
    #[ink(message)]
    fn tranfer_psp22(&mut self, psp22_contract_address: AccountId, amount: Balance, receiver: AccountId) -> Result<(), Error>;
}
