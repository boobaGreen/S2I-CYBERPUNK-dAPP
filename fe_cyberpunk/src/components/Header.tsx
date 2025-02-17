import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { classNames } from '../utils/classNames';
import { navigation } from '../utils/navigation';
import EnvBadge from './EnvBadge'; // Importa il nuovo componente

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <Disclosure as='nav' className='bg-transparent'>
      {({}) => (
        <>
          {/* EnvBadge posizionato in alto a destra */}
          <EnvBadge />
          <div className='relative flex items-center justify-end px-2 md:px-6 lg:px-8 py-6'>
            <div className='flex items-center'>
              <ConnectButton showBalance={true} />
            </div>
          </div>
          {/* Il resto del contenuto header */}
          <div className='mx-auto px-2 md:px-6 lg:px-8 py-6'>
            <div className='relative flex flex-col sm:flex-row sm:items-center sm:justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-secondary-light focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  <Bars3Icon aria-hidden='true' className='block h-6 w-6 group-data-open:hidden' />
                  <XMarkIcon aria-hidden='true' className='hidden h-6 w-6 group-data-open:block' />
                </DisclosureButton>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start mt-6 sm:mt-0'>
                <div className='flex items-center hover:cursor-pointer'>
                  <Link to='/'>
                    <div className='flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-gray-100'>
                      <img
                        src='https://www.svgrepo.com/show/499962/music.svg'
                        className='h-12 mr-3 sm:h-9'
                        alt='CYBERPUNK Logo'
                      />
                      CyberPunk
                    </div>
                  </Link>
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={location.pathname === item.href ? 'page' : undefined}
                        className={classNames(
                          location.pathname === item.href
                            ? 'bg-primary-light dark:bg-primary-dark text-secondary-light dark:text-secondary-dark underline'
                            : 'text-secondary-dark dark:text-secondary-light hover:bg-tertiary-light dark:hover:bg-tertiary-dark',
                          'block rounded-md px-3 py-2 text-sm lg:text-md xl:text-lg font-bold',
                        )}
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={toggleTheme}
                      className='rounded-md px-3 py-2 text-sm font-medium text-secondary-dark dark:text-secondary-light hover:bg-tertiary-light dark:hover:bg-tertiary-dark'
                    >
                      {theme === 'dark' ? (
                        <SunIcon className='h-6 w-6 text-secondary-light' />
                      ) : (
                        <MoonIcon className='h-6 w-6 text-secondary-dark' />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className='absolute top-16 left-0 right-0 bg-secondary-dark z-50 sm:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3 mt-6'>
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                  className={classNames(
                    location.pathname === item.href
                      ? 'bg-primary-light dark:bg-primary-dark text-secondary-light dark:text-secondary-dark underline'
                      : 'text-secondary-light dark:text-secondary-dark hover:bg-tertiary-light dark:hover:bg-tertiary-dark',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <DisclosureButton
                as='button'
                onClick={toggleTheme}
                className='block rounded-md px-3 py-2 text-base font-medium text-secondary-light dark:text-secondary-dark'
              >
                {theme === 'dark' ? (
                  <SunIcon className='h-6 w-6 text-secondary-light' />
                ) : (
                  <MoonIcon className='h-6 w-6 text-secondary-dark' />
                )}
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
