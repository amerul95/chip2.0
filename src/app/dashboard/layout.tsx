import React from 'react'
import Navbar from '../components/ui/navbar'

export default function Layout({children}: {children:React.ReactNode}) {
  return (
    <div className=''>
      <div className='z-10 relative'>
        <Navbar/>
      </div>
      <div className='flex justify-center bg-gray-900'>
        {children}
      </div>
    </div>
  )
}
