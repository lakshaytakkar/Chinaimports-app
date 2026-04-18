import { Bell } from "lucide-react";
import { PRODUCTS, type Product } from "./constants";

export default function SupransHubHomeTab({
  onOpenProduct,
}: {
  onOpenProduct: (id: string) => void;
}) {
  return (
    <div className="w-full h-full overflow-y-auto bg-supranshub-canvas">
      <div className="px-5 pt-12 pb-4 flex items-start justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-supranshub-ink-tertiary">
            Suprans Hub
          </p>
          <h1 className="text-[26px] font-bold text-supranshub-ink leading-tight mt-1">
            Welcome back, Lakshay
          </h1>
          <p className="text-[13px] text-supranshub-ink-secondary mt-1">
            Every Suprans product, in one place.
          </p>
        </div>
        <button
          data-testid="btn-supranshub-notifications"
          className="w-10 h-10 rounded-full bg-white border border-supranshub-border flex items-center justify-center"
        >
          <Bell size={18} color="var(--supranshub-ink-secondary)" />
        </button>
      </div>

      <div className="px-5 mt-3 mb-4">
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, #1A1612 0%, #4A443E 100%)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-black text-[18px]"
            style={{ background: "var(--supranshub-gold)" }}
          >
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-semibold leading-tight">
              Unified billing is now live
            </p>
            <p className="text-white/60 text-[11px] leading-tight mt-0.5">
              See every Suprans subscription on one tab.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5">
        <h2 className="text-[14px] font-bold text-supranshub-ink mb-3 uppercase tracking-wider">
          Explore
        </h2>
      </div>

      <div className="px-5 pb-6 grid grid-cols-2 gap-3">
        {PRODUCTS.map((p) => (
          <ProductTile key={p.id} product={p} onOpen={() => onOpenProduct(p.id)} />
        ))}
      </div>
    </div>
  );
}

function ProductTile({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <button
      data-testid={`tile-product-${product.id}`}
      onClick={onOpen}
      className="bg-white rounded-2xl border border-supranshub-border p-3 text-left flex flex-col gap-2 active:scale-[0.98] transition-transform"
      style={{ minHeight: 158 }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-[20px]"
        style={{ background: product.tileBg, color: product.tileColor }}
      >
        {product.monogram}
      </div>
      <div className="flex flex-col gap-0.5 mt-auto">
        <h3 className="text-[13.5px] font-bold text-supranshub-ink leading-tight">
          {product.name}
        </h3>
        <p className="text-[11px] text-supranshub-ink-tertiary leading-tight">
          {product.subtitle}
        </p>
        <p className="text-[11px] text-supranshub-ink-secondary leading-snug mt-1 line-clamp-2">
          {product.oneLiner}
        </p>
      </div>
    </button>
  );
}
