const AboutUs = () => {
  return (
    <div className='flex justify-center items-center relative mt-0 h-screen w-full px-12 sm:px-14 md:px-16 lg:px-18 xl:px-20 2xl:px-40'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: "url('/cover.webp')" }}
      ></div>
      <div className='absolute inset-0 bg-tertiary-light dark:bg-tertiary-dark opacity-90 '></div>
      <div className='relative flex flex-col items-center justify-start pt-20 md:pt-30 xl:pt-40 lg:pt-50 h-full'>
        <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-bold mb-14'>
          404
        </h1>
        <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-10 uppercase'>
          Not CyberPunk Found
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
