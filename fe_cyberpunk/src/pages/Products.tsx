import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Gallery from '../components/Gallery';
import useUserRole from '../hooks/useUserRole';
import Button from '../components/Button';
import AddProductModal from '../components/AddProductModal';
import { getContractInstance } from '../utils/getContractInstance';
import { IProduct } from '../types/IProduct';
import { pinata } from '../utils/config';

export default function Products() {
  const { isVendor } = useUserRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { contract, signer } = await getContractInstance('CyberPunkModule#CyberPunkBoutique');

        // Ottieni il numero totale di prodotti
        const productCount = await contract.productCount();

        const products: IProduct[] = [];

        // Ottieni i dettagli di ogni prodotto
        for (let i = 1; i <= productCount; i++) {
          const product = await contract.products(i);

          let imageSrc;
          try {
            // Convert IPFS hash to URL using Pinata SDK
            imageSrc = await pinata.gateways.convert(product.cid);
          } catch (error) {
            console.error(`Error converting CID for product ${i}:`, error);
            // Use fallback image if CID conversion fails
            imageSrc = '/cover.webp';
          }

          products.push({
            id: product.id.toString(),
            name: product.name,
            price: ethers.formatUnits(product.price, 'ether'),
            imageAlt: product.name,
            imageSrc, // Use the converted URL or fallback image
          });
        }

        console.log('Fetched products:', products);
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

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
        {loading ? <p>Loading products...</p> : <Gallery products={products} />}
      </div>
      {isModalOpen && <AddProductModal closeModal={closeModal} />}
    </div>
  );
}
