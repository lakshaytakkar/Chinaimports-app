import { SERVICES } from "./constants";

const STATUS_COLOR: Record<string, { bg: string; fg: string }> = {
  Active: { bg: "#E1F2EC", fg: "#0E7A5C" },
  Trial: { bg: "#F5EBD8", fg: "#8C6A2C" },
  "Renewal Due": { bg: "#FEF0F0", fg: "#F03B3B" },
  "2 Active Orders": { bg: "#E8EFF8", fg: "#1F4E8C" },
};

export default function SupransHubServicesTab() {
  return (
    <div className="w-full h-full overflow-y-auto bg-supranshub-canvas">
      <div className="px-5 pt-12 pb-2">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-supranshub-ink-tertiary">
          Suprans Hub
        </p>
        <h1 className="text-[26px] font-bold text-supranshub-ink leading-tight mt-1">
          My Services
        </h1>
        <p className="text-[13px] text-supranshub-ink-secondary mt-1">
          Everything you have active across Suprans.
        </p>
      </div>

      <div className="px-5 pt-5 pb-6 flex flex-col gap-3">
        {SERVICES.map((s) => {
          const c = STATUS_COLOR[s.status];
          return (
            <div
              key={s.id}
              data-testid={`card-service-${s.id}`}
              className="bg-white rounded-2xl border border-supranshub-border p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[14.5px] font-bold text-supranshub-ink leading-tight flex-1">
                  {s.product}
                </h3>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: c.bg, color: c.fg }}
                >
                  {s.status}
                </span>
              </div>
              <p className="text-[12.5px] text-supranshub-ink-secondary leading-snug">
                {s.description}
              </p>
              <button
                data-testid={`btn-service-manage-${s.id}`}
                className="self-start text-[12px] font-bold text-supranshub-red"
              >
                Manage →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
