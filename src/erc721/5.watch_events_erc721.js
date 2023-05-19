var ethers = require("ethers");
require("dotenv").config({ path: require("find-config")(".env") });

var url = process.env.PROVIDER_NETWORK;
const address = process.env.PUBLIC_ADDRESS_1;
const address2 = process.env.PUBLIC_ADDRESS_2;
const ft721Address = process.env.FT721_CONTRACT_ADDRESS;

var provider = new ethers.providers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY_1;
const wallet = new ethers.Wallet(privateKey, provider);

const artifact = require("../contracts/FT721.json");

//Contract details
const contract = new ethers.Contract(ft721Address, artifact.abi, wallet);
const zeroAddress = ethers.constants.AddressZero;


(async function () {
	  const filter = contract.filters.Transfer(ethers.constants.AddressZero, null, null);

	  // console.log(filter)

  contract.on(filter, (from, to, value, event) => {
    let transferEvent = {
      from: from,
      to: to,
      value: ethers.utils.formatUnits(value, 6),
      data: event,
    };

    console.log(JSON.stringify(transferEvent, null, 4));
  });

})();
