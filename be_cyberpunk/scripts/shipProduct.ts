import { ethers } from 'hardhat';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import CyberPunkBoutique from '../artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json';

// Load environment variables from .env file
dotenv.config();

async function main() {
    // Get the chain ID of the current network
    const chainId = (await ethers.provider.getNetwork()).chainId;

    // Read the contract address from the JSON file specific to the network
    const addressesFilePath = path.join(
        __dirname,
        `../ignition/deployments/chain-${chainId}`,
        `deployed_addresses.json`
    );
    console.log(`Reading addresses from ${addressesFilePath}...`);
    const addresses = JSON.parse(fs.readFileSync(addressesFilePath, 'utf-8'));
    console.log('Addresses read successfully.', addresses);
    const contractAddress = addresses["CyberPunkModule#CyberPunkBoutique"];
    console.log('CyberPunkBoutique address: ', contractAddress);

    // Get the specific provider (signer)
    const [owner] = await ethers.getSigners();

    // Get the deployed CyberPunkBoutique contract with the specific provider
    const contract = new ethers.Contract(contractAddress, CyberPunkBoutique.abi, owner);

    // Define the product ID and tracking number
    const productId = 4; // Replace with the actual product ID
    const trackingNumber = "TRACK123456"; // Replace with the actual tracking number

    // Mark the product as shipped
    const tx = await contract.shipProduct(productId, trackingNumber);
    await tx.wait();

    console.log(`Product ${productId} marked as shipped with tracking number: ${trackingNumber}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
