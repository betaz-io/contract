import { provider, expect, getSigners, checkAccountsBalance, decodeToBytes, toString, toNumber, setGasLimit } from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsBetazToken from "./typed_contracts/constructors/bet_token";
import ContractBetazToken from "./typed_contracts/contracts/bet_token";

import { BN } from '@polkadot/util';

describe('Betaz token test', () => {
    let api: any;
    let signers: any;
    let defaultSigner: any;
    let alice: any;
    let bob: any;
    let minter: any;
    let adminer: any;

    let contractAddress: any;
    let contract: any;
    let query: any;
    let tx: any;

    let signerAddress: string;
    let name: string;
    let symbol: string;
    let decimal: number;

    let aliceAddress: string;
    let bobAddress: string;
    let minterAddress: string;
    let adminerAddress: string;

    async function setup() {
        api = await ApiPromise.create({ provider });

        signers = getSigners();
        alice = signers[0];
        bob = signers[1];
        defaultSigner = signers[2];
        minter = signers[3];
        adminer = signers[4];

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

        name = "BETAZ TOKEN TESTNET";
        symbol = "BETAZ";
        decimal = 12;
        minterAddress = minter.address;
        adminerAddress = adminer.address;

        // "refTime: 7297609796"
        // "proofSize: 29793"
        let gasLimit = setGasLimit(api, 12_000_000_000, 48_000);

        const contractFactory = new ConstructorsBetazToken(api, defaultSigner);

        contractAddress = (
            await contractFactory.new(
                name,
                symbol,
                decimal,
                minterAddress,
                adminerAddress,
                { gasLimit }
            )
        ).address;

        console.log({ contractAddress: contractAddress });

        contract = new ContractBetazToken(contractAddress, defaultSigner, api);

        query = contract.query;
        tx = contract.tx;
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });

    it('Can mint', async () => {
        // mint to alice
        let alice_token_balance = (await query.balanceOf(aliceAddress)).value.ok!;
        const amount = new BN(100 * (10 ** decimal));
        console.log({ alice_token_balance: toNumber(alice_token_balance) })

        /** Case 1: mint when caller not minter */
        console.log(`===========Case 1=============`);
        let is_minter = (await query.isMinterAddress(aliceAddress)).value.ok!;
        expect(is_minter).to.equal(false);
        try {
            await contract.withSigner(alice).tx["betAzTrait::mint"](aliceAddress, amount);
        } catch (error) {

        }

        let new_alice_token_balance = (await query.balanceOf(aliceAddress)).value.ok!;
        let gain = new BN(new_alice_token_balance.toString()).sub(new BN(alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(0);

        /** Case 2: mint when caller is minter */
        console.log(`===========Case 2=============`);
        is_minter = (await query.isMinterAddress(minterAddress)).value.ok!;
        expect(is_minter).to.equal(true);
        try {
            await contract.withSigner(minter).tx["betAzTrait::mint"](aliceAddress, amount);
        } catch (error) {
            console.log({ error })
        }

        new_alice_token_balance = (await query.balanceOf(aliceAddress)).value.ok!;
        console.log({ new_alice_token_balance: toNumber(new_alice_token_balance) });
        gain = new BN(new_alice_token_balance.toString()).sub(new BN(alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(toNumber(amount));
    })

    it('Can burn', async () => {
        // mint to alice
        let alice_token_balance = (await query.balanceOf(aliceAddress)).value.ok!;
        const amount = new BN(50 * (10 ** decimal));
        console.log({ alice_token_balance: toNumber(alice_token_balance) })

        /** Case 1: mint when caller not adminer */
        console.log(`===========Case 1=============`);
        let is_adminer = (await query.isAdminAddress(aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(false);
        try {
            await contract.withSigner(alice).tx["betAzTrait::burn"](aliceAddress, amount);
        } catch (error) {

        }

        let new_alice_token_balance = (await query.balanceOf(aliceAddress)).value.ok!;
        let gain = new BN(alice_token_balance.toString()).sub(new BN(new_alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(0);

        /** Case 2: mint when caller is adminer */
        console.log(`===========Case 2=============`);
        is_adminer = (await query.isAdminAddress(adminerAddress)).value.ok!;
        expect(is_adminer).to.equal(true);
        try {
            await contract.withSigner(adminer).tx["betAzTrait::burn"](aliceAddress, amount);
        } catch (error) {
            console.log({ error })
        }

        new_alice_token_balance = (await query.balanceOf(aliceAddress)).value.ok!;
        console.log({ new_alice_token_balance: toNumber(new_alice_token_balance) });
        gain = new BN(alice_token_balance.toString()).sub(new BN(new_alice_token_balance.toString()))
        expect(toNumber(gain)).to.equal(toNumber(amount));
    })

    it('Can set minter and adminer', async () => {
        // set alicer to minter
        await tx.setMinterAddress(aliceAddress);
        let is_minter = (await query.isMinterAddress(aliceAddress)).value.ok!;
        expect(is_minter).to.equal(true);

        // set alicer to adminer
        await tx.setAdminAddress(aliceAddress);
        let is_adminer = (await query.isAdminAddress(aliceAddress)).value.ok!;
        expect(is_adminer).to.equal(true);
    })

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});