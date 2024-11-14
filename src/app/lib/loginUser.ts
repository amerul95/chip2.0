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

const users: User[] = [
  {
    id: '1',
    name: 'admin',
    email: 'user@nextmail.com',
    password: '42iZACrac+si2T8bReglw6avLyap8FRe7iphl',
    isAdmin: true
  },
  {
    id: '2',
    name: 'read-only',
    email: 'user@nextmail.com',
    password: 'qeh9wE-#M5b9satepHa8rigebafixLKuy=st?',
    isAdmin: false
  }
];

export const loginUser = async (
  prevState:{error:undefined | string},
  formData: FormData
)=> {
  const session = await getSession();
  
  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  // Find the user by their username or email
  const user = users.find(
    (user) => user.name === formUsername && user.password === formPassword
  );

  if (!user) {
    console.log("user not found")
    return { success: false, message: "Wrong credentials",error:"wrong credentials" };
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
  redirect("/")
}