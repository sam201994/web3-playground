var ethers = require("ethers");
require('dotenv').config({ path: require('find-config')('.env') })

var url = process.env.PROVIDER_NETWORK;
const address = process.env.PUBLIC_ADDRESS_1; 
const address2 = process.env.PUBLIC_ADDRESS_2; 

var provider = new ethers.providers.JsonRpcProvider(url);
const getBalanceAsync = async (address) => {
  let rawBalance = await provider.getBalance(address);
  return ethers.utils.formatEther(rawBalance);
};

// Get balances using IIFE function to enable async/await
(async function () {
  const account1Balance = await getBalanceAsync(address);
  const account2Balance = await getBalanceAsync(address2);
  console.log(`Account1 balance: ${account1Balance}`);
  console.log(`Account2 balance: ${account2Balance}`);
})();
