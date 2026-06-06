# my-vechain-dapp

A VeChain dApp built with [VeChain Kit](https://github.com/vechain/vechain-kit), Next.js 14, and Chakra UI v3.

## Features

- 🔐 **Multi-login**: Google, email (Privy), VeWorld, WalletConnect
- 🎨 **Chakra UI v3** with dark mode by default and reactive theme tokens
- 💚 **B3TR balance** — live, auto-refreshes every 15s
- 📤 **Send B3TR** — modal with VeWorld signing
- 🚀 **GitHub Pages** deploy workflow included

## Quick Start

### 1. Install dependencies

```bash
yarn install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
- `NEXT_PUBLIC_PRIVY_APP_ID` — get from [console.privy.io](https://console.privy.io)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — get from [cloud.walletconnect.com](https://cloud.walletconnect.com)
- `NEXT_PUBLIC_VECHAIN_NETWORK` — `main` or `test`

### 3. Run dev server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## GitHub Pages Deployment

1. Push to GitHub
2. Go to **Settings → Pages** → set source to **GitHub Actions**
3. Add secrets in **Settings → Secrets → Actions**:
   - `PRIVY_APP_ID`
   - `WALLETCONNECT_PROJECT_ID`
4. Push to `main` — the workflow auto-deploys to `https://<user>.github.io/<repo>`

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles, animations
│   ├── layout.tsx        # Root layout with fonts
│   ├── page.tsx          # Landing page
│   └── providers.tsx     # Chakra + next-themes + VeChain Kit
├── components/
│   └── SendB3TRModal.tsx # B3TR send modal
├── hooks/
│   └── useB3TRBalance.ts # Live B3TR balance hook
└── lib/
    └── theme.ts          # Chakra UI v3 design tokens
```

## Tech Stack

| Package | Purpose |
|---|---|
| `@vechain/vechain-kit` | VeChain wallet + Privy social login |
| `@chakra-ui/react` v3 | Component library |
| `next-themes` | Dark mode |
| `next` 14 | Framework (static export) |
