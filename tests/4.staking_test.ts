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

    // betaz random contract
    let randomContractAddress: any;
    let randomContract: any;
    let randomQuery: any;
    let randomTx: any;

    let oracleRandomnessAddress: string;

    // betaz token contract
    let tokenContractAddress: any;
    let tokenContract: any;
    let tokenQuery: any;
    let tokenTx: any;

    let tokenName: string;
    let tokenSymbol: string;
    let tokenDecimal: number;
    let tokenMinter: string;
    let tokenAdminer: string;

    // staking pool contract
    let stakingContractAddress: any;
    let stakingContract: any;
    let stakingQuery: any;
    let stakingTx: any;

    let stakingAdminAddress: string;
    let stakingTokenContractAddress: string;
    let stakingLimitUnstakeTime: number;

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

        /** step 1: create random contract */
        console.log(`===========Create new random contract=============`);

        try {
            oracleRandomnessAddress = '5CSQdMyKCxtoeVsBC8xbufeapux3YDV74eYXcHV4UKUu1NeF';

            // "refTime: 650578413"
            // "proofSize: 17324"
            let gasLimit = setGasLimit(api, 960_000_000, 24_000);

            const contractFactory = new ConstructorsBetazRandom(api, defaultSigner);

            randomContractAddress = (
                await contractFactory.new(
                    oracleRandomnessAddress,
                    { gasLimit }
                )
            ).address;

            console.log({ randomContractAddress });

            randomContract = new ContractBetazRandom(randomContractAddress, defaultSigner, api);

            randomQuery = randomContract.query;
            randomTx = randomContract.tx;
        } catch (error) {
            console.log("Step 1 ERROR:", error)
        }

        /** step 2: create betaz token contract */
        console.log(`===========Create new betaz token contract=============`);

        try {
            tokenName = "BETAZ TOKEN TESTNET";
            tokenSymbol = "BETAZ";
            tokenDecimal = 12;
            tokenMinter = minter.address;
            tokenAdminer = adminer.address;

            // "refTime: 4931191494"
            // "proofSize: 25009"
            let gasLimit = setGasLimit(api, 9_600_000_000, 36_000);

            const contractFactory = new ConstructorsBetazToken(api, defaultSigner);

            tokenContractAddress = (
                await contractFactory.new(
                    tokenName,
                    tokenSymbol,
                    tokenDecimal,
                    tokenMinter,
                    tokenAdminer,
                    { gasLimit }
                )
            ).address;

            console.log({ tokenContractAddress });

            tokenContract = new ContractBetazToken(tokenContractAddress, defaultSigner, api);

            tokenQuery = tokenContract.query;
            tokenTx = tokenContract.tx;
        } catch (error) {
            console.log("Step 2 ERROR:", error)
        }

        /** step 3: create staking contract */
        console.log(`===========Create new staking contract=============`);

        try {
            stakingAdminAddress = adminer.address;
            stakingTokenContractAddress = adminer.address;
            stakingLimitUnstakeTime = 24000;

            // "refTime: 3036063403"
            // "proofSize: 21779"
            let gasLimit = setGasLimit(api, 9_600_000_000, 36_000);

            const contractFactory = new ConstructorsStaking(api, defaultSigner);

            stakingContractAddress = (
                await contractFactory.new(
                    stakingAdminAddress,
                    stakingTokenContractAddress,
                    stakingLimitUnstakeTime,
                    { gasLimit }
                )
            ).address;

            console.log({ stakingContractAddress });

            stakingContract = new ContractStaking(stakingContractAddress, defaultSigner, api);

            stakingQuery = stakingContract.query;
            stakingTx = stakingContract.tx;
        } catch (error) {
            console.log("Step 4 ERROR:", error)
        }

        /** step 4: create core contract */
        console.log(`===========Create new core contract=============`);

        try {
            coreMaxBetRatio = 10;
            coreTokenRatio = 1;
            coreMinOverNumber = 4;
            coreMaxOverNumber = 98;
            coreMinUnderNumber = 1;
            coreMaxUnderNumber = 95;
            corePoolRatio = 50;
            stakingPoolRatio = 20;
            treasuryPoolRatio = 15;
            pandoraPoolRatio = 10;
            coreAdminAddress = adminer.address;
            coreBetazAddress = defaultSigner.address;
            coreTokenContractAddress = tokenContractAddress;
            coreStakingAddress = stakingContractAddress;
            coreTreasuryAddress = stakingContractAddress;
            corePandoraAddress = stakingContractAddress;
            coreOracleRandomnessAddress = randomContractAddress;
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
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });

    it('Can initialize', async () => {
        // Check owner
        let owner = (await stakingQuery.owner()).value.ok!.toString();
        expect(owner).to.equal(signerAddress);

        // Check stakingTokenContractAddress
        let betaz_token_address = (await stakingQuery.getBetazTokenAddress()).value.ok!.toString();
        expect(betaz_token_address).to.equal(stakingTokenContractAddress);

        // Check stakingLimitUnstakeTime
        let unstake_time = (await stakingQuery.getLimitUnstakeTime()).value.ok!;
        expect(unstake_time).to.equal(stakingLimitUnstakeTime);
    });

    it('Can update initialize', async () => {
        const new_stakingTokenContractAddress = tokenContractAddress;
        const new_stakingLimitUnstakeTime = 40000;

        // Check stakingTokenContractAddress
        await stakingTx.setBetazTokenAddress(new_stakingTokenContractAddress)
        let betaz_token_address = (await stakingQuery.getBetazTokenAddress()).value.ok!.toString();
        expect(betaz_token_address).to.equal(new_stakingTokenContractAddress);

        // Check stakingLimitUnstakeTime
        await stakingTx.setLimitUnstakeTime(new_stakingLimitUnstakeTime)
        let unstake_time = (await stakingQuery.getLimitUnstakeTime()).value.ok!;
        expect(unstake_time).to.equal(new_stakingLimitUnstakeTime);
    });

    it('Can update is locked', async () => {
        // locked is false
        let is_locked = (await stakingQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(false);

        // set locked to true
        await stakingTx.updateIsLocked(true);
        is_locked = (await stakingQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(true);

        // set locked to false
        await stakingTx.updateIsLocked(false);
        is_locked = (await stakingQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(false);
    });

    it('Can update is locked', async () => {
        // locked is false
        let is_reward_started = (await stakingQuery.getRewardStarted()).value.ok!;
        let is_locked = (await stakingQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(false);
        expect(is_reward_started).to.equal(false);

        // update Status Reward Distribution
        /// case 1: is locked false => failed
        console.log(`===========Case 1=============`);
        try {
            await stakingTx.updateStatusRewardDistribution(true);
        } catch (error) {

        }

        is_reward_started = (await stakingQuery.getRewardStarted()).value.ok!;
        expect(is_reward_started).to.equal(false);

        /// case 2: is locked true => success
        console.log(`===========Case 2=============`);
        await stakingTx.updateIsLocked(true);
        is_locked = (await stakingQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(true);
        try {
            await stakingTx.updateStatusRewardDistribution(true);
        } catch (error) {

        }

        /// back to origin
        await stakingTx.updateStatusRewardDistribution(false);
        await stakingTx.updateIsLocked(false);
    });

    it('Can stake', async () => {
        // Step 1: mint tokens to alice
        console.log(`===========Step 1=============`);
        let alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        let staking_contract_token_balance = (await tokenQuery.balanceOf(stakingContractAddress)).value.ok!;
        const amount = new BN(100 * (10 ** tokenDecimal));
        console.log({ alice_token_balance: toNumber(alice_token_balance) })

        try {
            await tokenContract.withSigner(minter).tx["betAzTrait::mint"](aliceAddress, amount);
        } catch (error) {
            console.log({ error })
        }

        alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        console.log({ new_alice_token_balance: toNumber(alice_token_balance) });
        // Step 2: approve tokens to contract
        console.log(`===========Step 2=============`);
        await tokenContract.withSigner(alice).tx.increaseAllowance(stakingContractAddress, amount);

        //  check allowance
        const allowance = (await tokenQuery.allowance(aliceAddress, stakingContractAddress)).value.ok!;
        expect(toNumber(allowance)).to.equal(toNumber(amount));
        // Step 3: stake
        console.log(`===========Step 3=============`);
        // case 1: locked false && reward started false => success
        console.log(`===========Step 3 - case 1=============`);

        let stake_amount = new BN(10 * (10 ** 12));
        try {
            await stakingContract.withSigner(alice).tx.stake(stake_amount);
        } catch (error) {
            console.log({ error })
        }

        let new_alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        let gain = new BN(alice_token_balance.toString()).sub(new BN(new_alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(toNumber(stake_amount));
        let new_staking_contract_token_balance = (await tokenQuery.balanceOf(stakingContractAddress)).value.ok!;
        gain = new BN(new_staking_contract_token_balance.toString()).sub(new BN(staking_contract_token_balance.toString()))
        expect(toNumber(gain)).to.equal(toNumber(stake_amount));
        console.log({
            new_alice_token_balance: toNumber(new_alice_token_balance),
            new_staking_contract_token_balance: toNumber(new_staking_contract_token_balance)
        });

        // case 2: locked true => failed
        console.log(`===========Step 3 - case 2=============`);
        alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        staking_contract_token_balance = (await tokenQuery.balanceOf(stakingContractAddress)).value.ok!;

        // set locked true
        await stakingTx.updateIsLocked(true);
        let is_locked = (await stakingQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(true);

        stake_amount = new BN(1 * (10 ** 12));
        try {
            await stakingContract.withSigner(alice).tx.stake(stake_amount);
        } catch (error) {

        }

        new_alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        gain = new BN(alice_token_balance.toString()).sub(new BN(new_alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(0);
        new_staking_contract_token_balance = (await tokenQuery.balanceOf(stakingContractAddress)).value.ok!;
        gain = new BN(new_staking_contract_token_balance.toString()).sub(new BN(staking_contract_token_balance.toString()))
        expect(toNumber(gain)).to.equal(0);

        // case 3: reward started true && locked false => failed
        console.log(`===========Step 3 - case 3=============`);

        // set reward started true
        alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        staking_contract_token_balance = (await tokenQuery.balanceOf(stakingContractAddress)).value.ok!;

        await stakingTx.updateStatusRewardDistribution(true);
        let is_reward_started = (await stakingQuery.getRewardStarted()).value.ok!;
        expect(is_reward_started).to.equal(true);

        await stakingTx.updateIsLocked(false);

        stake_amount = new BN(1 * (10 ** 12));
        try {
            await stakingContract.withSigner(alice).tx.stake(stake_amount);
        } catch (error) {

        }

        new_alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        gain = new BN(alice_token_balance.toString()).sub(new BN(new_alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(0);
        new_staking_contract_token_balance = (await tokenQuery.balanceOf(stakingContractAddress)).value.ok!;
        gain = new BN(new_staking_contract_token_balance.toString()).sub(new BN(staking_contract_token_balance.toString()))
        expect(toNumber(gain)).to.equal(0);

        // back to origin
        await stakingTx.updateIsLocked(true);
        await stakingTx.updateStatusRewardDistribution(false);
        await stakingTx.updateIsLocked(false);
    });

    it('Can request unstake', async () => {
        let staked_amount = (await stakingQuery.getStakeAmountByAccount(aliceAddress)).value.ok!;

        console.log({
            staked_amount: toNumber(staked_amount)
        })
        // case 1: staked_amount < amount => failed
        console.log(`===========Case 1=============`);
        let amount = new BN(1).add(new BN(staked_amount.toString()))

        try {
            await stakingContract.withSigner(alice).tx.requestUnstake(amount);
        } catch (error) {

        }

        let new_staked_amount = (await stakingQuery.getStakeAmountByAccount(aliceAddress)).value.ok!;
        let gain = new BN(staked_amount.toString()).sub(new BN(new_staked_amount.toString()))
        expect(toNumber(gain)).to.equal(0);

        // case 2: staked_amount >= amount => sucess
        console.log(`===========Case 2=============`);

        amount = new BN(1 * (10 ** 12));
        gain = new BN(staked_amount.toString()).sub(new BN(amount.toString()))
        expect(toNumber(gain) > 0).to.equal(true);

        try {
            await stakingContract.withSigner(alice).tx.requestUnstake(amount);
        } catch (error) {
            console.log({ error })
        }

        new_staked_amount = (await stakingQuery.getStakeAmountByAccount(aliceAddress)).value.ok!;
        gain = new BN(staked_amount.toString()).sub(new BN(new_staked_amount.toString()))
        expect(toNumber(gain)).to.equal(toNumber(amount));

        console.log({
            new_staked_amount: toNumber(new_staked_amount)
        })

        // case 3: staked_amount >= amount and locked true => failed
        console.log(`===========Case 3=============`);

        // set locked true
        await stakingTx.updateIsLocked(true);
        let is_locked = (await stakingQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(true);

        staked_amount = (await stakingQuery.getStakeAmountByAccount(aliceAddress)).value.ok!;

        try {
            await stakingContract.withSigner(alice).tx.requestUnstake(amount);
        } catch (error) {

        }

        new_staked_amount = (await stakingQuery.getStakeAmountByAccount(aliceAddress)).value.ok!;
        gain = new BN(staked_amount.toString()).sub(new BN(new_staked_amount.toString()))
        expect(toNumber(gain)).to.equal(0);

        // back to origin
        await stakingTx.updateIsLocked(false);
    });

    it('Can cancel request unstake', async () => {
        let staked_amount = (await stakingQuery.getStakeAmountByAccount(aliceAddress)).value.ok!;

        console.log({
            staked_amount: toNumber(staked_amount)
        })

        // case 1: locked false => sucess
        console.log(`===========Case 1=============`);

        let amount = new BN(1 * (10 ** 12));
        let gain = new BN(staked_amount.toString()).sub(new BN(amount.toString()))
        expect(toNumber(gain) > 0).to.equal(true);

        // alice is first user request unstake => index 0
        try {
            await stakingContract.withSigner(alice).tx.cancelRequestUnstake(0);
        } catch (error) {
            console.log({ error })
        }

        let new_staked_amount = (await stakingQuery.getStakeAmountByAccount(aliceAddress)).value.ok!;
        gain = new BN(new_staked_amount.toString()).sub(new BN(staked_amount.toString()))
        expect(toNumber(gain)).to.equal(toNumber(amount));

        console.log({
            new_staked_amount: toNumber(new_staked_amount)
        })

        // case 2: locked true => failed
        console.log(`===========Case 2=============`);

        // set locked true
        await stakingTx.updateIsLocked(true);
        let is_locked = (await stakingQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(true);

        staked_amount = (await stakingQuery.getStakeAmountByAccount(aliceAddress)).value.ok!;

        try {
            await stakingContract.withSigner(alice).tx.cancelRequestUnstake(0);
        } catch (error) {

        }

        new_staked_amount = (await stakingQuery.getStakeAmountByAccount(aliceAddress)).value.ok!;
        gain = new BN(new_staked_amount.toString()).sub(new BN(staked_amount.toString()))
        expect(toNumber(gain)).to.equal(0);

        // back to origin
        await stakingTx.updateIsLocked(false);
    });

    it('Can unstake', async () => {
        // step 1: request unstake
        console.log(`===========Step 1=============`);

        let amount = new BN(1 * (10 ** 12));

        try {
            await stakingContract.withSigner(alice).tx.requestUnstake(amount);
        } catch (error) {
            console.log({ error })
        }

        // request index 0
        let index = 0;
        let request_unstake_time = (await stakingQuery.getRequestUnstakeTime(aliceAddress, 0)).value.ok!;
        let end_time_request_unstake = request_unstake_time + stakingLimitUnstakeTime;
        console.log({ request_unstake_time, end_time_request_unstake })

        // step 2: unstake
        console.log(`===========Step 2=============`);
        let alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;

        console.log({
            alice_token_balance: toNumber(alice_token_balance)
        })

        // case 1: locked true => failed
        console.log(`===========Step 2 - Case 1=============`);

        // set locked true
        await stakingTx.updateIsLocked(true);
        let is_locked = (await stakingQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(true);

        try {
            await stakingContract.withSigner(alice).tx.unstake({ u128: index });
        } catch (error) {

        }

        let new_alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        let gain = new BN(new_alice_token_balance.toString()).sub(new BN(alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(0);

        // back to origin
        await stakingTx.updateIsLocked(false);

        // case 2: locked false and current_time > end_time_request_unstake => sucess
        console.log(`===========Step 2 - Case 2=============`);

        let current_time = new Date().getTime();
        console.log({ current_time, end_time_request_unstake })
        expect(end_time_request_unstake - current_time > 0).equal(true);
        try {
            await stakingContract.withSigner(alice).tx.unstake({ u128: index });
        } catch (error) {

        }

        new_alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        gain = new BN(new_alice_token_balance.toString()).sub(new BN(alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(0);

        // case 3: locked false and current_time > end_time_request_unstake => success
        console.log(`===========Step 2 - Case 3=============`);
        current_time = new Date().getTime();
        console.log({ current_time, end_time_request_unstake })
        if (current_time < end_time_request_unstake) {
            let time = end_time_request_unstake - current_time + 2000 // delay + 2s;
            console.log(`delay to end time: ${time}`)
            await delay(time)
        }
        try {
            await stakingContract.withSigner(alice).tx.unstake({ u128: index });
        } catch (error) {
            console.log(error)
        }

        new_alice_token_balance = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        gain = new BN(new_alice_token_balance.toString()).sub(new BN(alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(toNumber(amount));

        console.log({
            new_alice_token_balance: toNumber(new_alice_token_balance)
        })
    });


    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});