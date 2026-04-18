import { useLocation } from "wouter";
import { CHINAIMPORTS_AUTH_KEY } from "./chinaimports/constants";
import { SUPRANSHUB_AUTH_KEY } from "./supranshub/constants";

const APPS = [
  {
    id: "chinaimports",
    name: "China Imports",
    tagline: "Sourcing App",
    description:
      "Your one-stop sourcing partner in China. Submit RFQs, chat with the ops team, track every order, and manage documents — all in one app.",
    color: "#F03B3B",
    colorLight: "#FAF7F2",
    gradient: "from-amber-50 to-orange-50",
    accentGlow: "rgba(240,59,59,0.18)",
    path: "/chinaimports/onboarding",
    iframePath: "/chinaimports/onboarding",
    features: ["Smart Sourcing", "Project Tracking", "Partner Chat"],
  },
  {
    id: "supranshub",
    name: "Suprans Hub",
    tagline: "Parent Brand Directory",
    description:
      "One Suprans account, every Suprans product. Browse 10 verticals — from US company formation to luxury furniture — manage active services, and unify billing.",
    color: "#C8A25A",
    colorLight: "#F5EBD8",
    gradient: "from-amber-50 to-yellow-50",
    accentGlow: "rgba(200,162,90,0.22)",
    path: "/supranshub/onboarding",
    iframePath: "/supranshub/onboarding",
    features: ["10 Products", "Unified Billing", "Events Calendar"],
  },
];

function PhoneFrame({
  iframePath,
  color,
}: {
  iframePath: string;
  color: string;
}) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: 220, height: 450 }}
    >
      <div
        className="absolute inset-0 rounded-[38px] shadow-2xl overflow-hidden"
        style={{
          background: "#1a1a1a",
          boxShadow: `0 32px 64px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(0,0,0,0.6)`,
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
          style={{ width: 80, height: 28 }}
        >
          <div
            className="rounded-full"
            style={{
              width: 60,
              height: 18,
              background: "#111",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
            }}
          />
        </div>

        <div
          className="absolute"
          style={{
            top: 24,
            left: 6,
            right: 6,
            bottom: 16,
            borderRadius: 30,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <iframe
            src={iframePath}
            title="App Preview"
            style={{
              width: "375px",
              height: "812px",
              border: "none",
              transformOrigin: "top left",
              transform: "scale(0.55)",
              pointerEvents: "none",
            }}
            scrolling="no"
          />
        </div>

        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 60, height: 4, background: "rgba(255,255,255,0.2)" }}
        />
      </div>

      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-60"
        style={{
          width: 120,
          height: 30,
          background: color,
        }}
      />
    </div>
  );
}

export default function AppLauncher() {
  const [, navigate] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0d0f14", fontFamily: "'Inter Tight', 'Plus Jakarta Sans', sans-serif" }}
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: 600,
            height: 600,
            top: -200,
            left: -100,
            background: "radial-gradient(circle, #F34147 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-10"
          style={{
            width: 500,
            height: 500,
            bottom: -100,
            right: -100,
            background: "radial-gradient(circle, #F03B3B 0%, transparent 70%)",
          }}
        />
      </div>

      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(243,65,71,0.2)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="2" fill="#F34147" />
              <rect x="13" y="3" width="8" height="8" rx="2" fill="#F34147" opacity="0.6" />
              <rect x="3" y="13" width="8" height="8" rx="2" fill="#F34147" opacity="0.6" />
              <rect x="13" y="13" width="8" height="8" rx="2" fill="#F34147" opacity="0.3" />
            </svg>
          </div>
          <span className="text-white text-sm font-semibold tracking-tight opacity-70">
            App Showcase
          </span>
        </div>
        <span className="text-xs text-white/30 font-medium tracking-widest uppercase">
          Portfolio
        </span>
      </header>

      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-8 pb-16">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-wide uppercase"
          style={{
            background: "rgba(243,65,71,0.12)",
            border: "1px solid rgba(243,65,71,0.25)",
            color: "#F34147",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#F34147" }}
          />
          Live App Previews
        </div>

        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight"
          style={{ color: "#ffffff" }}
          data-testid="heading-showcase"
        >
          Mobile Apps,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #F34147 0%, #FF8A8A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Beautifully Crafted
          </span>
        </h1>

        <p
          className="text-base max-w-md leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
          data-testid="text-subtitle"
        >
          Two purpose-built mobile apps from the Suprans family — a chat-first
          sourcing partner and a directory for the entire ecosystem.
        </p>
      </section>

      <section className="relative z-10 flex flex-col lg:flex-row items-stretch justify-center gap-8 px-6 pb-20 max-w-5xl mx-auto w-full">
        {APPS.map((app) => (
          <div
            key={app.id}
            className="flex-1 flex flex-col rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
            data-testid={`card-app-${app.id}`}
          >
            <div
              className="flex flex-col items-center justify-end pt-12 pb-2"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${app.accentGlow} 0%, transparent 70%)`,
                minHeight: 300,
              }}
            >
              <PhoneFrame iframePath={app.iframePath} color={app.color} />
            </div>

            <div className="flex flex-col gap-5 p-7 pt-10 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2
                    className="text-2xl font-bold tracking-tight text-white"
                    data-testid={`text-appname-${app.id}`}
                  >
                    {app.name}
                  </h2>
                  <p
                    className="text-sm font-medium mt-0.5"
                    style={{ color: app.color }}
                    data-testid={`text-tagline-${app.id}`}
                  >
                    {app.tagline}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${app.color}20` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: app.color }}
                  />
                </div>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
                data-testid={`text-description-${app.id}`}
              >
                {app.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {app.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: `${app.color}12`,
                      border: `1px solid ${app.color}25`,
                      color: `${app.color}`,
                    }}
                    data-testid={`badge-feature-${app.id}-${feature.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  if (app.id === "chinaimports") {
                    const authed = localStorage.getItem(CHINAIMPORTS_AUTH_KEY) === "true";
                    navigate(authed ? "/chinaimports/chat" : "/chinaimports/onboarding");
                  } else if (app.id === "supranshub") {
                    const authed = localStorage.getItem(SUPRANSHUB_AUTH_KEY) === "true";
                    navigate(authed ? "/supranshub/home" : "/supranshub/onboarding");
                  } else {
                    navigate(app.path);
                  }
                }}
                className="w-full rounded-2xl py-3.5 text-sm font-semibold text-white transition-all active:scale-[0.98] mt-auto"
                style={{
                  background: `linear-gradient(135deg, ${app.color} 0%, ${app.color}cc 100%)`,
                  boxShadow: `0 8px 24px ${app.color}40`,
                }}
                data-testid={`btn-launch-${app.id}`}
              >
                View App →
              </button>
            </div>
          </div>
        ))}
      </section>

      <footer className="relative z-10 text-center pb-8">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Rendered at 375 × 812 px — standard mobile dimensions
        </p>
      </footer>
    </div>
  );
}
