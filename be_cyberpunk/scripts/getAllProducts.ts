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

    // Get the total number of products
    const productCount = await contract.productCount();
    console.log(`Total products: ${productCount.toString()}`);

    // Verify all registered products
    for (let i = 1; i <= productCount; i++) {
        const product = await contract.products(i);
        console.log(`Product ${i}:`, product);

        // Display the product details
        console.log(`Product ID: ${product.id}`);
        console.log(`Name: ${product.name}`);
        console.log(`Price: ${ethers.formatUnits(product.price, 'ether')} ETH`);
        console.log(`CID: ${product.cid}`);
        console.log(`Tracking Number: ${product.trackingNumber}`);
        console.log(`State: ${product.state}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});