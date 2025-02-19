import { useQuery } from '@tanstack/react-query';
import { IProduct } from '../types/IProduct';
import { fetchProducts } from '../utils/productUtils';

export const useProducts = () => {
    return useQuery<IProduct[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000, // dati considerati freschi per 5 minuti
        refetchOnWindowFocus: false,
    });
};