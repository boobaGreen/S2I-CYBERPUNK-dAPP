import { ethers } from 'ethers';
import { getContractABI } from './getContractAbi';
import { getContractAddress } from './getContractAddress';


export const getContractInstance = async (contractName: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Ottieni la rete corrente
    const network = await provider.getNetwork();
 
    const contractAddress = await getContractAddress(Number(network.chainId), contractName);

    const contractABI = getContractABI();
    const contract = new ethers.Contract(contractAddress, (await contractABI).abi, signer);


    return { contract, signer, network, provider };
};