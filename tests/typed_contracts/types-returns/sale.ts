import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface Error {
	custom ? : string,
	onlyOwner ? : null,
	onlyAdmin ? : null,
	invalidCaller ? : null,
	onlyMinterCanMint ? : null,
	notApproved ? : null,
	cannotTransfer ? : null,
	cannotMint ? : null,
	invalidBuyTokensStatus ? : null,
	invalidRewardTokensStatus ? : null,
	insufficientAllowanceToLend ? : null,
	notEnoughBalance ? : null,
	withdrawFeeError ? : null,
	maxBuyTokenAmount ? : null,
	tokensCanNotPurchased ? : null,
	transferFailed ? : null,
	alreadyInit ? : null,
	notOwner ? : null,
	betNotFinalized ? : null,
	callerIsNotAdmin ? : null,
	invalidInput ? : null,
	betNotExist ? : null,
	holdAmountPlayerNotExist ? : null,
	noAmount ? : null,
	invalidBalanceAndAllowance ? : null,
	invalidUnstakedAmount ? : null,
	notTimeToUnstaked ? : null,
	noStakerFound ? : null,
	notStaked ? : null,
	invalidTotalStake ? : null,
	callerNotRequestUnstake ? : null,
	claimMustBeFalse ? : null,
	rewardStarted ? : null,
	rewardNotStarted ? : null,
	invalidInputRatio ? : null,
	notTimeBuyToken ? : null,
	cannotBuyAtThisTime ? : null,
	notTimeToFinalize ? : null,
	whitelistNotExists ? : null,
	poolNotExists ? : null,
	invalidWhitelistData ? : null,
	whitelistInfoExist ? : null,
	whitelistBuyerPurchased ? : null,
	salePoolPrurchased ? : null,
	poolPrurchased ? : null,
	invalidEndTime ? : null,
	notTokenOwner ? : null,
	cannotIncreaseLastTokenId ? : null,
	cannotSetAttributes ? : null,
	sessionNotExists ? : null,
	sessionIsExists ? : null,
	betIsExists ? : null,
	sessionNotCompleted ? : null,
	sessionNotFinished ? : null,
	sessionNotProcessed ? : null,
	youAreNotWinner ? : null,
	invalidState ? : null,
	sessionNotTicketWin ? : null,
	nftIsUsed ? : null,
	nftIsNotUsed ? : null,
	cannotBurn ? : null,
	nextSessionsNotExists ? : null,
	addSessionFailed ? : null,
	invalidFee ? : null,
	poolIsExists ? : null,
	invalidTotalPurchasedAmount ? : null,
	ticketAmountLimitReached ? : null,
	notTimeToFinalized ? : null,
	callerDoNotHaveVoting ? : null,
	setPoolRationFailed ? : null,
	failToDecreaseClaimableReward ? : null,
	rewardNotAdded ? : null,
	chainlinkRequestIdIsExists ? : null,
	ownableError ? : OwnableError,
	accessControlError ? : AccessControlError,
	psp22Error ? : PSP22Error,
	psp34Error ? : PSP34Error,
	pausableError ? : PausableError,
	checkedOperations ? : null
}

export class ErrorBuilder {
	static Custom(value: string): Error {
		return {
			custom: value,
		};
	}
	static OnlyOwner(): Error {
		return {
			onlyOwner: null,
		};
	}
	static OnlyAdmin(): Error {
		return {
			onlyAdmin: null,
		};
	}
	static InvalidCaller(): Error {
		return {
			invalidCaller: null,
		};
	}
	static OnlyMinterCanMint(): Error {
		return {
			onlyMinterCanMint: null,
		};
	}
	static NotApproved(): Error {
		return {
			notApproved: null,
		};
	}
	static CannotTransfer(): Error {
		return {
			cannotTransfer: null,
		};
	}
	static CannotMint(): Error {
		return {
			cannotMint: null,
		};
	}
	static InvalidBuyTokensStatus(): Error {
		return {
			invalidBuyTokensStatus: null,
		};
	}
	static InvalidRewardTokensStatus(): Error {
		return {
			invalidRewardTokensStatus: null,
		};
	}
	static InsufficientAllowanceToLend(): Error {
		return {
			insufficientAllowanceToLend: null,
		};
	}
	static NotEnoughBalance(): Error {
		return {
			notEnoughBalance: null,
		};
	}
	static WithdrawFeeError(): Error {
		return {
			withdrawFeeError: null,
		};
	}
	static MaxBuyTokenAmount(): Error {
		return {
			maxBuyTokenAmount: null,
		};
	}
	static TokensCanNotPurchased(): Error {
		return {
			tokensCanNotPurchased: null,
		};
	}
	static TransferFailed(): Error {
		return {
			transferFailed: null,
		};
	}
	static AlreadyInit(): Error {
		return {
			alreadyInit: null,
		};
	}
	static NotOwner(): Error {
		return {
			notOwner: null,
		};
	}
	static BetNotFinalized(): Error {
		return {
			betNotFinalized: null,
		};
	}
	static CallerIsNotAdmin(): Error {
		return {
			callerIsNotAdmin: null,
		};
	}
	static InvalidInput(): Error {
		return {
			invalidInput: null,
		};
	}
	static BetNotExist(): Error {
		return {
			betNotExist: null,
		};
	}
	static HoldAmountPlayerNotExist(): Error {
		return {
			holdAmountPlayerNotExist: null,
		};
	}
	static NoAmount(): Error {
		return {
			noAmount: null,
		};
	}
	static InvalidBalanceAndAllowance(): Error {
		return {
			invalidBalanceAndAllowance: null,
		};
	}
	static InvalidUnstakedAmount(): Error {
		return {
			invalidUnstakedAmount: null,
		};
	}
	static NotTimeToUnstaked(): Error {
		return {
			notTimeToUnstaked: null,
		};
	}
	static NoStakerFound(): Error {
		return {
			noStakerFound: null,
		};
	}
	static NotStaked(): Error {
		return {
			notStaked: null,
		};
	}
	static InvalidTotalStake(): Error {
		return {
			invalidTotalStake: null,
		};
	}
	static CallerNotRequestUnstake(): Error {
		return {
			callerNotRequestUnstake: null,
		};
	}
	static ClaimMustBeFalse(): Error {
		return {
			claimMustBeFalse: null,
		};
	}
	static RewardStarted(): Error {
		return {
			rewardStarted: null,
		};
	}
	static RewardNotStarted(): Error {
		return {
			rewardNotStarted: null,
		};
	}
	static InvalidInputRatio(): Error {
		return {
			invalidInputRatio: null,
		};
	}
	static NotTimeBuyToken(): Error {
		return {
			notTimeBuyToken: null,
		};
	}
	static CannotBuyAtThisTime(): Error {
		return {
			cannotBuyAtThisTime: null,
		};
	}
	static NotTimeToFinalize(): Error {
		return {
			notTimeToFinalize: null,
		};
	}
	static WhitelistNotExists(): Error {
		return {
			whitelistNotExists: null,
		};
	}
	static PoolNotExists(): Error {
		return {
			poolNotExists: null,
		};
	}
	static InvalidWhitelistData(): Error {
		return {
			invalidWhitelistData: null,
		};
	}
	static WhitelistInfoExist(): Error {
		return {
			whitelistInfoExist: null,
		};
	}
	static WhitelistBuyerPurchased(): Error {
		return {
			whitelistBuyerPurchased: null,
		};
	}
	static SalePoolPrurchased(): Error {
		return {
			salePoolPrurchased: null,
		};
	}
	static PoolPrurchased(): Error {
		return {
			poolPrurchased: null,
		};
	}
	static InvalidEndTime(): Error {
		return {
			invalidEndTime: null,
		};
	}
	static NotTokenOwner(): Error {
		return {
			notTokenOwner: null,
		};
	}
	static CannotIncreaseLastTokenId(): Error {
		return {
			cannotIncreaseLastTokenId: null,
		};
	}
	static CannotSetAttributes(): Error {
		return {
			cannotSetAttributes: null,
		};
	}
	static SessionNotExists(): Error {
		return {
			sessionNotExists: null,
		};
	}
	static SessionIsExists(): Error {
		return {
			sessionIsExists: null,
		};
	}
	static BetIsExists(): Error {
		return {
			betIsExists: null,
		};
	}
	static SessionNotCompleted(): Error {
		return {
			sessionNotCompleted: null,
		};
	}
	static SessionNotFinished(): Error {
		return {
			sessionNotFinished: null,
		};
	}
	static SessionNotProcessed(): Error {
		return {
			sessionNotProcessed: null,
		};
	}
	static YouAreNotWinner(): Error {
		return {
			youAreNotWinner: null,
		};
	}
	static InvalidState(): Error {
		return {
			invalidState: null,
		};
	}
	static SessionNotTicketWin(): Error {
		return {
			sessionNotTicketWin: null,
		};
	}
	static NftIsUsed(): Error {
		return {
			nftIsUsed: null,
		};
	}
	static NftIsNotUsed(): Error {
		return {
			nftIsNotUsed: null,
		};
	}
	static CannotBurn(): Error {
		return {
			cannotBurn: null,
		};
	}
	static NextSessionsNotExists(): Error {
		return {
			nextSessionsNotExists: null,
		};
	}
	static AddSessionFailed(): Error {
		return {
			addSessionFailed: null,
		};
	}
	static InvalidFee(): Error {
		return {
			invalidFee: null,
		};
	}
	static PoolIsExists(): Error {
		return {
			poolIsExists: null,
		};
	}
	static InvalidTotalPurchasedAmount(): Error {
		return {
			invalidTotalPurchasedAmount: null,
		};
	}
	static TicketAmountLimitReached(): Error {
		return {
			ticketAmountLimitReached: null,
		};
	}
	static NotTimeToFinalized(): Error {
		return {
			notTimeToFinalized: null,
		};
	}
	static CallerDoNotHaveVoting(): Error {
		return {
			callerDoNotHaveVoting: null,
		};
	}
	static SetPoolRationFailed(): Error {
		return {
			setPoolRationFailed: null,
		};
	}
	static FailToDecreaseClaimableReward(): Error {
		return {
			failToDecreaseClaimableReward: null,
		};
	}
	static RewardNotAdded(): Error {
		return {
			rewardNotAdded: null,
		};
	}
	static ChainlinkRequestIdIsExists(): Error {
		return {
			chainlinkRequestIdIsExists: null,
		};
	}
	static OwnableError(value: OwnableError): Error {
		return {
			ownableError: value,
		};
	}
	static AccessControlError(value: AccessControlError): Error {
		return {
			accessControlError: value,
		};
	}
	static PSP22Error(value: PSP22Error): Error {
		return {
			psp22Error: value,
		};
	}
	static PSP34Error(value: PSP34Error): Error {
		return {
			psp34Error: value,
		};
	}
	static PausableError(value: PausableError): Error {
		return {
			pausableError: value,
		};
	}
	static CheckedOperations(): Error {
		return {
			checkedOperations: null,
		};
	}
}

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsNotSet = 'NewOwnerIsNotSet'
}

export enum AccessControlError {
	invalidCaller = 'InvalidCaller',
	missingRole = 'MissingRole',
	roleRedundant = 'RoleRedundant'
}

export interface PSP22Error {
	custom ? : string,
	insufficientBalance ? : null,
	insufficientAllowance ? : null,
	recipientIsNotSet ? : null,
	senderIsNotSet ? : null,
	safeTransferCheckFailed ? : string,
	permitInvalidSignature ? : null,
	permitExpired ? : null,
	noncesError ? : NoncesError
}

export class PSP22ErrorBuilder {
	static Custom(value: string): PSP22Error {
		return {
			custom: value,
		};
	}
	static InsufficientBalance(): PSP22Error {
		return {
			insufficientBalance: null,
		};
	}
	static InsufficientAllowance(): PSP22Error {
		return {
			insufficientAllowance: null,
		};
	}
	static RecipientIsNotSet(): PSP22Error {
		return {
			recipientIsNotSet: null,
		};
	}
	static SenderIsNotSet(): PSP22Error {
		return {
			senderIsNotSet: null,
		};
	}
	static SafeTransferCheckFailed(value: string): PSP22Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
	static PermitInvalidSignature(): PSP22Error {
		return {
			permitInvalidSignature: null,
		};
	}
	static PermitExpired(): PSP22Error {
		return {
			permitExpired: null,
		};
	}
	static NoncesError(value: NoncesError): PSP22Error {
		return {
			noncesError: value,
		};
	}
}

export interface NoncesError {
	invalidAccountNonce ? : AccountId,
	nonceOverflow ? : null
}

export class NoncesErrorBuilder {
	static InvalidAccountNonce(value: AccountId): NoncesError {
		return {
			invalidAccountNonce: value,
		};
	}
	static NonceOverflow(): NoncesError {
		return {
			nonceOverflow: null,
		};
	}
}

export interface PSP34Error {
	custom ? : string,
	selfApprove ? : null,
	notApproved ? : null,
	tokenExists ? : null,
	tokenNotExists ? : null,
	safeTransferCheckFailed ? : string
}

export class PSP34ErrorBuilder {
	static Custom(value: string): PSP34Error {
		return {
			custom: value,
		};
	}
	static SelfApprove(): PSP34Error {
		return {
			selfApprove: null,
		};
	}
	static NotApproved(): PSP34Error {
		return {
			notApproved: null,
		};
	}
	static TokenExists(): PSP34Error {
		return {
			tokenExists: null,
		};
	}
	static TokenNotExists(): PSP34Error {
		return {
			tokenNotExists: null,
		};
	}
	static SafeTransferCheckFailed(value: string): PSP34Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

export enum PausableError {
	paused = 'Paused',
	notPaused = 'NotPaused'
}

export enum PoolType {
	sale = 'Sale',
	privateInvestment = 'PrivateInvestment',
	airdropAndMarketing = 'AirdropAndMarketing',
	team = 'Team',
	development = 'Development'
}

export type WhitelistInfo = {
	amount: ReturnNumber,
	price: ReturnNumber,
	purchasedAmount: ReturnNumber
}

export type PoolSaleInfo = {
	buyStatus: boolean,
	endTimeBuy: number,
	totalAmount: ReturnNumber,
	totalPurchasedAmount: ReturnNumber,
	price: ReturnNumber
}

export type Hash = string | number[]

export interface UpgradeableError {
	custom ? : string,
	setCodeHashFailed ? : null,
	ownableError ? : OwnableError,
	accessControlError ? : AccessControlError
}

export class UpgradeableErrorBuilder {
	static Custom(value: string): UpgradeableError {
		return {
			custom: value,
		};
	}
	static SetCodeHashFailed(): UpgradeableError {
		return {
			setCodeHashFailed: null,
		};
	}
	static OwnableError(value: OwnableError): UpgradeableError {
		return {
			ownableError: value,
		};
	}
	static AccessControlError(value: AccessControlError): UpgradeableError {
		return {
			accessControlError: value,
		};
	}
}

