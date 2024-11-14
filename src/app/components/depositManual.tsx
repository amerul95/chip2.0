"use client";

import React, { useState,useEffect } from "react";
import { chipCollect } from "../lib/actiondeposit";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createPurchase } from "../schema/zodSchema";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";


export default function DepositManual() {
  const [lastResult, formAction] = useFormState<any, FormData>(chipCollect, undefined);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [form,fields] = useForm({
    lastResult,
    onValidate({formData}){
      return parseWithZod(formData, {schema:createPurchase})
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })


  // Reset form and trigger the message display logic after form submission
  useEffect(() => {
    if (lastResult?.message) {
      setShowMessage(true);

      // Hide the message after 2 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [lastResult?.message]);


  if(lastResult?.success === true){
    return redirect(lastResult.data)
  }

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 lg:p-8">
      <form 
        action={formAction}
        id={form.id}
        onSubmit={form.onSubmit}
        >
        <div className="mb-5 space-y-2 flex flex-col">
          <div>
          <label htmlFor={fields.fullName.id} className="block mb-2 text-sm font-medium text-white">
            Full Name
          </label>
          <input
            name={fields.fullName.name}
            id={fields.fullName.id}
            defaultValue={fields.fullName.initialValue}
            placeholder="Muthusamy Arumugam"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
           {fields.fullName.errors && (
              <p className="text-red-500 text-sm">
                {fields.fullName.errors}
              </p>
            )}
          </div>
          <div>
          <label htmlFor={fields.email.id} className="block mb-2 text-sm font-medium text-white">
            Email
          </label>
          <input
                        name={fields.email.name}
                        id={fields.email.id}
                        defaultValue={fields.email.initialValue}
            placeholder="test@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
                     {fields.email.errors && (
              <p className="text-red-500 text-sm">
                {fields.email.errors}
              </p>
            )}
          </div>
          <div>
          <label htmlFor={fields.nameProduct.id} className="block mb-2 text-sm font-medium text-white">
            Name Product
          </label>
          <input
                                  name={fields.nameProduct.name}
                                  id={fields.nameProduct.id}
                                  defaultValue={fields.nameProduct.initialValue}
            placeholder="Payin from"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
                     {fields.nameProduct.errors && (
              <p className="text-red-500 text-sm">
                {fields.nameProduct.errors}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={fields.price.id} className="block mb-2 text-sm font-medium text-white">
              Amount
            </label>
            <div className="flex">
              <select
                id="countries"
                name="currency"
                className="bg-gray-50 border border-gray-300 max-w-20 rounded-lg text-gray-900 text-sm rounded-r-none focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                
                <option value="MYR">MYR</option>
                <option value="USD">USD</option>
              </select>
              <input
                                        name={fields.price.name}
                                        id={fields.price.id}
                                        defaultValue={fields.price.initialValue}
                placeholder="Amount in Currency"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />

            </div>
            {fields.price.errors && (
              <p className="text-red-500 text-sm">
                {fields.price.errors}
              </p>
            )}
          </div>


        </div>
        <div >
          <button
            className="w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
            type="submit"
          >
            Send
          </button>
          {lastResult?.success == false && <p className="text-red-500 text-center">{lastResult?.message}</p>}
            </div>
      </form>
    </div>
  );
}
