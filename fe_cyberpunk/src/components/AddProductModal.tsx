import React, { useState } from 'react';
import useAddProductForm from '../hooks/useAddProductForm';
import ProductFormFields from './ProductFormFields';
import ImageUpload from './ImageUpload';

interface AddProductModalProps {
  closeModal: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ closeModal }) => {
  const { values, errors, isSubmitting, message, handleChange, handleSubmit, setValues } =
    useAddProductForm();
  const [url, setUrl] = useState<string>('');
  const [isProductAdded, setIsProductAdded] = useState<boolean>(false);

  const handleProductSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleSubmit(event);
    setIsProductAdded(true); // Set isProductAdded to true when the product is successfully added
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50'>
      <div className='bg-secondary-light dark:bg-secondary-dark p-8 rounded-md shadow-md max-w-lg w-full'>
        <h2 className='text-2xl mb-4 text-primary-light dark:text-primary-dark'>Add New Product</h2>
        <form onSubmit={handleProductSubmit}>
          <ProductFormFields values={values} errors={errors} handleChange={handleChange} />
          <ImageUpload setValues={setValues} setUrl={setUrl} />
          {url && (
            <div className='mt-2 max-w-xs'>
              <img src={url} alt='uploaded image' className='w-full h-auto object-contain' />
            </div>
          )}
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={closeModal}
              className='mr-4 bg-tertiary-light dark:bg-tertiary-dark text-secondary-light py-2 px-4 rounded-md'
            >
              {isProductAdded ? 'Close' : 'Cancel'}
            </button>
            {!isProductAdded && (
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-primary-dark text-primary-light py-2 px-4 rounded-md'
              >
                {isSubmitting ? 'Adding...' : 'Add Product'}
              </button>
            )}
          </div>
        </form>
        {message && <p className='mt-4 text-center'>{message}</p>}
      </div>
    </div>
  );
};

export default AddProductModal;
