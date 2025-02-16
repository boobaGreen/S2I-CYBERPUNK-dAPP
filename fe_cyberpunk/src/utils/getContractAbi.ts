export const getContractABI = async () => {
  if (import.meta.env.MODE === 'production') {
    return
  }
  if (import.meta.env.MODE === 'development') {
    return await import('../../../be_cyberpunk/artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json');
  } else {
    return await import('./abis/CyberPunkBoutique.json');
  }
};