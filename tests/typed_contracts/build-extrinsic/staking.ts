/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/staking';
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
	 * @param { (number | string | BN) } limitUnstakeTime,
	*/
	"initialize" (
		adminAddress: ArgumentTypes.AccountId,
		betazTokenAddress: ArgumentTypes.AccountId,
		limitUnstakeTime: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [adminAddress, betazTokenAddress, limitUnstakeTime], __options);
	}

	/**
	 * stake
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"stake" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stake", [amount], __options);
	}

	/**
	 * requestUnstake
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"requestUnstake" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "requestUnstake", [amount], __options);
	}

	/**
	 * cancelRequestUnstake
	 *
	 * @param { (string | number | BN) } index,
	*/
	"cancelRequestUnstake" (
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "cancelRequestUnstake", [index], __options);
	}

	/**
	 * unstake
	 *
	 * @param { (string | number | BN) } index,
	*/
	"unstake" (
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "unstake", [index], __options);
	}

	/**
	 * claimReward
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"claimReward" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "claimReward", [account], __options);
	}

	/**
	 * addReward
	 *
	 * @param { (string | number | BN) } reward,
	*/
	"addReward" (
		reward: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "addReward", [reward], __options);
	}

	/**
	 * setLimitUnstakeTime
	 *
	 * @param { (number | string | BN) } limitUnstakeTime,
	*/
	"setLimitUnstakeTime" (
		limitUnstakeTime: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::setLimitUnstakeTime", [limitUnstakeTime], __options);
	}

	/**
	 * getRewardStarted
	 *
	*/
	"getRewardStarted" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getRewardStarted", [], __options);
	}

	/**
	 * getIsLocked
	 *
	*/
	"getIsLocked" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getIsLocked", [], __options);
	}

	/**
	 * isClaimed
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"isClaimed" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::isClaimed", [account], __options);
	}

	/**
	 * getRequestUnstakeAccountsIndexByAccount
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"getRequestUnstakeAccountsIndexByAccount" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getRequestUnstakeAccountsIndexByAccount", [account], __options);
	}

	/**
	 * getRequestUnstakeTime
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (string | number | BN) } index,
	*/
	"getRequestUnstakeTime" (
		account: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getRequestUnstakeTime", [account, index], __options);
	}

	/**
	 * getPendingUnstakingIndex
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (string | number | BN) } amount,
	 * @param { (number | string | BN) } time,
	*/
	"getPendingUnstakingIndex" (
		account: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		time: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getPendingUnstakingIndex", [account, amount, time], __options);
	}

	/**
	 * getStakedAccountsByIndex
	 *
	 * @param { (number | string | BN) } index,
	*/
	"getStakedAccountsByIndex" (
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getStakedAccountsByIndex", [index], __options);
	}

	/**
	 * getRequestUnstakeAccountsByIndex
	 *
	 * @param { (number | string | BN) } index,
	*/
	"getRequestUnstakeAccountsByIndex" (
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getRequestUnstakeAccountsByIndex", [index], __options);
	}

	/**
	 * getRewardPool
	 *
	*/
	"getRewardPool" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getRewardPool", [], __options);
	}

	/**
	 * getRequestUnstakeAccountsLastIndex
	 *
	*/
	"getRequestUnstakeAccountsLastIndex" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getRequestUnstakeAccountsLastIndex", [], __options);
	}

	/**
	 * updateStatusRewardDistribution
	 *
	 * @param { boolean } start,
	*/
	"updateStatusRewardDistribution" (
		start: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::updateStatusRewardDistribution", [start], __options);
	}

	/**
	 * getStakeAmountByAccount
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"getStakeAmountByAccount" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getStakeAmountByAccount", [account], __options);
	}

	/**
	 * getClaimableReward
	 *
	*/
	"getClaimableReward" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getClaimableReward", [], __options);
	}

	/**
	 * updateIsLocked
	 *
	 * @param { boolean } isLocked,
	*/
	"updateIsLocked" (
		isLocked: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::updateIsLocked", [isLocked], __options);
	}

	/**
	 * setClaimedStatus
	 *
	 * @param { ArgumentTypes.AccountId } staker,
	 * @param { boolean } status,
	*/
	"setClaimedStatus" (
		staker: ArgumentTypes.AccountId,
		status: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::setClaimedStatus", [staker, status], __options);
	}

	/**
	 * getTotalStaked
	 *
	*/
	"getTotalStaked" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getTotalStaked", [], __options);
	}

	/**
	 * getStakedAccountsLastIndex
	 *
	*/
	"getStakedAccountsLastIndex" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getStakedAccountsLastIndex", [], __options);
	}

	/**
	 * withdrawFee
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (string | number | BN) } value,
	*/
	"withdrawFee" (
		account: ArgumentTypes.AccountId,
		value: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::withdrawFee", [account, value], __options);
	}

	/**
	 * getTotalPendingUnstakedByAccount
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"getTotalPendingUnstakedByAccount" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getTotalPendingUnstakedByAccount", [account], __options);
	}

	/**
	 * changeState
	 *
	*/
	"changeState" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::changeState", [], __options);
	}

	/**
	 * getBetazTokenAddress
	 *
	*/
	"getBetazTokenAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getBetazTokenAddress", [], __options);
	}

	/**
	 * getLimitUnstakeTime
	 *
	*/
	"getLimitUnstakeTime" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getLimitUnstakeTime", [], __options);
	}

	/**
	 * getPendingUnstakingAmount
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (string | number | BN) } index,
	*/
	"getPendingUnstakingAmount" (
		account: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getPendingUnstakingAmount", [account, index], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::setBetazTokenAddress", [betazTokenAddress], __options);
	}

	/**
	 * getStakedAccountsIndexByAccount
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"getStakedAccountsIndexByAccount" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stakingPoolTrait::getStakedAccountsIndexByAccount", [account], __options);
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
	 * renounceOwnership
	 *
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::renounceOwnership", [], __options);
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

}