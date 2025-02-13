import loadDeployedAddresses from './loadDeployedAddresses';

export const getContractAddress = async (networkChainId: number, contractName: string) => {
    let contractAddress;

    if (import.meta.env.MODE === 'development') {
        try {
            const deployedAddresses: { [key: string]: string } = loadDeployedAddresses(networkChainId);
            contractAddress = deployedAddresses[contractName];
        } catch (error) {
            console.warn('Failed to load deployed addresses, falling back to environment variable');
            contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        }
    } else {
        contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    }

    if (!contractAddress) {
        throw new Error('Contract address not found');
    }

    return contractAddress;
};