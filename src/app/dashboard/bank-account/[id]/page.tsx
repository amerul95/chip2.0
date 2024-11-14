import React from 'react'
import AccountBankbyId from '../../../components/accountBankbyId'

export default async function page({params}:any) {

  const id = await params
  
  return (
    <div className='bg-gray-900 w-full h-screen flex justify-center pt-14'>
      <AccountBankbyId params={id.id}/>
    </div>
  )
}
