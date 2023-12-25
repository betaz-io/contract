/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pandora';
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [adminAddress, betazTokenAddress, publicMintPrice, sessionTotalTicketAmount, maxBetNumber], __options);
	}

	/**
	 * mint
	 *
	*/
	"mint" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "mint", [], __options);
	}

	/**
	 * multipleMintTicket
	 *
	 * @param { (number | string | BN) } amounts,
	*/
	"multipleMintTicket" (
		amounts: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "multipleMintTicket", [amounts], __options);
	}

	/**
	 * mintWithAttributes
	 *
	 * @param { Array<[string, string]> } metadata,
	*/
	"mintWithAttributes" (
		metadata: Array<[string, string]>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "mintWithAttributes", [metadata], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "updateWinAmountAndSessionStatus", [sessionId, winAmount], __options);
	}

	/**
	 * updateTotalWinAmount
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"updateTotalWinAmount" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "updateTotalWinAmount", [amount], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34Burnable::burn", [account, id], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getPlayersInSessionByIndex", [sessionId, index], __options);
	}

	/**
	 * getNftInfo
	 *
	 * @param { ArgumentTypes.Id } tokenId,
	*/
	"getNftInfo" (
		tokenId: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getNftInfo", [tokenId], __options);
	}

	/**
	 * getHoldBidderCount
	 *
	*/
	"getHoldBidderCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getHoldBidderCount", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::handleFindWinner", [sessionId, index], __options);
	}

	/**
	 * getIsLocked
	 *
	*/
	"getIsLocked" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getIsLocked", [], __options);
	}

	/**
	 * addChainlinkRequestId
	 *
	 * @param { (number | string | BN) } sessionId,
	 * @param { string } chainlinkRequestId,
	*/
	"addChainlinkRequestId" (
		sessionId: (number | string | BN),
		chainlinkRequestId: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::addChainlinkRequestId", [sessionId, chainlinkRequestId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getPlayerWinAmount", [sessionId, account], __options);
	}

	/**
	 * sessionTotalTicketAmount
	 *
	 * @param { (number | string | BN) } sessionId,
	*/
	"sessionTotalTicketAmount" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::sessionTotalTicketAmount", [sessionId], __options);
	}

	/**
	 * setPublicMintPrice
	 *
	 * @param { (string | number | BN) } price,
	*/
	"setPublicMintPrice" (
		price: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::setPublicMintPrice", [price], __options);
	}

	/**
	 * getLockedTokenCount
	 *
	*/
	"getLockedTokenCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getLockedTokenCount", [], __options);
	}

	/**
	 * setBetazTokenAddress
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"setBetazTokenAddress" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::setBetazTokenAddress", [account], __options);
	}

	/**
	 * getPlayerByNftId
	 *
	 * @param { ArgumentTypes.Id } tokenId,
	*/
	"getPlayerByNftId" (
		tokenId: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getPlayerByNftId", [tokenId], __options);
	}

	/**
	 * getLastSessionId
	 *
	*/
	"getLastSessionId" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getLastSessionId", [], __options);
	}

	/**
	 * burnBetazToken
	 *
	*/
	"burnBetazToken" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::burnBetazToken", [], __options);
	}

	/**
	 * setBaseUri
	 *
	 * @param { string } uri,
	*/
	"setBaseUri" (
		uri: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::setBaseUri", [uri], __options);
	}

	/**
	 * getMaxBetNumber
	 *
	*/
	"getMaxBetNumber" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getMaxBetNumber", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getHoldAmountPlayers", [address], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::play", [sessionId, betNumber, tokenId], __options);
	}

	/**
	 * getChainlinkRequestIdBySessionId
	 *
	 * @param { (number | string | BN) } sessionId,
	*/
	"getChainlinkRequestIdBySessionId" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getChainlinkRequestIdBySessionId", [sessionId], __options);
	}

	/**
	 * setMaxBetNumber
	 *
	 * @param { (number | string | BN) } maxBetNumber,
	*/
	"setMaxBetNumber" (
		maxBetNumber: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::setMaxBetNumber", [maxBetNumber], __options);
	}

	/**
	 * getPublicMintPrice
	 *
	*/
	"getPublicMintPrice" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getPublicMintPrice", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::withdrawFee", [account, value], __options);
	}

	/**
	 * getSessionTotalTicketAmount
	 *
	*/
	"getSessionTotalTicketAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getSessionTotalTicketAmount", [], __options);
	}

	/**
	 * getTotalHoldAmount
	 *
	*/
	"getTotalHoldAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getTotalHoldAmount", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::totalTicketsWin", [sessionId, randomNumber], __options);
	}

	/**
	 * getAttributeCount
	 *
	*/
	"getAttributeCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getAttributeCount", [], __options);
	}

	/**
	 * getIdInSessionByIndex
	 *
	 * @param { (number | string | BN) } sessionId,
	 * @param { (string | number | BN) } index,
	*/
	"getIdInSessionByIndex" (
		sessionId: (number | string | BN),
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getIdInSessionByIndex", [sessionId, index], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::updateIsLocked", [isLocked], __options);
	}

	/**
	 * changeState
	 *
	 * @param { boolean } state,
	*/
	"changeState" (
		state: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::changeState", [state], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::setMultipleAttributes", [tokenId, metadata], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getAttributes", [tokenId, attributes], __options);
	}

	/**
	 * addNewBetSession
	 *
	*/
	"addNewBetSession" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::addNewBetSession", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::finalize", [sessionId, randomNumber], __options);
	}

	/**
	 * lock
	 *
	 * @param { ArgumentTypes.Id } tokenId,
	*/
	"lock" (
		tokenId: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::lock", [tokenId], __options);
	}

	/**
	 * getIdInSessionByRandomNumberAndIndex
	 *
	 * @param { (number | string | BN) } sessionId,
	 * @param { (number | string | BN) } randomNumber,
	 * @param { (string | number | BN) } index,
	*/
	"getIdInSessionByRandomNumberAndIndex" (
		sessionId: (number | string | BN),
		randomNumber: (number | string | BN),
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getIdInSessionByRandomNumberAndIndex", [sessionId, randomNumber, index], __options);
	}

	/**
	 * burnTicketUsed
	 *
	 * @param { Array<ArgumentTypes.Id> } tokenIds,
	*/
	"burnTicketUsed" (
		tokenIds: Array<ArgumentTypes.Id>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::burnTicketUsed", [tokenIds], __options);
	}

	/**
	 * totalPlayersInSession
	 *
	 * @param { (number | string | BN) } sessionId,
	*/
	"totalPlayersInSession" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::totalPlayersInSession", [sessionId], __options);
	}

	/**
	 * tokenUri
	 *
	 * @param { (number | string | BN) } tokenId,
	*/
	"tokenUri" (
		tokenId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::tokenUri", [tokenId], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::withdrawHoldAmount", [receiver, amount], __options);
	}

	/**
	 * getPlayerNotYetProcessed
	 *
	*/
	"getPlayerNotYetProcessed" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getPlayerNotYetProcessed", [], __options);
	}

	/**
	 * isLockedNft
	 *
	 * @param { ArgumentTypes.Id } tokenId,
	*/
	"isLockedNft" (
		tokenId: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::isLockedNft", [tokenId], __options);
	}

	/**
	 * getLastTokenId
	 *
	*/
	"getLastTokenId" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getLastTokenId", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::updateBetSession", [sessionId, randomNumber, statusType], __options);
	}

	/**
	 * getBetazTokenAddress
	 *
	*/
	"getBetazTokenAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getBetazTokenAddress", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getHoldPlayersByIndex", [index], __options);
	}

	/**
	 * getBetSession
	 *
	 * @param { (number | string | BN) } sessionId,
	*/
	"getBetSession" (
		sessionId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getBetSession", [sessionId], __options);
	}

	/**
	 * setSessionTotalTicketAmount
	 *
	 * @param { (string | number | BN) } ticketAmountRatio,
	*/
	"setSessionTotalTicketAmount" (
		ticketAmountRatio: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::setSessionTotalTicketAmount", [ticketAmountRatio], __options);
	}

	/**
	 * getAttributeName
	 *
	 * @param { (number | string | BN) } index,
	*/
	"getAttributeName" (
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getAttributeName", [index], __options);
	}

	/**
	 * getOwner
	 *
	*/
	"getOwner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getOwner", [], __options);
	}

	/**
	 * publicBuy
	 *
	 * @param { (number | string | BN) } amounts,
	*/
	"publicBuy" (
		amounts: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::publicBuy", [amounts], __options);
	}

	/**
	 * getTotalWinAmount
	 *
	*/
	"getTotalWinAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getTotalWinAmount", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::transfer", [to, id, data], __options);
	}

	/**
	 * collectionId
	 *
	*/
	"collectionId" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::collectionId", [], __options);
	}

	/**
	 * balanceOf
	 *
	 * @param { ArgumentTypes.AccountId } owner,
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::balanceOf", [owner], __options);
	}

	/**
	 * ownerOf
	 *
	 * @param { ArgumentTypes.Id } id,
	*/
	"ownerOf" (
		id: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::ownerOf", [id], __options);
	}

	/**
	 * totalSupply
	 *
	*/
	"totalSupply" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::totalSupply", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::allowance", [owner, operator, id], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::approve", [operator, id, approved], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34Metadata::getAttribute", [id, key], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34Enumerable::ownersTokenByIndex", [owner, index], __options);
	}

	/**
	 * tokenByIndex
	 *
	 * @param { (string | number | BN) } index,
	*/
	"tokenByIndex" (
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34Enumerable::tokenByIndex", [index], __options);
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

}