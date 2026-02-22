"use server"

import { redirect } from "next/navigation";
import { getSession } from "./session";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

type LoginState =  {ok:boolean,message:string | null}


const users: User[] = [
  {
    id: '1',
    name: 'read-only',
    email: 'user@nextmail.com',
    password: 'Senario@123',
    isAdmin: false
  },
];

export const loginUser = async (
  prevState:LoginState,
  formData: FormData
):Promise<LoginState>=> {
    const session = await getSession();
  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  // Find the user by their username 
  const user = users.find(
    (user) => user.name === formUsername && user.password === formPassword
  );

  if (!user) {
    console.log("user not found")
    return { ok: false, message: "Wrong credentials"};
  }



  // Set session properties
  session.userId = user.id;
  session.username = user.name;
  session.isAdmin = user.isAdmin;
  session.isLoggedIn = true;
  session.ipAddress = formData.get("ipaddress") as string
  session.location = formData.get("location") as string
  

  // Persist the session
  await session.save();
  redirect("/dashboard")
  
};


export const logOut = async () =>{
  const session = await getSession()
  session.destroy();
  await session.save()
  redirect("/")
}