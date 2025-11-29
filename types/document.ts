export type DocumentType = 
  | 'rental'
  | 'nda'
  | 'freelance'
  | 'registration'
  | 'sale'
  | 'partnership'
  | 'service'
  | 'loan'
  | 'consulting'

export interface DocumentField {
  id: string
  label: string
  type: 'text' | 'date' | 'textarea' | 'number' | 'email'
  required?: boolean
  placeholder?: string
}

export interface DocumentTemplate {
  id: DocumentType
  name: string
  description: string
  price: number
  fields: DocumentField[]
  template: (data: Record<string, any>) => string
}

export interface DocumentData {
  type: DocumentType
  data: Record<string, any>
  createdAt: string
}



