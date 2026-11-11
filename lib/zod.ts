// lib/zod.ts
import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
});

// Infer TypeScript type directly from the schema
export type SignUpInput = z.infer<typeof signUpSchema>;


export const SignInSchema = z.object({

  email : z.string()
  .min(3,"email must be a valid email address"),  
  
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),


})  

export type SignInInput = z.infer<typeof SignInSchema>;



const GmailSchema = z.object({
  email: z.string().email().regex(/@gmail\.com$/, {
    message: "Email must be a valid @gmail.com address",
  }),
});

