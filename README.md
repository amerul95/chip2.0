# Chip2.0

A Next.js dashboard application that integrates with the **Chip-in.asia API** to manage payment instructions, bank accounts, send limits, and manual deposits (payin). The app provides a secure, session-based interface for viewing accounts, creating transactions, and exporting data.

## What This App Does

- **Authentication** — Session-based login with iron-session; protected dashboard routes
- **Send Accounts** — View Chip-in send accounts, balances, and details
- **Transactions (Instructions)** — List send instructions with pagination, sorting, and CSV/XLSX export
- **Bank Accounts** — Manage bank accounts linked to Chip-in; create new bank accounts and payout transactions
- **Send Limits** — Request send limit increases; view send limit history
- **Payin** — Create manual deposits/purchases via Chip-in API (redirects to success/failure pages)
- **Activity Log** — View user activity logs stored in MySQL (via Prisma)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MySQL with Prisma ORM
- **Auth:** iron-session (server-side sessions)
- **Validation:** Zod, Conform
- **Export:** xlsx for CSV/Excel downloads

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home (Login link)
│   ├── layout.tsx               # Root layout
│   ├── login/                   # Login page
│   │   └── page.tsx
│   ├── dashboard/               # Protected dashboard (requires auth)
│   │   ├── layout.tsx           # Dashboard layout (Navbar)
│   │   ├── page.tsx             # Send accounts overview
│   │   ├── transaction/         # Send instructions list
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx    # Instruction detail
│   │   ├── bank-account/        # Bank accounts
│   │   │   ├── page.tsx
│   │   │   ├── create-accountbank/page.tsx
│   │   │   └── [id]/           # Bank account detail + create transaction
│   │   ├── send-limit/          # Increase send limit form
│   │   │   └── page.tsx
│   │   ├── send-limit-history/  # Send limit history + log
│   │   │   ├── page.tsx
│   │   │   ├── [id]/page.tsx
│   │   │   └── log/page.tsx     # Activity log (Prisma)
│   │   ├── payin/               # Manual deposit (Chip purchase)
│   │   │   └── page.tsx
│   │   ├── processing/          # Payin success redirect
│   │   ├── processing-failed/   # Payin failure redirect
│   │   └── test/page.tsx
│   ├── api/                     # API routes
│   │   ├── allrangedate/        # GET - Export all instructions as XLSX
│   │   ├── specificdate/        # POST - Export instructions by date range
│   │   ├── prismadb/            # Prisma CRUD (list, update)
│   │   └── getapi/
│   ├── components/              # Reusable components
│   │   ├── accountDetail.tsx    # Send account details
│   │   ├── bankAccount.tsx      # Bank account list
│   │   ├── instructionList.tsx  # Instruction list
│   │   ├── instructionById.tsx  # Instruction detail
│   │   ├── increaseSendLimit.tsx
│   │   ├── increaseLimitHistory.tsx
│   │   ├── depositManual.tsx    # Payin form
│   │   ├── createAccountBank.tsx
│   │   ├── createTransaction.tsx
│   │   ├── loginForm.tsx
│   │   ├── Logtable.tsx
│   │   └── ui/                  # Navbar, Loader, etc.
│   ├── lib/
│   │   ├── actions.ts           # Server actions (Chip-in API calls)
│   │   ├── actiondeposit.ts     # Payin server action
│   │   ├── session.ts           # Session utilities
│   │   ├── loginUser.ts
│   │   ├── schema.ts            # Auth schema
│   │   ├── prisma.ts            # Prisma client
│   │   └── zodSchema.ts         # Zod schemas
│   └── schema/
│       └── zodSchema.ts
├── middleware.ts                # Auth protection for /dashboard
prisma/
└── schema.prisma                # User model (activity logs)
```

## Demo Access

For demo purposes, clients can log in with the following credentials to access the app:

| Field      | Value           |
|-----------|-----------------|
| **Username** | `read-only`     |
| **Password** | `Senario@123`   |

Go to `/login` and enter these credentials to access the dashboard. Demo credentials are also shown on the login page.

## Environment Variables

Create a `.env` file with:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MySQL connection string for Prisma |
| `AUTH_SECRET` | Secret for iron-session encryption |
| `NEXT_PUBLIC_API_KEY` | Chip-in.asia API key |
| `NEXT_PUBLIC_API_SECRET` | Chip-in.asia API secret (for checksum) |
| `API_SECRET_KEY` | Chip-in API secret for payin (gate API) |
| `BRAND_ID` | Chip-in brand ID for payin |

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment**

   Copy `.env.example` to `.env` (or create `.env`) and fill in the required variables.

3. **Run Prisma migrations**

   ```bash
   npx prisma migrate dev
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

5. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## API Integration

The app talks to **Chip-in.asia** using:

- HMAC-SHA512 checksum for auth (`epochSecs + apiKey`)
- Base URL: `https://api.chip-in.asia/api/`
- Endpoints used: `send/accounts`, `send/send_instructions`, `send/bank_accounts`, `send/send_limits`, etc.
- Payin: `https://gate.chip-in.asia/api/v1/purchases/`

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
