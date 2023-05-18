var ethers = require("ethers");
require("dotenv").config({ path: require("find-config")(".env") });
const artifact = require("../contracts/FT721.json");

var url = process.env.PROVIDER_NETWORK;
const address1 = process.env.PUBLIC_ADDRESS_1;
const address2 = process.env.PUBLIC_ADDRESS_2;
const ft721Address = process.env.FT721_CONTRACT_ADDRESS;

var provider = new ethers.providers.JsonRpcProvider(url);

async function getTokenBalance(add, acc) {
  try {
    const contract = new ethers.Contract(ft721Address, artifact.abi, provider);

    const balance = await contract.balanceOf(add);
    console.log(
      `Token balance of ft721Token for address${acc}:`,
      balance.toString()
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

getTokenBalance(address1, "1");
getTokenBalance(address2, "2");
