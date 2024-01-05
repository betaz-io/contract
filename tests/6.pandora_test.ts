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

import ConstructorsPsp34 from "./typed_contracts/constructors/pandora_psp34_standard";
import ContractPsp34 from "./typed_contracts/contracts/pandora_psp34_standard";

import { BN } from '@polkadot/util';
import { txSignAndSend } from '@727-ventures/typechain-types';

import * as PSP34Args from './typed_contracts/types-arguments/pandora';

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

    
    // psp34 contract
    let psp34ContractAddress: any;
    let psp34Contract: any;
    let psp34Query: any;
    let psp34Tx: any;

    let psp34Name: string;
    let psp34Symbol: string;
    let psp34AdminAddress: string;
    let psp34TokenContractAddress: string;
    let psp34PublicMintPrice: any;

    // pandora pool contract
    let pandoraContractAddress: any;
    let pandoraContract: any;
    let pandoraQuery: any;
    let pandoraTx: any;

    let pandoraAdminAddress: string;
    let pandoraPsp34ContractAddress: string;
    let sessionTotalTicketAmount: number;
    let maxBetNumber: number;

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

    const u64Id = (id: number) => PSP34Args.IdBuilder.U64(id);

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

        /** step 3: create pandora psp34 contract */
        console.log(`===========Create new pandora psp34 contract=============`);

        try {
            psp34Name = "BETAZ TICKET TESTNET";
            psp34Symbol = "BETAZ";
            psp34AdminAddress = adminer.address;
            psp34TokenContractAddress = aliceAddress;
            psp34PublicMintPrice = new BN(1 * (10 ** tokenDecimal));

            // "refTime: 2151641794"
            // "proofSize: 19967"
            let gasLimit = setGasLimit(api, 3_600_000_000, 36_000);

            const contractFactory = new ConstructorsPsp34(api, defaultSigner);

            psp34ContractAddress = (
                await contractFactory.new(
                    psp34Name,
                    psp34Symbol,
                    psp34AdminAddress,
                    psp34TokenContractAddress,
                    psp34PublicMintPrice,
                    { gasLimit }
                )
            ).address;

            console.log({ psp34ContractAddress });

            psp34Contract = new ContractPsp34(psp34ContractAddress, defaultSigner, api);

            psp34Query = psp34Contract.query;
            psp34Tx = psp34Contract.tx;
        } catch (error) {
            console.log("Step 5 ERROR:", error)
        }

        /** step 4: create pandora contract */
        console.log(`===========Create new pandora contract=============`);

        try {
            pandoraAdminAddress = adminer.address;
            pandoraPsp34ContractAddress = aliceAddress;
            sessionTotalTicketAmount = 123;
            maxBetNumber = 123;

            // "refTime: 3041832201"
            // "proofSize: 21773"
            let gasLimit = setGasLimit(api, 9_600_000_000, 36_000);

            const contractFactory = new ConstructorsPandora(api, defaultSigner);

            pandoraContractAddress = (
                await contractFactory.new(
                    pandoraAdminAddress,
                    pandoraPsp34ContractAddress,
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

        /** step 5: create core contract */
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
            coreStakingAddress = pandoraContractAddress;
            coreTreasuryAddress = pandoraContractAddress;
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

    it('Can initialize', async () => {
        // Check owner
        let owner = (await pandoraQuery.owner()).value.ok!.toString();
        expect(owner).to.equal(signerAddress);

        // Check psp34ContractAddress
        let psp34_address = (await pandoraQuery.getPsp34ContractAddress()).value.ok!.toString();
        expect(psp34_address).to.equal(pandoraPsp34ContractAddress);

        // Check SessionTotalTicketAmount
        let session_total_ticket_amount = (await pandoraQuery.getSessionTotalTicketAmount()).value.ok;
        expect(Number(session_total_ticket_amount?.toString())).to.equal(sessionTotalTicketAmount);

        // Check MaxBetNumber
        let max_bet_number = (await pandoraQuery.getMaxBetNumber()).value.ok!;
        expect(max_bet_number).to.equal(maxBetNumber);
    });

    it('Can update initialize', async () => {
        const new_pandoraTokenContractAddress = psp34ContractAddress;
        const new_sessionTotalTicketAmount = 1000000;
        const new_maxBetNumber = 999999

        // Check psp34ContractAddress
        await pandoraTx.setPsp34ContractAddress(new_pandoraTokenContractAddress)
        let betaz_token_address = (await pandoraQuery.getPsp34ContractAddress()).value.ok!.toString();
        expect(betaz_token_address).to.equal(new_pandoraTokenContractAddress);

        // Check sessionTotalTicketAmount
        await pandoraTx.setSessionTotalTicketAmount(new_sessionTotalTicketAmount)
        let session_total_ticket_amount = (await pandoraQuery.getSessionTotalTicketAmount()).value.ok;
        expect(Number(session_total_ticket_amount?.toString())).to.equal(new_sessionTotalTicketAmount);

        // Check maxBetNumber
        await pandoraTx.setMaxBetNumber(new_maxBetNumber)
        let max_bet_number = (await pandoraQuery.getMaxBetNumber()).value.ok!;
        expect(max_bet_number).to.equal(new_maxBetNumber);

        // mint ticket
        await psp34Contract.withSigner(defaultSigner).tx.multipleMintTicket(5);
    });

    it('Can update locked', async () => {
        let is_locked = (await pandoraQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(false);

        // case 1: not admin => failed
        console.log(`===========Case 1=============`);
        let is_adminer = (await pandoraQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(false);

        try {
            await pandoraContract.withSigner(alice).tx.updateIsLocked(true);
        } catch (error) {

        }

        let new_is_locked = (await pandoraQuery.getIsLocked()).value.ok!;
        expect(new_is_locked).to.equal(is_locked);

        // case 2: is admin => success
        console.log(`===========Case 2=============`);
        is_adminer = (await pandoraQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);

        try {
            await pandoraContract.withSigner(defaultSigner).tx.updateIsLocked(true);
        } catch (error) {
            console.log(error)
        }

        new_is_locked = (await pandoraQuery.getIsLocked()).value.ok!;
        expect(new_is_locked).to.equal(true);
    })

    it('Can add new bet session', async () => {
        let last_session_id = (await pandoraQuery.getLastSessionId()).value.ok!;

        // case 1: not admin => failed
        console.log(`===========Case 1=============`);
        let is_adminer = (await pandoraQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(false);

        try {
            await pandoraContract.withSigner(alice).tx.addNewBetSession();
        } catch (error) {

        }

        let new_last_session_id = (await pandoraQuery.getLastSessionId()).value.ok!;
        let gain = new_last_session_id - last_session_id;
        expect(gain).to.equal(0);

        // case 2: is admin => success
        console.log(`===========Case 2=============`);
        is_adminer = (await pandoraQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);

        try {
            await pandoraContract.withSigner(defaultSigner).tx.addNewBetSession();
        } catch (error) {
            console.log(error)
        }

        new_last_session_id = (await pandoraQuery.getLastSessionId()).value.ok!;
        gain = new_last_session_id - last_session_id;
        expect(gain).to.equal(1);
    })

    it('Can update bet session', async () => {
        let last_session_id = (await pandoraQuery.getLastSessionId()).value.ok!;

        // case 1: not admin => failed
        console.log(`===========Case 1=============`);
        let is_adminer = (await pandoraQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(false);

        let randomNumber = 10;
        let statusType = "Completed";
        let bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        try {
            await pandoraContract.withSigner(alice).tx.updateBetSession(last_session_id, randomNumber, statusType);
        } catch (error) {

        }

        let new_bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        expect(new_bet_session.randomNumber).to.equal(bet_session.randomNumber);
        expect(new_bet_session.status).to.equal(bet_session.status);

        // case 2: is admin => success
        console.log(`===========Case 2=============`);
        is_adminer = (await pandoraQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);

        try {
            await pandoraContract.withSigner(defaultSigner).tx.updateBetSession(last_session_id, randomNumber, statusType);
        } catch (error) {
            console.log(error)
        }

        new_bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        console.log({ new_bet_session })
        expect(new_bet_session.randomNumber).to.equal(randomNumber);
        expect(new_bet_session.status).to.equal(statusType);
    })

    it('Can add chainlink request id', async () => {
        const requestId = "123456";
        let last_session_id = (await pandoraQuery.getLastSessionId()).value.ok!;
        let request_id = (await pandoraQuery.getChainlinkRequestIdBySessionId(last_session_id)).value.ok!;
        expect(request_id).to.equal(null);

        // case 1: not admin => failed
        console.log(`===========Case 1=============`);
        let is_adminer = (await pandoraQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(false);

        try {
            await pandoraContract.withSigner(alice).tx.addChainlinkRequestId(last_session_id, requestId);
        } catch (error) {

        }

        let new_request_id = (await pandoraQuery.getChainlinkRequestIdBySessionId(last_session_id)).value.ok!;
        expect(new_request_id).to.equal(null);

        // case 2: is admin && request id in session not exist => success
        console.log(`===========Case 2=============`);
        is_adminer = (await pandoraQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);

        try {
            await pandoraContract.withSigner(defaultSigner).tx.addChainlinkRequestId(last_session_id, requestId);
        } catch (error) {
            console.log(error)
        }

        new_request_id = (await pandoraQuery.getChainlinkRequestIdBySessionId(last_session_id)).value.ok!;
        expect(new_request_id).to.equal(requestId);

        // case 3: is admin && request id in session is exist => failed
        console.log(`===========Case 3=============`);
        let new_requestId = "654321";
        is_adminer = (await pandoraQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);

        try {
            await pandoraContract.withSigner(defaultSigner).tx.addChainlinkRequestId(last_session_id, new_requestId);
        } catch (error) {

        }

        new_request_id = (await pandoraQuery.getChainlinkRequestIdBySessionId(last_session_id)).value.ok!;
        expect(new_request_id).to.equal(requestId);
    })

    it('Can play', async () => {
        let last_session_id = (await pandoraQuery.getLastSessionId()).value.ok!;
        // tranfer nft to player
        try {
            await psp34Tx.transfer(player1.address, u64Id(1), []);
            await psp34Tx.transfer(player2.address, u64Id(2), []);
            await psp34Tx.transfer(player3.address, u64Id(3), []);
            await psp34Tx.transfer(player4.address, u64Id(4), []);
            await psp34Tx.transfer(player4.address, u64Id(5), []);
        } catch (error) {
            console.log(error)
        }

        // check owner nft
        let owner = (await psp34Query.ownerOf(u64Id(1))).value.ok!;
        expect(owner).to.equal(player1.address);
        owner = (await psp34Query.ownerOf(u64Id(2))).value.ok!;
        expect(owner).to.equal(player2.address);
        owner = (await psp34Query.ownerOf(u64Id(3))).value.ok!;
        expect(owner).to.equal(player3.address);
        owner = (await psp34Query.ownerOf(u64Id(4))).value.ok!;
        expect(owner).to.equal(player4.address);
        owner = (await psp34Query.ownerOf(u64Id(5))).value.ok!;
        expect(owner).to.equal(player4.address);
        expect(owner === aliceAddress).to.equal(false);

        // approve nft

        try {
            await psp34Contract.withSigner(player1).tx.approve(pandoraContractAddress, u64Id(1), true);
            await psp34Contract.withSigner(player2).tx.approve(pandoraContractAddress, u64Id(2), true);
            await psp34Contract.withSigner(player3).tx.approve(pandoraContractAddress, u64Id(3), true);
            await psp34Contract.withSigner(player4).tx.approve(pandoraContractAddress, u64Id(4), true);
            await psp34Contract.withSigner(player4).tx.approve(pandoraContractAddress, u64Id(5), true);
        } catch (error) {
            console.log(error)
        }

        // case 1: player not owner nft => false
        console.log(`===========Case 1=============`);

        try {
            await pandoraContract.withSigner(alice).tx.play(last_session_id, 10, u64Id(5))
        } catch (error) {

        }

        owner = (await psp34Query.ownerOf(u64Id(5))).value.ok!;
        expect(owner === pandoraContractAddress).to.equal(false);
        // case 2: player is owner and locked true => failed
        console.log(`===========Case 2=============`);
        let is_locked = (await pandoraQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(true);

        try {
            await pandoraContract.withSigner(player1).tx.play(last_session_id, 10, u64Id(1))
        } catch (error) {

        }

        owner = (await psp34Query.ownerOf(u64Id(1))).value.ok!;
        expect(owner === pandoraContractAddress).to.equal(false);

        // case 3: player not owner nft and locked false and bet session not processing=> failed
        console.log(`===========Case 3=============`);
        await pandoraContract.withSigner(defaultSigner).tx.updateIsLocked(false);
        is_locked = (await pandoraQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(false);

        let bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        expect(bet_session.status !== "Processing").to.equal(true);

        try {
            await pandoraContract.withSigner(player1).tx.play(last_session_id, 10, u64Id(1))
        } catch (error) {

        }

        owner = (await psp34Query.ownerOf(u64Id(1))).value.ok!;
        expect(owner === pandoraContractAddress).to.equal(false);
        // case 4: player not owner nft and locked false session is processing=> success
        console.log(`===========Case 4=============`);

        await pandoraContract.withSigner(defaultSigner).tx.updateBetSession(last_session_id, 0, "Processing");
        bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        expect(bet_session.status === "Processing").to.equal(true);

        try {
            await pandoraContract.withSigner(player1).tx.play(last_session_id, 9, u64Id(1))
            await pandoraContract.withSigner(player2).tx.play(last_session_id, 10, u64Id(2))
            await pandoraContract.withSigner(player3).tx.play(last_session_id, 11, u64Id(3))
            await pandoraContract.withSigner(player4).tx.play(last_session_id, 11, u64Id(4))
            await pandoraContract.withSigner(player4).tx.play(last_session_id, 11, u64Id(5))
        } catch (error) {
            console.log(error)
        }

        const [owner1, owner2, owner3, owner4, owner5] = await Promise.all([
            psp34Query.ownerOf(u64Id(1)),
            psp34Query.ownerOf(u64Id(2)),
            psp34Query.ownerOf(u64Id(3)),
            psp34Query.ownerOf(u64Id(4)),
            psp34Query.ownerOf(u64Id(5)),
        ])

        expect(owner1.value.ok! === pandoraContractAddress).to.equal(true);
        expect(owner2.value.ok! === pandoraContractAddress).to.equal(true);
        expect(owner3.value.ok! === pandoraContractAddress).to.equal(true);
        expect(owner4.value.ok! === pandoraContractAddress).to.equal(true);
        expect(owner5.value.ok! === pandoraContractAddress).to.equal(true);

        const [nft_info_1, nft_info_2, nft_info_3, nft_info_4, nft_info_5] = await Promise.all([
            pandoraQuery.getNftInfo(u64Id(1)),
            pandoraQuery.getNftInfo(u64Id(2)),
            pandoraQuery.getNftInfo(u64Id(3)),
            pandoraQuery.getNftInfo(u64Id(4)),
            pandoraQuery.getNftInfo(u64Id(5)),
        ])

        const nfts = {
            nft_info_1: nft_info_1.value.ok!,
            nft_info_2: nft_info_2.value.ok!,
            nft_info_3: nft_info_3.value.ok!,
            nft_info_4: nft_info_4.value.ok!,
            nft_info_5: nft_info_5.value.ok!
        };

        console.table(nfts)
    })

    it("can update WinAmount And SessionStatus", async () => {
        let last_session_id = (await pandoraQuery.getLastSessionId()).value.ok!;
        let bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        expect(bet_session.status !== "Finished").to.equal(true);

        let totalWinAmount = (await pandoraQuery.getTotalWinAmount()).value.ok!;
        let winAmount = "100000000000000";
        try {
            await pandoraTx.updateWinAmountAndSessionStatus(last_session_id, winAmount)
        } catch (error) {

        }
        let new_totalWinAmount = (await pandoraQuery.getTotalWinAmount()).value.ok!;
        let gain = new BN(new_totalWinAmount.toString()).sub(new BN(totalWinAmount.toString()))
        expect(toNumber(gain)).to.equal(toNumber(winAmount))
        bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        expect(bet_session.status === "Finalized").to.equal(true);

        // tranfer amount to contract
        const transfer = api.tx.balances.transfer(pandoraContractAddress, winAmount);
        await transfer.signAndSend(alice);

        // back to origin status
        await pandoraContract.withSigner(defaultSigner).tx.updateBetSession(last_session_id, 0, "Processing");
    })

    it('Can finalize', async () => {
        let last_session_id = (await pandoraQuery.getLastSessionId()).value.ok!;
        let bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        let randomNumber = 11;
        // case 1: is not locked => failed
        let is_locked = (await pandoraQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(false);

        try {
            await pandoraTx.finalize(last_session_id, randomNumber)
        } catch (error) {

        }

        let new_bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        expect(new_bet_session.randomNumber).to.equal(bet_session.randomNumber);

        // case 2: is locked and sessison status not Finalized => failed
        await pandoraContract.withSigner(defaultSigner).tx.updateIsLocked(true);
        is_locked = (await pandoraQuery.getIsLocked()).value.ok!;
        expect(is_locked).to.equal(true);
        expect(bet_session.status !== "Finalized").to.equal(true);

        try {
            await pandoraTx.finalize(last_session_id, randomNumber)
        } catch (error) {

        }

        new_bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        expect(new_bet_session.randomNumber).to.equal(bet_session.randomNumber);

        // case 3: is locked and sessison status is Finalized => success
        await pandoraContract.withSigner(defaultSigner).tx.updateBetSession(last_session_id, 0, "Finalized");
        bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        expect(bet_session.status === "Finalized").to.equal(true);

        try {
            await pandoraTx.finalize(last_session_id, randomNumber)
        } catch (error) {
            console.log(error)
        }

        new_bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        expect(new_bet_session.randomNumber).to.equal(randomNumber);
        expect(new_bet_session.status === "Completed").to.equal(true);
    })

    it('Can find winer', async () => {
        let last_session_id = (await pandoraQuery.getLastSessionId()).value.ok!;
        last_session_id = last_session_id - 1;
        let bet_session = (await pandoraQuery.getBetSession(last_session_id)).value.ok!;
        console.log({ bet_session })
        let totalTicketsWin = (await pandoraQuery.totalTicketsWin(last_session_id, parseInt(bet_session.randomNumber))).value.ok.rawNumber;
        console.log({ totalTicketsWin: parseInt(totalTicketsWin.toString()) })
        const winners: string[] = [];

        for (let i = 0; i < parseInt(totalTicketsWin.toString()); i++) {
            try {
                await pandoraTx.handleFindWinner(last_session_id, { u128: i });
                await delay(3000);

                let nftWin = (await pandoraQuery.getIdInSessionByRandomNumberAndIndex(last_session_id,
                    parseInt(bet_session.randomNumber), { u128: i })).value.ok!;
                console.log({ nftWin })
                let winner = (await pandoraQuery.getPlayerByNftId(u64Id(nftWin))).value.ok!;
                console.log({ winner })
                winners.push(winner);
            } catch (error) {
                console.log(error)
            }
        }

        console.log({ winners })

        // player 1 bet nft 1 - number 9 => lose
        let player = (await pandoraQuery.getPlayerByNftId(u64Id(1))).value.ok!;
        expect(player).to.equal(player1.address);
        let nftInfo = (await pandoraQuery.getNftInfo(u64Id(1))).value.ok!;
        expect(nftInfo.betNumber).to.equal(9);
        let isWin = winners.includes(player1.address);
        expect(isWin).to.equal(false);

        // player 2 bet nft 2 - number 10 => lose
        player = (await pandoraQuery.getPlayerByNftId(u64Id(2))).value.ok!;
        expect(player).to.equal(player2.address);
        nftInfo = (await pandoraQuery.getNftInfo(u64Id(2))).value.ok!;
        expect(nftInfo.betNumber).to.equal(10);
        isWin = winners.includes(player2.address);
        expect(isWin).to.equal(false);

        // player 3 bet nft 3 - number 11 => win
        player = (await pandoraQuery.getPlayerByNftId(u64Id(3))).value.ok!;
        expect(player).to.equal(player3.address);
        nftInfo = (await pandoraQuery.getNftInfo(u64Id(3))).value.ok!;
        expect(nftInfo.betNumber).to.equal(11);
        isWin = winners.includes(player3.address);
        expect(isWin).to.equal(true);

        let winAmount = (await pandoraQuery.getPlayerWinAmount(last_session_id, player)).value.ok!;
        console.log({ winAmount })
        let holdAmount = (await pandoraQuery.getHoldAmountPlayers(player)).value.ok!;
        console.log({ holdAmount })
        expect(toNumber(winAmount)).to.equal(toNumber(holdAmount))
        console.log({ player, winAmount: toNumber(winAmount), holdAmount: toNumber(holdAmount) })
        // player 4 bet nft 4 - number 11 => win
        player = (await pandoraQuery.getPlayerByNftId(u64Id(4))).value.ok!;
        expect(player).to.equal(player4.address);
        nftInfo = (await pandoraQuery.getNftInfo(u64Id(4))).value.ok!;
        expect(nftInfo.betNumber).to.equal(11);
        isWin = winners.includes(player4.address);
        expect(isWin).to.equal(true);

        // player 4 bet nft 5 - number 11 => win
        player = (await pandoraQuery.getPlayerByNftId(u64Id(5))).value.ok!;
        expect(player).to.equal(player4.address);
        nftInfo = (await pandoraQuery.getNftInfo(u64Id(5))).value.ok!;
        expect(nftInfo.betNumber).to.equal(11);
        isWin = winners.includes(player4.address);
        expect(isWin).to.equal(true);

        winAmount = (await pandoraQuery.getPlayerWinAmount(last_session_id, player)).value.ok!;
        holdAmount = (await pandoraQuery.getHoldAmountPlayers(player)).value.ok!;
        expect(toNumber(winAmount)).to.equal(toNumber(holdAmount))
        console.log({ player, winAmount: toNumber(winAmount), holdAmount: toNumber(holdAmount) })

    })

    it('Can withdraw hold amount', async () => {
        let hold_bidder_count = (await pandoraQuery.getHoldBidderCount()).value.ok!;
        if (hold_bidder_count > 0) {
            let balancePlayer4 = await showAZBalance(api, player4.address);
            let hold_amount = (await pandoraQuery.getHoldAmountPlayers(player4.address)).value.ok!;
            console.log({ hold_amount, balancePlayer4 });

            // withdraw hold amount
            /// case 1: amount > core pool amount => failed
            console.log(`===========Case 1=============`);
            let amount = new BN(1).add(new BN(hold_amount));
            let balanceContract = await showAZBalance(api, pandoraContractAddress);

            try {
                await pandoraContract.withSigner(player4).tx.withdrawHoldAmount(player4.address, amount);
            } catch (error) {

            }

            let new_balanceContract = await showAZBalance(api, pandoraContractAddress);
            expect(toNumber(new_balanceContract)).to.equal(toNumber(balanceContract));

            /// case 2: amount <= core pool amount => success
            console.log(`===========Case 2=============`);
            amount = hold_amount;
            try {
                await pandoraContract.withSigner(player4).tx.withdrawHoldAmount(player4.address, amount);
            } catch (error) {
                console.log(error)
            }

            if (toNumber(amount) <= toNumber(hold_amount)) {
                let new_hold_amount = (await pandoraQuery.getHoldAmountPlayers(player4.address)).value.ok!;
                let gain = new BN(hold_amount).sub(new BN(new_hold_amount))
                expect(toNumber(gain)).to.equal(toNumber(amount));

                let new_balancePlayer4 = await showAZBalance(api, player4.address);
                expect(new_balancePlayer4 - balancePlayer4 > 0).to.equal(true);
                console.log({ new_hold_amount, new_balancePlayer4 });
            }
        }
    })

    it('Can burn ticket used', async () => {
        let tokens_id = [u64Id(1), u64Id(2), u64Id(3), u64Id(4), u64Id(5)];
        let totalSupply = (await psp34Query.totalSupply()).value.ok!;

        await pandoraTx.burnTicketUsed(tokens_id)

        let new_totalSupply = (await psp34Query.totalSupply()).value.ok!;
        let gain = totalSupply - new_totalSupply;
        expect(gain).to.equal(tokens_id.length);
    })

    it('Can withdraw', async () => {
        let amount = new BN(1 * (10 ** 12));
        let reward_amount = amount;
        await pandoraTx.updateTotalWinAmount(reward_amount);
        let balanceContract = await showAZBalance(api, pandoraContractAddress);
        let balanceAlice = await showAZBalance(api, aliceAddress);
        let reward = (await pandoraQuery.getTotalWinAmount()).value.ok!;
        console.log({ balanceContract, balanceAlice, reward: toNumber(reward) });

        await pandoraTx.withdrawFee(aliceAddress, amount);

        let new_balanceContract = await showAZBalance(api, pandoraContractAddress);
        let new_balanceAlice = await showAZBalance(api, aliceAddress);
        expect(balanceContract - new_balanceContract).to.equal(toNumber(amount));
        expect(new_balanceAlice - balanceAlice).to.equal(toNumber(amount));
        let new_reward = (await pandoraQuery.getTotalWinAmount()).value.ok!;
        expect(toNumber(reward) - toNumber(new_reward)).to.equal(toNumber(amount));
        console.log({ new_balanceContract, new_balanceAlice, new_reward: toNumber(new_reward) });
    })

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});