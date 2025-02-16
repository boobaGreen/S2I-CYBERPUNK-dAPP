export const getContractABI = async () => {
  if (import.meta.env.MODE === 'production') {
    return await import('./abis/CyberPunkBoutique.json');
  } else if (import.meta.env.MODE === 'development') {
    return await import('../../../be_cyberpunk/artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json');
  } else {
    return await import('./abis/CyberPunkBoutique.json');
  }
};