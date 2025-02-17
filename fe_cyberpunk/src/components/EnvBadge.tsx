import { useEffect, useState } from 'react';
import { getContractAddress } from '../utils/getContractAddress';

export default function EnvBadge() {
  const envMode = import.meta.env.VITE_ENV_MODE || 'local';
  const [contractAddress, setContractAddress] = useState<string>('Loading...');

  useEffect(() => {
    async function fetchAddress() {
      try {
        // Assumiamo che il contratto si chiami 'CyberPunkModule#CyberPunkBoutique'
        // E networkChainId venga ottenuto dal provider all'interno di getContractAddress
        const address = await getContractAddress(0, 'CyberPunkModule#CyberPunkBoutique');
        setContractAddress(address);
      } catch (error) {
        setContractAddress('Not available');
        console.error('Error fetching contract address:', error);
      }
    }
    fetchAddress();
  }, []);

  return (
    <div className='absolute top-0 right-0 m-2 z-50'>
      <span className='bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold shadow-md'>
        {envMode.toUpperCase()} - {contractAddress}
      </span>
    </div>
  );
}
