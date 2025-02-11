import { useState } from 'react';
import axios from 'axios';

const useUploadToIPFS = () => {
    const [imageCID, setImageCID] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            setLoading(true);

            try {
                interface PinataResponse {
                    IpfsHash: string;
                }
                const res = await axios.post<PinataResponse>('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'pinata_api_key': import.meta.env.VITE_APP_PINATA_API_KEY,
                        'pinata_secret_api_key': import.meta.env.VITE_APP_PINATA_API_SECRET,
                    },
                });
                const cid = res.data.IpfsHash;
                setImageCID(cid);
                setLoading(false);
            } catch (err) {
                setError('Failed to upload image to Pinata');
                console.error(err);
                setLoading(false);
            }
        }
    };

    return {
        imageCID,
        loading,
        error,
        handleImageUpload,
    };
};

export default useUploadToIPFS;