import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  X,
  Camera,
  Image as ImageIcon,
  Link as LinkIcon,
  Check,
  Plane,
  Ship,
  ChevronDown,
  ChevronUp,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import { addRequest, type SourcingRequest } from "./requestStore";

interface FlowProps {
  onClose: () => void;
  onSubmitted: (req: SourcingRequest) => void;
}

type ImageSource = "camera" | "upload" | "url" | null;

interface FormState {
  imageSource: ImageSource;
  image: string | null;
  productName: string;
  requirements: string;
  quantity: string;
  unit: string;
  shippingSpeed: "air" | "sea" | null;
  targetPrice: string;
  currentPrice: string;
  currentPriceLink: string;
  purpose: string;
}

const INITIAL: FormState = {
  imageSource: null,
  image: null,
  productName: "",
  requirements: "",
  quantity: "",
  unit: "pcs",
  shippingSpeed: null,
  targetPrice: "",
  currentPrice: "",
  currentPriceLink: "",
  purpose: "",
};

const TOTAL_STEPS = 6;
const STEP_TITLES = [
  "Add product image",
  "Name your product",
  "Requirements & quantity",
  "How fast do you need it?",
  "Optional details",
  "Review & submit",
];

export default function SupransRequestFlow({ onClose, onSubmitted }: FlowProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submittedReq, setSubmittedReq] = useState<SourcingRequest | null>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 220);
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const canProceed = () => {
    if (step === 1) return !!form.image;
    if (step === 2) return form.productName.trim().length >= 2;
    if (step === 3) return form.requirements.trim().length >= 5 && form.quantity.trim().length > 0;
    if (step === 4) return form.shippingSpeed !== null;
    return true;
  };

  const goNext = () => {
    if (!canProceed()) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
  };
  const goBack = () => {
    if (step > 1) setStep(step - 1);
    else handleClose();
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const newReq = addRequest({
        productName: form.productName,
        imageSource: form.imageSource,
        image: form.image,
        requirements: form.requirements,
        quantity: form.quantity,
        unit: form.unit,
        shippingSpeed: form.shippingSpeed,
        targetPrice: form.targetPrice,
        currentPrice: form.currentPrice,
        currentPriceLink: form.currentPriceLink,
        purpose: form.purpose,
      });
      setSubmittedReq(newReq);
      setSubmitting(false);
    }, 600);
  };

  const handleContinueAfterSuccess = () => {
    if (!submittedReq) return;
    setVisible(false);
    setTimeout(() => onSubmitted(submittedReq), 220);
  };

  useEffect(() => {
    if (submittedReq) {
      const t = setTimeout(() => handleContinueAfterSuccess(), 2200);
      return () => clearTimeout(t);
    }
  }, [submittedReq]);

  return (
    <div className="absolute inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />
      <div
        className="absolute inset-0 bg-suprans-canvas transition-transform duration-300 ease-out flex flex-col"
        style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}
      >
        {submittedReq ? (
          <SuccessState req={submittedReq} onContinue={handleContinueAfterSuccess} />
        ) : (
          <>
            <FlowHeader
              step={step}
              total={TOTAL_STEPS}
              onBack={goBack}
              onClose={handleClose}
              title={STEP_TITLES[step - 1]}
            />
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {step === 1 && <Step1Image form={form} update={update} />}
              {step === 2 && <Step2Name form={form} update={update} />}
              {step === 3 && <Step3Requirements form={form} update={update} />}
              {step === 4 && <Step4Shipping form={form} update={update} />}
              {step === 5 && <Step5Optional form={form} update={update} />}
              {step === 6 && <Step6Review form={form} jumpTo={setStep} />}
            </div>
            <FlowFooter
              step={step}
              total={TOTAL_STEPS}
              canProceed={canProceed()}
              submitting={submitting}
              onNext={goNext}
              onSubmit={handleSubmit}
              onSkip={step === 5 ? goNext : undefined}
            />
          </>
        )}
      </div>
    </div>
  );
}

function FlowHeader({
  step,
  total,
  onBack,
  onClose,
  title,
}: {
  step: number;
  total: number;
  onBack: () => void;
  onClose: () => void;
  title: string;
}) {
  const pct = (step / total) * 100;
  return (
    <div className="bg-white px-4 pt-4 pb-3 border-b border-suprans-border shrink-0">
      <div className="flex items-center gap-3 mb-3">
        <button
          data-testid="btn-flow-back"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-suprans-canvas active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} color="var(--suprans-ink)" strokeWidth={2} />
        </button>
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-suprans-ink-tertiary uppercase tracking-wider">
            Step {step} of {total}
          </p>
          <p className="text-[15px] font-bold text-suprans-ink leading-tight">{title}</p>
        </div>
        <button
          data-testid="btn-flow-close"
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-suprans-canvas active:scale-95 transition-transform"
        >
          <X size={20} color="var(--suprans-ink-secondary)" strokeWidth={2} />
        </button>
      </div>
      <div className="h-1.5 rounded-full bg-suprans-canvas overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%`, background: "var(--suprans-red)" }}
        />
      </div>
    </div>
  );
}

function FlowFooter({
  step,
  total,
  canProceed,
  submitting,
  onNext,
  onSubmit,
  onSkip,
}: {
  step: number;
  total: number;
  canProceed: boolean;
  submitting: boolean;
  onNext: () => void;
  onSubmit: () => void;
  onSkip?: () => void;
}) {
  const isLast = step === total;
  return (
    <div className="bg-white border-t border-suprans-border px-5 py-4 shrink-0 flex items-center gap-3">
      {onSkip && (
        <button
          data-testid="btn-flow-skip"
          onClick={onSkip}
          className="h-12 px-5 rounded-2xl text-[14px] font-semibold text-suprans-ink-secondary hover:bg-suprans-canvas active:scale-95 transition-transform"
        >
          Skip
        </button>
      )}
      <button
        data-testid={isLast ? "btn-flow-submit" : "btn-flow-next"}
        onClick={isLast ? onSubmit : onNext}
        disabled={!canProceed || submitting}
        className="flex-1 h-12 rounded-2xl text-[15px] font-bold text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-40"
        style={{ background: "var(--suprans-red)" }}
      >
        {submitting ? (
          <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : isLast ? (
          "Submit Request"
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
}

function Step1Image({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");

  const handleFile = (file: File | null, source: "camera" | "upload") => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update("image", reader.result as string);
      update("imageSource", source);
    };
    reader.readAsDataURL(file);
  };

  const handleUrl = () => {
    if (!urlInput.trim()) return;
    update("image", urlInput.trim());
    update("imageSource", "url");
  };

  const sourceLabel: Record<Exclude<ImageSource, null>, string> = {
    camera: "Photo from camera",
    upload: "Uploaded from gallery",
    url: "Reference link",
  };

  if (form.image) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-[13px] text-suprans-ink-secondary leading-relaxed">
          Great. Here's your reference image — we'll use this to brief our sourcing team.
        </p>
        <div
          data-testid="image-preview"
          className="bg-white rounded-2xl border border-suprans-border overflow-hidden"
        >
          <img
            src={form.image}
            alt="Reference"
            className="w-full h-[260px] object-cover bg-suprans-canvas"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "var(--suprans-red-light)" }}
              >
                <Check size={14} color="var(--suprans-red)" strokeWidth={2.5} />
              </span>
              <span className="text-[12px] font-semibold text-suprans-ink-secondary">
                {form.imageSource && sourceLabel[form.imageSource]}
              </span>
            </div>
            <button
              data-testid="btn-image-change"
              onClick={() => {
                update("image", null);
                update("imageSource", null);
                setUrlInput("");
              }}
              className="text-[12px] font-bold text-suprans-red active:scale-95 transition-transform"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-suprans-ink-secondary leading-relaxed">
        Add a clear reference so our sourcing team knows exactly what you need. You can take a photo, pick from your gallery, or paste a link.
      </p>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null, "camera")}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null, "upload")}
      />

      <ImageSourceCard
        testId="img-src-camera"
        Icon={Camera}
        title="Take a photo"
        sub="Use your camera to snap the product"
        onClick={() => cameraRef.current?.click()}
      />
      <ImageSourceCard
        testId="img-src-upload"
        Icon={ImageIcon}
        title="Upload from gallery"
        sub="Pick a screenshot or saved photo"
        onClick={() => galleryRef.current?.click()}
      />

      <div className="bg-white rounded-2xl border border-suprans-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--suprans-red-light)" }}
          >
            <LinkIcon size={18} color="var(--suprans-red)" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-suprans-ink">Paste a reference link</p>
            <p className="text-[11px] text-suprans-ink-tertiary">From Alibaba, Amazon, Pinterest…</p>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            data-testid="input-image-url"
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://…"
            className="flex-1 h-11 px-3 rounded-xl bg-suprans-canvas border border-suprans-border text-[13px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none focus:border-suprans-red transition-colors"
          />
          <button
            data-testid="btn-image-url-add"
            onClick={handleUrl}
            disabled={!urlInput.trim()}
            className="h-11 px-4 rounded-xl text-[13px] font-bold text-white active:scale-95 transition-transform disabled:opacity-40"
            style={{ background: "var(--suprans-red)" }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageSourceCard({
  testId,
  Icon,
  title,
  sub,
  onClick,
}: {
  testId: string;
  Icon: React.ElementType;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className="bg-white rounded-2xl border border-suprans-border p-4 flex items-center gap-3 text-left active:scale-[0.98] hover:border-suprans-red/40 transition-all"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "var(--suprans-red-light)" }}
      >
        <Icon size={18} color="var(--suprans-red)" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <p className="text-[14px] font-bold text-suprans-ink">{title}</p>
        <p className="text-[11px] text-suprans-ink-tertiary">{sub}</p>
      </div>
    </button>
  );
}

function Step2Name({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const tooShort = form.productName.trim().length > 0 && form.productName.trim().length < 2;
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-suprans-ink-secondary leading-relaxed">
        Give your request a name. Be specific so it's easy to find later.
      </p>
      <div>
        <label className="text-[12px] font-semibold text-suprans-ink-secondary mb-2 block">
          Product name
        </label>
        <input
          data-testid="input-product-name"
          type="text"
          value={form.productName}
          onChange={(e) => update("productName", e.target.value)}
          placeholder="e.g. Merino Wool Sweaters — Autumn 2026"
          className="w-full h-12 px-4 rounded-xl bg-white border border-suprans-border text-[14px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none focus:border-suprans-red transition-colors"
          autoFocus
        />
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-suprans-ink-tertiary">2–80 characters</span>
          <span className="text-[11px] text-suprans-ink-tertiary">
            {form.productName.length}/80
          </span>
        </div>
        {tooShort && (
          <p data-testid="error-name" className="text-[11px] text-suprans-red mt-1 font-semibold">
            Please enter at least 2 characters.
          </p>
        )}
      </div>
    </div>
  );
}

const UNITS = ["pcs", "kg", "units", "boxes", "tons", "metres"];

function Step3Requirements({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-suprans-ink-secondary leading-relaxed">
        The more specific you are, the faster we can match the right supplier.
      </p>
      <div>
        <label className="text-[12px] font-semibold text-suprans-ink-secondary mb-2 block">
          Requirements & specifications
        </label>
        <textarea
          data-testid="input-requirements"
          value={form.requirements}
          onChange={(e) => update("requirements", e.target.value)}
          placeholder="Material, dimensions, colors, certifications, packaging, etc."
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-white border border-suprans-border text-[14px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none focus:border-suprans-red transition-colors resize-none leading-relaxed"
        />
      </div>
      <div>
        <label className="text-[12px] font-semibold text-suprans-ink-secondary mb-2 block">
          Quantity
        </label>
        <div className="flex gap-2">
          <input
            data-testid="input-quantity"
            type="number"
            inputMode="numeric"
            value={form.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            placeholder="e.g. 5000"
            className="flex-1 h-12 px-4 rounded-xl bg-white border border-suprans-border text-[14px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none focus:border-suprans-red transition-colors"
          />
          <div className="relative">
            <select
              data-testid="select-unit"
              value={form.unit}
              onChange={(e) => update("unit", e.target.value)}
              className="h-12 pl-4 pr-9 rounded-xl bg-white border border-suprans-border text-[14px] font-semibold text-suprans-ink outline-none focus:border-suprans-red appearance-none cursor-pointer"
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              color="var(--suprans-ink-tertiary)"
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4Shipping({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const options = [
    {
      id: "air" as const,
      Icon: Plane,
      title: "Air freight",
      eta: "7–10 days",
      sub: "Faster delivery, ideal for urgent or smaller shipments.",
      tint: "#DBEAFE",
      tintFg: "#2563EB",
    },
    {
      id: "sea" as const,
      Icon: Ship,
      title: "Sea freight",
      eta: "~ 45 days",
      sub: "Most economical for large or bulky orders.",
      tint: "#CFFAFE",
      tintFg: "#0891B2",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-suprans-ink-secondary leading-relaxed">
        Pick a shipping speed. You can always change this later when we share quotes.
      </p>
      {options.map((opt) => {
        const selected = form.shippingSpeed === opt.id;
        return (
          <button
            key={opt.id}
            data-testid={`shipping-${opt.id}`}
            onClick={() => update("shippingSpeed", opt.id)}
            className="bg-white rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-all"
            style={{
              border: selected ? "2px solid var(--suprans-red)" : "1px solid var(--suprans-border)",
              background: selected ? "var(--suprans-red-light)" : "white",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: opt.tint }}
            >
              <opt.Icon size={26} color={opt.tintFg} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[15px] font-bold text-suprans-ink">{opt.title}</p>
                <span className="text-[11px] font-bold text-suprans-red">{opt.eta}</span>
              </div>
              <p className="text-[12px] text-suprans-ink-secondary mt-0.5 leading-snug">{opt.sub}</p>
            </div>
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: selected ? "var(--suprans-red)" : "transparent",
                border: selected ? "none" : "1.5px solid var(--suprans-border)",
              }}
            >
              {selected && <Check size={14} color="white" strokeWidth={3} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Step5Optional({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col gap-4">
      <div
        className="px-4 py-3 rounded-xl flex items-center gap-2"
        style={{ background: "var(--suprans-red-light)" }}
      >
        <Check size={14} color="var(--suprans-red)" strokeWidth={2.5} />
        <span className="text-[12px] font-semibold text-suprans-red">
          All fields below are optional — skip if you'd like.
        </span>
      </div>

      <button
        data-testid="btn-toggle-optional"
        onClick={() => setOpen((o) => !o)}
        className="bg-white rounded-2xl border border-suprans-border px-4 py-3 flex items-center justify-between active:scale-[0.99] transition-transform"
      >
        <span className="text-[13px] font-bold text-suprans-ink">Pricing & purpose details</span>
        {open ? (
          <ChevronUp size={18} color="var(--suprans-ink-secondary)" strokeWidth={2} />
        ) : (
          <ChevronDown size={18} color="var(--suprans-ink-secondary)" strokeWidth={2} />
        )}
      </button>

      {open && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[12px] font-semibold text-suprans-ink-secondary mb-2 block">
              Target price
            </label>
            <input
              data-testid="input-target-price"
              type="text"
              value={form.targetPrice}
              onChange={(e) => update("targetPrice", e.target.value)}
              placeholder="e.g. ₹500/pc"
              className="w-full h-12 px-4 rounded-xl bg-white border border-suprans-border text-[14px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none focus:border-suprans-red transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-suprans-ink-secondary mb-2 block">
              Current buying price
            </label>
            <input
              data-testid="input-current-price"
              type="text"
              value={form.currentPrice}
              onChange={(e) => update("currentPrice", e.target.value)}
              placeholder="e.g. ₹620/pc"
              className="w-full h-12 px-4 rounded-xl bg-white border border-suprans-border text-[14px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none focus:border-suprans-red transition-colors mb-2"
            />
            <input
              data-testid="input-current-price-link"
              type="url"
              value={form.currentPriceLink}
              onChange={(e) => update("currentPriceLink", e.target.value)}
              placeholder="Reference link (optional)"
              className="w-full h-12 px-4 rounded-xl bg-white border border-suprans-border text-[14px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none focus:border-suprans-red transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-suprans-ink-secondary mb-2 block">
              Purpose / notes
            </label>
            <textarea
              data-testid="input-purpose"
              value={form.purpose}
              onChange={(e) => update("purpose", e.target.value)}
              placeholder="Why are you sourcing this? Any deadlines or context?"
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white border border-suprans-border text-[14px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none focus:border-suprans-red transition-colors resize-none leading-relaxed"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Step6Review({
  form,
  jumpTo,
}: {
  form: FormState;
  jumpTo: (step: number) => void;
}) {
  const sections: { step: number; title: string; rows: { label: string; value: string }[] }[] = [
    {
      step: 1,
      title: "Reference image",
      rows: [{ label: "Source", value: form.imageSource ?? "—" }],
    },
    { step: 2, title: "Product name", rows: [{ label: "Name", value: form.productName || "—" }] },
    {
      step: 3,
      title: "Requirements & quantity",
      rows: [
        { label: "Requirements", value: form.requirements || "—" },
        { label: "Quantity", value: form.quantity ? `${form.quantity} ${form.unit}` : "—" },
      ],
    },
    {
      step: 4,
      title: "Shipping speed",
      rows: [
        {
          label: "Mode",
          value:
            form.shippingSpeed === "air"
              ? "Air freight (7–10 days)"
              : form.shippingSpeed === "sea"
                ? "Sea freight (~45 days)"
                : "—",
        },
      ],
    },
    {
      step: 5,
      title: "Optional details",
      rows: [
        { label: "Target price", value: form.targetPrice || "—" },
        { label: "Current price", value: form.currentPrice || "—" },
        { label: "Reference link", value: form.currentPriceLink || "—" },
        { label: "Purpose", value: form.purpose || "—" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-suprans-ink-secondary leading-relaxed">
        Take one last look. You can edit any section before submitting.
      </p>

      {form.image && (
        <div className="bg-white rounded-2xl overflow-hidden border border-suprans-border">
          <img
            src={form.image}
            alt="Reference"
            className="w-full h-[180px] object-cover bg-suprans-canvas"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      {sections.map((sec) => (
        <div key={sec.step} className="bg-white rounded-2xl border border-suprans-border p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[13px] font-bold text-suprans-ink">{sec.title}</p>
            <button
              data-testid={`btn-edit-step-${sec.step}`}
              onClick={() => jumpTo(sec.step)}
              className="flex items-center gap-1 text-[12px] font-bold text-suprans-red active:scale-95 transition-transform"
            >
              <Pencil size={12} strokeWidth={2.5} />
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-1.5">
            {sec.rows.map((row, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-suprans-ink-tertiary uppercase tracking-wider">
                  {row.label}
                </span>
                <span className="text-[13px] text-suprans-ink leading-snug whitespace-pre-wrap">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SuccessState({ req, onContinue }: { req: SourcingRequest; onContinue: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 bg-suprans-canvas">
      <div
        data-testid="success-tick"
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6 animate-success-pop"
        style={{ background: "var(--suprans-red-light)" }}
      >
        <CheckCircle2
          size={56}
          color="var(--suprans-red)"
          strokeWidth={2}
          fill="var(--suprans-red)"
          stroke="white"
        />
      </div>
      <h2 className="text-[22px] font-black text-suprans-ink text-center mb-2">
        Request submitted
      </h2>
      <p className="text-[13px] text-suprans-ink-secondary text-center leading-relaxed mb-1 max-w-[300px]">
        Your sourcing request{" "}
        <span className="font-bold text-suprans-ink">{req.id}</span> has been received.
      </p>
      <p className="text-[12px] text-suprans-ink-tertiary text-center leading-relaxed mb-8 max-w-[300px]">
        A sourcing specialist will be assigned within the next few hours and will reach out via chat.
      </p>
      <button
        data-testid="btn-success-continue"
        onClick={onContinue}
        className="h-12 px-8 rounded-2xl text-[14px] font-bold text-white active:scale-95 transition-transform"
        style={{ background: "var(--suprans-red)" }}
      >
        See request details
      </button>
      <style>{`
        @keyframes success-pop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-success-pop { animation: success-pop 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
}
