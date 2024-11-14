import React from 'react'
import Image from 'next/image'

export default function FailedProcessingComp() {
  return (
    <div className='bg-gray-900 text-white w-full h-screen flex  items-start space-x-4 pt-16'>
      <p className='text-3xl'>Failed</p>
      <Image
        src={'/remove.png'}
        width={30}
        height={30}
        alt='check-out'>

      </Image>
    </div>
  )
}
