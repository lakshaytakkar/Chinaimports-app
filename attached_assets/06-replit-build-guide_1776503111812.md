# Building the Suprans App on Replit — Non-Developer Guide

This is a start-to-finish guide for Lakshay (or anyone without a developer background) to build the Suprans mobile app using Replit. Every step is spelled out. No assumed knowledge. Follow this in order.

This isn't a generic Replit tutorial. It's specifically about building *this* app — the Suprans chat-first client management app described in the other files in this folder.

---

## Before you start: the mental model

When you build an app on Replit (or any AI code platform), you're not writing code yourself. You're having a long conversation with an AI that writes the code for you. Your job is to:

1. **Provide clear requirements** (what should this screen look like, what should happen when the user taps this button)
2. **Review the output** (does it look right on the preview, does it work when tapped)
3. **Request changes** (the button should be bigger, the color should be warmer, the animation should be removed)
4. **Iterate until it's right** (most screens take 3–10 iterations before they're production-ready)

The AI is a coding assistant, but you are the product owner. You decide what's right and what's wrong. The guide files you already have (brief, structure, design system, chat architecture) give you the authority to make those calls.

---

## Choose your platform: React Native or Expo via Replit

Replit has templates for different app types. For the Suprans App, you want:

**Recommended: Expo (React Native)**

- One codebase ships to iOS and Android
- Preview runs on your phone via Expo Go app (free from App Store / Play Store)
- Easier to iterate and test changes
- Handles app store deployment when you're ready

Open Replit, create a new Repl, search for "Expo" template, select "Expo - React Native starter."

Alternative: If Replit adds a full native Swift/Kotlin template that you prefer, the principles below still apply. Expo is just the easiest for a non-dev to ship.

---

## Phase 1: Setup (day 1)

### Step 1.1: Create the Replit project

1. Sign into Replit (create an account if needed)
2. Click "Create Repl"
3. Search "Expo" → select "Expo - React Native Starter" template
4. Name your project: `suprans-app`
5. Click "Create"

Replit will set up the codebase. This takes 30-60 seconds.

### Step 1.2: Install Expo Go on your phone

- iOS: App Store → search "Expo Go" → install
- Android: Play Store → search "Expo Go" → install

Open Expo Go on your phone. Sign in with your Expo account (free to create).

### Step 1.3: Connect your phone to the Replit preview

1. In Replit, click "Run" on the app
2. A QR code will appear
3. Open Expo Go on your phone → tap "Scan QR code"
4. Scan the QR code from Replit
5. The default Expo starter app will load on your phone

You now have a working live-reload environment: every code change on Replit will appear on your phone within 2-3 seconds.

### Step 1.4: Brief the AI on what you're building

Open the AI chat in Replit. Paste this initial message:

```
I'm building a mobile app called "Suprans App" — a chat-first client management 
app for an Indian B2B company. The app has 4 tabs: Chat, Explore, Projects, 
Account. 

Before we start coding, I want you to understand the project. I'm going to 
paste in several specification documents over the next messages. Please read 
them, ask any clarifying questions, but don't write code yet.

Here's the first document:
```

Then paste the contents of `01-app-brief.md` from the guides folder.

After the AI confirms it understands, paste `02-app-structure.md`. Then `03-mobile-design-system.md`. Then `04-chat-system-architecture.md`. Then `05-app-icons-and-illustrations.md`.

The AI will ask clarifying questions. Answer them. Once it says it understands the full scope, tell it we're ready to start building.

This briefing phase takes about 20-30 minutes but sets the foundation for everything that follows. Don't skip it.

---

## Phase 2: Build the shell (day 1-2)

### Step 2.1: Set up the tab navigation

Ask the AI:

```
Let's start by building the tab bar navigation. I want 4 tabs at the bottom:
- Chat (leftmost)
- Explore
- Projects
- Account (rightmost)

The tab bar should be 72px tall (larger than standard iOS 49px). Each tab 
has a 28px icon and 11px label below. Active tab: icon and label in brand 
red #F03B3B with a subtle pill-shaped background behind the icon. Inactive 
tab: muted warm gray.

Use placeholder circle icons for now — we'll replace with real icons later.

Create empty screens for each tab with just a title ("Chat", "Explore", 
"Projects", "Account") in the middle so I can verify the tab navigation works.
```

The AI will generate the code. Review what shows up on your phone. Test by tapping each tab — the correct screen should appear with the right title. If anything's off, tell the AI specifically what to change.

### Step 2.2: Apply the design system colors and fonts

Ask the AI:

```
Set up the base theme for the entire app. Use these exact values:

Colors:
- Canvas (background): #FAF7F2
- Canvas Raised (cards): #FFFFFF
- Ink (primary text): #1A1612
- Ink Secondary: #4A443E
- Brand red (primary action): #F03B3B
- Border: #E8E1D2

Font: Inter Tight, loaded from Google Fonts. Weights needed: 400, 500, 600, 700.

Apply the cream #FAF7F2 as the default background on all screens.

No dark mode — light theme only.
```

The AI will set up the theme. On your phone, verify:
- All screens have the warm cream background (not pure white)
- Text is near-black (not pure black)
- No flashing/white states during loading

### Step 2.3: Add the brand red to the tab bar

The active tab should now show brand red. Test by tapping between tabs — the active one should have the brand color, others muted.

---

## Phase 3: Chat tab (day 3-7)

This is the most complex tab. Budget 4-5 days.

### Step 3.1: Conversations list

Ask the AI:

```
Build the Chat tab's main screen — a list of conversations.

At the top, a header with "Suprans" branding and a search icon on the right.

Below that, a list of conversation threads. For now, use 5-6 dummy 
conversations with these details per thread:
- Thread 1: "Priya Sharma" (your Ops Manager), last message "Good morning! Let me know when you're ready to proceed." 10 minutes ago, unread count 2
- Thread 2: "RFQ #CI-2024-00047" (group chat for a project), last message "Jason has shared the factory comparison." 2 hours ago, unread count 0
- Thread 3: "Charlie Chen" (Dropshipping Partner), last message "Order synced to your Shopify store." Yesterday, no unread
- Thread 4: "Legal Nations Team", last message "Your entity formation is ready for signature." 2 days ago, no unread
- Thread 5: "La Bella Monte Order", last message "Shipment cleared customs, expected delivery tomorrow." 3 days ago, no unread

Each thread row is 88px tall with:
- 48px circular avatar on left (use placeholder circles with initials)
- Thread name in bold 16px
- Last message preview in 14px muted, truncated
- Timestamp on right, 12px muted
- Unread count badge (brand red circle with white number) if applicable

Tapping a thread should navigate to a chat detail screen (build that next).
```

Review on your phone. Check the spacing, colors, readability. Iterate until it feels right.

### Step 3.2: Individual chat screen

Ask the AI:

```
Build the individual chat detail screen.

Top bar:
- Back arrow on left
- Center: thread name (e.g., "Priya Sharma") + "online" status in small text below
- Right: 3-dot more menu

Body: chat messages area.

Create 8-10 sample messages alternating between the user (right-aligned, 
brand red bubbles, white text) and Priya (left-aligned, warm cream #F2ECE0 
bubbles, near-black text). Include:
- A greeting
- A question from the user
- A response from Priya
- A shared document card (use placeholder)
- A couple more back-and-forth messages
- A voice note from Priya (use waveform placeholder)

Below messages, the input bar:
- Plus icon (48×48 tap target) on the left for attachments
- Multi-line text input that expands as you type (max 4 lines)
- Voice record button (48×48 circle, brand red)
- Send button (only appears when text is entered)

Input bar height: 60px + safe area padding.

Message bubbles:
- Max-width 78% of screen
- 12px vertical padding, 16px horizontal padding
- 18px border-radius, but the corner closest to the sender is 6px
- 80px minimum width
```

### Step 3.3: Add the new conversation flow

```
When the user taps the floating "+" button (position it in bottom-right 
of the Conversations list, above the tab bar), open a modal from the bottom.

Modal contents:
- Header: "What do you need help with?"
- Grid of 6 tiles (2 columns, 3 rows), each tile is 160px tall:
  - "Custom sourcing from China" with icon
  - "Browse wholesale catalog" with icon
  - "Start dropshipping store" with icon
  - "Form a company / entity" with icon
  - "Franchise retail info" with icon
  - "Plan a China trip" with icon
  - "Something else" (full-width tile at bottom, optional)

Below grid:
"Prefer to explain yourself? [Describe what you need →]"
This is a text link that opens a free-form text input.

Tapping any tile creates a new thread and opens the chat screen.

For now, just simulate this by creating a new dummy thread and navigating 
to it.
```

### Step 3.4: Add haptic feedback

```
Add haptic feedback to every button tap in the Chat tab. Use expo-haptics.
- Light haptic on button press
- Medium haptic when sending a message
- Success haptic on any successful action (message sent confirmation)

Don't add haptics to scroll or tab switches — just to button interactions.
```

Test on your phone. Tapping buttons should produce subtle vibration feedback — this is the Zomato-quality feel we want.

---

## Phase 4: Explore tab (day 8-10)

### Step 4.1: Service tiles

Ask the AI:

```
Build the Explore tab.

Section 1 (top): Hero banner carousel
- Full-width, 200px tall
- Auto-rotate 3 dummy banners every 5 seconds
- Dot indicators at bottom
- Each banner: gradient background with a headline, short description, and CTA button

Section 2: Quick actions horizontal scroll
- 6 circular chips showing: Start RFQ, Browse catalog, Form entity, Track shipment, Help center, My invoices
- Each chip: 56px circle with placeholder icon, label below (11px, in brand red when tapped)
- Horizontal scroll with snap-to-item

Section 3: "Our services" grid
- Heading "Our services" (24px bold)
- 2-column grid of service tiles (each 160px tall)
- 8 services: USDrop AI, Legal Nations, China Imports, China Products, 
  EazyToSell, GoyoTours, Keeraft, La Bella Monte
- Each tile: placeholder icon (48px) in top-left, service name (17px bold), 
  1-line description below, "Explore →" link at bottom-right

Section 4: Latest updates
- Heading "Latest from Suprans"
- Vertical list of 3-4 update cards
- Each card: thumbnail image (80×80), headline, date, 2-line description

Make each service tile tappable — tapping should navigate to a service 
detail screen (build that next).
```

### Step 4.2: Service detail screen

```
When a service tile is tapped, navigate to a detail screen for that service.

Top bar:
- Back arrow
- Service name centered

Body:
- Section 1: Hero card (full-width, 240px tall)
  - Background image or illustration placeholder
  - Title in large font
  - 2-line description
  - Primary CTA: "Start a [service] conversation →" (brand red button)

- Section 2: "What we do" - 3-4 feature cards in a vertical stack
- Section 3: "How it works" - Numbered 3-5 step list
- Section 4: "Typical engagement" - pricing/timeline info
- Section 5: Case studies horizontal scroll (3-5 cards)
- Section 6: Bottom CTA with 2 actions:
  - "Start a conversation" (primary, brand red)
  - "Visit [service].com" (ghost button)

Tapping "Start conversation" should navigate to the Chat tab with a new 
thread pre-created for that service.
```

---

## Phase 5: Projects tab (day 11-13)

### Step 5.1: Projects list

```
Build the Projects tab's main screen.

Top bar: "Your projects" heading + filter icon on right

Section 1: Active projects (with count, e.g., "Active (3)")
Create 3 dummy project cards, each 120px tall:
- Project 1: "RFQ #CI-2024-00047 — Stainless steel bottles, 500 units"
  - Icon: China Imports placeholder
  - Stage: "Bulk production — 420/500 units complete"
  - Progress: dots showing stage 6 of 9 complete
  - Next milestone: "Pre-shipment QC, 28 Oct"

- Project 2: "Entity Formation — TechStart LLC"
  - Icon: Legal Nations placeholder  
  - Stage: "Awaiting signature"
  - Progress: dots showing stage 4 of 5 complete
  - Next milestone: "Complete formation, 2 days"

- Project 3: "Dropshipping store setup"
  - Icon: USDrop placeholder
  - Stage: "Store live — 12 orders pending"
  - Progress: stage 3 of 3 (complete)
  - Next milestone: "Continue operations"

Section 2: Completed projects (collapsible)
- 2 dummy cards for completed orders, grayed out

Section 3: Opportunities (optional)
- 1-2 cards suggesting new things the client should consider
```

### Step 5.2: Project detail

```
Build the Project detail screen accessed by tapping a project card.

Top bar: Back arrow, project name centered, more menu on right

Body:
- Status banner (full-width, 80px): current stage, next milestone, background 
  color based on status (warm cream for in-progress, green for on-track, 
  amber for attention, red for blocked)

- Progress timeline (vertical, not horizontal):
  - 9 stages for chinaimports-type projects
  - Each stage: circle icon (filled = done, outlined = current/future), 
    stage name, description, date/estimate
  - Current stage has brand red border

- Documents section: list of document cards per stage
  - Each card: file icon, filename, size, upload date, download action

- Payment status card:
  - Total value, paid amount, pending amount, due dates
  - "Pay now" button if balance due

- Chat access card:
  - Team avatars, "Open conversation →" button

- Project settings (notifications, archive)
```

---

## Phase 6: Account tab (day 14-15)

### Step 6.1: Account home

```
Build the Account tab.

Top bar: "Account" title, settings gear icon on right

Body:
- Profile card at top:
  - Large 64px avatar
  - Business name (20px)
  - Contact person name
  - Email + phone (tappable to copy)
  - "Edit profile →" link

- Overview stats (4-tile 2×2 grid):
  - Active projects count
  - Total invested
  - Member since
  - Verticals engaged

- Menu list (each row 60px):
  - Business details
  - Addresses
  - GST & tax info
  - Payment methods
  - Invoices & billing history
  - Notifications
  - Privacy & security
  - Help center
  - About Suprans
  - Sign out

Each menu item: icon on left, label, chevron arrow on right.
Tapping opens the corresponding detail screen.
```

### Step 6.2: Supporting account screens

Build in order:
- Business details (editable form)
- Invoices & billing history (list + summary)
- Notifications (toggle switches)
- Payment methods (saved cards list + add new)

For each, ask the AI to build based on specifications in `02-app-structure.md` sections 4.1-4.4.

---

## Phase 7: Onboarding (day 16)

```
Build the first-time user onboarding flow. This shows before any tab is 
accessible, but only the first time a user opens the app.

3-screen carousel, swipeable left-right:

Screen 1: Welcome
- Large illustration placeholder (will be replaced with nano banana generated art)
- Headline: "Welcome to Suprans"
- Description: "Your China sourcing and import partner, in one app."
- "Get started →" button at bottom

Screen 2: Chat with your team
- Illustration placeholder
- Headline: "Talk to your team, anytime"
- Description: "Replace scattered WhatsApp chats with one organized conversation."
- "Continue →" button

Screen 3: Everything in one place
- Illustration placeholder
- Headline: "Sourcing, imports, and more — all here"
- Description: "Manage every Suprans engagement from one dashboard."
- "Start using Suprans →" button → opens the Chat tab

After user completes onboarding, save to local storage so it doesn't show 
again. Include "Skip" option on each screen that goes straight to Chat tab.
```

---

## Phase 8: Replace placeholders with real icons (day 17-18)

Now that the app is functional with placeholder icons, generate and integrate the real ones.

### Step 8.1: Generate icons using nano banana

1. Open Google AI Studio (or whichever Gemini image generation tool you're using)
2. Open `05-app-icons-and-illustrations.md`
3. Copy each prompt in order
4. Generate 3-4 variations per prompt
5. Pick the best, export at 1024×1024 minimum
6. Save with clear naming convention

Generate these 4 tab bar icons first:
- Chat (speech bubble)
- Explore (compass)
- Projects (folders)
- Account (user circle)

Then generate:
- 8 service tile icons
- 6 quick action icons
- 5 empty state illustrations
- 3 onboarding illustrations

### Step 8.2: Integrate into the app

Ask the AI:

```
I have 4 tab bar icons saved as PNG files. I'm uploading them now. 
Replace the placeholder tab bar icons with these. 
Display size: 28×28px.

[Upload tab-chat.png, tab-explore.png, tab-projects.png, tab-account.png]
```

Repeat for service tiles, quick actions, empty states, and onboarding.

---

## Phase 9: Connect to real data (day 19-21)

Replace all dummy data with real Supabase connections.

### Step 9.1: Set up Supabase

1. Go to supabase.com, create account
2. Create new project named "suprans-app"
3. Note the project URL and anon API key (under Settings → API)
4. In Replit, add these as environment variables (Tools → Secrets):
   - `SUPABASE_URL` = your project URL
   - `SUPABASE_ANON_KEY` = your anon key

### Step 9.2: Create database tables

Ask the AI:

```
Set up Supabase tables for the Suprans App. I need:

1. users table:
   - id (UUID, primary key)
   - phone (unique)
   - email
   - full_name
   - company_name
   - gstin
   - created_at
   - avatar_url

2. conversations table:
   - id (UUID)
   - type (enum: 'one_to_one', 'project_group', 'broadcast')
   - title
   - project_id (nullable, links to projects table)
   - created_at
   - last_message_at
   - last_message_preview

3. conversation_participants table:
   - conversation_id (FK)
   - user_id (FK)
   - role (enum: 'client', 'ops', 'vendor', 'admin')
   - joined_at

4. messages table:
   - id (UUID)
   - conversation_id (FK)
   - sender_id (FK)
   - content_type (enum: 'text', 'image', 'document', 'voice', 'system')
   - content (text)
   - media_url (nullable)
   - created_at
   - read_by (array of user_ids)

5. projects table:
   - id (UUID)
   - client_id (FK to users)
   - service_type (enum: 'chinaimports', 'chinaproducts', 'usdrop', etc.)
   - status (enum: stages specific to each service)
   - name
   - created_at
   - estimated_completion

Set up Row Level Security (RLS) so users can only see their own data.
```

The AI will generate SQL that you can run in Supabase's SQL editor.

### Step 9.3: Replace dummy data with Supabase queries

Ask the AI to systematically replace all hardcoded dummy data with real Supabase queries for:
- Conversations list
- Individual chat messages
- Projects list
- Projects detail
- Account profile

This is a 1-2 day process of working through each screen.

### Step 9.4: Add authentication

```
Add phone-based OTP authentication using Supabase Auth:

1. Onboarding flow now ends with "Sign in" screen
2. User enters phone number → Supabase sends OTP
3. User enters OTP → signed in
4. User details auto-populate from users table (or create new user if first time)

Also add:
- Phone number change flow (in Account tab)
- Sign out (in Account tab)
- Session persistence (user stays signed in across app relaunches)
```

---

## Phase 10: Push notifications (day 22)

### Step 10.1: Set up OneSignal or Firebase

1. Create OneSignal account (free tier up to 10,000 users)
2. Create app in OneSignal dashboard
3. Configure iOS (requires Apple Developer account) and Android (free)
4. Get OneSignal App ID

### Step 10.2: Integrate into the app

Ask the AI:

```
Integrate OneSignal push notifications into the Suprans App.

Triggers that should send a notification to the client:
- New message in any of their conversations
- Project stage transition
- Payment due date approaching (24 hours before)
- Payment overdue (24 hours after due)
- @mention in a group conversation
- New announcement from Suprans (if opted in)

Notification content:
- Title: sender name or conversation name
- Body: message preview or update description
- Tapping notification opens the relevant screen directly (deep link)

Add notification settings to the Account > Notifications screen:
- Toggle each notification type on/off
- Quiet hours (10pm - 7am)
- Weekend notifications
```

---

## Phase 11: AI assistance integration (day 23-24)

### Step 11.1: Connect to Anthropic API

1. Create Anthropic API key at console.anthropic.com
2. Add as `ANTHROPIC_API_KEY` environment variable in Replit

### Step 11.2: Build AI suggested replies

Ask the AI:

```
In the ops team view of chats (role: 'ops'), add an AI suggestions feature.

When a client sends a message:
1. Send the message + last 10 messages of context to the Claude API
2. Ask Claude: "You're helping an ops manager at Suprans respond to a 
   client message. Suggest 2-3 professional reply options, each 1-2 
   sentences, in a calm professional tone. Do not quote prices or commit 
   to timelines."
3. Display the suggestions as small pills above the input bar
4. Ops manager can tap a suggestion to auto-fill the input, edit, then send
5. Only show this to ops team members, not to clients

Use the Claude API via the official Anthropic SDK.
```

### Step 11.3: Build off-hours auto-reply

```
For incoming messages received between 10pm and 9am IST, or on weekends:

1. Immediately send a system message: "Thanks for your message! Priya will 
   respond first thing tomorrow morning. Her hours are 9am–7pm IST."
2. Below this message, show a button: "This is urgent"
3. If client taps "This is urgent": immediately notify the on-call ops team member
4. Otherwise, the message queues for next business morning — Priya will 
   see it when she opens the app

Label this auto-reply clearly so clients know it's automated.
```

---

## Phase 12: Testing and polish (day 25-28)

### Step 12.1: Self-testing

Use the app daily for a week as if you were a client:
- Send messages
- Create projects
- Receive notifications
- Browse services
- Update your profile

Note everything that feels slow, broken, or confusing.

### Step 12.2: Hand to 3-5 trusted testers

Get 3-5 people who will actually use the app:
- Ideally, existing Suprans clients willing to provide feedback
- Or team members within Suprans who will use the app operationally
- Install via TestFlight (iOS) or Internal Testing (Google Play)

Give them specific tasks:
- "Start a new conversation about custom sourcing"
- "Check on your active project"
- "Update your business address"

Watch them use it. Note every moment of hesitation.

### Step 12.3: Fix, iterate, repeat

Work through feedback with the AI. Every iteration makes the app noticeably better. Budget a full week here — this is where good apps become great apps.

---

## Phase 13: Ship to app stores (day 29-35)

### Step 13.1: iOS App Store

Requirements:
- Apple Developer account ($99/year)
- App icon at multiple sizes (Expo handles this automatically from a 1024×1024 source)
- Screenshots (5-10 screens showing key features)
- App description, privacy policy URL, support URL
- Age rating questionnaire

Process:
1. Build the app via Expo EAS Build: `eas build --platform ios`
2. Upload to App Store Connect: `eas submit --platform ios`
3. Fill out app metadata in App Store Connect
4. Submit for review
5. Apple review takes 1-3 days

### Step 13.2: Google Play Store

Requirements:
- Google Play Developer account ($25 one-time)
- Same assets as iOS

Process:
1. Build via Expo EAS: `eas build --platform android`
2. Upload to Google Play Console
3. Fill out metadata
4. Submit for review
5. Google review is usually under 24 hours

### Step 13.3: Post-launch monitoring

First week after launch:
- Watch crash reports in Sentry (set up in Phase 9)
- Watch user analytics in PostHog (set up in Phase 9)
- Monitor chat conversations daily for any issues
- Fix critical bugs within 24 hours, ship updates via Expo OTA

---

## Total timeline

- Setup: 1 day
- Shell + navigation: 1-2 days
- Chat tab: 4-5 days
- Explore tab: 2-3 days
- Projects tab: 2-3 days
- Account tab: 2 days
- Onboarding: 1 day
- Icons and illustrations: 2 days
- Real data integration: 2-3 days
- Push notifications: 1 day
- AI assistance: 2 days
- Testing and polish: 3-4 days
- App store submission: 1 week (mostly waiting for review)

**Total: 4-6 weeks of active work** to go from zero to a real, shipped mobile app.

---

## Critical mindset reminders

### Ship fast, polish later

The first version of the app doesn't need to be perfect. It needs to work well enough that real clients find it valuable, use it, and give you feedback. Every iteration after launch is worth 10 hours of speculative planning before launch.

### Do not skip testing with real users

Self-testing is necessary but not sufficient. You WILL miss things that your real clients catch in 5 minutes. Budget time for user testing between Phase 12 and 13.

### Reuse guides, don't re-argue decisions

The guide files (`01-app-brief.md` through `05-app-icons-and-illustrations.md`) contain locked decisions. When the AI tries to suggest changes to the design system, feature scope, or architecture, push back with the relevant guide. The AI doesn't know your business context — you do.

### Budget for Phase 2

After the initial launch, you'll quickly see what needs to be added:
- Additional service verticals
- Advanced chat features (voice calls, video)
- Offline-first mode for rural clients
- Hindi/regional language support
- Multi-user business accounts (team access to one company's projects)

None of this is in Phase 1. All of it is likely Phase 2. Plan for it, but don't build it before launch.

---

## When to hire help

If you get stuck at any point:

- **Design help**: Upwork/Fiverr, budget $500-1,500 for a UI/UX designer to polish screens
- **Technical help**: Toptal / Upwork, budget $30-100/hour for a React Native developer to help with complex integrations
- **Full rebuild**: If the Replit approach isn't working, a 2-3 person dev team could build this in 6-8 weeks for ₹8-15L. The guide files become their specification document.

The AI-assisted approach via Replit is the fastest and cheapest path. But it's not the only path. Don't get stuck — ship the product by whatever means work.
