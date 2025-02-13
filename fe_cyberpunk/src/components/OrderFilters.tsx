import React from 'react';

interface Filters {
  description: string;
  name: string;
  purchase: string;
  shipped: string;
  tracking: string; // Add tracking filter
}

interface OrderFiltersProps {
  filters: Filters;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSort: () => void;
  sortOrder: 'asc' | 'desc';
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  filters,
  handleFilterChange,
  handleSort,
  sortOrder,
}) => (
  <tr>
    <th className='py-2 px-4 border-b'>
      <input
        type='text'
        name='name'
        placeholder='Filter by name'
        value={filters.name}
        onChange={handleFilterChange}
        className='p-1 border rounded w-full'
      />
    </th>
    <th className='py-2 px-4 border-b'>
      <div className='flex justify-center'>
        <button onClick={handleSort} className='ml-2'>
          {sortOrder === 'asc' ? (
            <>
              <span className='inline-block'>▲</span>
              <span className='inline-block'>▼</span>
            </>
          ) : (
            <>
              <span className='inline-block'>▼</span>
              <span className='inline-block'>▲</span>
            </>
          )}
        </button>
      </div>
    </th>
    <th className='py-2 px-4 border-b'>
      <select
        name='purchase'
        value={filters.purchase}
        onChange={handleFilterChange}
        className='p-1 border rounded w-full bg-blue-700'
      >
        <option value='all'>All</option>
        <option value='yes'>Purchased</option>
        <option value='no'>Not-Purchased</option>
      </select>
    </th>
    <th className='py-2 px-4 border-b'>
      <select
        name='shipped'
        value={filters.shipped}
        onChange={handleFilterChange}
        className='p-1 border rounded w-full bg-blue-700'
      >
        <option value='all'>All</option>
        <option value='yes'>Shipped</option>
        <option value='no'>Not-Shipped</option>
      </select>
    </th>
    <th className='py-2 px-4 border-b'>
      <input
        type='text'
        name='tracking'
        placeholder='Filter by tracking'
        value={filters.tracking}
        onChange={handleFilterChange}
        className='p-1 border rounded w-full'
      />
    </th>
  </tr>
);

export default OrderFilters;
