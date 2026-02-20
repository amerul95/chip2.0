import React from 'react'
import { LogList } from '@/app/lib/actions'
import Logtable from '@/app/components/Logtable'

export default async function page() {
  const response = await LogList();
  const users = response?.users ?? [];

  return (
    <div>
      <Logtable responses={users} />
    </div>
  );
}
