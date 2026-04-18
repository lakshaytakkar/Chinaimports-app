import { useEffect } from "react";
import { useLocation } from "wouter";
import { Home, Calendar, Briefcase, User } from "lucide-react";
import SupransHubMobileShell from "./SupransHubMobileShell";
import SupransHubHomeTab from "./SupransHubHomeTab";
import SupransHubEventsTab from "./SupransHubEventsTab";
import SupransHubServicesTab from "./SupransHubServicesTab";
import SupransHubAccountTab from "./SupransHubAccountTab";
import SupransHubProductDetail from "./SupransHubProductDetail";
import { SUPRANSHUB_AUTH_KEY } from "./constants";

const TABS = [
  { id: "home", label: "Home", Icon: Home, path: "/supranshub/home" },
  { id: "events", label: "Events", Icon: Calendar, path: "/supranshub/events" },
  { id: "services", label: "My Services", Icon: Briefcase, path: "/supranshub/services" },
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

  useEffect(() => {
    const authed = localStorage.getItem(SUPRANSHUB_AUTH_KEY) === "true";
    if (!authed) {
      navigate("/supranshub/onboarding");
      return;
    }
    if (location === "/supranshub") navigate("/supranshub/home");
  }, [location, navigate]);

  return (
    <SupransHubMobileShell>
      <div
        className="absolute inset-0 bottom-[72px] overflow-hidden"
        style={{ background: "var(--supranshub-canvas)" }}
      >
        {productId ? (
          <div key={productId} className="supranshub-fade-in absolute inset-0">
            <SupransHubProductDetail productId={productId} onBack={() => navigate("/supranshub/home")} />
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
      <SupransHubTabBar activeTab={activeTab} onNavigate={navigate} />
    </SupransHubMobileShell>
  );
}

export function SupransHubTabBar({
  activeTab,
  onNavigate,
}: {
  activeTab: TabId;
  onNavigate: (path: string) => void;
}) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[72px] flex items-start pt-2 bg-white border-t"
      style={{ borderColor: "var(--supranshub-border)" }}
    >
      {TABS.map((tab) => (
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
