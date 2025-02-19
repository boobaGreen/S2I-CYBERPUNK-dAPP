import { ethers } from 'ethers';
import { getContractABI } from './getContractAbi';
import { getContractAddress } from './getContractAddress';

export const getContractInstance = async (
    contractName: string,
    useSigner: boolean = true // se true usa il signer, altrimenti modalità read‑only
) => {
    let provider;
    let signer = undefined;

    if (useSigner && window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        let accounts: any[] = [];
        try {
            // Prova a ottenere gli account; se fallisce, cattura l'errore e continua
            accounts = await provider.listAccounts();
        } catch (error) {
            // Non loggare l'errore (o logga in modalità debug)
            accounts = [];
        }

        if (accounts.length > 0) {
            try {
                signer = await provider.getSigner();
            } catch (error) {
                // Puoi decidere se loggare o meno l'errore
                // console.warn('Unable to get signer:', error);
            }
        } else {
            // Se non ci sono account connessi usa il provider read‑only con Infura
            provider = new ethers.InfuraProvider('sepolia', import.meta.env.VITE_INFURA_PROJECT_ID);
        }
    } else {
        // Usa il provider read‑only con Infura
        provider = new ethers.InfuraProvider('sepolia', import.meta.env.VITE_INFURA_PROJECT_ID);
    }

    const network = await provider.getNetwork();
    const contractAddress = await getContractAddress(Number(network.chainId), contractName);
    const contractABI = await getContractABI();
    const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer ? signer : provider
    );

    return { contract, signer, network, provider };
};