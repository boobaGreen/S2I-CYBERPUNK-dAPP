import { ethers } from 'ethers';
import { IProduct } from '../types/IProduct';
import { pinata } from '../utils/config';
import { getContractInstance } from './getContractInstance';

export const fetchProducts = async (): Promise<IProduct[]> => {
    try {
        // Usa la utility per ottenere il contratto con il deployed address corretto
        const { contract } = await getContractInstance('CyberPunkModule#CyberPunkBoutique', false);

        // Ottieni il numero totale di prodotti
        const productCount = await contract.productCount();
        const products: IProduct[] = [];

        // Ottieni i dettagli di ogni prodotto
        for (let i = 1; i <= productCount; i++) {
            const product = await contract.products(i);

            // Converti l'IPFS hash in URL usando il gateway di Pinata
            const imageSrc = await pinata.gateways.convert(product.cid);

            products.push({
                id: product.id,
                name: product.name,
                price: ethers.formatUnits(product.price, 'ether'),
                imageAlt: product.name,
                imageSrc, // URL ottenuto tramite Pinata
                href: `/products/${product.id}`,
                trackingNumber: product.trackingNumber,
                state: Number(product.state), // Converti lo stato in number
            });
        }

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const handleBuy = async (
    productId: number,
    price: string,
    products: IProduct[],
    setProducts: (products: IProduct[]) => void
) => {
    try {
        // Ottieni il contratto
        const { contract } = await getContractInstance('CyberPunkModule#CyberPunkBoutique');
        const tx = await contract.purchaseProduct(productId, {
            value: ethers.parseUnits(price, 'ether'),
        });
        await tx.wait();
        alert('Product purchased successfully!');
        // Aggiorna lo stato dei prodotti in seguito all'acquisto
        const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, state: 1 } : product
        );
        setProducts(updatedProducts);
    } catch (error) {
        console.error('Error purchasing product:', error);
        alert('Failed to purchase product.');
    }
};