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

import ConstructorsPsp34 from "./typed_contracts/constructors/pandora_psp34_standard";
import ContractPsp34 from "./typed_contracts/contracts/pandora_psp34_standard";

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

        /** step 1: create betaz token contract */
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

        /** step 2: create pandora psp34 contract */
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
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });

    it('Can initialize', async () => {
        // Check owner
        let owner = (await psp34Query.owner()).value.ok!.toString();
        expect(owner).to.equal(signerAddress);

        // Check stakingTokenContractAddress
        let betaz_token_address = (await psp34Query.getBetazTokenAddress()).value.ok!.toString();
        expect(betaz_token_address).to.equal(psp34TokenContractAddress);

        // Check PublicMintPrice
        let public_mint_price = (await psp34Query.getPublicMintPrice()).value.ok.rawNumber;
        expect(toNumber(public_mint_price)).to.equal(toNumber(psp34PublicMintPrice));
    });

    it('Can update initialize', async () => {
        const new_pandoraTokenContractAddress = tokenContractAddress;
        const new_publicMintPrice = new BN(10 * (10 ** tokenDecimal));

        // Check stakingTokenContractAddress
        await psp34Tx.setBetazTokenAddress(new_pandoraTokenContractAddress)
        let betaz_token_address = (await psp34Query.getBetazTokenAddress()).value.ok!.toString();
        expect(betaz_token_address).to.equal(new_pandoraTokenContractAddress);

        // Check PublicMintPrice
        await psp34Tx.setPublicMintPrice(new_publicMintPrice)
        let public_mint_price = (await psp34Query.getPublicMintPrice()).value.ok.rawNumber;
        expect(toNumber(public_mint_price)).to.equal(toNumber(new_publicMintPrice));
    });

    it('Can mint', async () => {
        let last_token_id = (await psp34Query.getLastTokenId()).value.ok!;
        // case 1: is not admin
        console.log(`===========Case 1=============`);
        let balance = (await psp34Query.balanceOf(aliceAddress)).value.ok!;
        let is_adminer = (await psp34Query.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(false);

        try {
            await psp34Contract.withSigner(alice).tx.mint();
        } catch (error) {

        }

        let new_last_token_id = (await psp34Query.getLastTokenId()).value.ok!;
        expect(new_last_token_id).to.equal(last_token_id);

        let new_balance = (await psp34Query.balanceOf(aliceAddress)).value.ok!;
        let gain = new_balance - balance
        expect(gain).to.equal(0);

        // case 2: is admin
        console.log(`===========Case 2=============`);
        balance = (await psp34Query.balanceOf(signerAddress)).value.ok!;
        is_adminer = (await psp34Query.hasRole(RoleType, signerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);

        try {
            await psp34Contract.withSigner(defaultSigner).tx.mint();
        } catch (error) {
            console.log(error)
        }

        new_last_token_id = (await psp34Query.getLastTokenId()).value.ok!;
        expect(new_last_token_id - last_token_id).to.equal(1);

        new_balance = (await psp34Query.balanceOf(signerAddress)).value.ok!;
        gain = new_balance - balance;
        expect(gain).to.equal(1);
    });

    it('Can multipleMintTicket', async () => {
        let last_token_id = (await psp34Query.getLastTokenId()).value.ok!;
        let amount = 4;
        // case 1: is not admin
        console.log(`===========Case 1=============`);
        let balance = (await psp34Query.balanceOf(aliceAddress)).value.ok!;
        let is_adminer = (await psp34Query.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(false);

        try {
            await psp34Contract.withSigner(alice).tx.multipleMintTicket(amount);
        } catch (error) {

        }

        let new_last_token_id = (await psp34Query.getLastTokenId()).value.ok!;
        expect(new_last_token_id).to.equal(last_token_id);

        let new_balance = (await psp34Query.balanceOf(aliceAddress)).value.ok!;
        let gain = new_balance - balance
        expect(gain).to.equal(0);

        // case 2: is admin
        console.log(`===========Case 2=============`);
        balance = (await psp34Query.balanceOf(signerAddress)).value.ok!;
        is_adminer = (await psp34Query.hasRole(RoleType, signerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);

        try {
            await psp34Contract.withSigner(defaultSigner).tx.multipleMintTicket(amount);
        } catch (error) {
            console.log(error)
        }

        new_last_token_id = (await psp34Query.getLastTokenId()).value.ok!;
        expect(new_last_token_id - last_token_id).to.equal(amount);

        new_balance = (await psp34Query.balanceOf(signerAddress)).value.ok!;
        gain = new_balance - balance;
        expect(gain).to.equal(amount);
    });

    it('Can mint with attributes', async () => {
        let name = 'token mint with attributes';
        let symbol = 'token 2';
        const metadata: [string, string][] = [[name, symbol]];
        let balanceBefore = (await psp34Query.balanceOf(signerAddress)).value.ok!.toString();
        let attributeCount = (await psp34Query.getAttributeCount()).value.ok!;

        // Mint with atributes
        await psp34Contract.withSigner(defaultSigner).tx.mintWithAttributes(metadata);

        let balanceAfter = (await psp34Query.balanceOf(signerAddress)).value.ok!.toString();
        let last_token_id = (await psp34Query.getLastTokenId()).value.ok!;
        const tokenId = PSP34Args.IdBuilder.U64(last_token_id);

        // Check banlance
        const gain = new BN(balanceAfter).sub(new BN(balanceBefore));
        expect(Number(gain.toString())).to.equal(1);

        // Check atribute
        let attribute = (await psp34Query.getAttribute(tokenId, name)).value.ok!.toString();
        expect(attribute).to.equal(symbol);

        // check atributes
        const vec: [string][] = [[name]];
        let attributes = (await psp34Query.getAttributes(tokenId, vec)).value.ok!;
        expect(attributes[0]).to.equal(symbol);

        // Check atribute count
        let new_attributeCount = (await psp34Query.getAttributeCount()).value.ok!;
        expect(new_attributeCount - attributeCount).to.equal(1);

        // Check attribute name by index
        let attributeName = (await psp34Query.getAttributeName(new_attributeCount)).value.ok!.toString();
        expect(attributeName).to.equal(name);
    })

    it('Can lock token', async () => {
        let last_token_id = (await psp34Query.getLastTokenId()).value.ok!;
        const tokenId = PSP34Args.IdBuilder.U64(last_token_id);
        let lockedTokenCount = (await psp34Query.getLockedTokenCount()).value.ok!;

        // lock token
        await psp34Contract.withSigner(defaultSigner).tx.lock(tokenId);

        // Check is locked token
        let islocked = (await psp34Query.isLockedNft(tokenId)).value.ok!;
        expect(islocked).to.equal(true);

        // Check last locked count
        let new_lockedTokenCount = (await psp34Query.getLockedTokenCount()).value.ok!;
        expect(new_lockedTokenCount - lockedTokenCount).to.equal(1);
    })

    it('Can set token uri', async () => {
        const tokenId = (await psp34Query.getLastTokenId()).value.ok!;
        const baseUri = 'token';

        // Set token uri
        await psp34Contract.withSigner(defaultSigner).tx.setBaseUri(baseUri);

        // Check token uri
        let tokenUri = (await psp34Query.tokenUri(tokenId)).value.ok!.toString();
        expect(tokenUri).to.equal(baseUri + tokenId + '.json');
    })

    it('Can set atribute', async () => {
        // min token
        await psp34Contract.withSigner(defaultSigner).tx.mint();
        let last_token_id = (await psp34Query.getLastTokenId()).value.ok!;

        // initialize
        let name = 'token set attributes';
        let symbol = 'token after';
        let metadata: [string, string][] = [[name, symbol]];
        let tokenId = PSP34Args.IdBuilder.U64(last_token_id);

        // Case 1: token not locked => success
        console.log(`===========Case 1=============`);

        // Set multiple attributes
        await psp34Contract.withSigner(defaultSigner).tx.setMultipleAttributes(tokenId, metadata);

        // Check atribute
        let attribute = (await psp34Query.getAttribute(tokenId, name)).value.ok!.toString();
        expect(attribute).to.equal(symbol);

        // Check atributes
        const vec: [string][] = [[name]];
        let attributes = (await psp34Query.getAttributes(tokenId, vec)).value.ok!;
        expect(attributes[0]).to.equal(symbol);

        // Check attribute name by index
        let attributesCount = (await psp34Query.getAttributeCount()).value.ok;
        let attributeName = (await psp34Query.getAttributeName(attributesCount)).value.ok!.toString();
        expect(attributeName).to.equal(name);

        // Case 2: token is locked => failed
        console.log(`===========Case 2=============`);

        // lock token
        await psp34Contract.withSigner(defaultSigner).tx.lock(tokenId);

        // Check is locked token
        let islocked = (await psp34Query.isLockedNft(tokenId)).value.ok!;
        expect(islocked).to.equal(true);

        // set multiple attribute
        let nameNew = 'token set attributes 123';
        let symbolNew = 'token after 123 ';
        let metadataNew: [string, string][] = [[nameNew, symbolNew]];

        // Set multiple attributes
        try { await psp34Contract.withSigner(defaultSigner).tx.setMultipleAttributes(tokenId, metadataNew); } catch (error) { }

        // Check attribute name by index
        attributeName = (await psp34Query.getAttributeName(attributesCount)).value.ok!.toString();
        expect(attributeName).to.equal(name);
    })

    it('Can burn', async () => {
        const tokenId = PSP34Args.IdBuilder.U64(6);
        const totalSupplyBefore = (await psp34Query.totalSupply()).value.ok!.toString();

        // Check token owner
        let owner = (await psp34Query.ownerOf(tokenId)).value.ok!.toString();
        expect(owner).to.equal(signerAddress);

        // Signer burn token
        await psp34Contract.withSigner(defaultSigner).tx.burn(owner, tokenId);
        const totalSupplyAfter = (await psp34Query.totalSupply()).value.ok!.toString();

        // Check total supply
        const value = new BN(totalSupplyBefore).sub(new BN(1)).toString();
        expect(value).to.equal(totalSupplyAfter);

        // Check owner after burn token
        owner = (await psp34Query.ownerOf(tokenId)).value.ok!;
        expect(owner).to.equal(null);
    })

    it('Can public buy', async () => {
        let public_mint_price = (await psp34Query.getPublicMintPrice()).value.ok!;

        // min betaz
        let amount = new BN(10 * toNumber(public_mint_price) * 10 ** tokenDecimal);
        await tokenContract.withSigner(minter).tx["betAzTrait::mint"](aliceAddress, amount);

        // approve
        await tokenContract.withSigner(alice).tx.increaseAllowance(psp34ContractAddress, amount);

        let balanceBuyer = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        let balanceContract = (await tokenQuery.balanceOf(psp34ContractAddress)).value.ok!;
        let nftBalanceBuyer = (await psp34Query.balanceOf(aliceAddress)).value.ok!;
        console.log({
            publicMintPrice: toNumber(public_mint_price),
            balanceBuyer: toNumber(balanceBuyer.toString()),
            balanceContract: toNumber(balanceContract.toString())
        })

        // case 1: amount > balanceBuyer => failed
        console.log(`===========Case 1=============`);

        let nft_amount = 11;
        let difference = new BN(nft_amount * toNumber(public_mint_price) * 10 ** tokenDecimal).sub(new BN(balanceBuyer.toString()));
        expect(toNumber(difference) > 0).to.equal(true);

        try {
            await psp34Contract.withSigner(alice).tx.publicBuy(nft_amount)
        } catch (error) {

        }

        let new_nftBalanceBuyer = (await psp34Query.balanceOf(aliceAddress)).value.ok!;
        let gain = new_nftBalanceBuyer - nftBalanceBuyer
        expect(gain).to.equal(0);

        // case 2: amount < balanceBuyer => success
        console.log(`===========Case 2=============`);

        nft_amount = 7;
        difference = new BN(nft_amount * toNumber(public_mint_price) * 10 ** tokenDecimal).sub(new BN(balanceBuyer.toString()));
        expect(toNumber(difference) < 0).to.equal(true);

        try {
            await psp34Contract.withSigner(alice).tx.publicBuy(nft_amount)
        } catch (error) {
            console.log(error)
        }

        new_nftBalanceBuyer = (await psp34Query.balanceOf(aliceAddress)).value.ok!;
        gain = new_nftBalanceBuyer - nftBalanceBuyer
        expect(gain).to.equal(nft_amount);
        let new_balanceBuyer = (await tokenQuery.balanceOf(aliceAddress)).value.ok!;
        let new_balanceContract = (await tokenQuery.balanceOf(psp34ContractAddress)).value.ok!;
        console.log({
            new_balanceBuyer: toNumber(new_balanceBuyer.toString()),
            new_balanceContract: toNumber(new_balanceContract.toString())
        })
    })

    it('Can burn betaz', async () => {
        await tokenTx.setAdminAddress(psp34ContractAddress)
        let betaz_amount_in_contract = (await tokenQuery.balanceOf(psp34ContractAddress)).value.ok!;
        console.log({ betaz_amount_in_contract: toNumber(betaz_amount_in_contract) })

        try {
            await psp34Tx.burnBetazToken();
        } catch (error) {
            console.log(error)
        }

        await delay(2000);
        let new_betaz_amount_in_contract = (await tokenQuery.balanceOf(psp34ContractAddress)).value.ok!;
        let gain = new BN(betaz_amount_in_contract.toString()).sub(new BN(new_betaz_amount_in_contract.toString()));
        expect(toNumber(gain)).to.equal(toNumber(betaz_amount_in_contract))
        console.log({ new_betaz_amount_in_contract: toNumber(new_betaz_amount_in_contract) })
    })

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});