import { useAccount } from 'wagmi';

const useUserRole = () => {
    const { address } = useAccount();
    const vendorAddress = import.meta.env.VITE_VENDOR_ADDRESS;

    const isVendor = address?.toLowerCase() === vendorAddress.toLowerCase();
    const isClient = !isVendor;

    return { isVendor, isClient };
};

export default useUserRole;