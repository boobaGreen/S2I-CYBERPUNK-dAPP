import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getContractInstance } from '../utils/getContractInstance';
import useUserRole from '../hooks/useUserRole';
import { ProductState } from '../types/IProduct';
import OrderTable from '../components/OrderTable';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getCoverImage } from '../constants/coverImage';

export default function MyOrders() {
  const { address, isConnected } = useAccount();
  const { isVendor, loading } = useUserRole();
  const [orders, setOrders] = useState<any[]>([]);
  const [trackingNumbers, setTrackingNumbers] = useState<{ [key: string]: string }>({});
  const [filters, setFilters] = useState({
    name: '',
    description: '',
    purchase: 'all',
    shipped: 'all',
    tracking: '', // Add tracking filter
  });

  const fetchOrders = async () => {
    if (!isConnected || loading) return;

    try {
      const { contract } = await getContractInstance('CyberPunkModule#CyberPunkBoutique');
      const productCount = await contract.productCount();
      const orders = [];

      for (let i = 1; i <= productCount; i++) {
        const product = await contract.products(i);
        if (isVendor || (address && product.buyer.toLowerCase() === address.toLowerCase())) {
          orders.push({
            id: product[0],
            name: product[1],
            price: product[2],
            cid: product[3],
            trackingNumber: product[4],
            state: product[5],
          });
        }
      }

      setOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isConnected, loading, isVendor, address]);

  const handleShip = async (id: any) => {
    try {
      const { contract } = await getContractInstance('CyberPunkModule#CyberPunkBoutique');
      const trackingNumber = trackingNumbers[id] || 'tracking123'; // Use the entered tracking number or a default value
      const tx = await contract.shipProduct(id, trackingNumber);
      await tx.wait();
      alert('Product shipped successfully');
      fetchOrders(); // Refetch orders to update the state
    } catch (error) {
      console.error('Error shipping product:', error);
    }
  };

  const handleTrackingNumberChange = (id: any, value: string) => {
    setTrackingNumbers((prev) => ({ ...prev, [id]: value }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const setPurchasedNotShippedFilter = () => {
    setFilters({
      name: '',
      description: '',
      purchase: 'yes',
      shipped: 'no',
      tracking: '',
    });
  };

  const filteredOrders = orders.filter((order) => {
    const matchesName = order.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesDescription = order.cid.toLowerCase().includes(filters.description.toLowerCase());
    const matchesPurchase =
      filters.purchase === 'all' ||
      (filters.purchase === 'yes' && Number(order.state) >= ProductState.Purchased) ||
      (filters.purchase === 'no' && Number(order.state) < ProductState.Purchased);
    const matchesShipped =
      filters.shipped === 'all' ||
      (filters.shipped === 'yes' && Number(order.state) === ProductState.Shipped) ||
      (filters.shipped === 'no' && Number(order.state) !== ProductState.Shipped);
    const matchesTracking = order.trackingNumber
      .toLowerCase()
      .includes(filters.tracking.toLowerCase());

    return (
      matchesName && matchesDescription && matchesPurchase && matchesShipped && matchesTracking
    );
  });

  return (
    <div className='relative min-h-screen'>
      <div
        className={`absolute inset-0 bg-cover bg-center ${!isConnected ? 'blur-sm' : ''}`}
        style={{ backgroundImage: `url('${getCoverImage()}')` }}
      ></div>
      <div className='absolute inset-0'></div>
      // Nella parte in cui non è connesso, sostituisci il fallback con:
      {!isConnected && (
        <div className='absolute inset-0 flex justify-center items-center z-20 text-white'>
          <div className='relative flex flex-col items-center justify-start pt-20 md:pt-30 xl:pt-40 lg:pt-50 h-full px-12 sm:px-14 md:px-16 lg:px-18 xl:px-20 2xl:px-40'>
            <div className='bg-tertiary-light dark:bg-tertiary-dark p-12 rounded-4xl mb-14 opacity-80'>
              <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-bold mb-14 '>
                To view
              </h1>
              <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-bold  '>
                your orders
              </h1>
            </div>
            <ConnectButton />
          </div>
        </div>
      )}
      <div
        className={`${!isConnected ? 'blur-sm' : ''} container mx-auto p-4 min-h-screen relative z-10`}
      >
        {isVendor && (
          <div className='flex justify-end mb-4'>
            <button
              className='bg-blue-500 text-white py-1 px-3 rounded'
              onClick={setPurchasedNotShippedFilter}
            >
              Autofilter : To Ship
            </button>
          </div>
        )}
        {isConnected && (
          <div className='overflow-x-auto'>
            <OrderTable
              orders={filteredOrders}
              isVendor={isVendor}
              trackingNumbers={trackingNumbers}
              handleTrackingNumberChange={handleTrackingNumberChange}
              handleShip={handleShip}
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
