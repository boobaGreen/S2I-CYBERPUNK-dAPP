import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, optimism, arbitrum, base, sepolia, polygon, scroll } from 'wagmi/chains';

const projectId = import.meta.env.VITE_WC_PROJECT_ID;

export const rainbowKitConfig = getDefaultConfig({
    appName: 'CyberPunkShop',
    projectId: projectId,
    chains: [mainnet, optimism, arbitrum, base, sepolia, polygon, scroll],
    ssr: true, // If your dApp uses server side rendering (SSR)
});