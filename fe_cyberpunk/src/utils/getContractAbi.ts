export const getContractABI = async () => {
  console.log('Loading development ABI');
  // Costruisci il percorso in modo dinamico per evitare la risoluzione statica durante la build
  const basePath = '../../../be_cyberpunk/artifacts/contracts/CyberPunk.sol';
  const fileName = '/CyberPunkBoutique.json';
  const devPath = basePath + fileName;

  const abi = await import(devPath);
  return abi;
};