require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

require('dotenv').config();

const SEPOLIA_TEST_API_URL = process.env.SEPOLIA_TEST_API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.18",
  // defaultNetwork: "sepolia",
  paths: {
    //sources: "./src/contracts",
    artifacts: "./src/artifacts",
  },
  networks: {
    sepolia: {
      url: SEPOLIA_TEST_API_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
