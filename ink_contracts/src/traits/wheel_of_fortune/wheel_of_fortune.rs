pub use crate::traits::errors::WheelOfFortuneError;
use ink::env::{DefaultEnvironment, Environment};
use ink::primitives::AccountId;
pub type Balance = <DefaultEnvironment as Environment>::Balance;
use crate::impls::wheel_of_fortune::RandomInformation;

#[ink::trait_definition]
pub trait WheelOfFortuneTrait {
    // EXECUTE FUNCTIONS
    #[ink(message)]
    fn change_state(&mut self) -> Result<(), WheelOfFortuneError>;

    // SET FUNCTIONS
    #[ink(message)]
    fn set_betaz_token_fee(&mut self, betaz_token_fee: Balance) -> Result<(), WheelOfFortuneError>;
    #[ink(message)]
    fn set_round_distance(&mut self, round_distance: u64) -> Result<(), WheelOfFortuneError>;
    #[ink(message)]
    fn set_amount_out_min_nft(
        &mut self,
        amount_out_min_nft: u64,
    ) -> Result<(), WheelOfFortuneError>;
    #[ink(message)]
    fn set_amount_out_max_nft(
        &mut self,
        amount_out_max_nft: u64,
    ) -> Result<(), WheelOfFortuneError>;
    #[ink(message)]
    fn set_oracle_randomness_address(
        &mut self,
        oracle_randomness_address: AccountId,
    ) -> Result<(), WheelOfFortuneError>;
    #[ink(message)]
    fn set_betaz_token_address(
        &mut self,
        betaz_token_address: AccountId,
    ) -> Result<(), WheelOfFortuneError>;
    #[ink(message)]
    fn set_psp34_contract_address(
        &mut self,
        psp34_contract_address: AccountId,
    ) -> Result<(), WheelOfFortuneError>;

    // GET FUNCTIONS
    #[ink(message)]
     fn get_random_nft_by_player(&self, player: AccountId) -> Option<RandomInformation>;
    #[ink(message)]
    fn get_betaz_token_address(&self) -> AccountId;
    #[ink(message)]
    fn get_psp34_contract_address(&self) -> AccountId;
    #[ink(message)]
    fn get_oracle_randomness_address(&self) -> AccountId;
    #[ink(message)]
    fn get_betaz_token_fee(&self) -> Balance;
    #[ink(message)]
    fn get_round_distance(&self) -> u64;
    #[ink(message)]
    fn get_amount_out_min_nft(&self) -> u64;
    #[ink(message)]
    fn get_amount_out_max_nft(&self) -> u64;
}
