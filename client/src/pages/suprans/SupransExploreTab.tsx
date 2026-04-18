import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  Search,
  MapPin,
  Plus,
  Headphones,
  FileText,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  Check,
  Package,
  Ship,
  ShieldCheck,
  ClipboardCheck,
  Warehouse,
  Truck,
  Banknote,
  BookOpen,
} from "lucide-react";

interface HeroSlide {
  id: string;
  headline: string;
  subCopy: string;
  gradientFrom: string;
  gradientTo: string;
  cta: string;
}

interface QuickAction {
  id: string;
  label: string;
  Icon: React.ElementType;
}

interface Service {
  id: string;
  name: string;
  description: string;
  Icon: React.ElementType;
  color: string;
  bgLight: string;
  detailDescription: string;
  howItWorks: string[];
  whySuprans: string[];
}

interface UpdateCard {
  id: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  title: string;
  body: string;
  timestamp: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "h1",
    headline: "Source Quality Products from China",
    subCopy: "Access 10,000+ verified suppliers. We handle negotiation, sampling & QC.",
    gradientFrom: "#4F46E5",
    gradientTo: "#7C3AED",
    cta: "Learn more",
  },
  {
    id: "h2",
    headline: "End-to-End Logistics, Zero Hassle",
    subCopy: "From factory door to your warehouse — sea, air, and express options.",
    gradientFrom: "#0891B2",
    gradientTo: "#059669",
    cta: "Learn more",
  },
  {
    id: "h3",
    headline: "Customs Clearance in 48 Hours",
    subCopy: "Our experts file, follow up, and clear your goods — fast and compliant.",
    gradientFrom: "#D97706",
    gradientTo: "#F03B3B",
    cta: "Learn more",
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  { id: "quote", label: "Get a Quote", Icon: MessageSquare },
  { id: "track", label: "Track Shipment", Icon: MapPin },
  { id: "order", label: "New Order", Icon: Plus },
  { id: "support", label: "Support", Icon: Headphones },
  { id: "invoices", label: "My Invoices", Icon: FileText },
];

export const SERVICES: Service[] = [
  {
    id: "sourcing",
    name: "Sourcing",
    description: "Find & verify suppliers",
    Icon: Search,
    color: "#7C3AED",
    bgLight: "#EDE9FE",
    detailDescription:
      "We connect Indian importers with the right Chinese manufacturers. Our sourcing specialists vet suppliers on quality standards, certifications, and production capacity before you invest a single rupee.",
    howItWorks: [
      "Share your product requirements and target price",
      "We shortlist 3–5 verified suppliers within 48 hours",
      "Review supplier profiles, samples, and MOQ details",
      "We negotiate pricing and terms on your behalf",
      "Confirm the supplier and place your first order",
    ],
    whySuprans: [
      "Access to 10,000+ pre-vetted Chinese manufacturers",
      "Multilingual team fluent in Mandarin & Hindi",
      "Average 18% savings vs. direct sourcing",
      "End-to-end supplier accountability",
    ],
  },
  {
    id: "shipping",
    name: "Shipping",
    description: "Sea, air & express freight",
    Icon: Ship,
    color: "#2563EB",
    bgLight: "#DBEAFE",
    detailDescription:
      "Move your goods from any Chinese port or city to your Indian destination. We offer FCL, LCL, air freight, and express courier options — with real-time tracking at every step.",
    howItWorks: [
      "Tell us cargo type, weight, and destination",
      "Receive a competitive freight quote within 2 hours",
      "We book space and handle all carrier paperwork",
      "Live tracking updates via the Suprans app",
      "Delivery confirmed and freight invoice issued",
    ],
    whySuprans: [
      "Partnerships with top 10 global freight carriers",
      "Consolidated LCL shipments to reduce cost",
      "Average transit time of 18 days sea, 5 days air",
      "Cargo insurance included in every shipment",
    ],
  },
  {
    id: "customs",
    name: "Customs Clearance",
    description: "Fast & compliant filing",
    Icon: ShieldCheck,
    color: "#D97706",
    bgLight: "#FEF3C7",
    detailDescription:
      "Indian customs compliance is complex. Our licensed customs brokers handle all filings, duty calculations, BIS certifications, and liaise with ICEGATE so your goods clear without delays.",
    howItWorks: [
      "Share commercial invoice and packing list",
      "We prepare and file the Bill of Entry on ICEGATE",
      "Duty assessment reviewed and paid promptly",
      "Physical examination coordinated if required",
      "Goods released and delivery order issued",
    ],
    whySuprans: [
      "Licensed Custom House Agent (CHA) on file",
      "48-hour average clearance time at JNPT",
      "Zero-penalty compliance track record",
      "Handles BIS, FSSAI, and other regulatory permits",
    ],
  },
  {
    id: "quality",
    name: "Quality Inspection",
    description: "Pre-shipment & in-line checks",
    Icon: ClipboardCheck,
    color: "#059669",
    bgLight: "#D1FAE5",
    detailDescription:
      "Receive only what you ordered. Our QC inspectors visit Chinese factories before goods are shipped, checking quantity, appearance, functionality, and compliance against your specifications.",
    howItWorks: [
      "Share product spec sheet and quality standards",
      "Inspector deployed to factory before shipment",
      "Comprehensive inspection against AQL criteria",
      "Detailed report with photos within 24 hours",
      "Approve or flag issues before goods leave China",
    ],
    whySuprans: [
      "QIMA-certified inspection methodology",
      "On-ground inspectors in 20+ Chinese cities",
      "Average 98% client acceptance rate post-inspection",
      "Reject bad batches before paying freight costs",
    ],
  },
  {
    id: "warehousing",
    name: "Warehousing",
    description: "Bonded & open storage",
    Icon: Warehouse,
    color: "#0891B2",
    bgLight: "#CFFAFE",
    detailDescription:
      "Store your goods safely at our partner warehouses in Shanghai, Guangzhou, Shenzhen, and key Indian cities. Ideal for consolidation, batch releases, and buffer stock management.",
    howItWorks: [
      "Request a storage slot with estimated cargo volume",
      "Goods received, counted, and stored in assigned bay",
      "Access real-time inventory dashboard in the app",
      "Request dispatch in full or partial lots anytime",
      "Consolidated shipment prepared and dispatched",
    ],
    whySuprans: [
      "450,000 sq ft of bonded & open warehouse space",
      "Full-stack inventory management system",
      "Available across Shanghai, Guangzhou & Mumbai",
      "Flexible short-term and long-term contracts",
    ],
  },
  {
    id: "door-to-door",
    name: "Door-to-Door",
    description: "Factory to your doorstep",
    Icon: Truck,
    color: "#F03B3B",
    bgLight: "#FEE2E2",
    detailDescription:
      "The complete import solution. We pick up from your Chinese supplier, manage freight and customs, and deliver to your warehouse or retail outlet in India — fully tracked, one invoice.",
    howItWorks: [
      "Share supplier address and Indian delivery address",
      "We collect cargo from the factory or supplier",
      "Freight, customs, and inland delivery coordinated",
      "Single dashboard shows end-to-end status",
      "Delivery confirmed with proof of delivery photo",
    ],
    whySuprans: [
      "One point of contact for the full journey",
      "Flat-rate pricing — no hidden charges",
      "Coverage across 120+ Indian pin codes",
      "Average end-to-end time of 22 days",
    ],
  },
  {
    id: "payments",
    name: "Payments & FX",
    description: "Secure cross-border payments",
    Icon: Banknote,
    color: "#10B981",
    bgLight: "#D1FAE5",
    detailDescription:
      "Pay your Chinese suppliers in CNY, USD, or EUR without the banking headaches. Our licensed payment partner transfers funds securely and at competitive exchange rates, fully RBI-compliant.",
    howItWorks: [
      "Share supplier bank details and invoice amount",
      "We verify invoice and issue a payment request",
      "You transfer INR to our partner's Indian account",
      "Funds converted and remitted to supplier in 1 day",
      "FIRC issued for your records and compliance",
    ],
    whySuprans: [
      "RBI-authorized AD Category I partner bank",
      "Exchange rates 1.5% better than retail banks",
      "Instant FIRC issuance for GST input credit",
      "Supports CNY, USD, EUR, and HKD remittances",
    ],
  },
  {
    id: "documentation",
    name: "Documentation",
    description: "All trade docs handled",
    Icon: BookOpen,
    color: "#475569",
    bgLight: "#F1F5F9",
    detailDescription:
      "Trade documentation errors cause costly delays. Our documentation team prepares and reviews all commercial invoices, packing lists, certificates of origin, BL drafts, and letter of credit documents.",
    howItWorks: [
      "Share order details and shipment information",
      "We draft all required trade documents",
      "Supplier and buyer review and approve online",
      "Documents submitted to carrier and customs",
      "Originals couriered or e-documents shared",
    ],
    whySuprans: [
      "Zero documentation rejection rate in 2024",
      "Expert in LC, DP, TT, and open-account terms",
      "ISO 27001 secure document handling",
      "Archival for 7 years for audit compliance",
    ],
  },
];

const UPDATE_CARDS: UpdateCard[] = [
  {
    id: "u1",
    tag: "New Service",
    tagColor: "#7C3AED",
    tagBg: "#EDE9FE",
    title: "Door-to-Door now covers Tier-2 cities",
    body: "We've expanded our last-mile delivery to 40 new Tier-2 cities including Surat, Coimbatore, Ludhiana, and Rajkot.",
    timestamp: "2 hours ago",
  },
  {
    id: "u2",
    tag: "Update",
    tagColor: "#2563EB",
    tagBg: "#DBEAFE",
    title: "Customs clearance time now under 36 hours",
    body: "Process improvements at JNPT have cut our average clearance time from 48 to 36 hours.",
    timestamp: "1 day ago",
  },
  {
    id: "u3",
    tag: "Offer",
    tagColor: "#D97706",
    tagBg: "#FEF3C7",
    title: "20% off warehousing for first-time clients",
    body: "New clients enjoy 20% off the first 3 months of storage at any of our partner facilities.",
    timestamp: "3 days ago",
  },
  {
    id: "u4",
    tag: "Feature",
    tagColor: "#059669",
    tagBg: "#D1FAE5",
    title: "Real-time shipment tracking now live",
    body: "Track your goods at container level from departure to arrival directly in the Suprans app.",
    timestamp: "1 week ago",
  },
  {
    id: "u5",
    tag: "Partner",
    tagColor: "#0891B2",
    tagBg: "#CFFAFE",
    title: "Suprans partners with Delhivery for last-mile",
    body: "Our new partnership ensures faster, more reliable domestic delivery across all Indian states.",
    timestamp: "2 weeks ago",
  },
];

export default function SupransExploreTab() {
  const [view, setView] = useState<"home" | "detail">("home");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOpenService = (svc: Service) => {
    setSelectedService(svc);
    setView("detail");
  };

  const handleBack = () => {
    setView("home");
    setSelectedService(null);
  };

  if (view === "detail" && selectedService) {
    return <ServiceDetail service={selectedService} onBack={handleBack} />;
  }

  return <ExploreHome onOpenService={handleOpenService} />;
}

function ExploreHome({ onOpenService }: { onOpenService: (s: Service) => void }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-suprans-canvas">
      <div className="bg-white px-5 pt-5 pb-3 border-b border-suprans-border shrink-0">
        <span className="text-[22px] font-black text-suprans-ink tracking-tight">Explore</span>
      </div>

      <HeroBannerCarousel />

      <QuickActionsRow />

      <ServicesGrid onOpenService={onOpenService} />

      <LatestUpdates />

      <div className="h-4 shrink-0" />
    </div>
  );
}

function HeroBannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = () => setCurrent((c) => (c + 1) % HERO_SLIDES.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, current]);

  const handleTap = () => {
    setPaused(true);
    advance();
    setTimeout(() => setPaused(false), 6000);
  };

  const slide = HERO_SLIDES[current];

  return (
    <div className="px-4 pt-4 pb-2 shrink-0">
      <div
        data-testid="hero-carousel"
        className="relative w-full h-[168px] rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{
          background: `linear-gradient(135deg, ${slide.gradientFrom} 0%, ${slide.gradientTo} 100%)`,
          transition: "background 0.4s ease",
        }}
        onClick={handleTap}
      >
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-[17px] font-bold text-white leading-tight max-w-[72%]">{slide.headline}</h2>
            <p className="text-[12px] text-white/75 mt-1.5 leading-[1.4] max-w-[80%]">{slide.subCopy}</p>
          </div>
          <button
            data-testid={`hero-cta-${slide.id}`}
            onClick={(e) => e.stopPropagation()}
            className="self-start px-4 py-2 bg-white/20 border border-white/40 rounded-full text-[12px] font-semibold text-white"
          >
            {slide.cta}
          </button>
        </div>

        <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              data-testid={`hero-dot-${i}`}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 6000); }}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: i === current ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickActionsRow() {
  return (
    <div className="px-4 py-3 shrink-0">
      <div className="flex gap-2.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {QUICK_ACTIONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            data-testid={`quick-action-${id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-suprans-border bg-white text-[12px] font-semibold text-suprans-ink whitespace-nowrap shrink-0 hover:bg-suprans-canvas active:scale-95 transition-transform"
          >
            <Icon size={13} color="var(--suprans-red)" strokeWidth={2.2} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ServicesGrid({ onOpenService }: { onOpenService: (s: Service) => void }) {
  return (
    <div className="px-4 pb-2 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[15px] font-bold text-suprans-ink">Our Services</span>
        <span className="text-[12px] font-semibold text-suprans-red">See all</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {SERVICES.map((svc) => (
          <ServiceCard key={svc.id} service={svc} onTap={() => onOpenService(svc)} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service, onTap }: { service: Service; onTap: () => void }) {
  const { Icon, color, bgLight } = service;
  return (
    <button
      data-testid={`service-card-${service.id}`}
      onClick={onTap}
      className="bg-white rounded-2xl p-3.5 border border-suprans-border flex flex-col gap-2.5 text-left hover:shadow-sm active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bgLight }}>
          <Icon size={20} color={color} strokeWidth={1.8} />
        </div>
        <ChevronRight size={14} color="var(--suprans-ink-tertiary)" strokeWidth={2} className="mt-1" />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-suprans-ink leading-tight">{service.name}</p>
        <p className="text-[11px] text-suprans-ink-tertiary mt-0.5 leading-tight">{service.description}</p>
      </div>
    </button>
  );
}

function LatestUpdates() {
  return (
    <div className="px-4 pt-2 pb-2 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[15px] font-bold text-suprans-ink">Latest Updates</span>
        <span className="text-[12px] font-semibold text-suprans-red">See all</span>
      </div>
      <div className="flex flex-col gap-3">
        {UPDATE_CARDS.map((card) => (
          <UpdateItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

function UpdateItem({ card }: { card: UpdateCard }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-suprans-border">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ color: card.tagColor, background: card.tagBg }}
        >
          {card.tag}
        </span>
        <span className="text-[11px] text-suprans-ink-tertiary">{card.timestamp}</span>
      </div>
      <p className="text-[13px] font-semibold text-suprans-ink leading-snug mb-1">{card.title}</p>
      <p className="text-[12px] text-suprans-ink-secondary leading-[1.4]">{card.body}</p>
    </div>
  );
}

function ServiceDetail({ service, onBack }: { service: Service; onBack: () => void }) {
  const [, navigate] = useLocation();
  const { Icon, color, bgLight } = service;

  return (
    <div className="flex flex-col h-full bg-suprans-canvas">
      <div className="shrink-0" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}BB 100%)` }}>
        <button
          data-testid="btn-back-service"
          onClick={onBack}
          className="mt-4 ml-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowLeft size={18} color="white" strokeWidth={2.2} />
        </button>
        <div className="flex flex-col items-center pb-8 pt-4 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3" style={{ background: bgLight }}>
            <Icon size={30} color={color} strokeWidth={1.8} />
          </div>
          <h1 className="text-[22px] font-black text-white">{service.name}</h1>
          <p className="text-[12px] text-white/70 mt-1">{service.description}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
        <p className="text-[14px] text-suprans-ink-secondary leading-[1.6] mb-6">{service.detailDescription}</p>

        <div className="mb-6">
          <h2 className="text-[15px] font-bold text-suprans-ink mb-3">How it works</h2>
          <div className="flex flex-col gap-3">
            {service.howItWorks.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5"
                  style={{ background: color }}
                >
                  {i + 1}
                </div>
                <p className="text-[13px] text-suprans-ink leading-[1.45]">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[15px] font-bold text-suprans-ink mb-3">Why Suprans</h2>
          <div className="flex flex-col gap-2.5">
            {service.whySuprans.map((bullet, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: bgLight }}
                >
                  <Check size={11} color={color} strokeWidth={2.5} />
                </div>
                <p className="text-[13px] text-suprans-ink leading-[1.45]">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-suprans-border px-5 py-4">
        <button
          data-testid="btn-chat-cta"
          onClick={() => navigate("/suprans/chat")}
          className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-[15px] font-bold text-white"
          style={{ background: "var(--suprans-red)" }}
        >
          <MessageSquare size={18} color="white" strokeWidth={2} />
          Chat with us about this
        </button>
      </div>
    </div>
  );
}
