import { useState, useRef, useEffect } from "react";
import { SLIDE_DURATION_MS } from "./transitions";
import { useLocation } from "wouter";
import { CHINAIMPORTS_AUTH_KEY } from "./constants";
import {
  ArrowLeft,
  ChevronRight,
  Building2,
  FileText,
  Bell,
  HelpCircle,
  Info,
  LogOut,
  Download,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Edit,
  Check,
  MessageSquare,
  PhoneCall,
  BookOpen,
  ExternalLink,
  Shield,
  Package,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import avatarPriya from "@assets/suprans/avatars/priya-sharma.png";

type AccountView = "home" | "business-details" | "my-requests" | "invoices" | "notifications" | "help" | "about";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Due" | "Overdue";
}

interface NotifPref {
  id: string;
  label: string;
  sub: string;
  enabled: boolean;
}

const USER_PROFILE = {
  initials: "ME",
  companyName: "Mehta Exports Pvt. Ltd.",
  gstin: "27AAFCM1234D1Z5",
  city: "Mumbai, Maharashtra",
};

const USER_STATS = [
  { label: "Active Shipments", value: "3" },
  { label: "Completed Orders", value: "12" },
  { label: "Member since", value: "Feb 2024" },
];

const BUSINESS_FIELDS = [
  { label: "Company Name", key: "companyName", icon: Building2, value: "Mehta Exports Pvt. Ltd." },
  { label: "GSTIN", key: "gstin", icon: CreditCard, value: "27AAFCM1234D1Z5" },
  { label: "Address", key: "address", icon: MapPin, value: "42, Trade Centre, BKC, Mumbai 400051" },
  { label: "Contact Email", key: "email", icon: Mail, value: "rajesh@mehtaexports.com" },
  { label: "Contact Phone", key: "phone", icon: Phone, value: "+91 98765 43210" },
];

const INVOICES: Invoice[] = [
  { id: "INV-9841", date: "1 Apr 2026", amount: "₹1,84,200", status: "Due" },
  { id: "INV-9762", date: "15 Mar 2026", amount: "₹3,20,500", status: "Paid" },
  { id: "INV-9698", date: "28 Feb 2026", amount: "₹92,000", status: "Overdue" },
];

const INITIAL_NOTIFS: NotifPref[] = [
  { id: "messages", label: "New messages", sub: "When a team member sends you a chat", enabled: true },
  { id: "project", label: "Project updates", sub: "Status changes on your shipments", enabled: true },
  { id: "payments", label: "Payment reminders", sub: "Upcoming and overdue payments", enabled: true },
  { id: "promos", label: "Promotional offers", sub: "Deals, discounts, and special offers", enabled: false },
  { id: "digest", label: "Weekly digest", sub: "Summary of your account activity", enabled: false },
];

const MENU_ITEMS = [
  { id: "business-details", label: "Business Details", Icon: Building2, view: "business-details" as AccountView },
  { id: "my-requests", label: "My Sourcing Requests", Icon: Package, view: "my-requests" as AccountView },
  { id: "invoices", label: "Invoices", Icon: FileText, view: "invoices" as AccountView },
  { id: "notifications", label: "Notifications", Icon: Bell, view: "notifications" as AccountView },
  { id: "help", label: "Help & Support", Icon: HelpCircle, view: "help" as AccountView },
  { id: "about", label: "About China Imports", Icon: Info, view: "about" as AccountView },
];

const STATUS_STYLES: Record<Invoice["status"], { bg: string; color: string }> = {
  Paid: { bg: "#D1FAE5", color: "#059669" },
  Due: { bg: "#FEF3C7", color: "#D97706" },
  Overdue: { bg: "#FEE2E2", color: "#DC2626" },
};

export default function ChinaImportsAccountTab() {
  const [view, setView] = useState<AccountView>("home");
  const [isLeaving, setIsLeaving] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, navigate] = useLocation();

  useEffect(() => () => { if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current); }, []);

  const handleMenu = (item: typeof MENU_ITEMS[0]) => {
    if (item.view === "my-requests") {
      navigate("/chinaimports/requests");
      return;
    }
    if (item.view) {
      setIsLeaving(false);
      setView(item.view);
    }
  };

  const handleBack = () => {
    setIsLeaving(true);
    leaveTimerRef.current = setTimeout(() => {
      setView("home");
      setIsLeaving(false);
    }, SLIDE_DURATION_MS);
  };

  const handleSignOut = () => {
    localStorage.removeItem(CHINAIMPORTS_AUTH_KEY);
    navigate("/chinaimports/onboarding");
  };

  const renderSubScreen = () => {
    if (view === "business-details") return <BusinessDetails onBack={handleBack} />;
    if (view === "invoices") return <InvoicesList onBack={handleBack} />;
    if (view === "notifications") return <NotificationSettings onBack={handleBack} />;
    if (view === "help") return <HelpSupport onBack={handleBack} />;
    if (view === "about") return <AboutChinaImports onBack={handleBack} />;
    return null;
  };

  const subScreen = renderSubScreen();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto bg-chinaimports-canvas">
        <div className="bg-white px-5 pt-5 pb-4 border-b border-chinaimports-border shrink-0">
          <span className="text-[22px] font-black text-chinaimports-ink tracking-tight">Account</span>
        </div>

      <div className="bg-white mx-4 mt-4 rounded-2xl p-4 border border-chinaimports-border">
        <div className="flex items-center gap-4">
          <img
            src={avatarPriya}
            alt="Profile photo"
            data-testid="img-profile-avatar"
            className="w-16 h-16 rounded-full object-cover shrink-0 ring-2 ring-chinaimports-red/20"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-bold text-chinaimports-ink leading-tight">{USER_PROFILE.companyName}</p>
            <p className="text-[11px] text-chinaimports-ink-tertiary mt-0.5 font-mono">{USER_PROFILE.gstin}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} color="var(--chinaimports-ink-tertiary)" strokeWidth={2} />
              <span className="text-[11px] text-chinaimports-ink-tertiary">{USER_PROFILE.city}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mx-4 mt-3">
        {USER_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex-1 bg-white rounded-xl p-3 border border-chinaimports-border flex flex-col items-center"
          >
            <span className="text-[16px] font-black text-chinaimports-ink">{stat.value}</span>
            <span className="text-[10px] text-chinaimports-ink-tertiary text-center leading-tight mt-0.5">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl border border-chinaimports-border overflow-hidden">
        {MENU_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            data-testid={`menu-${item.id}`}
            onClick={() => handleMenu(item)}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-chinaimports-canvas active:bg-chinaimports-canvas/70 transition-colors"
            style={idx > 0 ? { borderTop: "1px solid var(--chinaimports-border)" } : {}}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--chinaimports-canvas)" }}>
              <item.Icon size={16} color="var(--chinaimports-ink-secondary)" strokeWidth={1.8} />
            </div>
            <span className="flex-1 text-[14px] font-medium text-chinaimports-ink text-left">{item.label}</span>
            <ChevronRight size={16} color="var(--chinaimports-ink-tertiary)" strokeWidth={2} />
          </button>
        ))}
      </div>

      <div className="mx-4 mt-3 mb-6 bg-white rounded-2xl border border-chinaimports-border overflow-hidden">
        <button
          data-testid="menu-sign-out"
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--chinaimports-red-light)" }}>
            <LogOut size={16} color="var(--chinaimports-red)" strokeWidth={1.8} />
          </div>
          <span className="flex-1 text-[14px] font-medium text-left" style={{ color: "var(--chinaimports-red)" }}>Sign Out</span>
          <ChevronRight size={16} color="var(--chinaimports-red)" strokeWidth={2} />
        </button>
      </div>
      </div>
      {subScreen && (
        <div className={`absolute inset-0 ${isLeaving ? "chinaimports-slide-out" : "chinaimports-slide-in"}`}>
          {subScreen}
        </div>
      )}
    </div>
  );
}

function SubScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="bg-white px-4 pt-4 pb-3 border-b border-chinaimports-border flex items-center gap-3 shrink-0">
      <button data-testid="btn-back-account" onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-chinaimports-canvas">
        <ArrowLeft size={20} color="var(--chinaimports-ink)" strokeWidth={2} />
      </button>
      <span className="text-[16px] font-bold text-chinaimports-ink">{title}</span>
    </div>
  );
}

function BusinessDetails({ onBack }: { onBack: () => void }) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(BUSINESS_FIELDS.map((f) => [f.key, f.value]))
  );

  return (
    <div className="flex flex-col h-full bg-chinaimports-canvas">
      <div className="bg-white px-4 pt-4 pb-3 border-b border-chinaimports-border flex items-center gap-3 shrink-0">
        <button data-testid="btn-back-account" onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-chinaimports-canvas">
          <ArrowLeft size={20} color="var(--chinaimports-ink)" strokeWidth={2} />
        </button>
        <span className="flex-1 text-[16px] font-bold text-chinaimports-ink">Business Details</span>
        {!editing ? (
          <button
            data-testid="btn-edit"
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold"
            style={{ background: "var(--chinaimports-red-light)", color: "var(--chinaimports-red)" }}
          >
            <Edit size={12} strokeWidth={2.2} />
            Edit
          </button>
        ) : (
          <button
            data-testid="btn-save"
            onClick={() => setEditing(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-white"
            style={{ background: "var(--chinaimports-red)" }}
          >
            <Check size={12} strokeWidth={2.5} />
            Save
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="bg-white rounded-2xl border border-chinaimports-border overflow-hidden">
          {BUSINESS_FIELDS.map((field, idx) => {
            const Icon = field.icon;
            return (
              <div
                key={field.key}
                className="px-4 py-3.5"
                style={idx > 0 ? { borderTop: "1px solid var(--chinaimports-border)" } : {}}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon size={12} color="var(--chinaimports-ink-tertiary)" strokeWidth={2} />
                  <span className="text-[11px] text-chinaimports-ink-tertiary font-medium">{field.label}</span>
                </div>
                {editing ? (
                  <input
                    data-testid={`field-${field.key}`}
                    value={values[field.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                    className="w-full text-[14px] font-medium text-chinaimports-ink bg-chinaimports-canvas rounded-xl px-3 py-2 outline-none border focus:border-chinaimports-red transition-colors"
                    style={{ borderColor: "var(--chinaimports-border)" }}
                  />
                ) : (
                  <p className="text-[14px] font-medium text-chinaimports-ink">{values[field.key]}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InvoicesList({ onBack }: { onBack: () => void }) {
  const { toast } = useToast();

  const handleDownload = (inv: Invoice) => {
    toast({ description: `Downloading ${inv.id}…` });
  };

  return (
    <div className="flex flex-col h-full bg-chinaimports-canvas">
      <SubScreenHeader title="Invoices" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="bg-white rounded-2xl border border-chinaimports-border overflow-hidden">
          {INVOICES.map((inv, idx) => {
            const style = STATUS_STYLES[inv.status];
            return (
              <div
                key={inv.id}
                className="flex items-center gap-3 px-4 py-3.5"
                style={idx > 0 ? { borderTop: "1px solid var(--chinaimports-border)" } : {}}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--chinaimports-canvas)" }}>
                  <FileText size={18} color="var(--chinaimports-ink-secondary)" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-bold text-chinaimports-ink">{inv.id}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-[12px] text-chinaimports-ink-secondary">{inv.date} · {inv.amount}</p>
                </div>
                <button
                  data-testid={`invoice-download-${inv.id}`}
                  onClick={() => handleDownload(inv)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-chinaimports-canvas shrink-0"
                >
                  <Download size={16} color="var(--chinaimports-ink-tertiary)" strokeWidth={1.8} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NotificationSettings({ onBack }: { onBack: () => void }) {
  const [prefs, setPrefs] = useState<NotifPref[]>(INITIAL_NOTIFS);

  const toggle = (id: string) => {
    setPrefs((p) => p.map((n) => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  return (
    <div className="flex flex-col h-full bg-chinaimports-canvas">
      <SubScreenHeader title="Notifications" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="bg-white rounded-2xl border border-chinaimports-border overflow-hidden">
          {prefs.map((pref, idx) => (
            <div
              key={pref.id}
              className="flex items-center gap-3 px-4 py-3.5"
              style={idx > 0 ? { borderTop: "1px solid var(--chinaimports-border)" } : {}}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-chinaimports-ink">{pref.label}</p>
                <p className="text-[11px] text-chinaimports-ink-tertiary mt-0.5">{pref.sub}</p>
              </div>
              <button
                data-testid={`notif-toggle-${pref.id}`}
                onClick={() => toggle(pref.id)}
                className="relative w-12 h-6 rounded-full flex-shrink-0 transition-colors duration-200"
                style={{ background: pref.enabled ? "var(--chinaimports-red)" : "var(--chinaimports-border)" }}
              >
                <span
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{ transform: pref.enabled ? "translateX(26px)" : "translateX(4px)" }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const HELP_OPTIONS = [
  { id: "chat", label: "Chat with Support", sub: "Start a conversation with our team", Icon: MessageSquare },
  { id: "call", label: "Call Us", sub: "+91 22 6900 4200 (Mon–Sat, 9AM–6PM)", Icon: PhoneCall },
  { id: "email", label: "Email Support", sub: "support@chinaimports.in", Icon: Mail },
  { id: "faq", label: "FAQs", sub: "Browse common questions and answers", Icon: BookOpen },
];

function HelpSupport({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-chinaimports-canvas">
      <SubScreenHeader title="Help & Support" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-[13px] text-chinaimports-ink-secondary mb-4 leading-relaxed">
          Our team is available Monday to Saturday, 9 AM – 6 PM IST. Choose how you'd like to reach us.
        </p>
        <div className="bg-white rounded-2xl border border-chinaimports-border overflow-hidden">
          {HELP_OPTIONS.map((item, idx) => (
            <button
              key={item.id}
              data-testid={`help-option-${item.id}`}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-chinaimports-canvas transition-colors text-left"
              style={idx > 0 ? { borderTop: "1px solid var(--chinaimports-border)" } : {}}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--chinaimports-red-light)" }}>
                <item.Icon size={18} color="var(--chinaimports-red)" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-chinaimports-ink">{item.label}</p>
                <p className="text-[11px] text-chinaimports-ink-tertiary mt-0.5">{item.sub}</p>
              </div>
              <ExternalLink size={14} color="var(--chinaimports-ink-tertiary)" strokeWidth={1.8} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutChinaImports({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-chinaimports-canvas">
      <SubScreenHeader title="About China Imports" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="bg-white rounded-2xl border border-chinaimports-border p-5 mb-4 flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-[22px] font-black text-white mb-3"
            style={{ background: "var(--chinaimports-red)" }}
          >
            S
          </div>
          <h2 className="text-[18px] font-black text-chinaimports-ink">China Imports</h2>
          <p className="text-[12px] text-chinaimports-ink-tertiary mt-0.5">Version 1.0.0 (Build 42)</p>
          <p className="text-[13px] text-chinaimports-ink-secondary mt-3 leading-relaxed">
            China Imports is India's B2B import partner, helping businesses source, ship, and clear goods from China with end-to-end transparency.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-chinaimports-border overflow-hidden">
          {[
            { label: "Terms of Service", Icon: FileText },
            { label: "Privacy Policy", Icon: Shield },
            { label: "Licenses", Icon: BookOpen },
          ].map((item, idx) => (
            <button
              key={item.label}
              data-testid={`about-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-chinaimports-canvas transition-colors"
              style={idx > 0 ? { borderTop: "1px solid var(--chinaimports-border)" } : {}}
            >
              <item.Icon size={16} color="var(--chinaimports-ink-secondary)" strokeWidth={1.8} />
              <span className="flex-1 text-[14px] font-medium text-chinaimports-ink text-left">{item.label}</span>
              <ExternalLink size={14} color="var(--chinaimports-ink-tertiary)" strokeWidth={1.8} />
            </button>
          ))}
        </div>

        <p className="text-center text-[11px] text-chinaimports-ink-tertiary mt-6">
          © 2026 China Imports Technologies Pvt. Ltd.{"\n"}Made with ❤️ in Mumbai, India
        </p>
      </div>
    </div>
  );
}
