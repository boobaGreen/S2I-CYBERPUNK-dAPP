import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Gallery from '../components/Gallery';
import useUserRole from '../hooks/useUserRole';
import Button from '../components/Button';
import AddProductModal from '../components/AddProductModal';
import CyberPunkBoutique from '../../../be_cyberpunk/artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json';
import loadDeployedAddresses from '../utils/loadDeployedAddresses';
import { IProduct } from '../types/IProduct';
import { pinata } from '../utils/config';
import { getContractInstance } from '../utils/getContractInstance';

export default function Products() {
  const { isVendor } = useUserRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchProducts(); // Refetch products when the modal is closed
  };

  const handleBuy = async (productId: number, price: string) => {
    try {
      const { contract, signer } = await getContractInstance('CyberPunkModule#CyberPunkBoutique');
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

  const fetchProducts = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Ottieni la rete corrente
      const network = await provider.getNetwork();
      const deployedAddresses = loadDeployedAddresses(Number(network.chainId));
      const contractAddress = deployedAddresses['CyberPunkModule#CyberPunkBoutique'];

      const contract = new ethers.Contract(contractAddress, CyberPunkBoutique.abi, signer);

      // Ottieni il numero totale di prodotti
      const productCount = await contract.productCount();
      const products: IProduct[] = [];

      // Ottieni i dettagli di ogni prodotto
      for (let i = 1; i <= productCount; i++) {
        const product = await contract.products(i);
        console.log(`Product ${i} CID: ${product.cid}`); // Aggiungi il console.log per il CID

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

      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='relative min-h-screen'>
      {isVendor && (
        <div className='flex justify-center p-4'>
          <Button onClick={openModal}>Add New Product</Button>
        </div>
      )}
      <div className={`${isModalOpen ? 'blur-sm' : ''}`}>
        {loading ? <p>Loading products...</p> : <Gallery products={products} onBuy={handleBuy} />}
      </div>
      {isModalOpen && <AddProductModal closeModal={closeModal} />}
    </div>
  );
}
