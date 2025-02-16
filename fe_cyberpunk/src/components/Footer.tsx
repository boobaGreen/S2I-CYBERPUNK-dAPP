const Footer = () => {
  return (
    <footer className='bg-tertiary-light dark:bg-tertiary-dark text-secondary-dark dark:text-secondary-light py-8 mt-18'>
      <div className='text-center'>
        <a href='#' className='flex items-center justify-center mb-5 text-2xl font-semibold '>
          <img
            src='https://www.svgrepo.com/show/499962/music.svg'
            className='h-12 mr-3 sm:h-9'
            alt='CYBERPUNK Logo'
          />
          CyberPunk
        </a>

        <span className='block text-sm text-center '>
          © 2025 Claudio Dall'Ara™. All Rights Reserved. Built with
          <a href='https://hardhat.org/' className='text-primary-dark hover:underline ml-1'>
            HARDHAT
          </a>
          for
          <a
            href='https://www.start2impact.it/buddy/claudio-dallara/'
            className='text-primary-dark hover:underline ml-1'
          >
            START2IMPACT
          </a>
          .
        </span>

        <ul className='flex justify-center mt-5 space-x-5'>
          <li>
            <a href='#' className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'></path>
              </svg>
            </a>
          </li>
          <li>
            <a href='#' className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a href='#' className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                className='w-5 h-5'
                viewBox='0 0 310 310'
                aria-hidden='true'
              >
                <g id='XMLID_801_'>
                  <path
                    id='XMLID_802_'
                    d='M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73   C77.16,101.969,74.922,99.73,72.16,99.73z'
                  />
                  <path
                    id='XMLID_803_'
                    d='M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4   c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z'
                  />
                  <path
                    id='XMLID_804_'
                    d='M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599   c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319   c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995   C310,145.43,300.549,94.761,230.454,94.761z'
                  />
                </g>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
