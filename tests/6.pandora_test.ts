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

        /** step 3: create pandora contract */
        console.log(`===========Create new pandora contract=============`);

        try {
            pandoraName = "BETAZ TICKET TESTNET";
            pandoraSymbol = "BETAZ";
            pandoraAdminAddress = adminer.address;
            pandoraTokenContractAddress = aliceAddress;
            publicMintPrice = new BN(1 * (10 ** tokenDecimal));
            sessionTotalTicketAmount = 123;
            maxBetNumber = 123;

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

        // Check stakingTokenContractAddress
        let betaz_token_address = (await pandoraQuery.getBetazTokenAddress()).value.ok!.toString();
        expect(betaz_token_address).to.equal(pandoraTokenContractAddress);

        // Check PublicMintPrice
        let public_mint_price = (await pandoraQuery.getPublicMintPrice()).value.ok.rawNumber;
        expect(toNumber(public_mint_price)).to.equal(toNumber(publicMintPrice));

        // Check SessionTotalTicketAmount
        let session_total_ticket_amount = (await pandoraQuery.getSessionTotalTicketAmount()).value.ok;
        expect(Number(session_total_ticket_amount?.toString())).to.equal(sessionTotalTicketAmount);

        // Check MaxBetNumber
        let max_bet_number = (await pandoraQuery.getMaxBetNumber()).value.ok!;
        expect(max_bet_number).to.equal(maxBetNumber);
    });

    it('Can update initialize', async () => {
        const new_pandoraTokenContractAddress = tokenContractAddress;
        const new_publicMintPrice = new BN(10 * (10 ** tokenDecimal));
        const new_sessionTotalTicketAmount = 1000000;
        const new_maxBetNumber = 999999

        // Check stakingTokenContractAddress
        await pandoraTx.setBetazTokenAddress(new_pandoraTokenContractAddress)
        let betaz_token_address = (await pandoraQuery.getBetazTokenAddress()).value.ok!.toString();
        expect(betaz_token_address).to.equal(new_pandoraTokenContractAddress);

        // Check PublicMintPrice
        await pandoraTx.setPublicMintPrice(new_publicMintPrice)
        let public_mint_price = (await pandoraQuery.getPublicMintPrice()).value.ok.rawNumber;
        expect(toNumber(public_mint_price)).to.equal(toNumber(new_publicMintPrice));

        // Check sessionTotalTicketAmount
        await pandoraTx.setSessionTotalTicketAmount(new_sessionTotalTicketAmount)
        let session_total_ticket_amount = (await pandoraQuery.getSessionTotalTicketAmount()).value.ok;
        expect(Number(session_total_ticket_amount?.toString())).to.equal(new_sessionTotalTicketAmount);

        // Check maxBetNumber
        await pandoraTx.setMaxBetNumber(new_maxBetNumber)
        let max_bet_number = (await pandoraQuery.getMaxBetNumber()).value.ok!;
        expect(max_bet_number).to.equal(new_maxBetNumber);
    });

    it('Can mint', async () => {
        let last_token_id = (await pandoraQuery.getLastTokenId()).value.ok!;
        // case 1: is not admin
        console.log(`===========Case 1=============`);
        let balance = (await pandoraQuery.balanceOf(aliceAddress)).value.ok!;
        let is_adminer = (await pandoraQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(false);

        try {
            await pandoraContract.withSigner(alice).tx.mint();
        } catch (error) {

        }

        let new_last_token_id = (await pandoraQuery.getLastTokenId()).value.ok!;
        expect(new_last_token_id).to.equal(last_token_id);

        let new_balance = (await pandoraQuery.balanceOf(aliceAddress)).value.ok!;
        let gain = new_balance - balance
        expect(gain).to.equal(0);

        // case 2: is admin
        console.log(`===========Case 2=============`);
        balance = (await pandoraQuery.balanceOf(signerAddress)).value.ok!;
        is_adminer = (await pandoraQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);

        try {
            await pandoraContract.withSigner(defaultSigner).tx.mint();
        } catch (error) {
            console.log(error)
        }

        new_last_token_id = (await pandoraQuery.getLastTokenId()).value.ok!;
        expect(new_last_token_id - last_token_id).to.equal(1);

        new_balance = (await pandoraQuery.balanceOf(signerAddress)).value.ok!;
        gain = new_balance - balance;
        expect(gain).to.equal(1);
    });

    it('Can multipleMintTicket', async () => {
        let last_token_id = (await pandoraQuery.getLastTokenId()).value.ok!;
        let amount = 4;
        // case 1: is not admin
        console.log(`===========Case 1=============`);
        let balance = (await pandoraQuery.balanceOf(aliceAddress)).value.ok!;
        let is_adminer = (await pandoraQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(false);

        try {
            await pandoraContract.withSigner(alice).tx.multipleMintTicket(amount);
        } catch (error) {

        }

        let new_last_token_id = (await pandoraQuery.getLastTokenId()).value.ok!;
        expect(new_last_token_id).to.equal(last_token_id);

        let new_balance = (await pandoraQuery.balanceOf(aliceAddress)).value.ok!;
        let gain = new_balance - balance
        expect(gain).to.equal(0);

        // case 2: is admin
        console.log(`===========Case 2=============`);
        balance = (await pandoraQuery.balanceOf(signerAddress)).value.ok!;
        is_adminer = (await pandoraQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);

        try {
            await pandoraContract.withSigner(defaultSigner).tx.multipleMintTicket(amount);
        } catch (error) {
            console.log(error)
        }

        new_last_token_id = (await pandoraQuery.getLastTokenId()).value.ok!;
        expect(new_last_token_id - last_token_id).to.equal(amount);

        new_balance = (await pandoraQuery.balanceOf(signerAddress)).value.ok!;
        gain = new_balance - balance;
        expect(gain).to.equal(amount);
    });

    it('Can mint with attributes', async () => {
        let name = 'token mint with attributes';
        let symbol = 'token 2';
        const metadata: [string, string][] = [[name, symbol]];
        let balanceBefore = (await pandoraQuery.balanceOf(signerAddress)).value.ok!.toString();
        let attributeCount = (await pandoraQuery.getAttributeCount()).value.ok!;

        // Mint with atributes
        await pandoraContract.withSigner(defaultSigner).tx.mintWithAttributes(metadata);

        let balanceAfter = (await pandoraQuery.balanceOf(signerAddress)).value.ok!.toString();
        let last_token_id = (await pandoraQuery.getLastTokenId()).value.ok!;
        const tokenId = PSP34Args.IdBuilder.U64(last_token_id);

        // Check banlance
        const gain = new BN(balanceAfter).sub(new BN(balanceBefore));
        expect(Number(gain.toString())).to.equal(1);

        // Check atribute
        let attribute = (await pandoraQuery.getAttribute(tokenId, name)).value.ok!.toString();
        expect(attribute).to.equal(symbol);

        // check atributes
        const vec: [string][] = [[name]];
        let attributes = (await pandoraQuery.getAttributes(tokenId, vec)).value.ok!;
        expect(attributes[0]).to.equal(symbol);

        // Check atribute count
        let new_attributeCount = (await pandoraQuery.getAttributeCount()).value.ok!;
        expect(new_attributeCount - attributeCount).to.equal(1);

        // Check attribute name by index
        let attributeName = (await pandoraQuery.getAttributeName(new_attributeCount)).value.ok!.toString();
        expect(attributeName).to.equal(name);
    })

    it('Can lock token', async () => {
        let last_token_id = (await pandoraQuery.getLastTokenId()).value.ok!;
        const tokenId = PSP34Args.IdBuilder.U64(last_token_id);
        let lockedTokenCount = (await pandoraQuery.getLockedTokenCount()).value.ok!;

        // lock token
        await pandoraContract.withSigner(defaultSigner).tx.lock(tokenId);

        // Check is locked token
        let islocked = (await pandoraQuery.isLockedNft(tokenId)).value.ok!;
        expect(islocked).to.equal(true);

        // Check last locked count
        let new_lockedTokenCount = (await pandoraQuery.getLockedTokenCount()).value.ok!;
        expect(new_lockedTokenCount - lockedTokenCount).to.equal(1);
    })

    it('Can set token uri', async () => {
        const tokenId = (await pandoraQuery.getLastTokenId()).value.ok!;
        const baseUri = 'token';

        // Set token uri
        await pandoraContract.withSigner(defaultSigner).tx.setBaseUri(baseUri);

        // Check token uri
        let tokenUri = (await pandoraQuery.tokenUri(tokenId)).value.ok!.toString();
        expect(tokenUri).to.equal(baseUri + tokenId + '.json');
    })

    it('Can set atribute', async () => {
        // min token
        await pandoraContract.withSigner(defaultSigner).tx.mint();
        let last_token_id = (await pandoraQuery.getLastTokenId()).value.ok!;

        // initialize
        let name = 'token set attributes';
        let symbol = 'token after';
        let metadata: [string, string][] = [[name, symbol]];
        let tokenId = PSP34Args.IdBuilder.U64(last_token_id);

        // Case 1: token not locked => success
        console.log(`===========Case 1=============`);

        // Set multiple attributes
        await pandoraContract.withSigner(defaultSigner).tx.setMultipleAttributes(tokenId, metadata);

        // Check atribute
        let attribute = (await pandoraQuery.getAttribute(tokenId, name)).value.ok!.toString();
        expect(attribute).to.equal(symbol);

        // Check atributes
        const vec: [string][] = [[name]];
        let attributes = (await pandoraQuery.getAttributes(tokenId, vec)).value.ok!;
        expect(attributes[0]).to.equal(symbol);

        // Check attribute name by index
        let attributesCount = (await pandoraQuery.getAttributeCount()).value.ok;
        let attributeName = (await pandoraQuery.getAttributeName(attributesCount)).value.ok!.toString();
        expect(attributeName).to.equal(name);

        // Case 2: token is locked => failed
        console.log(`===========Case 2=============`);

        // lock token
        await pandoraContract.withSigner(defaultSigner).tx.lock(tokenId);

        // Check is locked token
        let islocked = (await pandoraQuery.isLockedNft(tokenId)).value.ok!;
        expect(islocked).to.equal(true);

        // set multiple attribute
        let nameNew = 'token set attributes 123';
        let symbolNew = 'token after 123 ';
        let metadataNew: [string, string][] = [[nameNew, symbolNew]];

        // Set multiple attributes
        try { await pandoraContract.withSigner(defaultSigner).tx.setMultipleAttributes(tokenId, metadataNew); } catch (error) { }

        // Check attribute name by index
        attributeName = (await pandoraQuery.getAttributeName(attributesCount)).value.ok!.toString();
        expect(attributeName).to.equal(name);
    })

    it('Can burn', async () => {
        const tokenId = PSP34Args.IdBuilder.U64(1);
        const totalSupplyBefore = (await pandoraQuery.totalSupply()).value.ok!.toString();

        // Check token owner
        let owner = (await pandoraQuery.ownerOf(tokenId)).value.ok!.toString();
        expect(owner).to.equal(signerAddress);

        // Signer burn token
        await pandoraContract.withSigner(defaultSigner).tx.burn(owner, tokenId);
        const totalSupplyAfter = (await pandoraQuery.totalSupply()).value.ok!.toString();

        // Check total supply
        const value = new BN(totalSupplyBefore).sub(new BN(1)).toString();
        expect(value).to.equal(totalSupplyAfter);

        // Check owner after burn token
        owner = (await pandoraQuery.ownerOf(tokenId)).value.ok!;
        expect(owner).to.equal(null);
    })

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

    it('Can public buy', async () => {
    
    })

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});