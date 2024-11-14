"use server"

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { createPurchase } from "../schema/zodSchema";

export async function chipCollect(
    prevState: unknown,
    formData: FormData,
){

    const email = formData.get('email') as string | null;
    const full_name = formData.get('fullName') as string | null;
    const product_name = formData.get('nameProduct') as string | null;
    const price = formData.get('price') as string | null;
    const currency = formData.get('currency') as string | null;

    // Validate inputs first using Zod schema
    const submission = parseWithZod(formData, {
        schema: createPurchase
    });
    if (submission.status !== "success") {
        return submission.reply; // Return validation errors if schema validation fails
    }

    // Ensure price is parsed safely
    const parsedPrice = parseFloat(price || "0");

    // Create the request body after validation
    const reqBody = JSON.stringify({
        client: { 
            email,
            full_name,
        },
        purchase: { 
            products: [
                { 
                    name: product_name, 
                    price: parsedPrice * 100,  // Convert price to cents (e.g. $10 becomes 1000 cents)
                    currency,
                }
            ]
        },
        brand_id: process.env.BRAND_ID || "default-brand-id", // Ensure a valid fallback
        success_redirect: "https://chip.bytonbyte.com/dashboard/processing",
        failure_redirect: "https://chip.bytonbyte.com/dashboard/processing-failed"
    });
    console.log(reqBody)

    try {
        // Send request to API
        const response = await fetch('https://gate.chip-in.asia/api/v1/purchases/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                'Content-Type': 'application/json', 
            },
            body: reqBody
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.purchase.products);

            return { success: false, message: errorData.message || 'Failed to create deposit' };
        }

        // Success: Redirect to checkout URL
        const data = await response.json();
        return { success: true, checkout_url: data.checkout_url };
    } catch (error) {
        console.error("Error creating purchase:", error);
        return { success: false, message: 'An unexpected error occurred' };
    }
}
