// import loadDeployedAddresses from './loadDeployedAddresses';

// export const getContractAddress = async (networkChainId: number, contractName: string) => {
//     let contractAddress;

//     if (import.meta.env.MODE === 'development') {
//         try {
//             const deployedAddresses: { [key: string]: string } = loadDeployedAddresses(networkChainId);
//             contractAddress = deployedAddresses[contractName];
//             console.log("contractAddress  in local", contractAddress)
//         } catch (error) {
//             console.warn('Failed to load deployed addresses, falling back to environment variable');
//             contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
//         }
//     } else {
//         contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
//         console.log("contract address in sepolia , ", contractAddress)
//     }

//     if (!contractAddress) {
//         throw new Error('Contract address not found');
//     }

//     return contractAddress;
// };

export const getContractAddress = async (_networkChainId: number, _contractName: string) => {
    // Temporaneamente restituisce sempre l'indirizzo fisso
    const contractAddress = "0xea1A14F7f4938b955413d3d274c5720794419Dea";
    console.log("Using fixed contract address:", contractAddress);

    if (!contractAddress) {
        throw new Error('Contract address not found');
    }

    return contractAddress;
};