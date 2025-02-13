import { ethers } from 'hardhat';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    // Get the vendor and client addresses from the environment variables
    const vendorAddress = new ethers.Wallet(process.env.PROVIDER_PRIVATE_KEY!).address;
    const clientAddress = new ethers.Wallet(process.env.CLIENT_PRIVATE_KEY!).address;

    // Get the balance of the vendor
    const vendorBalance = await ethers.provider.getBalance(vendorAddress);
    console.log(`Vendor balance: ${ethers.formatEther(vendorBalance)} ETH`);

    // Get the balance of the client
    const clientBalance = await ethers.provider.getBalance(clientAddress);
    console.log(`Client balance: ${ethers.formatEther(clientBalance)} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});