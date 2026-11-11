// 

"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

interface BillingDashboardProps {
  user?: {
    id: string;
    email: string;
    subscriptionStatus?: string | null;
    stripePriceId?: string | null;
  };
}

export default function BillingDashboard({ user }: BillingDashboardProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const { data: session } = authClient.useSession();

  const isPro =
    user?.subscriptionStatus === "active" ||
    user?.subscriptionStatus === "trialing";

  // Handles both initiating a new checkout session AND opening the portal for active subscribers
  const handleBillingAction = async (priceId?: string) => {
    if (!session?.user?.id) {
      alert("Please log in to manage your billing.");
      return;
    }

    const actionType = isPro ? "portal" : "checkout";
    setLoading(priceId || "portal");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          action: actionType,
        }),
      });

      const text = await response.text();

      // Explicitly type 'data' so TypeScript recognizes 'url' and 'error'
      let data: { url?: string; error?: string } = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error("Malformed JSON response:", text);
          alert("Server returned an invalid format.");
          return;
        }
      }

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to initialize billing session.");
      }
    } catch (error) {
      console.error("Billing error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Billing & Plans
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your subscription plans and billing details securely through
          Stripe.
        </p>
      </div>

      {/* Current Subscription Status Banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Current Account Plan
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl font-bold text-gray-900">
              {isPro ? "Pro Plan" : "Free Plan"}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                isPro
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {user?.subscriptionStatus || "inactive"}
            </span>
          </div>
        </div>

        {isPro && (
          <button
            onClick={() => handleBillingAction()}
            disabled={loading !== null}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {loading === "portal"
              ? "Opening Portal..."
              : "Manage Billing & Invoices"}
          </button>
        )}
      </div>

      {/* Pricing Tiers */}
      {!isPro && (
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Starter</h3>
              <p className="text-sm text-gray-500 mt-1">
                Explore the platform features.
              </p>
              <div className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">
                  $0
                </span>
                <span className="ml-1 text-xl font-semibold text-gray-500">
                  /month
                </span>
              </div>
            </div>
            <button
              disabled
              className="mt-8 w-full bg-gray-100 text-gray-400 py-2 px-4 rounded-md text-sm font-medium cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-white border-2 border-indigo-600 rounded-xl p-6 flex flex-col justify-between shadow-md relative">
            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Popular
            </span>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Pro</h3>
              <p className="text-sm text-gray-500 mt-1">
                Unlock full access and power features.
              </p>
              <div className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">
                  $29
                </span>
                <span className="ml-1 text-xl font-semibold text-gray-500">
                  /month
                </span>
              </div>
            </div>
            <button
              onClick={() => handleBillingAction("price_YOUR_STRIPE_PRICE_ID")}
              disabled={loading !== null}
              className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading === "price_YOUR_STRIPE_PRICE_ID"
                ? "Redirecting..."
                : "Upgrade to Pro"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
