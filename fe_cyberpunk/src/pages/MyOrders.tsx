import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getContractInstance } from '../utils/getContractInstance';
import useUserRole from '../hooks/useUserRole';
import { ProductState } from '../types/IProduct';
import OrderTable from '../components/OrderTable';

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

      console.log('Fetched Orders:', orders); // Log the fetched orders
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
      const { contract, signer } = await getContractInstance('CyberPunkModule#CyberPunkBoutique');
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
      tracking: '', // Add tracking filter
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
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>My Orders</h1>
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
    </div>
  );
}
