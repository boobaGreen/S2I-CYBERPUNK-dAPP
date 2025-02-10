import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify"; // only for manual verify not necessary for Ignition
import "@nomicfoundation/hardhat-ignition-ethers";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // default Hardhat
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [
        `0x${process.env.PROVIDER_PRIVATE_KEY}`, // address of the provider of the Trip
        `0x${process.env.CLIENT_PRIVATE_KEY}`, // address of the client
      ],
    },
  },
  etherscan: { apiKey: process.env.ETHERSCAN_API_KEY }, // necessary for both : manual verify and Ignition
  sourcify: {
    enabled: true,
  },
};

export default config;
