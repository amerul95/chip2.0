
import crypto from 'crypto';
import { getSession } from './session';
import prisma from "@/app/lib/prisma";
import type { DetailAccount } from '../components/accountDetail';
import { ok } from 'assert';

export type ActionResult<T>= 
  | { ok: true; data: T }
  | { ok: false; error: string };

type GenerateSuccess = {
  ok:true
  epochSecs: number;
  checksum: string;
  domain: string;
  apiKey: string;
}


type GenerateError = {
  ok: false;
  error: string;
};

type GenerateResult = GenerateSuccess | GenerateError;


const generateAllCre = (): GenerateResult => {
  // try {
    
  // } catch (error) {
    
  // }
  // Helper function to generate checksum
  const generateChecksum = (apiKey: string, apiSecret: string) => {
    const epoch = new Date().getTime();
    const epochSecs = Math.floor(epoch / 1000);

    const data = epochSecs.toString() + apiKey;
    const hmacDigest = crypto.createHmac('sha512', apiSecret)
                             .update(data)
                             .digest('hex'); // Generate HMAC digest

    return { epochSecs, checksum: hmacDigest };
  };

  // Example usage in your Next.js component or API route
  const apiKey = process.env.NEXT_PUBLIC_API_KEY 
  const apiSecret = process.env.NEXT_PUBLIC_API_SECRET 

  if (!apiKey || !apiSecret) {
    return {ok:false,error:"Env API is not defined"}
  }

  const { epochSecs, checksum } = generateChecksum(apiKey, apiSecret);
  const domain = 'https://api.chip-in.asia/api/';

  // Return both values as an object
  return { ok:true,epochSecs, checksum, domain, apiKey };
};



const allAccountsSend = async ():Promise<ActionResult<any[]>>=> {
    const cre = generateAllCre() 
    if(!cre.ok){
      return {ok:false,error:cre.error}
    }
      const { epochSecs, checksum, domain, apiKey } = cre;

    try {
        const response = await fetch(`${domain}send/accounts`,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${apiKey}`,
                epoch: `${epochSecs}`,
                checksum:`${checksum}`
            }
        })

        if(!response.ok){
            console.log('faile to fetch list accounts')
            return {ok:false,error:"'faile to fetch list accounts'"}
        }
        const json = await response.json()
        return {ok:true,data:json.results ?? []}


    } catch (error) {
      const msg = error instanceof Error ? error.message :"Server error"
        console.log('error fetching')
        return {ok:false,error:msg}
    }
}

const allSendLimit = async ():Promise<ActionResult<any[]>> => {

    const cre = generateAllCre()
    if(!cre.ok){
      return {ok:false,error:"failed to send limit"}
    }
     const { epochSecs, checksum, domain, apiKey } = cre;

    try {
        const response = await fetch(`${domain}send/send_limits`,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${apiKey}`,
                epoch: `${epochSecs}`,
                checksum:`${checksum}`
            }
        })

        if(!response.ok){
            console.log('faile to fetch list all send limits')
            return {ok:false,error:"faile to fetch list all send limits"}
        }

        const listAccounts = await response.json()
        return {ok:true,data:listAccounts.results}

    } catch (error) {
        console.log('error fetching')
        const mes = error instanceof Error ? error.message : "server error"
        return {ok:false,error:mes}
    }
}



const allBankAcoount = async (id:string):Promise<ActionResult<any[]>> => {
  const cre = generateAllCre()
  if(!cre.ok){
    return {ok:false,error:cre.error}
  }
  const { epochSecs, checksum, domain, apiKey } = cre;

  try {
      const response = await fetch(`${domain}send/bank_accounts?page=${id}`,{
          method: 'GET',
          headers:{
              Authorization: `Bearer ${apiKey}`,
              epoch: `${epochSecs}`,
              checksum:`${checksum}`
          },
          cache:'no-store'
      })

      if(!response.ok){
          console.log('faile to fetch list all bank account')
          return {ok:false,error:"faile to fetch list all bank account"}
      }

      const listAccounts = await response.json()
      return {ok:true,data:listAccounts}

  } catch (error) {
      console.log('error fetching')
      const mes = error instanceof Error ? error.message : "server error"
      return {ok:false,error:mes}
  }
}
const bankAcoountbyId = async (id:string):Promise<ActionResult<any[]>> => {
  const cre = generateAllCre()
  if(!cre.ok){
    return {ok:false,error:cre.error}
  }
  const { epochSecs, checksum, domain, apiKey } = cre;


  try {
      const response = await fetch(`${domain}send/bank_accounts/${id}`,{
          method: 'GET',
          headers:{
              Authorization: `Bearer ${apiKey}`,
              epoch: `${epochSecs}`,
              checksum:`${checksum}`
          }
      })

      if(!response.ok){
          console.log('faile to fetch list bank account by id')
      }

      const listAccounts = await response.json()
      return {ok:true,data:listAccounts}

  } catch (error) {
      console.log('error fetching')
      const mes = error instanceof Error ? error.message : "server error"
      return {ok:false,error:mes}
  }
}
const allInstructionsList = async (id:string):Promise<ActionResult<any[]>> => {
  const cre = generateAllCre()
  if(!cre.ok){
    return {ok:false,error:cre.error}
  }
  const { epochSecs, checksum, domain, apiKey } = cre;

  try {
      const response = await fetch(`${domain}send/send_instructions?page=${id}`,{
          method: 'GET',
          headers:{
              Authorization: `Bearer ${apiKey}`,
              epoch: `${epochSecs}`,
              checksum:`${checksum}`
          }
      })

      if(!response.ok){
          console.log('faile to fetch send instructions')
          return {ok:false,error:"faile to fetch send instructions"}
      }

      const listAccounts = await response.json()
      return {ok:true,data:listAccounts}

  } catch (error) {
      console.log('error fetching')
      const mes = error instanceof Error ? error.message : "server error"
      return {ok:false,error:mes}
  }
}


const instructionbyId = async (id:string):Promise<ActionResult<any[]>> => {
  const cre = generateAllCre()
  if(!cre.ok){
    return {ok:false,error:cre.error}
  }
  const { epochSecs, checksum, domain, apiKey } = cre;

  
    try {
        const response = await fetch(`${domain}send/send_instructions/${id}`,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${apiKey}`,
                epoch: `${epochSecs}`,
                checksum:`${checksum}`
            }
        })
  
        if(!response.ok){
            console.log('failed to fetch send instruction by id')
        }
  
        const listAccounts = await response.json()
        return {ok:true,data:listAccounts}
  
    } catch (error) {
        console.log('error fetching')
        const mes = error instanceof Error ? error.message : "server error"
        return {ok:false,error:mes}
    }
  }

  const createBankAccount = async (
    prevState:{error:undefined | string},
    formData:FormData
  ):Promise<ActionResult<any[]> | undefined> => {

    const reqBody = JSON.stringify({
        account_number: formData.get('account_number'),
        bank_code: formData.get('bank_code'),
        name: formData.get('name'),
        refrence: formData.get('refrence'),
    })

    const cre = generateAllCre()
    if(!cre.ok){
      return {ok:false,error:cre.error}
    }
    const { epochSecs, checksum, domain, apiKey } = cre;
    try {
        const response = await fetch(`${domain}send/bank_accounts`,{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${apiKey}`,
                epoch: `${epochSecs}`,
                checksum:`${checksum}`,
                'Content-Type' : 'application/json'
            },
            body: reqBody,
        })
        const data = await response.json()

        if(!response.ok){
            return{ok:false,error:data.message}
        }

        console.log(data)
        return {ok:true,data:data.message}

        
    } catch (error) {
        console.log('error fetching')
    }
  }

  const updateLog = async (req:any) =>{
    const { log, role, login, amount, ipAddress, location } = req;
    try {
        
    } catch (error) {
        
    }
    

    if (typeof amount !== 'number') {
      throw new Error('Amount is required and should be an integer.');
    }

    const newUser = await prisma.user.create({
      data: {
        log,
        role,
        login,
        amount,
        ipAddress,
        location,
      },
    });
    return {success:true}
  }

  const increaseSendLimit = async (
    prevState:{data:undefined | string},
    formData: FormData
) => {
  const cre = generateAllCre()
  if(!cre.ok){
    return {ok:false,error:cre.error}
  }
  const { epochSecs, checksum, domain, apiKey } = cre;
  const session = await getSession()
  const date = new Date().toISOString();

  console.log(formData.get('amount'))

  const amountValue = parseFloat(formData.get('amount') as any);
  if (isNaN(amountValue)) {
      throw new Error("Amount is required and should be an integer.");
  }

  const reqBody = JSON.stringify({
    amount:amountValue
  })
  console.log(reqBody)

  try {
      const response = await fetch(`${domain}send/send_limits`,{
          method: 'POST',
          headers:{
              Authorization: `Bearer ${apiKey}`,
              epoch: `${epochSecs}`,
              checksum:`${checksum}`,
              'Content-Type'  : 'application/json'
          },
          body: reqBody
      })

      const data = await response.json()
      const bodyReq  = {
        "log": "Increase send limit request",
        "role":`${session.username}`,
        "login":`${session.isLoggedIn}`,
        "amount":amountValue ,
        "timeRequest":`${date}`,
        "ipAddress":`${session.ipAddress}`,
        "location":`${session.location}`
      }
      console.log(bodyReq)

      if(!response.ok){
          return{success:false,message:data.message}
      }

      const update = await updateLog(bodyReq)

      if(update.success === false){
        return {success:false,message:"failed to update log"}
      }

      console.log("done increase")

      return {success:true,message:"successfull increase limit and update"}

  } catch (error) {
      console.log('error fetching')
  }
}

const createNewInstruction = async (
    prevState:{error:undefined | string},
    formData: FormData
) => {
  const cre = generateAllCre()
  if(!cre.ok){
    return {ok:false,error:cre.error}
  }
  const { epochSecs, checksum, domain, apiKey } = cre;

  const reqBody = JSON.stringify({
    bank_account_id:formData.get('bank_account_id'),
    amount:formData.get('amount'),
    email:formData.get('email'),
    description:formData.get('description'),
    reference:formData.get('reference'),
  })

  console.log(reqBody)

  try {
      const response = await fetch(`${domain}send/send_instructions`,{
          method: 'POST',
          headers:{
              Authorization: `Bearer ${apiKey}`,
              epoch: `${epochSecs}`,
              checksum:`${checksum}`,
              'Content-Type'  : 'application/json'
          },
          body: reqBody
      })

      const data = await response.json()

      if(!response.ok){
        console.log(data)
          return{success:false,message:data.message}
      }

      return {success:true,message:data.message}

  } catch (error) {
      console.log('error fetching')
  }
}

const submit = async (
    prevState: { data: undefined | string },
    formData: FormData
  ) => {
    const item = formData.get('item');
  
    const itemData = {
        "name" : "test",
        "age"  : "12"
    }
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Simulate success or failure condition
    if (item === "fail") {
      return {
        success:false,
        message: "Submission failed. Please try again.",
        data:itemData
      };
    } else {
      return {
        success:true,
        message: "Success! Your item has been submitted.",
        data:itemData
      };
    }
  };


  const LogList = async () => {
    try {
      const user = await prisma.user.findMany();
  
      // Return the JSON response with cache control headers
      const response = new Response(
        JSON.stringify({ success: true, users: user, status: 200 }),
        {
          headers: { 
            "Content-Type": "application/json", // Ensure it's JSON
          },
        }
      );
  
      const data = await response.json(); // Parse the response body as JSON
    //   revalidatePath('/dashboard/send-limit-history/log')
      return data; // Return the actual data
  
    } catch (error) {
      console.error("Error fetching users:", error);
      return { error: "Unable to fetch users", status: 500 };
    }
  };
  

  const downloadCrv = async (prevState:undefined, formData:FormData) => {
    try {
      const response = await fetch('http://localhost:3000/api/downloadcsv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/csv', // Adjust this based on your API response type
        },
        body: JSON.stringify({ startDate: "10-15-2024", endDate: "10-15-2024" }),
      });
  
      if (!response.ok) {
        return { message: "fail" };
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary link to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'download.csv'; // Specify the filename
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
  
      return { message: "success" };
    } catch (error) {
      console.error("Download error:", error);
      return { message: "internal error" };
    }
  };
  


export {downloadCrv,generateAllCre,LogList,allAccountsSend,increaseSendLimit,allSendLimit,allBankAcoount,bankAcoountbyId,allInstructionsList,instructionbyId,createBankAccount,createNewInstruction,submit};