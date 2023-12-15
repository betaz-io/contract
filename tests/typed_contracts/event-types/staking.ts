import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/staking';

export interface StakeEvent {
	poolStakingContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface UnstakeEvent {
	poolStakingContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface RequestUnstakeEvent {
	poolStakingContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
	timeRequest: number;
}

export interface CancelRequestUnstakeEvent {
	poolStakingContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface ClaimEvent {
	poolStakingContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	stakedAmount: ReturnNumber;
	rewardAmount: ReturnNumber;
}

