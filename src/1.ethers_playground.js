var ethers = require("ethers");
require('dotenv').config({ path: require('find-config')('.env') })

var url = process.env.PROVIDER_NETWORK;

var customHttpProvider = new ethers.providers.JsonRpcProvider(url);

customHttpProvider.getBlockNumber().then((result) => {
  console.log("Current block number: " + result);
}).catch((e) => {
	console.log(e)
});

const rawAccount1 = ethers.Wallet.createRandom();
const account1 = {
  address1: rawAccount1.address,
  privateKey1: rawAccount1.privateKey,
};
console.log(account1);

const rawAccount2 = ethers.Wallet.createRandom();
const account2 = {
  address2: rawAccount2.address,
  privateKey2: rawAccount2.privateKey,
};
console.log(account2);

