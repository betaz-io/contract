import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/beta0_core';

export interface WinEvent {
	player: ReturnTypes.AccountId | null;
	isOver: number;
	randomNumber: number;
	betNumber: number;
	betAmount: ReturnNumber;
	winAmount: ReturnNumber;
	rewardAmount: ReturnNumber;
	oracleRound: number;
}

export interface LoseEvent {
	player: ReturnTypes.AccountId | null;
	isOver: number;
	randomNumber: number;
	betNumber: number;
	betAmount: ReturnNumber;
	rewardAmount: ReturnNumber;
	oracleRound: number;
}

export interface PlayEvent {
	player: ReturnTypes.AccountId | null;
	isOver: number;
	betNumber: number;
	betAmount: ReturnNumber;
	oracleRound: number;
}

export interface TransferStakingPoolEvent {
	stakingPoolAddress: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface TransferPandoraPoolEvent {
	pandoraPoolAddress: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface TransferTreasuryPoolEvent {
	treasuryPoolAddress: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface MintTokenEvent {
	contractAddress: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

