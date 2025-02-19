import { useState } from 'react';
import { ethers } from 'ethers';
import { getContractInstance } from '../utils/getContractInstance';

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
                const { contract, signer, network, provider } = await getContractInstance('CyberPunkModule#CyberPunkBoutique');

                // Converti il prezzo in wei
                const priceInWei = ethers.parseUnits(values.price.toString(), 'ether');

                let transaction;
                if (Number(network.chainId) === 1337) {
                    // Ottieni il nonce corrente per la rete locale
                    if (signer) {
                        const nonce = await provider.getTransactionCount(signer.getAddress());
                        transaction = await contract.createProduct(values.name, priceInWei, values.cid, { nonce });
                    } else {
                        throw new Error('Signer is undefined');
                    }
                } else {
                    // Non specificare il nonce per Sepolia e Mainnet
                    transaction = await contract.createProduct(values.name, priceInWei, values.cid);
                }

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