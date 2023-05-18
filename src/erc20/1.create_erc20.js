var ethers = require("ethers");
require('dotenv').config({ path: require('find-config')('.env') })

var url = process.env.PROVIDER_NETWORK;
const address = process.env.PUBLIC_ADDRESS_1; 
const address2 = process.env.PUBLIC_ADDRESS_2; 

var provider = new ethers.providers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY_1;

//Contract details
const artifact = require("../contracts/FT.json");
const initialBalance = ethers.utils.parseEther("10000.0");
const contractConstructorArgs = [initialBalance];

//Instantiations
const wallet = new ethers.Wallet(privateKey, provider);
const factory = new ethers.ContractFactory(
  artifact.abi,
  artifact.bytecode,
  wallet
);
const amount = ethers.utils.parseUnits("100.0", 18);

//Create a new contract
(async function () {
  const deployment = await factory.deploy(...contractConstructorArgs);
  const contract = await deployment.deployed();

  //You can now add the contract address to the .env file (ftAddress)
  console.log(
    `Success! You can now update your .env file: FT_CONTRACT_ADDRESS=${contract.address}`
  );

  //You can inspect the token transfer activity on Etherscan
  console.log(`https:///mumbai.polygonscan.com/address/${contract.address}`);
})();



