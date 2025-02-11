import { useState } from 'react';
import { ethers } from 'ethers';
import CyberPunkBoutique from '../../../be_cyberpunk/artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json';
import loadDeployedAddresses from '../utils/loadDeployedAddresses';

interface ProductFormValues {
    name: string;
    price: number;
    cid: string;
}

const useAddProductForm = () => {
    const [values, setValues] = useState<ProductFormValues>({ name: '', price: 0, cid: '' });
    const [errors, setErrors] = useState<Partial<ProductFormValues>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const validate = () => {
        const errors: Partial<ProductFormValues> = {};
        if (!values.name) errors.name = 'Product name is required';
        if (!values.cid) errors.cid = 'Product CID is required';
        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'price') {
            const parsedValue = parseFloat(value);
            setValues({ ...values, [name]: isNaN(parsedValue) || parsedValue <= 0 ? 0 : parsedValue });
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();

                // Ottieni la rete corrente
                const network = await provider.getNetwork();
                const deployedAddresses = loadDeployedAddresses(Number(network.chainId));
                const contractAddress = deployedAddresses["CyberPunkModule#CyberPunkBoutique"];

                const contract = new ethers.Contract(contractAddress, CyberPunkBoutique.abi, signer);

                // Converti il prezzo in wei
                const priceInWei = ethers.parseUnits(values.price.toString(), 'ether');

                // Crea il prodotto senza specificare il nonce
                const transaction = await contract.createProduct(values.name, priceInWei, values.cid);

                await transaction.wait();

                setMessage('Product added successfully');
            } catch (error) {
                console.error('Error adding product:', error);
                setMessage('Failed to add product');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return {
        values,
        errors,
        isSubmitting,
        message,
        handleChange,
        handleSubmit,
        setValues,
    };
};

export default useAddProductForm;