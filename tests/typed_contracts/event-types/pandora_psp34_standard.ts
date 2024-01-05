import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/pandora_psp34_standard';

export interface PublicBuyEvent {
	buyer: ReturnTypes.AccountId | null;
	amounts: number;
	betazPrice: ReturnNumber;
}

