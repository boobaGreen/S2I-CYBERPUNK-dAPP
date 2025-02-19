import { getCoverImage } from '../constants/coverImage';

const AboutUs = () => {
  return (
    <div className='flex justify-center items-center relative mt-0 h-screen w-full px-12 sm:px-14 md:px-16 lg:px-18 xl:px-20 2xl:px-40'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url('${getCoverImage()}')` }}
      ></div>
      <div className='absolute inset-0  '></div>
      <div className='relative flex flex-col items-center justify-start pt-20 md:pt-30 xl:pt-40 lg:pt-50 h-full text-white'>
        {/* <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-bold mb-14 bg-tertiary-light dark:bg-tertiary-dark p-3 rounded-4xl'>
          About Us
        </h1> */}
        <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-bold mb-10 uppercase opacity-80 bg-tertiary-light dark:bg-tertiary-dark p-12 rounded-4xl'>
          Founded in 2025 Cyberpunk Shop, your number one source for all things cyberpunk fashion.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
