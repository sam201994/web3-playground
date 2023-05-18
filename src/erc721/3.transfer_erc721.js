var ethers = require("ethers");
require("dotenv").config({ path: require("find-config")(".env") });
//Contract Details
const artifact = require("../contracts/FT721.json");

//Instantiations
var url = process.env.PROVIDER_NETWORK;
const address1 = process.env.PUBLIC_ADDRESS_1;
const address2 = process.env.PUBLIC_ADDRESS_2;

var provider = new ethers.providers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY_2;
const ft721Address = process.env.FT721_CONTRACT_ADDRESS;

const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(ft721Address, artifact.abi, wallet);

//Transfer a token from wallet holder (account2) to account1
(async function () {
  let transaction = await contract.transferFrom(address2, address1, 2);
  let result = await transaction.wait();

  //You can inspect transaction on Etherscan
  console.log(`https:///mumbai.polygonscan.com/tx/${result.transactionHash}`);

  //You can inspect the token transfer activity on Etherscan
  console.log(`https:///mumbai.polygonscan.com/address/${contract.address}`);

  //You can also inpect token balances on a single account
  console.log(
    `https:///mumbai.polygonscan.com/address/${contract.address}?a=${address1}`
  );
})();
