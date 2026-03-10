
# Spendees Tracker (React + Vite + Firebase + Bootstrap)

Elegant, fast expense tracker with multi-user login, categories, rich filters, exports (Excel & PDF), charts (no external chart lib), and a To‑Do lists page. Built with React + Vite and styled with Bootstrap/React‑Bootstrap.

## ✨ Features
- Email/password authentication (Firebase Auth)
- Per-user data isolation (Firestore): spend entries, custom categories, todo lists
- Add daily spends (date defaults to **today**), category, amount, amount category, status, description, notes
- Customize categories (add, rename, delete) for spend/amount/status
- Filter by date range and by **multiple** categories/statuses
- Summaries: today, week, month, total + quick status totals
- Simple responsive **SVG line chart** (no extra chart library)
- Export filtered results to **Excel (.xlsx)** and **PDF**
- To‑Do lists: multiple lists; items with checkbox or note-only
- Elegant Bootstrap UI with smooth hover/entrance animations

---

## 1) Prerequisites
- Node.js 18 or later & npm
- A free Firebase project (Auth + Firestore)

## 2) Local setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create `.env` file** in the project root with your Firebase keys (from Firebase console):
   ```bash
   VITE_FIREBASE_API_KEY=YOUR_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=XXXX
   VITE_FIREBASE_APP_ID=1:XXXX:web:XXXX
   ```
3. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open the printed localhost URL.

## 3) Firebase configuration (step-by-step)
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a project → Build → Authentication → **Sign-in method** → enable **Email/Password**
3. Build → **Firestore Database** → Create database (Start in production mode) → choose location
4. Project settings → **General** → Your apps → **Add app** → Web → register → copy config → paste in `.env`
5. (Optional) Security rules – minimal rules that restrict data by user:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

## 4) Deploy to Vercel (step-by-step)
1. Create a free account at [https://vercel.com](https://vercel.com) and connect your GitHub
2. Push this project to a GitHub repository
3. New Project → Import your repo
4. **Framework Preset**: *Vite*
5. **Environment Variables**: add the same keys from `.env` (prefix must stay `VITE_...`)
6. Deploy → after build completes, open the URL. You should see the **Login** page by default.

## 5) Usage tips
- First time you open **Spendees** page, default categories are seeded for your account.
- Use **Customization** to add/rename/delete categories.
- Filters support multiple select; export buttons export the currently filtered list.

## 6) Tech choices
- UI: Bootstrap 5 + React‑Bootstrap
- Auth & DB: Firebase (no custom backend to manage)
- Chart: a lightweight custom SVG chart to avoid extra libs
- Exports: `xlsx`, `jspdf`, `jspdf-autotable`

## 7) FAQ
- **Can multiple users use it?** Yes. Each user has a separate login; Firestore rules isolate data.
- **Can I change currency?** Change the formatter in `src/components/StatsCard.jsx` (and optionally list/exports) to your preferred currency code.
- **Can I edit an entry?** Yes. Click **Edit** on a row.
- **I get permission errors**: Ensure you are logged in and the security rules are published.

---
Made with ♥ to track your spends.
