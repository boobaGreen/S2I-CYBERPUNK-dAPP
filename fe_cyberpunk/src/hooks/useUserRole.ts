import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getContractInstance } from '../utils/getContractInstance';

const useUserRole = () => {
    const { isConnected, isDisconnected } = useAccount();
    const [isVendor, setIsVendor] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOwnerAddress = async () => {
            if (!isConnected) {
                setLoading(false);
                return;
            }

            try {
                const { contract, signer } = await getContractInstance('CyberPunkModule#CyberPunkBoutique');

                // Ottieni l'indirizzo del proprietario
                const ownerAddress = await contract.owner();


                // Confronta l'indirizzo del proprietario con l'indirizzo dell'utente corrente
                if (signer) {
                    const userAddress = await signer.getAddress();
                    setIsVendor(userAddress.toLowerCase() === ownerAddress.toLowerCase());
                } else {
                    console.error('Signer is undefined');
                }
            } catch (error) {
                console.error('Error fetching owner address:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOwnerAddress();
    }, [isConnected]);

    return { isVendor, isClient: isConnected && !isVendor, isDisconnected, loading };
};

export default useUserRole;