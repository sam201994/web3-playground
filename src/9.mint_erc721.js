var ethers = require("ethers");
require("dotenv").config({ path: require("find-config")(".env") });

var url = process.env.PROVIDER_NETWORK;
const address = process.env.PUBLIC_ADDRESS_1;
const address2 = process.env.PUBLIC_ADDRESS_2;
const ft721Address = process.env.FT721_CONTRACT_ADDRESS;

var provider = new ethers.providers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY_1;
const wallet = new ethers.Wallet(privateKey, provider);

const artifact = require("./contracts/FT721.json");

//Contract details
const contract = new ethers.Contract(ft721Address, artifact.abi, wallet);

(async function () {
  let recipient = address2;

  let mintedToken = await contract.mint(recipient);
  let result = await mintedToken.wait();

  //You can inspect transaction on Etherscan
  console.log(`https:///mumbai.polygonscan.com/tx/${result.transactionHash}`);

  //You can inspect the token transfer activity on Etherscan
  console.log(`https:///mumbai.polygonscan.com/address/${contract.address}`);
})();
