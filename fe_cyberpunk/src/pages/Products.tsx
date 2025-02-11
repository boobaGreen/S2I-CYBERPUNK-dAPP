import { useState } from 'react';
import Gallery from '../components/Gallery';
import useUserRole from '../hooks/useUserRole';
import Button from '../components/Button'; // Importa il componente Button
import AddProductModal from '../components/AddProductModal'; // Importa il componente AddProductModal

export default function Products() {
  const { isVendor } = useUserRole();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='relative min-h-screen'>
      {isVendor && (
        <div className='flex justify-center p-4'>
          <Button onClick={openModal}>Add New Product</Button>
        </div>
      )}
      <div className={`${isModalOpen ? 'blur-sm' : ''}`}>
        <Gallery />
      </div>
      {isModalOpen && <AddProductModal closeModal={closeModal} />}
    </div>
  );
}
