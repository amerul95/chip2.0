import React from 'react'
import { logOut } from '../../lib/loginUser'
import Image from 'next/image'

export default function Logout() {
  return (
    <form action={logOut}>
      <button 
        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm md:text-base lg:text-lg px-4 md:px-5 py-2 md:py-2.5 text-center inline-flex items-center hover:bg-[#FF9119]/80 focus:ring-[#FF9119]/40 me-2 mb-2"
      >
        <Image 
          className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 me-2 -ms-1" 
          src={'/check-out.png'} 
          width={20} 
          height={20} 
          alt='logo-logout'
        /> 
        Log Out
      </button>
    </form>
  )
}
