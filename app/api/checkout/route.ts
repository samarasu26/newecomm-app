// 

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@/src/generated/prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
// const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. Authenticate the User using Better-Auth
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId, action } = await req.json();
    const userId = session.user.id;

    // Fetch the user from the database to look up existing Stripe information
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // ==========================================
    // ACTION 1: Manage Existing Subscription Profile
    // ==========================================
    if (action === "portal") {
      if (!user.stripeCustomerId) {
        return NextResponse.json(
          { error: "No billing history found for this user" },
          { status: 400 }
        );
      }

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${domain}/billing`,
      });

      return NextResponse.json({ url: portalSession.url });
    }

    // ==========================================
    // ACTION 2: Create a New Subscription Checkout
    // ==========================================
    if (action === "checkout") {
      if (!priceId) {
        return NextResponse.json(
          { error: "Missing Price ID for checkout" },
          { status: 400 }
        );
      }

      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { userId: user.id },
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
        customerId = customer.id;
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${domain}/billing?success=true`,
        cancel_url: `${domain}/billing?canceled=true`,
        metadata: {
          userId: user.id,
        },
      });

      return NextResponse.json({ url: checkoutSession.url });
    }

    // Fixed: Removed 'new' keyword before NextResponse.json
    return NextResponse.json(
      { error: "Invalid billing action type" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("❌ Stripe session creation error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
