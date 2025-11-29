import { DocumentData } from '@/types/document'

const STORAGE_KEY = 'legal_document_drafts'

export function saveDraft(data: DocumentData): void {
  if (typeof window === 'undefined') return
  
  const drafts = getDrafts()
  // Remove existing draft of the same type
  const filteredDrafts = drafts.filter(d => d.type !== data.type)
  // Add the new draft
  filteredDrafts.push(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDrafts))
}

export function getDrafts(): DocumentData[] {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function clearDrafts(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function getDraftByType(type: string): DocumentData | null {
  const drafts = getDrafts()
  // Get the most recent draft of this type (by createdAt)
  const draftsOfType = drafts.filter(d => d.type === type)
  if (draftsOfType.length === 0) return null
  
  // Sort by createdAt (newest first) and return the most recent
  draftsOfType.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return dateB - dateA
  })
  
  return draftsOfType[0]
}



