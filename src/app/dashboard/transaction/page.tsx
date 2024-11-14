import React from 'react'
import InstructionList from '../../components/instructionList'
import Link from 'next/link'
import Image from 'next/image'

export default function page() {
  return (
    <div className='bg-gray-900 w-full flex-col h-screen relative flex pt-6 overflow-x-auto'>
      <InstructionList/>

    </div>
  )
}
