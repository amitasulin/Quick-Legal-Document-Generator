'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getDocumentTemplate } from '@/lib/documentTemplates'
import { DocumentType } from '@/types/document'
import { getDraftByType } from '@/lib/storage'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Initialize Stripe (you'll need to add your publishable key)
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const isDemoMode = !stripeKey || stripeKey === 'pk_test_placeholder'
const stripePromise = stripeKey && !isDemoMode ? loadStripe(stripeKey) : null

function DemoCheckoutForm({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      onSuccess()
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-yellow-800 text-sm">
          ⚠️ מצב דמו: התשלום מדומה. להפעלת תשלום אמיתי, הגדר מפתח Stripe ב-.env.local
        </p>
      </div>
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'מדמה תשלום...' : `דמו: המשך (${amount} ₪)`}
      </button>
    </form>
  )
}

function CheckoutForm({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)
    setError(null)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message || 'שגיאה בתשלום')
        setIsProcessing(false)
        return
      }

      // Create payment intent (in a real app, this would be done on your backend)
      // For demo purposes, we'll simulate a successful payment
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
        },
        redirect: 'if_required',
      })

      if (paymentError) {
        setError(paymentError.message || 'שגיאה בתשלום')
      } else {
        onSuccess()
      }
    } catch (err) {
      setError('אירעה שגיאה. אנא נסה שוב.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'מעבד תשלום...' : `שלם ${amount} ₪`}
      </button>
    </form>
  )
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const documentType = searchParams.get('type') as DocumentType | null
  const [template, setTemplate] = useState<ReturnType<typeof getDocumentTemplate> | null>(null)
  const [documentData, setDocumentData] = useState<Record<string, any>>({})
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    if (!documentType) {
      router.push('/form')
      return
    }

    const docTemplate = getDocumentTemplate(documentType)
    if (!docTemplate) {
      router.push('/form')
      return
    }

    setTemplate(docTemplate)

    // Load draft data
    const draft = getDraftByType(documentType)
    if (draft) {
      setDocumentData(draft.data)
    }
  }, [documentType, router])

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">טוען...</p>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">התשלום בוצע בהצלחה!</h1>
            <p className="text-gray-600 mb-8">המסמך שלך מוכן להורדה</p>
            <button
              onClick={() => router.push(`/confirmation?type=${documentType}`)}
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
            >
              הורד PDF
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-primary-600 hover:text-primary-700 mb-4"
          >
            ← חזרה
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">תשלום</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">סיכום הזמנה</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">סה"כ</span>
                  <span className="text-2xl font-bold text-primary-600">{template.price} ₪</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p>✓ תשלום מאובטח דרך Stripe</p>
              <p>✓ המסמך יישלח מיד לאחר התשלום</p>
              <p>✓ אין שמירת מידע אישי בשרתים</p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">פרטי תשלום</h2>
            
            {isDemoMode ? (
              <DemoCheckoutForm
                amount={template.price}
                onSuccess={() => setPaymentSuccess(true)}
              />
            ) : stripePromise ? (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: 'payment',
                  amount: template.price * 100, // Convert to cents
                  currency: 'ils',
                  locale: 'he',
                }}
              >
                <CheckoutForm amount={template.price} onSuccess={() => setPaymentSuccess(true)} />
              </Elements>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">טוען...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">טוען...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}

