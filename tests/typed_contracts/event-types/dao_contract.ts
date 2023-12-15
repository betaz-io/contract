import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/dao_contract';

export interface UpdatePoolsRatio {
	corePoolRatio: number;
	stakingPoolRatio: number;
	pandoraPoolRatio: number;
	treasuryPoolRatio: number;
}

