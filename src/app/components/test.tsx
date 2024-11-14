"use client"

import React from 'react'
import { useFormState } from 'react-dom'
import { submit } from '../lib/actions'

export default function Test() {


    const [state , formAction] = useFormState<any,FormData>(submit,undefined)

  return (
    <div className='text-white'>
        <form action={formAction} className='mt-24 flex flex-col'>
            <input type="text" name='item' className='text-black'/>
            <button>send</button>
            {state?.success == false && <p className='text-orange-700'>{state.message}</p>}
            {state?.success == true && <p className='text-lime-400'>{state.message}{state.data.age}</p>}
        </form>
    </div>
  )
}

