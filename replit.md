# Mobile App Showcase — Replit Project

## Overview
A web application that showcases two mobile apps in 375×812px frames centered in the browser. Both apps are built with React + TypeScript + Tailwind and mimic native mobile experiences.

## Apps

### Flock (Freight Forwarding App)
Imported from Figma. 6 static screens rendered pixel-perfect using Figma asset URLs.
- Routes: `/splash`, `/get-started`, `/home`, `/activity`, `/notifications`, `/successful`

### Suprans (B2B Import Partner App)
A chat-first mobile app for Indian businesses sourcing from China. 4 tabs (Chat, Explore, Projects, Account) with full onboarding flow.
- Entry: `/suprans` → redirects to `/suprans/onboarding`
- Onboarding: 3-slide carousel with auto-advance, sign-in with +91 phone input, 6-digit OTP verification
- Tabs: `/suprans/chat`, `/suprans/explore`, `/suprans/projects`, `/suprans/account`

## App Launcher
The root `/` route shows an App Launcher page that lists both apps with links to their entry points.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Wouter (routing)
- **Styling**: Tailwind CSS + shadcn/ui + custom design tokens
- **Backend**: Express (Node.js), Drizzle ORM, PostgreSQL
- **State**: TanStack Query (React Query)
- **Icons**: Lucide React

## Design Systems

### Flock Design Tokens
- Font: Plus Jakarta Sans
- Primary: #F34147

### Suprans Design Tokens (`--suprans-*` CSS variables)
- Canvas/Background: `#FAF7F2` (warm cream)
- Brand Red: `#F03B3B`
- Ink (primary text): `#1A1612`
- Ink Secondary: `#4A443E`
- Ink Tertiary: `#8C857D`
- Border: `#E8E1D2`
- Card: `#FFFFFF`
- Red Light (hover/accent bg): `#FEF0F0`
- Font: `Inter Tight` (loaded from Google Fonts)
- Tab Bar: 72px tall, 4 tabs, active = brand red

## File Structure
```
client/src/
├── pages/
│   ├── AppLauncher.tsx          ← Root "/" landing page
│   ├── ElementLoginEmptyState.tsx  ← Flock login screen
│   ├── SplashScreen.tsx         ← Flock splash
│   ├── GetStarted.tsx           ← Flock onboarding
│   ├── HomeV2.tsx               ← Flock home
│   ├── Activity.tsx             ← Flock activity
│   ├── Notifications.tsx        ← Flock notifications
│   ├── Successful.tsx           ← Flock success
│   └── suprans/
│       ├── SupransOnboarding.tsx  ← 3 slides + sign-in + OTP
│       └── SupransApp.tsx        ← Tab shell + SupransTabBar (exported)
└── index.css                    ← Design tokens for both apps
```

## Key Patterns
- Mobile frames: `div.flex.items-center.justify-center.min-h-screen.bg-gray-100` > `div.relative.w-[375px].h-[812px].overflow-hidden`
- Suprans tab shell: `SupransApp` uses `absolute inset-0 bottom-[72px]` for content + `SupransTabBar` at `absolute bottom-0`
- `SupransTabBar` is exported for use by downstream task pages

## Running
```bash
npm run dev
```
Starts Express backend on port 5000 + Vite frontend, both accessible at the same URL.
