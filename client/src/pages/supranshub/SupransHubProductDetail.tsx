import { useLocation } from "wouter";
import { ArrowLeft, Check, ExternalLink, ArrowRight } from "lucide-react";
import { PRODUCTS } from "./constants";
import { CHINAIMPORTS_AUTH_KEY } from "../chinaimports/constants";

export default function SupransHubProductDetail({
  productId,
  onBack,
}: {
  productId: string;
  onBack: () => void;
}) {
  const [, navigate] = useLocation();
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-supranshub-canvas">
        <p className="text-supranshub-ink-secondary text-sm">Product not found</p>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full bg-supranshub-red text-white text-sm font-semibold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleCta = () => {
    if (product.ctaType === "external") {
      window.open(product.ctaTarget, "_blank", "noopener,noreferrer");
    } else if (product.ctaType === "internal") {
      if (product.id === "china-imports") {
        const authed = localStorage.getItem(CHINAIMPORTS_AUTH_KEY) === "true";
        navigate(authed ? "/chinaimports/chat" : "/chinaimports/onboarding");
      } else {
        navigate(product.ctaTarget);
      }
    } else if (product.ctaType === "tab") {
      navigate(product.ctaTarget);
    }
  };

  const isExternal = product.ctaType === "external";

  return (
    <div className="w-full h-full flex flex-col bg-supranshub-canvas">
      <div
        className="relative px-5 pt-12 pb-6"
        style={{ background: product.tileBg }}
      >
        <button
          data-testid="btn-supranshub-back"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/80 border border-white flex items-center justify-center mb-4 active:scale-95 transition-transform"
        >
          <ArrowLeft size={18} color={product.tileColor} />
        </button>
        <div className="flex items-start gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-[26px] shrink-0"
            style={{ background: "white", color: product.tileColor }}
          >
            {product.monogram}
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <h1
              className="text-[22px] font-bold leading-tight"
              style={{ color: product.tileColor }}
              data-testid="text-product-name"
            >
              {product.name}
            </h1>
            <p
              className="text-[12.5px] font-semibold mt-0.5"
              style={{ color: product.tileColor, opacity: 0.7 }}
            >
              {product.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        <div
          className="rounded-2xl p-4 border-l-4"
          style={{
            background: "white",
            borderColor: product.tileColor,
          }}
        >
          <p
            className="text-[14.5px] font-semibold leading-snug italic text-supranshub-ink"
            data-testid="text-product-oneliner"
          >
            “{product.oneLiner}”
          </p>
        </div>

        <h2 className="text-[12px] font-bold uppercase tracking-wider text-supranshub-ink-tertiary mt-6 mb-3">
          What you get
        </h2>
        <ul className="flex flex-col gap-2.5">
          {product.features.map((f, i) => (
            <li
              key={i}
              data-testid={`feature-${product.id}-${i}`}
              className="flex items-start gap-3 bg-white rounded-xl border border-supranshub-border p-3"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: product.tileBg }}
              >
                <Check size={13} color={product.tileColor} strokeWidth={3} />
              </div>
              <p className="text-[13px] text-supranshub-ink leading-snug">{f}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-3 bg-supranshub-canvas border-t border-supranshub-border">
        <button
          data-testid="btn-product-cta"
          onClick={handleCta}
          className="w-full h-[52px] rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 text-white active:opacity-90"
          style={{
            background: product.tileColor,
            boxShadow: `0 8px 20px -6px ${product.tileColor}80`,
          }}
        >
          {product.ctaLabel}
          {isExternal ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
}
