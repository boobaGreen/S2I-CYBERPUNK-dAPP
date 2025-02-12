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

    // Leggi i dati dei prodotti dal file JSON
    const productsFilePath = path.join(__dirname, './exampleData/products.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    for (const product of products) {
        const { name, price, cid } = product;
        const productPrice = ethers.parseUnits(price, 'ether');

        // Aggiungi il prodotto
        const tx = await contract.createProduct(name, productPrice, cid);
        await tx.wait();

        console.log(`Product ${name} added successfully with transaction hash: ${tx.hash}`);
    }

    // Leggi il numero totale di prodotti
    const productCount = await contract.productCount();
    console.log(`Total products: ${productCount}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});