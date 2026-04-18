import { useLocation } from "wouter";
import { SUPRANS_AUTH_KEY } from "./suprans/constants";

const APPS = [
  {
    id: "flock",
    name: "Flock",
    tagline: "Freight Forwarding App",
    emoji: "🚚",
    color: "#F34147",
    bg: "#FEF0F0",
    path: "/splash",
    screens: "6 screens",
  },
  {
    id: "suprans",
    name: "Suprans",
    tagline: "B2B Import Partner App",
    emoji: "🌏",
    color: "#F03B3B",
    bg: "#FAF7F2",
    path: "/suprans/onboarding",
    screens: "4 tabs + onboarding",
  },
];

export default function AppLauncher() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">
          Mobile App Showcase
        </h1>
        <p className="text-[15px] text-gray-500">
          Select an app to preview it in mobile view
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {APPS.map((app) => (
          <button
            key={app.id}
            data-testid={`btn-launch-${app.id}`}
            onClick={() => {
              if (app.id === "suprans") {
                const authed = localStorage.getItem(SUPRANS_AUTH_KEY) === "true";
                navigate(authed ? "/suprans/chat" : "/suprans/onboarding");
              } else {
                navigate(app.path);
              }
            }}
            className="w-full rounded-3xl p-5 flex items-center gap-4 text-left shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            style={{ background: app.bg, border: `1.5px solid ${app.color}20` }}
          >
            <div
              className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-[28px] shrink-0"
              style={{ background: app.color + "18" }}
            >
              {app.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="text-[18px] font-bold tracking-tight"
                  style={{ color: app.color }}
                >
                  {app.name}
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: app.color + "18", color: app.color }}
                >
                  {app.screens}
                </span>
              </div>
              <p className="text-[13px] text-gray-500 mt-0.5">{app.tagline}</p>
            </div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={app.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>

      <p className="text-[12px] text-gray-400 text-center">
        Screens are rendered at 375×812px — standard mobile dimensions
      </p>
    </div>
  );
}
