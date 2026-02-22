"use client";

import { loginUser } from "./../lib/loginUser";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "./ui/loader";
import { useFormState } from "react-dom";

type LoginState = {
  ok:boolean
  message: string | null,
}

export  function LoginForm() {
  const initialState:LoginState = {ok:true,message:null}
  const [state, formAction,isLoading] = useFormState<LoginState, FormData>(loginUser, initialState);
  const [showError, setShowError] = useState(false);




  // Show error for 2 seconds when there's an error
  useEffect(() => {

    if (state?.message) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000); // 2 seconds

      // Clear timeout when component unmounts or error changes
      return () => clearTimeout(timer);
    }
  }, [state?.message]);

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
            <div className="flex justify-center">
              <Image
                src="/atom_1.png"
                alt="App logo"
                width={64}
                height={64}
                className="animate-pulse"
              />
            </div>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-center text-white">
              Sign in
            </h1>
            <div className="rounded-lg bg-gray-700/50 border border-gray-600 p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Demo credentials</p>
              <p className="text-sm text-white">
                <span className="text-gray-400">Username:</span> <code className="text-green-400">read-only</code>
              </p>
              <p className="text-sm text-white mt-1">
                <span className="text-gray-400">Password:</span> <code className="text-green-400">Senario@123</code>
              </p>
            </div>
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
              {showError && <p className="text-red-500">{state.message}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
