/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/sale';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * initialize
	 *
	 * @param { ArgumentTypes.AccountId } adminAddress,
	 * @param { ArgumentTypes.AccountId } betazTokenAddress,
	*/
	"initialize" (
		adminAddress: ArgumentTypes.AccountId,
		betazTokenAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [adminAddress, betazTokenAddress], __options);
	}

	/**
	 * changeState
	 *
	*/
	"changeState" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::changeState", [], __options);
	}

	/**
	 * getWhitelistInfo
	 *
	 * @param { ArgumentTypes.PoolType } poolType,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"getWhitelistInfo" (
		poolType: ArgumentTypes.PoolType,
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::getWhitelistInfo", [poolType, account], __options);
	}

	/**
	 * addWhitelist
	 *
	 * @param { ArgumentTypes.PoolType } poolType,
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (string | number | BN) } amount,
	 * @param { (string | number | BN) } price,
	*/
	"addWhitelist" (
		poolType: ArgumentTypes.PoolType,
		account: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		price: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::addWhitelist", [poolType, account, amount, price], __options);
	}

	/**
	 * setBetazTokenAddress
	 *
	 * @param { ArgumentTypes.AccountId } betazTokenAddress,
	*/
	"setBetazTokenAddress" (
		betazTokenAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::setBetazTokenAddress", [betazTokenAddress], __options);
	}

	/**
	 * getPoolSaleTotalRemainingAmount
	 *
	 * @param { ArgumentTypes.PoolType } poolType,
	*/
	"getPoolSaleTotalRemainingAmount" (
		poolType: ArgumentTypes.PoolType,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::getPoolSaleTotalRemainingAmount", [poolType], __options);
	}

	/**
	 * getAccountByPoolType
	 *
	 * @param { ArgumentTypes.PoolType } poolType,
	 * @param { (string | number | BN) } index,
	*/
	"getAccountByPoolType" (
		poolType: ArgumentTypes.PoolType,
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::getAccountByPoolType", [poolType, index], __options);
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
	*/
	"updateSalePoolInfoPoolType" (
		poolType: ArgumentTypes.PoolType,
		buyStatus: boolean,
		endTimeBuy: (number | string | BN),
		totalAmount: (string | number | BN),
		totalPurchasedAmount: (string | number | BN),
		price: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::updateSalePoolInfoPoolType", [poolType, buyStatus, endTimeBuy, totalAmount, totalPurchasedAmount, price], __options);
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
	*/
	"addPoolByPoolType" (
		poolType: ArgumentTypes.PoolType,
		buyStatus: boolean,
		endTimeBuy: (number | string | BN),
		totalAmount: (string | number | BN),
		totalPurchasedAmount: (string | number | BN),
		price: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::addPoolByPoolType", [poolType, buyStatus, endTimeBuy, totalAmount, totalPurchasedAmount, price], __options);
	}

	/**
	 * addMultiWhitelists
	 *
	 * @param { ArgumentTypes.PoolType } poolType,
	 * @param { Array<ArgumentTypes.AccountId> } accounts,
	 * @param { Array<(string | number | BN)> } amounts,
	 * @param { Array<(string | number | BN)> } prices,
	*/
	"addMultiWhitelists" (
		poolType: ArgumentTypes.PoolType,
		accounts: Array<ArgumentTypes.AccountId>,
		amounts: Array<(string | number | BN)>,
		prices: Array<(string | number | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::addMultiWhitelists", [poolType, accounts, amounts, prices], __options);
	}

	/**
	 * getBetazTokenAddress
	 *
	*/
	"getBetazTokenAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::getBetazTokenAddress", [], __options);
	}

	/**
	 * updateMultiWhitelists
	 *
	 * @param { ArgumentTypes.PoolType } poolType,
	 * @param { Array<ArgumentTypes.AccountId> } accounts,
	 * @param { Array<(string | number | BN)> } amounts,
	 * @param { Array<(string | number | BN)> } prices,
	*/
	"updateMultiWhitelists" (
		poolType: ArgumentTypes.PoolType,
		accounts: Array<ArgumentTypes.AccountId>,
		amounts: Array<(string | number | BN)>,
		prices: Array<(string | number | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::updateMultiWhitelists", [poolType, accounts, amounts, prices], __options);
	}

	/**
	 * buyWithSalePool
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"buyWithSalePool" (
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::buyWithSalePool", [amount], __options);
	}

	/**
	 * getTotalAccountByPoolType
	 *
	 * @param { ArgumentTypes.PoolType } poolType,
	*/
	"getTotalAccountByPoolType" (
		poolType: ArgumentTypes.PoolType,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::getTotalAccountByPoolType", [poolType], __options);
	}

	/**
	 * whitelistBuy
	 *
	 * @param { ArgumentTypes.PoolType } poolType,
	 * @param { (string | number | BN) } amount,
	*/
	"whitelistBuy" (
		poolType: ArgumentTypes.PoolType,
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::whitelistBuy", [poolType, amount], __options);
	}

	/**
	 * getPoolSaleInfo
	 *
	 * @param { ArgumentTypes.PoolType } poolType,
	*/
	"getPoolSaleInfo" (
		poolType: ArgumentTypes.PoolType,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "salePoolTrait::getPoolSaleInfo", [poolType], __options);
	}

	/**
	 * renounceOwnership
	 *
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::renounceOwnership", [], __options);
	}

	/**
	 * transferOwnership
	 *
	 * @param { ArgumentTypes.AccountId | null } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::transferOwnership", [newOwner], __options);
	}

	/**
	 * owner
	 *
	*/
	"owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::owner", [], __options);
	}

	/**
	 * paused
	 *
	*/
	"paused" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pausable::paused", [], __options);
	}

	/**
	 * setCodeHash
	 *
	 * @param { ArgumentTypes.Hash } newCodeHash,
	*/
	"setCodeHash" (
		newCodeHash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "upgradeable::setCodeHash", [newCodeHash], __options);
	}

	/**
	 * grantRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::grantRole", [role, account], __options);
	}

	/**
	 * revokeRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::revokeRole", [role, account], __options);
	}

	/**
	 * renounceRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::renounceRole", [role, account], __options);
	}

	/**
	 * getRoleAdmin
	 *
	 * @param { (number | string | BN) } role,
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::getRoleAdmin", [role], __options);
	}

	/**
	 * hasRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } address,
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::hasRole", [role, address], __options);
	}

	/**
	 * getRoleMember
	 *
	 * @param { (number | string | BN) } role,
	 * @param { (number | string | BN) } index,
	*/
	"getRoleMember" (
		role: (number | string | BN),
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControlEnumerable::getRoleMember", [role, index], __options);
	}

	/**
	 * getRoleMemberCount
	 *
	 * @param { (number | string | BN) } role,
	*/
	"getRoleMemberCount" (
		role: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControlEnumerable::getRoleMemberCount", [role], __options);
	}

}