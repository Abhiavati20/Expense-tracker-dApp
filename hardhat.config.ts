import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    arbitrumSepolia: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: 421614,
      accounts:[SEPOLIA_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey:ETHERSCAN_API_KEY
  }
};

export default config;
