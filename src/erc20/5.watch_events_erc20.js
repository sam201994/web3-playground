var ethers = require("ethers");
require('dotenv').config({ path: require('find-config')('.env') })
//Contract Details
const artifact = require("../contracts/FT.json");

//Instantiations
var url = process.env.PROVIDER_NETWORK;

var provider = new ethers.providers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY_1;
const ftAddress = process.env.FT_CONTRACT_ADDRESS;

const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(ftAddress, artifact.abi, wallet);

//Transfer a token from wallet holder (account1) to account2
(async function () {
contract.on("Transfer", (from, to, value, event) => {
    let transferEvent = {
      from: from,
      to: to,
      value: ethers.utils.formatUnits(value, 6),
      data: event,
    };

    console.log(JSON.stringify(transferEvent, null, 4));
  });
})();
