import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function createNew() {
  return (
    <Link className='block max-w-64 mx-auto' href="/dashboard/bank-account/create-accountbank">
    <div className=' bg-white max-w-64  mx-auto p-2 rounded-lg'>
        <div className='flex space-x-2 items-center justify-center'>
            <p>create new Account Bank</p>
            <Image
            src={"/create.png"}
            width={20}
            height={20}
            alt='add logo'>  
            </Image>
        </div>
    </div>
    </Link>
  )
}
