# AI PDF Notes SaaS

A modern AI-powered PDF learning platform that lets users upload PDFs, chat with documents using AI, and retrieve context-aware answers with RAG (Retrieval-Augmented Generation).

🌐 Live Demo: [AI PDF Notes SaaS](https://ai-pdf-notes-convex.vercel.app)

---

## 🚀 Features

* 📄 AI PDF Chat
* 🧠 RAG-based Retrieval
* 📚 PDF Upload & Parsing
* ✨ Gemini AI Integration
* 💳 PayPal Subscription System
* 🆓 Free Tier with 5 PDF Upload Limit
* 🔐 Secure Authentication with Clerk
* ⚡ Real-time Backend with Convex
* 🎨 Modern Responsive UI

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* TailwindCSS
* Zustand

### Backend & Database

* Convex

### Authentication

* Clerk Auth

### AI & Processing

* Google Gemini AI
* LangChain
* RAG (Retrieval-Augmented Generation)
* PDF.js
* React PDF

### Payments

* PayPal Integration

---

## 📷 Preview

![Image](https://res.cloudinary.com/dgl8zmniq/image/upload/v1778932770/Portfolio_Projects/pdfchat_zmepm6.png)

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Aamil13/AI-PDF-Notes-CONVEX.git
cd your-repo-name
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CONVEX_URL=

GEMINI_API_KEY=

PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

---

### 4️⃣ Run the Development Server

```bash
npm run dev
```

App will run on:

```bash
http://localhost:3000
```

---

## 🧠 How It Works

1. User uploads a PDF
2. PDF content is parsed using PDF.js
3. Text embeddings are processed with LangChain
4. RAG pipeline retrieves relevant chunks
5. Gemini AI generates contextual responses
6. Chat interface streams intelligent answers in real-time

---

## 🔒 Authentication

Authentication is powered by [Clerk](https://clerk.com) for secure login and user management.

---

## 💳 Subscription System

Integrated with [PayPal](https://www.paypal.com) for premium subscriptions and usage upgrades.

---

## 📦 Deployment

Deploy easily on:

* [Vercel](https://vercel.com/?utm_source=chatgpt.com)
* [Convex](https://www.convex.dev/?utm_source=chatgpt.com)

---

## 📚 Inspiration

Inspired by the growing ecosystem of AI-powered PDF learning and note-generation platforms. ([Intelli-PDF][1])

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ by **Mohd Aamil Shafi**

* GitHub: [GitHub](https://github.com/Aamil13)
* Portfolio: [Live Project](https://aamilport.netlify.app/)

