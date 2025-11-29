'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { documentTemplates, getDocumentTemplate } from '@/lib/documentTemplates'
import { DocumentType } from '@/types/document'
import DocumentPreview from '@/components/DocumentPreview'
// Removed draft storage - form will be clean after refresh

export default function FormPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<DocumentType | ''>('')
  const [formData, setFormData] = useState<Record<string, any>>({})
  const formRef = useRef<HTMLFormElement>(null)
  
  const template = selectedType ? getDocumentTemplate(selectedType) : null

  // Clear all sessionStorage when page loads to ensure clean form
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clear all document-related sessionStorage items
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('document_')) {
          sessionStorage.removeItem(key)
        }
      })
    }
  }, [])

  // Reset form data when type changes
  useEffect(() => {
    if (!selectedType) {
      setFormData({})
      return
    }
    setFormData({})
  }, [selectedType])

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!template || !formRef.current) return

    // Get all form data from inputs
    const formDataObj: Record<string, any> = {}
    template.fields.forEach(field => {
      const input = formRef.current?.querySelector(`[name="${field.id}"]`) as HTMLInputElement | HTMLTextAreaElement
      if (input) {
        formDataObj[field.id] = input.value
      }
    })

    // Validate required fields
    const missingFields = template.fields
      .filter(f => f.required)
      .filter(f => !formDataObj[f.id] || formDataObj[f.id].toString().trim() === '')
    
    if (missingFields.length > 0) {
      alert('אנא מלא את כל השדות הנדרשים')
      return
    }
    
    // Save data to sessionStorage temporarily for checkout/confirmation pages
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`document_${selectedType}`, JSON.stringify(formDataObj))
    }

    // Navigate to checkout
    router.push(`/checkout?type=${selectedType}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">צור מסמך משפטי</h1>
          <p className="text-gray-600">בחר סוג מסמך ומלא את הפרטים</p>
        </div>

        {/* Document Type Selection */}
        <div className="mb-8">
          <div className="block text-sm font-medium text-gray-700 mb-3">
            בחר סוג מסמך
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {documentTemplates.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => setSelectedType(doc.id)}
                className={`p-6 rounded-lg border-2 transition-all text-right ${
                  selectedType === doc.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-primary-300'
                }`}
              >
                <h3 className="font-semibold text-lg mb-2">{doc.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                <p className="text-primary-600 font-bold">{doc.price} ₪</p>
              </button>
            ))}
          </div>
        </div>

        {template && (
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Fields */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-6">פרטי המסמך</h2>
                  
                  <div className="space-y-4">
                    {template.fields.map((field) => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 mr-1">*</span>}
                        </label>
                        
                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.id}
                            name={field.id}
                            defaultValue={formData[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            rows={4}
                            required={field.required}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400 bg-white"
                          />
                        ) : (
                          <input
                            id={field.id}
                            name={field.id}
                            defaultValue={formData[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            type={field.type}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400 bg-white"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
                  >
                    המשך לתשלום
                  </button>
                </div>
              </div>

              {/* Live Preview */}
              <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
                <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                  <h2 className="text-2xl font-semibold mb-4">תצוגה מקדימה</h2>
                  <div className="flex-1 overflow-hidden">
                    <DocumentPreview template={template} formData={formData} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {!selectedType && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">אנא בחר סוג מסמך כדי להתחיל</p>
          </div>
        )}
      </div>
    </div>
  )
}
