# Mobile App — Design System Rules

This document extends the main `02-design-system.md` with mobile-specific rules. The overall design philosophy stays the same — light theme, no popup animations, no monospace, no micro text, professional and serious. But mobile has its own requirements: big buttons, haptic feedback, consistent UI, fast-paced feel, Zomato/Swiggy-quality experience.

This document is the bridge between the web design system and the native app. Read the web design system first, then this.

---

## The three non-negotiable mobile principles

### Principle 1: Touch targets are large

Every tappable element is at least **48px × 48px** minimum. Most are 56px or larger. Zomato-style big buttons, not web-style compact buttons. Thumb-friendly even for people with large hands holding the phone one-handed.

No exceptions. If an element is smaller than 48px, it's not tappable (decorative only).

### Principle 2: Feedback is immediate

Every tap produces:
- **Visual feedback**: subtle scale-down (0.97) for 80ms on press, return to 1.0 on release
- **Haptic feedback**: light haptic on button press (iOS Haptic Feedback API, Android Haptic Feedback)
- **Color feedback**: button background darkens to pressed state instantly (not a transition)

If a tap takes longer than 200ms to respond, show a loading indicator. Users must always know the system received their input.

### Principle 3: Motion is purposeful, never decorative

Mobile native feels faster than web because of smart motion — not because of more motion. We allow:
- **Screen transitions**: native push/pop animations (iOS slide-from-right, Android activity transitions). 250ms standard.
- **Modal presentations**: bottom sheets slide up from bottom, 300ms with spring physics
- **Pull-to-refresh**: standard native pattern
- **Tab transitions**: instant — no fade between tabs
- **List item changes**: 150ms fade for insert/remove animations
- **Haptic-synced animations**: tactile + visual together

We forbid:
- Scroll-linked parallax
- Hero video backgrounds
- Animated illustrations that loop
- "Fun" micro-interactions (confetti, dancing checkmarks, springy text)
- Loading screens longer than 1 second without content showing

---

## Touch target sizing rules

| Element | Minimum size | Preferred size |
|---|---|---|
| Primary buttons | 56px height | 56-64px height |
| Secondary buttons | 48px height | 48-52px height |
| Tab bar icons | 44×44 tappable area | 72px tab height |
| List rows | 60px height | 72-88px height |
| Form inputs | 52px height | 52-56px height |
| Icon buttons | 44×44 | 48×48 |
| Avatar circles | 40px diameter | 48-64px |
| Switches & toggles | 32×20 (iOS standard) | 32×20 |
| Chat message bubbles | no min height, but 40px vertical padding | same |

### Spacing around tap targets

- Minimum 8px gap between two tappable elements (prevents accidental taps)
- 16px gap for primary action groups
- 24px gap between sections

---

## Typography for mobile

Same font as web: **Inter Tight**. But the scale is different because mobile reading distance and screen size change what's comfortable.

### Mobile type scale

| Role | Size | Line height | Weight |
|---|---|---|---|
| Display (hero screens) | 32px | 1.1 | 600 |
| H1 (screen title) | 24px | 1.2 | 600 |
| H2 (section title) | 20px | 1.3 | 600 |
| H3 (card title) | 17px | 1.35 | 600 |
| Body large | 17px | 1.5 | 400 |
| Body | 15px | 1.5 | 400 |
| Body medium | 15px | 1.5 | 500 |
| Caption | 13px | 1.4 | 400 |
| Tab label | 11px | 1.2 | 500 |

**Minimum: 13px** (slightly smaller than web's 14px minimum because mobile reading distance is closer). Tab labels at 11px are the only exception, and they're always paired with a 28px icon for recognition.

**Body text is 15px on mobile**, not 16px (web). This is because mobile screens are closer to the eye and 16px feels oversized.

### Headline italics (for marketing screens only)

On the Explore tab's hero screens and service detail pages, the same two-part headline with italics works on mobile. Keep headlines to 5 words maximum on mobile — anything longer wraps awkwardly.

---

## Color usage on mobile

Same color system as web. All the hex values from `02-design-system.md` apply.

### Mobile-specific color notes

- **Status bar**: white background on most screens, brand red when inside an active chat
- **Tab bar background**: white always
- **Sheet/modal background**: white with rounded top corners (16px radius)
- **Ripple effects on Android**: use brand-red 20% opacity for primary actions, gray 20% for secondary

### Dark mode

**Not in launch version.** The design system is light theme only. If you add dark mode later (Phase 2), it becomes a full design review — not a simple color swap.

---

## Layout patterns

### Screen edges

- 16px horizontal padding on all content (standard iOS/Android edge)
- Exception: full-width images, hero banners, horizontal scrollers edge-to-edge
- 24px between stacked cards/sections

### Safe areas

Always respect:
- iOS notch / Dynamic Island at top
- Home indicator at bottom (34px additional bottom padding)
- Android status bar (usually 24px)
- Android navigation bar (when 3-button nav is used)

Use native safe-area-insets (available in React Native, Flutter, SwiftUI, etc.)

### Grid systems

Mobile is mostly single-column. Two-column grids only for:
- Tile-based navigation (Explore tab service grid)
- Stat cards (2×2 in Account overview)
- Category selectors (2 columns of tiles)

Never more than 2 columns on phone. Tablet gets up to 3 columns on wider screens.

---

## Gestures

### Supported native gestures

- **Tap**: primary interaction
- **Long-press**: contextual menu (copy message, forward, delete)
- **Swipe-to-delete**: left-swipe on conversation/project rows reveals delete + archive
- **Pull-to-refresh**: on all list screens
- **Swipe-back**: iOS edge swipe to go back (default)
- **Pinch-to-zoom**: on images and product previews
- **Double-tap**: like/react in chat (reaction emoji)

### Gestures NOT to use

- Shake to undo (unreliable)
- 3D Touch / Force Touch (deprecated/inconsistent across devices)
- Custom swipe patterns buyers have to learn
- Rotation-based interactions
- Draw-to-search
- Motion-based UI (no tilt/shake navigation)

---

## Native component choices

We don't build custom mobile components when native ones exist. Use OS defaults for:
- Date/time pickers
- Dropdowns (iOS picker wheel, Android Material dropdown)
- Switches/toggles
- Segmented controls
- Action sheets
- Alert dialogs
- Photo picker
- Document picker
- Share sheet

We customize:
- Buttons (brand color, size)
- Cards (our radius, padding, shadow)
- Input fields (our padding, border style)
- Chat bubbles (fully custom)
- Tab bar (custom styling on native tab bar)

---

## Icons on mobile

See dedicated doc: `05-app-icons-and-illustrations.md`. Summary:

- Tab bar icons: custom 3D-rendered icons, generated via nano banana, at 28px display size
- Navigation and UI icons: Lucide icon library, outline style, 20-24px size
- Empty state illustrations: custom 3D illustrations, generated via nano banana, 200-240px display size
- Service tile icons: custom 3D icons per Suprans vertical, 48-64px

---

## Chat-specific design rules

Chat is the most-used screen. Specific rules:

### Message bubble sizing

- Client messages (right-aligned): max-width 78% of screen
- Team messages (left-aligned): max-width 78% of screen
- Minimum bubble width: 80px (to avoid tiny "ok" bubbles looking strange)
- Bubble padding: 12px vertical, 16px horizontal
- Border-radius: 18px with the corner closest to the sender reduced to 6px

### Avatar display

- 32px circular avatar next to the first message in a sequence from same sender
- Subsequent messages within 2 minutes from same sender: no avatar, no name label
- "Typing indicator": show three animated dots with avatar for 2+ seconds of typing

### Input bar behavior

- Stays pinned to bottom of screen above tab bar
- Expands up to 4 lines as user types more
- Keyboard appearance pushes chat content up, keeps input bar visible
- "Send" button only appears when text is non-empty (keeps bar clean)

### Notifications within chat

- New message when chat is open: silent haptic, instant append to list, auto-scroll if user is at bottom
- New message when chat is open but user scrolled up: show "New messages ↓" floating button
- New message from different chat: banner notification at top that taps to switch chats

---

## Performance expectations

Mobile users expect:
- **App launch to usable screen: under 2 seconds** on a mid-range Android device
- **Tab switches: instant** (pre-rendered, no loading)
- **Chat scrolling: 60fps** on any supported device
- **List scrolling: 60fps**, smooth momentum
- **Image loading: progressive** — show placeholder, then low-res, then full-res

If these targets are missed, the app "feels slow" even if technically functional. Prioritize these.

---

## Accessibility for mobile

Same rules as web plus:
- **VoiceOver (iOS) / TalkBack (Android)**: every element has accessibility label
- **Dynamic type support**: text scales when users increase system font size (up to 120%)
- **High contrast mode**: when enabled, borders become more visible, shadows deepen
- **Reduced motion mode**: respected, animations cut to 0ms transitions
- **Voice control**: all buttons named clearly so voice users can say "tap [button name]"

---

## Platform-specific differences

### iOS-specific

- Blur effect on modals (UIBlurEffect)
- Swipe-from-left-edge to go back
- Haptic Feedback API
- Safe area for Dynamic Island
- SF Symbols as secondary icon option (Lucide is primary)

### Android-specific

- Material ripple effects on tap
- System back button behavior
- Android haptics (lighter than iOS, but still used)
- Respect system dark mode setting (when we add dark mode)
- FAB (Floating Action Button) for primary action on Android screens where appropriate

### Web (if we ever add it)

The same Suprans App could eventually be wrapped as a PWA for desktop use, but mobile is primary for now. Design decisions should work naturally on mobile first.

---

## What the app should feel like

Target references for overall feel:
- **Zomato / Swiggy** — fast, colorful, responsive, very Indian-market-tuned
- **Linear mobile app** — restrained, serious, polished
- **Revolut** — fintech-quality, trust-heavy
- **Notion mobile** — document-centric, clean
- **Slack** — chat-first, multi-workspace

What to avoid:
- **Feels like a web page** — if users can tell the screen is a webview wrapped in an app shell, we've failed
- **Feels like 2015** — dated patterns, small buttons, no haptics, no native transitions
- **Feels cluttered** — too many buttons, too much on one screen, cramped layouts
- **Feels slow** — any interaction taking 300ms+ without feedback

---

## The "would Zomato do this" test

When making any mobile-specific design decision, ask: **"Would Zomato do this?"**

Zomato has optimized their mobile app for the Indian market better than almost any other. Big buttons. Clear CTAs. Haptic feedback. Fast transitions. Large icons. Generous spacing. Minimal cognitive load. The app tells you what to tap next.

We're not copying Zomato visually — we're more restrained, more serious, more B2B. But the mobile haptics and interaction quality should match Zomato's bar. That's the Indian user expectation for "good app."

If a design decision would make Zomato feel worse, reject it.
