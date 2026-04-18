import { Receipt, CreditCard, FileText, Bell, LifeBuoy, LogOut, ChevronRight } from "lucide-react";

const ROWS = [
  { id: "billing", Icon: Receipt, label: "Unified Billing", sub: "View all invoices across Suprans products" },
  { id: "payments", Icon: CreditCard, label: "Payment Methods", sub: "Cards, UPI, bank accounts" },
  { id: "documents", Icon: FileText, label: "Documents", sub: "GST invoices, agreements, KYC" },
  { id: "notifications", Icon: Bell, label: "Notifications", sub: "Email, SMS, in-app preferences" },
  { id: "support", Icon: LifeBuoy, label: "Support", sub: "Help center, raise a ticket" },
];

export default function SupransHubAccountTab({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="w-full h-full overflow-y-auto bg-supranshub-canvas">
      <div className="px-5 pt-12 pb-2">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-supranshub-ink-tertiary">
          Suprans Hub
        </p>
        <h1 className="text-[26px] font-bold text-supranshub-ink leading-tight mt-1">
          Account
        </h1>
      </div>

      <div className="px-5 pt-5">
        <div className="bg-white rounded-2xl border border-supranshub-border p-4 flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-[22px] text-white shrink-0"
            style={{ background: "var(--supranshub-gold)" }}
          >
            L
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-bold text-supranshub-ink leading-tight">
              Lakshay Suprans
            </p>
            <p className="text-[12.5px] text-supranshub-ink-secondary leading-tight mt-0.5">
              +91 98XXX XX210
            </p>
            <p className="text-[11px] text-supranshub-ink-tertiary leading-tight mt-1">
              GST · 27ABCDE1234F1Z5
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-2">
        <p className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
          Manage
        </p>
        <div className="bg-white rounded-2xl border border-supranshub-border overflow-hidden">
          {ROWS.map((row, i) => (
            <button
              key={row.id}
              data-testid={`row-account-${row.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-supranshub-canvas transition-colors ${
                i > 0 ? "border-t border-supranshub-border" : ""
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--supranshub-red-light)" }}
              >
                <row.Icon size={17} color="var(--supranshub-red)" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-[13.5px] font-semibold text-supranshub-ink leading-tight">
                  {row.label}
                </p>
                <p className="text-[11px] text-supranshub-ink-tertiary leading-tight mt-0.5">
                  {row.sub}
                </p>
              </div>
              <ChevronRight size={16} color="var(--supranshub-ink-tertiary)" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5 pb-8">
        <button
          data-testid="btn-supranshub-logout"
          onClick={onLogout}
          className="w-full h-[48px] rounded-2xl bg-white border border-supranshub-border flex items-center justify-center gap-2 text-supranshub-red font-semibold text-[14px] active:bg-supranshub-red-light"
        >
          <LogOut size={16} />
          Log out
        </button>
        <p className="text-center text-[10.5px] text-supranshub-ink-tertiary mt-4">
          Suprans Hub v1.0 · Suprans Group
        </p>
      </div>
    </div>
  );
}
