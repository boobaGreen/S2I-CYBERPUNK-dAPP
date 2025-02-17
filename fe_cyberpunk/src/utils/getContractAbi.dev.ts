export const getContractABI = async () => {
  console.log('Loading development ABI');
  const abi = await import('../../../be_cyberpunk/artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json');
  return abi;
};