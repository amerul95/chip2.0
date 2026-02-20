import React from 'react'
import { bankAcoountbyId } from '../lib/actions'

interface AccountDetails {
    status: string,
    account_number: string,
    bank_code: string,
    name: string,
    created_at: string,
    updated_at: string
}

export default async function AccountBankbyId({ params }: any) {

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

    const result = await bankAcoountbyId(params);

    if (!result.ok) {
        return (
            <div className="p-4">
                <p className="text-red-500 text-lg font-semibold">{result.error}</p>
            </div>
        );
    }

    const response = result.data as unknown as AccountDetails;

    return (
        <div className="p-4">
            <div className='relative overflow-x-auto rounded'>
                <table className='w-full min-w-full bg-gray-800 text-sm text-left rtl:text-right text-white'>
                    <tbody className='border-b'>
                        <tr className='border-b'>
                            <td className="px-4 py-2 md:px-6 md:py-4">Account Bank Status</td>
                            <td className="px-4 py-2 md:px-6 md:py-4">{response.status}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-4 py-2 md:px-6 md:py-4">Account Number</td>
                            <td className="px-4 py-2 md:px-6 md:py-4">{response.account_number}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-4 py-2 md:px-6 md:py-4">Bank Code</td>
                            <td className="px-4 py-2 md:px-6 md:py-4">{response.bank_code}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-4 py-2 md:px-6 md:py-4">Name</td>
                            <td className="px-4 py-2 md:px-6 md:py-4">{response.name}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-4 py-2 md:px-6 md:py-4">Created Date</td>
                            <td className="px-4 py-2 md:px-6 md:py-4">{formatDate(response.created_at)}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-4 py-2 md:px-6 md:py-4">Update Date</td>
                            <td className="px-4 py-2 md:px-6 md:py-4">{formatDate(response.updated_at)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
