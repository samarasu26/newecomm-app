// app/documents/[id]/page.tsx

import prisma  from '@/lib/prisma'
import { notFound } from 'next/navigation'
import CheckoutForm from '@/components/web/CheckoutForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CheckoutPage({ params }: PageProps) {
  const { id : documentId } = await params

  // Fetch document details server-side from Neon DB
  const document = await prisma.document.findUnique({
    where: { id :documentId },
  })

  if (!document) {
    notFound()
  }

  return (
    <main className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-sm">
      
      <p className="text-gray-600 mb-6">Secure PDF Download</p>
      <div className="text-3xl font-semibold mb-6">
        ${(document.price/100).toFixed(2)}
      </div>
      <CheckoutForm documentId={document.id} price={document.price} />
    </main>
  )
}
