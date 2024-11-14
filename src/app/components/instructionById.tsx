import React from 'react';
import { instructionbyId } from '../lib/actions';
import Link from 'next/link';

interface AccountDetails {
  id: number;
  bank_account_id: number;
  bank_account_details: {
    name: string;
    bank_code: string;
    account_number: string;
  };
  amount: string;
  state: string;
  rejection_reason: string | null;
  email: string;
  description: string | null;
  reference: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
  receipt_url: string;
}

export default async function InstructionById({ params }: any) {
  const id = await params
  const response: AccountDetails = await instructionbyId(id);

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-gray-800 text-sm text-left text-white">
          <tbody className="divide-y divide-gray-700">
            <tr>
              <td className="px-4 py-2 md:px-6 md:py-4">Status</td>
              <td className="px-4 py-2 md:px-6 md:py-4">{response.state}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 md:px-6 md:py-4">Bank Account Id</td>
              <td className="px-4 py-2 md:px-6 md:py-4">{response.bank_account_id}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 md:px-6 md:py-4">Amount</td>
              <td className="px-4 py-2 md:px-6 md:py-4">{response.amount}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 md:px-6 md:py-4">Description</td>
              <td className="px-4 py-2 md:px-6 md:py-4">{response.description}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 md:px-6 md:py-4">Reference</td>
              <td className="px-4 py-2 md:px-6 md:py-4">{response.reference}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 md:px-6 md:py-4">Created Date</td>
              <td className="px-4 py-2 md:px-6 md:py-4">{response.created_at}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 md:px-6 md:py-4">Update Date</td>
              <td className="px-4 py-2 md:px-6 md:py-4">{response.updated_at}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 md:px-6 md:py-4 text-center">
                <Link href={response.receipt_url} className="text-blue-500 underline">Receipt</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
