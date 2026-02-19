import { getSession } from "../lib/session"
import AccountDetail from "../components/accountDetail"
import { redirect } from "next/navigation"
import { DetailAccount } from "../components/accountDetail"
import { allAccountsSend } from "../lib/actions"; 
import { Suspense } from "react";

export default async function page() {

  const session = await getSession()
  if(!session) {
    redirect("/login")
  }

  const resultResponse = await allAccountsSend()
  const result: DetailAccount[] = resultResponse.ok ? resultResponse.data : []



  return (
    <div className='bg-gray-900 w-full h-screen flex justify-center pt-14 '>
      <Suspense fallback={<p className="text-white text-lg font-semibold">Loading...</p>}>
        {resultResponse.ok ? (
          <AccountDetail result={result}/>
        ) : (
          <p className="text-red-500 text-lg font-semibold">{resultResponse.error}</p>
        )}
      </Suspense>

    </div>
  )
}