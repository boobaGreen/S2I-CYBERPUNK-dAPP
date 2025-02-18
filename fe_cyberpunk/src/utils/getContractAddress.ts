import loadDeployedAddresses from './loadDeployedAddresses';

export const getContractAddress = async (networkChainId: number, contractName: string) => {
    let contractAddress: string | undefined;

    if (import.meta.env.MODE === 'development') {
        console.log("chainId:", networkChainId);
        try {
            // Se non siamo connessi (networkChainId non valido o 0), assumiamo il default di Sepolia (11155111)
            if (!networkChainId || networkChainId === 0) {
                networkChainId = 11155111;
            }
            const deployedAddresses: { [key: string]: string } = loadDeployedAddresses(networkChainId);
            contractAddress = deployedAddresses[contractName];

        } catch (error) {
            console.warn('Failed to load deployed addresses, falling back to environment variable');
            contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        }
    } else {
        // In produzione uso la variabile d'ambiente
        contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

    }

    if (!contractAddress) {
        throw new Error('Contract address not found');
    }


    return contractAddress;
};