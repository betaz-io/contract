import { provider, expect, getSigners, checkAccountsBalance, decodeToBytes, toString, setGasLimit } from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsBetazRandom from "./typed_contracts/constructors/betaz_random";
import ContractBetazRandom from "./typed_contracts/contracts/betaz_random";

import { BN } from '@polkadot/util';

describe('Betaz random test', () => {
    let api: any;
    let signers: any;
    let defaultSigner: any;
    let alice: any;
    let bob: any;

    let contractAddress: any;
    let contract: any;
    let query: any;
    let tx: any;

    let signerAddress: string;
    let name: string;
    let symbol: string;

    let oracleRandomnessAddress: string;
    let aliceAddress: string;
    let bobAddress: string;

    async function setup() {
        api = await ApiPromise.create({ provider });

        signers = getSigners();
        defaultSigner = signers[2];
        alice = signers[0];
        bob = signers[1];

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
        oracleRandomnessAddress = '5CSQdMyKCxtoeVsBC8xbufeapux3YDV74eYXcHV4UKUu1NeF';

        // "refTime: 650578413"
        // "proofSize: 17324"
        let gasLimit = setGasLimit(api, 960_000_000, 36_000);

        const contractFactory = new ConstructorsBetazRandom(api, defaultSigner);

        contractAddress = (
            await contractFactory.new(
                oracleRandomnessAddress,
                { gasLimit }
            )
        ).address;

        console.log({ contractAddress: contractAddress });

        contract = new ContractBetazRandom(contractAddress, defaultSigner, api);

        query = contract.query;
        tx = contract.tx;
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });

    it('Can get round and random number for round', async () => {
        const latest_round = (await query.getLatestRound()).value.ok!;
        const random_number_for_round = (await query.getRandomNumberForRound(latest_round)).value.ok!;
        console.log({ latest_round, random_number_for_round })
    })

    it('Can set oracleRandomnessAddress', async () => {
        let oracleRandomnessAddress = (await query.getRandomnessOracleContractAddress()).value.ok!;
        console.log({ oracleRandomnessAddress });
        const newOracleRandomnessAddress = "5Grpo53UbArhM6uJNCrJTnyVy3BXYuxk5M4TNAwDnAgmrrjg"
        await contract.withSigner(defaultSigner).tx.setRandomnessOracleContractAddress(newOracleRandomnessAddress);
        oracleRandomnessAddress = (await query.getRandomnessOracleContractAddress()).value.ok!;
        console.log({ newOracleRandomnessAddress: oracleRandomnessAddress });
        expect(oracleRandomnessAddress).to.equal(newOracleRandomnessAddress)
    })

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});