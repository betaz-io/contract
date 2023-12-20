/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/beta0_core';
import type * as ReturnTypes from '../types-returns/beta0_core';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/beta0_core.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/beta0_core.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
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
	* @returns { void }
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [betazAddress, maxBetRatio, betTokenAddress, tokenRatio, minOverNumber, maxOverNumber, minUnderNumber, maxUnderNumber, adminAddress, corePoolRatio, stakingPoolRatio, treasuryPoolRatio, pandoraPoolRatio, stakingAddress, treasuryAddress, pandoraAddress, oracleRandomnessAddress, daoAddress], __options);
	}

	/**
	* play
	*
	* @param { (number | string | BN) } betNumber,
	* @param { (number | string | BN) } isOver,
	* @returns { void }
	*/
	"play" (
		betNumber: (number | string | BN),
		isOver: (number | string | BN),
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "play", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [betNumber, isOver], __options);
	}

	/**
	* finalize
	*
	* @returns { void }
	*/
	"finalize" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "finalize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* transferAndUpdateSessionPandoraPool
	*
	* @param { (number | string | BN) } sessionId,
	* @returns { void }
	*/
	"transferAndUpdateSessionPandoraPool" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "transferAndUpdateSessionPandoraPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId], __options);
	}

	/**
	* transferAndUpdateStakingPool
	*
	* @returns { void }
	*/
	"transferAndUpdateStakingPool" (
		__options: GasLimit,
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
	* @returns { void }
	*/
	"setPoolRatio" (
		corePoolRatio: (number | string | BN),
		stakingPoolRatio: (number | string | BN),
		pandoraPoolRatio: (number | string | BN),
		treasuryPoolRatio: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setPoolRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [corePoolRatio, stakingPoolRatio, pandoraPoolRatio, treasuryPoolRatio], __options);
	}

	/**
	* setTokenRatio
	*
	* @param { (number | string | BN) } tokenRatio,
	* @returns { void }
	*/
	"setTokenRatio" (
		tokenRatio: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setTokenRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenRatio], __options);
	}

	/**
	* setMaxNumberUnderRoll
	*
	* @param { (number | string | BN) } maxUnderNumber,
	* @returns { void }
	*/
	"setMaxNumberUnderRoll" (
		maxUnderNumber: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMaxNumberUnderRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxUnderNumber], __options);
	}

	/**
	* setPandoraAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	* @returns { void }
	*/
	"setPandoraAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setPandoraAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* getPercentageRates
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getPercentageRates" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getPercentageRates", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPandoraAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getPandoraAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getPandoraAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateCorePool
	*
	* @returns { void }
	*/
	"updateCorePool" (
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::updateCorePool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getMinNumberUnderRoll
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMinNumberUnderRoll" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getMinNumberUnderRoll", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawHoldAmount
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawHoldAmount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::withdrawHoldAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* transferStakingPool
	*
	* @returns { void }
	*/
	"transferStakingPool" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::transferStakingPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* withdrawFee
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { (string | number | BN) } value,
	* @returns { void }
	*/
	"withdrawFee" (
		account: ArgumentTypes.AccountId,
		value: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, value], __options);
	}

	/**
	* setMaxNumberOverRoll
	*
	* @param { (number | string | BN) } maxOverNumber,
	* @returns { void }
	*/
	"setMaxNumberOverRoll" (
		maxOverNumber: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMaxNumberOverRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxOverNumber], __options);
	}

	/**
	* setMinNumberOverRoll
	*
	* @param { (number | string | BN) } minOverNumber,
	* @returns { void }
	*/
	"setMinNumberOverRoll" (
		minOverNumber: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMinNumberOverRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [minOverNumber], __options);
	}

	/**
	* getCorePoolAmout
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getCorePoolAmout" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getCorePoolAmout", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBetTokenAddress
	*
	* @param { ArgumentTypes.AccountId } betTokenAddress,
	* @returns { void }
	*/
	"setBetTokenAddress" (
		betTokenAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setBetTokenAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [betTokenAddress], __options);
	}

	/**
	* getHoldBidderCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getHoldBidderCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getHoldBidderCount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPlatformFeeAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getPlatformFeeAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getPlatformFeeAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getDaoAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getDaoAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getDaoAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setDaoAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	* @returns { void }
	*/
	"setDaoAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setDaoAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* getStakingPoolAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getStakingPoolAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getStakingPoolAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTreasuryPoolAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTreasuryPoolAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getTreasuryPoolAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMaxBet
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getMaxBet" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getMaxBet", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setRoundDistance
	*
	* @param { (number | string | BN) } roundDistance,
	* @returns { void }
	*/
	"setRoundDistance" (
		roundDistance: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setRoundDistance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [roundDistance], __options);
	}

	/**
	* updateRewardPool
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"updateRewardPool" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::updateRewardPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* setRates
	*
	* @param { Array<(number | string | BN)> } overRates,
	* @param { Array<(number | string | BN)> } underRates,
	* @returns { void }
	*/
	"setRates" (
		overRates: Array<(number | string | BN)>,
		underRates: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setRates", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [overRates, underRates], __options);
	}

	/**
	* getMaxNumberOverRoll
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMaxNumberOverRoll" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getMaxNumberOverRoll", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setTreasuryAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	* @returns { void }
	*/
	"setTreasuryAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setTreasuryAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* betTokenAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"betTokenAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::betTokenAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTokenBalance
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTokenBalance" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getTokenBalance", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setPercentageRates
	*
	* @param { (number | string | BN) } percentageRates,
	* @returns { void }
	*/
	"setPercentageRates" (
		percentageRates: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setPercentageRates", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [percentageRates], __options);
	}

	/**
	* getTokenRatio
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getTokenRatio" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getTokenRatio", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getHoldAmountPlayers
	*
	* @param { ArgumentTypes.AccountId } address,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getHoldAmountPlayers" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getHoldAmountPlayers", [address], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMinNumberOverRoll
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMinNumberOverRoll" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getMinNumberOverRoll", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getStakingPoolRatio
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getStakingPoolRatio" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getStakingPoolRatio", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setStakingAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	* @returns { void }
	*/
	"setStakingAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setStakingAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* getOverRates
	*
	* @returns { Result<Array<number>, ReturnTypes.LangError> }
	*/
	"getOverRates" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<number>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getOverRates", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMaxBetRatio
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMaxBetRatio" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getMaxBetRatio", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* transferPandoraPool
	*
	* @returns { void }
	*/
	"transferPandoraPool" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::transferPandoraPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setOracleRandomnessAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	* @returns { void }
	*/
	"setOracleRandomnessAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setOracleRandomnessAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* isBetAvailable
	*
	* @param { ArgumentTypes.AccountId } player,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"isBetAvailable" (
		player: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::isBetAvailable", [player], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getStakingAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getStakingAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getStakingAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTreasuryAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getTreasuryAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getTreasuryAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getBetazAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getBetazAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getBetazAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMaxBetRatio
	*
	* @param { (number | string | BN) } maxBetRatio,
	* @returns { void }
	*/
	"setMaxBetRatio" (
		maxBetRatio: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMaxBetRatio", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxBetRatio], __options);
	}

	/**
	* getBet
	*
	* @param { ArgumentTypes.AccountId } player,
	* @returns { Result<ReturnTypes.BetInformation | null, ReturnTypes.LangError> }
	*/
	"getBet" (
		player: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.BetInformation | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getBet", [player], __options, (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBetazAddress
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"setBetazAddress" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setBetazAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account], __options);
	}

	/**
	* transferTreasuryPool
	*
	* @returns { void }
	*/
	"transferTreasuryPool" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::transferTreasuryPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setMinNumberUnderRoll
	*
	* @param { (number | string | BN) } minUnderNumber,
	* @returns { void }
	*/
	"setMinNumberUnderRoll" (
		minUnderNumber: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::setMinNumberUnderRoll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [minUnderNumber], __options);
	}

	/**
	* changeState
	*
	* @returns { void }
	*/
	"changeState" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::changeState", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getRewardPoolAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getRewardPoolAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getRewardPoolAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPandoraPoolAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getPandoraPoolAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getPandoraPoolAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* tranferTokenToPool
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"tranferTokenToPool" (
		pool: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "betA0CoreTrait::tranferTokenToPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, amount], __options);
	}

	/**
	* getOracleRandomnessAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getOracleRandomnessAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getOracleRandomnessAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getCorePoolRatio
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getCorePoolRatio" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getCorePoolRatio", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPandoraPoolRatio
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getPandoraPoolRatio" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getPandoraPoolRatio", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTreasuryPoolRatio
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getTreasuryPoolRatio" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getTreasuryPoolRatio", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getHoldPlayersByIndex
	*
	* @param { (number | string | BN) } index,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getHoldPlayersByIndex" (
		index: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getHoldPlayersByIndex", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoundDistance
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoundDistance" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getRoundDistance", [], __options, (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMaxNumberUnderRoll
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMaxNumberUnderRoll" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getMaxNumberUnderRoll", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getUnderRates
	*
	* @returns { Result<Array<number>, ReturnTypes.LangError> }
	*/
	"getUnderRates" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<number>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "betA0CoreTrait::getUnderRates", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceOwnership
	*
	* @returns { void }
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId | null } newOwner,
	* @returns { void }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newOwner], __options);
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* paused
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"paused" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pausable::paused", [], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setCodeHash
	*
	* @param { ArgumentTypes.Hash } newCodeHash,
	* @returns { void }
	*/
	"setCodeHash" (
		newCodeHash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "upgradeable::setCodeHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newCodeHash], __options);
	}

	/**
	* grantRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { void }
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::grantRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { void }
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
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
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { void }
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::renounceRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleMemberCount
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleMemberCount" (
		role: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMemberCount", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
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
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMember", [role, index], __options, (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

}