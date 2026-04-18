import { useEffect, useState } from "react";
import {
  X,
  Headphones,
  Sparkles,
  FileText,
  Gift,
  ArrowRight,
  Check,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { PRODUCTS } from "./constants";

export type ConciergeAction = "advisor" | "ai" | "quote" | "refer";

const ACTIONS: {
  id: ConciergeAction;
  label: string;
  blurb: string;
  Icon: typeof Headphones;
  bg: string;
  fg: string;
}[] = [
  {
    id: "advisor",
    label: "Talk to an Advisor",
    blurb: "Book a 20-min call with a Suprans expert.",
    Icon: Headphones,
    bg: "#F5EBD8",
    fg: "#8C6A2C",
  },
  {
    id: "ai",
    label: "Ask Suprans AI",
    blurb: "Tell us your goal, get matched to a product.",
    Icon: Sparkles,
    bg: "#FEF0F0",
    fg: "#F03B3B",
  },
  {
    id: "quote",
    label: "Custom Quote",
    blurb: "Bundle services across products.",
    Icon: FileText,
    bg: "#E8EFF8",
    fg: "#1F4E8C",
  },
  {
    id: "refer",
    label: "Refer a Business",
    blurb: "Earn ₹5,000 per successful referral.",
    Icon: Gift,
    bg: "#E1F2EC",
    fg: "#0E7A5C",
  },
];

export function ConciergeSheet({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (a: ConciergeAction) => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-30 supranshub-fade-in">
      <button
        data-testid="overlay-concierge"
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-black/40"
      />
      <div
        className="absolute left-0 right-0 bottom-0 rounded-t-3xl bg-supranshub-canvas px-5 pt-4 pb-6"
        style={{
          boxShadow: "0 -12px 40px -8px rgba(0,0,0,0.25)",
          animation: "supranshub-sheet-up 260ms cubic-bezier(0.2,0.8,0.2,1) both",
        }}
      >
        <div className="w-12 h-1.5 rounded-full bg-supranshub-border mx-auto mb-4" />
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-supranshub-gold">
              Suprans Concierge
            </p>
            <h3 className="text-[20px] font-bold text-supranshub-ink leading-tight mt-1">
              How can we help?
            </h3>
          </div>
          <button
            data-testid="btn-concierge-close"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-supranshub-border flex items-center justify-center"
          >
            <X size={16} color="var(--supranshub-ink-secondary)" />
          </button>
        </div>
        <p className="text-[12.5px] text-supranshub-ink-secondary leading-snug mb-4">
          One concierge for every Suprans product. Pick what you need.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              data-testid={`btn-concierge-${a.id}`}
              onClick={() => onPick(a.id)}
              className="bg-white rounded-2xl border border-supranshub-border p-3 text-left flex flex-col gap-2 active:scale-[0.97] transition-transform"
              style={{ minHeight: 130 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: a.bg }}
              >
                <a.Icon size={18} color={a.fg} strokeWidth={2.2} />
              </div>
              <div className="mt-auto">
                <p className="text-[13px] font-bold text-supranshub-ink leading-tight">
                  {a.label}
                </p>
                <p className="text-[11px] text-supranshub-ink-tertiary leading-snug mt-0.5">
                  {a.blurb}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes supranshub-sheet-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const SLOTS = [
  { day: "Tomorrow", time: "11:30 AM" },
  { day: "Tomorrow", time: "4:00 PM" },
  { day: "Fri, Apr 24", time: "10:00 AM" },
  { day: "Fri, Apr 24", time: "2:30 PM" },
  { day: "Mon, Apr 27", time: "12:00 PM" },
];

const AI_SUGGESTIONS = [
  "I want to start selling in the US",
  "Open a US LLC for my Indian company",
  "Source 500 units from China",
  "Open a retail store with low investment",
];

const PRODUCT_OPTIONS = PRODUCTS.filter(
  (p) => !["events", "account-billing"].includes(p.id)
);

export function SupransConciergeFlow({
  action,
  onClose,
}: {
  action: ConciergeAction;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState<string>("");
  const [slot, setSlot] = useState<number | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiAsked, setAiAsked] = useState(false);
  const [productCtx, setProductCtx] = useState<string>("");
  const [quoteProducts, setQuoteProducts] = useState<string[]>([]);
  const [quoteBrief, setQuoteBrief] = useState("");
  const [referName, setReferName] = useState("");
  const [referContact, setReferContact] = useState("");
  const [referNote, setReferNote] = useState("");

  useEffect(() => {
    setSubmitted(false);
    setRefId("");
    setSlot(null);
    setAiPrompt("");
    setAiAsked(false);
    setProductCtx("");
    setQuoteProducts([]);
    setQuoteBrief("");
    setReferName("");
    setReferContact("");
    setReferNote("");
  }, [action]);

  const meta = ACTIONS.find((a) => a.id === action)!;
  const canSubmit =
    action === "advisor"
      ? slot !== null
      : action === "ai"
      ? aiAsked
      : action === "quote"
      ? quoteProducts.length > 0 && quoteBrief.trim().length > 4
      : referName.trim().length > 1 && referContact.trim().length > 4;

  const submitLabel =
    action === "advisor"
      ? "Confirm slot"
      : action === "ai"
      ? "Send to a human advisor"
      : action === "quote"
      ? "Request quote"
      : "Send referral";

  const successCopy =
    action === "advisor"
      ? {
          title: "Slot confirmed",
          body: "Your Suprans advisor will join the call. We've sent a calendar invite to your registered email.",
        }
      : action === "ai"
      ? {
          title: "Handed off to a human",
          body: "An advisor will follow up on your question within 4 working hours.",
        }
      : action === "quote"
      ? {
          title: "Quote request received",
          body: "We'll prepare a bundled quote across the selected products and share it within 24 hours.",
        }
      : {
          title: "Referral submitted",
          body: "We'll reach out to your contact and credit ₹5,000 to your account once they sign up.",
        };

  return (
    <div className="absolute inset-0 z-40 bg-supranshub-canvas flex flex-col supranshub-fade-in">
      <div
        className="px-5 pt-12 pb-5 flex items-center gap-3"
        style={{ background: meta.bg }}
      >
        <button
          data-testid="btn-concierge-back"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/80 border border-white flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowLeft size={18} color={meta.fg} />
        </button>
        <div className="flex-1 min-w-0">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ color: meta.fg, opacity: 0.7 }}
          >
            Suprans Concierge
          </p>
          <h1
            className="text-[20px] font-bold leading-tight mt-0.5"
            style={{ color: meta.fg }}
            data-testid="text-concierge-title"
          >
            {meta.label}
          </h1>
        </div>
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white shrink-0"
          style={{ color: meta.fg }}
        >
          <meta.Icon size={20} color={meta.fg} strokeWidth={2.2} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        {submitted ? (
          <SuccessState
            title={successCopy.title}
            body={successCopy.body}
            color={meta.fg}
            bg={meta.bg}
            refId={refId}
          />
        ) : action === "advisor" ? (
          <AdvisorForm
            slot={slot}
            setSlot={setSlot}
            productCtx={productCtx}
            setProductCtx={setProductCtx}
          />
        ) : action === "ai" ? (
          <AskAIForm
            prompt={aiPrompt}
            setPrompt={setAiPrompt}
            asked={aiAsked}
            setAsked={setAiAsked}
          />
        ) : action === "quote" ? (
          <QuoteForm
            picked={quoteProducts}
            setPicked={setQuoteProducts}
            brief={quoteBrief}
            setBrief={setQuoteBrief}
          />
        ) : (
          <ReferForm
            name={referName}
            setName={setReferName}
            contact={referContact}
            setContact={setReferContact}
            note={referNote}
            setNote={setReferNote}
          />
        )}
      </div>

      {!submitted && (
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-3 bg-supranshub-canvas border-t border-supranshub-border">
          <button
            data-testid="btn-concierge-submit"
            onClick={() => {
              setRefId(`SH-${Math.floor(100000 + Math.random() * 900000)}`);
              setSubmitted(true);
            }}
            disabled={!canSubmit}
            className="w-full h-[52px] rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 text-white disabled:opacity-40 active:opacity-90 transition-opacity"
            style={{ background: meta.fg }}
          >
            {submitLabel}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
      {submitted && (
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-3 bg-supranshub-canvas border-t border-supranshub-border">
          <button
            data-testid="btn-concierge-done"
            onClick={onClose}
            className="w-full h-[52px] rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 text-white active:opacity-90"
            style={{ background: "var(--supranshub-ink)" }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

function SuccessState({
  title,
  body,
  color,
  bg,
  refId,
}: {
  title: string;
  body: string;
  color: string;
  bg: string;
  refId: string;
}) {
  return (
    <div className="flex flex-col items-center text-center pt-10">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
        style={{ background: bg }}
      >
        <Check size={36} color={color} strokeWidth={3} />
      </div>
      <h2 className="text-[22px] font-bold text-supranshub-ink leading-tight">
        {title}
      </h2>
      <p className="text-[13.5px] text-supranshub-ink-secondary leading-relaxed max-w-[280px] mt-2">
        {body}
      </p>
      <div className="bg-white rounded-2xl border border-supranshub-border px-4 py-3 mt-6 text-left w-full">
        <p className="text-[11px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary">
          Reference
        </p>
        <p className="text-[13px] font-mono text-supranshub-ink mt-1">
          {refId}
        </p>
      </div>
    </div>
  );
}

function AdvisorForm({
  slot,
  setSlot,
  productCtx,
  setProductCtx,
}: {
  slot: number | null;
  setSlot: (i: number) => void;
  productCtx: string;
  setProductCtx: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
          What's it about? (optional)
        </p>
        <div className="flex gap-2 flex-wrap">
          {["General", ...PRODUCT_OPTIONS.slice(0, 5).map((p) => p.name)].map((p) => (
            <button
              key={p}
              data-testid={`chip-advisor-${p}`}
              onClick={() => setProductCtx(productCtx === p ? "" : p)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-colors ${
                productCtx === p
                  ? "bg-supranshub-ink text-white border-supranshub-ink"
                  : "bg-white text-supranshub-ink-secondary border-supranshub-border"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
          Pick a slot · 20 min · Zoom
        </p>
        <div className="flex flex-col gap-2">
          {SLOTS.map((s, i) => {
            const active = slot === i;
            return (
              <button
                key={i}
                data-testid={`slot-${i}`}
                onClick={() => setSlot(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-colors ${
                  active
                    ? "border-supranshub-gold bg-supranshub-gold-light"
                    : "border-supranshub-border bg-white"
                }`}
              >
                <Calendar
                  size={18}
                  color={active ? "var(--supranshub-gold)" : "var(--supranshub-ink-tertiary)"}
                />
                <div className="flex-1">
                  <p className="text-[13.5px] font-semibold text-supranshub-ink leading-tight">
                    {s.day}
                  </p>
                  <p className="text-[12px] text-supranshub-ink-tertiary leading-tight mt-0.5">
                    {s.time} IST
                  </p>
                </div>
                {active && (
                  <div className="w-6 h-6 rounded-full bg-supranshub-gold flex items-center justify-center">
                    <Check size={13} color="white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AskAIForm({
  prompt,
  setPrompt,
  asked,
  setAsked,
}: {
  prompt: string;
  setPrompt: (v: string) => void;
  asked: boolean;
  setAsked: (v: boolean) => void;
}) {
  const matches = asked
    ? scoreProducts(prompt).slice(0, 3)
    : [];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
          Describe your goal
        </p>
        <div className="bg-white rounded-2xl border border-supranshub-border p-3 focus-within:border-supranshub-red transition-colors">
          <textarea
            data-testid="input-ai-prompt"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (asked) setAsked(false);
            }}
            placeholder="e.g. I want to launch my D2C brand in the US within 60 days..."
            className="w-full h-[88px] resize-none outline-none text-[13.5px] text-supranshub-ink placeholder:text-supranshub-ink-tertiary leading-snug"
          />
        </div>
        <button
          data-testid="btn-ai-ask"
          onClick={() => prompt.trim().length > 4 && setAsked(true)}
          disabled={prompt.trim().length < 5}
          className="mt-3 w-full h-11 rounded-xl bg-supranshub-red text-white font-semibold text-[13px] flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <Sparkles size={15} />
          Match me to a product
        </button>
      </div>

      {!asked && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
            Try one of these
          </p>
          <div className="flex gap-2 flex-wrap">
            {AI_SUGGESTIONS.map((s) => (
              <button
                key={s}
                data-testid={`chip-ai-${s.slice(0, 8)}`}
                onClick={() => setPrompt(s)}
                className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-white text-supranshub-ink-secondary border border-supranshub-border"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {asked && (
        <div className="supranshub-fade-in">
          <p className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
            Top matches
          </p>
          <div className="flex flex-col gap-2">
            {matches.map((p) => (
              <div
                key={p.id}
                data-testid={`match-${p.id}`}
                className="bg-white rounded-2xl border border-supranshub-border p-3 flex items-start gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-[16px] shrink-0"
                  style={{ background: p.tileBg, color: p.tileColor }}
                >
                  {p.monogram}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-bold text-supranshub-ink leading-tight">
                    {p.name}
                  </p>
                  <p className="text-[11px] text-supranshub-ink-tertiary leading-tight mt-0.5">
                    {p.subtitle}
                  </p>
                  <p className="text-[12px] text-supranshub-ink-secondary leading-snug mt-1.5">
                    {p.oneLiner}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11.5px] text-supranshub-ink-tertiary leading-snug mt-3">
            Want a human to walk you through it? Tap below to hand off to an
            advisor.
          </p>
        </div>
      )}
    </div>
  );
}

function scoreProducts(prompt: string) {
  const q = prompt.toLowerCase();
  const keywords: Record<string, string[]> = {
    "legal-nations": ["llc", "us company", "incorporate", "ein", "uk", "uae", "stripe", "register"],
    "usdrop-ai": ["dropship", "shopify", "us store", "selling in us", "ecommerce", "d2c"],
    "china-imports": ["source", "factory", "rfq", "import", "freight", "custom", "bulk", "manufacturer"],
    "china-products": ["catalog", "wholesale", "ready", "moq", "amazon", "gifting"],
    "eazytosell": ["franchise", "retail store", "store", "low investment"],
    "keeraft": ["furniture", "interior", "designer", "villa"],
    "la-bella-monte": ["watch", "watches", "gift"],
    "goyotours": ["tour", "travel", "trip", "visit china", "guangzhou", "yiwu"],
  };
  return PRODUCT_OPTIONS.map((p) => {
    const kws = keywords[p.id] || [];
    const score = kws.reduce((acc, k) => acc + (q.includes(k) ? 1 : 0), 0);
    return { ...p, score };
  })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .filter((p, i) => p.score > 0 || i < 3);
}

function QuoteForm({
  picked,
  setPicked,
  brief,
  setBrief,
}: {
  picked: string[];
  setPicked: (ids: string[]) => void;
  brief: string;
  setBrief: (v: string) => void;
}) {
  const toggle = (id: string) =>
    setPicked(picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
          Which products?
        </p>
        <div className="flex gap-2 flex-wrap">
          {PRODUCT_OPTIONS.map((p) => {
            const active = picked.includes(p.id);
            return (
              <button
                key={p.id}
                data-testid={`chip-quote-${p.id}`}
                onClick={() => toggle(p.id)}
                className={`px-3 py-2 rounded-2xl text-[12px] font-semibold border-2 flex items-center gap-2 transition-colors ${
                  active
                    ? "bg-supranshub-ink text-white border-supranshub-ink"
                    : "bg-white text-supranshub-ink-secondary border-supranshub-border"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center font-black text-[11px]"
                  style={{
                    background: active ? "rgba(255,255,255,0.18)" : p.tileBg,
                    color: active ? "white" : p.tileColor,
                  }}
                >
                  {p.monogram}
                </span>
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
          Brief
        </p>
        <div className="bg-white rounded-2xl border border-supranshub-border p-3 focus-within:border-supranshub-red transition-colors">
          <textarea
            data-testid="input-quote-brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Volume, timeline, budget, anything else we should know..."
            className="w-full h-[120px] resize-none outline-none text-[13.5px] text-supranshub-ink placeholder:text-supranshub-ink-tertiary leading-snug"
          />
        </div>
      </div>
    </div>
  );
}

function ReferForm({
  name,
  setName,
  contact,
  setContact,
  note,
  setNote,
}: {
  name: string;
  setName: (v: string) => void;
  contact: string;
  setContact: (v: string) => void;
  note: string;
  setNote: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-supranshub-border p-4 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "#E1F2EC" }}
        >
          <Gift size={18} color="#0E7A5C" strokeWidth={2.2} />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-bold text-supranshub-ink leading-tight">
            Earn ₹5,000 per signup
          </p>
          <p className="text-[11.5px] text-supranshub-ink-tertiary leading-tight mt-0.5">
            Credited to your Suprans Hub wallet within 7 days of activation.
          </p>
        </div>
      </div>

      <Field label="Their name" testId="input-refer-name" value={name} onChange={setName} placeholder="e.g. Priya Verma" />
      <Field
        label="Phone or email"
        testId="input-refer-contact"
        value={contact}
        onChange={setContact}
        placeholder="+91 98XXX XXXXX or name@company.com"
      />

      <div>
        <p className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
          What do they need? (optional)
        </p>
        <div className="bg-white rounded-2xl border border-supranshub-border p-3 focus-within:border-supranshub-red transition-colors">
          <textarea
            data-testid="input-refer-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="A line about their business or what they're looking for."
            className="w-full h-[88px] resize-none outline-none text-[13.5px] text-supranshub-ink placeholder:text-supranshub-ink-tertiary leading-snug"
          />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  testId,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  testId: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <p className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mb-2">
        {label}
      </p>
      <div className="bg-white rounded-2xl border border-supranshub-border focus-within:border-supranshub-red transition-colors">
        <input
          data-testid={testId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-[48px] px-4 outline-none bg-transparent text-[13.5px] text-supranshub-ink placeholder:text-supranshub-ink-tertiary"
        />
      </div>
    </div>
  );
}

