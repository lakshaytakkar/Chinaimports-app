import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Home, Calendar, Briefcase, User, Sparkles } from "lucide-react";
import SupransHubMobileShell from "./SupransHubMobileShell";
import SupransHubHomeTab from "./SupransHubHomeTab";
import SupransHubEventsTab from "./SupransHubEventsTab";
import SupransHubServicesTab from "./SupransHubServicesTab";
import SupransHubAccountTab from "./SupransHubAccountTab";
import SupransHubProductDetail from "./SupransHubProductDetail";
import {
  ConciergeSheet,
  SupransConciergeFlow,
  type ConciergeAction,
} from "./SupransHubConcierge";
import { SUPRANSHUB_AUTH_KEY } from "./constants";

const TABS = [
  { id: "home", label: "Home", Icon: Home, path: "/supranshub/home" },
  { id: "events", label: "Events", Icon: Calendar, path: "/supranshub/events" },
  { id: "services", label: "Services", Icon: Briefcase, path: "/supranshub/services" },
  { id: "account", label: "Account", Icon: User, path: "/supranshub/account" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function getActiveTab(pathname: string): TabId {
  if (pathname.startsWith("/supranshub/events")) return "events";
  if (pathname.startsWith("/supranshub/services")) return "services";
  if (pathname.startsWith("/supranshub/account")) return "account";
  return "home";
}

function getProductId(pathname: string): string | null {
  const m = pathname.match(/^\/supranshub\/product\/([^/]+)$/);
  return m ? decodeURIComponent(m[1]) : null;
}

export default function SupransHubApp() {
  const [location, navigate] = useLocation();
  const productId = getProductId(location);
  const activeTab = getActiveTab(location);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ConciergeAction | null>(null);
  const [bookDemoContext, setBookDemoContext] = useState<string | undefined>(undefined);

  useEffect(() => {
    const authed = localStorage.getItem(SUPRANSHUB_AUTH_KEY) === "true";
    if (!authed) {
      navigate("/supranshub/onboarding");
      return;
    }
    if (location === "/supranshub") navigate("/supranshub/home");
  }, [location, navigate]);

  const handlePick = (a: ConciergeAction) => {
    setSheetOpen(false);
    setBookDemoContext(undefined);
    setActiveAction(a);
  };

  const handleBookDemo = (ctx: string) => {
    setSheetOpen(false);
    setBookDemoContext(ctx);
    setActiveAction("advisor");
  };

  const handleCloseAction = () => {
    setActiveAction(null);
    setBookDemoContext(undefined);
  };

  return (
    <SupransHubMobileShell>
      <div
        className="absolute inset-0 bottom-[72px] overflow-hidden"
        style={{ background: "var(--supranshub-canvas)" }}
      >
        {productId ? (
          <div key={productId} className="supranshub-fade-in absolute inset-0">
            <SupransHubProductDetail
              productId={productId}
              onBack={() => navigate("/supranshub/home")}
              onBookDemo={handleBookDemo}
            />
          </div>
        ) : (
          <div key={activeTab} className="supranshub-fade-in absolute inset-0">
            {activeTab === "home" && (
              <SupransHubHomeTab onOpenProduct={(id) => navigate(`/supranshub/product/${id}`)} />
            )}
            {activeTab === "events" && <SupransHubEventsTab />}
            {activeTab === "services" && <SupransHubServicesTab />}
            {activeTab === "account" && (
              <SupransHubAccountTab
                onLogout={() => {
                  localStorage.removeItem(SUPRANSHUB_AUTH_KEY);
                  navigate("/supranshub/onboarding");
                }}
              />
            )}
          </div>
        )}
      </div>
      <SupransHubTabBar
        activeTab={activeTab}
        onNavigate={navigate}
        onConcierge={() => setSheetOpen(true)}
      />
      <ConciergeSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onPick={handlePick}
      />
      {activeAction && (
        <SupransConciergeFlow
          action={activeAction}
          onClose={handleCloseAction}
          initialContext={bookDemoContext}
        />
      )}
    </SupransHubMobileShell>
  );
}

export function SupransHubTabBar({
  activeTab,
  onNavigate,
  onConcierge,
}: {
  activeTab: TabId;
  onNavigate: (path: string) => void;
  onConcierge?: () => void;
}) {
  const left = TABS.slice(0, 2);
  const right = TABS.slice(2);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[72px] flex items-start pt-2 bg-white border-t z-20"
      style={{ borderColor: "var(--supranshub-border)" }}
    >
      {left.map((tab) => (
        <TabButton key={tab.id} tab={tab} active={tab.id === activeTab} onNavigate={onNavigate} />
      ))}

      <div className="flex-1 relative flex items-start justify-center">
        <button
          data-testid="btn-concierge-open"
          onClick={onConcierge}
          className="absolute -top-6 w-[60px] h-[60px] rounded-full flex items-center justify-center active:scale-95 transition-transform"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #E5C885 0%, #C8A25A 55%, #8C6A2C 100%)",
            boxShadow:
              "0 10px 24px -6px rgba(200, 162, 90, 0.55), 0 4px 10px -2px rgba(140, 106, 44, 0.35), 0 0 0 4px white",
          }}
        >
          <Sparkles size={24} color="white" strokeWidth={2.4} />
        </button>
        <span
          className="absolute top-[44px] text-[10px] font-bold leading-none tracking-wide"
          style={{ color: "var(--supranshub-gold)" }}
        >
          Concierge
        </span>
      </div>

      {right.map((tab) => (
        <TabButton key={tab.id} tab={tab} active={tab.id === activeTab} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function TabButton({
  tab,
  active,
  onNavigate,
}: {
  tab: (typeof TABS)[number];
  active: boolean;
  onNavigate: (path: string) => void;
}) {
  const { id, label, Icon, path } = tab;
  return (
    <button
      data-testid={`tab-supranshub-${id}`}
      onClick={() => onNavigate(path)}
      className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full relative active:scale-95 transition-transform"
    >
      {active && (
        <span
          className="absolute rounded-full"
          style={{
            background: "var(--supranshub-red-light)",
            width: 48,
            height: 30,
            top: 6,
          }}
        />
      )}
      <Icon
        size={24}
        strokeWidth={active ? 2.2 : 1.6}
        color={active ? "var(--supranshub-red)" : "var(--supranshub-ink-tertiary)"}
        className="relative z-10"
      />
      <span
        className="text-[11px] font-semibold relative z-10 leading-none mt-0.5"
        style={{
          color: active ? "var(--supranshub-red)" : "var(--supranshub-ink-tertiary)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
