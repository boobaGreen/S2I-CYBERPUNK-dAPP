export const getContractABI = async () => {
  if (import.meta.env.MODE === 'production') {
    return require('./abis/CyberPunkBoutique.json');
  }
  if (import.meta.env.MODE === 'development') {
    return require('../../../be_cyberpunk/artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json');
  } else {
    return require('./abis/CyberPunkBoutique.json');
  }
};