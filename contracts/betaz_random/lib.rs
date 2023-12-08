#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::betaz_random::BetA0RandomContractRef;

#[openbrush::implementation(Ownable, Pausable, Upgradeable)]
#[openbrush::contract]
pub mod betaz_random {
    use bet_a0::traits::error::Error;
    use dia_oracle_randomness_getter::RandomOracleGetter;
    use dia_randomness_oracle::oracle_anchor::RandomnessOracleRef;
    use openbrush::{
        contracts::{
            ownable::{OwnableError, *},
            pausable::{PausableError, *},
        },
        modifiers,
        traits::{DefaultEnv, Storage},
    };

    #[derive(Debug)]
    #[openbrush::storage_item]
    pub struct Manager {
        pub oracle_randomness_address: AccountId,
        pub _reserved: Option<()>,
    }

    impl Default for Manager {
        fn default() -> Self {
            Self {
                oracle_randomness_address: [0u8; 32].into(),
                _reserved: Default::default(),
            }
        }
    }

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct BetA0RandomContract {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        manager: Manager,
    }

    impl BetA0RandomContract {
        #[ink(constructor)]
        pub fn new(oracle_randomness_address: AccountId) -> Self {
            let mut instance = Self::default();
            let caller = <Self as DefaultEnv>::env().caller();
            ownable::Internal::_init_with_owner(&mut instance, caller);
            instance.initialize(oracle_randomness_address).ok().unwrap();
            instance
        }

        // EXECUTE FUNCTIONS
        /// Function init
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, oracle_randomness_address: AccountId) -> Result<(), Error> {
            // Make sure the initial data can only be init once
            if self.manager.oracle_randomness_address != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }
            self.manager.oracle_randomness_address = oracle_randomness_address;
            Ok(())
        }

        // Set func
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_randomness_oracle_contract_address(
            &mut self,
            oracle_randomness_address: AccountId,
        ) -> Result<(), Error> {
            Ok(self.manager.oracle_randomness_address = oracle_randomness_address)
        }

        // Get func
        #[ink(message)]
        pub fn get_randomness_oracle_contract_address(&mut self) -> AccountId {
            self.manager.oracle_randomness_address
        }

        #[ink(message)]
        pub fn get_latest_round(&self) -> u64 {
            let randomness_oracle_contract: RandomnessOracleRef =
                ink::env::call::FromAccountId::from_account_id(
                    self.manager.oracle_randomness_address,
                );
            let round = <RandomnessOracleRef as RandomOracleGetter>::get_latest_round(
                &randomness_oracle_contract,
            );
            round
        }

        #[ink(message)]
        pub fn get_random_number_for_round(&mut self, round: u64) -> Option<u32> {
            let randomness_oracle_contract: RandomnessOracleRef =
                ink::env::call::FromAccountId::from_account_id(
                    self.manager.oracle_randomness_address,
                );
            if let Some(random_number_oracle) =
                <RandomnessOracleRef as RandomOracleGetter>::get_random_value_for_round(
                    &randomness_oracle_contract,
                    round,
                )
            {
                // Todo: convert random number oracle to number
                let mut output =
                    <ink::env::hash::Keccak256 as ink::env::hash::HashOutput>::Type::default();
                ink::env::hash_bytes::<ink::env::hash::Keccak256>(
                    &random_number_oracle,
                    &mut output,
                );
                let hash = output.as_ref();
                let random_number =
                    u32::from_be_bytes(hash[..4].try_into().expect("slice with incorrect length"))
                        % 100;
                return Some(random_number);
            } else {
                return None;
            }
        }
    }
}
