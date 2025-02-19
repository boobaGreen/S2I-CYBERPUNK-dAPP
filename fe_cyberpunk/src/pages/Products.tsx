import { useState } from 'react';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import AddProductModal from '../components/AddProductModal';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { handleBuy } from '../utils/productUtils';
import useUserRole from '../hooks/useUserRole';
import { useProducts } from '../hooks/useProducts';

export default function Products() {
  const { isVendor } = useUserRole();
  const { isConnected } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: products = [], isLoading, refetch } = useProducts();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    refetch();
  };

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
        {isLoading ? (
          <p className='text-center p-4'>Loading products...</p>
        ) : (
          <Gallery
            products={products}
            onBuy={(productId, price) => handleBuy(productId, price, products, () => refetch())}
            isBuyButtonVisible={isConnected}
          />
        )}
      </div>

      {isModalOpen && <AddProductModal closeModal={closeModal} />}
    </div>
  );
}
