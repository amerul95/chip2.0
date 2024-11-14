"use client"

import React from 'react'

export default function Logtable({responses}:any) {

    function formatDate(isoDate:any){
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
          });

          return formattedDate
    }

  return (
    <div>
    
<div className="relative overflow-x-auto h-screen">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    LOG
                </th>
                <th scope="col" className="px-6 py-3">
                    ROLE
                </th>
                <th scope="col" className="px-6 py-3">
                    IS LOGIN
                </th>
                <th scope="col" className="px-6 py-3">
                    AMOUNT
                </th>
                <th scope="col" className="px-6 py-3">
                    IP ADDRESS
                </th>
                <th scope="col" className="px-6 py-3">
                    LOCATION
                </th>
                <th scope="col" className="px-6 py-3">
                    CREATE AT
                </th>
            </tr>
        </thead>
        <tbody>
            {responses.map((item:any,key:number)=>(
            <tr key={key} className="border-b bg-gray-800 border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                {item.id}
            </th>
            <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                {item.log}
            </td>
            <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                {item.role}
            </td>
            <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                {item.login}
            </td>
            <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                RM{item.amount}
            </td>
            <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                {item.ipAddress}
            </td>
            <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                {item.location}
            </td>
            <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                {formatDate(item.createdAt)}
            </td>
        </tr>
            ))}

        </tbody>
    </table>
</div>

    </div>
  )
}
