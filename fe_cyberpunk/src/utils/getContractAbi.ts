// export const getContractABI = async () => {
//   let abi;
//   if (import.meta.env.MODE === 'production') {
//     console.log('Loading production ABI');
//     abi = await import('./abis/CyberPunkBoutique.json');
//   } else if (import.meta.env.MODE === 'development') {
//     console.log('Loading development ABI');
//     abi = await import('../../../be_cyberpunk/artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json');
//   } else {
//     console.log('Loading default ABI');
//     abi = await import('./abis/CyberPunkBoutique.json');
//   }
//   return abi;
// };

export const getContractABI = async () => {
  let abi;
  // Temporaneamente utilizza una costante per evitare errori di build
  abi = await import('./abis/CyberPunkBoutique.json');
  return abi;
};