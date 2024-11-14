"use client";

import { loginUser } from "./../lib/loginUser";
import { useActionState } from "react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Loader from "./ui/loader";
import { useFormState } from "react-dom";


export  function LoginForm() {
  const [state, formAction,isLoading] = useFormState<any, FormData>(loginUser, undefined);
  const [showError, setShowError] = useState(false);




  // Show error for 2 seconds when there's an error
  useEffect(() => {

    if (state?.error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000); // 2 seconds

      // Clear timeout when component unmounts or error changes
      return () => clearTimeout(timer);
    }
  }, [state?.error]);

  return (
    <>
        {isLoading && (
    <div className='absolute w-full inset-0 m-auto  bg-white/[.08] z-10 '>
    <Loader/>
  </div>
   )}
      {/* ---------------------------------- */}
      <section className="bg-gray-900 w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg border border-gray-700 px-6 py-8 mx-4 md:mx-auto">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-center text-white">
              Sign in
            </h1>
            <form className="space-y-6" action={formAction}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="username"
                  required
                />

              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-500 ease-in-out"
              >
                Sign in
              </button>
              {showError && <p className="text-red-500">{state.error}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
