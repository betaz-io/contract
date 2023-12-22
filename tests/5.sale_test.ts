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

import ConstructorsSale from "./typed_contracts/constructors/sale";
import ContractSale from "./typed_contracts/contracts/sale";

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

    // sale pool contract
    let saleContractAddress: any;
    let saleContract: any;
    let saleQuery: any;
    let saleTx: any;

    let saleAdminAddress: string;
    let saleTokenContractAddress: string;

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

        /** step 1: create betaz token contract */
        console.log(`===========Create new betaz token contract=============`);

        try {
            saleAdminAddress = adminer.address;
            saleTokenContractAddress = tokenContractAddress;

            // "refTime: 2987938869"
            // "proofSize: 21779"
            let gasLimit = setGasLimit(api, 9_600_000_000, 36_000);

            const contractFactory = new ConstructorsSale(api, defaultSigner);

            saleContractAddress = (
                await contractFactory.new(
                    saleAdminAddress,
                    saleTokenContractAddress,
                    { gasLimit }
                )
            ).address;

            console.log({ saleContractAddress });

            saleContract = new ContractSale(saleContractAddress, defaultSigner, api);

            saleQuery = saleContract.query;
            saleTx = saleContract.tx;
        } catch (error) {
            console.log("Step 2 ERROR:", error)
        }

    };

    before(async () => {
        // console.log("Start");
        await setup();
    });

    it('Can initialize', async () => {
        // Check owner
        let owner = (await saleQuery.owner()).value.ok!.toString();
        expect(owner).to.equal(signerAddress);

        // Check betaz Address
        let betaz_address = (await saleQuery.getBetazTokenAddress()).value.ok!.toString();
        expect(betaz_address).to.equal(saleTokenContractAddress);
    });

    it('Can update token address', async () => {
        let betaz_address = (await saleQuery.getBetazTokenAddress()).value.ok!.toString();

        try {
            await saleTx.setBetazTokenAddress(player1.address)
        } catch (error) {
            console.log(error)
        }
        // Check betaz Address
        betaz_address = (await saleQuery.getBetazTokenAddress()).value.ok!.toString();
        expect(betaz_address).to.equal(player1.address);

        // back to origin 
        await saleTx.setBetazTokenAddress(tokenContractAddress)
    });

    it('Can add pool by pool type', async () => {
        // step 1: set sale contract to minter token contract
        console.log(`===========Step 1=============`);
        await tokenTx.setMinterAddress(saleContractAddress)
        await tokenTx.setAdminAddress(saleContractAddress)

        let saleTokenBalance = (await tokenQuery.balanceOf(saleContractAddress)).value.ok.rawNumber;
        console.log({ saleTokenBalance: toNumber(saleTokenBalance) })

        // step 2: add pool 
        /// init
        let poolType = "Sale";
        let buy_status = true;
        let end_time_buy = +new Date().getTime();
        let total_amount = new BN(100 * (10 ** 12));
        let total_purchased_amount = new BN(0);
        let price = new BN(0.8 * (10 ** 12));
        let difference = new BN(total_amount.toString()).sub(new BN(total_purchased_amount.toString()));
        // case 1: caller is not admin => failed
        console.log(`===========Step 2 - case 1=============`);
        let hasRole = (await saleQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(hasRole).to.equal(false);

        end_time_buy = new Date().getTime() + 360000;
        total_purchased_amount = new BN(0);

        try {
            await saleContract.withSigner(alice).tx.addPoolByPoolType(poolType, buy_status, end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {

        }

        let new_saleTokenBalance = (await tokenQuery.balanceOf(saleContractAddress)).value.ok.rawNumber;
        let gain = new BN(new_saleTokenBalance.toString()).sub(new BN(saleTokenBalance.toString()))
        expect(toNumber(gain)).to.equal(0);
        // case 2: end time buy < currentTime => failed
        console.log(`===========Step 2 - case 2=============`);
        hasRole = (await saleQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(hasRole).to.equal(true);

        end_time_buy = new Date().getTime() - 20000;
        total_purchased_amount = new BN(0);

        try {
            await saleContract.withSigner(defaultSigner).tx.addPoolByPoolType(poolType, buy_status, end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {

        }

        new_saleTokenBalance = (await tokenQuery.balanceOf(saleContractAddress)).value.ok.rawNumber;
        gain = new BN(new_saleTokenBalance.toString()).sub(new BN(saleTokenBalance.toString()))
        expect(toNumber(gain)).to.equal(0);

        // case 3: end time buy > currentTime and total_purchased_amount > total_amount => failed
        console.log(`===========Step 2 - case 3=============`);

        end_time_buy = new Date().getTime() + 360000;
        total_purchased_amount = new BN(1).add(total_amount)

        try {
            await saleContract.withSigner(defaultSigner).tx.addPoolByPoolType(poolType, buy_status, end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {

        }

        new_saleTokenBalance = (await tokenQuery.balanceOf(saleContractAddress)).value.ok!;
        gain = new BN(new_saleTokenBalance.toString()).sub(new BN(saleTokenBalance.toString()))
        expect(toNumber(gain)).to.equal(0);

        // case 4: end time buy > currentTime and total_purchased_amount <= total_amount => success
        console.log(`===========Step 2 - case 4=============`);

        end_time_buy = new Date().getTime() + 360000;
        total_purchased_amount = new BN(0);

        try {
            await saleContract.withSigner(defaultSigner).tx.addPoolByPoolType(poolType, buy_status, end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {
            console.log(error)
        }

        new_saleTokenBalance = (await tokenQuery.balanceOf(saleContractAddress)).value.ok.rawNumber;
        gain = new BN(new_saleTokenBalance.toString()).sub(new BN(saleTokenBalance.toString()))
        expect(toNumber(gain)).to.equal(toNumber(difference));

        let poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        console.log({ poolSaleInfo, new_saleTokenBalance: toNumber(new_saleTokenBalance) });

        // case 5: pool is exist => failed
        console.log(`===========Step 2 - case 5=============`);

        end_time_buy = new Date().getTime() + 720000;
        total_purchased_amount = new BN(0);

        try {
            await saleContract.withSigner(defaultSigner).tx.addPoolByPoolType(poolType, buy_status, end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {

        }

        new_saleTokenBalance = (await tokenQuery.balanceOf(saleContractAddress)).value.ok.rawNumber;
        gain = new BN(new_saleTokenBalance.toString()).sub(new BN(saleTokenBalance.toString()))
        expect(toNumber(gain)).to.equal(toNumber(difference));
    });

    it('Can update pool by pool type', async () => {
        let saleTokenBalance = (await tokenQuery.balanceOf(saleContractAddress)).value.ok.rawNumber;
        let poolType = "Sale";
        let poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        console.log({ poolSaleInfo, saleTokenBalance: toNumber(saleTokenBalance) });

        /// init
        let buy_status = !poolSaleInfo.buyStatus;
        let end_time_buy = poolSaleInfo.endTimeBuy;
        let total_amount = poolSaleInfo.totalAmount;
        let total_purchased_amount = poolSaleInfo.totalPurchasedAmount;
        let price = poolSaleInfo.price;
        // case 1: pool is not exist => failed
        console.log(`===========Step 2 - case 1=============`);

        end_time_buy = new Date().getTime() + 720000;
        total_purchased_amount = new BN(20 * (10 ** 12));
        price = new BN(1 * (10 ** 12));

        let teamPool = (await saleQuery.getPoolSaleInfo("Team")).value.ok!;
        expect(teamPool).to.equal(null);
        try {
            await saleContract.withSigner(defaultSigner).tx.updateSalePoolInfoPoolType(poolType, "Team", end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {

        }

        let new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        expect(new_poolSaleInfo.buyStatus).to.equal(poolSaleInfo.buyStatus);
        expect(new_poolSaleInfo.endTimeBuy).to.equal(poolSaleInfo.endTimeBuy);
        expect(new_poolSaleInfo.totalAmount).to.equal(poolSaleInfo.totalAmount);
        expect(new_poolSaleInfo.totalPurchasedAmount).to.equal(poolSaleInfo.totalPurchasedAmount);
        expect(new_poolSaleInfo.price).to.equal(poolSaleInfo.price);

        // case 2: caller is not admin => failed
        console.log(`===========Step 2 - case 2=============`);
        let hasRole = (await saleQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(hasRole).to.equal(false);

        end_time_buy = new Date().getTime() + 720000;
        total_purchased_amount = new BN(20 * (10 ** 12));
        price = new BN(1 * (10 ** 12));

        try {
            await saleContract.withSigner(alice).tx.updateSalePoolInfoPoolType(poolType, buy_status, end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        expect(new_poolSaleInfo.buyStatus).to.equal(poolSaleInfo.buyStatus);
        expect(new_poolSaleInfo.endTimeBuy).to.equal(poolSaleInfo.endTimeBuy);
        expect(new_poolSaleInfo.totalAmount).to.equal(poolSaleInfo.totalAmount);
        expect(new_poolSaleInfo.totalPurchasedAmount).to.equal(poolSaleInfo.totalPurchasedAmount);
        expect(new_poolSaleInfo.price).to.equal(poolSaleInfo.price);

        // case 3: end time buy < currentTime => failed
        console.log(`===========Step 2 - case 3=============`);
        hasRole = (await saleQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(hasRole).to.equal(true);

        end_time_buy = new Date().getTime() - 20000;
        total_purchased_amount = new BN(20 * (10 ** 12));

        try {
            await saleContract.withSigner(defaultSigner).tx.updateSalePoolInfoPoolType(poolType, buy_status, end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        expect(new_poolSaleInfo.buyStatus).to.equal(poolSaleInfo.buyStatus);
        expect(new_poolSaleInfo.endTimeBuy).to.equal(poolSaleInfo.endTimeBuy);
        expect(new_poolSaleInfo.totalAmount).to.equal(poolSaleInfo.totalAmount);
        expect(new_poolSaleInfo.totalPurchasedAmount).to.equal(poolSaleInfo.totalPurchasedAmount);
        expect(new_poolSaleInfo.price).to.equal(poolSaleInfo.price);

        // case 4: end time buy > currentTime and total_purchased_amount > total_amount => failed
        console.log(`===========Step 2 - case 4=============`);

        end_time_buy = new Date().getTime() + 720000;
        total_purchased_amount = new BN(total_amount.toString()).add(new BN(1))

        try {
            await saleContract.withSigner(defaultSigner).tx.updateSalePoolInfoPoolType(poolType, buy_status, end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        expect(new_poolSaleInfo.buyStatus).to.equal(poolSaleInfo.buyStatus);
        expect(new_poolSaleInfo.endTimeBuy).to.equal(poolSaleInfo.endTimeBuy);
        expect(new_poolSaleInfo.totalAmount).to.equal(poolSaleInfo.totalAmount);
        expect(new_poolSaleInfo.totalPurchasedAmount).to.equal(poolSaleInfo.totalPurchasedAmount);
        expect(new_poolSaleInfo.price).to.equal(poolSaleInfo.price);

        // case 5: end time buy > currentTime and total_purchased_amount <= total_amount => success
        console.log(`===========Step 2 - case 5=============`);

        end_time_buy = new Date().getTime() + 720000;
        total_purchased_amount = new BN(20 * (10 ** 12));
        price = new BN(1 * (10 ** 12));

        try {
            await saleContract.withSigner(defaultSigner).tx.updateSalePoolInfoPoolType(poolType, buy_status, end_time_buy, total_amount, total_purchased_amount, price)
        } catch (error) {
            console.log(error)
        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        expect(new_poolSaleInfo.buyStatus).to.equal(buy_status);
        expect(new_poolSaleInfo.endTimeBuy).to.equal(end_time_buy);
        expect(new_poolSaleInfo.totalAmount).to.equal(Number(total_amount.toString()));
        expect(new_poolSaleInfo.totalPurchasedAmount).to.equal(Number(total_purchased_amount.toString()));
        expect(new_poolSaleInfo.price).to.equal(Number(price.toString()));

        saleTokenBalance = (await tokenQuery.balanceOf(saleContractAddress)).value.ok.rawNumber;
        console.log({ new_poolSaleInfo, saleTokenBalance: toNumber(saleTokenBalance) })
    });

    it('Can add whitelist', async () => {
        let poolType = "Sale";
        let poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        let totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        console.log({ poolSaleInfo, totalRemainingAmount: toNumber(totalRemainingAmount) });

        /// init
        let account = aliceAddress;
        let amount = new BN(10 * (10 ** 12));
        let price = new BN(0.5 * (10 ** 12));

        // case 1: caller is not admin => failed
        console.log(`===========case 1=============`);
        let hasRole = (await saleQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(hasRole).to.equal(false);

        try {
            await saleContract.withSigner(alice).tx.addWhitelist(poolType, account, amount, price)
        } catch (error) {

        }

        let new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        let gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        let new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

        // case 2: amount > totalRemainingAmount => failed
        console.log(`===========case 2=============`);
        hasRole = (await saleQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(hasRole).to.equal(true);

        amount = new BN(poolSaleInfo.totalAmount.toString()).add(new BN(1));

        try {
            await saleContract.withSigner(defaultSigner).tx.addWhitelist(poolType, account, amount, price)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

        // case 3: amount <= totalRemainingAmount => success
        console.log(`===========case 3=============`);

        amount = new BN(10 * (10 ** 12));

        try {
            await saleContract.withSigner(defaultSigner).tx.addWhitelist(poolType, account, amount, price)
        } catch (error) {
            console.log(error)
        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(toNumber(amount));
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(toNumber(amount));
        let whitelistInfo = (await saleQuery.getWhitelistInfo(poolType, account)).value.ok!;

        console.log({ new_poolSaleInfo, new_totalRemainingAmount: toNumber(new_totalRemainingAmount), whitelistInfo });

        // case 4: whitelist is exist => failed
        console.log(`===========case 4=============`);
        poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        try {
            await saleContract.withSigner(defaultSigner).tx.addWhitelist(poolType, account, amount, price)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

    });

    it('Can multiple add whitelist', async () => {
        let poolType = "Sale";
        let poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        let totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        console.log({ poolSaleInfo, totalRemainingAmount: toNumber(totalRemainingAmount) });

        /// init
        let accounts = [player1.address, player2.address];
        let amounts = [new BN(10 * (10 ** 12)), new BN(10 * (10 ** 12))];
        let prices = [new BN(0.5 * (10 ** 12)), new BN(0.5 * (10 ** 12))];

        // case 1: caller is not admin => failed
        console.log(`===========case 1=============`);
        let hasRole = (await saleQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(hasRole).to.equal(false);

        try {
            await saleContract.withSigner(alice).tx.addMultiWhitelists(poolType, accounts, amounts, prices)
        } catch (error) {

        }

        let new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        let gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        let new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

        // case 2: whitelist is exist => failed
        console.log(`===========case 2=============`);

        accounts = [aliceAddress, player2.address];

        try {
            await saleContract.withSigner(defaultSigner).tx.addMultiWhitelists(poolType, accounts, amounts, prices)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

        // case 3: amount > totalRemainingAmount => failed
        console.log(`===========case 3=============`);
        hasRole = (await saleQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(hasRole).to.equal(true);

        accounts = [player1.address, player2.address];
        amounts = [new BN(poolSaleInfo.totalAmount.toString()).add(new BN(1)), new BN(10 * (10 ** 12))];

        try {
            await saleContract.withSigner(defaultSigner).tx.addMultiWhitelists(poolType, accounts, amounts, prices)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

        // case 4: amount <= totalRemainingAmount => success
        console.log(`===========case 4=============`);

        amounts = [new BN(10 * (10 ** 12)), new BN(10 * (10 ** 12))];

        try {
            await saleContract.withSigner(defaultSigner).tx.addMultiWhitelists(poolType, accounts, amounts, prices)
        } catch (error) {
            console.log(error)
        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(amounts.reduce(
            (total, record) => total + toNumber(record),
            0
        ));
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(amounts.reduce(
            (total, record) => total + toNumber(record),
            0
        ));
        let whitelistInfo1 = (await saleQuery.getWhitelistInfo(poolType, accounts[0])).value.ok!;
        let whitelistInfo2 = (await saleQuery.getWhitelistInfo(poolType, accounts[1])).value.ok!;
        console.log({ new_poolSaleInfo, new_totalRemainingAmount: toNumber(new_totalRemainingAmount), whitelistInfo1, whitelistInfo2 });

    });

    it('Can buy with whitelist', async () => {
        let poolType = "Sale"
        let amount = new BN(4 * 10 ** 12);
        let poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        let whitelistInfo = (await saleQuery.getWhitelistInfo(poolType, aliceAddress)).value.ok!;
        let whitelistRemainingAmount = new BN(whitelistInfo.amount.toString()).sub(new BN(whitelistInfo.purchasedAmount));
        let buyerTokenBalance = (await tokenQuery.balanceOf(aliceAddress)).value.ok.rawNumber;
        let aliceBalance = await showAZBalance(api, aliceAddress);

        console.log({ poolSaleInfo, whitelistInfo, buyerTokenBalance: toNumber(buyerTokenBalance), aliceBalance })
        // case 1: buy_status false => falied
        console.log(`===========case 1=============`);
        expect(poolSaleInfo.buyStatus).to.equal(false);
        let fee = new BN(amount.toString()).mul(new BN(whitelistInfo.price.toString())).div(new BN(10 ** 12));

        try {
            await saleContract.withSigner(alice).tx.whitelistBuy(poolType, amount, { value: fee })
        } catch (error) {

        }

        let new_whitelistInfo = (await saleQuery.getWhitelistInfo(poolType, aliceAddress)).value.ok!;
        let gain = new BN((new_whitelistInfo.purchasedAmount).toString()).sub(new BN((whitelistInfo.purchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        let new_whitelistRemainingAmount = new BN(new_whitelistInfo.amount.toString()).sub(new BN(new_whitelistInfo.purchasedAmount));
        gain = new BN(whitelistRemainingAmount.toString()).sub(new BN(new_whitelistRemainingAmount.toString()));
        expect(toNumber(gain)).to.equal(0);
        let new_buyerTokenBalance = (await tokenQuery.balanceOf(aliceAddress)).value.ok.rawNumber;
        gain = new BN(new_buyerTokenBalance.toString()).sub(new BN(buyerTokenBalance.toString()));
        expect(toNumber(gain)).to.equal(0);

        // case 2: amount > whitelistRemainingAmount => falied
        console.log(`===========case 2=============`);
        // update buy status
        await saleContract.withSigner(defaultSigner).tx.updateSalePoolInfoPoolType(
            poolType,
            !poolSaleInfo.buyStatus,
            new Date().getTime() + 360000,
            poolSaleInfo.totalAmount,
            poolSaleInfo.totalPurchasedAmount,
            poolSaleInfo.price
        )
        expect(poolSaleInfo.buyStatus).to.equal(false);

        amount = new BN(whitelistRemainingAmount.toString()).add(new BN(1));
        fee = new BN(amount.toString()).mul(new BN(whitelistInfo.price.toString())).div(new BN(10 ** 12));

        try {
            await saleContract.withSigner(alice).tx.whitelistBuy(poolType, amount, { value: fee })
        } catch (error) {

        }

        new_whitelistInfo = (await saleQuery.getWhitelistInfo(poolType, aliceAddress)).value.ok!;
        gain = new BN((new_whitelistInfo.purchasedAmount).toString()).sub(new BN((whitelistInfo.purchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        new_whitelistRemainingAmount = new BN(new_whitelistInfo.amount.toString()).sub(new BN(new_whitelistInfo.purchasedAmount));
        gain = new BN(whitelistRemainingAmount.toString()).sub(new BN(new_whitelistRemainingAmount.toString()));
        expect(toNumber(gain)).to.equal(0);
        new_buyerTokenBalance = (await tokenQuery.balanceOf(aliceAddress)).value.ok.rawNumber;
        gain = new BN(new_buyerTokenBalance.toString()).sub(new BN(buyerTokenBalance.toString()));
        expect(toNumber(gain)).to.equal(0);

        // case 3: amount <= whitelistRemainingAmount => success
        console.log(`===========case 3=============`);
        amount = new BN(4 * 10 ** 12);
        fee = new BN(amount.toString()).mul(new BN(whitelistInfo.price.toString())).div(new BN(10 ** 12));

        try {
            await saleContract.withSigner(alice).tx.whitelistBuy(poolType, amount, { value: fee })
        } catch (error) {
            console.log(error)
        }

        new_whitelistInfo = (await saleQuery.getWhitelistInfo(poolType, aliceAddress)).value.ok!;
        gain = new BN((new_whitelistInfo.purchasedAmount).toString()).sub(new BN((whitelistInfo.purchasedAmount)));
        expect(toNumber(gain)).to.equal(toNumber(amount));
        new_whitelistRemainingAmount = new BN(new_whitelistInfo.amount.toString()).sub(new BN(new_whitelistInfo.purchasedAmount));
        gain = new BN(whitelistRemainingAmount.toString()).sub(new BN(new_whitelistRemainingAmount.toString()));
        expect(toNumber(gain)).to.equal(toNumber(amount));
        new_buyerTokenBalance = (await tokenQuery.balanceOf(aliceAddress)).value.ok.rawNumber;
        gain = new BN(new_buyerTokenBalance.toString()).sub(new BN(buyerTokenBalance.toString()));
        expect(toNumber(gain)).to.equal(toNumber(amount));

        aliceBalance = await showAZBalance(api, aliceAddress);

        console.log({ new_whitelistInfo, new_buyerTokenBalance: toNumber(new_buyerTokenBalance), aliceBalance })
    });

    it('Can buy with SalePool', async () => {
        let poolType = "Sale"
        let amount = new BN(2 * 10 ** 12);

        let poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        let totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;

        // alice
        let whitelistInfo = (await saleQuery.getWhitelistInfo(poolType, aliceAddress)).value.ok!;
        let whitelistRemainingAmount = new BN(whitelistInfo.amount.toString()).sub(new BN(whitelistInfo.purchasedAmount));
        let aliceTokenBalance = (await tokenQuery.balanceOf(aliceAddress)).value.ok.rawNumber;
        let aliceBalance = await showAZBalance(api, aliceAddress);

        // bob
        let bobTokenBalance = (await tokenQuery.balanceOf(bobAddress)).value.ok.rawNumber;
        let bobBalance = await showAZBalance(api, bobAddress);

        console.log({
            poolSaleInfo,
            whitelistInfo,
            aliceTokenBalance: toNumber(aliceTokenBalance),
            aliceBalance,
            bobTokenBalance: toNumber(bobTokenBalance),
            bobBalance
        })
        // case 1: buyer not in whitelist => success
        console.log(`===========case 1=============`);
        let fee = new BN(amount.toString()).mul(new BN(poolSaleInfo.price.toString())).div(new BN(10 ** 12));

        try {
            await saleContract.withSigner(bob).tx.buyWithSalePool(amount, { value: fee })
        } catch (error) {
            console.log(error)
        }


        let new_bobTokenBalance = (await tokenQuery.balanceOf(bobAddress)).value.ok.rawNumber;
        let gain = new BN(new_bobTokenBalance.toString()).sub(new BN(bobTokenBalance.toString()));
        expect(toNumber(gain)).to.equal(toNumber(amount));
        let new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN(totalRemainingAmount.toString()).sub(new BN(new_totalRemainingAmount.toString()));
        expect(toNumber(gain)).to.equal(toNumber(amount));

        bobBalance = await showAZBalance(api, bobAddress);
        console.log({ new_bobTokenBalance: toNumber(new_bobTokenBalance), bobBalance })

        // case 2: buyer in whitelist => success
        console.log(`===========case 2=============`);
        fee = new BN(amount.toString()).mul(new BN(whitelistInfo.price.toString())).div(new BN(10 ** 12));

        try {
            await saleContract.withSigner(alice).tx.buyWithSalePool(amount, { value: fee })
        } catch (error) {
            console.log(error)
        }

        let new_whitelistInfo = (await saleQuery.getWhitelistInfo(poolType, aliceAddress)).value.ok!;
        gain = new BN((new_whitelistInfo.purchasedAmount).toString()).sub(new BN((whitelistInfo.purchasedAmount)));
        expect(toNumber(gain)).to.equal(toNumber(amount));
        let new_whitelistRemainingAmount = new BN(new_whitelistInfo.amount.toString()).sub(new BN(new_whitelistInfo.purchasedAmount));
        gain = new BN(whitelistRemainingAmount.toString()).sub(new BN(new_whitelistRemainingAmount.toString()));
        expect(toNumber(gain)).to.equal(toNumber(amount));
        let new_aliceTokenBalance = (await tokenQuery.balanceOf(aliceAddress)).value.ok.rawNumber;
        gain = new BN(new_aliceTokenBalance.toString()).sub(new BN(aliceTokenBalance.toString()));
        expect(toNumber(gain)).to.equal(toNumber(amount));

        aliceBalance = await showAZBalance(api, aliceAddress);
        console.log({ new_whitelistInfo, new_aliceTokenBalance: toNumber(new_aliceTokenBalance), aliceBalance })

        poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        console.log({ poolSaleInfo })
    });

    it('Can multiple update whitelist', async () => {
        let poolType = "Sale";
        let poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        let totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        console.log({ poolSaleInfo, totalRemainingAmount: toNumber(totalRemainingAmount) });

        /// init
        let accounts = [player1.address, player2.address];
        let amounts = [new BN(15 * (10 ** 12)), new BN(15 * (10 ** 12))];
        let prices = [new BN(0.8 * (10 ** 12)), new BN(0.8 * (10 ** 12))];

        // case 1: caller is not admin => failed
        console.log(`===========case 1=============`);
        let hasRole = (await saleQuery.hasRole(RoleType, aliceAddress)).value.ok!;
        expect(hasRole).to.equal(false);

        try {
            await saleContract.withSigner(alice).tx.updateMultiWhitelists(poolType, accounts, amounts, prices)
        } catch (error) {

        }

        let new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        let gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        let new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

        // case 2: whitelist is not exist => failed
        console.log(`===========case 2=============`);

        accounts = [bobAddress, player2.address];

        try {
            await saleContract.withSigner(defaultSigner).tx.updateMultiWhitelists(poolType, accounts, amounts, prices)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

        // case 3: amount > totalRemainingAmount => failed
        console.log(`===========case 3=============`);
        hasRole = (await saleQuery.hasRole(RoleType, signerAddress)).value.ok!;
        expect(hasRole).to.equal(true);

        accounts = [player1.address, player2.address];
        amounts = [new BN(poolSaleInfo.totalAmount.toString()).add(new BN(1)), new BN(10 * (10 ** 12))];

        try {
            await saleContract.withSigner(defaultSigner).tx.updateMultiWhitelists(poolType, accounts, amounts, prices)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

        // case 4: whitePurchaseAmount > 0 => failed
        console.log(`===========case 4=============`);
        accounts = [alice.address, player2.address];
        amounts = [new BN(15 * (10 ** 12)), new BN(15 * (10 ** 12))];
        let whitelistInfo = (await saleQuery.getWhitelistInfo(poolType, accounts[0])).value.ok!;
        expect(whitelistInfo.purchasedAmount > 0).to.equal(true)

        try {
            await saleContract.withSigner(defaultSigner).tx.updateMultiWhitelists(poolType, accounts, amounts, prices)
        } catch (error) {

        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        expect(toNumber(gain)).to.equal(0);
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));
        expect(toNumber(gain)).to.equal(0);

        // case 5: amount <= totalRemainingAmount => success
        console.log(`===========case 5=============`);
        accounts = [player1.address, player2.address];
        amounts = [new BN(20 * (10 ** 12)), new BN(20 * (10 ** 12))];

        try {
            await saleContract.withSigner(defaultSigner).tx.updateMultiWhitelists(poolType, accounts, amounts, prices)
        } catch (error) {
            console.log(error)
        }

        new_poolSaleInfo = (await saleQuery.getPoolSaleInfo(poolType)).value.ok!;
        gain = new BN((new_poolSaleInfo.totalPurchasedAmount).toString()).sub(new BN((poolSaleInfo.totalPurchasedAmount)));
        new_totalRemainingAmount = (await saleQuery.getPoolSaleTotalRemainingAmount()).value.ok!;
        gain = new BN((totalRemainingAmount).toString()).sub(new BN((new_totalRemainingAmount)));

        let whitelistInfo1 = (await saleQuery.getWhitelistInfo(poolType, accounts[0])).value.ok!;
        let whitelistInfo2 = (await saleQuery.getWhitelistInfo(poolType, accounts[1])).value.ok!;
        console.log({ new_poolSaleInfo, new_totalRemainingAmount: toNumber(new_totalRemainingAmount), whitelistInfo1, whitelistInfo2 });
    });

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});