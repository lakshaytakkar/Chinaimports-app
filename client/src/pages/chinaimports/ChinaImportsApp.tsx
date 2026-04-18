import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MessageCircle, Compass, FolderOpen, User, Plus } from "lucide-react";
import ChinaImportsMobileShell from "./ChinaImportsMobileShell";
import ChinaImportsChatTab from "./ChinaImportsChatTab";
import ChinaImportsExploreTab from "./ChinaImportsExploreTab";
import ChinaImportsProjectsTab from "./ChinaImportsProjectsTab";
import ChinaImportsAccountTab from "./ChinaImportsAccountTab";
import ChinaImportsRequestsTab from "./ChinaImportsRequestsTab";
import ChinaImportsRequestFlow from "./ChinaImportsRequestFlow";

const TABS = [
  { id: "chat", label: "Chat", Icon: MessageCircle, path: "/chinaimports/chat" },
  { id: "explore", label: "Explore", Icon: Compass, path: "/chinaimports/explore" },
  { id: "projects", label: "Projects", Icon: FolderOpen, path: "/chinaimports/projects" },
  { id: "account", label: "Account", Icon: User, path: "/chinaimports/account" },
] as const;

type TabId = (typeof TABS)[number]["id"] | "requests";

function getActiveTab(pathname: string): TabId {
  if (pathname.startsWith("/chinaimports/explore")) return "explore";
  if (pathname.startsWith("/chinaimports/projects")) return "projects";
  if (pathname.startsWith("/chinaimports/account")) return "account";
  if (pathname.startsWith("/chinaimports/requests")) return "requests";
  return "chat";
}

function getRequestDetailId(pathname: string): string | null {
  const m = pathname.match(/^\/chinaimports\/requests\/([^/]+)$/);
  return m ? decodeURIComponent(m[1]) : null;
}

export default function ChinaImportsApp() {
  const [location, navigate] = useLocation();
  const activeTab = getActiveTab(location);
  const detailId = getRequestDetailId(location);
  const [showFlow, setShowFlow] = useState(false);

  const openFlow = () => setShowFlow(true);
  const closeFlow = () => setShowFlow(false);

  const handleSubmitted = (req: { id: string }) => {
    setShowFlow(false);
    navigate(`/chinaimports/requests/${req.id}`);
  };

  const handleOpenRequest = (id: string) => {
    navigate(`/chinaimports/requests/${id}`);
  };

  const handleBackToList = () => {
    navigate("/chinaimports/requests");
  };

  return (
    <ChinaImportsMobileShell>
      <div
        className="absolute inset-0 bottom-[72px] overflow-hidden"
        style={{ background: "var(--chinaimports-canvas)" }}
      >
        <div key={activeTab} className="chinaimports-fade-in absolute inset-0">
          {activeTab === "chat" ? (
            <ChinaImportsChatTab />
          ) : activeTab === "explore" ? (
            <ChinaImportsExploreTab />
          ) : activeTab === "projects" ? (
            <ChinaImportsProjectsTab />
          ) : activeTab === "account" ? (
            <ChinaImportsAccountTab />
          ) : activeTab === "requests" ? (
            <ChinaImportsRequestsTab
              detailId={detailId}
              onOpenRequest={handleOpenRequest}
              onBackToList={handleBackToList}
              onRaiseRequest={openFlow}
            />
          ) : null}
        </div>
      </div>
      <ChinaImportsTabBar activeTab={activeTab} onNavigate={navigate} onRaiseRequest={openFlow} />
      {showFlow && <ChinaImportsRequestFlow onClose={closeFlow} onSubmitted={handleSubmitted} />}
    </ChinaImportsMobileShell>
  );
}

export function ChinaImportsTabBar({
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
      style={{ borderColor: "var(--chinaimports-border)" }}
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
            background: "var(--chinaimports-red)",
            boxShadow:
              "0 8px 20px -4px rgba(240, 59, 59, 0.45), 0 4px 8px -2px rgba(240, 59, 59, 0.25), 0 0 0 4px white",
          }}
        >
          <Plus size={28} color="white" strokeWidth={2.6} />
        </button>
        <span
          className="absolute top-[42px] text-[10px] font-bold leading-none"
          style={{ color: "var(--chinaimports-red)" }}
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
            background: "var(--chinaimports-red-light)",
            width: 48,
            height: 30,
            top: 6,
          }}
        />
      )}
      <Icon
        size={26}
        strokeWidth={active ? 2.2 : 1.6}
        color={active ? "var(--chinaimports-red)" : "var(--chinaimports-ink-tertiary)"}
        className="relative z-10"
      />
      <span
        className="text-[11px] font-semibold relative z-10 leading-none mt-0.5"
        style={{
          color: active ? "var(--chinaimports-red)" : "var(--chinaimports-ink-tertiary)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
