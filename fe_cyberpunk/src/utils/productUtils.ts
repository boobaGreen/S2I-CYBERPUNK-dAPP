import { ethers } from 'ethers';
import loadDeployedAddresses from './loadDeployedAddresses';
import { IProduct } from '../types/IProduct';
import { pinata } from '../utils/config';
import { getContractInstance } from '../utils/getContractInstance';
import { getContractABI } from './getContractAbi';

let CyberPunkBoutique: any;

const loadABI = async () => {
    return await getContractABI();
};

export const fetchProducts = async (): Promise<IProduct[]> => {
    try {
        CyberPunkBoutique = await loadABI();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const deployedAddresses = loadDeployedAddresses(Number(network.chainId));
        // const contractAddress = deployedAddresses['CyberPunkModule#CyberPunkBoutique'];
        const contractAddress = "0xea1A14F7f4938b955413d3d274c5720794419Dea";

        const contract = new ethers.Contract(contractAddress, CyberPunkBoutique.abi, provider);

        // Ottieni il numero totale di prodotti
        const productCount = await contract.productCount();
        const products: IProduct[] = [];

        // Ottieni i dettagli di ogni prodotto
        for (let i = 1; i <= productCount; i++) {
            const product = await contract.products(i);

            // Convert IPFS hash to URL using Pinata SDK
            const imageSrc = await pinata.gateways.convert(product.cid);

            products.push({
                id: product.id,
                name: product.name,
                price: ethers.formatUnits(product.price, 'ether'),
                imageAlt: product.name,
                imageSrc, // Use the converted URL or fallback image
                href: `/products/${product.id}`, // Link to product detail page
                trackingNumber: product.trackingNumber,
                state: Number(product.state), // Convert BigInt to number
            });
        }

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const handleBuy = async (productId: number, price: string, products: IProduct[], setProducts: (products: IProduct[]) => void) => {
    try {
        CyberPunkBoutique = await loadABI();
        const { contract } = await getContractInstance('CyberPunkModule#CyberPunkBoutique');
        const tx = await contract.purchaseProduct(productId, {
            value: ethers.parseUnits(price, 'ether'),
        });
        await tx.wait();
        alert('Product purchased successfully!');
        // Refetch the product details after purchase
        const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, state: 1 } : product,
        );
        setProducts(updatedProducts);
    } catch (error) {
        console.error('Error purchasing product:', error);
        alert('Failed to purchase product.');
    }
};