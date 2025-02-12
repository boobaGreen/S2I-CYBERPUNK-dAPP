import hre from "hardhat";
import CyberPunkModule from "../ignition/modules/CyperPunk";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const chainId = (await hre.ethers.provider.getNetwork()).chainId;
    console.log("Chain ID:", chainId);

    let deployer, client;

    const useEnvKeys = process.env.USE_ENV_KEYS === 'true';

    if (useEnvKeys) {
        deployer = new hre.ethers.Wallet(
            process.env.PROVIDER_PRIVATE_KEY!,
            hre.ethers.provider
        );
        client = new hre.ethers.Wallet(
            process.env.CLIENT_PRIVATE_KEY!,
            hre.ethers.provider
        );
    } else { // Local network using default signers
        [deployer, client] = await hre.ethers.getSigners();
    }

    console.log(`Deployer address: ${deployer.address}`);

    const initialBalance = hre.ethers.parseEther("45"); // 100 ETH
    const hexBalance = `0x${initialBalance.toString(16)}`;

    if (Number(chainId) === 1337) { // Local Hardhat network
        await hre.ethers.provider.send("hardhat_setBalance", [
            deployer.address,
            hexBalance,
        ]);

        await hre.ethers.provider.send("hardhat_setBalance", [
            client.address,
            hexBalance,
        ]);

        console.log(
            `Assigned ${initialBalance} ETH to deployer: ${deployer.address}`
        );
        console.log(`Assigned ${initialBalance} ETH to client: ${client.address}`);
    }

    const { cyberPunkBoutique } = await hre.ignition.deploy(CyberPunkModule, {
        defaultSender: deployer.address,
        // Include the deployer and client addresses
    });

    console.log(`CyberPunkBoutique deployed to: ${cyberPunkBoutique.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});