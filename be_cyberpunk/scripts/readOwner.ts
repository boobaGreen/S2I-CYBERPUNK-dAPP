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
    const provider = ethers.provider;

    // Ottieni il contratto CyberPunkBoutique distribuito con il provider specifico
    const contract = new ethers.Contract(contractAddress, CyberPunkBoutique.abi, provider);
    console.log('Contract:', contract);

    // Ottieni l'indirizzo del proprietario
    try {
        const owner = await contract.owner();
        console.log(`Owner address: ${owner}`);
    } catch (error) {
        console.error('Error fetching owner address:', error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});