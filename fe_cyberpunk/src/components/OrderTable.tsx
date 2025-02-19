import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ProductState } from '../types/IProduct';
import { IOrder } from '../types/IOrder'; // Import the IOrder type
import OrderFilters from './OrderFilters';

interface OrderTableProps {
  orders: IOrder[];
  isVendor: boolean;
  trackingNumbers: { [key: string]: string };
  handleTrackingNumberChange: (id: string, value: string) => void;
  handleShip: (id: string) => void;
  filters: {
    description: string;
    name: string;
    purchase: string;
    shipped: string;
    tracking: string; // Add tracking filter
  };
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  isVendor,
  trackingNumbers,
  handleTrackingNumberChange,
  handleShip,
  filters,
  handleFilterChange,
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const priceA = parseFloat(ethers.formatEther(a.price));
    const priceB = parseFloat(ethers.formatEther(b.price));
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  return (
    <table className='min-w-full border border-gray-200 bg-amber-300'>
      <thead className=''>
        <tr>
          <th className='py-2 px-4 border-b'>Product</th>
          <th className='py-2 px-4 border-b'>Price</th>
          <th className='py-2 px-4 border-b'>Purchase</th>
          <th className='py-2 px-4 border-b'>Shipped</th>
          <th className='py-2 px-4 border-b'>Tracking</th>
        </tr>
        <OrderFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleSort={handleSort}
          sortOrder={sortOrder}
        />
      </thead>
      <tbody>
        {sortedOrders.map((product) => (
          <tr key={product.id} className='hover:bg-secondary-light dark:hover:bg-gray-700 '>
            <td className='py-2 px-4 border-b text-center'>{product.name}</td>
            <td className='py-2 px-4 border-b text-center'>
              {ethers.formatEther(product.price)} ETH
            </td>
            <td className='py-6 px-4 border-b text-center'>
              {Number(product.state) >= ProductState.Purchased ? 'V' : 'X'}
            </td>
            <td className='py-6 px-4 border-b text-center'>
              {Number(product.state) === ProductState.Shipped ? 'V' : 'X'}
            </td>
            <td className='py-2 px-4 border-b text-center'>
              {Number(product.state) === ProductState.Shipped ? (
                <span>{product.trackingNumber}</span>
              ) : (
                isVendor &&
                Number(product.state) === ProductState.Purchased && (
                  <>
                    <input
                      type='text'
                      placeholder='Enter tracking number'
                      value={trackingNumbers[product.id] || ''}
                      onChange={(e) => handleTrackingNumberChange(product.id, e.target.value)}
                      className='mr-6  border rounded p-2'
                    />
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded'
                      onClick={() => handleShip(product.id)}
                    >
                      Ship
                    </button>
                  </>
                )
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
