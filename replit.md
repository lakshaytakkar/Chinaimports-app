# Mobile App Showcase — Replit Project

## Overview
A web application that showcases Suprans-family mobile apps in 375×812px frames centered in the browser. Each app is built with React + TypeScript + Tailwind and mimics a native mobile experience.

## Apps

### China Imports (Sourcing App)
A chat-first mobile app for Indian businesses sourcing from China. 4 tabs (Chat, Explore, Projects, Account) with full onboarding flow.
- Entry: `/chinaimports` → redirects to `/chinaimports/onboarding`
- Onboarding: 3-slide carousel with auto-advance, sign-in with +91 phone input, 6-digit OTP verification
- Tabs: `/chinaimports/chat`, `/chinaimports/explore`, `/chinaimports/projects`, `/chinaimports/account`

### Suprans Hub (Parent-Brand Directory App)
A directory / mini app store for the entire Suprans ecosystem. 4 tabs (Home, Events, My Services, Account) plus per-product detail pages.
- Entry: `/supranshub` → redirects to `/supranshub/onboarding` (or `/supranshub/home` if already authed)
- Onboarding: 3-slide carousel ("One Suprans account...", "From US company formation to China sourcing...", "Sign in once. Manage everything."), +91 phone, 6-digit OTP
- Tabs: `/supranshub/home`, `/supranshub/events`, `/supranshub/services`, `/supranshub/account`
- Product detail: `/supranshub/product/:id`
- 10 products listed: Legal Nations, USDrop AI, China Imports, China Products, EazyToSell, Keeraft, La Bella Monte, GoyoTours, Events, Account & Billing
- CTA behavior: external links open in new tab; the China Imports CTA deep-links into the China Imports app (`/chinaimports/chat` if authed, else onboarding); Events / Account tiles route to their tabs
- Auth key: `supranshub_authed` in localStorage (separate from China Imports)

## App Launcher
The root `/` route shows an App Launcher page with a live phone-frame preview of each Suprans-family app. The "View App" button is auth-aware and skips onboarding when already signed in.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Wouter (routing)
- **Styling**: Tailwind CSS + shadcn/ui + custom design tokens
- **Backend**: Express (Node.js), Drizzle ORM, PostgreSQL
- **State**: TanStack Query (React Query)
- **Icons**: Lucide React

## Design Systems

### China Imports Design Tokens (`--chinaimports-*` CSS variables)
- Canvas/Background: `#FAF7F2` (warm cream)
- Brand Red: `#F03B3B`
- Ink: `#1A1612` / Ink Secondary: `#4A443E` / Ink Tertiary: `#8C857D`
- Border: `#E8E1D2` · Card: `#FFFFFF` · Red Light: `#FEF0F0`
- Font: `Inter Tight`
- Tab Bar: 72px tall, 4 tabs + center "Raise" FAB, active = brand red

### Suprans Hub Design Tokens (`--supranshub-*` CSS variables)
- Same palette as China Imports plus a parent-brand gold accent
- Gold: `#C8A25A` · Gold Light: `#F5EBD8`
- Canvas/Background: `#FAF7F2` · Brand Red: `#F03B3B`
- Ink / Ink Secondary / Ink Tertiary: same as China Imports
- Border / Card / Red Light: same as China Imports
- Font: `Inter Tight`
- Tab Bar: 72px tall, 4 tabs (Home, Events, Services, Account) + center "Concierge" FAB (gold gradient), active tab = brand red

### Suprans Concierge (center FAB flow)
A gold raised FAB sits in the middle of the Suprans Hub tab bar. Tapping it opens a bottom sheet titled "How can we help?" with 4 action cards. Each opens a focused full-screen flow that ends in a shared success state (with a generated SH-XXXXXX reference number).
- **Talk to an Advisor** — gold theme, optional product context chips + 5 bookable slots
- **Ask Suprans AI** — red theme, free-text prompt + chip suggestions; on submit, returns up to 3 ranked product matches via keyword scoring (legalnations / usdrop / china-imports / etc.) and offers human handoff
- **Custom Quote** — blue theme, multi-select product chips + brief textarea
- **Refer a Business** — green theme, name + contact + note (₹5,000 reward callout)
- File: `client/src/pages/supranshub/SupransHubConcierge.tsx`

## File Structure
```
client/src/
├── pages/
│   ├── AppLauncher.tsx          ← Root "/" landing page (lists both apps)
│   ├── chinaimports/
│   │   ├── ChinaImportsOnboarding.tsx
│   │   ├── ChinaImportsApp.tsx        ← Tab shell + ChinaImportsTabBar
│   │   ├── ChinaImports{Chat,Explore,Projects,Account,Requests}Tab.tsx
│   │   ├── ChinaImportsRequestFlow.tsx
│   │   ├── ChinaImportsMobileShell.tsx
│   │   └── constants.ts               ← CHINAIMPORTS_AUTH_KEY
│   └── supranshub/
│       ├── SupransHubOnboarding.tsx   ← 3 slides + sign-in + OTP
│       ├── SupransHubApp.tsx          ← Tab shell + SupransHubTabBar
│       ├── SupransHub{Home,Events,Services,Account}Tab.tsx
│       ├── SupransHubProductDetail.tsx
│       ├── SupransHubConcierge.tsx    ← Bottom sheet + 4 concierge mini-flows
│       ├── SupransHubMobileShell.tsx
│       └── constants.ts               ← SUPRANSHUB_AUTH_KEY + PRODUCTS + EVENTS + SERVICES
└── index.css                    ← Design tokens for both apps
```

## Key Patterns
- Mobile frames: `div.flex.items-center.justify-center.min-h-screen.bg-gray-100` > `div.relative.w-[375px].h-[812px].overflow-hidden`
- Tab shells: content area `absolute inset-0 bottom-[72px]` + tab bar `absolute bottom-0`
- Both apps use independent `localStorage` auth keys — no SSO between them
- No emojis anywhere in Hub UI per brand standard (China Imports has the 🇮🇳 flag on phone input only)

## Running
```bash
npm run dev
```
Starts Express backend on port 5000 + Vite frontend, both accessible at the same URL.
