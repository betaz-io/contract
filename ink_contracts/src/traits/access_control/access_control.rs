pub use crate::traits::errors::AccessControlError;
pub type RoleType = u32;
use ink::primitives::AccountId;

#[ink::trait_definition]
pub trait AccessControl {
    /// Returns `true` if `account` has been granted `role`.
    #[ink(message)]
    fn has_role(&self, role: RoleType, address: Option<AccountId>) -> bool;

    /// Returns the admin role that controls `role`. See `grant_role` and `revoke_role`.
    #[ink(message)]
    fn get_role_admin(&self, role: RoleType) -> RoleType;

    /// Grants `role` to `account`.
    ///
    /// On success a `RoleGranted` event is emitted.
    ///
    /// # Errors
    ///
    /// Returns with `MissingRole` error if caller can't grant the role.
    /// Returns with `RoleRedundant` error `account` has `role`.
    #[ink(message)]
    fn grant_role(
        &mut self,
        role: RoleType,
        account: Option<AccountId>,
    ) -> Result<(), AccessControlError>;

    /// Revokes `role` from `account`.
    ///
    /// On success a `RoleRevoked` event is emitted.
    ///
    /// # Errors
    ///
    /// Returns with `MissingRole` error if caller can't grant the `role` or if `account` doesn't have `role`.
    #[ink(message)]
    fn revoke_role(
        &mut self,
        role: RoleType,
        account: Option<AccountId>,
    ) -> Result<(), AccessControlError>;

    /// Revokes `role` from the calling account.
    /// Roles are often managed via `grant_role` and `revoke_role`: this function's
    /// purpose is to provide a mechanism for accounts to lose their privileges
    /// if they are compromised (such as when a trusted device is misplaced).
    ///
    /// On success a `RoleRevoked` event is emitted.
    ///
    /// # Errors
    ///
    /// Returns with `InvalidCaller` error if caller is not `account`.
    /// Returns with `MissingRole` error if `account` doesn't have `role`.
    #[ink(message)]
    fn renounce_role(
        &mut self,
        role: RoleType,
        account: Option<AccountId>,
    ) -> Result<(), AccessControlError>;
}
