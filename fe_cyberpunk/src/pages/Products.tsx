import { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';

import Button from '../components/Button';
import AddProductModal from '../components/AddProductModal';
import { IProduct } from '../types/IProduct';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { fetchProducts, handleBuy } from '../utils/productUtils';
import useUserRole from '../hooks/useUserRole';

export default function Products() {
  const { isVendor } = useUserRole();
  const { isConnected } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    loadProducts(); // Refetch products when the modal is closed
  };

  const loadProducts = async () => {
    try {
      const products = await fetchProducts();
      setProducts(products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className='relative min-h-screen'>
      {!isConnected && (
        <div className='flex justify-center p-4'>
          <ConnectButton />
        </div>
      )}

      {isVendor && (
        <div className='flex justify-center p-4'>
          <Button onClick={openModal}>+ Add New Product</Button>
        </div>
      )}
      <div className={`${isModalOpen ? 'blur-sm' : ''}`}>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <Gallery
            products={products}
            onBuy={(productId, price) => handleBuy(productId, price, products, setProducts)}
            isBuyButtonVisible={isConnected}
          />
        )}
      </div>
      {isModalOpen && <AddProductModal closeModal={closeModal} />}
    </div>
  );
}
