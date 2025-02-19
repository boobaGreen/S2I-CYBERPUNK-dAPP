import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, polygon, localhost } from 'wagmi/chains';

const projectId = import.meta.env.VITE_WC_PROJECT_ID;

export const rainbowKitConfig = getDefaultConfig({
    appName: 'CyberPunkShop',
    projectId: projectId,
    chains: [mainnet, sepolia, localhost, polygon],
    // ssr: true, // If your dApp uses server side rendering (SSR)

});