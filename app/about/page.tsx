import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            📄 Quick Legal
          </Link>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              בית
            </Link>
            <Link
              href="/form"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              צור מסמך עכשיו
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">אודות Quick Legal</h1>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">מי אנחנו?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Quick Legal הוא פלטפורמה חדשנית ליצירת מסמכים משפטיים מקצועיים תוך דקות ספורות.
              המטרה שלנו היא להפוך את הגישה למסמכים משפטיים לזמינה, מהירה ונוחה לכל אחד.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              אנחנו מאמינים שכל אחד צריך גישה למסמכים משפטיים איכותיים, ללא הצורך בעורך דין יקר
              או בתהליכים מסובכים. עם Quick Legal, אתה יכול ליצור מסמכים מקצועיים בלחיצה אחת.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">איך זה עובד?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">בחר סוג מסמך</h3>
                  <p className="text-gray-700">
                    בחר מתוך מגוון רחב של מסמכים משפטיים מקצועיים - מהסכמי שכירות ועד חוזי עבודה.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">מלא את הפרטים</h3>
                  <p className="text-gray-700">
                    מלא את הטופס עם הפרטים הרלוונטיים. תוכל לראות תצוגה מקדימה של המסמך בזמן אמת.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">שלם והורד</h3>
                  <p className="text-gray-700">
                    שלם דרך Stripe (תשלום מאובטח) והורד את המסמך שלך כ-PDF מוכן לשימוש.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">למה Quick Legal?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">⚡ מהיר</h3>
                <p className="text-gray-700">
                  יצירת מסמך תוך דקות ספורות, ללא המתנה או תהליכים מסובכים.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">💰 זול</h3>
                <p className="text-gray-700">
                  תשלום הוגן לכל מסמך - הרבה יותר זול מעורך דין מסורתי.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🔒 מאובטח</h3>
                <p className="text-gray-700">
                  כל המידע נשמר מקומית בדפדפן שלך. אין שמירת מידע אישי בשרתים.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">📱 נגיש</h3>
                <p className="text-gray-700">
                  עובד על כל מכשיר - מחשב, טאבלט או סמארטפון. תמיד זמין.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">סוגי המסמכים שלנו</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              אנחנו מציעים מגוון רחב של מסמכים משפטיים מקצועיים:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
              <li>הסכמי שכירות - למשכירים ושוכרים</li>
              <li>הסכמי סודיות (NDA) - להגנת מידע עסקי</li>
              <li>חוזי עבודה עצמאית - לפרילנסרים</li>
              <li>הסכמי מכירה וקנייה - לעסקאות נכסים</li>
              <li>הסכמי שותפות - לשותפויות עסקיות</li>
              <li>הסכמי שירותים - לספקי שירותים</li>
              <li>הסכמי הלוואה - להלוואות פרטיות</li>
              <li>הסכמי ייעוץ - ליועצים מקצועיים</li>
              <li>טפסי הרשמה לחברות - לחברות קטנות</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">הצהרת אחריות</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              המסמכים שנוצרים דרך Quick Legal הם תבניות כלליות ומיועדים לשימוש בסיסי.
              למקרים מורכבים או בעלי חשיבות משפטית גבוהה, מומלץ להתייעץ עם עורך דין מקצועי.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Quick Legal אינו מהווה תחליף לייעוץ משפטי מקצועי ואינו אחראי לכל נזק שייגרם
              כתוצאה משימוש במסמכים שנוצרו דרך הפלטפורמה.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/form"
              className="inline-block px-8 py-4 bg-primary-600 text-white text-lg rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-lg"
            >
              התחל ליצור מסמך עכשיו
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>© 2024 Quick Legal Document Generator. כל הזכויות שמורות.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              בית
            </Link>
            <Link href="/about" className="hover:text-primary-600 transition-colors">
              אודות
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

