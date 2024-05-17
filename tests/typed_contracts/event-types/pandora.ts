import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/pandora';

export interface PlayEvent {
	sessionId: number;
	player: ReturnTypes.AccountId | null;
	tokenId: ReturnTypes.Id;
	betNumber: number;
}

export interface WithdrawWinAmountEvent {
	sessionId: number;
	player: ReturnTypes.AccountId | null;
	winAmount: ReturnNumber;
}

