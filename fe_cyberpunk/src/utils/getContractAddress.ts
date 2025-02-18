import loadDeployedAddresses from './loadDeployedAddresses';

export const getContractAddress = async (networkChainId: number, contractName: string): Promise<string> => {
    // Se non siamo connessi o il chainId non è valido, usa il default di Sepolia (11155111)
    if (!networkChainId || networkChainId === 0) {
        networkChainId = 11155111;
    }

    let contractAddress: string | undefined;

    if (import.meta.env.MODE === 'production') {
        // In produzione, usiamo la variabile d'ambiente (aggiornata) per garantire l'ultimo deploy
        contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        console.log('Production mode, using VITE_CONTRACT_ADDRESS:', contractAddress);
    } else {
        try {
            const deployedAddresses: { [key: string]: string } = loadDeployedAddresses(networkChainId);
            contractAddress = deployedAddresses[contractName];
            console.log('Loaded deployedAddresses:', deployedAddresses);
        } catch (error) {
            console.warn('Failed to load deployed addresses, falling back to environment variable');
            contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        }
    }

    if (!contractAddress) {
        throw new Error('Contract address not found');
    }
    return contractAddress;
};