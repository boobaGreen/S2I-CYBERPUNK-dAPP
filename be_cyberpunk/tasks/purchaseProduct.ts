import { task } from "hardhat/config";
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

task("purchaseProduct", "Simulates a product purchase")
    .addParam("productid", "The ID of the product to purchase")
    .setAction(async (taskArgs, hre) => {
        const { productid } = taskArgs;
        const ethers = hre.ethers;

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

        // Use require to load the CyberPunkBoutique artifact
        const CyberPunkBoutique = require('../artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json');

        // Get the deployed CyberPunkBoutique contract
        const contract = new ethers.Contract(contractAddress, CyberPunkBoutique.abi, ethers.provider);

        // Get the product details
        const product = await contract.products(productid);
        const productPrice = product.price;

        // Get the buyer's signer
        const buyerSigner = new ethers.Wallet(process.env.CLIENT_PRIVATE_KEY!, ethers.provider);

        // Simulate the purchase
        const tx = await buyerSigner.sendTransaction({
            to: contractAddress,
            value: productPrice,
            data: contract.interface.encodeFunctionData("purchaseProduct", [productid])
        });

        await tx.wait();

        console.log(`Product ${productid} purchased successfully by ${buyerSigner.address} with transaction hash: ${tx.hash}`);
    });

export default {};