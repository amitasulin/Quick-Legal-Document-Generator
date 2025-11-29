import { DocumentTemplate } from '@/types/document'

const safe = (value: any) =>
  value === undefined || value === null || value === 'undefined' ? '' : value

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'rental',
    name: 'הסכם שכירות פשוט',
    description: 'הסכם שכירות מקצועי לדירה או נכס',
    price: 29,
    fields: [
      { id: 'landlordName', label: 'שם המשכיר', type: 'text', required: true },
      { id: 'landlordId', label: 'תעודת זהות המשכיר', type: 'text', required: true },
      { id: 'tenantName', label: 'שם השוכר', type: 'text', required: true },
      { id: 'tenantId', label: 'תעודת זהות השוכר', type: 'text', required: true },
      { id: 'propertyAddress', label: 'כתובת הנכס', type: 'text', required: true },
      { id: 'rentAmount', label: 'סכום שכר דירה חודשי', type: 'number', required: true },
      { id: 'startDate', label: 'תאריך התחלה', type: 'date', required: true },
      { id: 'endDate', label: 'תאריך סיום', type: 'date', required: true },
      { id: 'deposit', label: 'פיקדון', type: 'number', required: false },
      { id: 'additionalTerms', label: 'תנאים נוספים', type: 'textarea', required: false },
    ],
    template: (data) => {
      const deposit = safe(data.deposit)
      const additional = safe(data.additionalTerms)

      return `
הסכם שכירות

בין: ${safe(data.landlordName)}, ת.ז. ${safe(data.landlordId)} (להלן: "המשכיר")
לבין: ${safe(data.tenantName)}, ת.ז. ${safe(data.tenantId)} (להלן: "השוכר")

הוסכם ביניהם כדלקמן:

1. מושא השכירות
המשכיר משכיר לשוכר את הנכס בכתובת: ${safe(data.propertyAddress)}

2. תקופת השכירות
תקופת השכירות מתחילה ב-${safe(data.startDate)} ומסתיימת ב-${safe(data.endDate)}

3. שכר דירה
שכר הדירה החודשי הינו ${safe(data.rentAmount)} ₪, ישולם עד היום ה-5 בכל חודש.

${deposit ? `4. פיקדון\nהשוכר ישלם פיקדון בסך ${deposit} ₪.` : ''}

${additional ? `5. תנאים נוספים\n${additional}` : ''}

חתימות:

_________________          _________________
${safe(data.landlordName)}        ${safe(data.tenantName)}
המשכיר                      השוכר

תאריך: ${new Date().toLocaleDateString('he-IL')}
      `.trim()
    },
  },
  {
    id: 'nda',
    name: 'הסכם סודיות (NDA)',
    description: 'הסכם סודיות להגנת מידע עסקי',
    price: 39,
    fields: [
      { id: 'disclosingParty', label: 'מגלה המידע', type: 'text', required: true },
      { id: 'receivingParty', label: 'מקבל המידע', type: 'text', required: true },
      { id: 'purpose', label: 'מטרת הגילוי', type: 'textarea', required: true },
      { id: 'duration', label: 'תקופת ההתחייבות (בחודשים)', type: 'number', required: true },
      { id: 'specificInfo', label: 'מידע ספציפי', type: 'textarea', required: false },
    ],
    template: (data) => {
      const info = safe(data.specificInfo)
      return `
הסכם סודיות

בין: ${safe(data.disclosingParty)} (להלן: "מגלה המידע")
לבין: ${safe(data.receivingParty)} (להלן: "מקבל המידע")

1. הגדרות
מטרת הסכם זה היא להגן על מידע סודי שיועבר בין הצדדים.

2. מטרת הגילוי
${safe(data.purpose)}

3. התחייבות לסודיות
מקבל המידע מתחייב לשמור בסודיות מוחלטת את כל המידע שיועבר לו על ידי מגלה המידע, ולא לגלותו או להעבירו לצדדים שלישיים ללא הסכמה מפורשת בכתב.

${info ? `4. מידע ספציפי\n${info}` : ''}

5. תקופת ההתחייבות
התחייבות זו תקפה למשך ${safe(data.duration)} חודשים ממועד חתימת הסכם זה.

6. הפרה
כל הפרה של הסכם זה תגרור אחריה פיצויים וסעדים משפטיים נוספים.

חתימות:

_________________          _________________
${safe(data.disclosingParty)}     ${safe(data.receivingParty)}
מגלה המידע                  מקבל המידע

תאריך: ${new Date().toLocaleDateString('he-IL')}
      `.trim()
    },
  },
  {
    id: 'freelance',
    name: 'חוזה עבודה עצמאי',
    description: 'חוזה עבודה לפרילנסרים ועצמאים',
    price: 49,
    fields: [
      { id: 'clientName', label: 'שם הלקוח', type: 'text', required: true },
      { id: 'clientId', label: 'תעודת זהות/ח.פ. הלקוח', type: 'text', required: true },
      { id: 'freelancerName', label: 'שם הפרילנסר', type: 'text', required: true },
      { id: 'freelancerId', label: 'תעודת זהות הפרילנסר', type: 'text', required: true },
      { id: 'projectDescription', label: 'תיאור הפרויקט', type: 'textarea', required: true },
      { id: 'paymentAmount', label: 'סכום התשלום', type: 'number', required: true },
      { id: 'paymentTerms', label: 'תנאי תשלום', type: 'textarea', required: true },
      { id: 'startDate', label: 'תאריך התחלה', type: 'date', required: true },
      { id: 'endDate', label: 'תאריך סיום משוער', type: 'date', required: false },
      { id: 'deliverables', label: 'תוצרים נדרשים', type: 'textarea', required: false },
    ],
    template: (data) => {
      const endDate = safe(data.endDate)
      const deliverables = safe(data.deliverables)

      return `
חוזה עבודה עצמאי

בין: ${safe(data.clientName)}, ת.ז./ח.פ. ${safe(data.clientId)} (להלן: "הלקוח")
לבין: ${safe(data.freelancerName)}, ת.ז. ${safe(data.freelancerId)} (להלן: "הפרילנסר")

1. נושא החוזה
הפרילנסר מתחייב לבצע עבודה עצמאית עבור הלקוח, כמתואר להלן.

2. תיאור הפרויקט
${safe(data.projectDescription)}

3. תאריכים
תאריך התחלה: ${safe(data.startDate)}
${endDate ? `תאריך סיום משוער: ${endDate}` : ''}

4. תשלום
סכום התשלום: ${safe(data.paymentAmount)} ₪
תנאי תשלום: ${safe(data.paymentTerms)}

${deliverables ? `5. תוצרים נדרשים\n${deliverables}` : ''}

6. מעמד עצמאי
הצדדים מסכימים כי הפרילנסר הינו עצמאי ואינו עובד שכיר של הלקוח.

7. זכויות יוצרים
כל הזכויות בתוצרים שייווצרו במסגרת עבודה זו יעברו ללקוח עם סיום התשלום המלא.

חתימות:

_________________          _________________
${safe(data.clientName)}          ${safe(data.freelancerName)}
הלקוח                       הפרילנסר

תאריך: ${new Date().toLocaleDateString('he-IL')}
      `.trim()
    },
  },
  {
    id: 'registration',
    name: 'טפסי הרשמה לחברות קטנות',
    description: 'טופס הרשמה לחברה קטנה',
    price: 59,
    fields: [
      { id: 'companyName', label: 'שם החברה', type: 'text', required: true },
      { id: 'companyNumber', label: 'מספר חברה', type: 'text', required: true },
      { id: 'directorName', label: 'שם המנהל', type: 'text', required: true },
      { id: 'directorId', label: 'תעודת זהות המנהל', type: 'text', required: true },
      { id: 'companyAddress', label: 'כתובת החברה', type: 'text', required: true },
      { id: 'businessActivity', label: 'תחום פעילות', type: 'textarea', required: true },
      { id: 'registrationDate', label: 'תאריך רישום', type: 'date', required: true },
      { id: 'shareCapital', label: 'הון מניות', type: 'number', required: false },
    ],
    template: (data) => {
      const capital = safe(data.shareCapital)

      return `
טופס הרשמה לחברה קטנה

פרטי החברה:
שם החברה: ${safe(data.companyName)}
מספר חברה: ${safe(data.companyNumber)}
כתובת החברה: ${safe(data.companyAddress)}
תאריך רישום: ${safe(data.registrationDate)}

פרטי המנהל:
שם: ${safe(data.directorName)}
תעודת זהות: ${safe(data.directorId)}

פרטים נוספים:
תחום פעילות: ${safe(data.businessActivity)}
${capital ? `הון מניות: ${capital} ₪` : ''}

הצהרה:
אני מצהיר כי כל הפרטים המופיעים בטופס זה נכונים ומדויקים.

חתימה:

_________________
${safe(data.directorName)}
מנהל החברה

תאריך: ${new Date().toLocaleDateString('he-IL')}
      `.trim()
    },
  },
  {
    id: 'sale',
    name: 'הסכם מכירה/קנייה',
    description: 'הסכם מכירה וקנייה של נכס או מוצר',
    price: 49,
    fields: [
      { id: 'sellerName', label: 'שם המוכר', type: 'text', required: true },
      { id: 'sellerId', label: 'תעודת זהות/ח.פ. המוכר', type: 'text', required: true },
      { id: 'buyerName', label: 'שם הקונה', type: 'text', required: true },
      { id: 'buyerId', label: 'תעודת זהות/ח.פ. הקונה', type: 'text', required: true },
      { id: 'itemDescription', label: 'תיאור הנכס/המוצר', type: 'textarea', required: true },
      { id: 'salePrice', label: 'מחיר המכירה', type: 'number', required: true },
      { id: 'paymentMethod', label: 'שיטת תשלום', type: 'textarea', required: true },
      { id: 'saleDate', label: 'תאריך המכירה', type: 'date', required: true },
      { id: 'deliveryDate', label: 'תאריך מסירה', type: 'date', required: false },
      { id: 'warranty', label: 'תקופת אחריות', type: 'text', required: false },
    ],
    template: (data) => {
      const delivery = safe(data.deliveryDate)
      const warranty = safe(data.warranty)

      return `
הסכם מכירה וקנייה

בין: ${safe(data.sellerName)}, ת.ז./ח.פ. ${safe(data.sellerId)} (להלן: "המוכר")
לבין: ${safe(data.buyerName)}, ת.ז./ח.פ. ${safe(data.buyerId)} (להלן: "הקונה")

הוסכם ביניהם כדלקמן:

1. מושא המכירה
${safe(data.itemDescription)}

2. מחיר המכירה
מחיר המכירה הינו ${safe(data.salePrice)} ₪.

3. שיטת תשלום
${safe(data.paymentMethod)}

4. תאריכים
תאריך המכירה: ${safe(data.saleDate)}
${delivery ? `תאריך מסירה: ${delivery}` : ''}

${warranty ? `5. אחריות\nתקופת אחריות: ${warranty}` : ''}

6. העברת בעלות
המוכר מתחייב להעביר את הבעלות על הנכס/המוצר לקונה במועד המסירה.

חתימות:

_________________          _________________
${safe(data.sellerName)}        ${safe(data.buyerName)}
המוכר                        הקונה

תאריך: ${new Date().toLocaleDateString('he-IL')}
      `.trim()
    },
  },
  {
    id: 'partnership',
    name: 'הסכם שותפות',
    description: 'הסכם שותפות עסקית בין שני צדדים',
    price: 69,
    fields: [
      { id: 'partner1Name', label: 'שם השותף הראשון', type: 'text', required: true },
      { id: 'partner1Id', label: 'תעודת זהות/ח.פ. השותף הראשון', type: 'text', required: true },
      { id: 'partner2Name', label: 'שם השותף השני', type: 'text', required: true },
      { id: 'partner2Id', label: 'תעודת זהות/ח.פ. השותף השני', type: 'text', required: true },
      { id: 'businessName', label: 'שם העסק/השותפות', type: 'text', required: true },
      { id: 'businessActivity', label: 'תחום פעילות', type: 'textarea', required: true },
      { id: 'partnershipShare1', label: 'אחוז שותפות - שותף ראשון', type: 'number', required: true },
      { id: 'partnershipShare2', label: 'אחוז שותפות - שותף שני', type: 'number', required: true },
      { id: 'startDate', label: 'תאריך התחלה', type: 'date', required: true },
      { id: 'capital', label: 'הון התחלתי', type: 'number', required: false },
    ],
    template: (data) => {
      const capital = safe(data.capital)

      return `
הסכם שותפות

בין: ${safe(data.partner1Name)}, ת.ז./ח.פ. ${safe(data.partner1Id)} (להלן: "השותף הראשון")
לבין: ${safe(data.partner2Name)}, ת.ז./ח.פ. ${safe(data.partner2Id)} (להלן: "השותף השני")

הוסכם ביניהם כדלקמן:

1. שם השותפות
שם העסק/השותפות: ${safe(data.businessName)}

2. תחום פעילות
${safe(data.businessActivity)}

3. חלוקת שותפות
השותף הראשון מחזיק ב-${safe(data.partnershipShare1)}% מהשותפות.
השותף השני מחזיק ב-${safe(data.partnershipShare2)}% מהשותפות.

4. תאריך התחלה
תאריך התחלת השותפות: ${safe(data.startDate)}

${capital ? `5. הון התחלתי\nהון התחלתי: ${capital} ₪` : ''}

6. חלוקת רווחים והפסדים
הרווחים וההפסדים יחולקו בין השותפים בהתאם לאחוזי השותפות שלהם.

7. ניהול השותפות
השותפים ינהלו את השותפות במשותף ויקבלו החלטות בהסכמה.

חתימות:

_________________          _________________
${safe(data.partner1Name)}        ${safe(data.partner2Name)}
השותף הראשון                  השותף השני

תאריך: ${new Date().toLocaleDateString('he-IL')}
      `.trim()
    },
  },
  {
    id: 'service',
    name: 'הסכם שירותים',
    description: 'הסכם מתן שירותים בין ספק ללקוח',
    price: 49,
    fields: [
      { id: 'providerName', label: 'שם ספק השירותים', type: 'text', required: true },
      { id: 'providerId', label: 'תעודת זהות/ח.פ. הספק', type: 'text', required: true },
      { id: 'clientName', label: 'שם הלקוח', type: 'text', required: true },
      { id: 'clientId', label: 'תעודת זהות/ח.פ. הלקוח', type: 'text', required: true },
      { id: 'serviceDescription', label: 'תיאור השירות', type: 'textarea', required: true },
      { id: 'servicePrice', label: 'מחיר השירות', type: 'number', required: true },
      { id: 'serviceDuration', label: 'משך השירות', type: 'text', required: true },
      { id: 'startDate', label: 'תאריך התחלה', type: 'date', required: true },
      { id: 'paymentTerms', label: 'תנאי תשלום', type: 'textarea', required: true },
      { id: 'cancellation', label: 'תנאי ביטול', type: 'textarea', required: false },
    ],
    template: (data) => {
      const cancellation = safe(data.cancellation)

      return `
הסכם שירותים

בין: ${safe(data.providerName)}, ת.ז./ח.פ. ${safe(data.providerId)} (להלן: "ספק השירותים")
לבין: ${safe(data.clientName)}, ת.ז./ח.פ. ${safe(data.clientId)} (להלן: "הלקוח")

הוסכם ביניהם כדלקמן:

1. נושא ההסכם
ספק השירותים מתחייב לספק ללקוח את השירותים המפורטים להלן.

2. תיאור השירות
${safe(data.serviceDescription)}

3. מחיר השירות
מחיר השירות הינו ${safe(data.servicePrice)} ₪.

4. משך השירות
משך השירות: ${safe(data.serviceDuration)}

5. תאריך התחלה
תאריך התחלת השירות: ${safe(data.startDate)}

6. תנאי תשלום
${safe(data.paymentTerms)}

${cancellation ? `7. תנאי ביטול\n${cancellation}` : ''}

8. אחריות
ספק השירותים מתחייב לספק את השירותים ברמה מקצועית ובהתאם להסכם זה.

חתימות:

_________________          _________________
${safe(data.providerName)}        ${safe(data.clientName)}
ספק השירותים                  הלקוח

תאריך: ${new Date().toLocaleDateString('he-IL')}
      `.trim()
    },
  },
  {
    id: 'loan',
    name: 'הסכם הלוואה',
    description: 'הסכם הלוואה בין מלווה ללווה',
    price: 59,
    fields: [
      { id: 'lenderName', label: 'שם המלווה', type: 'text', required: true },
      { id: 'lenderId', label: 'תעודת זהות/ח.פ. המלווה', type: 'text', required: true },
      { id: 'borrowerName', label: 'שם הלווה', type: 'text', required: true },
      { id: 'borrowerId', label: 'תעודת זהות/ח.פ. הלווה', type: 'text', required: true },
      { id: 'loanAmount', label: 'סכום ההלוואה', type: 'number', required: true },
      { id: 'interestRate', label: 'אחוז ריבית (אם יש)', type: 'number', required: false },
      { id: 'repaymentPeriod', label: 'תקופת החזר', type: 'text', required: true },
      { id: 'repaymentMethod', label: 'שיטת החזר', type: 'textarea', required: true },
      { id: 'loanDate', label: 'תאריך מתן ההלוואה', type: 'date', required: true },
      { id: 'collateral', label: 'ערבות/ביטחונות', type: 'textarea', required: false },
    ],
    template: (data) => {
      const interest = safe(data.interestRate)
      const collateral = safe(data.collateral)

      return `
הסכם הלוואה

בין: ${safe(data.lenderName)}, ת.ז./ח.פ. ${safe(data.lenderId)} (להלן: "המלווה")
לבין: ${safe(data.borrowerName)}, ת.ז./ח.פ. ${safe(data.borrowerId)} (להלן: "הלווה")

הוסכם ביניהם כדלקמן:

1. סכום ההלוואה
המלווה מסכים להלוות ללווה סכום של ${safe(data.loanAmount)} ₪.

2. תאריך מתן ההלוואה
תאריך מתן ההלוואה: ${safe(data.loanDate)}

${interest ? `3. ריבית\nאחוז הריבית: ${interest}%` : '3. ריבית\nההלוואה ללא ריבית'}

4. תקופת החזר
תקופת החזר ההלוואה: ${safe(data.repaymentPeriod)}

5. שיטת החזר
${safe(data.repaymentMethod)}

${collateral ? `6. ערבות וביטחונות\n${collateral}` : ''}

7. התחייבות הלווה
הלווה מתחייב להחזיר את ההלוואה בהתאם לתנאים המפורטים בהסכם זה.

חתימות:

_________________          _________________
${safe(data.lenderName)}        ${safe(data.borrowerName)}
המלווה                        הלווה

תאריך: ${new Date().toLocaleDateString('he-IL')}
      `.trim()
    },
  },
  {
    id: 'consulting',
    name: 'הסכם ייעוץ',
    description: 'הסכם מתן שירותי ייעוץ מקצועי',
    price: 59,
    fields: [
      { id: 'consultantName', label: 'שם היועץ', type: 'text', required: true },
      { id: 'consultantId', label: 'תעודת זהות/ח.פ. היועץ', type: 'text', required: true },
      { id: 'clientName', label: 'שם הלקוח', type: 'text', required: true },
      { id: 'clientId', label: 'תעודת זהות/ח.פ. הלקוח', type: 'text', required: true },
      { id: 'consultingType', label: 'סוג הייעוץ', type: 'text', required: true },
      { id: 'consultingDescription', label: 'תיאור שירותי הייעוץ', type: 'textarea', required: true },
      { id: 'consultingFee', label: 'שכר הייעוץ', type: 'number', required: true },
      { id: 'consultingDuration', label: 'משך תקופת הייעוץ', type: 'text', required: true },
      { id: 'startDate', label: 'תאריך התחלה', type: 'date', required: true },
      { id: 'paymentSchedule', label: 'לוח תשלומים', type: 'textarea', required: true },
    ],
    template: (data) => {
      return `
הסכם ייעוץ

בין: ${safe(data.consultantName)}, ת.ז./ח.פ. ${safe(data.consultantId)} (להלן: "היועץ")
לבין: ${safe(data.clientName)}, ת.ז./ח.פ. ${safe(data.clientId)} (להלן: "הלקוח")

הוסכם ביניהם כדלקמן:

1. נושא ההסכם
היועץ מתחייב לספק ללקוח שירותי ייעוץ מקצועי בתחום: ${safe(data.consultingType)}

2. תיאור שירותי הייעוץ
${safe(data.consultingDescription)}

3. שכר הייעוץ
שכר הייעוץ הינו ${safe(data.consultingFee)} ₪.

4. משך תקופת הייעוץ
משך תקופת הייעוץ: ${safe(data.consultingDuration)}

5. תאריך התחלה
תאריך התחלת שירותי הייעוץ: ${safe(data.startDate)}

6. לוח תשלומים
${safe(data.paymentSchedule)}

7. סודיות
היועץ מתחייב לשמור על סודיות כל המידע שיועבר אליו במסגרת שירותי הייעוץ.

8. תוצרי הייעוץ
כל התוצרים שייווצרו במסגרת שירותי הייעוץ יהיו בבעלות הלקוח.

חתימות:

_________________          _________________
${safe(data.consultantName)}        ${safe(data.clientName)}
היועץ                        הלקוח

תאריך: ${new Date().toLocaleDateString('he-IL')}
      `.trim()
    },
  },
]

export function getDocumentTemplate(type: string): DocumentTemplate | undefined {
  return documentTemplates.find(t => t.id === type)
}



