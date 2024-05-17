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
	 * @param { ArgumentTypes.AccountId } psp34ContractAddress,
	 * @param { (number | string | BN) } maxBetNumber,
	*/
	"initialize" (
		adminAddress: ArgumentTypes.AccountId,
		psp34ContractAddress: ArgumentTypes.AccountId,
		maxBetNumber: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [adminAddress, psp34ContractAddress, maxBetNumber], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "updateBetSession", [sessionId, randomNumber, statusType], __options);
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
	 * getPsp34ContractAddress
	 *
	*/
	"getPsp34ContractAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getPsp34ContractAddress", [], __options);
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
	 * getTotalWinAmount
	 *
	*/
	"getTotalWinAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getTotalWinAmount", [], __options);
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
	 * setPsp34ContractAddress
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"setPsp34ContractAddress" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::setPsp34ContractAddress", [account], __options);
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
	 * getHoldPlayerCount
	 *
	*/
	"getHoldPlayerCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getHoldPlayerCount", [], __options);
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
	 * addNewBetSession
	 *
	*/
	"addNewBetSession" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::addNewBetSession", [], __options);
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
	 * getLastSessionId
	 *
	*/
	"getLastSessionId" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getLastSessionId", [], __options);
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
	 * getPlayerNotYetProcessed
	 *
	*/
	"getPlayerNotYetProcessed" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getPlayerNotYetProcessed", [], __options);
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
	 * getIsLocked
	 *
	*/
	"getIsLocked" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pandoraPoolTraits::getIsLocked", [], __options);
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
	 * renounceOwnership
	 *
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::renounceOwnership", [], __options);
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