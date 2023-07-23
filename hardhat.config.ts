import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

const FORK_RPC_URL = "https://rpc.ankr.com/eth"; // Replace this with the provided RPC URL

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: FORK_RPC_URL,
      },
    },
  },
  solidity: {
    version: "0.8.19", // Change this to the version you need
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: "YOUR_ETHERSCAN_API_KEY", // Replace this with your Etherscan API key to verify contracts (optional)
  },
};

export default config;
