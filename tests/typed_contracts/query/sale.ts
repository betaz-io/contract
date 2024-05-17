/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/sale';
import type * as ReturnTypes from '../types-returns/sale';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/sale.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;
	readonly __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* initialize
	*
	* @param { ArgumentTypes.AccountId } adminAddress,
	* @param { ArgumentTypes.AccountId } betazTokenAddress,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"initialize" (
		adminAddress: ArgumentTypes.AccountId,
		betazTokenAddress: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "initialize", [adminAddress, betazTokenAddress], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* changeState
	*
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"changeState" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::changeState", [], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWhitelistInfo
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<ReturnTypes.WhitelistInfo | null, ReturnTypes.LangError> }
	*/
	"getWhitelistInfo" (
		poolType: ArgumentTypes.PoolType,
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WhitelistInfo | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::getWhitelistInfo", [poolType, account], __options , (result) => { return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addWhitelist
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @param { ArgumentTypes.AccountId } account,
	* @param { (string | number | BN) } amount,
	* @param { (string | number | BN) } price,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"addWhitelist" (
		poolType: ArgumentTypes.PoolType,
		account: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		price: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::addWhitelist", [poolType, account, amount, price], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBetazTokenAddress
	*
	* @param { ArgumentTypes.AccountId } betazTokenAddress,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setBetazTokenAddress" (
		betazTokenAddress: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::setBetazTokenAddress", [betazTokenAddress], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPoolSaleTotalRemainingAmount
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getPoolSaleTotalRemainingAmount" (
		poolType: ArgumentTypes.PoolType,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::getPoolSaleTotalRemainingAmount", [poolType], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAccountByPoolType
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @param { (string | number | BN) } index,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getAccountByPoolType" (
		poolType: ArgumentTypes.PoolType,
		index: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::getAccountByPoolType", [poolType, index], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateSalePoolInfoPoolType
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @param { boolean } buyStatus,
	* @param { (number | string | BN) } endTimeBuy,
	* @param { (string | number | BN) } totalAmount,
	* @param { (string | number | BN) } totalPurchasedAmount,
	* @param { (string | number | BN) } price,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"updateSalePoolInfoPoolType" (
		poolType: ArgumentTypes.PoolType,
		buyStatus: boolean,
		endTimeBuy: (number | string | BN),
		totalAmount: (string | number | BN),
		totalPurchasedAmount: (string | number | BN),
		price: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::updateSalePoolInfoPoolType", [poolType, buyStatus, endTimeBuy, totalAmount, totalPurchasedAmount, price], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addPoolByPoolType
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @param { boolean } buyStatus,
	* @param { (number | string | BN) } endTimeBuy,
	* @param { (string | number | BN) } totalAmount,
	* @param { (string | number | BN) } totalPurchasedAmount,
	* @param { (string | number | BN) } price,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"addPoolByPoolType" (
		poolType: ArgumentTypes.PoolType,
		buyStatus: boolean,
		endTimeBuy: (number | string | BN),
		totalAmount: (string | number | BN),
		totalPurchasedAmount: (string | number | BN),
		price: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::addPoolByPoolType", [poolType, buyStatus, endTimeBuy, totalAmount, totalPurchasedAmount, price], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addMultiWhitelists
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @param { Array<ArgumentTypes.AccountId> } accounts,
	* @param { Array<(string | number | BN)> } amounts,
	* @param { Array<(string | number | BN)> } prices,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"addMultiWhitelists" (
		poolType: ArgumentTypes.PoolType,
		accounts: Array<ArgumentTypes.AccountId>,
		amounts: Array<(string | number | BN)>,
		prices: Array<(string | number | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::addMultiWhitelists", [poolType, accounts, amounts, prices], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getBetazTokenAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getBetazTokenAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::getBetazTokenAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateMultiWhitelists
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @param { Array<ArgumentTypes.AccountId> } accounts,
	* @param { Array<(string | number | BN)> } amounts,
	* @param { Array<(string | number | BN)> } prices,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"updateMultiWhitelists" (
		poolType: ArgumentTypes.PoolType,
		accounts: Array<ArgumentTypes.AccountId>,
		amounts: Array<(string | number | BN)>,
		prices: Array<(string | number | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::updateMultiWhitelists", [poolType, accounts, amounts, prices], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* buyWithSalePool
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"buyWithSalePool" (
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::buyWithSalePool", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalAccountByPoolType
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAccountByPoolType" (
		poolType: ArgumentTypes.PoolType,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::getTotalAccountByPoolType", [poolType], __options , (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* whitelistBuy
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"whitelistBuy" (
		poolType: ArgumentTypes.PoolType,
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::whitelistBuy", [poolType, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPoolSaleInfo
	*
	* @param { ArgumentTypes.PoolType } poolType,
	* @returns { Result<ReturnTypes.PoolSaleInfo | null, ReturnTypes.LangError> }
	*/
	"getPoolSaleInfo" (
		poolType: ArgumentTypes.PoolType,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.PoolSaleInfo | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "salePoolTrait::getPoolSaleInfo", [poolType], __options , (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(35, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId | null } newOwner,
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(35, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* paused
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"paused" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pausable::paused", [], __options , (result) => { return handleReturnType(result, getTypeDescription(37, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setCodeHash
	*
	* @param { ArgumentTypes.Hash } newCodeHash,
	* @returns { Result<Result<null, ReturnTypes.UpgradeableError>, ReturnTypes.LangError> }
	*/
	"setCodeHash" (
		newCodeHash: ArgumentTypes.Hash,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.UpgradeableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "upgradeable::setCodeHash", [newCodeHash], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* grantRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> }
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::grantRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> }
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::revokeRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> }
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::renounceRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options , (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* hasRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } address,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options , (result) => { return handleReturnType(result, getTypeDescription(37, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleMember
	*
	* @param { (number | string | BN) } role,
	* @param { (number | string | BN) } index,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getRoleMember" (
		role: (number | string | BN),
		index: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMember", [role, index], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleMemberCount
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleMemberCount" (
		role: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMemberCount", [role], __options , (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

}