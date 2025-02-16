import React from 'react';

interface ProductFormFieldsProps {
  values: any;
  errors: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({ values, errors, handleChange }) => {
  return (
    <>
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
    </>
  );
};

export default ProductFormFields;
