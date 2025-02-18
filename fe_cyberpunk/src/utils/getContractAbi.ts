export const getContractABI = async () => {
  // Importa l'ABI dalla cartella interna, che viene popolata dallo script di copia
  const abiModule = await import('./abis/CyberPunkBoutique.json');
  return abiModule;
};