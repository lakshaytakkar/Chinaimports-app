# Suprans App — Chat System Architecture

The chat tab is the most operationally complex part of the app. This document explains exactly how the chat system works: how messages route, how AI assists, how vendors get added to conversations, and how the ops team handles scale.

This is a functional specification. Every behavior described here needs to be built in the app.

---

## The fundamental idea

The Suprans App chat system replaces the current WhatsApp-based client communication entirely. Every client chat lives in the app. Every Suprans team conversation with a client flows through the app. The scattered WhatsApp experience becomes a single centralized, searchable, AI-assisted, audit-trailed system.

Clients don't feel the complexity. From their perspective:
- They open the app
- They message "Priya" (their ops manager) or a project-specific group
- They get responses
- It just works

Under the hood, a lot is happening.

---

## Conversation types

The app supports exactly three types of conversations.

### Type 1: One-to-one client chat

A single thread between a client and their assigned ops manager. This is the default — every new Suprans client gets one.

Participants:
- The client (individual user or multiple users from the same business account)
- The ops manager assigned to this client
- AI assistant (not a visible participant, but operates in the thread)

Use cases:
- General questions
- Service inquiries
- Non-project-specific discussions
- Relationship-building conversations

### Type 2: Project-specific group chat

A thread scoped to a specific project (RFQ, order, entity formation, store setup, etc.).

Participants:
- The client
- The ops manager
- Any service-specific specialist (e.g., Guangzhou buying agent for chinaimports projects)
- Vendors/partners when added to specific stages (e.g., freight forwarder when shipping stage begins)
- AI assistant (invisible but active)

Use cases:
- All communication about a specific ongoing project
- Sharing project documents, samples, quotes
- Payment milestones and approvals
- Stage transitions

### Type 3: Announcement broadcasts

One-way threads from Suprans to specific client segments.

Participants:
- Suprans admin (sender)
- Target client list (receivers)

Use cases:
- New product launches
- Policy changes
- Pricing updates
- Market intelligence ("New CBM rate active from next month")
- System maintenance alerts

Clients can reply, but replies auto-branch into private one-to-one chats with the ops manager (so a broadcast doesn't become a group chat).

---

## Auto-routing logic

When a client starts a new conversation, the system decides where it should go.

### New conversation flow

1. Client taps "New conversation" floating action button
2. Sees quick-start modal with service categories (chinaimports, chinaproducts, USDrop, etc.)
3. Picks a category OR types a free-form description
4. System processes the intent:
   - If a clear service match: creates a project-specific thread
   - If ambiguous: creates a general thread with the client's assigned ops manager
   - If client has no assigned ops: round-robin assignment to available ops team member

### Keyword-based routing (initial)

Simple keyword matching for Phase 1:
- "sourcing", "factory", "china", "import", "RFQ" → chinaimports thread
- "catalog", "wholesale", "order", "SKU" → chinaproducts thread
- "dropshipping", "store", "Shopify" → USDrop thread
- "company", "entity", "LLC", "formation" → Legal Nations thread
- "franchise", "retail" → EazyToSell thread
- "travel", "trip", "flight" → GoyoTours thread

### AI-based routing (Phase 2)

Replace keyword matching with actual intent classification. An AI model reads the client's free-form description and classifies it into the right service + urgency + complexity, routing to the appropriate team member and creating a project thread with relevant context.

### Escalation rules

A conversation auto-escalates when:
- No ops response within 2 hours of business day → escalated to senior ops
- No ops response within 6 hours of business day → escalated to Lakshay
- Client explicitly types "escalate" or "urgent" → immediate notification to senior ops
- Payment-blocked issue mentioned → escalated to finance team

---

## AI assistance in chat

AI is a background participant. It doesn't respond to clients directly (that feels robotic) but helps the ops team respond faster and better.

### Three AI functions

#### Function 1: Suggested replies for the ops team

When a client sends a message:
- AI analyzes the message + conversation context + project history
- Generates 2-3 suggested reply options in the ops manager's view
- Ops manager can tap a suggestion to send as-is, edit before sending, or write their own

Suggestions are styled as small chips above the input bar for the ops manager. Invisible to the client.

#### Function 2: Auto-reply during off-hours

When a client messages outside business hours (10pm–9am IST, weekends):
- AI sends an immediate acknowledgment: "Thanks for your message. Priya will respond first thing tomorrow morning — her hours are 9am–7pm IST. If this is urgent, tap 'Urgent' below and I'll alert the on-call team."
- If client taps "Urgent" → escalation to on-call ops team member
- Otherwise, message queues for next business morning

This keeps clients reassured without overpromising. The auto-reply is clearly labeled as AI.

#### Function 3: Context summarization

For ops team members picking up a conversation mid-stream:
- "Summarize this conversation" button available to team members
- AI produces a structured summary: client background, current needs, project stage, open action items, blockers
- Helps handoff between team members when someone is out of office

### AI boundaries

AI never:
- Quotes actual prices (humans quote prices, period)
- Commits to timelines (humans commit, period)
- Responds directly to client messages without ops team approval
- Makes legal/regulatory claims (BIS, GST, customs — humans only)
- Handles escalations

AI can:
- Suggest draft responses
- Auto-classify intent
- Answer simple FAQ questions during off-hours (clearly labeled as AI)
- Summarize context
- Flag urgency

---

## Vendor addition flow

When a project requires bringing in an external vendor (Guangzhou buying agent, freight forwarder, factory contact, etc.), the app handles this without the client having to manage the addition.

### How it works

When ops team triggers vendor addition:

1. Ops manager taps "Add participant" in the project chat's menu
2. Selects from pre-configured vendor list:
   - Jason Liu (Guangzhou Buying Agent)
   - Alex (Foshan Buying Agent)
   - Charlie Chen (HQ Dropshipping — Logistics)
   - Shirley (Shenzhen Watches)
   - Allen (Yiwu Sourcing)
   - Any Indian freight/CHA partners as configured
3. System sends vendor a push notification + SMS + email inviting them to the project thread
4. Vendor either downloads the app (first time) or opens existing app
5. Vendor sees the project thread with full context (previous messages visible)
6. System message appears in the thread: "Jason Liu has joined this conversation. Jason is our Guangzhou buying agent handling factory sourcing."

### Vendor access permissions

Vendors can:
- Read full thread history after joining
- Send messages and documents
- Upload photos/videos from factory floor
- Mark specific milestones as complete (QC passed, sample ready, etc.)

Vendors cannot:
- Access any other client threads or projects
- See billing information
- Access the client's account details
- Change project status (only propose status changes, which ops confirms)

### Vendor onboarding flow

For first-time vendors added:
1. Receive SMS/email: "You've been added to a Suprans project. Download the app to participate."
2. Download app, sign up with their phone number
3. System automatically links their account to the invited project
4. They land directly on the project thread

This removes the current awkwardness of "add Jason to this WhatsApp group, then figure out permissions."

---

## Message types supported

### Text
- Plain text
- Formatted text (bold, italic, links — Markdown-lite)
- @mentions of participants (notifies the mentioned person)
- Reactions (thumbs up, heart, question mark, etc.)

### Media
- Photos (single or multi-select)
- Videos (up to 50MB, compressed on upload)
- Voice notes (up to 2 minutes, auto-transcribed for search)
- Location share (for "where's the shipment" moments)

### Documents
- PDFs
- Excel/CSV files
- Word documents
- Image files shared as documents
- Max file size: 25MB

### Rich cards (system-generated)
- Payment request cards (with "Pay now" CTA)
- Product preview cards (when product link pasted)
- Project milestone cards (stage transitions)
- Invoice cards
- Quote comparison cards (from chinaimports RFQs)
- Calendar invite cards (for meetings/calls)

### System messages
- User joined/left
- Project stage transitions
- Payment confirmations
- Document uploads
- Typing indicators

---

## Search and history

### In-chat search

Each chat thread has a search icon in the top bar.
- Search text content across the thread
- Filter by message type (text, images, documents)
- Filter by sender
- Jump to matching message

### Global search

The universal search (from any tab) can find:
- Messages across all conversations
- Specific files or documents
- Contacts (ops team, vendors)
- Projects by name or ID

### Message history retention

- All messages retained indefinitely
- Media files retained for 2 years, then archived (still searchable, may take a moment to fetch)
- Voice transcripts stored separately for search, audio retained for 1 year

### Export for clients

Clients can export any conversation history:
- Request export from the chat menu
- System generates a PDF transcript + ZIP of all media
- Delivered to the client's email within 24 hours

This is a significant upgrade over WhatsApp's awkward export flow.

---

## Notifications

### Push notification rules

Client gets notified about:
- New message in any of their active threads
- Project stage transitions
- Payment milestones (due, paid, overdue)
- Ops team @mentions
- Announcements from Suprans (if opted in)

Client does NOT get notified about:
- Messages they sent (obviously)
- System messages (joined/left, typing indicators)
- Minor status updates (e.g., "AI suggested a reply" — that's internal only)

### Notification settings (granular)

Per-thread controls:
- Mute thread entirely
- Mute for 1 hour, 8 hours, 1 day
- Only show @mention notifications
- Silent mode (no sound, still visible in list)

Account-wide controls:
- Quiet hours (10pm–7am local time by default)
- Weekend notifications on/off
- Email notifications as fallback if app not opened within X hours
- SMS notifications for payment-due situations

### Ops team notifications

The ops team uses the same app with role-based views. Their notifications include:
- New client messages (prioritized by client status: VIP, standard, new)
- Escalations assigned to them
- Project stage transitions in their assigned projects
- AI suggestions awaiting their review
- Team @mentions from other ops members

---

## Offline handling

Mobile networks fail. The app handles this gracefully.

### When user loses connection

- Existing messages remain visible (cached locally)
- User can type and "send" a new message → message shows in thread with "Sending..." indicator
- When connection returns, message auto-sends
- If send fails permanently, user gets a retry option
- No data loss, no silent failures

### Banner indicator

When offline:
- Thin yellow banner at top: "No internet — messages will send when you reconnect"
- Banner disappears automatically on reconnection

### Sync behavior

- When app opens: sync last 50 messages per active thread
- Scroll up = fetch older messages on-demand
- Background sync every 5 minutes when app is in foreground
- Push notification triggers instant sync when app opened from notification

---

## Privacy and data handling

### End-to-end encryption considerations

For Phase 1: server-side encryption is sufficient. All messages stored encrypted at rest in Supabase.

For Phase 2: consider adding E2EE for sensitive project chats (procurement, legal entity formation) if client demand arises.

### Data access by Suprans team

- Only the assigned ops manager, project team members, and admins can read a client's threads
- Access is logged (audit trail of which team member accessed which conversation)
- Clients can request access logs ("Who on Suprans has read my chats in the last 30 days?")

### Client data export and deletion

- Clients can request full data export at any time (PDF + JSON)
- Clients can request account deletion — all data removed within 30 days (excluding legally-required records like invoices)
- Under DPDP Act compliance

---

## Operational load calculation

The app's chat system needs to handle:

- **5,000 active clients** within 12 months of launch
- **20 ops team members** handling conversations
- **Average client sends 8 messages per week**
- **Average ops team member handles 30 active conversations simultaneously**
- **Peak messaging load: 2,000 messages per hour during business hours**

Architecture must scale to these numbers from day one. Supabase Realtime can handle this at the free/Pro tier comfortably.

---

## Building this: technical notes for the dev team

The app's chat system isn't something to build from scratch.

### Recommended stack

- **Real-time messaging**: Supabase Realtime (built on Postgres + websockets)
- **Message storage**: Supabase Postgres table with RLS policies for access control
- **File/media storage**: Supabase Storage (buckets per project)
- **Push notifications**: OneSignal or Firebase Cloud Messaging
- **AI assistance**: Anthropic API (Claude) for reply suggestions and intent classification
- **Voice transcription**: OpenAI Whisper API or similar

### What to build vs what to buy

Build custom:
- The conversation UI (chat bubbles, input bar, message rendering)
- The vendor-addition flow
- The AI-assistance overlay
- The project-thread linking logic

Use existing libraries:
- Don't build your own websockets — use Supabase Realtime
- Don't build your own media upload — use Supabase Storage + a standard picker library
- Don't build your own push notification infrastructure — use OneSignal
- Don't build your own voice recording — use a native library (react-native-audio-recorder-player or Expo AV)

### Prioritization for MVP

Phase 1 (launch): one-to-one and project group chats, text + media + documents, push notifications, basic AI suggested replies for ops team, keyword-based routing

Phase 2 (month 2-3): vendor addition flow, announcements/broadcasts, AI intent classification, voice transcription search

Phase 3 (month 4+): advanced analytics for ops team, client NPS surveys in-chat, multi-language support

Don't try to ship everything at launch. Chat MVP is complete when a client can message Priya, get a reply, share a file, and receive a push notification about it. Everything else is iteration.
