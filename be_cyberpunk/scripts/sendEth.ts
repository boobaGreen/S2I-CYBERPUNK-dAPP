import { ethers } from 'hardhat';

async function main() {
    const [sender] = await ethers.getSigners();
    const recipient = process.env.RECIPIENT_ADDRESS;

    if (!recipient) {
        console.error('Please provide a recipient address as an environment variable.');
        process.exit(1);
    }

    const amount = ethers.parseEther('90'); // 90 ETH

    console.log(`Sending 100 ETH from ${sender.address} to ${recipient}...`);

    const tx = await sender.sendTransaction({
        to: recipient,
        value: amount,
    });

    await tx.wait();

    console.log(`Transaction successful with hash: ${tx.hash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });