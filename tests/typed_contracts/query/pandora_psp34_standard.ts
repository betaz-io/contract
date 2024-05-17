/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pandora_psp34_standard';
import type * as ReturnTypes from '../types-returns/pandora_psp34_standard';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/pandora_psp34_standard.json';


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
	* @param { (string | number | BN) } publicMintPrice,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"initialize" (
		adminAddress: ArgumentTypes.AccountId,
		betazTokenAddress: ArgumentTypes.AccountId,
		publicMintPrice: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "initialize", [adminAddress, betazTokenAddress, publicMintPrice], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* mint
	*
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"mint" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "mint", [], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* multipleMintTicket
	*
	* @param { (number | string | BN) } amounts,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"multipleMintTicket" (
		amounts: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "multipleMintTicket", [amounts], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* mintWithAttributes
	*
	* @param { Array<[string, string]> } metadata,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"mintWithAttributes" (
		metadata: Array<[string, string]>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "mintWithAttributes", [metadata], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* burn
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.Id } id,
	* @returns { Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"burn" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Burnable::burn", [account, id], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setPublicMintPrice
	*
	* @param { (string | number | BN) } price,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setPublicMintPrice" (
		price: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::setPublicMintPrice", [price], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAttributeName
	*
	* @param { (number | string | BN) } index,
	* @returns { Result<string, ReturnTypes.LangError> }
	*/
	"getAttributeName" (
		index: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<string, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::getAttributeName", [index], __options , (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAttributeCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getAttributeCount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::getAttributeCount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBaseUri
	*
	* @param { string } uri,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setBaseUri" (
		uri: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::setBaseUri", [uri], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLockedTokenCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getLockedTokenCount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::getLockedTokenCount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLastTokenId
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getLastTokenId" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::getLastTokenId", [], __options , (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
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
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<string>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::getAttributes", [tokenId, attributes], __options , (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getBetazTokenAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getBetazTokenAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::getBetazTokenAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* changeState
	*
	* @param { boolean } state,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"changeState" (
		state: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::changeState", [state], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* publicBuy
	*
	* @param { (number | string | BN) } amounts,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"publicBuy" (
		amounts: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::publicBuy", [amounts], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBetazTokenAddress
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setBetazTokenAddress" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::setBetazTokenAddress", [account], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMultipleAttributes
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @param { Array<[string, string]> } metadata,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setMultipleAttributes" (
		tokenId: ArgumentTypes.Id,
		metadata: Array<[string, string]>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::setMultipleAttributes", [tokenId, metadata], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* lock
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"lock" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::lock", [tokenId], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPublicMintPrice
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getPublicMintPrice" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::getPublicMintPrice", [], __options , (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* burnBetazToken
	*
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"burnBetazToken" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::burnBetazToken", [], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* tokenUri
	*
	* @param { (number | string | BN) } tokenId,
	* @returns { Result<string, ReturnTypes.LangError> }
	*/
	"tokenUri" (
		tokenId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<string, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::tokenUri", [tokenId], __options , (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* isLockedNft
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"isLockedNft" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::isLockedNft", [tokenId], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOwner
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getOwner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Traits::getOwner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* approve
	*
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @param { boolean } approved,
	* @returns { Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"approve" (
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		approved: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::approve", [operator, id, approved], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* transfer
	*
	* @param { ArgumentTypes.AccountId } to,
	* @param { ArgumentTypes.Id } id,
	* @param { Array<(number | string | BN)> } data,
	* @returns { Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		data: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::transfer", [to, id, data], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* ownerOf
	*
	* @param { ArgumentTypes.Id } id,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"ownerOf" (
		id: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::ownerOf", [id], __options , (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* totalSupply
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalSupply" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::totalSupply", [], __options , (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::balanceOf", [owner], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* collectionId
	*
	* @returns { Result<ReturnTypes.Id, ReturnTypes.LangError> }
	*/
	"collectionId" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Id, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::collectionId", [], __options , (result) => { return handleReturnType(result, getTypeDescription(38, DATA_TYPE_DESCRIPTIONS)); });
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
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::allowance", [owner, operator, id], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
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
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<string | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Metadata::getAttribute", [id, key], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
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
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Enumerable::ownersTokenByIndex", [owner, index], __options , (result) => { return handleReturnType(result, getTypeDescription(41, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* tokenByIndex
	*
	* @param { (string | number | BN) } index,
	* @returns { Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"tokenByIndex" (
		index: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Enumerable::tokenByIndex", [index], __options , (result) => { return handleReturnType(result, getTypeDescription(41, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* paused
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"paused" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pausable::paused", [], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "upgradeable::setCodeHash", [newCodeHash], __options , (result) => { return handleReturnType(result, getTypeDescription(46, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::grantRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::renounceRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::revokeRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

}