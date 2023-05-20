var ethers = require("ethers");
require("dotenv").config({ path: require("find-config")(".env") });

var url = process.env.PROVIDER_NETWORK;
const ft721Address = process.env.FT721_CONTRACT_ADDRESS;

var provider = new ethers.providers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY_1;
const wallet = new ethers.Wallet(privateKey, provider);

const artifact = require("../contracts/FT721.json");

//Contract details
const contract = new ethers.Contract(ft721Address, artifact.abi, wallet);

async function getAllPastEvents() {
  // Get the block number of the latest block
  const latestBlockNumber = await provider.getBlockNumber();

  // Initialize an array to store all events
  const allEvents = [];

  const blockNumber = await provider.getBlockNumber();


  // Iterate over the contract's ABI to find all event names
  for (const item of artifact.abi) {
    if (item.type === 'event') {
      const eventName = item.name;
   

      // Retrieve past events for the current event name
      const events = await contract.queryFilter(eventName, blockNumber, blockNumber+10000);
      console.log({events})
      // Add the events to the allEvents array
      allEvents.push(...events);
    }
  }

  // Return the list of all events
  return allEvents;
}

getAllPastEvents()
  .then((events) => {
    console.log(events);
  })
  .catch((error) => {
    console.log('Error:', error);
  });

