import React from 'react'
import CreateTransation from '@/app/components/createTransaction'

export default async function page({ params } : any) {

  const id = await params.id as string
  return (
    <div className='bg-gray-900 w-full flex-col h-screen flex pt-14 overflow-x-auto'>
      <CreateTransation params={id} />
    </div>
  )
}
