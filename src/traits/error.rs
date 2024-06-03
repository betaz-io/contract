use ink::prelude::string::String;
use openbrush::{contracts::access_control::*, contracts::ownable::*};

use openbrush::contracts::traits::{pausable::PausableError, psp22::PSP22Error, psp34::PSP34Error};

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Error {
    Custom(String),
    OnlyOwner,
    OnlyAdmin,
    InvalidCaller,
    OnlyMinterCanMint,
    NotApproved,
    CannotTransfer,
    CannotMint,
    InvalidBuyTokensStatus,
    InvalidRewardTokensStatus,
    InsufficientAllowanceToLend,
    NotEnoughBalance,
    WithdrawFeeError,
    MaxBuyTokenAmount,
    TokensCanNotPurchased,
    TransferFailed,
    AlreadyInit,
    NotOwner,
    BetNotFinalized,
    CallerIsNotAdmin,
    InvalidInput,
    BetNotExist,
    HoldAmountPlayerNotExist,
    NoAmount,
    InvalidBalanceAndAllowance,
    InvalidUnstakedAmount,
    NotTimeToUnstaked,
    NoStakerFound,
    NotStaked,
    InvalidTotalStake,
    CallerNotRequestUnstake,
    ClaimMustBeFalse,
    RewardStarted,
    RewardNotStarted,
    InvalidInputRatio,
    NotTimeBuyToken,
    CannotBuyAtThisTime,
    NotTimeToFinalize,
    WhitelistNotExists,
    PoolNotExists,
    InvalidWhitelistData,
    WhitelistInfoExist,
    WhitelistBuyerPurchased,
    SalePoolPrurchased,
    PoolPrurchased,
    InvalidEndTime,
    NotTokenOwner,
    CannotIncreaseLastTokenId,
    CannotSetAttributes,
    SessionNotExists,
    SessionIsExists,
    BetIsExists,
    SessionNotCompleted,
    SessionNotFinished,
    SessionNotProcessed,
    YouAreNotWinner,
    InvalidState,
    SessionNotTicketWin,
    NftIsUsed,
    NftIsNotUsed,
    CannotBurn,
    NextSessionsNotExists,
    AddSessionFailed,
    InvalidFee,
    PoolIsExists,
    InvalidTotalPurchasedAmount,
    TicketAmountLimitReached,
    NotTimeToFinalized,
    CallerDoNotHaveVoting,
    SetPoolRationFailed,
    FailToDecreaseClaimableReward,
    RewardNotAdded,
    ChainlinkRequestIdIsExists,
    CannotUpdateSession,
    OwnableError(OwnableError),
    AccessControlError(AccessControlError),
    PSP22Error(PSP22Error),
    PSP34Error(PSP34Error),
    PausableError(PausableError),
    CheckedOperations,
}

impl From<OwnableError> for Error {
    fn from(ownable: OwnableError) -> Self {
        Error::OwnableError(ownable)
    }
}

impl From<AccessControlError> for Error {
    fn from(access: AccessControlError) -> Self {
        Error::AccessControlError(access)
    }
}

impl From<PSP22Error> for Error {
    fn from(error: PSP22Error) -> Self {
        Error::PSP22Error(error)
    }
}

impl From<PSP34Error> for Error {
    fn from(error: PSP34Error) -> Self {
        Error::PSP34Error(error)
    }
}

impl From<PausableError> for Error {
    fn from(error: PausableError) -> Self {
        Error::PausableError(error)
    }
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum LockError {
    NotLocked,
    Locked,
}

impl From<LockError> for Error {
    fn from(locked: LockError) -> Self {
        match locked {
            LockError::Locked => Error::Custom(String::from("O::Locked")),
            LockError::NotLocked => Error::Custom(String::from("O::NotLocked")),
        }
    }
}
