import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getContractAddress } from '../utils/getContractAddress';

export default function EnvBadge() {
  const envMode = import.meta.env.VITE_ENV_MODE || 'local';
  const [contractAddress, setContractAddress] = useState<string>('Loading...');
  const { chain } = useAccount();

  useEffect(() => {
    async function fetchAddress() {
      try {
        // Usa il chain id se disponibile, altrimenti default a Sepolia (11155111)
        const chainId = chain?.id || 11155111;
        const address = await getContractAddress(chainId, 'CyberPunkModule#CyberPunkBoutique');
        console.log('address', address);
        setContractAddress(address);
      } catch (error) {
        setContractAddress('Not available');
        console.error('Error fetching contract address:', error);
      }
    }
    fetchAddress();
  }, [chain]);

  return (
    <div className='absolute top-0 right-0 m-2 z-50'>
      <span className='bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold shadow-md'>
        {envMode.toUpperCase()} - {contractAddress}
      </span>
    </div>
  );
}
