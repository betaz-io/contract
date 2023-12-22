
## Introduction

This is the location of all files to test Ink Whale Contract using typechain-polkadot

Examples and information can be found at

https://github.com/Supercolony-net/typechain-polkadot (examples folder)
https://github.com/727-Ventures/openbrush-contracts/tree/main/tests/e2e


## Quick Guide:

1. Copy **.contract and .json** files from target/ink folders for each contract into **artifacts** folder
2. Rename **metadata.json** to **<contract_name>.json** to match .contract file
3. Run **npx @727-ventures/typechain-polkadot --in artifacts --out typed_contracts** to let typechain-polkadot convert ABI to typescript files
4. Import the files to .ts and start using
For example:
import Contract from "./typed_contracts/contracts/betaz_random";
import Constructors from "./typed_contracts/constructors/betaz_random";
5. Create test file in .ts
6. Run **npm install**
7. run one test
* Betaz random: **npm run test:random**
* Betaz token: **npm run test:token**
* Betaz core: **npm run test:core**
* Staking pool: **npm run test:staking**
* Sale pool: **npm run test:sale**
* Pandora pool: **npm run test:pandora**
* DAO: **npm run test:dao**
8. Run all tests **npm run test:mocha**

## Test Files
1. File "1.betaz_random_test.ts": Test betaz random contract
2. File "2.betaz_token_test.ts": Test betaz token contract
3. File "3.betaz_core_test.ts": Test betaz core contract
4. File "4.staking_test.ts": Test staking pool contract
5. File "5.sale_test.ts": Test sale pool contract
6. File "6.pandora_test.ts": Test pandora pool contract
7. File "7.dao_test.ts": Test dao contract
