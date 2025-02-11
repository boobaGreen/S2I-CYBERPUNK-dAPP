import { ethers } from 'hardhat';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import CyberPunkBoutique from '../artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json';

// Carica le variabili di ambiente dal file .env
dotenv.config();

async function main() {
    // Ottieni il chain ID della rete corrente
    const chainId = (await ethers.provider.getNetwork()).chainId;

    // Leggi l'indirizzo del contratto dal file JSON specifico per la rete
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

    // Ottieni il provider (signer) specifico
    const [owner] = await ethers.getSigners();

    // Ottieni il contratto CyberPunkBoutique distribuito con il provider specifico
    const contract = new ethers.Contract(contractAddress, CyberPunkBoutique.abi, owner);

    // Dati del prodotto
    const productName = 'CyberPunk T-Shirt';
    const productPrice = ethers.parseUnits('1', 'ether'); // 1 ETH
    const productCID = 'QmTJYCLTrdRb7eS6T2LCRFQoS86fGMTeDYQPHWbK2As8xZ';

    // Aggiungi il prodotto
    const tx = await contract.createProduct(productName, productPrice, productCID);
    await tx.wait();

    console.log(`Product added successfully with transaction hash: ${tx.hash}`);

    // Leggi il prodotto appena aggiunto
    const productCount = await contract.productCount();
    const newProduct = await contract.products(productCount);
    console.log(`Newly added product:`, newProduct);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});