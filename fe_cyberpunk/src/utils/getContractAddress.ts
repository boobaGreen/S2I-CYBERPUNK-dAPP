import loadDeployedAddresses from './loadDeployedAddresses';

export const getContractAddress = async (networkChainId: number, contractName: string) => {
    let contractAddress: string | undefined;

    if (import.meta.env.MODE === 'development') {
        try {
            // In sviluppo carichiamo gli indirizzi dall'apposita cartella
            const deployedAddresses: { [key: string]: string } = loadDeployedAddresses(networkChainId);
            contractAddress = deployedAddresses[contractName];
            console.log("Contract address (development):", contractAddress);
        } catch (error) {
            console.warn('Failed to load deployed addresses, falling back to environment variable');
            contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        }
    } else {
        // In produzione leggo sempre dalla variabile ENV
        contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        console.log("Contract address (production):", contractAddress);
    }

    if (!contractAddress) {
        throw new Error('Contract address not found');
    }

    console.log("Final contractAddress:", contractAddress);
    return contractAddress;
};