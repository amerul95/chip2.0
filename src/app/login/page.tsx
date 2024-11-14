import { LoginForm } from "../components/loginForm"

export default function Login(){

  const env = process.env.API_KEY

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-black">
          <LoginForm/>
        </div>
    )
}