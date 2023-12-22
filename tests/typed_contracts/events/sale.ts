import type * as EventTypes from '../event-types/sale';
import type {ContractPromise} from "@polkadot/api-contract";
import type {ApiPromise} from "@polkadot/api";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/sale.json';
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

	public subscribeOnSalePoolBuyEventEvent(callback : (event : EventTypes.SalePoolBuyEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('SalePoolBuyEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.SalePoolBuyEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'SalePoolBuyEvent');
	}

	public subscribeOnAddWhitelistEventEvent(callback : (event : EventTypes.AddWhitelistEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AddWhitelistEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AddWhitelistEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AddWhitelistEvent');
	}

	public subscribeOnUpdateWhitelistEventEvent(callback : (event : EventTypes.UpdateWhitelistEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('UpdateWhitelistEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.UpdateWhitelistEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'UpdateWhitelistEvent');
	}

	public subscribeOnRemoveWhitelistEventEvent(callback : (event : EventTypes.RemoveWhitelistEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('RemoveWhitelistEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.RemoveWhitelistEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'RemoveWhitelistEvent');
	}

	public subscribeOnWhitelistBuyEventEvent(callback : (event : EventTypes.WhitelistBuyEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WhitelistBuyEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WhitelistBuyEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WhitelistBuyEvent');
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

	public subscribeOnBurnTokenEventEvent(callback : (event : EventTypes.BurnTokenEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('BurnTokenEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.BurnTokenEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'BurnTokenEvent');
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