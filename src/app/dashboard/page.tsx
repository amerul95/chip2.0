import { getSession } from "../lib/session"
import AccountDetail from "../components/accountDetail"

export default async function page() {

  const session = await getSession()

  return (
    <div className='bg-gray-900 w-full h-screen flex justify-center pt-14 '>
        <AccountDetail/>
    </div>
  )
}