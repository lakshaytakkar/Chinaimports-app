import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MessageCircle, Compass, FolderOpen, User, Plus } from "lucide-react";
import SupransMobileShell from "./SupransMobileShell";
import SupransChatTab from "./SupransChatTab";
import SupransExploreTab from "./SupransExploreTab";
import SupransProjectsTab from "./SupransProjectsTab";
import SupransAccountTab from "./SupransAccountTab";
import SupransRequestsTab from "./SupransRequestsTab";
import SupransRequestFlow from "./SupransRequestFlow";

const TABS = [
  { id: "chat", label: "Chat", Icon: MessageCircle, path: "/suprans/chat" },
  { id: "explore", label: "Explore", Icon: Compass, path: "/suprans/explore" },
  { id: "projects", label: "Projects", Icon: FolderOpen, path: "/suprans/projects" },
  { id: "account", label: "Account", Icon: User, path: "/suprans/account" },
] as const;

type TabId = (typeof TABS)[number]["id"] | "requests";

function getActiveTab(pathname: string): TabId {
  if (pathname.startsWith("/suprans/explore")) return "explore";
  if (pathname.startsWith("/suprans/projects")) return "projects";
  if (pathname.startsWith("/suprans/account")) return "account";
  if (pathname.startsWith("/suprans/requests")) return "requests";
  return "chat";
}

function getRequestDetailId(pathname: string): string | null {
  const m = pathname.match(/^\/suprans\/requests\/([^/]+)$/);
  return m ? decodeURIComponent(m[1]) : null;
}

export default function SupransApp() {
  const [location, navigate] = useLocation();
  const activeTab = getActiveTab(location);
  const detailId = getRequestDetailId(location);
  const [showFlow, setShowFlow] = useState(false);

  const openFlow = () => setShowFlow(true);
  const closeFlow = () => setShowFlow(false);

  const handleSubmitted = (req: { id: string }) => {
    setShowFlow(false);
    navigate(`/suprans/requests/${req.id}`);
  };

  const handleOpenRequest = (id: string) => {
    navigate(`/suprans/requests/${id}`);
  };

  const handleBackToList = () => {
    navigate("/suprans/requests");
  };

  return (
    <SupransMobileShell>
      <div
        className="absolute inset-0 bottom-[72px] overflow-hidden"
        style={{ background: "var(--suprans-canvas)" }}
      >
        <div key={activeTab} className="suprans-fade-in absolute inset-0">
          {activeTab === "chat" ? (
            <SupransChatTab />
          ) : activeTab === "explore" ? (
            <SupransExploreTab />
          ) : activeTab === "projects" ? (
            <SupransProjectsTab />
          ) : activeTab === "account" ? (
            <SupransAccountTab />
          ) : activeTab === "requests" ? (
            <SupransRequestsTab
              detailId={detailId}
              onOpenRequest={handleOpenRequest}
              onBackToList={handleBackToList}
              onRaiseRequest={openFlow}
            />
          ) : null}
        </div>
      </div>
      <SupransTabBar activeTab={activeTab} onNavigate={navigate} onRaiseRequest={openFlow} />
      {showFlow && <SupransRequestFlow onClose={closeFlow} onSubmitted={handleSubmitted} />}
    </SupransMobileShell>
  );
}

export function SupransTabBar({
  activeTab,
  onNavigate,
  onRaiseRequest,
}: {
  activeTab: TabId;
  onNavigate: (path: string) => void;
  onRaiseRequest?: () => void;
}) {
  const left = TABS.slice(0, 2);
  const right = TABS.slice(2);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[72px] flex items-start pt-1 bg-white border-t"
      style={{ borderColor: "var(--suprans-border)" }}
    >
      {left.map((tab) => (
        <TabButton key={tab.id} tab={tab} active={tab.id === activeTab} onNavigate={onNavigate} />
      ))}

      <div className="flex-1 relative flex items-start justify-center">
        <button
          data-testid="btn-raise-request"
          onClick={onRaiseRequest}
          className="absolute -top-5 w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          style={{
            background: "var(--suprans-red)",
            boxShadow:
              "0 8px 20px -4px rgba(240, 59, 59, 0.45), 0 4px 8px -2px rgba(240, 59, 59, 0.25), 0 0 0 4px white",
          }}
        >
          <Plus size={28} color="white" strokeWidth={2.6} />
        </button>
        <span
          className="absolute top-[42px] text-[10px] font-bold leading-none"
          style={{ color: "var(--suprans-red)" }}
        >
          Raise
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
      data-testid={`tab-${id}`}
      onClick={() => onNavigate(path)}
      className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full relative active:scale-95 transition-transform"
    >
      {active && (
        <span
          className="absolute rounded-full"
          style={{
            background: "var(--suprans-red-light)",
            width: 48,
            height: 30,
            top: 6,
          }}
        />
      )}
      <Icon
        size={26}
        strokeWidth={active ? 2.2 : 1.6}
        color={active ? "var(--suprans-red)" : "var(--suprans-ink-tertiary)"}
        className="relative z-10"
      />
      <span
        className="text-[11px] font-semibold relative z-10 leading-none mt-0.5"
        style={{
          color: active ? "var(--suprans-red)" : "var(--suprans-ink-tertiary)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
