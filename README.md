# 🚀 SaaS To-Do Application (Next.js + Stripe)

A full-stack SaaS To-Do application built with Next.js, Prisma, PostgreSQL, and Stripe.
This app allows users to manage tasks with a subscription-based model (Free & Pro plans).

---

## 🧩 Features

### ✅ Core Features

* User Authentication (Better Auth)
* Create, Read, Update, Delete (CRUD) Tasks
* Responsive UI with Tailwind CSS & shadcn/ui

### 💳 SaaS Features

* Stripe Checkout Integration
* Subscription Plans (Free, Pro)
* Secure Payment Flow
* Webhook-based subscription updates
* Access Control based on subscription

---

## 💻 Tech Stack

### Frontend

* Next.js (App Router)
* React.js
* Tailwind CSS
* shadcn/ui

### Backend

* Prisma ORM
* PostgreSQL (Neon DB)
* Better Auth

### Payments

* Stripe Checkout
* Stripe Webhooks

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL=your_database_url
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_PREMIUM=price_...

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🧠 How It Works

### 1. Subscription Flow

1. User clicks "Upgrade to Pro"
2. Stripe Checkout session is created
3. User completes payment
4. Stripe sends webhook event
5. App updates user subscription in database

---

### 2. Access Control

* Free Users → Max 5 tasks
* Pro Users → Unlimited tasks

---

## 🔄 Webhook Setup

Run Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy webhook secret to `.env`.

---

## 🚀 Getting Started

```bash
npm install
npx prisma migrate dev
npm run dev
```

---

