"use client"

import React from 'react'
import { createBankAccount } from '../lib/actions'
import { useFormState } from 'react-dom'
import { useState,useEffect } from 'react'

export default function CreatePage() {


    const[state,formAction] = useFormState<any,FormData>(createBankAccount,undefined)
    const [showMessage, setShowMessage] = useState<boolean | undefined>(undefined);

console.log("state",state)

    useEffect(() => {
        if (state?.message) {
          setShowMessage(true);
          const timer = setTimeout(() => {
            setShowMessage(false);
          }, 4000); 
    
          return () => clearTimeout(timer);
        }
      }, [state?.message]);

  return (
    <div >


<form className="max-w-sm mx-auto" action={formAction}>
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 text-white">Account Number <span className='text-red-700'>*</span></label>
    <input type="number" id="accountnumber" name='account_number' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="123456789" required />
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900 text-white">Bank Code <span className='text-red-700'>*</span></label>
    <input type="text" id="bankcode" name='bank_code' placeholder="MBBEMYKL" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500" required />
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900 text-white">Name <span className='text-red-700'>*</span></label>
    <input type="text" id="name" name='name' placeholder="Jony No Papa" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500" required />
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900 text-white">Refrence <span>(optional)</span></label>
    <input type="text" id="refrence" name='refrence' placeholder="refrences..." className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500" required />
  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Submit</button>

   {showMessage && <p className='text-red-500 text-center mt-2'>{state?.message}</p>}

</form>

    </div>
  )
}
