import { provider, expect, getSigners, checkAccountsBalance, showAZBalance, delay, decodeToBytes, toString, toNumber, setGasLimit } from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsBetazRandom from "./typed_contracts/constructors/betaz_random";
import ContractBetazRandom from "./typed_contracts/contracts/betaz_random";

import ConstructorsBetazToken from "./typed_contracts/constructors/bet_token";
import ContractBetazToken from "./typed_contracts/contracts/bet_token";

import ConstructorsStaking from "./typed_contracts/constructors/staking";
import ContractStaking from "./typed_contracts/contracts/staking";

import ConstructorsPandora from "./typed_contracts/constructors/pandora";
import ContractPandora from "./typed_contracts/contracts/pandora";

import ConstructorsCore from "./typed_contracts/constructors/beta0_core";
import ContractCore from "./typed_contracts/contracts/beta0_core";

import ConstructorsDao from "./typed_contracts/constructors/dao_contract";
import ContractDao from "./typed_contracts/contracts/dao_contract";

import { BN } from '@polkadot/util';
import { txSignAndSend } from '@727-ventures/typechain-types';

describe('Betaz token test', () => {
    let api: any;
    let signers: any;
    let defaultSigner: any;
    let alice: any;
    let bob: any;
    let minter: any;
    let adminer: any;
    let player1: any;
    let player2: any;
    let player3: any;
    let player4: any;
    let RoleType: number;

    // dao contract
    let daoContractAddress: any;
    let daoContract: any;
    let daoQuery: any;
    let daoTx: any;

    let daoAdminAddress: string;
    let daoCoreContractAddress: string;

    // betaz core contract
    let coreContractAddress: any;
    let coreContract: any;
    let coreQuery: any;
    let coreTx: any;

    let coreMaxBetRatio: number;
    let coreTokenRatio: number;
    let coreMinOverNumber: number;
    let coreMaxOverNumber: number;
    let coreMinUnderNumber: number;
    let coreMaxUnderNumber: number;
    let corePoolRatio: number;
    let stakingPoolRatio: number;
    let treasuryPoolRatio: number;
    let pandoraPoolRatio: number;
    let coreAdminAddress: string;
    let coreBetazAddress: string;
    let coreTokenContractAddress: string;
    let coreStakingAddress: string;
    let coreTreasuryAddress: string;
    let corePandoraAddress: string;
    let coreOracleRandomnessAddress: string;
    let coreDaoAddress: string;

    let overRates: any;
    let underRates: any;

    // caller address
    let signerAddress: string;
    let aliceAddress: string;
    let bobAddress: string;

    async function setup() {
        api = await ApiPromise.create({ provider });

        signers = getSigners();
        alice = signers[0];
        bob = signers[1];
        defaultSigner = signers[2];
        minter = signers[3];
        adminer = signers[4];
        player1 = signers[5];
        player2 = signers[6];
        player3 = signers[7];
        player4 = signers[8];
        RoleType = 3739740293;

        await checkAccountsBalance(signers, api);

        // Get current network's status
        const [chain, header] = await Promise.all([
            await api.rpc.system.chain(),
            await api.rpc.chain.getHeader(),
        ])
        console.log(`${chain}: last block #${header.number} has hash ${header.hash}`);

        signerAddress = defaultSigner.address;
        aliceAddress = alice.address;
        bobAddress = bob.address;

        /** step 1: create core contract */
        console.log(`===========Create new core contract=============`);

        try {
            coreMaxBetRatio = 10;
            coreTokenRatio = 1;
            coreMinOverNumber = 4;
            coreMaxOverNumber = 98;
            coreMinUnderNumber = 1;
            coreMaxUnderNumber = 95;
            corePoolRatio = 5;
            stakingPoolRatio = 2;
            treasuryPoolRatio = 2;
            pandoraPoolRatio = 1;
            coreAdminAddress = adminer.address;
            coreBetazAddress = defaultSigner.address;
            coreTokenContractAddress = defaultSigner.address;
            coreStakingAddress = defaultSigner.address;
            coreTreasuryAddress = defaultSigner.address;
            corePandoraAddress = defaultSigner.address;
            coreOracleRandomnessAddress = defaultSigner.address;
            coreDaoAddress = defaultSigner.address;

            // "refTime: 704987102"
            // "proofSize: 16992"
            let gasLimit = setGasLimit(api, 9_600_000_000, 48_000);

            const contractFactory = new ConstructorsCore(api, defaultSigner);

            coreContractAddress = (
                await contractFactory.new(
                    coreMaxBetRatio,
                    coreTokenRatio,
                    coreMinOverNumber,
                    coreMaxOverNumber,
                    coreMinUnderNumber,
                    coreMaxUnderNumber,
                    corePoolRatio,
                    stakingPoolRatio,
                    treasuryPoolRatio,
                    pandoraPoolRatio,
                    coreAdminAddress,
                    coreBetazAddress,
                    coreTokenContractAddress,
                    coreStakingAddress,
                    coreTreasuryAddress,
                    corePandoraAddress,
                    coreOracleRandomnessAddress,
                    coreDaoAddress,
                    { gasLimit }
                )
            ).address;

            console.log({ coreContractAddress });

            coreContract = new ContractCore(coreContractAddress, defaultSigner, api);

            coreQuery = coreContract.query;
            coreTx = coreContract.tx;
        } catch (error) {
            console.log("Step 6 ERROR:", error)
        }

        /** step 2: create core dao */
        console.log(`===========Create new dao contract=============`);

        try {
            daoAdminAddress = adminer.address;
            daoCoreContractAddress = aliceAddress;

            // "refTime: 2980056540"
            // "proofSize: 21779"
            let gasLimit = setGasLimit(api, 9_600_000_000, 48_000);

            const contractFactory = new ConstructorsDao(api, defaultSigner);

            daoContractAddress = (
                await contractFactory.new(
                    daoAdminAddress,
                    daoCoreContractAddress,
                    { gasLimit }
                )
            ).address;

            console.log({ daoContractAddress });

            daoContract = new ContractDao(daoContractAddress, defaultSigner, api);

            daoQuery = daoContract.query;
            daoTx = daoContract.tx;
        } catch (error) {
            console.log("Step 6 ERROR:", error)
        }
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });

    it('Can update initialize', async () => {
        const new_daoCoreContractAddress = coreContractAddress;

        // Check dao core contract address
        await daoTx.setCoreAddress(new_daoCoreContractAddress)
        let core_address = (await daoQuery.getCoreAddress()).value.ok!.toString();
        expect(core_address).to.equal(new_daoCoreContractAddress);
    });

    it('Can update Pools Ratio Core Contract', async () => {
        let core_pool_ratio = (await coreQuery.getCorePoolRatio()).value.ok!;
        let staking_pool_ratio = (await coreQuery.getStakingPoolRatio()).value.ok!;
        let treasury_pool_ratio = (await coreQuery.getTreasuryPoolRatio()).value.ok!;
        let pandora_pool_ratio = (await coreQuery.getPandoraPoolRatio()).value.ok!;
        console.log({ core_pool_ratio, staking_pool_ratio, pandora_pool_ratio, treasury_pool_ratio });

        let core = 45;
        let staking = 15;
        let pandora = 20;
        let treasury = 15;
        // set dao address
        await coreTx.setDaoAddress(daoContractAddress);

        // Check dao core contract address
        await daoTx.updatePoolsRatioCoreContract(core, staking, pandora, treasury)

        let new_core_pool_ratio = (await coreQuery.getCorePoolRatio()).value.ok!;
        let new_staking_pool_ratio = (await coreQuery.getStakingPoolRatio()).value.ok!;
        let new_treasury_pool_ratio = (await coreQuery.getTreasuryPoolRatio()).value.ok!;
        let new_pandora_pool_ratio = (await coreQuery.getPandoraPoolRatio()).value.ok!;
        expect(new_core_pool_ratio).to.equal(core);
        expect(new_staking_pool_ratio).to.equal(staking);
        expect(new_pandora_pool_ratio).to.equal(pandora);
        expect(new_treasury_pool_ratio).to.equal(treasury);
        console.log({ new_core_pool_ratio, new_staking_pool_ratio, new_pandora_pool_ratio, new_treasury_pool_ratio });
    });

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});