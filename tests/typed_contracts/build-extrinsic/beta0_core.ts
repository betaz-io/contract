/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/beta0_core';
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
	 * @param { ArgumentTypes.AccountId } betazAddress,
	 * @param { (number | string | BN) } maxBetRatio,
	 * @param { ArgumentTypes.AccountId } betTokenAddress,
	 * @param { (number | string | BN) } tokenRatio,
	 * @param { (number | string | BN) } minOverNumber,
	 * @param { (number | string | BN) } maxOverNumber,
	 * @param { (number | string | BN) } minUnderNumber,
	 * @param { (number | string | BN) } maxUnderNumber,
	 * @param { ArgumentTypes.AccountId } adminAddress,
	 * @param { (number | string | BN) } corePoolRatio,
	 * @param { (number | string | BN) } stakingPoolRatio,
	 * @param { (number | string | BN) } treasuryPoolRatio,
	 * @param { (number | string | BN) } pandoraPoolRatio,
	 * @param { ArgumentTypes.AccountId } stakingAddress,
	 * @param { ArgumentTypes.AccountId } treasuryAddress,
	 * @param { ArgumentTypes.AccountId } pandoraAddress,
	 * @param { ArgumentTypes.AccountId } oracleRandomnessAddress,
	 * @param { ArgumentTypes.AccountId } daoAddress,
	*/
	"initialize" (
		betazAddress: ArgumentTypes.AccountId,
		maxBetRatio: (number | string | BN),
		betTokenAddress: ArgumentTypes.AccountId,
		tokenRatio: (number | string | BN),
		minOverNumber: (number | string | BN),
		maxOverNumber: (number | string | BN),
		minUnderNumber: (number | string | BN),
		maxUnderNumber: (number | string | BN),
		adminAddress: ArgumentTypes.AccountId,
		corePoolRatio: (number | string | BN),
		stakingPoolRatio: (number | string | BN),
		treasuryPoolRatio: (number | string | BN),
		pandoraPoolRatio: (number | string | BN),
		stakingAddress: ArgumentTypes.AccountId,
		treasuryAddress: ArgumentTypes.AccountId,
		pandoraAddress: ArgumentTypes.AccountId,
		oracleRandomnessAddress: ArgumentTypes.AccountId,
		daoAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [betazAddress, maxBetRatio, betTokenAddress, tokenRatio, minOverNumber, maxOverNumber, minUnderNumber, maxUnderNumber, adminAddress, corePoolRatio, stakingPoolRatio, treasuryPoolRatio, pandoraPoolRatio, stakingAddress, treasuryAddress, pandoraAddress, oracleRandomnessAddress, daoAddress], __options);
	}

	/**
	 * play
	 *
	 * @param { (number | string | BN) } betNumber,
	 * @param { (number | string | BN) } isOver,
	*/
	"play" (
		betNumber: (number | string | BN),
		isOver: (number | string | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "play", [betNumber, isOver], __options);
	}

	/**
	 * finalize
	 *
	*/
	"finalize" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "finalize", [], __options);
	}

	/**
	 * transferAndUpdateSessionPandoraPool
	 *
	 * @param { (number | string | BN) } sessionId,
	*/
	"transferAndUpdateSessionPandoraPool" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "transferAndUpdateSessionPandoraPool", [sessionId], __options);
	}

	/**
	 * transferAndUpdateStakingPool
	 *
	*/
	"transferAndUpdateStakingPool" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "transferAndUpdateStakingPool", [], __options);
	}

	/**
	 * setPoolRatio
	 *
	 * @param { (number | string | BN) } corePoolRatio,
	 * @param { (number | string | BN) } stakingPoolRatio,
	 * @param { (number | string | BN) } pandoraPoolRatio,
	 * @param { (number | string | BN) } treasuryPoolRatio,
	*/
	"setPoolRatio" (
		corePoolRatio: (number | string | BN),
		stakingPoolRatio: (number | string | BN),
		pandoraPoolRatio: (number | string | BN),
		treasuryPoolRatio: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "setPoolRatio", [corePoolRatio, stakingPoolRatio, pandoraPoolRatio, treasuryPoolRatio], __options);
	}

	/**
	 * setTokenRatio
	 *
	 * @param { (number | string | BN) } tokenRatio,
	*/
	"setTokenRatio" (
		tokenRatio: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setTokenRatio", [tokenRatio], __options);
	}

	/**
	 * setMaxNumberUnderRoll
	 *
	 * @param { (number | string | BN) } maxUnderNumber,
	*/
	"setMaxNumberUnderRoll" (
		maxUnderNumber: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setMaxNumberUnderRoll", [maxUnderNumber], __options);
	}

	/**
	 * setPandoraAddress
	 *
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"setPandoraAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setPandoraAddress", [address], __options);
	}

	/**
	 * getPercentageRates
	 *
	*/
	"getPercentageRates" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getPercentageRates", [], __options);
	}

	/**
	 * getPandoraAddress
	 *
	*/
	"getPandoraAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getPandoraAddress", [], __options);
	}

	/**
	 * updateCorePool
	 *
	*/
	"updateCorePool" (
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::updateCorePool", [], __options);
	}

	/**
	 * getMinNumberUnderRoll
	 *
	*/
	"getMinNumberUnderRoll" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getMinNumberUnderRoll", [], __options);
	}

	/**
	 * withdrawHoldAmount
	 *
	 * @param { ArgumentTypes.AccountId } receiver,
	 * @param { (string | number | BN) } amount,
	*/
	"withdrawHoldAmount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::withdrawHoldAmount", [receiver, amount], __options);
	}

	/**
	 * transferStakingPool
	 *
	*/
	"transferStakingPool" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::transferStakingPool", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::withdrawFee", [account, value], __options);
	}

	/**
	 * setMaxNumberOverRoll
	 *
	 * @param { (number | string | BN) } maxOverNumber,
	*/
	"setMaxNumberOverRoll" (
		maxOverNumber: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setMaxNumberOverRoll", [maxOverNumber], __options);
	}

	/**
	 * setMinNumberOverRoll
	 *
	 * @param { (number | string | BN) } minOverNumber,
	*/
	"setMinNumberOverRoll" (
		minOverNumber: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setMinNumberOverRoll", [minOverNumber], __options);
	}

	/**
	 * getCorePoolAmout
	 *
	*/
	"getCorePoolAmout" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getCorePoolAmout", [], __options);
	}

	/**
	 * setBetTokenAddress
	 *
	 * @param { ArgumentTypes.AccountId } betTokenAddress,
	*/
	"setBetTokenAddress" (
		betTokenAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setBetTokenAddress", [betTokenAddress], __options);
	}

	/**
	 * getHoldBidderCount
	 *
	*/
	"getHoldBidderCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getHoldBidderCount", [], __options);
	}

	/**
	 * getPlatformFeeAmount
	 *
	*/
	"getPlatformFeeAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getPlatformFeeAmount", [], __options);
	}

	/**
	 * getDaoAddress
	 *
	*/
	"getDaoAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getDaoAddress", [], __options);
	}

	/**
	 * setDaoAddress
	 *
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"setDaoAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setDaoAddress", [address], __options);
	}

	/**
	 * getStakingPoolAmount
	 *
	*/
	"getStakingPoolAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getStakingPoolAmount", [], __options);
	}

	/**
	 * getTreasuryPoolAmount
	 *
	*/
	"getTreasuryPoolAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getTreasuryPoolAmount", [], __options);
	}

	/**
	 * getMaxBet
	 *
	*/
	"getMaxBet" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getMaxBet", [], __options);
	}

	/**
	 * setRoundDistance
	 *
	 * @param { (number | string | BN) } roundDistance,
	*/
	"setRoundDistance" (
		roundDistance: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setRoundDistance", [roundDistance], __options);
	}

	/**
	 * updateRewardPool
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"updateRewardPool" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::updateRewardPool", [amount], __options);
	}

	/**
	 * setRates
	 *
	 * @param { Array<(number | string | BN)> } overRates,
	 * @param { Array<(number | string | BN)> } underRates,
	*/
	"setRates" (
		overRates: Array<(number | string | BN)>,
		underRates: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setRates", [overRates, underRates], __options);
	}

	/**
	 * getMaxNumberOverRoll
	 *
	*/
	"getMaxNumberOverRoll" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getMaxNumberOverRoll", [], __options);
	}

	/**
	 * setTreasuryAddress
	 *
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"setTreasuryAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setTreasuryAddress", [address], __options);
	}

	/**
	 * betTokenAddress
	 *
	*/
	"betTokenAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::betTokenAddress", [], __options);
	}

	/**
	 * getTokenBalance
	 *
	*/
	"getTokenBalance" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getTokenBalance", [], __options);
	}

	/**
	 * setPercentageRates
	 *
	 * @param { (number | string | BN) } percentageRates,
	*/
	"setPercentageRates" (
		percentageRates: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setPercentageRates", [percentageRates], __options);
	}

	/**
	 * getTokenRatio
	 *
	*/
	"getTokenRatio" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getTokenRatio", [], __options);
	}

	/**
	 * getHoldAmountPlayers
	 *
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"getHoldAmountPlayers" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getHoldAmountPlayers", [address], __options);
	}

	/**
	 * getMinNumberOverRoll
	 *
	*/
	"getMinNumberOverRoll" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getMinNumberOverRoll", [], __options);
	}

	/**
	 * getStakingPoolRatio
	 *
	*/
	"getStakingPoolRatio" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getStakingPoolRatio", [], __options);
	}

	/**
	 * setStakingAddress
	 *
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"setStakingAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setStakingAddress", [address], __options);
	}

	/**
	 * getOverRates
	 *
	*/
	"getOverRates" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getOverRates", [], __options);
	}

	/**
	 * getMaxBetRatio
	 *
	*/
	"getMaxBetRatio" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getMaxBetRatio", [], __options);
	}

	/**
	 * transferPandoraPool
	 *
	*/
	"transferPandoraPool" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::transferPandoraPool", [], __options);
	}

	/**
	 * setOracleRandomnessAddress
	 *
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"setOracleRandomnessAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setOracleRandomnessAddress", [address], __options);
	}

	/**
	 * isBetAvailable
	 *
	 * @param { ArgumentTypes.AccountId } player,
	*/
	"isBetAvailable" (
		player: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::isBetAvailable", [player], __options);
	}

	/**
	 * getStakingAddress
	 *
	*/
	"getStakingAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getStakingAddress", [], __options);
	}

	/**
	 * getTreasuryAddress
	 *
	*/
	"getTreasuryAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getTreasuryAddress", [], __options);
	}

	/**
	 * getBetazAddress
	 *
	*/
	"getBetazAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getBetazAddress", [], __options);
	}

	/**
	 * setMaxBetRatio
	 *
	 * @param { (number | string | BN) } maxBetRatio,
	*/
	"setMaxBetRatio" (
		maxBetRatio: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setMaxBetRatio", [maxBetRatio], __options);
	}

	/**
	 * getBet
	 *
	 * @param { ArgumentTypes.AccountId } player,
	*/
	"getBet" (
		player: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getBet", [player], __options);
	}

	/**
	 * setBetazAddress
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"setBetazAddress" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setBetazAddress", [account], __options);
	}

	/**
	 * transferTreasuryPool
	 *
	*/
	"transferTreasuryPool" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::transferTreasuryPool", [], __options);
	}

	/**
	 * setMinNumberUnderRoll
	 *
	 * @param { (number | string | BN) } minUnderNumber,
	*/
	"setMinNumberUnderRoll" (
		minUnderNumber: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::setMinNumberUnderRoll", [minUnderNumber], __options);
	}

	/**
	 * changeState
	 *
	*/
	"changeState" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::changeState", [], __options);
	}

	/**
	 * getRewardPoolAmount
	 *
	*/
	"getRewardPoolAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getRewardPoolAmount", [], __options);
	}

	/**
	 * getPandoraPoolAmount
	 *
	*/
	"getPandoraPoolAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getPandoraPoolAmount", [], __options);
	}

	/**
	 * tranferTokenToPool
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { (string | number | BN) } amount,
	*/
	"tranferTokenToPool" (
		pool: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::tranferTokenToPool", [pool, amount], __options);
	}

	/**
	 * getOracleRandomnessAddress
	 *
	*/
	"getOracleRandomnessAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getOracleRandomnessAddress", [], __options);
	}

	/**
	 * getCorePoolRatio
	 *
	*/
	"getCorePoolRatio" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getCorePoolRatio", [], __options);
	}

	/**
	 * getPandoraPoolRatio
	 *
	*/
	"getPandoraPoolRatio" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getPandoraPoolRatio", [], __options);
	}

	/**
	 * getTreasuryPoolRatio
	 *
	*/
	"getTreasuryPoolRatio" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getTreasuryPoolRatio", [], __options);
	}

	/**
	 * getHoldPlayersByIndex
	 *
	 * @param { (number | string | BN) } index,
	*/
	"getHoldPlayersByIndex" (
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getHoldPlayersByIndex", [index], __options);
	}

	/**
	 * getRoundDistance
	 *
	*/
	"getRoundDistance" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getRoundDistance", [], __options);
	}

	/**
	 * getMaxNumberUnderRoll
	 *
	*/
	"getMaxNumberUnderRoll" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getMaxNumberUnderRoll", [], __options);
	}

	/**
	 * getUnderRates
	 *
	*/
	"getUnderRates" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "betA0CoreTrait::getUnderRates", [], __options);
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