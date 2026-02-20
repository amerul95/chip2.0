"use client"

import React,{useState,useEffect} from 'react';
import { allBankAcoount } from '../lib/actions';
import Link from 'next/link';
import CreateNew from './ui/createNew';

interface BankDetails {
  id: number;
  account_number: string;
  bank_code: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  rejection_reason: string;
}

// Function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short', 
  };
  return date.toLocaleString('en-US', options);
};

export default function BankAccount({session}:any) {

  const [data,setData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<any>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructions = async () => {
      const result = await allBankAcoount(currentPage);
      if (result.ok) {
        const data = result.data as unknown as { results: any[]; meta: { pagination: { total_pages: number } } };
        setData(data.results);
        setTotalPages(data.meta.pagination.total_pages);
        setError(null);
      } else {
        setError(result.error);
        setData([]);
        setTotalPages(1);
      }
    };

    fetchInstructions();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <>
    <CreateNew/>
    {error && (
      <div className="p-4">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    )}
    <div className='p-4'>
      <div className='bg-white shadow rounded-md overflow-x-auto'>
        <table className='min-w-full bg-gray-800 table-auto'>
          <thead className='bg-gray-700'>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold  uppercase text-gray-400">NO</th>
              <th className="px-6 py-3 text-left text-xs font-bold  uppercase text-gray-400">Bank Account ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-400">Account Number</th>
              <th className="px-6 py-3 text-left text-xs font-bold  uppercase text-gray-400">Bank Code</th>
              <th className="px-6 py-3 text-left text-xs font-bold  uppercase text-gray-400">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold  uppercase text-gray-400">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold  uppercase text-gray-400">Created Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold  uppercase text-gray-400">Updated Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold  uppercase text-gray-400">More Details</th>
            </tr>
          </thead>
          {data.length > 0 && (
          <tbody>
          {data.map((item:any, key:number) => (
            <tr key={key} className=" border-b bg-gray-800 border-gray-700">
              <td className="px-6 py-4  text-white bg-gray-800">
                {(currentPage-1)*25 + key + 1}
              </td>
              <td className="px-6 py-4  text-white bg-gray-800">{item.id}</td>
              <td className="px-6 py-4  text-white bg-gray-800">{item.account_number}</td>
              <td className="px-6 py-4  text-white bg-gray-800">{item.bank_code}</td>
              <td className="px-6 py-4  text-white bg-gray-800">{item.name}</td>
              <td className="px-6 py-4  text-white bg-gray-800">{item.status}</td>
              <td className="px-6 py-4  text-white bg-gray-800">{formatDate(item.created_at)}</td>
              <td className="px-6 py-4  text-white bg-gray-800">{formatDate(item.updated_at)}</td>
              <td className="px-6 py-4  text-white bg-gray-800">
                <div className="relative group">
                 <p className="text-blue-400 cursor-pointer bg-gray-800">more</p>
                  <div className="absolute left-0 bottom-1 mt-2 hidden group-hover:block bg-white p-2 rounded-lg shadow-lg">
                    <Link href={`/dashboard/bank-account/${item.id}/create-transaction`}>
                      <p className={`text-gray-900  hover:text-blue-500 ${session === true ? "hidden": "block"}`}>payout</p>
                    </Link>
                    <Link href={`/dashboard/bank-account/${item.id}`}>
                      <p className="text-gray-900  hover:text-blue-500 ">details</p>
                    </Link>
                  </div>
                 </div>
              </td>
            </tr>
          ))}
        </tbody>
          )}

        </table>
      </div>
              {/* pagination */}
              <div >
          <div className='flex justify-center gap-2 mt-2'>
            {Array.from({length: totalPages},(_,i) =>(
              <button
               key={i+1}
               onClick={()=>handlePageChange(i+1)}
               className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-700"
              }`}
               >
                {i+1}
              </button>
            ))}
          </div>
        </div>
    </div>
    </>
    
  );
}
