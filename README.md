# PharmaCheck AI — Drug Interaction Checker & Pharmacology Learning Tool

[![Live Site](https://img.shields.io/badge/Live%20Demo-pharma--check--ai--ten.vercel.app-blue?style=for-the-badge&logo=vercel)](https://pharma-check-ai-ten.vercel.app/)

**Live Application**: [https://pharma-check-ai-ten.vercel.app/](https://pharma-check-ai-ten.vercel.app/)

**PharmaCheck AI** is an open-access, educational web platform designed for pharmacy students, medical learners, and healthcare professionals. It offers multi-drug interaction checking, pairwise mechanism breakdowns, AI-assisted explanations powered by Google Gemini, and interactive pharmacology study tools.

---

## 🎯 The Problem Solved

### The Problem
1. **Polypharmacy Risks & Complex Interactions**: Patients often take multiple co-prescribed medications (3, 4, or more drugs). Evaluating all potential pairwise interactions manually is time-consuming, and traditional tools are often locked behind expensive paywalls or dense commercial software.
2. **Medical & Pharmacy Student Learning Curve**: Pharmacology students struggle to master intricate pharmacokinetic pathways (e.g., CYP450 enzyme inhibition and induction) and pharmacodynamic interactions through raw textbook tables alone.
3. **Lack of Instant, Plain-English Explanations**: Standard drug lookup tools provide dry chemical descriptions without offering simple, step-by-step rationales, clinical board exam takeaways, or practical case scenarios.
4. **Privacy & Accessibility Barriers**: Healthcare learners need an instant, open tool that requires no invasive registration, account setup, or data tracking.

### The Solution Provided by PharmaCheck AI
- **Instant Multi-Drug Pairwise Analysis**: Evaluates combinations of 2, 3, 4, or more drugs simultaneously and breaks down all pairwise combinations with color-coded severity levels (Major, Moderate, Minor, None).
- **AI Student Assistant (Gemini 3.6)**: Generates simple plain-English explanations, hypothetical student case scenarios, board exam takeaways, and mechanism breakdowns using verified clinical data as context.
- **Interactive Pharmacology Study Suite**: Features an integrated quiz mode with rationales, high-yield CYP450 mnemonics (*"SICKFACES"* for inhibitors, *"PS-PORCS"* for inducers), and Narrow Therapeutic Index (NTI) reference guides.
- **Open, Responsive, & Private**: Operates seamlessly on mobile and desktop without requiring user registration, preserving privacy while keeping bookmarked combinations saved locally.

---

## ✨ Key Features

1. **Multi-Drug Interaction Checker**:
   - Check interactions between 2, 3, 4+ drugs concurrently.
   - Symmetrical, order-independent matching (Drug A + Drug B = Drug B + Drug A).
   - Instant pairwise breakdown showing highest severity and individual pair cards.

2. **Autocomplete Drug Search**:
   - Search by generic name, brand names, or drug class.
   - Real-time case-insensitive autocomplete with keyboard navigation.

3. **Detailed Clinical Pair Cards**:
   - **Severity Indicators**: Major (Red), Moderate (Amber), Minor (Blue), None (Emerald).
   - **Mechanism of Action**: Detailed pharmacological explanation (CYP450 pathways, receptor antagonism, additive toxicity).
   - **Clinical Significance, Effects, & Monitoring Guidelines**.
   - **Source References**: Cited Stockley's, FDA Safety Communications, and ACC/AHA guidelines.

4. **AI-Powered Student Assistant ("Explain with AI")**:
   - Powered by Gemini 3.6 via a secure server-side proxy route (`/api/explain`).
   - Translates complex pharmacology into simple analogies, key takeaways, and student scenarios.
   - Server-side API key protection ensures keys are never exposed to the client browser.

5. **Student Study Mode & Quizzes**:
   - Toggle **Student Mode** for Black Box exam tips and key takeaways.
   - Interactive multiple-choice pharmacology quiz with real-time scoring and rationales.
   - High-yield CYP450 mnemonics and Narrow Therapeutic Index (NTI) cheatsheets.

6. **Search History & Bookmarks**:
   - Save favorite drug combinations (⭐) using local browser storage (`localStorage`).
   - Review past interaction checks with timestamp history and quick re-check buttons.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React icons.
- **Backend / API**: Node.js Express server (`server.ts`) with server-side AI proxy routes.
- **AI Integration**: `@google/genai` TypeScript SDK (Gemini 3.6 Flash model).
- **Storage**: Client-side `localStorage` for user bookmarks and search history.
- **Deployment**: Vercel / Netlify serverless compatible.

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/pharmacheck-ai.git
   cd pharmacheck-ai
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment Instructions

PharmaCheck AI is configured for one-click deployment on **Vercel** or **Netlify**.

### Deploying to Vercel

1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `pharmacheck-ai` GitHub repository.
4. Set Build Command: `npm run build` and Output Directory: `dist`.
5. Under **Environment Variables**, add `GEMINI_API_KEY`.
6. Click **Deploy**.

---

## ⚠️ Medical Disclaimer

This application is created strictly for **educational and informational purposes**. It is designed as a learning aid for pharmacy students, healthcare trainees, and clinical learners. It is **not** a substitute for professional medical advice, clinical diagnosis, or patient-specific therapeutic decision-making. Always consult a licensed pharmacist or physician for medical guidance.
