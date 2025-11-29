import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function generatePDF(content: string, filename: string = 'document.pdf'): Promise<void> {
  // Create hidden element with the document content (supports RTL + custom fonts rendered by browser)
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.left = '-9999px'
  container.style.top = '0'
  container.style.width = '595px' // A4 width in px @ 72dpi
  container.style.padding = '32px'
  container.style.background = '#ffffff'
  container.style.direction = 'rtl'
  container.style.fontFamily = '"Assistant", "Segoe UI", "Arial", sans-serif'
  container.style.fontSize = '14px'
  container.style.lineHeight = '1.8'
  container.style.whiteSpace = 'pre-wrap'
  container.style.color = '#111827'
  container.style.border = '1px solid #e5e7eb'
  container.textContent = content

  document.body.appendChild(container)

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgProps = {
      width: canvas.width,
      height: canvas.height,
    }
    const pdfWidth = pageWidth
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    let heightLeft = pdfHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST')
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST')
      heightLeft -= pageHeight
    }

    pdf.save(filename)
  } finally {
    document.body.removeChild(container)
  }
}

