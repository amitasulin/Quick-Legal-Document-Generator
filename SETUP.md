# הוראות התקנה והפעלה

## התקנת תלויות

```bash
npm install
```

## הגדרת משתני סביבה

צור קובץ `.env.local` בתיקיית השורש:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

**הערה:** אם לא תגדיר מפתח Stripe, האפליקציה תעבוד במצב דמו (ללא תשלום אמיתי).

## הפעלת השרת המקומי

```bash
npm run dev
```

פתח [http://localhost:3000](http://localhost:3000) בדפדפן.

## בניית לפרודקשן

```bash
npm run build
npm start
```

## תכונות

### מצב דמו
אם לא הוגדר מפתח Stripe, האפליקציה תעבוד במצב דמו:
- ניתן ליצור מסמכים ללא תשלום אמיתי
- כל התכונות עובדות מלבד התשלום האמיתי

### תשלום אמיתי
להפעלת תשלום אמיתי דרך Stripe:
1. הירשם ל-[Stripe](https://stripe.com)
2. קבל מפתח Publishable Key מ-[Dashboard](https://dashboard.stripe.com/apikeys)
3. הוסף אותו ל-`.env.local`
4. **חשוב:** Payment Element דורש גם backend ליצירת Payment Intent. עבור יישום מלא, תצטרך:
   - API route ב-Next.js ליצירת Payment Intent
   - Secret Key של Stripe (רק בשרת)

## מבנה הפרויקט

```
├── app/              # Next.js App Router
│   ├── page.tsx     # דף בית
│   ├── form/        # דף יצירת מסמך
│   ├── checkout/    # דף תשלום
│   └── confirmation/# דף אישור והורדה
├── components/       # קומפוננטות React
├── lib/             # פונקציות עזר
│   ├── documentTemplates.ts  # תבניות מסמכים
│   ├── storage.ts            # LocalStorage
│   └── pdfGenerator.ts       # יצירת PDF
└── types/           # הגדרות TypeScript
```

## סוגי מסמכים

1. **הסכם שכירות** - 29 ₪
2. **הסכם סודיות (NDA)** - 39 ₪
3. **חוזה עבודה עצמאי** - 49 ₪
4. **טפסי הרשמה לחברות** - 59 ₪

## טכנולוגיות

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- jsPDF
- Stripe (אופציונלי)



