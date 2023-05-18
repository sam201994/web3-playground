var ethers = require("ethers");
require('dotenv').config({ path: require('find-config')('.env') })

var url = process.env.PROVIDER_NETWORK;
const address2 = process.env.PUBLIC_ADDRESS_2;
const privateKey = process.env.PRIVATE_KEY_1;

var provider = new ethers.providers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);

//Transfer ether using IIFE function to enable async/await
(async function () {
  let tx = await wallet.sendTransaction({
    to: address2,
    value: ethers.utils.parseEther("0.00001"),
  });

  console.log(
    "Transaction request successfully sent! See Etherscan for details:"
  );
  console.log(`https:///mumbai.polygonscan.com/tx/${tx.hash}`);
  console.log("Now just waiting for transaction to be completed..");

  let completedTransaction = await tx.wait();
  delete completedTransaction.logsBloom;
  console.log("Transaction request successfully sent! Details:");
  console.log(completedTransaction);
})();
