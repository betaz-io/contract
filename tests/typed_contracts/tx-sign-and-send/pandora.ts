/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pandora';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/pandora.json';


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
	* @param { ArgumentTypes.AccountId } adminAddress,
	* @param { ArgumentTypes.AccountId } betazTokenAddress,
	* @param { (string | number | BN) } publicMintPrice,
	* @param { (string | number | BN) } sessionTotalTicketAmount,
	* @param { (number | string | BN) } maxBetNumber,
	*/
	"initialize" (
		adminAddress: ArgumentTypes.AccountId,
		betazTokenAddress: ArgumentTypes.AccountId,
		publicMintPrice: (string | number | BN),
		sessionTotalTicketAmount: (string | number | BN),
		maxBetNumber: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [adminAddress, betazTokenAddress, publicMintPrice, sessionTotalTicketAmount, maxBetNumber], __options);
	}

	/**
	* mint
	*
	*/
	"mint" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "mint", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* multipleMintTicket
	*
	* @param { (number | string | BN) } amounts,
	*/
	"multipleMintTicket" (
		amounts: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "multipleMintTicket", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amounts], __options);
	}

	/**
	* mintWithAttributes
	*
	* @param { Array<[string, string]> } metadata,
	*/
	"mintWithAttributes" (
		metadata: Array<[string, string]>,
		__options ? : GasLimit,
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
	*/
	"updateWinAmountAndSessionStatus" (
		sessionId: (number | string | BN),
		winAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "updateWinAmountAndSessionStatus", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, winAmount], __options);
	}

	/**
	* burn
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.Id } id,
	*/
	"burn" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34Burnable::burn", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, id], __options);
	}

	/**
	* getPlayerWinAmount
	*
	* @param { (number | string | BN) } sessionId,
	* @param { ArgumentTypes.AccountId } account,
	*/
	"getPlayerWinAmount" (
		sessionId: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getPlayerWinAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, account], __options);
	}

	/**
	* getLastSessionId
	*
	*/
	"getLastSessionId" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getLastSessionId", (events: EventRecord) => {
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, value], __options);
	}

	/**
	* burnTicketUsed
	*
	* @param { Array<ArgumentTypes.Id> } tokenIds,
	*/
	"burnTicketUsed" (
		tokenIds: Array<ArgumentTypes.Id>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::burnTicketUsed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenIds], __options);
	}

	/**
	* getBetazTokenAddress
	*
	*/
	"getBetazTokenAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getBetazTokenAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getAttributes
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @param { Array<string> } attributes,
	*/
	"getAttributes" (
		tokenId: ArgumentTypes.Id,
		attributes: Array<string>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getAttributes", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId, attributes], __options);
	}

	/**
	* getLastTokenId
	*
	*/
	"getLastTokenId" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getLastTokenId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getPlayersInSessionByIndex
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (string | number | BN) } index,
	*/
	"getPlayersInSessionByIndex" (
		sessionId: (number | string | BN),
		index: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getPlayersInSessionByIndex", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, index], __options);
	}

	/**
	* isLockedNft
	*
	* @param { ArgumentTypes.Id } tokenId,
	*/
	"isLockedNft" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::isLockedNft", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId], __options);
	}

	/**
	* changeState
	*
	* @param { boolean } state,
	*/
	"changeState" (
		state: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::changeState", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [state], __options);
	}

	/**
	* setMultipleAttributes
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @param { Array<[string, string]> } metadata,
	*/
	"setMultipleAttributes" (
		tokenId: ArgumentTypes.Id,
		metadata: Array<[string, string]>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setMultipleAttributes", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId, metadata], __options);
	}

	/**
	* setPublicMintPrice
	*
	* @param { (string | number | BN) } price,
	*/
	"setPublicMintPrice" (
		price: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setPublicMintPrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [price], __options);
	}

	/**
	* getTotalWinAmount
	*
	*/
	"getTotalWinAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getTotalWinAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getMaxBetNumber
	*
	*/
	"getMaxBetNumber" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getMaxBetNumber", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getBetSession
	*
	* @param { (number | string | BN) } sessionId,
	*/
	"getBetSession" (
		sessionId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getBetSession", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId], __options);
	}

	/**
	* lock
	*
	* @param { ArgumentTypes.Id } tokenId,
	*/
	"lock" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::lock", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId], __options);
	}

	/**
	* getPublicMintPrice
	*
	*/
	"getPublicMintPrice" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getPublicMintPrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* totalTicketsWin
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } randomNumber,
	*/
	"totalTicketsWin" (
		sessionId: (number | string | BN),
		randomNumber: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::totalTicketsWin", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, randomNumber], __options);
	}

	/**
	* getPlayerByNftId
	*
	* @param { ArgumentTypes.Id } tokenId,
	*/
	"getPlayerByNftId" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getPlayerByNftId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId], __options);
	}

	/**
	* totalPlayersInSession
	*
	* @param { (number | string | BN) } sessionId,
	*/
	"totalPlayersInSession" (
		sessionId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::totalPlayersInSession", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId], __options);
	}

	/**
	* getAttributeName
	*
	* @param { (number | string | BN) } index,
	*/
	"getAttributeName" (
		index: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getAttributeName", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [index], __options);
	}

	/**
	* getLockedTokenCount
	*
	*/
	"getLockedTokenCount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getLockedTokenCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* withdrawWinAmount
	*
	* @param { ArgumentTypes.AccountId } winner,
	* @param { (number | string | BN) } sessionId,
	*/
	"withdrawWinAmount" (
		winner: ArgumentTypes.AccountId,
		sessionId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::withdrawWinAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [winner, sessionId], __options);
	}

	/**
	* publicBuy
	*
	* @param { (number | string | BN) } amounts,
	*/
	"publicBuy" (
		amounts: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::publicBuy", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amounts], __options);
	}

	/**
	* setSessionTotalTicketAmount
	*
	* @param { (string | number | BN) } ticketAmountRatio,
	*/
	"setSessionTotalTicketAmount" (
		ticketAmountRatio: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setSessionTotalTicketAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [ticketAmountRatio], __options);
	}

	/**
	* finalize
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } randomNumber,
	*/
	"finalize" (
		sessionId: (number | string | BN),
		randomNumber: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::finalize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, randomNumber], __options);
	}

	/**
	* tokenUri
	*
	* @param { (number | string | BN) } tokenId,
	*/
	"tokenUri" (
		tokenId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::tokenUri", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId], __options);
	}

	/**
	* getAttributeCount
	*
	*/
	"getAttributeCount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getAttributeCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* updateNftInfo
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } betNumber,
	* @param { boolean } status,
	*/
	"updateNftInfo" (
		tokenId: ArgumentTypes.Id,
		sessionId: (number | string | BN),
		betNumber: (number | string | BN),
		status: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::updateNftInfo", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId, sessionId, betNumber, status], __options);
	}

	/**
	* updateBetSession
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } randomNumber,
	* @param { ArgumentTypes.SessionsStatusType } statusType,
	*/
	"updateBetSession" (
		sessionId: (number | string | BN),
		randomNumber: (number | string | BN),
		statusType: ArgumentTypes.SessionsStatusType,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::updateBetSession", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, randomNumber, statusType], __options);
	}

	/**
	* setBetazTokenAddress
	*
	* @param { ArgumentTypes.AccountId } account,
	*/
	"setBetazTokenAddress" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setBetazTokenAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account], __options);
	}

	/**
	* sessionTotalTicketAmount
	*
	* @param { (number | string | BN) } sessionId,
	*/
	"sessionTotalTicketAmount" (
		sessionId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::sessionTotalTicketAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId], __options);
	}

	/**
	* handleFindWinner
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (string | number | BN) } index,
	*/
	"handleFindWinner" (
		sessionId: (number | string | BN),
		index: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::handleFindWinner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, index], __options);
	}

	/**
	* burnBetazToken
	*
	*/
	"burnBetazToken" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::burnBetazToken", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setBaseUri
	*
	* @param { string } uri,
	*/
	"setBaseUri" (
		uri: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setBaseUri", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [uri], __options);
	}

	/**
	* addNewBetSession
	*
	*/
	"addNewBetSession" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::addNewBetSession", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* play
	*
	* @param { (number | string | BN) } sessionId,
	* @param { (number | string | BN) } betNumber,
	* @param { ArgumentTypes.Id } tokenId,
	*/
	"play" (
		sessionId: (number | string | BN),
		betNumber: (number | string | BN),
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::play", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [sessionId, betNumber, tokenId], __options);
	}

	/**
	* getSessionTotalTicketAmount
	*
	*/
	"getSessionTotalTicketAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getSessionTotalTicketAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getNftInfo
	*
	* @param { ArgumentTypes.Id } tokenId,
	*/
	"getNftInfo" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getNftInfo", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenId], __options);
	}

	/**
	* getOwner
	*
	*/
	"getOwner" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::getOwner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setMaxBetNumber
	*
	* @param { (number | string | BN) } maxBetNumber,
	*/
	"setMaxBetNumber" (
		maxBetNumber: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pandoraPoolTraits::setMaxBetNumber", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxBetNumber], __options);
	}

	/**
	* ownerOf
	*
	* @param { ArgumentTypes.Id } id,
	*/
	"ownerOf" (
		id: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::ownerOf", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [id], __options);
	}

	/**
	* transfer
	*
	* @param { ArgumentTypes.AccountId } to,
	* @param { ArgumentTypes.Id } id,
	* @param { Array<(number | string | BN)> } data,
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		data: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::transfer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [to, id, data], __options);
	}

	/**
	* totalSupply
	*
	*/
	"totalSupply" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::totalSupply", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* approve
	*
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @param { boolean } approved,
	*/
	"approve" (
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		approved: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::approve", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [operator, id, approved], __options);
	}

	/**
	* allowance
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::allowance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [owner, operator, id], __options);
	}

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::balanceOf", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [owner], __options);
	}

	/**
	* collectionId
	*
	*/
	"collectionId" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::collectionId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getAttribute
	*
	* @param { ArgumentTypes.Id } id,
	* @param { string } key,
	*/
	"getAttribute" (
		id: ArgumentTypes.Id,
		key: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34Metadata::getAttribute", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [id, key], __options);
	}

	/**
	* ownersTokenByIndex
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { (string | number | BN) } index,
	*/
	"ownersTokenByIndex" (
		owner: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34Enumerable::ownersTokenByIndex", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [owner, index], __options);
	}

	/**
	* tokenByIndex
	*
	* @param { (string | number | BN) } index,
	*/
	"tokenByIndex" (
		index: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34Enumerable::tokenByIndex", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [index], __options);
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

}