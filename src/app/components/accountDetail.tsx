"use client";

import React, { useEffect, useState } from "react";
import { allAccountsSend } from "../lib/actions"; // Assuming this is the correct import path

interface DetailAccount {
  status: string;
  currency: string;
  send_fee_type: string;
  settlement_convert_approvals_count: number;
  send_fee: number;
  convertible_balance_from_statement: number;
  current_balance: number;
  created_at: string;
  updated_at: string;
}

export default function AccountDetail() {
  const [accounts, setAccounts] = useState<DetailAccount[] | null>(null); // State to hold the account data
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long", // Use 'short' for abbreviated month names
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short", // Optional: shows the timezone
    };
    return date.toLocaleString("en-US", options);
  };


  useEffect(() => {
    // Using an async function inside useEffect to fetch data
    const fetchAccounts = async () => {
      try {
        const result: DetailAccount[] = await allAccountsSend();
        setAccounts(result); // Update state with fetched data
      } catch (error) {
        console.error("Failed to fetch account details", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAccounts(); // Call the async function
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  if (!accounts) {
    return <p>No account details available.</p>; // Handle case where no data is fetched
  }

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto rounded">
        <table className="w-full min-w-full bg-gray-800 text-sm text-left rtl:text-right text-white">
          {accounts.map((item, key) => (
            <tbody key={key} className="border-b">
              <tr className="border-b">
                <td className="px-4 py-2 md:px-6 md:py-4">Status</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{item.status}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 md:px-6 md:py-4">Currency</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{item.currency}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 md:px-6 md:py-4">Send Fee Type</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{item.send_fee_type}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 md:px-6 md:py-4">Send Fee</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{item.send_fee}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 md:px-6 md:py-4">Approval Count</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{item.settlement_convert_approvals_count}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 md:px-6 md:py-4">Convertible Balance</td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  {item.convertible_balance_from_statement} MYR
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 md:px-6 md:py-4">Current Balance</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{item.current_balance} MYR</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 md:px-6 md:py-4">Created Date</td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  {formatDate(item.created_at)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 md:px-6 md:py-4">Updated Date</td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  {formatDate(item.updated_at)}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
