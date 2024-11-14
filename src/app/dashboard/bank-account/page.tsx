import React from 'react'
import BankAccount from '../../components/bankAccount'
import { getSession } from '@/app/lib/session'
import { allBankAcoount } from '@/app/lib/actions'

export default async function page() {


  const session = await getSession()


  return (
    <div className='bg-gray-900 w-full flex-col h-screen flex pt-14 overflow-x-auto'>
      <BankAccount session={session.isDeny}/>
    </div>
  )
}
