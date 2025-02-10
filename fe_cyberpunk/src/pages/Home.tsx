import useUserRole from '../hooks/useUserRole';

const Home = () => {
  const { isVendor, isClient } = useUserRole();

  return (
    <>
      <div className='mt-20 flex flex-col items-center justify-center'>
        <h1 className='text-2xl md:text-4xl lg:text-6xl font-bold mb-4 '>
          Welcome to the Home Page
        </h1>
        {isVendor && <p className='text-xl'>You are connected as a Vendor.</p>}
        {isClient && <p className='text-xl'>You are not a vendor.</p>}

      </div>
    </>
  );
};

export default Home;
