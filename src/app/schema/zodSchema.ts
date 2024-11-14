import { z } from "zod"

export const createPurchase = z.object({
    fullName: z.string().refine((val) => val.length > 4,{
        message:"Full name must be at Least 4 characters"
    }),
    email: z.string().email(),
    nameProduct: z.string().refine((val) => val.length > 4,{
        message:"Name Products must be at Least 4 characters"
    }),
    price: z.number().positive().min(1),  
})