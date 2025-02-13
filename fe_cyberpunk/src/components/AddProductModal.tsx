import React, { useState } from 'react';
import useAddProductForm from '../hooks/useAddProductForm';
import { pinata } from '../utils/config';

interface AddProductModalProps {
  closeModal: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ closeModal }) => {
  const { values, errors, isSubmitting, message, handleChange, handleSubmit, setValues } =
    useAddProductForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isProductAdded, setIsProductAdded] = useState<boolean>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target?.files?.[0] || null);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      console.log('Uploading image to Pinata...');
      const upload = await pinata.upload.file(selectedFile);
      console.log('Upload response:', upload);

      const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);
      console.log('IPFS URL:', ipfsUrl);
      setUrl(ipfsUrl);
      setValues((prevValues: any) => ({ ...prevValues, cid: upload.IpfsHash }));
    } catch (err) {
      setError('Failed to upload image to Pinata');
      console.error('Error uploading image:', err);
    } finally {
      setLoading(false);
    }
  };

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
              step='0.000000000000000001' // Permette valori decimali
              min='0' // Permette solo valori positivi
              className='mt-1 block w-full border border-tertiary-light dark:border-tertiary-dark rounded-md shadow-sm'
            />
            {errors.price && <p className='text-red-500 text-sm'>{errors.price}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-primary-light dark:text-primary-dark'>
              CID (Content Identifier)
            </label>
            <input
              type='text'
              name='cid'
              value={values.cid}
              onChange={handleChange}
              placeholder='Enter CID or upload an image'
              className='mt-1 block w-full border border-tertiary-light dark:border-tertiary-dark rounded-md shadow-sm'
            />
            {errors.cid && <p className='text-red-500 text-sm'>{errors.cid}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-primary-light dark:text-primary-dark'>
              Upload Image
            </label>
            <input type='file' onChange={changeHandler} className='mt-1 block w-full' />
            {!isProductAdded && (
              <button
                type='button'
                onClick={handleImageUpload}
                className='mt-2 bg-primary-dark text-primary-light py-2 px-4 rounded-md'
              >
                Upload Image
              </button>
            )}
            {loading && <p className='text-sm'>Uploading...</p>}
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            {url && (
              <div className='mt-2 max-w-xs'>
                <img src={url} alt='uploaded image' className='w-full h-auto object-contain' />
              </div>
            )}
          </div>
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
