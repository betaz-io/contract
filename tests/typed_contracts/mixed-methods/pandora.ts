/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pandora';
import type * as ReturnTypes from '../types-returns/pandora';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/pandora.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/pandora.json';


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
	* @param { ArgumentTypes.AccountId } adminAddress,
	* @param { ArgumentTypes.AccountId } betazTokenAddress,
	* @param { (string | number | BN) } publicMintPrice,
	* @param { (string | number | BN) } sessionTotalTicketAmount,
	* @param { (number | string | BN) } maxBetNumber,
	* @returns { void }
	*/
	"initialize" (
		adminAddress: ArgumentTypes.AccountId,
		betazTokenAddress: ArgumentTypes.AccountId,
		publicMintPrice: (string | number | BN),
		sessionTotalTicketAmount: (string | number | BN),
		maxBetNumber: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [adminAddress, betazTokenAddress, publicMintPrice, sessionTotalTicketAmount, maxBetNumber], __options);
	}

	/**
	* mint
	*
	* @returns { void }
	*/
	"mint" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "mint", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* multipleMintTicket
	*
	* @param { (number | string | BN) } amounts,
	* @returns { void }
	*/
	"multipleMintTicket" (
		amounts: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "multipleMintTicket", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amounts], __options);
	}

	/**
	* mintWithAttributes
	*
	* @param { Array<[string, string]> } metadata,
	* @returns { void }
	*/
	"mintWithAttributes" (
		metadata: Array<[string, string]>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "mintWithAttributes", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [metadata], __options);
	}

	/**
	* updateWinAmountAndSessionStatus
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (string | number | BN) } winAmount,
	* @returns { void }
	*/
	"updateWinAmountAndSessionStatus" (
		sessionId: (number | string | BN),
		winAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "updateWinAmountAndSessionStatus", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, winAmount], __options);
	}

	/**
	* updateTotalWinAmount
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"updateTotalWinAmount" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "updateTotalWinAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* burn
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.Id } id,
	* @returns { void }
	*/
	"burn" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34Burnable::burn", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, id], __options);
	}

	/**
	* getPlayerByNftId
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getPlayerByNftId" (
		tokenId: ArgumentTypes.Id,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getPlayerByNftId", [tokenId], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::withdrawHoldAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* addNewBetSession
	*
	* @returns { void }
	*/
	"addNewBetSession" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::addNewBetSession", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setSessionTotalTicketAmount
	*
	* @param { (string | number | BN) } ticketAmountRatio,
	* @returns { void }
	*/
	"setSessionTotalTicketAmount" (
		ticketAmountRatio: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setSessionTotalTicketAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [ticketAmountRatio], __options);
	}

	/**
	* getTotalHoldAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalHoldAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getTotalHoldAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getSessionTotalTicketAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getSessionTotalTicketAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getSessionTotalTicketAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getBetazTokenAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getBetazTokenAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getBetazTokenAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAttributeCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getAttributeCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getAttributeCount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPlayersInSessionByIndex
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (string | number | BN) } index,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getPlayersInSessionByIndex" (
		sessionId: (number | string | BN),
		index: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getPlayersInSessionByIndex", [sessionId, index], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* isLockedNft
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"isLockedNft" (
		tokenId: ArgumentTypes.Id,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::isLockedNft", [tokenId], __options, (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getHoldAmountPlayers", [address], __options, (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* totalPlayersInSession
	*
	* @param { (number | string | BN) } sessionId,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalPlayersInSession" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::totalPlayersInSession", [sessionId], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addChainlinkRequestId
	*
	* @param { (number | string | BN) } sessionId,
	* @param { string } chainlinkRequestId,
	* @returns { void }
	*/
	"addChainlinkRequestId" (
		sessionId: (number | string | BN),
		chainlinkRequestId: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::addChainlinkRequestId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, chainlinkRequestId], __options);
	}

	/**
	* getTotalWinAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalWinAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getTotalWinAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getNftInfo
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { Result<ReturnTypes.NFTInfomation | null, ReturnTypes.LangError> }
	*/
	"getNftInfo" (
		tokenId: ArgumentTypes.Id,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.NFTInfomation | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getNftInfo", [tokenId], __options, (result) => { return handleReturnType(result, getTypeDescription(35, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPublicMintPrice
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getPublicMintPrice" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getPublicMintPrice", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOwner
	*
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getOwner" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getOwner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* burnBetazToken
	*
	* @returns { void }
	*/
	"burnBetazToken" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::burnBetazToken", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getBetSession
	*
	* @param { (number | string | BN) } sessionId,
	* @returns { Result<ReturnTypes.SessionInfo | null, ReturnTypes.LangError> }
	*/
	"getBetSession" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.SessionInfo | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getBetSession", [sessionId], __options, (result) => { return handleReturnType(result, getTypeDescription(38, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* publicBuy
	*
	* @param { (number | string | BN) } amounts,
	* @returns { void }
	*/
	"publicBuy" (
		amounts: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::publicBuy", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amounts], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getHoldPlayersByIndex", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLockedTokenCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getLockedTokenCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getLockedTokenCount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPlayerNotYetProcessed
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getPlayerNotYetProcessed" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getPlayerNotYetProcessed", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* handleFindWinner
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (string | number | BN) } index,
	* @returns { void }
	*/
	"handleFindWinner" (
		sessionId: (number | string | BN),
		index: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::handleFindWinner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, index], __options);
	}

	/**
	* updateBetSession
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } randomNumber,
	* @param { ArgumentTypes.SessionsStatusType } statusType,
	* @returns { void }
	*/
	"updateBetSession" (
		sessionId: (number | string | BN),
		randomNumber: (number | string | BN),
		statusType: ArgumentTypes.SessionsStatusType,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::updateBetSession", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, randomNumber, statusType], __options);
	}

	/**
	* burnTicketUsed
	*
	* @param { Array<ArgumentTypes.Id> } tokenIds,
	* @returns { void }
	*/
	"burnTicketUsed" (
		tokenIds: Array<ArgumentTypes.Id>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::burnTicketUsed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenIds], __options);
	}

	/**
	* getLastSessionId
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getLastSessionId" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getLastSessionId", [], __options, (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMultipleAttributes
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @param { Array<[string, string]> } metadata,
	* @returns { void }
	*/
	"setMultipleAttributes" (
		tokenId: ArgumentTypes.Id,
		metadata: Array<[string, string]>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setMultipleAttributes", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId, metadata], __options);
	}

	/**
	* getMaxBetNumber
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMaxBetNumber" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getMaxBetNumber", [], __options, (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPlayerWinAmount
	*
	* @param { (number | string | BN) } sessionId,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getPlayerWinAmount" (
		sessionId: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getPlayerWinAmount", [sessionId, account], __options, (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* play
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } betNumber,
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { void }
	*/
	"play" (
		sessionId: (number | string | BN),
		betNumber: (number | string | BN),
		tokenId: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::play", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, betNumber, tokenId], __options);
	}

	/**
	* getIsLocked
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"getIsLocked" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getIsLocked", [], __options, (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAttributes
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @param { Array<string> } attributes,
	* @returns { Result<Array<string>, ReturnTypes.LangError> }
	*/
	"getAttributes" (
		tokenId: ArgumentTypes.Id,
		attributes: Array<string>,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<string>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getAttributes", [tokenId, attributes], __options, (result) => { return handleReturnType(result, getTypeDescription(45, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAttributeName
	*
	* @param { (number | string | BN) } index,
	* @returns { Result<string, ReturnTypes.LangError> }
	*/
	"getAttributeName" (
		index: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<string, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getAttributeName", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(46, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* sessionTotalTicketAmount
	*
	* @param { (number | string | BN) } sessionId,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"sessionTotalTicketAmount" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::sessionTotalTicketAmount", [sessionId], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* totalTicketsWin
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } randomNumber,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalTicketsWin" (
		sessionId: (number | string | BN),
		randomNumber: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::totalTicketsWin", [sessionId, randomNumber], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBaseUri
	*
	* @param { string } uri,
	* @returns { void }
	*/
	"setBaseUri" (
		uri: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setBaseUri", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [uri], __options);
	}

	/**
	* setPublicMintPrice
	*
	* @param { (string | number | BN) } price,
	* @returns { void }
	*/
	"setPublicMintPrice" (
		price: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setPublicMintPrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [price], __options);
	}

	/**
	* getHoldBidderCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getHoldBidderCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getHoldBidderCount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getChainlinkRequestIdBySessionId
	*
	* @param { (number | string | BN) } sessionId,
	* @returns { Result<string | null, ReturnTypes.LangError> }
	*/
	"getChainlinkRequestIdBySessionId" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<string | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getChainlinkRequestIdBySessionId", [sessionId], __options, (result) => { return handleReturnType(result, getTypeDescription(47, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getIdInSessionByRandomNumberAndIndex
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } randomNumber,
	* @param { (string | number | BN) } index,
	* @returns { Result<ReturnTypes.Id | null, ReturnTypes.LangError> }
	*/
	"getIdInSessionByRandomNumberAndIndex" (
		sessionId: (number | string | BN),
		randomNumber: (number | string | BN),
		index: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Id | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getIdInSessionByRandomNumberAndIndex", [sessionId, randomNumber, index], __options, (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* tokenUri
	*
	* @param { (number | string | BN) } tokenId,
	* @returns { Result<string, ReturnTypes.LangError> }
	*/
	"tokenUri" (
		tokenId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<string, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::tokenUri", [tokenId], __options, (result) => { return handleReturnType(result, getTypeDescription(46, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLastTokenId
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getLastTokenId" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getLastTokenId", [], __options, (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* changeState
	*
	* @param { boolean } state,
	* @returns { void }
	*/
	"changeState" (
		state: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::changeState", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [state], __options);
	}

	/**
	* getIdInSessionByIndex
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (string | number | BN) } index,
	* @returns { Result<ReturnTypes.Id | null, ReturnTypes.LangError> }
	*/
	"getIdInSessionByIndex" (
		sessionId: (number | string | BN),
		index: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Id | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pandoraPoolTraits::getIdInSessionByIndex", [sessionId, index], __options, (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, value], __options);
	}

	/**
	* updateIsLocked
	*
	* @param { boolean } isLocked,
	* @returns { void }
	*/
	"updateIsLocked" (
		isLocked: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::updateIsLocked", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [isLocked], __options);
	}

	/**
	* lock
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { void }
	*/
	"lock" (
		tokenId: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::lock", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId], __options);
	}

	/**
	* finalize
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } randomNumber,
	* @returns { void }
	*/
	"finalize" (
		sessionId: (number | string | BN),
		randomNumber: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::finalize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, randomNumber], __options);
	}

	/**
	* setMaxBetNumber
	*
	* @param { (number | string | BN) } maxBetNumber,
	* @returns { void }
	*/
	"setMaxBetNumber" (
		maxBetNumber: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setMaxBetNumber", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxBetNumber], __options);
	}

	/**
	* setBetazTokenAddress
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"setBetazTokenAddress" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setBetazTokenAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account], __options);
	}

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::balanceOf", [owner], __options, (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* transfer
	*
	* @param { ArgumentTypes.AccountId } to,
	* @param { ArgumentTypes.Id } id,
	* @param { Array<(number | string | BN)> } data,
	* @returns { void }
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		data: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::transfer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [to, id, data], __options);
	}

	/**
	* collectionId
	*
	* @returns { Result<ReturnTypes.Id, ReturnTypes.LangError> }
	*/
	"collectionId" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Id, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::collectionId", [], __options, (result) => { return handleReturnType(result, getTypeDescription(51, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* ownerOf
	*
	* @param { ArgumentTypes.Id } id,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"ownerOf" (
		id: ArgumentTypes.Id,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::ownerOf", [id], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* approve
	*
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @param { boolean } approved,
	* @returns { void }
	*/
	"approve" (
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		approved: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::approve", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [operator, id, approved], __options);
	}

	/**
	* totalSupply
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalSupply" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::totalSupply", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* allowance
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::allowance", [owner, operator, id], __options, (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAttribute
	*
	* @param { ArgumentTypes.Id } id,
	* @param { string } key,
	* @returns { Result<string | null, ReturnTypes.LangError> }
	*/
	"getAttribute" (
		id: ArgumentTypes.Id,
		key: string,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<string | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Metadata::getAttribute", [id, key], __options, (result) => { return handleReturnType(result, getTypeDescription(47, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* ownersTokenByIndex
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { (string | number | BN) } index,
	* @returns { Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"ownersTokenByIndex" (
		owner: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Enumerable::ownersTokenByIndex", [owner, index], __options, (result) => { return handleReturnType(result, getTypeDescription(52, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* tokenByIndex
	*
	* @param { (string | number | BN) } index,
	* @returns { Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"tokenByIndex" (
		index: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Enumerable::tokenByIndex", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(52, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
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
	* paused
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"paused" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pausable::paused", [], __options, (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options, (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
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

}