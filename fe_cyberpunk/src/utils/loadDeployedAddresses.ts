// import deployedAddressesLocal from '../../../be_cyberpunk/ignition/deployments/chain-1337/deployed_addresses.json';
// import deployedAddressesSepolia from '../../../be_cyberpunk/ignition/deployments/chain-11155111/deployed_addresses.json';

const deployedAddressesLocal = {
    "CyberPunkModule#CyberPunkBoutique": "0xea1A14F7f4938b955413d3d274c5720794419Dea"
};

const deployedAddressesSepolia = {
    "CyberPunkModule#CyberPunkBoutique": "0xea1A14F7f4938b955413d3d274c5720794419Dea"
};

const loadDeployedAddresses = (chainId: number) => {
    switch (chainId) {
        case 1337:
            return deployedAddressesLocal;
        case 11155111:
            return deployedAddressesSepolia;
        default:
            throw new Error('Unsupported network');
    }
};

export default loadDeployedAddresses;