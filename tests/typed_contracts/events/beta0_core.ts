import type * as EventTypes from '../event-types/beta0_core';
import type {ContractPromise} from "@polkadot/api-contract";
import type {ApiPromise} from "@polkadot/api";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/beta0_core.json';
import {getEventTypeDescription} from "../shared/utils";
import {handleEventReturn} from "@727-ventures/typechain-types";

export default class EventsClass {
	readonly __nativeContract : ContractPromise;
	readonly __api : ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		api : ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__api = api;
	}

	public subscribeOnWinEventEvent(callback : (event : EventTypes.WinEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WinEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WinEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WinEvent');
	}

	public subscribeOnLoseEventEvent(callback : (event : EventTypes.LoseEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('LoseEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.LoseEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'LoseEvent');
	}

	public subscribeOnPlayEventEvent(callback : (event : EventTypes.PlayEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('PlayEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.PlayEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'PlayEvent');
	}

	public subscribeOnTransferStakingPoolEventEvent(callback : (event : EventTypes.TransferStakingPoolEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('TransferStakingPoolEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.TransferStakingPoolEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'TransferStakingPoolEvent');
	}

	public subscribeOnTransferPandoraPoolEventEvent(callback : (event : EventTypes.TransferPandoraPoolEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('TransferPandoraPoolEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.TransferPandoraPoolEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'TransferPandoraPoolEvent');
	}

	public subscribeOnTransferTreasuryPoolEventEvent(callback : (event : EventTypes.TransferTreasuryPoolEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('TransferTreasuryPoolEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.TransferTreasuryPoolEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'TransferTreasuryPoolEvent');
	}

	public subscribeOnMintTokenEventEvent(callback : (event : EventTypes.MintTokenEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('MintTokenEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.MintTokenEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'MintTokenEvent');
	}


	private __subscribeOnEvent(
		callback : (args: any[], event: any) => void,
		filter : (eventName: string) => boolean = () => true
	) {
		// @ts-ignore
		return this.__api.query.system.events((events) => {
			events.forEach((record: any) => {
				const { event } = record;

				if (event.method == 'ContractEmitted') {
					const [address, data] = record.event.data;

					if (address.toString() === this.__nativeContract.address.toString()) {
						const {args, event} = this.__nativeContract.abi.decodeEvent(data);

						if (filter(event.identifier.toString()))
							callback(args, event);
					}
				}
			});
		});
	}

}