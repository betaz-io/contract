#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::bet_token::BetTokenContractRef;

#[openbrush::implementation(
    PSP22,
    PSP22Metadata,
    PSP22Mintable,
    PSP22Burnable,
    Ownable,
    Pausable,
    Upgradeable,
    AccessControl,
    AccessControlEnumerable
)]
#[openbrush::contract]
pub mod bet_token {
    use bet_a0::{
        impls::{
            admin::AdminTraitImpl,
            bet_token::{BetAZTraitImpl, ADMINER, MINTER, *},
        },
        traits::error::Error,
    };
    use openbrush::{
        contracts::{
            access_control::extensions::enumerable,
            ownable::{OwnableError, *},
            pausable::{PausableError, *},
            psp22::PSP22Error,
        },
        modifiers,
        traits::{Storage, String},
    };

    use crate::bet_token::access_control::only_role;
    use ink::codegen::{EmitEvent, Env};

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct BetTokenContract {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        data: bet_token::data::Data,
        #[storage_field]
        admin_data: bet_a0::impls::admin::data::Data,
    }

    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        value: Balance,
    }

    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        spender: AccountId,
        value: Balance,
    }

    #[ink(event)]
    pub struct Burn {
        #[ink(topic)]
        account: AccountId,
        #[ink(topic)]
        amount: Balance,
    }

    #[overrider(psp22::Internal)]
    fn _emit_transfer_event(
        &self,
        from: Option<AccountId>,
        to: Option<AccountId>,
        amount: Balance,
    ) {
        self.env().emit_event(Transfer {
            from,
            to,
            value: amount,
        });
    }

    #[overrider(psp22::Internal)]
    fn _emit_approval_event(&self, owner: AccountId, spender: AccountId, amount: Balance) {
        self.env().emit_event(Approval {
            owner,
            spender,
            value: amount,
        });
    }

    #[default_impl(PSP22Burnable)]
    #[modifiers(only_role(ADMINER))]
    fn burn() {}

    #[default_impl(PSP22Mintable)]
    #[modifiers(only_role(MINTER))]
    fn mint() {}

    impl AdminTraitImpl for BetTokenContract {}
    impl BetAZTraitImpl for BetTokenContract {
        fn _emit_burn_event(&self, account: AccountId, amount: Balance) {
            self.env().emit_event(Burn { account, amount });
        }
    }
    impl BetAZTrait for BetTokenContract {
        // EXECUTE FUNCTION
        #[ink(message)]
        fn change_state(&mut self) -> Result<(), Error> {
            BetAZTraitImpl::change_state(self)
        }
        /// Only minter can mint
        #[ink(message)]
        fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), Error> {
            BetAZTraitImpl::mint(self, account, amount)
        }

        #[ink(message)]
        fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), Error> {
            BetAZTraitImpl::burn(self, account, amount)
        }

        /// Withdraw any Balance of Contract - only Owner
        #[ink(message)]
        fn withdraw(&mut self, value: Balance) -> Result<(), Error> {
            BetAZTraitImpl::withdraw(self, value)
        }

        // GET FUNCTIONS
        #[ink(message)]
        fn is_admin_address(&self, address: AccountId) -> bool {
            BetAZTraitImpl::is_admin_address(self, address)
        }

        #[ink(message)]
        fn is_minter_address(&self, address: AccountId) -> bool {
            BetAZTraitImpl::is_minter_address(self, address)
        }

        // SET FUNCTIONS
        #[ink(message)]
        fn set_admin_address(&mut self, address: AccountId) -> Result<(), Error> {
            BetAZTraitImpl::set_admin_address(self, address)
        }

        #[ink(message)]
        fn set_minter_address(&mut self, address: AccountId) -> Result<(), Error> {
            BetAZTraitImpl::set_minter_address(self, address)
        }
    }

    impl BetTokenContract {
        #[ink(constructor)]
        pub fn new(
            name: Option<String>,
            symbol: Option<String>,
            decimal: u8,
            minter: AccountId,
            admin: AccountId,
        ) -> Self {
            let mut instance = Self::default();
            ownable::Internal::_init_with_owner(&mut instance, Self::env().caller());
            instance.metadata.name.set(&name);
            instance.metadata.symbol.set(&symbol);
            instance.metadata.decimals.set(&decimal);
            access_control::Internal::_init_with_admin(&mut instance, Some(Self::env().caller()));
            AccessControl::grant_role(&mut instance, ADMINER, Some(Self::env().caller()))
                .expect("Can not set admin role");
            if !AccessControl::has_role(&instance, ADMINER, Some(admin)) {
                AccessControl::grant_role(&mut instance, ADMINER, Some(admin))
                    .expect("Can not set admin role");
            }

            AccessControl::grant_role(&mut instance, MINTER, Some(Self::env().caller()))
                .expect("Can not set minter role");
            if !AccessControl::has_role(&instance, MINTER, Some(minter)) {
                AccessControl::grant_role(&mut instance, MINTER, Some(minter))
                    .expect("Can not set minter role");
            }
            instance
        }
    }
}
