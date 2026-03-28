# 🌿 GreenCoin Frontend

> A React-based web dashboard for the Smart Waste Management System — supports two different user experiences: one for **students** and one for **admins**, all built with Vite + React 19.

---

## 📖 Table of Contents

- [What Does the Frontend Do?](#what-does-the-frontend-do)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Features](#pages--features)
- [User Flows](#user-flows)
  - [Authentication Flow](#authentication-flow)
  - [Student Dashboard Flow](#student-dashboard-flow)
  - [Admin Dashboard Flow](#admin-dashboard-flow)
  - [Marketplace Flow](#marketplace-flow)
- [Routing Architecture](#routing-architecture)
- [Running Locally](#running-locally)

---

## What Does the Frontend Do?

The frontend is a **single-page application (SPA)** that serves two completely different types of users:

```
┌─────────────────────────────────────────────────────────┐
│                    GreenCoin Web App                     │
├─────────────────────────┬───────────────────────────────┤
│      👨‍🎓 STUDENT VIEW      │       👩‍💼 ADMIN VIEW           │
├─────────────────────────┼───────────────────────────────┤
│ • Personal Dashboard    │ • System-wide Analytics       │
│ • Waste History + Chart │ • User Management             │
│ • Marketplace (buy)     │ • Bin Monitoring              │
│ • My Orders             │ • Product Management          │
│ • Transaction History   │ • Transaction History         │
│ • Profile & Wallet      │ • Leaderboard                 │
│ • Leaderboard           │ • Security Notifications      │
└─────────────────────────┴───────────────────────────────┘
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 19** | UI component framework |
| **Vite 8** | Lightning-fast development server & bundler |
| **React Router v7** | Client-side navigation (SPA routing) |
| **TanStack Query v5** | Data fetching, caching, and synchronization |
| **Axios** | HTTP requests to the backend |
| **Recharts** | Beautiful charts for waste analytics |
| **ethers.js v6** | Connect to MetaMask for blockchain wallet |
| **Lucide React** | Clean, modern icon library |
| **Sass** | Enhanced CSS with variables and nesting |

---

## Project Structure

```
green-coin-frontend/
├── index.html                  ← App entry HTML
├── vite.config.js              ← Vite configuration
├── src/
│   ├── main.jsx                ← React root, QueryClient setup
│   ├── App.jsx                 ← Router provider
│   ├── App.routes.jsx          ← All page routes defined here
│   │
│   ├── features/              ← Feature-based organization
│   │   ├── Auth/              ← Login + Register
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── components/    ← Form components
│   │   │   ├── hooks/         ← useLogin, useRegister custom hooks
│   │   │   ├── services/      ← API calls for auth
│   │   │   └── style/
│   │   │
│   │   ├── Admin/             ← Admin-only features
│   │   │   ├── Pages/
│   │   │   │   ├── DashboardAdmin.jsx
│   │   │   │   ├── UserManagement.jsx
│   │   │   │   ├── UserDetails.jsx
│   │   │   │   ├── BinPages.jsx
│   │   │   │   ├── Marketplace.jsx
│   │   │   │   ├── LeaderBoard.jsx
│   │   │   │   └── TransactionHistoryAdmin.jsx
│   │   │   ├── components/    ← BinCard, StudentCard, etc.
│   │   │   ├── hooks/         ← Data fetching hooks
│   │   │   └── services/      ← Admin API calls
│   │   │
│   │   └── User/              ← Student features
│   │       ├── pages/
│   │       │   ├── Dashboard.jsx
│   │       │   ├── Profile.jsx
│   │       │   ├── Marketplace.jsx
│   │       │   ├── MyOrders.jsx
│   │       │   └── TransactionHistory.jsx
│   │       ├── hooks/
│   │       └── services/
│   │
│   ├── global/               ← Shared utilities
│   │   └── utils/
│   │       ├── ProtectedRoute.jsx  ← Redirect to login if not authenticated
│   │       └── AdminRoutes.jsx     ← Redirect to /users if not admin
│   │
│   └── layout/
│       └── Mainlayout.jsx    ← Shared sidebar/header shell
```

---

## Pages & Features

### Admin Pages

| Page | Path | What It Does |
|------|------|-------------|
| **Admin Dashboard** | `/` | Analytics charts, total waste stats, quick overview |
| **User Management** | `/user-management` | Browse all students, assign RFID cards |
| **User Details** | `/user-management/:id` | Individual student's waste history chart |
| **Bin Monitoring** | `/bin` | View all dustbins and their current fill levels |
| **Marketplace** | `/marketplace` | Add/remove reward products |
| **Transactions** | `/transactions` | Full blockchain transaction log |
| **Leaderboard** | `/leaderboard` | Top students by points |

### Student Pages

| Page | Path | What It Does |
|------|------|-------------|
| **Student Dashboard** | `/users` | Personal stats, points, daily waste chart |
| **Marketplace** | `/users/marketplace` | Browse & buy products with GreenCoin |
| **Profile** | `/users/profile` | View profile, connect MetaMask wallet |
| **My Orders** | `/users/orders` | Purchase history |
| **Transactions** | `/users/transactions` | GreenCoin token transaction history |

### Auth Pages

| Page | Path | What It Does |
|------|------|-------------|
| **Login** | `/login` | Sign in with email or roll number |
| **Register** | `/register` | Create a new student account |

---

## User Flows

### Authentication Flow

```mermaid
flowchart TD
    A[User visits app] --> B{JWT cookie present?}
    B -->|No| C[Redirect to /login]
    B -->|Yes| D{Cookie valid?}
    D -->|No - Expired| C
    D -->|Yes| E{User role?}
    E -->|admin| F[Show Admin Dashboard at /]
    E -->|user| G[Redirect to /users - Student Dashboard]
    C --> H[Login Page]
    H --> I[Enter email/roll number + password]
    I --> J{Credentials valid?}
    J -->|No| K[Show error message]
    J -->|Yes| L[JWT cookie set by server]
    L --> E
```

**Key Design Decision:** The server sets the JWT as an **httpOnly cookie**. This means JavaScript cannot access it directly — making it much harder for hackers to steal the token. The browser automatically sends it with every request.

---

### Student Dashboard Flow

```mermaid
flowchart TD
    A[Student logs in] --> B[/users - Student Dashboard]
    B --> C[Fetch: User profile + points]
    B --> D[Fetch: Waste chart - last 7 days]
    B --> E[Fetch: Leaderboard ranking]
    C --> F[Display: Points balance, daily waste, rank]
    D --> G[Display: Bar chart of daily waste in grams]
    E --> H[Display: Position on leaderboard]

    B --> I[Student navigates to...]
    I --> J[/users/marketplace - Browse products]
    J --> K[Select a product to buy]
    K --> L{Enough points?}
    L -->|No| M[Show insufficient points message]
    L -->|Yes| N[Confirm purchase]
    N --> O[Backend: Blockchain transfer + DB deduction]
    O --> P[Points deducted, order saved]

    I --> Q[/users/profile - View profile]
    Q --> R{Wallet connected?}
    R -->|No| S[Connect MetaMask button shown]
    S --> T[MetaMask popup: Connect wallet]
    T --> U[Wallet address saved to profile]
    R -->|Yes| V[Show wallet address + GC balance]
```

---

### Admin Dashboard Flow

```mermaid
flowchart TD
    A[Admin logs in] --> B[/ - Admin Dashboard]
    B --> C[Fetch: Total waste weight all time]
    B --> D[Fetch: College waste chart - last 7 days]
    B --> E[Fetch: All notifications / security alerts]

    B --> F[Admin navigates to...]
    F --> G[/user-management - All Students]
    G --> H[View student list with roll numbers, points, UID status]
    H --> I[Click student → /user-management/:id]
    I --> J[See student's individual waste chart]
    I --> K[Assign RFID card UID to student]
    I --> L[Promote to admin or delete account]

    F --> M[/bin - Dustbin Monitor]
    M --> N[View each bin: name, capacity, current fill level]
    N --> O[Visual fill percentage indicator]

    F --> P[/marketplace - Product Management]
    P --> Q[View all products in the store]
    Q --> R[Add new product with image + price in points]
    Q --> S[Delete existing product]

    F --> T[/transactions - Transaction Log]
    T --> U[Filter by type: reward or purchase]
    T --> V[See tx hash, wallet, amount, status]
```

---

### Marketplace Flow

```mermaid
sequenceDiagram
    participant Student
    participant Frontend
    participant Backend
    participant Blockchain

    Student->>Frontend: Browse Marketplace (/users/marketplace)
    Frontend->>Backend: GET /api/products
    Backend-->>Frontend: Product list (name, price, image)
    Frontend-->>Student: Show product cards

    Student->>Frontend: Click "Buy" on a product
    Frontend->>Frontend: Check if points >= product price
    Frontend->>Backend: POST /api/vendor/purchase (amount, productId)

    Backend->>Backend: Verify user has enough points
    Backend->>Blockchain: transfer(vendorWallet, amount)
    Blockchain-->>Backend: ✅ Transaction confirmed

    Backend->>Backend: Deduct points from user DB
    Backend-->>Frontend: 200 OK - Purchase successful!
    Frontend-->>Student: Show success notification
    Frontend->>Backend: Refetch user points (balance updated)
```

---

## Routing Architecture

The app uses **React Router v7** with a nested route structure:

```mermaid
graph TD
    A[Browser URL] --> B{Public Route?}
    B -->|/login| C[Login Page]
    B -->|/register| D[Register Page]
    B -->|other| E[ProtectedRoute Guard]

    E --> F{JWT cookie valid?}
    F -->|No| G[Redirect to /login]
    F -->|Yes| H[MainLayout - Sidebar + Content]

    H --> I{Role check}
    I -->|Visiting /| J[AdminRoute Guard]
    J --> K{Is Admin?}
    K -->|No| L[Redirect to /users]
    K -->|Yes| M[Admin Dashboard]

    I -->|/users| N[Student Dashboard]
    I -->|/leaderboard| O[Leaderboard - Both roles]
```

**Two Route Guards:**

1. **`ProtectedRoute`** — Anyone not logged in gets sent to `/login`
2. **`AdminRoute`** — Any non-admin trying to access admin pages gets sent to `/users`

This ensures students **cannot** accidentally access admin management pages.

---

## Running Locally

### Prerequisites
- Node.js 18+
- Backend server running at `http://localhost:3000`

### Steps

```bash
# 1. Navigate to the frontend directory
cd green-coin-frontend

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
```

The app opens at **http://localhost:5173**

### Building for Production

```bash
npm run build
```

This creates an optimized `dist/` folder ready to deploy to Vercel, Netlify, or any static host.

> 💡 **Tip:** Make sure the backend is running before starting the frontend, or API calls will fail.
