// app/actions/stripe.ts
'use server';

import { PrismaClient } from '@prisma/client';
import { Stripe } from 'stripe';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-28.acacia' as any,
});

export async function createCheckoutSession(documentId: string) {
  // 1. Fetch document price from Neon DB via Prisma
  const doc = await prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!doc) throw new Error('Document not found');

  // 2. Create Stripe Checkout Session for a dynamic/one-time price
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: doc.name,
            description: 'PDF Document Purchase',
          },
          unit_amount: Math.round(doc.price * 100), // Stripe expects cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/${documentId}`,
  });

  // 3. Redirect user to Stripe's hosted checkout page
  redirect(session.url!);
}







































// app/actions/stripe.ts
// 'use server'

// import { prisma } from '@/lib/prisma' // Adjust path to your Prisma client instance
// import { redirect } from 'next/navigation'

// export async function createCheckoutSession(formData: FormData) {
//   const documentId = formData.get('documentId')?.toString()

//   if (!documentId) {
//     throw new Error('Missing document ID')
//   }

//   // Fetch price securely from Neon DB using Prisma
//   const doc = await prisma.document.findUnique({
//     where: { id: documentId },
//     select: { id: true, title: true, price: true },
//   })

//   if (!doc) {
//     throw new Error('Document not found')
//   }

//   // Here you would integrate your payment provider (e.g., Stripe) 
//   // using doc.price and doc.title, then redirect to their checkout URL.
//   // Example: redirect(stripeSession.url)

//   // For demonstration, we redirect back with query state or a mock success step
//   redirect(`/checkout/success?docId=${doc.id}&price=${doc.price}`)
// }
