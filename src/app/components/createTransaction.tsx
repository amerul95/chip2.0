"use client";

import React, { useEffect, useState } from 'react';
import { createNewInstruction } from '../lib/actions';
import { useFormState } from 'react-dom';


export default function CreateTransaction({params}:any) {

  const [state, formAction] = useFormState<any, FormData>(createNewInstruction, undefined);
  const [showMessage, setShowMessage] = useState<boolean | undefined>(undefined);

  console.log(params)

  useEffect(() => {


    if (state?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000); // Message visible for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [state?.message]);
  return (
    <div >

<form className="max-w-sm mx-auto" action={formAction}>
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium  text-white">Bank Account ID<span className='text-red-700'>*</span></label>
    <input type="number" value={params} aria-label="disabled input" id="accountnumber" name='bank_account_id' className=" border cursor-not-allowed  text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  " placeholder="123456789" readOnly/>
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium  text-white">Amount<span className='text-red-700'>*</span></label>
    <input type="text" id="bankcode" name='amount' placeholder="12345" className="border  text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500" required />
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium  text-white">Email<span className='text-red-700'>*</span></label>
    <input type="email" id="name" name='email' aria-required placeholder="Jony No Papa" className="border   text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500" required />
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium  text-white">Description <span className='text-red-700'>*</span></label>
    <input type="text" id="refrence" name='description' placeholder="description" className=" border   text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500" required />
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium  text-white">Reference<span className='text-red-700'>*</span></label>
    <input type="text" id="refrence" name='reference' placeholder="refrences..." className=" border  text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500" required />
  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>

  {showMessage && <p className="text-red-500 text-center">{state?.message}</p>}

</form>

    </div>
  )
}
