# Quick Legal Document Generator

מחולל מסמכים משפטיים מהיר, זול ומאובטח.

A fast, affordable, and secure solution for creating common legal documents.

## Features

- 📝 Dynamic form builder for different document types
- 👁️ Live preview of documents in real-time
- 📄 PDF export functionality
- 💳 Stripe Checkout integration (with demo mode)
- 💾 Local storage for draft saving
- 📱 Fully responsive design
- 🔒 Privacy-first (frontend only, no server storage)
- 🌐 Full RTL (Hebrew) support

## Document Types

1. **הסכם שכירות פשוט** (Simple Rental Agreement) - 29 ₪
2. **הסכם סודיות (NDA)** (Non-Disclosure Agreement) - 39 ₪
3. **חוזה עבודה עצמאי** (Freelance Work Contract) - 49 ₪
4. **טפסי הרשמה לחברות קטנות** (Small Company Registration Forms) - 59 ₪

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. (Optional) Set up Stripe for real payments:
```bash
# Create .env.local file
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

**Note:** The app works in demo mode without Stripe configuration.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Mode

If no Stripe key is configured, the app runs in demo mode:
- All features work except real payment processing
- You can test the entire flow without payment
- Perfect for portfolio/demo purposes

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- jsPDF
- Stripe Checkout (optional)

## Project Structure

See [SETUP.md](./SETUP.md) for detailed setup instructions and project structure.
