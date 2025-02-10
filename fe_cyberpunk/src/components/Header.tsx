import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme'; // Importa il custom hook
import { classNames } from '../utils/classNames'; // Importa la funzione classNames
import { navigation } from '../utils/navigation'; // Importa la costante navigation

export default function Header() {
  const { theme, toggleTheme } = useTheme(); // Usa il custom hook per ottenere il tema
  const location = useLocation(); // Usa useLocation per ottenere il percorso corrente

  const logoSrc = theme === 'dark' ? './cyberpunk-logo-dark.webp' : './cyberpunk-logo.webp'; // Imposta il logo in base al tema

  return (
    <Disclosure as='nav' className='bg-transparent'>
      {({}) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-secondary-light dark:text-secondary-dark hover:bg-tertiary-light dark:hover:bg-tertiary-dark focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  <Bars3Icon aria-hidden='true' className='block h-6 w-6 group-data-open:hidden' />
                  <XMarkIcon aria-hidden='true' className='hidden h-6 w-6 group-data-open:block' />
                </DisclosureButton>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='hidden sm:flex shrink-0 items-center'>
                  <Link to='/'>
                    <div className='flex items-center flex-col'>
                      <img alt='Your Company' src={logoSrc} className='h-8 w-auto' />
                      <p>CBS</p>
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
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                        style={{ fontFamily: 'var(--font-orbitron)' }} // Orbitron font
                      >
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={toggleTheme}
                      className='rounded-md px-3 py-2 text-sm font-medium text-secondary-light dark:text-secondary-dark hover:bg-tertiary-light dark:hover:bg-tertiary-dark'
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
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <ConnectButton showBalance={true} />
              </div>
            </div>
          </div>

          <DisclosurePanel className='absolute top-16 left-0 right-0 bg-secondary-dark z-50 sm:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3'>
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                  className={classNames(
                    location.pathname === item.href
                      ? 'bg-primary-light dark:bg-primary-dark  underline'
                      : ' hover:bg-tertiary-light dark:hover:bg-tertiary-dark',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  style={{ fontFamily: 'var(--font-orbitron)' }} // Orbitron font
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <DisclosureButton
                as='button'
                onClick={toggleTheme}
                className='block rounded-md px-3 py-2 text-base font-medium text-secondary-light dark:text-secondary-dark hover:bg-tertiary-light dark:hover:bg-tertiary-dark'
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
