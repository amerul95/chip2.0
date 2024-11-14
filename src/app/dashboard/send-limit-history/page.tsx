import React from 'react'
import IncreaseLimitHistory from '../../components/increaseLimitHistory'
import Link from 'next/link'

export default async function page() {
  return (
    <div className='bg-gray-900 w-full flex-col h-screen flex pt-14 overflow-x-auto'>
      <Link
      href={'send-limit-history/log'}
      >
        <p className='text-white pl-4 underline'>Log</p>
      </Link>
      <IncreaseLimitHistory/>
    </div>
  )
}
