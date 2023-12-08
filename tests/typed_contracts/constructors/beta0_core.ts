import {CodePromise} from "@polkadot/api-contract";
import type {KeyringPair} from "@polkadot/keyring/types";
import type {ApiPromise} from "@polkadot/api";
import {_genValidGasLimitAndValue, _signAndSend, SignAndSendSuccessResponse} from "@727-ventures/typechain-types";
import type {ConstructorOptions} from "@727-ventures/typechain-types";
import type {WeightV2} from "@polkadot/types/interfaces";
import type * as ArgumentTypes from '../types-arguments/beta0_core';
import { ContractFile } from '../contract-info/beta0_core';
import type BN from 'bn.js';

export default class Constructors {
	readonly nativeAPI: ApiPromise;
	readonly signer: KeyringPair;

	constructor(
		nativeAPI: ApiPromise,
		signer: KeyringPair,
	) {
		this.nativeAPI = nativeAPI;
		this.signer = signer;
	}

	/**
	* new
	*
	* @param { (number | string | BN) } maxBetRatio,
	* @param { (number | string | BN) } tokenRatio,
	* @param { (number | string | BN) } minOverNumber,
	* @param { (number | string | BN) } maxOverNumber,
	* @param { (number | string | BN) } minUnderNumber,
	* @param { (number | string | BN) } maxUnderNumber,
	* @param { (number | string | BN) } corePoolRatio,
	* @param { (number | string | BN) } stakingPoolRatio,
	* @param { (number | string | BN) } treasuryPoolRatio,
	* @param { (number | string | BN) } pandoraPoolRatio,
	* @param { ArgumentTypes.AccountId } adminAddress,
	* @param { ArgumentTypes.AccountId } betazAddress,
	* @param { ArgumentTypes.AccountId } betTokenAddress,
	* @param { ArgumentTypes.AccountId } stakingAddress,
	* @param { ArgumentTypes.AccountId } treasuryAddress,
	* @param { ArgumentTypes.AccountId } pandoraAddress,
	* @param { ArgumentTypes.AccountId } oracleRandomnessAddress,
	* @param { ArgumentTypes.AccountId } daoAddress,
	*/
   	async "new" (
		maxBetRatio: (number | string | BN),
		tokenRatio: (number | string | BN),
		minOverNumber: (number | string | BN),
		maxOverNumber: (number | string | BN),
		minUnderNumber: (number | string | BN),
		maxUnderNumber: (number | string | BN),
		corePoolRatio: (number | string | BN),
		stakingPoolRatio: (number | string | BN),
		treasuryPoolRatio: (number | string | BN),
		pandoraPoolRatio: (number | string | BN),
		adminAddress: ArgumentTypes.AccountId,
		betazAddress: ArgumentTypes.AccountId,
		betTokenAddress: ArgumentTypes.AccountId,
		stakingAddress: ArgumentTypes.AccountId,
		treasuryAddress: ArgumentTypes.AccountId,
		pandoraAddress: ArgumentTypes.AccountId,
		oracleRandomnessAddress: ArgumentTypes.AccountId,
		daoAddress: ArgumentTypes.AccountId,
		__options ? : ConstructorOptions,
   	) {
   		const __contract = JSON.parse(ContractFile);
		const code = new CodePromise(this.nativeAPI, __contract, __contract.source.wasm);
		const gasLimit = (await _genValidGasLimitAndValue(this.nativeAPI, __options)).gasLimit as WeightV2;

		const storageDepositLimit = __options?.storageDepositLimit;
			const tx = code.tx["new"]!({ gasLimit, storageDepositLimit, value: __options?.value }, maxBetRatio, tokenRatio, minOverNumber, maxOverNumber, minUnderNumber, maxUnderNumber, corePoolRatio, stakingPoolRatio, treasuryPoolRatio, pandoraPoolRatio, adminAddress, betazAddress, betTokenAddress, stakingAddress, treasuryAddress, pandoraAddress, oracleRandomnessAddress, daoAddress);
			let response;

			try {
				response = await _signAndSend(this.nativeAPI.registry, tx, this.signer, (event: any) => event);
			}
			catch (error) {
				console.log(error);
			}

		return {
			result: response as SignAndSendSuccessResponse,
			// @ts-ignore
			address: (response as SignAndSendSuccessResponse)!.result!.contract.address.toString(),
		};
	}
}