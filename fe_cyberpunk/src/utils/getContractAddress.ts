import loadDeployedAddresses from './loadDeployedAddresses';

export const getContractAddress = async (
    networkChainId: number,
    contractName: string
): Promise<string> => {
    // Se non siamo connessi o il chainId non è valido, usa il default di Sepolia (11155111)
    if (!networkChainId || networkChainId === 0) {
        networkChainId = 11155111;
    }

    let contractAddress: string | undefined;

    if (import.meta.env.VITE_ENV_MODE === "production") {
        // In produzione, utilizziamo la variabile d'ambiente
        contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

    } else {
        // In sviluppo usiamo il file JSON dei deployed addresses
        try {
            const deployedAddresses: { [key: string]: string } = loadDeployedAddresses(networkChainId);
            contractAddress = deployedAddresses[contractName];

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