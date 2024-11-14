import { SessionOptions } from "iron-session"
export interface SessionData {
  userId?: string,
  username?: string,
  isAdmin?: boolean,
  isLoggedIn:boolean,
  isDeny?:boolean,
  ipAddress?:string,
  location?:string
}

export const sessionOptions : SessionOptions = {
  password: process.env.AUTH_SECRET!,
  cookieName: "client-session",
  cookieOptions:{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
  }
}

export const defaultSession:SessionData = {
  isLoggedIn: false,
  isDeny:false
}

export interface BodyRequest{
  log?:string,
  role?:string,
  login?:string,
  amount?: number,
  timeRequest?:string,
  ipAddress?:number,
  location?:string
}