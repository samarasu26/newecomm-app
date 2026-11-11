import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import prisma from  "@/lib/prisma"



// Removed invalid apiVersion string so it matches your installed Stripe package
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Note: Replace this with your shared singleton import (e.g., import { prisma } from "@/lib/prisma")
// const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new NextResponse("Missing Stripe signature or webhook secret", { status: 400 });
  }

  let event: Stripe.Event;

  // 1. Verify the webhook signature securely
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 2. Handle the specific Stripe events
  try {
    switch (event.type) {
      // Case A: Handled via Hosted Checkout Sessions
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (!userId) {
          console.error("Missing userId in session metadata");
          break;
        }

        // Update user with Stripe Customer ID so future subscription events can find them
        await prisma.user.update({
          where: { id: userId },
          data: {
            stripeCustomerId: session.customer as string,
          },
        });
        console.log(`💰 Checkout session completed for user: ${userId}`);
        break;
      }

      // Case B: Handled via Subscriptions
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: subscription.status,
              stripePriceId: subscription.items.data[0]?.price.id ?? null,
            },
          });
          console.log(`🔄 Subscription updated for customer: ${customerId}`);
        }
        break;
      }

      // Case C: Subscription Canceled or Expired
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: "CANCELED",
              stripePriceId: null,
            },
          });
          console.log(`❌ Subscription deleted for customer: ${customerId}`);
        }
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("❌ Error processing webhook database transaction:", error);
    return new NextResponse("Database synchronization failed", { status: 500 });
  }
}









// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import Stripe from "stripe";
// import { PrismaClient } from "@prisma/client";

// // Initialize Stripe and Prisma
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2025-01-27.accredited", // Uses the latest stable API version
// });

// const prisma = new PrismaClient();

// // Crucial: Tell Next.js to parse the request body as raw text for signature validation
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: Request) {
//   const body = await req.text();
//   const headersList = await headers();
//   const signature = headersList.get("stripe-signature");

//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   if (!signature || !webhookSecret) {
//     return new NextResponse("Missing Stripe signature or webhook secret", { status: 400 });
//   }

//   let event: Stripe.Event;

//   // 1. Verify the webhook signature securely
//   try {
//     event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
//   } catch (err: any) {
//     console.error(`❌ Webhook signature verification failed: ${err.message}`);
//     return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   // 2. Handle the specific Stripe events
//   try {
//     switch (event.type) {
      
//       // Case A: Handled via Hosted Checkout Sessions (E-commerce / Single Purchases)
//       case "checkout.session.completed": {
//         const session = event.data.object as Stripe.Checkout.Session;
//         const userId = session.metadata?.userId; // Passed during session creation
        
//         if (!userId) {
//           console.error("Missing userId in session metadata");
//           break;
//         }

//         // Update your user or order record to reflect a successful payment
//         await prisma.user.update({
//           where: { id: userId },
//           data: { 
//             // e.g., plan: "PRO", or update an explicit Order model
//           },
//         });
//         console.log(`💰 Checkout session completed for user: ${userId}`);
//         break;
//       }

//       // Case B: Handled via Subscriptions (SaaS recurring cycles)
//       case "customer.subscription.created":
//       case "customer.subscription.updated": {
//         const subscription = event.data.object as Stripe.Subscription;
//         const customerId = subscription.customer as string;
        
//         // Find the user by their Stripe Customer ID mapping
//         const user = await prisma.user.findFirst({
//           where: { stripeCustomerId: customerId },
//         });

//         if (user) {
//           await prisma.user.update({
//             where: { id: user.id },
//             data: {
//               // Sync subscription status (active, trialing, past_due, canceled)
//               subscriptionStatus: subscription.status,
//               stripePriceId: subscription.items.data[0].price.id,
//             },
//           });
//           console.log(`🔄 Subscription updated for customer: ${customerId}`);
//         }
//         break;
//       }

//       // Case C: Subscription Canceled or Expired
//       case "customer.subscription.deleted": {
//         const subscription = event.data.object as Stripe.Subscription;
//         const customerId = subscription.customer as string;

//         const user = await prisma.user.findFirst({
//           where: { stripeCustomerId: customerId },
//         });

//         if (user) {
//           await prisma.user.update({
//             where: { id: user.id },
//             data: {
//               subscriptionStatus: "CANCELED",
//               stripePriceId: null,
//             },
//           });
//           console.log(`❌ Subscription deleted for customer: ${customerId}`);
//         }
//         break;
//       }

//       default:
//         console.log(`ℹ️ Unhandled event type: ${event.type}`);
//     }

//     return new NextResponse("Webhook processed successfully", { status: 200 });

//   } catch (error) {
//     console.error("❌ Error processing webhook database transaction:", error);
//     return new NextResponse("Database synchronization failed", { status: 500 });
//   }
// }





