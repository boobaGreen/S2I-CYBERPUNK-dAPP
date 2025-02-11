import React from 'react';
import useAddProductForm from '../hooks/useAddProductForm';
import useUploadToIPFS from '../hooks/useUploadToIPFS';

interface AddProductModalProps {
  closeModal: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ closeModal }) => {
  const { values, errors, isSubmitting, message, handleChange, handleSubmit, setValues } =
    useAddProductForm();
  const { imageCID, loading, error, handleImageUpload } = useUploadToIPFS();

  // Aggiorna il campo CID nel form quando l'immagine viene caricata
  React.useEffect(() => {
    if (imageCID) {
      setValues((prevValues: any) => ({ ...prevValues, cid: imageCID }));
    }
  }, [imageCID, setValues]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50'>
      <div className='bg-secondary-light dark:bg-secondary-dark p-8 rounded-md shadow-md'>
        <h2 className='text-2xl mb-4 text-primary-light dark:text-primary-dark'>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-primary-light dark:text-primary-dark'>
              Product Name
            </label>
            <input
              type='text'
              name='name'
              value={values.name}
              onChange={handleChange}
              placeholder='Enter product name'
              className='mt-1 block w-full border border-tertiary-light dark:border-tertiary-dark rounded-md shadow-sm'
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-primary-light dark:text-primary-dark'>
              ETH Price
            </label>
            <input
              type='number'
              name='price'
              value={values.price}
              onChange={handleChange}
              step='0.001' // Permette valori decimali
              min='0' // Permette solo valori positivi
              className='mt-1 block w-full border border-tertiary-light dark:border-tertiary-dark rounded-md shadow-sm'
            />
            {errors.price && <p className='text-red-500 text-sm'>{errors.price}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-primary-light dark:text-primary-dark'>
              Upload Image
            </label>
            <input type='file' onChange={handleImageUpload} className='mt-1 block w-full' />
            {loading && <p className='text-sm'>Uploading...</p>}
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            {imageCID && <p className='text-sm'>Image CID: {imageCID}</p>}
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={closeModal}
              className='mr-4 bg-tertiary-light dark:bg-tertiary-dark text-secondary-light py-2 px-4 rounded-md'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-primary-dark text-primary-light py-2 px-4 rounded-md'
            >
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
        {message && <p className='mt-4 text-center'>{message}</p>}
      </div>
    </div>
  );
};

export default AddProductModal;
