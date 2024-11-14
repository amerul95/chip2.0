"use client";

import React, { useEffect, useState } from 'react';
import { increaseSendLimit } from '../lib/actions';
import { redirect } from 'next/navigation';
import { useActionState } from 'react';
import Loader from './ui/loader';

export default function IncreaseSendLimits() {
  const [state, formAction,isLoading] = useActionState<any, FormData>(increaseSendLimit, undefined);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // Reset form and trigger the message display logic after form submission
  useEffect(() => {
    if (state?.message) {
      setShowMessage(true);

      // Hide the message after 2 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state?.message]);

  if(state?.success == true){
    return redirect('/dashboard/send-limit-history')
  }
   async function getIp(){
    const ipresponse = await fetch('/dashboard/send-limit-history/api/getapi',{
      method:'GET',
      headers:{
        'accept':'application/json'
      }
    })
  }

  return (

    <>
    {isLoading && (
    <div className='absolute w-full inset-0 m-auto  bg-white/[.08] z-10 '>
    <Loader/>
  </div>
    )}

    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 lg:p-8 relative">
      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="increaseLimit" className="block mb-2 text-sm font-medium text-white">
            Please put Amount
          </label>
          <input
            type="text"
            name="amount"
            placeholder="Amount in MYR"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <button
            type="submit"
            className="w-full mt-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Send
          </button>
        </div>
        {state?.success == false && <p className="text-red-500 text-center">{state?.message}</p>}
        {state?.success == true && <p className="text-lime-600 text-center">{state?.message}</p>}
      </form>
    </div>
    </>
  );
}
