'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getDocumentTemplate } from '@/lib/documentTemplates'
import { DocumentType } from '@/types/document'
// Using sessionStorage instead of localStorage - data clears on tab close
import { generatePDF } from '@/lib/pdfGenerator'
import DocumentPreview from '@/components/DocumentPreview'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const documentType = searchParams.get('type') as DocumentType | null
  const [template, setTemplate] = useState<ReturnType<typeof getDocumentTemplate> | null>(null)
  const [documentData, setDocumentData] = useState<Record<string, any>>({})
  const [isDownloading, setIsDownloading] = useState(false)

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

    // Load data from sessionStorage
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(`document_${documentType}`);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          console.log('Loaded document data:', data);
          setDocumentData(data);
        } catch (e) {
          console.error('Error parsing stored data:', e);
          setDocumentData({});
        }
      } else {
        console.log('No stored data found for type:', documentType);
        setDocumentData({});
      }
    }
  }, [documentType, router])

  const handleDownload = async () => {
    if (!template || isDownloading || !documentType) return
    
    try {
      setIsDownloading(true)
      console.log('Generating PDF with data:', documentData)
      const documentContent = template.template(documentData)
      console.log('Document content:', documentContent)
      const filename = `${template.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
      await generatePDF(documentContent, filename)
      
      // Clear sessionStorage after successful download
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(`document_${documentType}`)
      }
    } finally {
      setIsDownloading(false)
    }
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">טוען...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">המסמך שלך מוכן!</h1>
          <p className="text-gray-600">המסמך הוכן בהצלחה. תוכל להוריד אותו כעת</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">{template.name}</h2>
            <DocumentPreview template={template} formData={documentData} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDownloading ? 'יוצר PDF...' : '📥 הורד PDF'}
          </button>
          
          <button
            onClick={() => router.push('/form')}
            className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg border-2 border-primary-600"
          >
            צור מסמך נוסף
          </button>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-800">
            💡 טיפ: שמור את המסמך במקום בטוח לאחר ההורדה.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">טוען...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}

