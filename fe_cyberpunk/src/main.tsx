import { Buffer } from 'buffer';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';

import { rainbowKitConfig } from './config/rainbowKitConfig'; // Importa la configurazione

import App from './App';
import './index.css';

(globalThis as typeof globalThis & { Buffer: typeof Buffer }).Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={rainbowKitConfig}>
      <QueryClientProvider client={queryClient}>
        {/* modalSize="compact" is the alternative the default value is wide */}
        {/* theme={darkTheme()} or theme={midnightTheme()}  is the alternatives the default value is light */}
        <RainbowKitProvider
          initialChain={sepolia}
          modalSize='wide'
          showRecentTransactions={true}
          theme={{
            lightMode: lightTheme({
              accentColor: '#86EFAC',
              accentColorForeground: '#000000',
              overlayBlur: 'large',
            }),
            darkMode: darkTheme({
              accentColor: '#86EFAC',
              accentColorForeground: '#000000',
              overlayBlur: 'large',
            }),
          }}
        >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
