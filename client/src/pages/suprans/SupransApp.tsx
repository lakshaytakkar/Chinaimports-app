import { useLocation } from "wouter";
import { MessageCircle, Compass, FolderOpen, User } from "lucide-react";

const TABS = [
  { id: "chat", label: "Chat", Icon: MessageCircle, path: "/suprans/chat" },
  { id: "explore", label: "Explore", Icon: Compass, path: "/suprans/explore" },
  { id: "projects", label: "Projects", Icon: FolderOpen, path: "/suprans/projects" },
  { id: "account", label: "Account", Icon: User, path: "/suprans/account" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function getActiveTab(pathname: string): TabId {
  if (pathname.startsWith("/suprans/explore")) return "explore";
  if (pathname.startsWith("/suprans/projects")) return "projects";
  if (pathname.startsWith("/suprans/account")) return "account";
  return "chat";
}

export default function SupransApp() {
  const [location, navigate] = useLocation();
  const activeTab = getActiveTab(location);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="relative w-[375px] h-[812px] overflow-hidden shadow-2xl"
        style={{ fontFamily: "var(--suprans-font)" }}
      >
        <div
          className="absolute inset-0 bottom-[72px] overflow-y-auto"
          style={{ background: "var(--suprans-canvas)" }}
        >
          <PlaceholderScreen tab={activeTab} />
        </div>
        <SupransTabBar activeTab={activeTab} onNavigate={navigate} />
      </div>
    </div>
  );
}

function PlaceholderScreen({ tab }: { tab: TabId }) {
  const labels: Record<TabId, { emoji: string; title: string; sub: string }> = {
    chat: {
      emoji: "💬",
      title: "Chat",
      sub: "Your conversations will appear here",
    },
    explore: {
      emoji: "🧭",
      title: "Explore",
      sub: "Discover Suprans services",
    },
    projects: {
      emoji: "📁",
      title: "Projects",
      sub: "Your active and completed projects",
    },
    account: {
      emoji: "👤",
      title: "Account",
      sub: "Manage your profile and settings",
    },
  };
  const { emoji, title, sub } = labels[tab];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-8">
      <div className="text-[64px]">{emoji}</div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-[22px] font-bold text-suprans-ink">{title}</h2>
        <p className="text-[14px] text-suprans-ink-secondary leading-relaxed">{sub}</p>
      </div>
      <div
        className="mt-2 px-4 py-2 rounded-full text-[12px] font-semibold text-suprans-red"
        style={{ background: "var(--suprans-red-light)" }}
      >
        Coming in the next build
      </div>
    </div>
  );
}

export function SupransTabBar({
  activeTab,
  onNavigate,
}: {
  activeTab: TabId;
  onNavigate: (path: string) => void;
}) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[72px] flex items-start pt-1 bg-white border-t"
      style={{ borderColor: "var(--suprans-border)" }}
    >
      {TABS.map(({ id, label, Icon, path }) => {
        const isActive = id === activeTab;
        return (
          <button
            key={id}
            data-testid={`tab-${id}`}
            onClick={() => onNavigate(path)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full relative"
          >
            {isActive && (
              <span
                className="absolute top-1.5 rounded-full"
                style={{
                  background: "var(--suprans-red-light)",
                  width: 48,
                  height: 30,
                  top: 6,
                }}
              />
            )}
            <Icon
              size={22}
              strokeWidth={isActive ? 2.2 : 1.6}
              color={isActive ? "var(--suprans-red)" : "var(--suprans-ink-tertiary)"}
              className="relative z-10"
            />
            <span
              className="text-[10px] font-semibold relative z-10 leading-none mt-0.5"
              style={{
                color: isActive ? "var(--suprans-red)" : "var(--suprans-ink-tertiary)",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
