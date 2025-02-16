import React, { useState } from 'react';
import { pinata } from '../utils/config';

interface ImageUploadProps {
  setValues: (values: any) => void;
  setUrl: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setValues, setUrl }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target?.files?.[0] || null);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const upload = await pinata.upload.file(selectedFile);
      const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);

      setUrl(ipfsUrl);
      setValues((prevValues: any) => ({ ...prevValues, cid: upload.IpfsHash }));
    } catch (err) {
      setError('Failed to upload image to Pinata');
      console.error('Error uploading image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-primary-light dark:text-primary-dark'>
        Upload Image
      </label>
      <input type='file' onChange={changeHandler} className='mt-1 block w-full' />
      <button
        type='button'
        onClick={handleImageUpload}
        className='mt-2 bg-primary-dark text-primary-light py-2 px-4 rounded-md'
      >
        Upload Image
      </button>
      {loading && <p className='text-sm'>Uploading...</p>}
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default ImageUpload;
