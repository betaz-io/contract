use crate::traits::errors::*;

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum WheelOfFortuneError {
    MathError(MathError),
    OwnableError(OwnableError),
    PausableError(PausableError),
    AccessControlError(AccessControlError),
    CannotSet,
    AlreadyInit,
    InvalidInput,
    InvalidBalanceAndAllowance,
    CannotTransfer,
    CannotMint,
    CannotRandomAmounts
}

impl From<MathError> for WheelOfFortuneError {
    fn from(error: MathError) -> Self {
        WheelOfFortuneError::MathError(error)
    }
}

impl From<OwnableError> for WheelOfFortuneError {
    fn from(error: OwnableError) -> Self {
        WheelOfFortuneError::OwnableError(error)
    }
}

impl From<PausableError> for WheelOfFortuneError {
    fn from(error: PausableError) -> Self {
        WheelOfFortuneError::PausableError(error)
    }
}

impl From<AccessControlError> for WheelOfFortuneError {
    fn from(error: AccessControlError) -> Self {
        WheelOfFortuneError::AccessControlError(error)
    }
}
