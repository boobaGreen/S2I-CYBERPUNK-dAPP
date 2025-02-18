import loadDeployedAddresses from './loadDeployedAddresses';

export const getContractAddress = async (networkChainId: number, contractName: string): Promise<string> => {
    // Se non siamo connessi o il chainId non è valido, usa il default di Sepolia (11155111)
    if (!networkChainId || networkChainId === 0) {
        networkChainId = 11155111;
    }

    let contractAddress: string | undefined;

    try {
        const deployedAddresses: { [key: string]: string } = loadDeployedAddresses(networkChainId);
        contractAddress = deployedAddresses[contractName];
        console.log('deployedAddresses- da getContractAddress.ts', deployedAddresses);
    } catch (error) {
        console.warn('Failed to load deployed addresses, falling back to environment variable');
        contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    }
    console.log('contractAddress- da getContractAddress.ts', contractAddress);
    if (!contractAddress) {
        throw new Error('Contract address not found');
    }

    return contractAddress;
};