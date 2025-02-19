import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getCoverImage } from '../constants/coverImage';
import { useAccount } from 'wagmi';

const Home = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/products', { replace: true });
    }
  }, [isConnected, navigate]);

  return (
    <div className='relative min-h-screen'>
      <div
        className={`absolute inset-0 bg-cover bg-center ${!isConnected ? 'blur-sm' : ''}`}
        style={{ backgroundImage: `url('${getCoverImage()}')` }}
      ></div>
      <div className='absolute inset-0 bg-tertiary-light dark:bg-tertiary-dark opacity-30'></div>
      {!isConnected && (
        <div className='absolute inset-0 flex justify-center items-center z-20 text-white'>
          <div className='relative flex flex-col items-center justify-start pt-20 md:pt-30 xl:pt-40 lg:pt-50 h-full px-12 sm:px-14 md:px-16 lg:px-18 xl:px-20 2xl:px-40'>
            <div className='bg-tertiary-light dark:bg-tertiary-dark p-12 rounded-4xl mb-14 opacity-85'>
              <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-bold mb-14'>
                Connect your wallet
              </h1>
              <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-bold'>
                to start shopping
              </h1>
            </div>
            <ConnectButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
