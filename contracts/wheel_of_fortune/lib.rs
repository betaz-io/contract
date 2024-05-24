#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable, Pausable, Upgradeable, AccessControl)]
#[openbrush::contract]
pub mod wheel_of_fortune {
    use bet_a0::{
        impls::{
            admin::*,
            wheel_of_fortune::{data::Data, Psp22Ref, ADMINER, *},
        },
        traits::error::Error,
    };

    use dia_oracle_randomness_getter::RandomOracleGetter;
    use dia_randomness_oracle::oracle_anchor::RandomnessOracleRef;
    use ink::{codegen::EmitEvent, env::CallFlags, prelude::vec::Vec, reflect::ContractEventBase};
    use pandora_psp34_standard::pandora_psp34_standard::PandoraPsp34StandardContractRef;

    use openbrush::{
        contracts::{
            access_control::extensions::enumerable,
            ownable::{OwnableError, *},
            pausable::{PausableError, *},
            psp22::*,
        },
        modifiers,
        traits::Storage,
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct WheelOfFortuneContract {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        data: Data,
    }

    #[ink(event)]
    pub struct BuyEvent {
        buyer: AccountId,
        nft_amount: u64,
        betaz_fee: Balance,
    }

    pub type Event = <WheelOfFortuneContract as ContractEventBase>::Type;

    impl AdminTrait for WheelOfFortuneContract {}
    impl WheelOfFortuneTraitImpl for WheelOfFortuneContract {}
    impl WheelOfFortuneTrait for WheelOfFortuneContract {
        // EXECUTE FUNCTIONS
        /// Function changes state
        #[ink(message)]
        fn change_state(&mut self) -> Result<(), Error> {
            WheelOfFortuneTraitImpl::change_state(self)
        }

        // SET FUNCTIONS
        #[ink(message)]
        fn set_betaz_token_fee(&mut self, betaz_token_fee: Balance) -> Result<(), Error> {
            WheelOfFortuneTraitImpl::set_betaz_token_fee(self, betaz_token_fee)
        }
        #[ink(message)]
        fn set_round_distance(&mut self, round_distance: u64) -> Result<(), Error> {
            WheelOfFortuneTraitImpl::set_round_distance(self, round_distance)
        }
        #[ink(message)]
        fn set_amount_out_min_nft(&mut self, amount_out_min_nft: u64) -> Result<(), Error> {
            WheelOfFortuneTraitImpl::set_amount_out_min_nft(self, amount_out_min_nft)
        }
        #[ink(message)]
        fn set_amount_out_max_nft(&mut self, amount_out_max_nft: u64) -> Result<(), Error> {
            WheelOfFortuneTraitImpl::set_amount_out_max_nft(self, amount_out_max_nft)
        }
        #[ink(message)]
        fn set_oracle_randomness_address(
            &mut self,
            oracle_randomness_address: AccountId,
        ) -> Result<(), Error> {
            WheelOfFortuneTraitImpl::set_oracle_randomness_address(self, oracle_randomness_address)
        }
        #[ink(message)]
        fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error> {
            WheelOfFortuneTraitImpl::set_betaz_token_address(self, betaz_token_address)
        }
        #[ink(message)]
        fn set_psp34_contract_address(
            &mut self,
            psp34_contract_address: AccountId,
        ) -> Result<(), Error> {
            WheelOfFortuneTraitImpl::set_psp34_contract_address(self, psp34_contract_address)
        }

        // GET FUNCTIONS
        #[ink(message)]
        fn get_betaz_token_address(&self) -> AccountId {
            WheelOfFortuneTraitImpl::get_betaz_token_address(self)
        }
        #[ink(message)]
        fn get_psp34_contract_address(&self) -> AccountId {
            WheelOfFortuneTraitImpl::get_betaz_token_address(self)
        }
        #[ink(message)]
        fn get_oracle_randomness_address(&self) -> AccountId {
            WheelOfFortuneTraitImpl::get_betaz_token_address(self)
        }
        #[ink(message)]
        fn get_betaz_token_fee(&self) -> Balance {
            WheelOfFortuneTraitImpl::get_betaz_token_fee(self)
        }
        #[ink(message)]
        fn get_round_distance(&self) -> u64 {
            WheelOfFortuneTraitImpl::get_round_distance(self)
        }
        #[ink(message)]
        fn get_amount_out_min_nft(&self) -> u64 {
            WheelOfFortuneTraitImpl::get_amount_out_min_nft(self)
        }
        #[ink(message)]
        fn get_amount_out_max_nft(&self) -> u64 {
            WheelOfFortuneTraitImpl::get_amount_out_max_nft(self)
        }
    }

    impl WheelOfFortuneContract {
        #[ink(constructor)]
        pub fn new(
            admin_address: AccountId,
            oracle_randomness_address: AccountId,
            betaz_token_address: AccountId,
            psp34_contract_address: AccountId,
            betaz_token_fee: Balance,
            amount_out_min_nft: u64,
            amount_out_max_nft: u64,
        ) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            instance
                .initialize(
                    admin_address,
                    oracle_randomness_address,
                    betaz_token_address,
                    psp34_contract_address,
                    betaz_token_fee,
                    amount_out_min_nft,
                    amount_out_max_nft,
                )
                .ok()
                .unwrap();
            instance
        }

        // EXECUTE FUNCTIONS
        /// Function init
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(
            &mut self,
            admin_address: AccountId,
            oracle_randomness_address: AccountId,
            betaz_token_address: AccountId,
            psp34_contract_address: AccountId,
            betaz_token_fee: Balance,
            amount_out_min_nft: u64,
            amount_out_max_nft: u64,
        ) -> Result<(), Error> {
            if self.data.oracle_randomness_address != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }
            access_control::Internal::_init_with_admin(self, Some(self.env().caller()));
            AccessControl::grant_role(self, ADMINER, Some(self.env().caller()))
                .expect("Can not set admin role");
            if !AccessControl::has_role(self, ADMINER, Some(admin_address)) {
                AccessControl::grant_role(self, ADMINER, Some(admin_address))
                    .expect("Can not set admin role");
            }
            self.data.oracle_randomness_address = oracle_randomness_address;
            self.data.betaz_token_address = betaz_token_address;
            self.data.psp34_contract_address = psp34_contract_address;
            self.data.betaz_token_fee = betaz_token_fee;
            self.data.amount_out_min_nft = amount_out_min_nft;
            self.data.amount_out_max_nft = amount_out_max_nft;
            self.data.round_distance = 3;
            Ok(())
        }

        #[ink(message)]
        pub fn random_nft(&mut self) -> Result<(Balance, u64), Error> {
            let mut pandora_psp34_standard: PandoraPsp34StandardContractRef =
                ink::env::call::FromAccountId::from_account_id(self.data.psp34_contract_address);
            let caller = Self::env().caller();

            // Transfer BETAZ Token from Caller to contract
            let fee = self.data.betaz_token_fee;
            let betaz_balance = PSP22Ref::balance_of(&self.data.betaz_token_address, caller);

            // Check psp22 balance and allowance of caller
            let allowance = Psp22Ref::allowance(
                &self.data.betaz_token_address,
                caller,
                Self::env().account_id(),
            );

            if allowance < fee || betaz_balance < fee {
                return Err(Error::InvalidBalanceAndAllowance);
            }

            let builder = PSP22Ref::transfer_from_builder(
                &self.data.betaz_token_address,
                caller,
                Self::env().account_id(),
                fee,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true));

            let transfer_betaz_result = match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => Err(Error::CannotTransfer),
            };

            if transfer_betaz_result.is_err() {
                return Err(Error::CannotTransfer);
            }
            if let Some(amounts) = self.get_random_amount_nft() {
                let mint_result = PandoraPsp34StandardContractRef::multiple_mint_ticket(
                    &mut pandora_psp34_standard,
                    caller,
                    amounts,
                );

                if mint_result.is_err() {
                    return Err(Error::CannotMint);
                }

                WheelOfFortuneContract::emit_event(
                    self.env(),
                    Event::BuyEvent(BuyEvent {
                        buyer: caller,
                        nft_amount: amounts,
                        betaz_fee: fee,
                    }),
                );
                Ok((fee, amounts))
            } else {
                return Err(Error::CannotRandomAmounts);
            }
        }

        #[inline]
        fn get_random_amount_nft(&mut self) -> Option<u64> {
            let randomness_oracle_contract: RandomnessOracleRef =
                ink::env::call::FromAccountId::from_account_id(self.data.oracle_randomness_address);

            let round = <RandomnessOracleRef as RandomOracleGetter>::get_latest_round(
                &randomness_oracle_contract,
            );

            let round_next = round.checked_add(self.data.round_distance).unwrap();

            if let Some(random_number_oracle) =
                <RandomnessOracleRef as RandomOracleGetter>::get_random_value_for_round(
                    &randomness_oracle_contract,
                    round_next,
                )
            {
                // Convert the received random bytes to a u64 number
                let mut output =
                    <ink::env::hash::Keccak256 as ink::env::hash::HashOutput>::Type::default();
                ink::env::hash_bytes::<ink::env::hash::Keccak256>(
                    &random_number_oracle,
                    &mut output,
                );
                let hash = output.as_ref();

                // Safely convert first 8 bytes of the hash to a u64
                let raw_random_number =
                    u64::from_be_bytes(hash[..8].try_into().expect("slice with incorrect length"));

                // Scale the random number within the provided min and max range
                let scaled_random_number = self
                    .data
                    .amount_out_min_nft
                    .checked_add(
                        raw_random_number
                            % ((self
                                .data
                                .amount_out_max_nft
                                .checked_sub(self.data.amount_out_min_nft)
                                .unwrap())
                            .checked_add(1 as u64)
                            .unwrap()),
                    )
                    .unwrap();

                return Some(scaled_random_number);
            } else {
                return None;
            }
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}
