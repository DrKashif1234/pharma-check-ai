# PharmaCheck AI — Drug Interaction Checker & Pharmacology Learning Tool

**PharmaCheck AI** is a modern, responsive educational web application designed for pharmacy students, healthcare learners, and clinicians. It allows users to search medications, check multi-drug interactions (2, 3, 4+ drugs), examine pharmacological mechanisms, review clinical monitoring considerations, and generate AI-powered explanations.

---

## Key Features

1. **Multi-Drug Interaction Checker**:
   - Check interactions between 2, 3, 4, or more drugs simultaneously.
   - Symmetrical order-independent matching (Drug A + Drug B = Drug B + Drug A).
   - Multi-drug pairwise combination analysis.

2. **Autocomplete Drug Search**:
   - Search by generic name, brand names, or drug class.
   - Fast, case-insensitive autocomplete suggestions.

3. **Clinical Interaction Details**:
   - **Severity Indicators**: Major, Moderate, Minor, No significant interaction identified.
   - **Interaction Types**: Pharmacokinetic, Pharmacodynamic, Enzyme-Based, Other.
   - **Mechanism of Action**: Detailed pharmacological breakdown (e.g. CYP3A4 inhibition, additive COX blockade, aldosterone antagonism).
   - **Clinical Significance, Possible Effects, & Monitoring Guidelines**.
   - **Source References**: Cited clinical guidelines, Stockley's, FDA communications, and ACC/AHA guidelines.

4. **AI-Powered Student Explanation ("Explain with AI")**:
   - AI explanations powered by Gemini 3.6 Flash via a secure server-side API route (`/api/explain`).
   - Uses verified clinical database facts as primary context.
   - API key remains secure and is **never** exposed to client-side code.

5. **Student Learning & Study Mode**:
   - Toggle "Student Mode" for additional pharmacology notes and Black Box exam tips.
   - Interactive multiple-choice pharmacology quiz mode with score tracking and rationales.
   - High-yield CYP450 mnemonics ("SICKFACES" inhibitors, "PS-PORCS" inducers) and Narrow Therapeutic Index (NTI) cheatsheets.

6. **Favorites & History**:
   - Bookmark commonly studied combinations (⭐) stored locally via `localStorage`.
   - Local interaction check history with timestamps and delete options.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React icons.
- **Backend**: Express server (`server.ts`) with Vite middleware in development.
- **AI Integration**: `@google/genai` TypeScript SDK (server-side Gemini 3.6 Flash).
- **Storage**: Client-side `localStorage` for privacy, no user account or database required.

---

## Local Development Setup

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/pharmacheck-ai.git
   cd pharmacheck-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## Deployment Instructions

PharmaCheck AI is fully compatible with GitHub-based automated deployments to **Vercel** or **Netlify**.

### 1. Deploying to Vercel (GitHub → Vercel)

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of PharmaCheck AI"
   git remote add origin https://github.com/your-username/pharmacheck-ai.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"** -> **"Import Git Repository"**.
3. Select your `pharmacheck-ai` repository.
4. Framework Preset: **Vite** or **Node.js**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Under **Environment Variables**, add:
   - `GEMINI_API_KEY` = `your_gemini_api_key_value`
8. Click **Deploy**. Vercel will automatically build and host the application!

---

### 2. Deploying to Netlify (GitHub → Netlify)

1. Push code to GitHub.
2. Log in to [Netlify](https://netlify.com) and click **"Add new site"** -> **"Import an existing project"**.
3. Connect your GitHub account and select `pharmacheck-ai`.
4. Build Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Under **Environment variables**, set `GEMINI_API_KEY`.
6. Click **Deploy Site**.

---

## Medical Disclaimer

This application is intended strictly for **educational and informational purposes only**. It is designed as a study aid for pharmacy students and healthcare learners. It is not a substitute for professional medical advice, diagnosis, clinical judgment, or consultation with a qualified pharmacist or physician. Drug interaction information may evolve and should always be verified against current, authoritative clinical references before making patient-specific therapeutic decisions.
