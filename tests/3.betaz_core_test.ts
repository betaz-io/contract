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

    // treasury pool contract
    let treasuryContractAddress: any;

    // staking pool contract
    let stakingContractAddress: any;
    let stakingContract: any;
    let stakingQuery: any;
    let stakingTx: any;

    let stakingAdminAddress: string;
    let stakingTokenContractAddress: string;
    let stakingLimitUnstakeTime: number;

    // pandora pool contract
    let pandoraContractAddress: any;
    let pandoraContract: any;
    let pandoraQuery: any;
    let pandoraTx: any;

    let pandoraName: string;
    let pandoraSymbol: string;
    let pandoraAdminAddress: string;
    let pandoraTokenContractAddress: string;
    let publicMintPrice: any;
    let sessionTotalTicketAmount: number;
    let maxBetNumber: number;

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

        /** step 3: create treasury contract */
        console.log(`===========Create new treasury contract=============`);
        try {
            treasuryContractAddress = signers[9].address;
            console.log({ treasuryContractAddress })
        } catch (error) {
            console.log("Step 3 ERROR:", error)
        }

        /** step 4: create staking contract */
        console.log(`===========Create new staking contract=============`);

        try {
            stakingAdminAddress = adminer.address;
            stakingTokenContractAddress = tokenContractAddress;
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

        /** step 5: create pandora contract */
        console.log(`===========Create new pandora contract=============`);

        try {
            pandoraName = "BETAZ TICKET TESTNET";
            pandoraSymbol = "BETAZ";
            pandoraAdminAddress = adminer.address;
            pandoraTokenContractAddress = tokenContractAddress;
            publicMintPrice = new BN(10 * (10 ** tokenDecimal));
            sessionTotalTicketAmount = 1000000;
            maxBetNumber = 1000000

            // "refTime: 2673200605"
            // "proofSize: 21147"
            let gasLimit = setGasLimit(api, 3_600_000_000, 36_000);

            const contractFactory = new ConstructorsPandora(api, defaultSigner);

            pandoraContractAddress = (
                await contractFactory.new(
                    pandoraName,
                    pandoraSymbol,
                    pandoraAdminAddress,
                    pandoraTokenContractAddress,
                    publicMintPrice,
                    sessionTotalTicketAmount,
                    maxBetNumber,
                    { gasLimit }
                )
            ).address;

            console.log({ pandoraContractAddress });

            pandoraContract = new ContractPandora(pandoraContractAddress, defaultSigner, api);

            pandoraQuery = pandoraContract.query;
            pandoraTx = pandoraContract.tx;
        } catch (error) {
            console.log("Step 5 ERROR:", error)
        }

        /** step 6: create core contract */
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
            coreTokenContractAddress = tokenContractAddress;
            coreStakingAddress = stakingContractAddress;
            coreTreasuryAddress = treasuryContractAddress;
            corePandoraAddress = pandoraContractAddress;
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

    // it('Can initialize', async () => {
    //     // Check owner
    //     let owner = (await coreQuery.owner()).value.ok!.toString();
    //     expect(owner).to.equal(signerAddress);

    //     // Check max bet ratio
    //     let max_bet_ratio = (await coreQuery.getMaxBetRatio()).value.ok!;
    //     expect(max_bet_ratio).to.equal(coreMaxBetRatio);

    //     // Check token ratio 
    //     let token_ratio = (await coreQuery.getTokenRatio()).value.ok!;
    //     expect(token_ratio).to.equal(coreTokenRatio);

    //     // Check min over number
    //     let min_over_number = (await coreQuery.getMinNumberOverRoll()).value.ok!;
    //     expect(min_over_number).to.equal(coreMinOverNumber);

    //     // Check max over number
    //     let max_over_number = (await coreQuery.getMaxNumberOverRoll()).value.ok!;
    //     expect(max_over_number).to.equal(coreMaxOverNumber);

    //     // Check min under number
    //     let min_under_number = (await coreQuery.getMinNumberUnderRoll()).value.ok!;
    //     expect(min_under_number).to.equal(coreMinUnderNumber);

    //     // Check max under number
    //     let max_under_number = (await coreQuery.getMaxNumberUnderRoll()).value.ok!;
    //     expect(max_under_number).to.equal(coreMaxUnderNumber);

    //     // Check core pool ratio
    //     let core_pool_ratio = (await coreQuery.getCorePoolRatio()).value.ok!;
    //     expect(core_pool_ratio).to.equal(corePoolRatio);

    //     // Check staking pool ratio
    //     let staking_pool_ratio = (await coreQuery.getStakingPoolRatio()).value.ok!;
    //     expect(staking_pool_ratio).to.equal(stakingPoolRatio);

    //     // Check treasury pool ratio
    //     let treasury_pool_ratio = (await coreQuery.getTreasuryPoolRatio()).value.ok!;
    //     expect(treasury_pool_ratio).to.equal(treasuryPoolRatio);

    //     // Check pandora pool ratio
    //     let pandora_pool_ratio = (await coreQuery.getPandoraPoolRatio()).value.ok!;
    //     expect(pandora_pool_ratio).to.equal(pandoraPoolRatio);

    //     // Check admin Address
    //     let is_admin_address = (await coreQuery.hasRole(RoleType, coreAdminAddress)).value.ok!;
    //     expect(is_admin_address).to.equal(true);

    //     // Check betaz Address
    //     let betaz_address = (await coreQuery.getBetazAddress()).value.ok!.toString();
    //     expect(betaz_address).to.equal(coreBetazAddress);

    //     // Check bet token address
    //     let bet_token_address = (await coreQuery.betTokenAddress()).value.ok!.toString();
    //     expect(bet_token_address).to.equal(coreTokenContractAddress);

    //     // check staking address
    //     let staking_address = (await coreQuery.getStakingAddress()).value.ok!;
    //     expect(staking_address).to.equal(coreStakingAddress);

    //     // check treasury address
    //     let treasury_address = (await coreQuery.getTreasuryAddress()).value.ok!;
    //     expect(treasury_address).to.equal(coreTreasuryAddress);

    //     // check pandora address
    //     let pandora_address = (await coreQuery.getPandoraAddress()).value.ok!;
    //     expect(pandora_address).to.equal(corePandoraAddress);

    //     // check random contract address
    //     let random_contract_address = (await coreQuery.getOracleRandomnessAddress()).value.ok!;
    //     expect(random_contract_address).to.equal(coreOracleRandomnessAddress);

    //     // check dao address
    //     let dao_address = (await coreQuery.getDaoAddress()).value.ok!;
    //     expect(dao_address).to.equal(coreDaoAddress);
    // });

    // it('Can update initialize', async () => {
    //     const new_coreMaxBetRatio = 100;
    //     const new_coreTokenRatio = 2;
    //     const new_coreMinOverNumber = 5;
    //     const new_coreMaxOverNumber = 99;
    //     const new_coreMinUnderNumber = 2;
    //     const new_coreMaxUnderNumber = 96;
    //     const new_corePoolRatio = 4;
    //     const new_stakingPoolRatio = 3;
    //     const new_treasuryPoolRatio = 3;
    //     const new_pandoraPoolRatio = 3;
    //     const new_coreAdminAddress = signerAddress;
    //     const new_coreBetazAddress = signerAddress;
    //     const new_coreTokenContractAddress = signerAddress;
    //     const new_coreStakingAddress = signerAddress;
    //     const new_coreTreasuryAddress = signerAddress;
    //     const new_corePandoraAddress = signerAddress;
    //     const new_coreOracleRandomnessAddress = signerAddress;
    //     const new_coreDaoAddress = signerAddress;
    //     const new_coreRoundDistance = 2;

    //     // Check max bet ratio
    //     await coreTx.setMaxBetRatio(new_coreMaxBetRatio)
    //     let max_bet_ratio = (await coreQuery.getMaxBetRatio()).value.ok!;
    //     expect(max_bet_ratio).to.equal(new_coreMaxBetRatio);

    //     // Check token ratio 
    //     await coreTx.setTokenRatio(new_coreTokenRatio)
    //     let token_ratio = (await coreQuery.getTokenRatio()).value.ok!;
    //     expect(token_ratio).to.equal(new_coreTokenRatio);

    //     // Check min over number
    //     await coreTx.setMinNumberOverRoll(new_coreMinOverNumber)
    //     let min_over_number = (await coreQuery.getMinNumberOverRoll()).value.ok!;
    //     expect(min_over_number).to.equal(new_coreMinOverNumber);

    //     // Check max over number
    //     await coreTx.setMaxNumberOverRoll(new_coreMaxOverNumber)
    //     let max_over_number = (await coreQuery.getMaxNumberOverRoll()).value.ok!;
    //     expect(max_over_number).to.equal(new_coreMaxOverNumber);

    //     // Check min under number
    //     await coreTx.setMinNumberUnderRoll(new_coreMinUnderNumber)
    //     let min_under_number = (await coreQuery.getMinNumberUnderRoll()).value.ok!;
    //     expect(min_under_number).to.equal(new_coreMinUnderNumber);

    //     // Check max under number
    //     await coreTx.setMaxNumberUnderRoll(new_coreMaxUnderNumber)
    //     let max_under_number = (await coreQuery.getMaxNumberUnderRoll()).value.ok!;
    //     expect(max_under_number).to.equal(new_coreMaxUnderNumber);

    //     // Check pool ratio
    //     await coreTx.setPoolRatio(new_corePoolRatio, new_stakingPoolRatio, new_pandoraPoolRatio, new_treasuryPoolRatio)
    //     let core_pool_ratio = (await coreQuery.getCorePoolRatio()).value.ok!;
    //     expect(core_pool_ratio).to.equal(new_corePoolRatio);
    //     let staking_pool_ratio = (await coreQuery.getStakingPoolRatio()).value.ok!;
    //     expect(staking_pool_ratio).to.equal(new_stakingPoolRatio);
    //     let pandora_pool_ratio = (await coreQuery.getPandoraPoolRatio()).value.ok!;
    //     expect(pandora_pool_ratio).to.equal(new_pandoraPoolRatio);
    //     let treasury_pool_ratio = (await coreQuery.getTreasuryPoolRatio()).value.ok!;
    //     expect(treasury_pool_ratio).to.equal(new_treasuryPoolRatio);

    //     // Check betaz Address
    //     await coreTx.setBetazAddress(new_coreBetazAddress)
    //     let betaz_address = (await coreQuery.getBetazAddress()).value.ok!.toString();
    //     expect(betaz_address).to.equal(new_coreBetazAddress);

    //     // Check bet token address
    //     await coreTx.setBetTokenAddress(new_coreTokenContractAddress)
    //     let bet_token_address = (await coreQuery.betTokenAddress()).value.ok!.toString();
    //     expect(bet_token_address).to.equal(new_coreTokenContractAddress);

    //     // check staking address
    //     await coreTx.setStakingAddress(new_coreStakingAddress)
    //     let staking_address = (await coreQuery.getStakingAddress()).value.ok!;
    //     expect(staking_address).to.equal(new_coreStakingAddress);

    //     // check treasury address
    //     await coreTx.setTreasuryAddress(new_coreTreasuryAddress)
    //     let treasury_address = (await coreQuery.getTreasuryAddress()).value.ok!;
    //     expect(treasury_address).to.equal(new_coreTreasuryAddress);

    //     // check pandora address
    //     await coreTx.setPandoraAddress(new_corePandoraAddress)
    //     let pandora_address = (await coreQuery.getPandoraAddress()).value.ok!;
    //     expect(pandora_address).to.equal(new_corePandoraAddress);

    //     // check random contract address
    //     await coreTx.setOracleRandomnessAddress(new_coreOracleRandomnessAddress)
    //     let random_contract_address = (await coreQuery.getOracleRandomnessAddress()).value.ok!;
    //     expect(random_contract_address).to.equal(new_coreOracleRandomnessAddress);

    //     // Check betaz Address
    //     await coreTx.setDaoAddress(new_coreDaoAddress)
    //     let dao_address = (await coreQuery.getDaoAddress()).value.ok!.toString();
    //     expect(dao_address).to.equal(new_coreDaoAddress);

    //     // check round distance
    //     await coreTx.setRoundDistance(new_coreRoundDistance)
    //     let round_distance = (await coreQuery.getRoundDistance()).value.ok!;
    //     expect(round_distance).to.equal(new_coreRoundDistance);

    //     // back to origin
    //     await coreTx.setMaxBetRatio(coreMaxBetRatio)
    //     await coreTx.setTokenRatio(coreTokenRatio)
    //     await coreTx.setMinNumberOverRoll(coreMinOverNumber)
    //     await coreTx.setMaxNumberOverRoll(coreMaxOverNumber)
    //     await coreTx.setMinNumberUnderRoll(coreMinUnderNumber)
    //     await coreTx.setMaxNumberUnderRoll(coreMaxUnderNumber)
    //     await coreTx.setPoolRatio(corePoolRatio, stakingPoolRatio, pandoraPoolRatio, treasuryPoolRatio)
    //     await coreTx.setBetazAddress(coreBetazAddress)
    //     await coreTx.setBetTokenAddress(coreTokenContractAddress)
    //     await coreTx.setStakingAddress(coreStakingAddress)
    //     await coreTx.setTreasuryAddress(coreTreasuryAddress)
    //     await coreTx.setPandoraAddress(corePandoraAddress)
    //     await coreTx.setOracleRandomnessAddress(coreOracleRandomnessAddress)
    //     await coreTx.setDaoAddress(coreDaoAddress)
    //     await coreTx.setRoundDistance(1)
    // });

    // it('Can update rate', async () => {
    //     overRates = (await coreQuery.getOverRates()).value.ok;
    //     underRates = (await coreQuery.getUnderRates()).value.ok!;
    //     const new_overRates = [0, 1, 2];
    //     const new_underRates = [3, 4, 5];

    //     // update rates
    //     await coreTx.setRates(new_overRates, new_underRates);
    //     const [newOverRates, newUnderRates] = await Promise.all([
    //         coreQuery.getOverRates(),
    //         coreQuery.getUnderRates()
    //     ])
    //     expect(newOverRates.value.ok![0]).to.equal(new_overRates[0]);
    //     expect(newUnderRates.value.ok![0]).to.equal(new_underRates[0]);

    //     // back to orign
    //     await coreTx.setRates(overRates, underRates);
    // });

    it('Can update core pool', async () => {
        let core_pool_amount = (await coreQuery.getCorePoolAmout()).value.ok!;
        console.log({ core_pool_amount: toNumber(core_pool_amount) })
        const fee = new BN(100 * (10 ** 12))

        /** Case 1: update when caller not adminer */
        console.log(`===========Case 1=============`);
        let hasRole = (await coreQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(hasRole).to.equal(false);
        try { await coreContract.withSigner(alice).tx.updateCorePool({ value: fee }); } catch {

        }

        let new_core_pool_amount = (await coreQuery.getCorePoolAmout()).value.ok!;
        let gain = new BN(new_core_pool_amount.toString()).sub(new BN(core_pool_amount.toString()))
        expect(toNumber(gain)).to.equal(0);

        /** Case 2: update when caller is adminer */
        console.log(`===========Case 2=============`);
        hasRole = (await coreQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(hasRole).to.equal(true);
        try { await coreContract.withSigner(defaultSigner).tx.updateCorePool({ value: fee }); } catch (err) {
            console.log({ err })
        }

        new_core_pool_amount = (await coreQuery.getCorePoolAmout()).value.ok!;
        gain = new BN(new_core_pool_amount.toString()).sub(new BN(core_pool_amount.toString()))
        expect(toNumber(gain)).to.equal(toNumber(fee));
        console.log({ new_core_pool_amount: toNumber(new_core_pool_amount) })
    });

    // it('Can play is over', async () => {
    //     const isOver = 1;
    //     const max_bet = (await coreQuery.getMaxBet()).value.ok.rawNumber;
    //     console.log({ max_bet: toNumber(max_bet) })
    //     let balanceContract = await showAZBalance(api, coreContractAddress);
    //     console.log({ balanceContract })
    //     /** Player 1 play */
    //     // case 1: bet_amount > max_bet => failed
    //     console.log(`===========Case 1=============`);
    //     let bet_number = 49;
    //     let bet_amount = new BN(1).add(max_bet);
    //     try {
    //         await coreContract.withSigner(player1).tx.play(bet_number, isOver, { value: bet_amount })
    //     } catch {

    //     }

    //     let new_balanceContract = await showAZBalance(api, coreContractAddress);
    //     expect(new_balanceContract).to.equal(balanceContract);

    //     // case 2: bet_number < min_over_number || bet_number > max_over_number && 0 < bet_amount <= max_bet => failed
    //     console.log(`===========Case 2=============`);
    //     let min_over_number = (await coreQuery.getMinNumberOverRoll()).value.ok!;
    //     bet_number = min_over_number - 1;
    //     bet_amount = new BN(1 * (10 ** 12));

    //     try {
    //         await coreContract.withSigner(player1).tx.play(bet_number, isOver, { value: bet_amount })
    //     } catch {

    //     }

    //     new_balanceContract = await showAZBalance(api, coreContractAddress);
    //     expect(new_balanceContract).to.equal(balanceContract);

    //     // case 3: 0 < bet_amount <= max_bet && min_over_number <= bet_number <=  max_over_number && => success
    //     console.log(`===========Case 3=============`);
    //     let max_over_number = (await coreQuery.getMaxNumberOverRoll()).value.ok!;
    //     bet_number = max_over_number;

    //     try {
    //         await coreContract.withSigner(player1).tx.play(bet_number, isOver, { value: bet_amount })
    //     } catch (err) {
    //         console.log({ err })
    //     }

    //     new_balanceContract = await showAZBalance(api, coreContractAddress);
    //     expect((new_balanceContract - balanceContract)).to.equal((toNumber(bet_amount)));

    //     // case 4:  bet is exists => failed
    //     console.log(`===========Case 4=============`);
    //     balanceContract = await showAZBalance(api, coreContractAddress);
    //     try {
    //         await coreContract.withSigner(player1).tx.play(bet_number, isOver, { value: bet_amount })
    //     } catch {

    //     }

    //     new_balanceContract = await showAZBalance(api, coreContractAddress);
    //     expect(new_balanceContract).to.equal(balanceContract);
    //     console.log({ new_balanceContract })
    // });

    // it('Can play is under', async () => {
    //     const isOver = 0;
    //     const max_bet = (await coreQuery.getMaxBet()).value.ok.rawNumber;
    //     console.log({ max_bet: toNumber(max_bet) })
    //     let balanceContract = await showAZBalance(api, coreContractAddress);
    //     console.log({ balanceContract })
    //     /** Player 2 play */
    //     // case 1: bet_amount > max_bet => failed
    //     console.log(`===========Case 1=============`);
    //     let bet_number = 49;
    //     let bet_amount = new BN(1).add(max_bet);
    //     try {
    //         await coreContract.withSigner(player2).tx.play(bet_number, isOver, { value: bet_amount })
    //     } catch {

    //     }

    //     let new_balanceContract = await showAZBalance(api, coreContractAddress);
    //     expect(new_balanceContract).to.equal(balanceContract);

    //     // case 2: bet_number < min_under_number || bet_number > max_under_number && 0 < bet_amount <= max_bet => failed
    //     console.log(`===========Case 2=============`);
    //     let max_under_number = (await coreQuery.getMaxNumberUnderRoll()).value.ok!;
    //     bet_number = max_under_number + 1;
    //     bet_amount = new BN(1 * (10 ** 12));

    //     try {
    //         await coreContract.withSigner(player2).tx.play(bet_number, isOver, { value: bet_amount })
    //     } catch {

    //     }

    //     new_balanceContract = await showAZBalance(api, coreContractAddress);
    //     expect(new_balanceContract).to.equal(balanceContract);

    //     // case 3: 0 < bet_amount <= max_bet && min_over_number <= bet_number <=  max_over_number && => success
    //     console.log(`===========Case 3=============`);
    //     bet_number = max_under_number;

    //     try {
    //         await coreContract.withSigner(player2).tx.play(bet_number, isOver, { value: bet_amount })
    //     } catch (err) {
    //         console.log({ err })
    //     }

    //     new_balanceContract = await showAZBalance(api, coreContractAddress);
    //     expect((new_balanceContract - balanceContract)).to.equal((toNumber(bet_amount)));

    //     // case 4:  bet is exists => failed
    //     console.log(`===========Case 4=============`);
    //     balanceContract = await showAZBalance(api, coreContractAddress);
    //     try {
    //         await coreContract.withSigner(player2).tx.play(bet_number, isOver, { value: bet_amount })
    //     } catch {

    //     }

    //     new_balanceContract = await showAZBalance(api, coreContractAddress);
    //     expect(new_balanceContract).to.equal(balanceContract);
    //     console.log({ new_balanceContract })
    // });

    // it('Can finalize', async () => {
    //     let player1_bet_info = (await coreQuery.getBet(player1.address)).value.ok!;
    //     let player2_bet_info = (await coreQuery.getBet(player2.address)).value.ok!;
    //     let player1_oracleRound = player1_bet_info.oracleRound;
    //     let player2_oracleRound = player2_bet_info.oracleRound;
    //     let player1_bet_number = player1_bet_info.betNumber;
    //     let player2_bet_number = player2_bet_info.betNumber;
    //     let random_number_player1 = false;
    //     let random_number_player2 = false;
    //     let balancePlayer1 = await showAZBalance(api, player1.address);
    //     let balancePlayer2 = await showAZBalance(api, player2.address);
    //     let core_pool_amount = (await coreQuery.getCorePoolAmout()).value.ok!;
    //     let staking_pool_amount = (await coreQuery.getStakingPoolAmount()).value.ok!;
    //     let pandora_pool_amount = (await coreQuery.getPandoraPoolAmount()).value.ok!;
    //     let treasury_pool_amount = (await coreQuery.getTreasuryPoolAmount()).value.ok!;

    //     // case 1: finalize with roll over and bet is exist
    //     console.log(`===========Case 1=============`);
    //     /// delay until random number exists
    //     while (!random_number_player1) {
    //         try {
    //             random_number_player1 = (await randomQuery.getRandomNumberForRound(player1_oracleRound)).value.ok!;
    //             await delay(1000);
    //         } catch (err) {
    //             console.log({ errorGetRandomValueForRound: err });
    //             break;
    //         }
    //     }
    //     console.log({ player1_bet_number, random_number_player1 })

    //     try {
    //         await coreContract.withSigner(player1).tx.finalize();
    //     } catch (error) {
    //         console.log(error)
    //     }

    //     if (random_number_player1 > player1_bet_number) {
    //         // win
    //         let new_balancePlayer1 = await showAZBalance(api, player1.address);
    //         expect(new_balancePlayer1 - balancePlayer1 > 0).to.equal(true);
    //         console.log({ balancePlayer1, new_balancePlayer1 })
    //     } else {
    //         // lose
    //         let new_core_pool_amount = (await coreQuery.getCorePoolAmout()).value.ok!;
    //         expect(toNumber(new_core_pool_amount) - toNumber(core_pool_amount) > 0).to.equal(true);
    //         console.log({
    //             core_pool_amount: toNumber(core_pool_amount),
    //             new_core_pool_amount: toNumber(new_core_pool_amount)
    //         })

    //         let new_staking_pool_amount = (await coreQuery.getStakingPoolAmount()).value.ok!;
    //         expect(toNumber(new_staking_pool_amount) - toNumber(staking_pool_amount) > 0).to.equal(true);
    //         console.log({
    //             staking_pool_amount: toNumber(staking_pool_amount),
    //             new_staking_pool_amount: toNumber(new_staking_pool_amount)
    //         })

    //         let new_pandora_pool_amount = (await coreQuery.getPandoraPoolAmount()).value.ok!;
    //         expect(toNumber(new_pandora_pool_amount) - toNumber(pandora_pool_amount) > 0).to.equal(true);
    //         console.log({
    //             pandora_pool_amount: toNumber(pandora_pool_amount),
    //             new_pandora_pool_amount: toNumber(new_pandora_pool_amount)
    //         })

    //         let new_treasury_pool_amount = (await coreQuery.getTreasuryPoolAmount()).value.ok!;
    //         expect(toNumber(new_treasury_pool_amount) - toNumber(treasury_pool_amount) > 0).to.equal(true);
    //         console.log({
    //             treasury_pool_amount: toNumber(treasury_pool_amount),
    //             new_treasury_pool_amount: toNumber(new_treasury_pool_amount)
    //         })
    //     }

    //     // case 2: finalize with roll under and bet is exist
    //     console.log(`===========Case 2=============`);
    //     /// delay until random number exists
    //     while (!random_number_player2) {
    //         try {
    //             random_number_player2 = (await randomQuery.getRandomNumberForRound(player2_oracleRound)).value.ok!;
    //             await delay(1000);
    //         } catch (err) {
    //             console.log({ errorGetRandomValueForRound: err });
    //             break;
    //         }
    //     }
    //     console.log({ player2_bet_number, random_number_player2 })

    //     try {
    //         await coreContract.withSigner(player2).tx.finalize();
    //     } catch (error) {
    //         console.log(error)
    //     }

    //     if (random_number_player2 < player2_bet_number) {
    //         // win
    //         let new_balancePlayer2 = await showAZBalance(api, player2.address);
    //         expect(new_balancePlayer2 - balancePlayer2 > 0).to.equal(true);
    //         console.log({ balancePlayer2, new_balancePlayer2 })
    //     } else {
    //         // lose
    //         let new_core_pool_amount = (await coreQuery.getCorePoolAmout()).value.ok!;
    //         expect(toNumber(new_core_pool_amount) - toNumber(core_pool_amount) > 0).to.equal(true);
    //         console.log({
    //             core_pool_amount: toNumber(core_pool_amount),
    //             new_core_pool_amount: toNumber(new_core_pool_amount)
    //         })

    //         let new_staking_pool_amount = (await coreQuery.getStakingPoolAmount()).value.ok!;
    //         expect(toNumber(new_staking_pool_amount) - toNumber(staking_pool_amount) > 0).to.equal(true);
    //         console.log({
    //             staking_pool_amount: toNumber(staking_pool_amount),
    //             new_staking_pool_amount: toNumber(new_staking_pool_amount)
    //         })

    //         let new_pandora_pool_amount = (await coreQuery.getPandoraPoolAmount()).value.ok!;
    //         expect(toNumber(new_pandora_pool_amount) - toNumber(pandora_pool_amount) > 0).to.equal(true);
    //         console.log({
    //             pandora_pool_amount: toNumber(pandora_pool_amount),
    //             new_pandora_pool_amount: toNumber(new_pandora_pool_amount)
    //         })

    //         let new_treasury_pool_amount = (await coreQuery.getTreasuryPoolAmount()).value.ok!;
    //         expect(toNumber(new_treasury_pool_amount) - toNumber(treasury_pool_amount) > 0).to.equal(true);
    //         console.log({
    //             treasury_pool_amount: toNumber(treasury_pool_amount),
    //             new_treasury_pool_amount: toNumber(new_treasury_pool_amount)
    //         })
    //     }

    //     // case 3: finalize when bet not is exist
    //     console.log(`===========Case 3=============`);
    //     player1_bet_info = (await coreQuery.getBet(player1.address)).value.ok!;
    //     expect(player1_bet_info === null).to.equal(true);
    //     balancePlayer1 = await showAZBalance(api, player1.address);
    //     let balanceContract = await showAZBalance(api, coreContractAddress);
    //     try {
    //         await coreContract.withSigner(player1).tx.finalize();
    //     } catch (error) {

    //     }

    //     let new_balancePlayer1 = await showAZBalance(api, player1.address);
    //     expect(new_balancePlayer1).to.equal(balancePlayer1);
    //     let new_balanceContract = await showAZBalance(api, coreContractAddress);
    //     expect(new_balanceContract).to.equal(balanceContract);
    // });

    // it('Can update reward pool', async () => {
    //     let reward_pool_amount = (await coreQuery.getRewardPoolAmount()).value.ok!;
    //     console.log({ reward_pool_amount: toNumber(reward_pool_amount) })

    //     const amount = new BN(1000 * (10 ** 12))
    //     // Step 1: Set minter
    //     console.log(`===========Update reward pool - step 1=============`);
    //     try {
    //         await tokenTx.setMinterAddress(coreContractAddress)
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     // step 2: update
    //     console.log(`===========Update reward pool - step 2=============`);
    //     /** Case 1: update when caller not adminer */
    //     console.log(`===========Case 1=============`);
    //     let hasRole = (await coreQuery.hasRole(RoleType, aliceAddress)).value.ok!;
    //     expect(hasRole).to.equal(false);
    //     try { await coreContract.withSigner(alice).tx.updateRewardPool(amount); } catch {

    //     }

    //     let new_reward_pool_amount = (await coreQuery.getRewardPoolAmount()).value.ok!;
    //     let gain = new BN(new_reward_pool_amount.toString()).sub(new BN(reward_pool_amount.toString()))
    //     expect(toNumber(gain)).to.equal(0);

    //     /** Case 2: update when caller is adminer */
    //     console.log(`===========Case 2=============`);
    //     hasRole = (await coreQuery.hasRole(RoleType, signerAddress)).value.ok!;
    //     expect(hasRole).to.equal(true);
    //     try { await coreContract.withSigner(defaultSigner).tx.updateRewardPool(amount); } catch (err) {
    //         console.log({ err })
    //     }

    //     new_reward_pool_amount = (await coreQuery.getRewardPoolAmount()).value.ok!;
    //     gain = new BN(new_reward_pool_amount.toString()).sub(new BN(reward_pool_amount.toString()))
    //     expect(toNumber(gain)).to.equal(toNumber(amount));
    //     console.log({ new_reward_pool_amount: toNumber(new_reward_pool_amount) })
    // });

    // it('Can receive bet tokens when finalized', async () => {
    //     let reward_pool_amount = (await coreQuery.getRewardPoolAmount()).value.ok!;
    //     let player3_bet_token_balance = (await tokenQuery.balanceOf(player3.address)).value.ok!;
    //     console.log({ 
    //         reward_pool_amount: toNumber(reward_pool_amount), 
    //         player3_bet_token_balance: toNumber(player3_bet_token_balance) 
    //     })
    //     /** Player 3 play */
    //     const isOver = 1;
    //     let max_over_number = (await coreQuery.getMaxNumberOverRoll()).value.ok!;
    //     let bet_amount = new BN(1 * (10 ** 12));
    //     let bet_number = max_over_number;

    //     try {
    //         await coreContract.withSigner(player3).tx.play(bet_number, isOver, { value: bet_amount })
    //     } catch (err) {
    //         console.log({ err })
    //     }

    //     let player3_bet_info = (await coreQuery.getBet(player3.address)).value.ok!;
    //     console.log({ player3_bet_info })

    //     /** Player 3 finalize */
    //     let player3_oracleRound = player3_bet_info.oracleRound;
    //     let random_number_player3 = false;

    //     console.log("DIA random number")
    //     while (!random_number_player3) {
    //         try {
    //             random_number_player3 = (await randomQuery.getRandomNumberForRound(player3_oracleRound)).value.ok!;
    //             await delay(1000);
    //         } catch (err) {
    //             console.log({ errorGetRandomValueForRound: err });
    //             break;
    //         }
    //     }
    //     console.log({ random_number_player3 })

    //     await coreContract.withSigner(player3).tx.finalize();

    //     let new_reward_pool_amount = (await coreQuery.getRewardPoolAmount()).value.ok!;
    //     let gain = new BN(reward_pool_amount.toString()).sub(new BN(new_reward_pool_amount.toString()))
    //     expect(toNumber(gain)).to.equal(toNumber(bet_amount));
    //     let new_player3_bet_token_balance = (await tokenQuery.balanceOf(player3.address)).value.ok!;
    //     gain = new BN(new_player3_bet_token_balance.toString()).sub(new BN(player3_bet_token_balance.toString()))
    //     expect(toNumber(gain)).to.equal(toNumber(bet_amount));

    //     console.log({ 
    //         new_reward_pool_amount: toNumber(new_reward_pool_amount), 
    //         new_player3_bet_token_balance: toNumber(new_player3_bet_token_balance) 
    //     })
    // });

    it('Can hold amount when finalized', async () => {
        let hold_bidder_count = (await coreQuery.getHoldBidderCount()).value.ok!;
        console.log({ hold_bidder_count })
        // set max bet ration = 1
        await coreTx.setMaxBetRatio(1);

        /** Player 4 play */
        const isOver = 1;
        const max_bet = (await coreQuery.getMaxBet()).value.ok.rawNumber;
        let min_over_number = (await coreQuery.getMinNumberOverRoll()).value.ok!;
        let bet_amount = max_bet;
        let bet_number = min_over_number;

        try {
            await coreContract.withSigner(player4).tx.play(bet_number, isOver, { value: bet_amount })
        } catch (err) {
            console.log({ err })
        }

        let player4_bet_info = (await coreQuery.getBet(player4.address)).value.ok!;
        console.log({ player4_bet_info })

        /** Player 4 finalize */
        let player4_oracleRound = player4_bet_info.oracleRound;
        let random_number_player4 = false;

        console.log("DIA random number")
        while (!random_number_player4) {
            try {
                random_number_player4 = (await randomQuery.getRandomNumberForRound(player4_oracleRound)).value.ok!;
                await delay(1000);
            } catch (err) {
                console.log({ errorGetRandomValueForRound: err });
                break;
            }
        }
        console.log({ random_number_player4 })

        await coreContract.withSigner(player4).tx.finalize();

        // win
        if (random_number_player4 > bet_number) {
            let new_hold_bidder_count = (await coreQuery.getHoldBidderCount()).value.ok!;
            expect(new_hold_bidder_count - hold_bidder_count > 0).to.equal(true);

            let hold_player = (await coreQuery.getHoldPlayersByIndex(0)).value.ok!;
            expect(hold_player).to.equal(player4.address);

            let hold_amount = (await coreQuery.getHoldAmountPlayers(player4.address)).value.ok!;
            console.log({ new_hold_bidder_count, hold_player, hold_amount });
        }
    });

    it('Can withdraw core pool', async () => {
    });

    it('Can withdraw hold amount', async () => {
        let balancePlayer4 = await showAZBalance(api, player4.address);
        let hold_amount = (await coreQuery.getHoldAmountPlayers(player4.address)).value.ok!;
        let hold_bidder_count = (await coreQuery.getHoldBidderCount()).value.ok!;
        console.log({ balancePlayer4 });
        // update core pool
        let fee = new BN(50 * (10 ** 12))
        try { await coreContract.withSigner(defaultSigner).tx.updateCorePool({ value: fee }); } catch (err) {
            console.log({ err })
        }

        // withdraw hold amount
        /// case 1: amount > core pool amount => failed
        console.log(`===========Case 1=============`);
        let amount = new BN(1).add(new BN(hold_amount));
        let balanceContract = await showAZBalance(api, coreContractAddress);

        try {
            await coreContract.withSigner(player4).tx.withdrawHoldAmount(player4.address, amount);
        } catch (error) {

        }

        let new_balanceContract = await showAZBalance(api, coreContractAddress);
        expect(toNumber(new_balanceContract)).to.equal(toNumber(balanceContract));

        /// case 2: amount <= core pool amount => success
        console.log(`===========Case 2=============`);
        amount = new BN(1 * (10 ** 12));
        // amount = hold_amount;
        try {
            await coreContract.withSigner(player4).tx.withdrawHoldAmount(player4.address, amount);
        } catch (error) {
            console.log(error)
        }

        if (toNumber(amount) < toNumber(hold_amount)) {
            let new_hold_amount = (await coreQuery.getHoldAmountPlayers(player4.address)).value.ok!;
            expect(toNumber(hold_amount) - toNumber(new_hold_amount)).to.equal(toNumber(amount));
            console.log({new_hold_amount})
        } else {
            let new_hold_bidder_count = (await coreQuery.getHoldBidderCount()).value.ok!;
            expect(hold_bidder_count - new_hold_bidder_count).to.equal(1);
        }

        let new_balancePlayer4 = await showAZBalance(api, player4.address);
        expect(new_balancePlayer4 - balancePlayer4 > 0).to.equal(true);
        console.log({ new_balancePlayer4 });
    });

    it('Can transfer And Update Session Pandora Pool', async () => {
    });

    it('Can transfer And Update Staking Pool', async () => {
    });

    it('Can tranfer treasury pool', async () => {
    });

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});