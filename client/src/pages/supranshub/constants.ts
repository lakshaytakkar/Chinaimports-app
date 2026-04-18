export const SUPRANSHUB_AUTH_KEY = "supranshub_authed";

export type CtaType = "external" | "internal" | "tab";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  oneLiner: string;
  features: string[];
  ctaLabel: string;
  ctaType: CtaType;
  ctaTarget: string;
  monogram: string;
  tileColor: string;
  tileBg: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "legal-nations",
    name: "Legal Nations",
    subtitle: "Global Company Formation",
    oneLiner:
      "Your US business, incorporated in 48 hours — from ₹15,000 end-to-end.",
    features: [
      "Wyoming LLC formation at $149 (cheaper than Stripe Atlas)",
      "Multi-country formation (US, UK, UAE, Singapore)",
      "EIN, registered agent, operating agreement included",
      "US bank account setup guidance",
      "Annual compliance packages",
    ],
    ctaLabel: "Start My Formation",
    ctaType: "external",
    ctaTarget: "https://legalnations.com",
    monogram: "L",
    tileColor: "#1F4E8C",
    tileBg: "#E8EFF8",
  },
  {
    id: "usdrop-ai",
    name: "USDrop AI",
    subtitle: "USA Dropshipping Programme",
    oneLiner:
      "Launch your US Shopify store in 7 days — AI-powered research, suppliers, and mentorship built in.",
    features: [
      "AI-based winning product discovery",
      "Pre-vetted US and China supplier directory",
      "Store setup automation (Shopify + Stripe + apps)",
      "1:1 mentorship and community",
      "Ad creative and campaign templates",
    ],
    ctaLabel: "Join the Programme",
    ctaType: "external",
    ctaTarget: "https://usdrop.ai",
    monogram: "U",
    tileColor: "#6B3FA0",
    tileBg: "#EFE8F8",
  },
  {
    id: "china-imports",
    name: "China Imports",
    subtitle: "Custom Sourcing + Freight",
    oneLiner: "One-stop solution for all your sourcing needs from China.",
    features: [
      "Submit RFQ, get quotes from 3 factories in 48–72 hours",
      "Sample → Bulk → Delivery fully managed",
      "Freight forwarding, customs clearance, GST invoicing",
      "Live order tracking through 9 stages",
      "City-wise product explorer",
    ],
    ctaLabel: "Open China Imports",
    ctaType: "internal",
    ctaTarget: "/chinaimports",
    monogram: "C",
    tileColor: "#F03B3B",
    tileBg: "#FEF0F0",
  },
  {
    id: "china-products",
    name: "China Products",
    subtitle: "Ready Catalog Wholesale",
    oneLiner:
      "Pre-curated SKUs at China wholesale prices, landed in India in 21 days.",
    features: [
      "500+ curated products across home, gifting, toys, accessories",
      "MOQ 100 units per SKU — no custom manufacturing needed",
      "Fixed pricing, fixed lead times, no negotiation required",
      "Perfect for D2C, Amazon sellers, gifting companies",
      "GST-compliant invoicing",
    ],
    ctaLabel: "Browse Catalog",
    ctaType: "external",
    ctaTarget: "https://chinaproducts.in",
    monogram: "P",
    tileColor: "#B8420F",
    tileBg: "#FBEAE0",
  },
  {
    id: "eazytosell",
    name: "EazyToSell",
    subtitle: "Franchise Retail Model",
    oneLiner:
      "Open your own retail store without owning inventory — powered by our China supply chain.",
    features: [
      "Franchise kit from ~₹2–5L setup",
      "Products supplied at ₹80–100, sell at ₹199–299",
      "No warehousing on your side — we refill via sea LCL",
      "POS, barcoding, reorder automation included",
      "Store design + signage + staff training",
    ],
    ctaLabel: "Apply for Franchise",
    ctaType: "external",
    ctaTarget: "https://eazytosell.in",
    monogram: "E",
    tileColor: "#0E7A5C",
    tileBg: "#E1F2EC",
  },
  {
    id: "keeraft",
    name: "Keeraft",
    subtitle: "Luxury Furniture Import",
    oneLiner:
      "Designer furniture from Foshan, delivered to your home or project in India and Dubai.",
    features: [
      "Direct import from Foshan factories",
      "50%+ gross margin, luxury-tier finish",
      "White-glove delivery and installation (India + Dubai)",
      "Trade pricing for designers and hospitality projects",
      "Custom orders and full villa furnishing",
    ],
    ctaLabel: "Explore Keeraft",
    ctaType: "external",
    ctaTarget: "https://keeraft.com",
    monogram: "K",
    tileColor: "#5C4732",
    tileBg: "#F1EBE2",
  },
  {
    id: "la-bella-monte",
    name: "La Bella Monte",
    subtitle: "Premium Watches",
    oneLiner:
      "Curated imported watches at a fraction of premium brand pricing.",
    features: [
      "Direct import from Shenzhen manufacturers",
      "Premium-grade movements and finishes",
      "Gifting and corporate bulk orders",
      "Authentic warranty and service support",
    ],
    ctaLabel: "Shop Watches",
    ctaType: "external",
    ctaTarget: "https://labellamonte.com",
    monogram: "B",
    tileColor: "#1A1A1A",
    tileBg: "#ECECEC",
  },
  {
    id: "goyotours",
    name: "GoyoTours",
    subtitle: "Travel to China + SE Asia",
    oneLiner:
      "Sourcing trips to China, corporate tours, and curated group packages — handled end-to-end.",
    features: [
      "Business sourcing trips (Guangzhou, Yiwu, Foshan, Shenzhen)",
      "Leisure group tours (China, Thailand, Vietnam)",
      "Visa support, flights, hotels, interpreters",
      "Corporate off-sites",
      "One point of contact through the whole trip",
    ],
    ctaLabel: "Plan a Trip",
    ctaType: "external",
    ctaTarget: "https://goyotours.com",
    monogram: "G",
    tileColor: "#0F6E8A",
    tileBg: "#E0EEF3",
  },
  {
    id: "events",
    name: "Events",
    subtitle: "Workshops, Tours, Launches",
    oneLiner: "Every upcoming Suprans event — in one calendar.",
    features: [
      "Free and paid events",
      "Sourcing tours with dates and seats remaining",
      "Webinars on US formation, dropshipping, imports",
      "Franchise meetups and product showcases",
    ],
    ctaLabel: "Open Events",
    ctaType: "tab",
    ctaTarget: "/supranshub/events",
    monogram: "V",
    tileColor: "#C8A25A",
    tileBg: "#F5EBD8",
  },
  {
    id: "account-billing",
    name: "Account & Billing",
    subtitle: "Unified Billing",
    oneLiner:
      "One login, one invoice, one payment method — across every Suprans service.",
    features: [
      "See active subscriptions (USDrop, Legal Nations renewals, etc.)",
      "View all past invoices in one list (filter by product)",
      "Centralized payment methods (card, UPI, bank)",
      "GST invoices downloadable per transaction",
      "Support tickets visible across products",
    ],
    ctaLabel: "Open Account",
    ctaType: "tab",
    ctaTarget: "/supranshub/account",
    monogram: "A",
    tileColor: "#4A443E",
    tileBg: "#ECE7DD",
  },
];

export type EventItem = {
  id: string;
  title: string;
  type: "Tour" | "Webinar" | "Meetup" | "Launch";
  date: string;
  location: string;
  description: string;
};

export const EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "Guangzhou Sourcing Tour — June Cohort",
    type: "Tour",
    date: "Jun 12 – Jun 18, 2026",
    location: "Guangzhou & Foshan, China",
    description:
      "7-day curated sourcing tour with factory visits, interpreters, and freight planning.",
  },
  {
    id: "evt-2",
    title: "US LLC Formation Masterclass",
    type: "Webinar",
    date: "May 09, 2026 · 7:00 PM IST",
    location: "Online (Zoom)",
    description:
      "Live walkthrough of Wyoming LLC, EIN, US bank, and Stripe setup — Q&A included.",
  },
  {
    id: "evt-3",
    title: "EazyToSell Franchise Meetup",
    type: "Meetup",
    date: "May 24, 2026 · 11:00 AM",
    location: "Mumbai — BKC",
    description:
      "Meet existing franchise owners, see store economics live, and discuss your city.",
  },
  {
    id: "evt-4",
    title: "USDrop AI — Spring Cohort Launch",
    type: "Launch",
    date: "May 02, 2026 · 6:00 PM IST",
    location: "Online",
    description:
      "Cohort kickoff with mentor introductions, the 7-day store plan, and supplier walkthrough.",
  },
  {
    id: "evt-5",
    title: "Keeraft Designer Showcase — Dubai",
    type: "Launch",
    date: "Jun 03, 2026",
    location: "Dubai Design District",
    description:
      "Walk through the new Foshan luxury collection with our trade pricing reveal for designers.",
  },
];

export type ServiceItem = {
  id: string;
  product: string;
  status: "Active" | "Trial" | "Renewal Due" | "2 Active Orders";
  description: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "svc-1",
    product: "Legal Nations — Wyoming LLC",
    status: "Active",
    description: "Annual compliance up to date. Next renewal in 8 months.",
  },
  {
    id: "svc-2",
    product: "USDrop AI",
    status: "Trial",
    description: "Trial ends in 4 days. Upgrade to keep mentor access.",
  },
  {
    id: "svc-3",
    product: "China Imports",
    status: "2 Active Orders",
    description: "Order #CI-2841 in QC, Order #CI-2867 awaiting freight pickup.",
  },
  {
    id: "svc-4",
    product: "EazyToSell — Pune Store",
    status: "Renewal Due",
    description: "Quarterly restock plan needs approval by April 30.",
  },
];
