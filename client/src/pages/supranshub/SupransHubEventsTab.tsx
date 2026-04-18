import { MapPin } from "lucide-react";
import { EVENTS } from "./constants";

const TYPE_COLOR: Record<string, { bg: string; fg: string }> = {
  Tour: { bg: "#FEF0F0", fg: "#F03B3B" },
  Webinar: { bg: "#E8EFF8", fg: "#1F4E8C" },
  Meetup: { bg: "#E1F2EC", fg: "#0E7A5C" },
  Launch: { bg: "#F5EBD8", fg: "#8C6A2C" },
};

export default function SupransHubEventsTab() {
  return (
    <div className="w-full h-full overflow-y-auto bg-supranshub-canvas">
      <div className="px-5 pt-12 pb-2">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-supranshub-ink-tertiary">
          Suprans Hub
        </p>
        <h1 className="text-[26px] font-bold text-supranshub-ink leading-tight mt-1">
          Upcoming Events
        </h1>
        <p className="text-[13px] text-supranshub-ink-secondary mt-1">
          Tours, webinars, meetups, and launches across the ecosystem.
        </p>
      </div>

      <div className="px-5 pt-5 pb-6 flex flex-col gap-3">
        {EVENTS.map((e) => {
          const colors = TYPE_COLOR[e.type];
          return (
            <div
              key={e.id}
              data-testid={`card-event-${e.id}`}
              className="bg-white rounded-2xl border border-supranshub-border p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full self-start"
                    style={{ background: colors.bg, color: colors.fg }}
                  >
                    {e.type}
                  </span>
                  <h3 className="text-[15px] font-bold text-supranshub-ink leading-tight">
                    {e.title}
                  </h3>
                </div>
                <div
                  className="text-right shrink-0"
                  style={{ color: "var(--supranshub-ink-secondary)" }}
                >
                  <p className="text-[11px] font-semibold leading-tight">
                    {e.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-supranshub-ink-tertiary">
                <MapPin size={13} />
                <span>{e.location}</span>
              </div>
              <p className="text-[12.5px] text-supranshub-ink-secondary leading-snug">
                {e.description}
              </p>
              <button
                data-testid={`btn-event-learn-${e.id}`}
                className="self-start text-[12px] font-bold text-supranshub-red"
              >
                Learn more →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
