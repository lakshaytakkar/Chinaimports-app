import { useState } from "react";
import { useLocation } from "wouter";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AccountView = "home" | "business-details" | "invoices" | "notifications";

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
  { label: "Active Shipments", value: "4" },
  { label: "Completed Orders", value: "14" },
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
  { id: "invoices", label: "Invoices", Icon: FileText, view: "invoices" as AccountView },
  { id: "notifications", label: "Notifications", Icon: Bell, view: "notifications" as AccountView },
  { id: "help", label: "Help & Support", Icon: HelpCircle, view: null },
  { id: "about", label: "About Suprans", Icon: Info, view: null },
];

const STATUS_STYLES: Record<Invoice["status"], { bg: string; color: string }> = {
  Paid: { bg: "#D1FAE5", color: "#059669" },
  Due: { bg: "#FEF3C7", color: "#D97706" },
  Overdue: { bg: "#FEE2E2", color: "#DC2626" },
};

export default function SupransAccountTab() {
  const [view, setView] = useState<AccountView>("home");
  const [, navigate] = useLocation();

  const handleMenu = (item: typeof MENU_ITEMS[0]) => {
    if (item.view) {
      setView(item.view);
    }
  };

  const handleSignOut = () => {
    navigate("/suprans/onboarding");
  };

  if (view === "business-details") return <BusinessDetails onBack={() => setView("home")} />;
  if (view === "invoices") return <InvoicesList onBack={() => setView("home")} />;
  if (view === "notifications") return <NotificationSettings onBack={() => setView("home")} />;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-suprans-canvas">
      <div className="bg-white px-5 pt-5 pb-4 border-b border-suprans-border shrink-0">
        <span className="text-[22px] font-black text-suprans-ink tracking-tight">Account</span>
      </div>

      <div className="bg-white mx-4 mt-4 rounded-2xl p-4 border border-suprans-border">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-[22px] font-black text-white shrink-0"
            style={{ background: "var(--suprans-red)" }}
          >
            {USER_PROFILE.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-bold text-suprans-ink leading-tight">{USER_PROFILE.companyName}</p>
            <p className="text-[11px] text-suprans-ink-tertiary mt-0.5 font-mono">{USER_PROFILE.gstin}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} color="var(--suprans-ink-tertiary)" strokeWidth={2} />
              <span className="text-[11px] text-suprans-ink-tertiary">{USER_PROFILE.city}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mx-4 mt-3">
        {USER_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex-1 bg-white rounded-xl p-3 border border-suprans-border flex flex-col items-center"
          >
            <span className="text-[16px] font-black text-suprans-ink">{stat.value}</span>
            <span className="text-[10px] text-suprans-ink-tertiary text-center leading-tight mt-0.5">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl border border-suprans-border overflow-hidden">
        {MENU_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            data-testid={`menu-${item.id}`}
            onClick={() => handleMenu(item)}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-suprans-canvas active:bg-suprans-canvas/70 transition-colors"
            style={idx > 0 ? { borderTop: "1px solid var(--suprans-border)" } : {}}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--suprans-canvas)" }}>
              <item.Icon size={16} color="var(--suprans-ink-secondary)" strokeWidth={1.8} />
            </div>
            <span className="flex-1 text-[14px] font-medium text-suprans-ink text-left">{item.label}</span>
            <ChevronRight size={16} color="var(--suprans-ink-tertiary)" strokeWidth={2} />
          </button>
        ))}
      </div>

      <div className="mx-4 mt-3 mb-6 bg-white rounded-2xl border border-suprans-border overflow-hidden">
        <button
          data-testid="menu-sign-out"
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--suprans-red-light)" }}>
            <LogOut size={16} color="var(--suprans-red)" strokeWidth={1.8} />
          </div>
          <span className="flex-1 text-[14px] font-medium text-left" style={{ color: "var(--suprans-red)" }}>Sign Out</span>
          <ChevronRight size={16} color="var(--suprans-red)" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function SubScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="bg-white px-4 pt-4 pb-3 border-b border-suprans-border flex items-center gap-3 shrink-0">
      <button data-testid="btn-back-account" onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-suprans-canvas">
        <ArrowLeft size={20} color="var(--suprans-ink)" strokeWidth={2} />
      </button>
      <span className="text-[16px] font-bold text-suprans-ink">{title}</span>
    </div>
  );
}

function BusinessDetails({ onBack }: { onBack: () => void }) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(BUSINESS_FIELDS.map((f) => [f.key, f.value]))
  );

  return (
    <div className="flex flex-col h-full bg-suprans-canvas">
      <div className="bg-white px-4 pt-4 pb-3 border-b border-suprans-border flex items-center gap-3 shrink-0">
        <button data-testid="btn-back-account" onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-suprans-canvas">
          <ArrowLeft size={20} color="var(--suprans-ink)" strokeWidth={2} />
        </button>
        <span className="flex-1 text-[16px] font-bold text-suprans-ink">Business Details</span>
        {!editing ? (
          <button
            data-testid="btn-edit"
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold"
            style={{ background: "var(--suprans-red-light)", color: "var(--suprans-red)" }}
          >
            <Edit size={12} strokeWidth={2.2} />
            Edit
          </button>
        ) : (
          <button
            data-testid="btn-save"
            onClick={() => setEditing(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-white"
            style={{ background: "var(--suprans-red)" }}
          >
            <Check size={12} strokeWidth={2.5} />
            Save
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="bg-white rounded-2xl border border-suprans-border overflow-hidden">
          {BUSINESS_FIELDS.map((field, idx) => {
            const Icon = field.icon;
            return (
              <div
                key={field.key}
                className="px-4 py-3.5"
                style={idx > 0 ? { borderTop: "1px solid var(--suprans-border)" } : {}}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon size={12} color="var(--suprans-ink-tertiary)" strokeWidth={2} />
                  <span className="text-[11px] text-suprans-ink-tertiary font-medium">{field.label}</span>
                </div>
                {editing ? (
                  <input
                    data-testid={`field-${field.key}`}
                    value={values[field.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                    className="w-full text-[14px] font-medium text-suprans-ink bg-suprans-canvas rounded-xl px-3 py-2 outline-none border focus:border-suprans-red transition-colors"
                    style={{ borderColor: "var(--suprans-border)" }}
                  />
                ) : (
                  <p className="text-[14px] font-medium text-suprans-ink">{values[field.key]}</p>
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
    <div className="flex flex-col h-full bg-suprans-canvas">
      <SubScreenHeader title="Invoices" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="bg-white rounded-2xl border border-suprans-border overflow-hidden">
          {INVOICES.map((inv, idx) => {
            const style = STATUS_STYLES[inv.status];
            return (
              <div
                key={inv.id}
                className="flex items-center gap-3 px-4 py-3.5"
                style={idx > 0 ? { borderTop: "1px solid var(--suprans-border)" } : {}}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--suprans-canvas)" }}>
                  <FileText size={18} color="var(--suprans-ink-secondary)" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-bold text-suprans-ink">{inv.id}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-[12px] text-suprans-ink-secondary">{inv.date} · {inv.amount}</p>
                </div>
                <button
                  data-testid={`invoice-download-${inv.id}`}
                  onClick={() => handleDownload(inv)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-suprans-canvas shrink-0"
                >
                  <Download size={16} color="var(--suprans-ink-tertiary)" strokeWidth={1.8} />
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
    <div className="flex flex-col h-full bg-suprans-canvas">
      <SubScreenHeader title="Notifications" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="bg-white rounded-2xl border border-suprans-border overflow-hidden">
          {prefs.map((pref, idx) => (
            <div
              key={pref.id}
              className="flex items-center gap-3 px-4 py-3.5"
              style={idx > 0 ? { borderTop: "1px solid var(--suprans-border)" } : {}}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-suprans-ink">{pref.label}</p>
                <p className="text-[11px] text-suprans-ink-tertiary mt-0.5">{pref.sub}</p>
              </div>
              <button
                data-testid={`notif-toggle-${pref.id}`}
                onClick={() => toggle(pref.id)}
                className="relative w-12 h-6 rounded-full flex-shrink-0 transition-colors duration-200"
                style={{ background: pref.enabled ? "var(--suprans-red)" : "var(--suprans-border)" }}
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
