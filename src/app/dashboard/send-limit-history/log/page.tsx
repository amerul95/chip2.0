import React from 'react'
import { LogList } from '@/app/lib/actions'
import Logtable from '@/app/components/Logtable'

export default async function page() {

    const response = await LogList()

  return (
    <div>
        <Logtable responses={response.users} />
    </div>
  )
}
