/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/beta0_core';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/beta0_core.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [betazAddress, maxBetRatio, betTokenAddress, tokenRatio, minOverNumber, maxOverNumber, minUnderNumber, maxUnderNumber, adminAddress, corePoolRatio, stakingPoolRatio, treasuryPoolRatio, pandoraPoolRatio, stakingAddress, treasuryAddress, pandoraAddress, oracleRandomnessAddress, daoAddress], __options);
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
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "play", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [betNumber, isOver], __options);
	}

	/**
	* finalize
	*
	*/
	"finalize" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "finalize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* transferAndUpdateSessionPandoraPool
	*
	* @param { (number | string | BN) } sessionId,
	*/
	"transferAndUpdateSessionPandoraPool" (
		sessionId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "transferAndUpdateSessionPandoraPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId], __options);
	}

	/**
	* transferAndUpdateStakingPool
	*
	*/
	"transferAndUpdateStakingPool" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "transferAndUpdateStakingPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setPoolRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [corePoolRatio, stakingPoolRatio, pandoraPoolRatio, treasuryPoolRatio], __options);
	}

	/**
	* setMinNumberUnderRoll
	*
	* @param { (number | string | BN) } minUnderNumber,
	*/
	"setMinNumberUnderRoll" (
		minUnderNumber: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMinNumberUnderRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [minUnderNumber], __options);
	}

	/**
	* setMinNumberOverRoll
	*
	* @param { (number | string | BN) } minOverNumber,
	*/
	"setMinNumberOverRoll" (
		minOverNumber: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMinNumberOverRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [minOverNumber], __options);
	}

	/**
	* setTreasuryAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	*/
	"setTreasuryAddress" (
		address: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setTreasuryAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* setOracleRandomnessAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	*/
	"setOracleRandomnessAddress" (
		address: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setOracleRandomnessAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* setMaxNumberUnderRoll
	*
	* @param { (number | string | BN) } maxUnderNumber,
	*/
	"setMaxNumberUnderRoll" (
		maxUnderNumber: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMaxNumberUnderRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxUnderNumber], __options);
	}

	/**
	* betTokenAddress
	*
	*/
	"betTokenAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::betTokenAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getOverRates
	*
	*/
	"getOverRates" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getOverRates", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getCorePoolRatio
	*
	*/
	"getCorePoolRatio" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getCorePoolRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setStakingAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	*/
	"setStakingAddress" (
		address: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setStakingAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* getPandoraPoolAmount
	*
	*/
	"getPandoraPoolAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getPandoraPoolAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTreasuryPoolRatio
	*
	*/
	"getTreasuryPoolRatio" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getTreasuryPoolRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* updateRewardPool
	*
	* @param { (string | number | BN) } amount,
	*/
	"updateRewardPool" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::updateRewardPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* setBetTokenAddress
	*
	* @param { ArgumentTypes.AccountId } betTokenAddress,
	*/
	"setBetTokenAddress" (
		betTokenAddress: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setBetTokenAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [betTokenAddress], __options);
	}

	/**
	* setPandoraAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	*/
	"setPandoraAddress" (
		address: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setPandoraAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* getUnderRates
	*
	*/
	"getUnderRates" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getUnderRates", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getBetazAddress
	*
	*/
	"getBetazAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getBetazAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getHoldBidderCount
	*
	*/
	"getHoldBidderCount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getHoldBidderCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getMinNumberOverRoll
	*
	*/
	"getMinNumberOverRoll" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getMinNumberOverRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTreasuryPoolAmount
	*
	*/
	"getTreasuryPoolAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getTreasuryPoolAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* updateCorePool
	*
	*/
	"updateCorePool" (
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::updateCorePool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setDaoAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	*/
	"setDaoAddress" (
		address: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setDaoAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* getDaoAddress
	*
	*/
	"getDaoAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getDaoAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTokenBalance
	*
	*/
	"getTokenBalance" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getTokenBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, value], __options);
	}

	/**
	* getTreasuryAddress
	*
	*/
	"getTreasuryAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getTreasuryAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* withdrawToken
	*
	* @param { (string | number | BN) } value,
	*/
	"withdrawToken" (
		value: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::withdrawToken", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [value], __options);
	}

	/**
	* transferStakingPool
	*
	*/
	"transferStakingPool" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::transferStakingPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getHoldAmountPlayers
	*
	* @param { ArgumentTypes.AccountId } address,
	*/
	"getHoldAmountPlayers" (
		address: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getHoldAmountPlayers", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setRates", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [overRates, underRates], __options);
	}

	/**
	* getStakingPoolRatio
	*
	*/
	"getStakingPoolRatio" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getStakingPoolRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getPandoraAddress
	*
	*/
	"getPandoraAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getPandoraAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTokenRatio
	*
	*/
	"getTokenRatio" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getTokenRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::withdrawHoldAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::tranferTokenToPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, amount], __options);
	}

	/**
	* getTokenBalancePool
	*
	* @param { ArgumentTypes.AccountId } pool,
	*/
	"getTokenBalancePool" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getTokenBalancePool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool], __options);
	}

	/**
	* getPandoraPoolRatio
	*
	*/
	"getPandoraPoolRatio" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getPandoraPoolRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* changeState
	*
	*/
	"changeState" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::changeState", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setRoundDistance
	*
	* @param { (number | string | BN) } roundDistance,
	*/
	"setRoundDistance" (
		roundDistance: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setRoundDistance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [roundDistance], __options);
	}

	/**
	* getMaxNumberOverRoll
	*
	*/
	"getMaxNumberOverRoll" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getMaxNumberOverRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getRewardPoolAmount
	*
	*/
	"getRewardPoolAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getRewardPoolAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getMaxBet
	*
	*/
	"getMaxBet" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getMaxBet", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getMaxNumberUnderRoll
	*
	*/
	"getMaxNumberUnderRoll" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getMaxNumberUnderRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setBetazAddress
	*
	* @param { ArgumentTypes.AccountId } account,
	*/
	"setBetazAddress" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setBetazAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account], __options);
	}

	/**
	* getBet
	*
	* @param { ArgumentTypes.AccountId } player,
	*/
	"getBet" (
		player: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getBet", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [player], __options);
	}

	/**
	* getStakingAddress
	*
	*/
	"getStakingAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getStakingAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getMaxBetRatio
	*
	*/
	"getMaxBetRatio" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getMaxBetRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* transferTreasuryPool
	*
	*/
	"transferTreasuryPool" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::transferTreasuryPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setMaxBetRatio
	*
	* @param { (number | string | BN) } maxBetRatio,
	*/
	"setMaxBetRatio" (
		maxBetRatio: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMaxBetRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxBetRatio], __options);
	}

	/**
	* setPercentageRates
	*
	* @param { (number | string | BN) } percentageRates,
	*/
	"setPercentageRates" (
		percentageRates: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setPercentageRates", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [percentageRates], __options);
	}

	/**
	* getStakingPoolAmount
	*
	*/
	"getStakingPoolAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getStakingPoolAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getMinNumberUnderRoll
	*
	*/
	"getMinNumberUnderRoll" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getMinNumberUnderRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getRoundDistance
	*
	*/
	"getRoundDistance" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getRoundDistance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setMaxNumberOverRoll
	*
	* @param { (number | string | BN) } maxOverNumber,
	*/
	"setMaxNumberOverRoll" (
		maxOverNumber: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMaxNumberOverRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxOverNumber], __options);
	}

	/**
	* transferPandoraPool
	*
	*/
	"transferPandoraPool" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::transferPandoraPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getHoldPlayersByIndex
	*
	* @param { (number | string | BN) } index,
	*/
	"getHoldPlayersByIndex" (
		index: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getHoldPlayersByIndex", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [index], __options);
	}

	/**
	* getPercentageRates
	*
	*/
	"getPercentageRates" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getPercentageRates", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setTokenRatio
	*
	* @param { (number | string | BN) } tokenRatio,
	*/
	"setTokenRatio" (
		tokenRatio: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setTokenRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenRatio], __options);
	}

	/**
	* getOracleRandomnessAddress
	*
	*/
	"getOracleRandomnessAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getOracleRandomnessAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* isBetAvailable
	*
	* @param { ArgumentTypes.AccountId } player,
	*/
	"isBetAvailable" (
		player: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::isBetAvailable", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [player], __options);
	}

	/**
	* getCorePoolAmout
	*
	*/
	"getCorePoolAmout" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::getCorePoolAmout", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* renounceOwnership
	*
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* owner
	*
	*/
	"owner" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::owner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId | null } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newOwner], __options);
	}

	/**
	* paused
	*
	*/
	"paused" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pausable::paused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setCodeHash
	*
	* @param { ArgumentTypes.Hash } newCodeHash,
	*/
	"setCodeHash" (
		newCodeHash: ArgumentTypes.Hash,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "upgradeable::setCodeHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newCodeHash], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::renounceRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::revokeRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::hasRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, address], __options);
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::getRoleAdmin", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::grantRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControlEnumerable::getRoleMember", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, index], __options);
	}

	/**
	* getRoleMemberCount
	*
	* @param { (number | string | BN) } role,
	*/
	"getRoleMemberCount" (
		role: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControlEnumerable::getRoleMemberCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role], __options);
	}

}