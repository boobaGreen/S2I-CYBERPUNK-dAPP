import { ConnectButton } from '@rainbow-me/rainbowkit';
import useUserRole from '../hooks/useUserRole';
import Button from '../components/Button';

const Home = () => {
  const { isVendor, isClient, isDisconnected } = useUserRole();

  return (
    <div className='flex justify-center items-center relative mt-0 h-screen w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 2xl:px-40'>
      <div
        className={`absolute inset-0 bg-cover bg-center ${isDisconnected ? 'blur-sm' : ''}`}
        style={{ backgroundImage: "url('/cover.webp')" }}
      ></div>
      <div className='absolute inset-0 bg-tertiary-light dark:bg-tertiary-dark opacity-90'></div>
      <div className='relative flex flex-col items-center justify-start pt-20 md:pt-30 xl:pt-40 lg:pt-50 h-full'>
        <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold  mb-2 '>
          Welcome to
        </h1>
        <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-20 '>
          Cyberpunk Shop
        </h1>
        {isDisconnected && (
          <>
            <ConnectButton />
            <p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-10 '>
              Connect your wallet
            </p>
            <p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-4 '>
              to start shopping ...
            </p>
          </>
        )}
        {isClient && (
          <>
            <p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4'>
              You are connected
            </p>
            <p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-10 sm:mb-12 md:mb-16 lg:mb-20  '>
              and ready to shop.
            </p>
            <Button to='/products'>Go to Products</Button>
          </>
        )}
        {isVendor && (
          <>
            <p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl  mb-4  '>
              You are connected
            </p>
            <p className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-10 sm:mb-12 md:mb-16 lg:mb-20  '>
              as Admin
            </p>
            <Button to='/products'>Go to Products</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
