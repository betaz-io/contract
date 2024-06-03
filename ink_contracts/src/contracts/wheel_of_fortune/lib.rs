#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
pub mod wheel_of_fortune {
    const DEFAULT_ADMIN_ROLE: RoleType = 0;
    // 3739740293
    pub const ADMINER: RoleType = ink::selector_id!("ADMINER");
    use betaz_project::{
        impls::{ownable::*, pausable::*, wheel_of_fortune::*},
        traits::{access_control::*, ownable::*, pausable::*, upgradeable::*, wheel_of_fortune::*},
    };
    use dia_oracle_randomness_getter::RandomOracleGetter;
    use dia_randomness_oracle::oracle_anchor::RandomnessOracleRef;
    use ink::contract_ref;
    use ink::env::call::FromAccountId;
    use ink::storage::Mapping;
    use ink::{codegen::EmitEvent, prelude::vec::Vec, reflect::ContractEventBase};
    use pandora_psp34_standard::pandora_psp34_standard::PandoraPsp34StandardContractRef;
    use psp22::PSP22;

    #[ink(storage)]
    #[derive(Default)]
    pub struct WheelOfFortuneContract {
        admin_roles: Mapping<RoleType, RoleType>,
        members: Mapping<(RoleType, Option<AccountId>), ()>,
        ownable: OwnableData,
        pausable: PausableData,
        data: Data,
    }

    #[ink(event)]
    pub struct OwnershipTransferred {
        #[ink(topic)]
        old_owner: Option<AccountId>,
        #[ink(topic)]
        new_owner: Option<AccountId>,
    }

    #[ink(event)]
    pub struct BuyEvent {
        #[ink(topic)]
        buyer: AccountId,
        #[ink(topic)]
        nft_amount: u64,
        #[ink(topic)]
        betaz_fee: Balance,
    }

    pub type Event = <WheelOfFortuneContract as ContractEventBase>::Type;

    impl Ownable for WheelOfFortuneContract {
        #[ink(message)]
        fn owner(&self) -> Option<AccountId> {
            self.ownable.owner()
        }
        #[ink(message)]
        fn renounce_ownership(&mut self) -> Result<(), OwnableError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            self.ownable.renounce_ownership()?;
            WheelOfFortuneContract::emit_event(
                self.env(),
                Event::OwnershipTransferred(OwnershipTransferred {
                    old_owner: Some(self.env().caller()),
                    new_owner: None,
                }),
            );
            Ok(())
        }
        #[ink(message)]
        fn transfer_ownership(&mut self, new_owner: Option<AccountId>) -> Result<(), OwnableError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            self.ownable.transfer_ownership(new_owner)?;
            WheelOfFortuneContract::emit_event(
                self.env(),
                Event::OwnershipTransferred(OwnershipTransferred {
                    old_owner: self.owner(),
                    new_owner,
                }),
            );

            Ok(())
        }
    }

    impl Pausable for WheelOfFortuneContract {
        #[ink(message)]
        fn paused(&self) -> bool {
            self.pausable._paused()
        }
    }

    impl WheelOfFortuneTrait for WheelOfFortuneContract {
        // EXECUTE FUNCTIONS
        #[ink(message)]
        fn change_state(&mut self) -> Result<(), WheelOfFortuneError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            self.pausable._switch_pause()?;
            Ok(())
        }

        // SET FUNCTIONS
        #[ink(message)]
        fn set_betaz_token_fee(
            &mut self,
            betaz_token_fee: Balance,
        ) -> Result<(), WheelOfFortuneError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            if self.data.set_betaz_token_fee(betaz_token_fee).is_err() {
                return Err(WheelOfFortuneError::CannotSet);
            }
            Ok(())
        }
        #[ink(message)]
        fn set_round_distance(&mut self, round_distance: u64) -> Result<(), WheelOfFortuneError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            if self.data.set_round_distance(round_distance).is_err() {
                return Err(WheelOfFortuneError::CannotSet);
            }
            Ok(())
        }
        #[ink(message)]
        fn set_amount_out_min_nft(
            &mut self,
            amount_out_min_nft: u64,
        ) -> Result<(), WheelOfFortuneError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            self.data.set_amount_out_min_nft(amount_out_min_nft)?;
            Ok(())
        }
        #[ink(message)]
        fn set_amount_out_max_nft(
            &mut self,
            amount_out_max_nft: u64,
        ) -> Result<(), WheelOfFortuneError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            self.data.set_amount_out_max_nft(amount_out_max_nft)?;
            Ok(())
        }
        #[ink(message)]
        fn set_oracle_randomness_address(
            &mut self,
            oracle_randomness_address: AccountId,
        ) -> Result<(), WheelOfFortuneError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            self.data
                .set_oracle_randomness_address(oracle_randomness_address)?;
            Ok(())
        }
        #[ink(message)]
        fn set_betaz_token_address(
            &mut self,
            betaz_token_address: AccountId,
        ) -> Result<(), WheelOfFortuneError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            self.data.set_betaz_token_address(betaz_token_address)?;
            Ok(())
        }
        #[ink(message)]
        fn set_psp34_contract_address(
            &mut self,
            psp34_contract_address: AccountId,
        ) -> Result<(), WheelOfFortuneError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            self.data
                .set_psp34_contract_address(psp34_contract_address)?;
            Ok(())
        }

        // GET FUNCTIONS
        #[ink(message)]
        fn get_betaz_token_address(&self) -> AccountId {
            self.data.get_betaz_token_address()
        }
        #[ink(message)]
        fn get_psp34_contract_address(&self) -> AccountId {
            self.data.get_psp34_contract_address()
        }
        #[ink(message)]
        fn get_oracle_randomness_address(&self) -> AccountId {
            self.data.get_oracle_randomness_address()
        }
        #[ink(message)]
        fn get_betaz_token_fee(&self) -> Balance {
            self.data.get_betaz_token_fee()
        }
        #[ink(message)]
        fn get_round_distance(&self) -> u64 {
            self.data.get_round_distance()
        }
        #[ink(message)]
        fn get_amount_out_min_nft(&self) -> u64 {
            self.data.get_amount_out_min_nft()
        }
        #[ink(message)]
        fn get_amount_out_max_nft(&self) -> u64 {
            self.data.get_amount_out_max_nft()
        }
    }

    impl AccessControl for WheelOfFortuneContract {
        #[ink(message)]
        fn has_role(&self, role: RoleType, address: Option<AccountId>) -> bool {
            self.members.contains(&(role, address))
        }

        #[ink(message)]
        fn get_role_admin(&self, role: RoleType) -> RoleType {
            self.admin_roles.get(role).unwrap_or(DEFAULT_ADMIN_ROLE)
        }

        #[ink(message)]
        fn grant_role(
            &mut self,
            role: RoleType,
            account: Option<AccountId>,
        ) -> Result<(), AccessControlError> {
            if !self.has_role(self.get_role_admin(role), Some(self.env().caller())) {
                return Err(AccessControlError::MissingRole);
            }
            if self.has_role(role, account) {
                return Err(AccessControlError::RoleRedundant);
            }
            self.members.insert(&(role, account), &());
            Ok(())
        }

        #[ink(message)]
        fn revoke_role(
            &mut self,
            role: RoleType,
            account: Option<AccountId>,
        ) -> Result<(), AccessControlError> {
            if !self.has_role(self.get_role_admin(role), Some(self.env().caller())) {
                return Err(AccessControlError::MissingRole);
            }
            if !self.has_role(role, account) {
                return Err(AccessControlError::MissingRole);
            }
            self.members.remove(&(role, account));
            Ok(())
        }

        #[ink(message)]
        fn renounce_role(
            &mut self,
            role: RoleType,
            account: Option<AccountId>,
        ) -> Result<(), AccessControlError> {
            if account != Some(self.env().caller()) {
                return Err(AccessControlError::InvalidCaller);
            }
            if !self.has_role(role, account) {
                return Err(AccessControlError::MissingRole);
            }
            self.members.remove(&(role, account));
            Ok(())
        }
    }

    impl UpgradeableTrait for WheelOfFortuneContract {
        #[ink(message)]
        fn set_code(&mut self, new_code_hash: Hash) -> Result<(), UpgradeableError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            self.env()
                .set_code_hash(&new_code_hash)
                .map_err(|_| UpgradeableError::SetCodeHashFailed)
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
            let caller = instance.env().caller();
            instance.ownable._init_with_owner(caller);
            instance
                .members
                .insert(&(DEFAULT_ADMIN_ROLE, Some(caller)), &());
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
        pub fn initialize(
            &mut self,
            admin_address: AccountId,
            oracle_randomness_address: AccountId,
            betaz_token_address: AccountId,
            psp34_contract_address: AccountId,
            betaz_token_fee: Balance,
            amount_out_min_nft: u64,
            amount_out_max_nft: u64,
        ) -> Result<(), WheelOfFortuneError> {
            self.ownable._check_owner(Some(self.env().caller()))?;
            if self.data.oracle_randomness_address != [0u8; 32].into() {
                return Err(WheelOfFortuneError::AlreadyInit);
            }
            if amount_out_min_nft > amount_out_max_nft {
                return Err(WheelOfFortuneError::InvalidInput);
            }
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
        pub fn random_nft(&mut self) -> Result<(), WheelOfFortuneError> {
            let mut pandora_psp34_standard: PandoraPsp34StandardContractRef =
                FromAccountId::from_account_id(self.data.psp34_contract_address);
            let caller = Self::env().caller();
            let mut bet_token_contract: contract_ref!(PSP22) = self.data.betaz_token_address.into();

            // Transfer BETAZ Token from Caller to contract
            let fee = self.data.betaz_token_fee;
            let betaz_balance = bet_token_contract.balance_of(caller);

            // Check psp22 balance and allowance of caller
            let allowance = bet_token_contract.allowance(caller, Self::env().account_id());

            if allowance < fee || betaz_balance < fee {
                return Err(WheelOfFortuneError::InvalidBalanceAndAllowance);
            }

            if bet_token_contract
                .transfer_from(caller, Self::env().account_id(), fee, Vec::<u8>::new())
                .is_ok()
            {
                if let Some(amounts) = self.get_random_amount_nft() {
                    let mint_result = PandoraPsp34StandardContractRef::multiple_mint_ticket(
                        &mut pandora_psp34_standard,
                        caller,
                        amounts,
                    );

                    if mint_result.is_ok() {
                        WheelOfFortuneContract::emit_event(
                            self.env(),
                            Event::BuyEvent(BuyEvent {
                                buyer: caller,
                                nft_amount: amounts,
                                betaz_fee: fee,
                            }),
                        );                  
                    } else {
                        return Err(WheelOfFortuneError::CannotMint);
                    }
                } else {
                    return Err(WheelOfFortuneError::CannotRandomAmounts);
                }
            } else {
                return Err(WheelOfFortuneError::CannotTransfer);
            }

            Ok(())
        }

        #[inline]
        fn get_random_amount_nft(&mut self) -> Option<u64> {
            let randomness_oracle_contract: RandomnessOracleRef =
                FromAccountId::from_account_id(self.data.oracle_randomness_address);

            let round_next = <RandomnessOracleRef as RandomOracleGetter>::get_latest_round(
                &randomness_oracle_contract,
            )
            .checked_add(self.data.round_distance)?;

            if let Some(random_number_oracle) =
                <RandomnessOracleRef as RandomOracleGetter>::get_random_value_for_round(
                    &randomness_oracle_contract,
                    round_next,
                )
            {
                let mut output = [0u8; 32];
                ink::env::hash_bytes::<ink::env::hash::Keccak256>(
                    &random_number_oracle,
                    &mut output,
                );

                let raw_random_number = u64::from_be_bytes(output[..8].try_into().ok()?);
                let range = self
                    .data
                    .amount_out_max_nft
                    .checked_sub(self.data.amount_out_min_nft)?
                    .checked_add(1)?;

                let random_amount = self
                    .data
                    .amount_out_min_nft
                    .checked_add(raw_random_number % range)?;

                Some(random_amount)
            } else {
                None
            }
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}
