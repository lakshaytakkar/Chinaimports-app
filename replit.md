# Mobile App Showcase — Replit Project

## Overview
A web application that showcases Suprans-family mobile apps in 375×812px frames centered in the browser. Each app is built with React + TypeScript + Tailwind and mimics a native mobile experience.

## Apps

### China Imports (Sourcing App)
A chat-first mobile app for Indian businesses sourcing from China. 4 tabs (Chat, Explore, Projects, Account) with full onboarding flow.
- Entry: `/chinaimports` → redirects to `/chinaimports/onboarding`
- Onboarding: 3-slide carousel with auto-advance, sign-in with +91 phone input, 6-digit OTP verification
- Tabs: `/chinaimports/chat`, `/chinaimports/explore`, `/chinaimports/projects`, `/chinaimports/account`

## App Launcher
The root `/` route shows an App Launcher page that lists all Suprans-family apps with links to their entry points.

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
│   └── chinaimports/
│       ├── ChinaImportsOnboarding.tsx  ← 3 slides + sign-in + OTP
│       └── ChinaImportsApp.tsx        ← Tab shell + ChinaImportsTabBar (exported)
└── index.css                    ← Design tokens
```

## Key Patterns
- Mobile frames: `div.flex.items-center.justify-center.min-h-screen.bg-gray-100` > `div.relative.w-[375px].h-[812px].overflow-hidden`
- China Imports tab shell: `ChinaImportsApp` uses `absolute inset-0 bottom-[72px]` for content + `ChinaImportsTabBar` at `absolute bottom-0`
- `ChinaImportsTabBar` is exported for use by downstream task pages

## Running
```bash
npm run dev
```
Starts Express backend on port 5000 + Vite frontend, both accessible at the same URL.
