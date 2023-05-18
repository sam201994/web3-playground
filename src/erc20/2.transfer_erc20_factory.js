var ethers = require("ethers");
require('dotenv').config({ path: require('find-config')('.env') })

var url = process.env.PROVIDER_NETWORK;
const toAddress = process.env.PUBLIC_ADDRESS_2;
var provider = new ethers.providers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY_1;

const ftAddress = process.env.FT_CONTRACT_ADDRESS; 
//Contract details
const artifact = require("../contracts/FT.json");
const signer = new ethers.Wallet(privateKey, provider);
const factory = new ethers.ContractFactory(
  artifact.abi,
  artifact.bytecode,
  signer
);

(async function () {
  const amount = ethers.utils.parseUnits("1.0", 18);
  const data = factory.interface.encodeFunctionData("transfer", [
    toAddress,
    amount,
  ]);

  const tx = await signer.sendTransaction({
    to: ftAddress,
    from: signer.address,
    value: ethers.utils.parseUnits("0.000", "ether"),
    data: data,
  });

  console.log("Mining transaction...");
  console.log(tx.hash);

  // Waiting for the transaction to be mined
  const receipt = await tx.wait();

  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
})();
