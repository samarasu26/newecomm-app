<<<<<<< HEAD
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
=======
import { betterAuth, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";


>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
<<<<<<< HEAD
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3001"], 
=======

  emailAndPassword: {
    enabled: true, 
  }, 

  trustedOrigins: ["https://vercel.app", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""],

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
    },
  } 
>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43
});