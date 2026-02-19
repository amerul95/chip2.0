"use client"

import { allSendLimit } from '../lib/actions';
import React, { useEffect, useState } from 'react';

interface AllSendLimit {
  id: number;
  currency: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  transaction_type: string;
}

export default function IncreaseLimitHistory() {
  const [result, setResult] = useState<AllSendLimit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AllSendLimit | null;
    direction: string;
  }>({
    key: 'id', // Default sorting by ID
    direction: 'desc', // Default direction as descending
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long', // Use 'short' for abbreviated month names
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short', // Optional: shows the timezone
    };
    return date.toLocaleString('en-US', options);
  };

  // Fetch data and set state
  useEffect(() => {
    const fetchData = async () => {
      const response = await allSendLimit();
      if (response.ok) {
        setResult(response.data);
        setError(null);
      } else {
        setError(response.error);
        setResult([]);
      }
    };
    fetchData();
  }, []);

  // Sorting function
  const sortedResult = [...result].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
    }
    return 0;
  });

  // Toggle sorting
  const requestSort = (key: keyof AllSendLimit) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon based on current sorting configuration
  const getSortIcon = (key: keyof AllSendLimit) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼'; // Ascending or descending icon
    }
    return '▼'; // Default to descending icon for columns not currently sorted
  };

  return (
    <div className='p-4'>
      {error && (
        <div className="mb-4">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      )}
      <div className='bg-white shadow rounded-md overflow-hidden'>
        <div className="overflow-x-auto">
          <table className='min-w-full bg-white'>
            <thead className='bg-gray-50'>
              <tr>
                <th className="px-4 py-2 text-left text-xs md:text-sm font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort('id')}>
                    ID {getSortIcon('id')}
                  </button>
                </th>
                <th className="px-4 py-2 text-left text-xs md:text-sm font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort('currency')}>
                    Currency {getSortIcon('currency')}
                  </button>
                </th>
                <th className="px-4 py-2 text-left text-xs md:text-sm font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort('amount')}>
                    Amount {getSortIcon('amount')}
                  </button>
                </th>
                <th className="px-4 py-2 text-left text-xs md:text-sm font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort('status')}>
                    Status {getSortIcon('status')}
                  </button>
                </th>
                <th className="px-4 py-2 text-left text-xs md:text-sm font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort('transaction_type')}>
                    Type {getSortIcon('transaction_type')}
                  </button>
                </th>
                <th className="px-4 py-2 text-left text-xs md:text-sm font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort('created_at')}>
                    Created Date {getSortIcon('created_at')}
                  </button>
                </th>
                <th className="px-4 py-2 text-left text-xs md:text-sm font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort('updated_at')}>
                    Updated Date {getSortIcon('updated_at')}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedResult.map((item, index) => (
                <tr key={index} className="bg-gray-800 border-gray-700">
                  <td className="px-4 py-2 text-white text-xs md:text-sm">{item.id}</td>
                  <td className="px-4 py-2 text-white text-xs md:text-sm">{item.currency}</td>
                  <td className="px-4 py-2 text-white text-xs md:text-sm">{item.amount}</td>
                  <td className="px-4 py-2 text-white text-xs md:text-sm">{item.status}</td>
                  <td className="px-4 py-2 text-white text-xs md:text-sm">{item.transaction_type}</td>
                  <td className="px-4 py-2 text-white text-xs md:text-sm">{formatDate(item.created_at)}</td>
                  <td className="px-4 py-2 text-white text-xs md:text-sm">{formatDate(item.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
