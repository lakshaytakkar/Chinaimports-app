# App Icons and Illustrations — Nano Banana Generation Guide

The Suprans App needs its own set of 3D icons and illustrations distinct from web icons. Mobile apps use richer, more tactile visual language — think Zomato's vibrant food icons, Swiggy's dish representations, Notion's playful-but-serious empty states.

We generate all of these using nano banana (Google's image generation model, the Gemini image mode in the Suprans workflow). This document contains every prompt needed, organized by use case.

Read `images/01-gemini-prompting-rules.md` first for the master prompting rules — those apply here too.

---

## When to use 3D icons vs flat icons

### 3D rendered icons (nano banana generated)
- Tab bar icons (4 icons for the 4 main tabs)
- Service tiles on Explore tab (8 Suprans verticals)
- Quick action chips
- Empty state illustrations
- Onboarding screen illustrations
- Feature callout icons in marketing sections

### Flat outline icons (Lucide icon library)
- Navigation (back arrows, close X, chevrons)
- Action icons in toolbars (search, filter, more menu)
- Form field icons
- Small inline icons within body text
- Status indicators (checkmark, warning, info)

The rule: anything that's a navigation or UI utility stays flat (Lucide). Anything that's a "thing" being represented (a service, a concept, an empty state) gets the 3D treatment (nano banana).

---

## Style direction for 3D icons

### The target aesthetic

Looking at reference apps:
- **Zomato**: rich, saturated 3D food illustrations
- **Swiggy**: similar — glossy, playful, rich shadows
- **Notion**: 3D clay-rendered objects, less saturated
- **Linear**: minimal geometric 3D shapes

We want a mix of Notion's clay-render restraint with Zomato's clarity and Suprans' warm palette. Not cartoonish, not sterile — somewhere between serious-professional and approachable-modern.

### Color palette for 3D icons

Primary colors for icon bodies:
- Warm cream `#F2ECE0` (for softer subjects)
- Brand red `#F03B3B` (for primary action icons)
- Deep navy `#1E3A5F` (for professional/serious icons)
- Earth brown `#8B4513` (for warm/product icons)
- Warm amber `#D4A574` (for secondary warm accents)
- Soft green `#7BA05B` (for success/growth themes)

Avoid:
- Neon or saturated colors (keeps the serious B2B feel)
- Dark-mode-style blacks
- Bright yellows and electric blues (too consumer-app)

### Lighting and material

All 3D icons should look like:
- **Soft clay-like surface** (not glossy plastic, not metallic)
- **Warm directional light from top-left** (30–45 degree angle)
- **Gentle ambient shadow on the right side** (not harsh)
- **Subtle ground contact shadow** below the object
- **No reflections or mirror surfaces**

### Composition rules

- Icon subject centered in the frame (different from our web imagery rules — icons need to be centered for visual balance in the UI)
- Transparent background (PNG) or solid warm cream `#F2ECE0` (renders well on white UI)
- Generous whitespace around the subject (10-15% padding on all sides)
- One subject per icon — no crowded compositions
- Proportions slightly exaggerated for clarity at small sizes (a chat bubble icon should look like a chat bubble even at 28px)

---

## Master prompt template for 3D icons

Use this template for every icon, swapping the subject:

```
A [SUBJECT] rendered as a soft clay-like 3D icon. [DESCRIPTION OF THE SUBJECT]. 
Warm directional light from the top-left at 30 degrees. 
Gentle shadow on the lower-right side. 
Subtle ground shadow below the object. 
Color palette: [SPECIFIC COLORS FOR THIS ICON] with warm cream #F2ECE0 highlights. 
Centered composition on a transparent background (or warm cream background). 
Slightly exaggerated proportions for clarity at small sizes. 
Minimalist, modern, serious but approachable aesthetic. 
Similar style to Notion 3D illustrations or premium app icon sets.

Avoid: harsh reflections, glossy plastic finish, neon or saturated colors, 
cartoonish proportions, metallic surfaces, multiple subjects, cluttered 
composition, hallucinated text or logos, decorative details that don't serve the concept.
```

---

## Tab bar icons (4 required)

Generated at 512×512px source, displayed at 28×28px in-app. Over-render so it's crisp when downsampled.

### Icon 1: Chat (Chat tab)

**Purpose:** Bottom tab bar, chat tab

```
A speech bubble rendered as a soft clay-like 3D icon. Single rounded rectangular 
speech bubble with a small pointed tail on the bottom-left. Warm cream #F2ECE0 
body with a subtle warm shadow interior, and a small circular brand-red dot 
indicator on the upper-right corner (representing a notification). 
Warm directional light from the top-left at 30 degrees. 
Gentle shadow on the lower-right side. 
Subtle ground shadow below the object. 
Centered composition on a transparent background. 
Slightly exaggerated proportions for clarity at small sizes.

Avoid: text inside the bubble, multiple bubbles, glossy plastic, neon colors, 
typography, branded logos.
```

### Icon 2: Compass (Explore tab)

**Purpose:** Bottom tab bar, explore tab

```
A compass rendered as a soft clay-like 3D icon. Circular compass with a 
navigation needle pointing slightly to the upper-right (northeast direction). 
Warm cream #F2ECE0 body, brand-red needle with a darker red tip, subtle 
warm beige face. Small cardinal direction marks at top, bottom, left, right 
(simple shapes, not letters). 
Warm directional light from the top-left at 30 degrees. 
Gentle shadow on the lower-right side. 
Subtle ground shadow below the object. 
Centered composition on transparent background. 
Slightly exaggerated proportions.

Avoid: lettering (no N/S/E/W letters), compass rose complexity, 
metallic finish, ornate details, multiple needles.
```

### Icon 3: Briefcase or Package (Projects tab)

**Purpose:** Bottom tab bar, projects tab

```
A simple stacked document folder rendered as a soft clay-like 3D icon. 
Two rectangular folders stacked slightly offset, with one small tab 
protruding. Warm earth brown #8B4513 primary folder with deeper shadow 
tones, warm cream #F2ECE0 accent stripe along the top edge. 
Warm directional light from the top-left at 30 degrees. 
Gentle shadow on the lower-right side. 
Subtle ground shadow below the object. 
Centered composition on transparent background.

Avoid: paper contents visible inside, realistic paper texture, 
multiple documents spilling out, filing cabinet details, labels.
```

### Icon 4: User circle (Account tab)

**Purpose:** Bottom tab bar, account tab

```
A simplified person silhouette within a circular frame, rendered as a 
soft clay-like 3D icon. Circular frame in warm cream #F2ECE0, with a 
deep-navy #1E3A5F silhouette of a head and shoulders inside. 
The silhouette is simplified (no facial features), rounded and friendly. 
Warm directional light from the top-left at 30 degrees. 
Gentle shadow on the lower-right side. 
Subtle ground shadow below the object. 
Centered composition on transparent background.

Avoid: photorealistic human features, hair details, facial expressions, 
multiple people, gender indicators, ethnic markers (keep genderless and 
ethnically neutral for universal appeal).
```

---

## Service tile icons (8 required)

These appear on the Explore tab's service grid. Displayed at 48×48px. Generated at 512×512.

### Icon 5: USDrop AI (Dropshipping)

```
A small shopping cart with a tiny glowing brain inside it, rendered as a 
soft clay-like 3D icon. Shopping cart in deep navy #1E3A5F, with a small 
soft-glowing orb in warm cream #F2ECE0 representing AI-powered operations. 
Shopping cart has rounded edges, simplified wheels. 
Warm directional light from top-left at 30 degrees. 
Gentle shadow on lower-right. 
Subtle ground shadow. 
Centered composition.

Avoid: realistic AI brain anatomy, visible circuitry, sci-fi glow effects, 
cartoon shopping bags instead of cart, groceries visible in cart.
```

### Icon 6: Legal Nations (Entity Formation)

```
A rolled document scroll with a simple wax-seal style dot on it, rendered 
as a soft clay-like 3D icon. Warm cream #F2ECE0 scroll body with natural 
paper texture (soft, not wrinkled), a small deep-navy #1E3A5F circular 
seal on one end. Scroll tied with a thin warm-beige ribbon. 
Warm directional light from top-left at 30 degrees. 
Gentle shadow on lower-right. 
Subtle ground shadow. 
Centered composition.

Avoid: text or legal language visible on scroll, ornate wax seal designs, 
signature-style flourishes, flag or crest imagery.
```

### Icon 7: China Imports (Custom Sourcing)

```
A simplified shipping container with a small compass-like directional 
marker rendered as a soft clay-like 3D icon. Container in warm earth 
brown #8B4513 with brand-red accent stripe, a subtle arrow or directional 
indicator on the side pointing forward. Rounded edges, simplified 
proportions for clarity at small sizes. 
Warm directional light from top-left at 30 degrees. 
Gentle shadow on lower-right. 
Subtle ground shadow. 
Centered composition.

Avoid: realistic container corrugation detail, shipping company logos, 
text or numbers on the container, crane or port background elements.
```

### Icon 8: China Products (Wholesale Catalog)

```
A small stack of three neatly folded product items (suggesting inventory) 
rendered as a soft clay-like 3D icon. Top layer in warm cream #F2ECE0, 
middle in warm amber #D4A574, bottom in deep navy #1E3A5F. Neatly stacked, 
slightly offset for depth. Rounded soft edges on each item. 
Warm directional light from top-left at 30 degrees. 
Gentle shadow on lower-right. 
Subtle ground shadow. 
Centered composition.

Avoid: specific product details (not clothing, not electronics), 
price tags visible, hangers or display stands, realistic textile texture.
```

### Icon 9: EazyToSell (Franchise Retail)

```
A simplified storefront icon rendered as a soft clay-like 3D icon. Small 
rectangular building with a triangular awning on top (suggesting a shop). 
Warm cream #F2ECE0 building walls, brand-red awning, warm-earth #8B4513 
door in the center. Rounded edges, simplified proportions. 
Warm directional light from top-left at 30 degrees. 
Gentle shadow on lower-right. 
Subtle ground shadow. 
Centered composition.

Avoid: signage with text, windows with products visible inside, 
multiple buildings, realistic architectural detail, customers outside.
```

### Icon 10: GoyoTours (Business Travel)

```
A small airplane in a stylized minimal form, rendered as a soft clay-like 
3D icon. Airplane body in warm cream #F2ECE0 with subtle deep-navy #1E3A5F 
accent on the wings. Positioned at a slight upward angle suggesting flight. 
Clouds or trajectory lines are NOT included (kept clean). 
Warm directional light from top-left at 30 degrees. 
Gentle shadow on lower-right. 
Subtle ground shadow. 
Centered composition.

Avoid: realistic airplane detail (windows, engines visible), airline logos, 
cartoon eyes or face on the plane, motion lines, clouds or sky background, 
passports or travel doc props.
```

### Icon 11: Keeraft (Furniture Import)

```
A simplified wooden chair rendered as a soft clay-like 3D icon. Simple 
modernist chair form: rectangular seat, vertical backrest, four legs. 
Warm earth brown #8B4513 primary tone with subtle warmer cream #F2ECE0 
accent on the seat cushion. Rounded edges, minimalist proportions. 
Warm directional light from top-left at 30 degrees. 
Gentle shadow on lower-right. 
Subtle ground shadow. 
Centered composition.

Avoid: specific furniture brand styles, upholstery texture detail, 
multiple chairs, side tables, carpet beneath.
```

### Icon 12: La Bella Monte (Watches & Luxury)

```
A simplified wristwatch (watch face only, no strap) rendered as a soft 
clay-like 3D icon. Round watch face in warm cream #F2ECE0 with a deep-navy 
#1E3A5F bezel/ring around it. Simple hour markers suggested as small dots 
(not letters or numbers). Hour and minute hand shown at 10:10 position 
(classic watch product shot angle). 
Warm directional light from top-left at 30 degrees. 
Gentle shadow on lower-right. 
Subtle ground shadow. 
Centered composition.

Avoid: readable numbers on dial, brand logos, leather strap detail, 
complicated chronograph sub-dials, metallic reflections.
```

---

## Empty state illustrations (5 required)

These appear when a list screen has no items. Larger than icons (240×240 display, 1024×1024 generated).

### Illustration 1: No conversations yet

**Used on:** Empty Chat tab

```
A cozy illustration of a closed laptop on a warm wooden desk with a steaming 
mug of chai next to it, rendered in soft clay-like 3D style. Laptop in warm 
cream #F2ECE0, chai mug in deep navy #1E3A5F with subtle white steam rising, 
wooden desk in warm earth brown #8B4513. Soft afternoon light from the upper-left. 
The scene suggests readiness and calm, not activity. 
Slightly overhead 3/4 angle view. 
Minimalist, modern, serious but approachable aesthetic. 
Similar style to Notion's 3D empty state illustrations.

Avoid: open laptop with visible screen content, multiple objects cluttering 
the scene, smartphone or other tech items, papers, photorealistic detail.
```

### Illustration 2: No projects yet

**Used on:** Empty Projects tab

```
A clean, empty clipboard with a fountain pen resting on it at a slight angle, 
rendered in soft clay-like 3D style. Clipboard in warm earth brown #8B4513 
with a subtle warm cream #F2ECE0 paper surface (blank, no text). Brass-toned 
fountain pen diagonally across the clipboard. Soft afternoon light from 
upper-left. Minimalist composition, centered on a transparent background. 
Similar style to premium app illustrations.

Avoid: text or writing visible on the paper, clipboard clip detail 
excessively rendered, multiple pens, realistic paper texture, brand logos.
```

### Illustration 3: No invoices yet

**Used on:** Empty Billing screen

```
A small stack of three plain envelopes tied together with a warm beige ribbon, 
rendered in soft clay-like 3D style. Envelopes in warm cream #F2ECE0 with 
deep-navy #1E3A5F edge highlights, the top envelope is slightly lifted. 
Ribbon in warm earth beige. Soft afternoon light from upper-left. 
Minimalist composition, centered on transparent background.

Avoid: visible addresses or stamps, wax seals, text on envelopes, 
scattered papers, multiple stacks.
```

### Illustration 4: No search results

**Used on:** Empty search results screen

```
A magnifying glass over a simple blank document, rendered in soft clay-like 
3D style. Magnifying glass with deep-navy #1E3A5F handle and warm cream 
#F2ECE0 lens rim, clear lens area. Blank document beneath in warm cream, 
no text or content visible. Composition at a slight angle suggesting 
exploration. Soft afternoon light from upper-left. 
Minimalist, centered on transparent background.

Avoid: text visible through magnifying glass, question marks, confused-face 
imagery, multiple documents, icons or symbols inside.
```

### Illustration 5: Offline / error state

**Used on:** When app can't connect

```
A simple closed envelope with a small disconnected-looking dashed line 
below it, rendered in soft clay-like 3D style. Envelope in warm cream 
#F2ECE0 with subtle deep-navy #1E3A5F edge. Below it, a faint broken 
dashed line in muted warm gray suggesting lost connection. Soft afternoon 
light. Minimalist, centered on transparent background. 
Tone: calm and reassuring, not alarming.

Avoid: warning symbols, red X marks, alarm icons, sad face, error 
symbology, crossed-out imagery, tech failure clichés.
```

---

## Onboarding screen illustrations (3 required)

For the 3-screen onboarding carousel when user first opens the app.

### Onboarding 1: Welcome

```
An open palm holding a small warm-cream Suprans logo or symbol, rendered 
in soft clay-like 3D style. Palm positioned facing up, holding something 
gently. The object held is a simple geometric shape in brand-red #F03B3B 
(avoid trying to render the actual logo unless it works cleanly — default 
to a generic circular or rounded-square shape). Soft warm light. 
Positioned off-center with negative space for onboarding copy overlay 
on the right or top. Minimalist, welcoming, trust-conveying.

Avoid: realistic hand anatomy issues, many fingers, gender-specific hand 
features, multiple objects held, jewelry on hand, holding cash or products.
```

### Onboarding 2: Chat with your team

```
Two abstract speech-bubble shapes facing each other with a gentle connection 
line between them, rendered in soft clay-like 3D style. One bubble in warm 
cream #F2ECE0 (representing the client), the other in brand-red #F03B3B 
(representing Suprans team). They're positioned diagonally with the 
client bubble in the upper-left and team bubble in the lower-right, 
suggesting conversation flow. Soft warm light. 
Centered composition, room for overlay copy.

Avoid: visible text inside bubbles, multiple bubbles beyond two, 
comic-style thought clouds, cartoon characters.
```

### Onboarding 3: Everything in one place

```
A simple layered composition of 3-4 different soft geometric shapes 
representing different Suprans services (a small box, a document, a package, 
a tag) arranged in a gentle pile or semi-circle, rendered in soft clay-like 
3D style. Each shape in a different warm color from the palette: warm cream, 
earth brown, deep navy, brand red. Suggests abundance and unification 
without specificity. Soft warm light, centered composition.

Avoid: too many objects (keep to 3-4 max), cluttered arrangement, 
identifiable service-specific imagery that might confuse, realistic 
product photography.
```

---

## Quick action icons (6 small circular icons)

For the Explore tab's quick action horizontal scroll row. Smaller size (56×56 display, 256×256 generated), simpler subjects.

```
Prompts follow the same template but with these subjects:

- Quick Action 1: "Start RFQ" — A simple pencil writing on paper form
- Quick Action 2: "Browse catalog" — A small book with a bookmark
- Quick Action 3: "Form entity" — A simple government-style building silhouette
- Quick Action 4: "Track shipment" — A small package with a GPS pin above it
- Quick Action 5: "Help center" — A simple open book or chat bubble with question mark
- Quick Action 6: "My invoices" — A simple receipt scroll

Each prompt follows the same soft clay-like 3D style with warm palette, 
soft lighting, centered composition.
```

---

## Iteration workflow for nano banana

Nano banana (Gemini image generation) requires iteration. Plan for 3-5 generations per icon.

### Workflow

1. Paste the prompt into nano banana
2. Generate 4 variations
3. Pick the closest match
4. Note what's wrong (too dark, wrong color, weird proportions)
5. Refine the prompt with specific corrections:
   - "Make the warm cream lighter"
   - "Reduce the shadow intensity"
   - "Make the compass needle point straight up instead"
6. Regenerate 4 more variations
7. Select final
8. Export at highest resolution (usually 1024×1024 for icons, 2048×2048 for illustrations)

### Common issues and fixes

| Issue | Fix in prompt |
|---|---|
| Too saturated/vibrant | Add "muted, editorial, restrained color palette" |
| Icon looks like 2D flat art | Add "3D rendered, soft clay-like material, subtle shadow depth" |
| Icon is too cartoonish | Add "serious professional aesthetic, premium app icon quality" |
| Icon has weird text | Add "no readable text, no typography, no letters or numbers" |
| Icon is off-center | Add "perfectly centered composition, balanced symmetry" |
| Background isn't transparent | Specify: "transparent PNG background" or "solid cream #F2ECE0 background" |

### File handling

- Generate all icons at 1024×1024 minimum
- Export as PNG with transparency
- Name files clearly: `tab-chat-icon.png`, `empty-state-conversations.png`, etc.
- Keep prompts saved alongside the generated file for future re-generation if style needs to change

### If nano banana doesn't deliver

Backup plan if generation quality doesn't meet the bar:

1. **Hire a 3D illustrator on Fiverr or Upwork** — provide them with these prompts as briefs, budget $20-50 per icon. Faster for final polish.
2. **Use existing icon packs** — Flaticon has 3D icon sets under Premium license, $10-20 for a whole set. Less custom but reliable quality.
3. **Fall back to Lucide flat icons** — if time is critical, the app launches with flat icons on tabs, and 3D icons arrive in update 1.1.

---

## File organization

Maintain this folder structure for all generated app assets:

```
app-assets/
├── icons/
│   ├── tab-bar/
│   │   ├── tab-chat.png
│   │   ├── tab-explore.png
│   │   ├── tab-projects.png
│   │   └── tab-account.png
│   ├── services/
│   │   ├── service-usdrop.png
│   │   ├── service-legalnations.png
│   │   ├── service-chinaimports.png
│   │   ├── service-chinaproducts.png
│   │   ├── service-eazytosell.png
│   │   ├── service-goyotours.png
│   │   ├── service-keeraft.png
│   │   └── service-labellamonte.png
│   └── quick-actions/
│       ├── action-rfq.png
│       ├── action-catalog.png
│       ├── action-formation.png
│       ├── action-tracking.png
│       ├── action-help.png
│       └── action-invoices.png
├── illustrations/
│   ├── empty-states/
│   │   ├── empty-conversations.png
│   │   ├── empty-projects.png
│   │   ├── empty-invoices.png
│   │   ├── empty-search.png
│   │   └── error-offline.png
│   └── onboarding/
│       ├── onboarding-welcome.png
│       ├── onboarding-chat.png
│       └── onboarding-services.png
└── prompts/
    └── (markdown files with the prompts used, for version history)
```

Store the original prompts alongside each generated asset so future team members can re-generate or modify consistently.
