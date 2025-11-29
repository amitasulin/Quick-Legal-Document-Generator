import Link from 'next/link'
import { documentTemplates } from '@/lib/documentTemplates'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 md:py-6 backdrop-blur-sm bg-white/80 sticky top-0 z-50 border-b border-gray-200/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            📄 Quick Legal
          </Link>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Link
              href="/about"
              className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium text-center rounded-lg hover:bg-primary-50"
            >
              אודות
            </Link>
            <Link 
              href="/form"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-lg hover:from-primary-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
            >
              צור מסמך עכשיו
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="text-center max-w-5xl mx-auto px-2 sm:px-4">
          {/* Hero Title */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              יצירת מסמכים משפטיים
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                בלחיצה אחת
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-700 mb-4 leading-relaxed font-light">
              פתרון מהיר, זול ומאובטח
            </p>
            <p className="text-lg text-gray-600 mb-8">
              ללא עורך דין • ללא המתנה • ללא סיבוכים
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-20">
            <Link
              href="/form"
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-lg md:text-xl rounded-xl hover:from-primary-700 hover:to-indigo-700 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 font-semibold"
            >
              🚀 צור מסמך עכשיו
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-primary-600 text-lg md:text-xl rounded-xl hover:bg-gray-50 transition-all shadow-xl border-2 border-primary-600 font-semibold hover:scale-105"
            >
              📖 למידע נוסף
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 md:mb-20 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl font-bold text-primary-600 mb-2">{documentTemplates.length}+</div>
              <div className="text-gray-600">סוגי מסמכים</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl font-bold text-indigo-600 mb-2">דקות</div>
              <div className="text-gray-600">יצירה מהירה</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">מאובטח</div>
            </div>
          </div>

          {/* Features Grid */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20 px-1">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200/50 hover:scale-105 hover:border-primary-300">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">מהיר</h3>
              <p className="text-gray-600 leading-relaxed">יצירת מסמך תוך דקות ספורות בלבד</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200/50 hover:scale-105 hover:border-primary-300">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">זול</h3>
              <p className="text-gray-600 leading-relaxed">תשלום הוגן לכל מסמך - החל מ-29 ₪</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200/50 hover:scale-105 hover:border-primary-300">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">מאובטח</h3>
              <p className="text-gray-600 leading-relaxed">הגנה מלאה על פרטיותך - ללא שמירה בשרתים</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200/50 hover:scale-105 hover:border-primary-300">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">נגיש</h3>
              <p className="text-gray-600 leading-relaxed">עובד על כל מכשיר - מחשב, טאבלט או סמארטפון</p>
            </div>
          </div>

          {/* Document Types */}
          <div className="mt-16 md:mt-20">
            <div className="mb-8 md:mb-12 px-2">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                סוגי מסמכים זמינים
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                בחר מתוך מגוון רחב של מסמכים משפטיים מקצועיים
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {documentTemplates.map((doc, index) => (
                <Link
                  key={doc.id}
                  href="/form"
                  className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200/50 hover:border-primary-400 hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      📄
                    </div>
                    <span className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      {doc.price} ₪
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-right text-gray-900 group-hover:text-primary-600 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 text-right leading-relaxed">
                    {doc.description}
                  </p>
                  <div className="flex items-center justify-end text-primary-600 font-semibold text-sm group-hover:translate-x-[-4px] transition-transform">
                    התחל עכשיו ←
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 md:mt-20 bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">מוכן להתחיל?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              צור את המסמך המשפטי הראשון שלך תוך דקות
            </p>
            <Link
              href="/form"
              className="inline-block px-8 md:px-10 py-4 md:py-5 bg-white text-primary-600 text-lg md:text-xl rounded-xl hover:bg-gray-100 transition-all shadow-2xl font-bold hover:scale-105"
            >
              התחל עכשיו - זה בחינם לנסות
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-20 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="text-center text-gray-600">
          <p className="text-lg mb-4">© 2024 Quick Legal Document Generator. כל הזכויות שמורות.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/" className="hover:text-primary-600 transition-colors font-medium">
              בית
            </Link>
            <Link href="/about" className="hover:text-primary-600 transition-colors font-medium">
              אודות
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
