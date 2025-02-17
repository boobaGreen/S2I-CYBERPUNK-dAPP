// filepath: /media/clod/c14fdd0a-05ec-44fb-88f9-217ab8c9a98d/code/s2i/BC/S2I-WAGMI/fe_cyberpunk/src/utils/getContractAbi.ts
export const getContractABI = async () => {
  if (import.meta.env.MODE === 'production') {
    const { getContractABI } = await import('./getContractAbi.prod');
    return getContractABI();
  } else {
    const { getContractABI } = await import('./getContractAbi.dev');
    return getContractABI();
  }
};