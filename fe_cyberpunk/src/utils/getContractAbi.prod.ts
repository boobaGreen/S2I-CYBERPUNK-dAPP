export const getContractABI = async () => {
  console.log('Loading production ABI');
  const abi = await import('./abis/CyberPunkBoutique.json');
  return abi;
};