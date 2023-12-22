import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/sale';

export interface SalePoolBuyEvent {
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
	fee: ReturnNumber;
}

export interface AddWhitelistEvent {
	poolType: ReturnTypes.PoolType;
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
	price: ReturnNumber;
}

export interface UpdateWhitelistEvent {
	poolType: ReturnTypes.PoolType;
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
	price: ReturnNumber;
}

export interface RemoveWhitelistEvent {
	poolType: ReturnTypes.PoolType;
	buyer: ReturnTypes.AccountId;
}

export interface WhitelistBuyEvent {
	poolType: ReturnTypes.PoolType;
	buyer: ReturnTypes.AccountId;
	buyAmount: ReturnNumber;
	purchasedAmount: ReturnNumber;
}

export interface MintTokenEvent {
	contractAddress: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface BurnTokenEvent {
	contractAddress: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

