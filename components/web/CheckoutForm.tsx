'use client'

import { useTransition } from 'react'
import { createCheckoutSession } from '@/app/stripe'

interface CheckoutFormProps {
  documentId: string
  price: number
}

export default function CheckoutForm({ documentId, price }: CheckoutFormProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={() => {
        startTransition(() => {
          createCheckoutSession()
        })
      }}
    >
      <input type="hidden" name="documentId" value={documentId} />
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending ? 'Processing...' : `Pay $${price/100}`}
      </button>
    </form>
  )
}
