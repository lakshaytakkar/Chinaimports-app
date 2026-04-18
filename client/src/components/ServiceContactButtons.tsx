import { Phone, Calendar } from "lucide-react";

export const SUPRANS_SUPPORT_PHONE = "+91 22 6900 4200";
export const SUPRANS_SUPPORT_TEL = "tel:+912269004200";

export function ServiceContactButtons({
  onBookDemo,
  primaryColor,
  testIdPrefix = "service",
}: {
  onBookDemo: () => void;
  primaryColor: string;
  testIdPrefix?: string;
}) {
  return (
    <div className="flex gap-2 w-full">
      <a
        href={SUPRANS_SUPPORT_TEL}
        data-testid={`btn-${testIdPrefix}-call`}
        aria-label={`Call ${SUPRANS_SUPPORT_PHONE}`}
        className="flex-1 h-11 rounded-2xl bg-white border-2 flex items-center justify-center gap-1.5 text-[13px] font-bold active:scale-[0.98] transition-transform"
        style={{ color: primaryColor, borderColor: primaryColor }}
      >
        <Phone size={15} strokeWidth={2.4} />
        Call
      </a>
      <button
        type="button"
        data-testid={`btn-${testIdPrefix}-book-demo`}
        onClick={onBookDemo}
        className="flex-1 h-11 rounded-2xl flex items-center justify-center gap-1.5 text-[13px] font-bold text-white active:scale-[0.98] transition-transform"
        style={{ background: primaryColor }}
      >
        <Calendar size={15} strokeWidth={2.4} />
        Book a Demo
      </button>
    </div>
  );
}
