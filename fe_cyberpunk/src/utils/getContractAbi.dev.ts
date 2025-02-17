// filepath: /media/clod/c14fdd0a-05ec-44fb-88f9-217ab8c9a98d/code/s2i/BC/S2I-WAGMI/fe_cyberpunk/src/utils/getContractAbi.dev.ts
export const getContractABI = async () => {
  console.log('Loading development ABI');
  // Costruisci il percorso in modo dinamico in modo che Vite non lo risolva staticamente
  const basePath = '../../../be_cyberpunk/artifacts/contracts/CyberPunk.sol';
  const fileName = '/CyberPunkBoutique.json';
  const devPath = basePath + fileName;

  const abi = await import(devPath);
  return abi;
};