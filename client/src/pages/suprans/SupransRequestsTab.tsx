import { useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  ChevronRight,
  Search,
  MessageCircle,
  Copy,
  Trash2,
  Plane,
  Ship,
  Package,
  CheckCircle2,
  Circle,
  Activity,
} from "lucide-react";
import {
  cancelRequest,
  getRequestById,
  STATUS_COLOR,
  STATUS_ORDER,
  useRequests,
  type RequestStatus,
  type SourcingRequest,
} from "./requestStore";

interface RequestsTabProps {
  detailId: string | null;
  onOpenRequest: (id: string) => void;
  onBackToList: () => void;
  onRaiseRequest: () => void;
}

const FILTER_OPTIONS: ("All" | RequestStatus)[] = ["All", ...STATUS_ORDER];

export default function SupransRequestsTab({
  detailId,
  onOpenRequest,
  onBackToList,
  onRaiseRequest,
}: RequestsTabProps) {
  useRequests();

  if (detailId) {
    const req = getRequestById(detailId);
    if (req) {
      return <RequestDetail req={req} onBack={onBackToList} onRaiseRequest={onRaiseRequest} />;
    }
  }

  return <RequestsList onOpenRequest={onOpenRequest} onRaiseRequest={onRaiseRequest} />;
}

function RequestsList({
  onOpenRequest,
  onRaiseRequest,
}: {
  onOpenRequest: (id: string) => void;
  onRaiseRequest: () => void;
}) {
  const requests = useRequests();
  const [filter, setFilter] = useState<"All" | RequestStatus>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (filter !== "All" && r.status !== filter) return false;
      if (search.trim() && !r.productName.toLowerCase().includes(search.toLowerCase().trim())) {
        return false;
      }
      return true;
    });
  }, [requests, filter, search]);

  return (
    <div className="flex flex-col h-full bg-suprans-canvas">
      <div className="bg-white px-5 pt-5 pb-3 border-b border-suprans-border shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[22px] font-black text-suprans-ink tracking-tight">Requests</span>
          <button
            data-testid="btn-list-raise-request"
            onClick={onRaiseRequest}
            className="h-9 px-4 rounded-full text-[12px] font-bold text-white active:scale-95 transition-transform"
            style={{ background: "var(--suprans-red)" }}
          >
            + New
          </button>
        </div>
        <div className="flex items-center gap-2 bg-suprans-canvas rounded-xl px-3 h-[38px] border border-suprans-border mb-3">
          <Search size={15} color="var(--suprans-ink-tertiary)" strokeWidth={2} />
          <input
            data-testid="input-requests-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search requests…"
            className="flex-1 bg-transparent text-[13px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1" style={{ scrollbarWidth: "none" }}>
          {FILTER_OPTIONS.map((opt) => {
            const active = filter === opt;
            return (
              <button
                key={opt}
                data-testid={`filter-${opt.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setFilter(opt)}
                className="h-8 px-3.5 rounded-full text-[12px] font-semibold whitespace-nowrap shrink-0 active:scale-95 transition-all"
                style={
                  active
                    ? { background: "var(--suprans-red)", color: "white" }
                    : {
                        background: "white",
                        color: "var(--suprans-ink-secondary)",
                        border: "1px solid var(--suprans-border)",
                      }
                }
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <EmptyState onRaise={onRaiseRequest} hasFilter={filter !== "All" || search.trim() !== ""} />
        ) : (
          filtered.map((r) => <RequestCard key={r.id} req={r} onTap={() => onOpenRequest(r.id)} />)
        )}
        <div className="h-2" />
      </div>
    </div>
  );
}

function EmptyState({ onRaise, hasFilter }: { onRaise: () => void; hasFilter: boolean }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "var(--suprans-red-light)" }}
      >
        <Package size={28} color="var(--suprans-red)" strokeWidth={1.8} />
      </div>
      <p className="text-[16px] font-bold text-suprans-ink mb-1">
        {hasFilter ? "No matching requests" : "No requests yet"}
      </p>
      <p className="text-[12px] text-suprans-ink-secondary leading-relaxed max-w-[260px] mb-5">
        {hasFilter
          ? "Try adjusting your search or filter to see more requests."
          : "Tap the red button below to raise your first sourcing request — it only takes a minute."}
      </p>
      {!hasFilter && (
        <button
          data-testid="btn-empty-raise"
          onClick={onRaise}
          className="h-11 px-5 rounded-2xl text-[13px] font-bold text-white active:scale-95 transition-transform"
          style={{ background: "var(--suprans-red)" }}
        >
          Raise a request
        </button>
      )}
    </div>
  );
}

function RequestCard({ req, onTap }: { req: SourcingRequest; onTap: () => void }) {
  const color = STATUS_COLOR[req.status];
  return (
    <button
      data-testid={`request-card-${req.id}`}
      onClick={onTap}
      className="bg-white rounded-2xl p-4 border border-suprans-border w-full text-left hover:shadow-sm active:scale-[0.99] transition-transform flex gap-3"
    >
      {req.image && (
        <img
          src={req.image}
          alt={req.productName}
          className="w-16 h-16 rounded-xl object-cover border border-suprans-border shrink-0 bg-suprans-canvas"
          onError={(e) => {
            (e.target as HTMLImageElement).style.visibility = "hidden";
          }}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "var(--suprans-red-light)", color: "var(--suprans-red)" }}
          >
            {req.id}
          </span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: color.bg, color: color.fg }}
          >
            {req.status}
          </span>
        </div>
        <p className="text-[14px] font-bold text-suprans-ink leading-snug truncate">
          {req.productName}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] text-suprans-ink-tertiary">
            {req.quantity} {req.unit}
          </span>
          <span className="text-[10px] text-suprans-ink-tertiary">·</span>
          <span className="text-[11px] text-suprans-ink-tertiary capitalize">
            {req.shippingSpeed === "air" ? "Air freight" : req.shippingSpeed === "sea" ? "Sea freight" : "—"}
          </span>
          <span className="ml-auto">
            <ChevronRight size={14} color="var(--suprans-ink-tertiary)" strokeWidth={2} />
          </span>
        </div>
      </div>
    </button>
  );
}

function RequestDetail({
  req,
  onBack,
  onRaiseRequest,
}: {
  req: SourcingRequest;
  onBack: () => void;
  onRaiseRequest: () => void;
}) {
  const [, navigate] = useLocation();
  const color = STATUS_COLOR[req.status];
  const ShippingIcon = req.shippingSpeed === "air" ? Plane : Ship;
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleCancel = () => {
    cancelRequest(req.id);
    onBack();
  };

  const handleTrackStatus = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col h-full bg-suprans-canvas">
      <div className="bg-white px-4 pt-4 pb-3 border-b border-suprans-border flex items-center gap-3 shrink-0">
        <button
          data-testid="btn-back-request"
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-suprans-canvas active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} color="var(--suprans-ink)" strokeWidth={2} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-suprans-ink">{req.id}</span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: color.bg, color: color.fg }}
            >
              {req.status}
            </span>
          </div>
          <p className="text-[12px] text-suprans-ink-secondary mt-0.5 truncate">{req.productName}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-32 flex flex-col gap-5">
        {req.image && (
          <div className="bg-white rounded-2xl border border-suprans-border overflow-hidden">
            <img
              src={req.image}
              alt={req.productName}
              className="w-full h-[200px] object-cover bg-suprans-canvas"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 border border-suprans-border">
          <p className="text-[13px] font-bold text-suprans-ink mb-3">Status timeline</p>
          <StatusTimeline status={req.status} />
        </div>

        <div className="bg-white rounded-2xl p-4 border border-suprans-border">
          <p className="text-[13px] font-bold text-suprans-ink mb-3">Order details</p>
          <DetailRow label="Quantity" value={`${req.quantity} ${req.unit}`} />
          <DetailRow
            label="Shipping"
            value={
              <span className="flex items-center gap-1.5">
                <ShippingIcon size={14} color="var(--suprans-red)" strokeWidth={2} />
                {req.shippingSpeed === "air" ? "Air freight (7–10 days)" : "Sea freight (~45 days)"}
              </span>
            }
          />
          <DetailRow label="Requirements" value={req.requirements} multiline />
        </div>

        {(req.targetPrice || req.currentPrice || req.purpose) && (
          <div className="bg-white rounded-2xl p-4 border border-suprans-border">
            <p className="text-[13px] font-bold text-suprans-ink mb-3">Pricing & purpose</p>
            {req.targetPrice && <DetailRow label="Target price" value={req.targetPrice} />}
            {req.currentPrice && <DetailRow label="Current price" value={req.currentPrice} />}
            {req.currentPriceLink && (
              <DetailRow
                label="Reference"
                value={
                  <a
                    href={req.currentPriceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-suprans-red font-semibold underline truncate inline-block max-w-[200px]"
                  >
                    {req.currentPriceLink}
                  </a>
                }
              />
            )}
            {req.purpose && <DetailRow label="Purpose" value={req.purpose} multiline />}
          </div>
        )}

        {req.agent && (
          <div className="bg-white rounded-2xl p-4 border border-suprans-border flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white"
              style={{ background: "var(--suprans-red)" }}
            >
              {req.agent.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-suprans-ink-tertiary">Assigned to</p>
              <p className="text-[13px] font-bold text-suprans-ink truncate">{req.agent.name}</p>
              <p className="text-[11px] text-suprans-ink-secondary truncate">{req.agent.role}</p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-suprans-border px-3 pt-3 pb-4">
        <div className="grid grid-cols-4 gap-1.5">
          <ActionButton
            testId="btn-track-status"
            Icon={Activity}
            label="Track"
            onClick={handleTrackStatus}
          />
          <ActionButton
            testId="btn-message-agent"
            Icon={MessageCircle}
            label="Message"
            onClick={() => navigate("/suprans/chat")}
          />
          <ActionButton
            testId="btn-duplicate"
            Icon={Copy}
            label="Duplicate"
            onClick={onRaiseRequest}
          />
          <ActionButton
            testId="btn-cancel"
            Icon={Trash2}
            label="Cancel"
            onClick={handleCancel}
            danger
          />
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  testId,
  Icon,
  label,
  onClick,
  danger,
}: {
  testId: string;
  Icon: React.ElementType;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className="h-12 rounded-2xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold active:scale-95 transition-transform"
      style={{
        background: danger ? "transparent" : "var(--suprans-canvas)",
        border: `1px solid ${danger ? "rgba(240,59,59,0.3)" : "var(--suprans-border)"}`,
        color: danger ? "var(--suprans-red)" : "var(--suprans-ink)",
      }}
    >
      <Icon
        size={16}
        color={danger ? "var(--suprans-red)" : "var(--suprans-ink-secondary)"}
        strokeWidth={2}
      />
      {label}
    </button>
  );
}

function DetailRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: React.ReactNode;
  multiline?: boolean;
}) {
  return (
    <div className={`py-2 ${multiline ? "flex flex-col gap-1" : "flex items-start justify-between gap-3"}`}>
      <span className="text-[11px] font-semibold text-suprans-ink-tertiary uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className={`text-[13px] text-suprans-ink ${multiline ? "leading-relaxed whitespace-pre-wrap" : "text-right"}`}>
        {value}
      </span>
    </div>
  );
}

function StatusTimeline({ status }: { status: RequestStatus }) {
  const currentIdx = STATUS_ORDER.indexOf(status);
  return (
    <div className="flex flex-col gap-0">
      {STATUS_ORDER.map((s, i) => {
        const done = i < currentIdx;
        const current = i === currentIdx;
        const isLast = i === STATUS_ORDER.length - 1;
        return (
          <div key={s} className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: done
                    ? "var(--suprans-red)"
                    : current
                      ? "var(--suprans-red-light)"
                      : "var(--suprans-canvas)",
                  border: current
                    ? "2px solid var(--suprans-red)"
                    : done
                      ? "none"
                      : "1.5px solid var(--suprans-border)",
                }}
              >
                {done ? (
                  <CheckCircle2 size={14} color="white" strokeWidth={0} fill="white" />
                ) : current ? (
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--suprans-red)" }} />
                ) : (
                  <Circle size={10} color="var(--suprans-border)" strokeWidth={2} fill="none" />
                )}
              </div>
              {!isLast && (
                <div
                  className="w-0.5 h-7"
                  style={{
                    background: done ? "var(--suprans-red)" : "var(--suprans-border)",
                  }}
                />
              )}
            </div>
            <div className={`pb-4 flex-1 ${isLast ? "pb-0" : ""}`}>
              <p
                className="text-[13px] font-semibold leading-tight"
                style={{
                  color: done || current ? "var(--suprans-ink)" : "var(--suprans-ink-tertiary)",
                }}
              >
                {s}
              </p>
              {current && (
                <p className="text-[11px] text-suprans-red font-semibold mt-0.5">In progress</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
