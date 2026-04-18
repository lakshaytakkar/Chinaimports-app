import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  ChevronRight,
  Download,
  FileText,
  MessageCircle,
  CheckCircle,
  Circle,
  Truck,
  Package,
  ShieldCheck,
  Ship,
  ClipboardCheck,
} from "lucide-react";

type SubTab = "active" | "completed";
type ProjectView = "list" | "detail";

interface Project {
  id: string;
  productName: string;
  serviceChip: string;
  origin: string;
  destination: string;
  currentStage: string;
  stageIndex: number;
  expectedDate: string;
  completed: boolean;
  totalAmount: string;
  amountPaid: string;
  amountPaidRaw: number;
  amountTotalRaw: number;
  documents: { name: string; size: string }[];
}

const STAGE_LABELS = ["Sourcing", "Quality Check", "Customs", "Shipping", "Delivered"];

const STAGE_ICONS = [Package, ClipboardCheck, ShieldCheck, Ship, Truck];

const ACTIVE_PROJECTS: Project[] = [
  {
    id: "PRJ-2847",
    productName: "Merino Wool Sweaters",
    serviceChip: "Sourcing + Shipping",
    origin: "Hangzhou",
    destination: "Mumbai",
    currentStage: "Quality Check",
    stageIndex: 1,
    expectedDate: "28 Apr 2026",
    completed: false,
    totalAmount: "₹4,20,000",
    amountPaid: "₹1,26,000",
    amountPaidRaw: 126000,
    amountTotalRaw: 420000,
    documents: [
      { name: "Purchase Order.pdf", size: "212 KB" },
      { name: "Supplier Agreement.pdf", size: "344 KB" },
    ],
  },
  {
    id: "PRJ-2831",
    productName: "Ceramic Coffee Mugs",
    serviceChip: "Shipping + Customs",
    origin: "Guangzhou",
    destination: "Delhi",
    currentStage: "Shipping",
    stageIndex: 3,
    expectedDate: "2 May 2026",
    completed: false,
    totalAmount: "₹2,80,000",
    amountPaid: "₹2,24,000",
    amountPaidRaw: 224000,
    amountTotalRaw: 280000,
    documents: [
      { name: "Commercial Invoice.pdf", size: "189 KB" },
      { name: "Bill of Lading.pdf", size: "276 KB" },
      { name: "Packing List.xlsx", size: "98 KB" },
    ],
  },
  {
    id: "PRJ-2819",
    productName: "LED Strip Lights (Bulk)",
    serviceChip: "Sourcing + QC",
    origin: "Shenzhen",
    destination: "Chennai",
    currentStage: "Quality Check",
    stageIndex: 1,
    expectedDate: "10 May 2026",
    completed: false,
    totalAmount: "₹1,60,000",
    amountPaid: "₹48,000",
    amountPaidRaw: 48000,
    amountTotalRaw: 160000,
    documents: [
      { name: "Tech Spec Sheet.pdf", size: "522 KB" },
      { name: "Purchase Order.pdf", size: "188 KB" },
    ],
  },
  {
    id: "PRJ-2795",
    productName: "Stainless Steel Cookware",
    serviceChip: "Door-to-Door",
    origin: "Shanghai",
    destination: "Pune",
    currentStage: "Customs",
    stageIndex: 2,
    expectedDate: "5 May 2026",
    completed: false,
    totalAmount: "₹3,60,000",
    amountPaid: "₹2,88,000",
    amountPaidRaw: 288000,
    amountTotalRaw: 360000,
    documents: [
      { name: "Commercial Invoice.pdf", size: "201 KB" },
      { name: "Certificate of Origin.pdf", size: "148 KB" },
    ],
  },
];

const COMPLETED_PROJECTS: Project[] = [
  {
    id: "PRJ-2740",
    productName: "Cotton Tote Bags",
    serviceChip: "Sourcing + Shipping",
    origin: "Guangzhou",
    destination: "Mumbai",
    currentStage: "Delivered",
    stageIndex: 4,
    expectedDate: "12 Jan 2026",
    completed: true,
    totalAmount: "₹1,20,000",
    amountPaid: "₹1,20,000",
    amountPaidRaw: 120000,
    amountTotalRaw: 120000,
    documents: [
      { name: "Delivery Receipt.pdf", size: "88 KB" },
      { name: "Commercial Invoice.pdf", size: "176 KB" },
    ],
  },
  {
    id: "PRJ-2698",
    productName: "Industrial Gloves",
    serviceChip: "Shipping + Customs",
    origin: "Qingdao",
    destination: "Delhi",
    currentStage: "Delivered",
    stageIndex: 4,
    expectedDate: "3 Dec 2025",
    completed: true,
    totalAmount: "₹2,40,000",
    amountPaid: "₹2,40,000",
    amountPaidRaw: 240000,
    amountTotalRaw: 240000,
    documents: [
      { name: "Packing List.xlsx", size: "112 KB" },
      { name: "Bill of Lading.pdf", size: "231 KB" },
      { name: "Delivery Receipt.pdf", size: "91 KB" },
    ],
  },
  {
    id: "PRJ-2651",
    productName: "Bamboo Kitchenware Set",
    serviceChip: "Door-to-Door",
    origin: "Hangzhou",
    destination: "Bangalore",
    currentStage: "Delivered",
    stageIndex: 4,
    expectedDate: "28 Oct 2025",
    completed: true,
    totalAmount: "₹88,000",
    amountPaid: "₹88,000",
    amountPaidRaw: 88000,
    amountTotalRaw: 88000,
    documents: [
      { name: "Commercial Invoice.pdf", size: "155 KB" },
      { name: "Delivery Receipt.pdf", size: "72 KB" },
    ],
  },
];

export default function SupransProjectsTab() {
  const [view, setView] = useState<ProjectView>("list");
  const [subTab, setSubTab] = useState<SubTab>("active");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (p: Project) => {
    setSelectedProject(p);
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedProject(null);
  };

  if (view === "detail" && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={handleBack} />;
  }

  return (
    <div className="flex flex-col h-full bg-suprans-canvas">
      <div className="bg-white px-5 pt-5 pb-3 border-b border-suprans-border shrink-0">
        <span className="text-[22px] font-black text-suprans-ink tracking-tight">Projects</span>
        <div className="flex mt-3">
          <div className="flex p-1 rounded-full" style={{ background: "var(--suprans-canvas)", border: "1px solid var(--suprans-border)" }}>
            {(["active", "completed"] as SubTab[]).map((tab) => (
              <button
                key={tab}
                data-testid={`subtab-${tab}`}
                onClick={() => setSubTab(tab)}
                className="px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all"
                style={
                  subTab === tab
                    ? { background: "var(--suprans-red)", color: "white" }
                    : { color: "var(--suprans-ink-secondary)" }
                }
              >
                {tab === "active" ? "Active" : "Completed"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {(subTab === "active" ? ACTIVE_PROJECTS : COMPLETED_PROJECTS).map((p) => (
          <ProjectCard key={p.id} project={p} onTap={() => handleOpenProject(p)} />
        ))}
        <div className="h-2" />
      </div>
    </div>
  );
}

function ProjectCard({ project, onTap }: { project: Project; onTap: () => void }) {
  const progress = ((project.stageIndex) / (STAGE_LABELS.length - 1)) * 100;
  const paidPct = project.amountTotalRaw > 0 ? (project.amountPaidRaw / project.amountTotalRaw) * 100 : 100;

  return (
    <button
      data-testid={`project-card-${project.id}`}
      onClick={onTap}
      className="bg-white rounded-2xl p-4 border border-suprans-border w-full text-left hover:shadow-sm active:scale-[0.99] transition-transform"
    >
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "var(--suprans-red-light)", color: "var(--suprans-red)" }}
          >
            {project.id}
          </span>
          {project.completed && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
              Delivered
            </span>
          )}
        </div>
        <ChevronRight size={16} color="var(--suprans-ink-tertiary)" strokeWidth={2} />
      </div>

      <p className="text-[14px] font-bold text-suprans-ink mb-1">{project.productName}</p>

      <span
        className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2.5"
        style={{ background: "var(--suprans-canvas)", border: "1px solid var(--suprans-border)", color: "var(--suprans-ink-secondary)" }}
      >
        {project.serviceChip}
      </span>

      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-[12px] font-medium text-suprans-ink-secondary">{project.origin}</span>
        <div className="flex-1 flex items-center gap-1">
          <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: "var(--suprans-border)" }} />
          <div className="w-1 h-1 rounded-full" style={{ background: "var(--suprans-ink-tertiary)" }} />
          <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: "var(--suprans-border)" }} />
        </div>
        <span className="text-[12px] font-medium text-suprans-ink-secondary">{project.destination}</span>
      </div>

      {!project.completed && (
        <>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-suprans-ink-tertiary">Stage: <span className="font-semibold text-suprans-ink">{project.currentStage}</span></span>
            <span className="text-[11px] text-suprans-ink-tertiary">ETA {project.expectedDate}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-suprans-canvas overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: "var(--suprans-red)" }}
            />
          </div>
        </>
      )}

      {project.completed && (
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-suprans-ink-tertiary">Completed {project.expectedDate}</span>
          <div className="flex items-center gap-1">
            <div className="w-full h-1.5 w-20 rounded-full overflow-hidden" style={{ background: "var(--suprans-canvas)" }}>
              <div className="h-full rounded-full bg-green-500" style={{ width: `${paidPct}%` }} />
            </div>
          </div>
        </div>
      )}
    </button>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const [, navigate] = useLocation();
  const paidPct = project.amountTotalRaw > 0 ? (project.amountPaidRaw / project.amountTotalRaw) * 100 : 100;

  return (
    <div className="flex flex-col h-full bg-suprans-canvas">
      <div className="bg-white px-4 pt-4 pb-3 border-b border-suprans-border flex items-center gap-3 shrink-0">
        <button data-testid="btn-back-project" onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-suprans-canvas">
          <ArrowLeft size={20} color="var(--suprans-ink)" strokeWidth={2} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-suprans-ink">{project.id}</span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={
                project.completed
                  ? { background: "#D1FAE5", color: "#059669" }
                  : { background: "var(--suprans-red-light)", color: "var(--suprans-red)" }
              }
            >
              {project.currentStage}
            </span>
          </div>
          <p className="text-[12px] text-suprans-ink-secondary mt-0.5">{project.productName}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-24 flex flex-col gap-5">
        <div className="bg-white rounded-2xl p-4 border border-suprans-border">
          <p className="text-[13px] font-bold text-suprans-ink mb-4">Timeline</p>
          <TimelineComponent stageIndex={project.stageIndex} completed={project.completed} />
        </div>

        <div className="bg-white rounded-2xl p-4 border border-suprans-border">
          <p className="text-[13px] font-bold text-suprans-ink mb-3">Documents</p>
          <div className="flex flex-col gap-2.5">
            {project.documents.map((doc, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--suprans-canvas)" }}>
                  <FileText size={16} color="var(--suprans-red)" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-suprans-ink truncate">{doc.name}</p>
                  <p className="text-[11px] text-suprans-ink-tertiary">{doc.size}</p>
                </div>
                <button data-testid={`doc-download-${i}`} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-suprans-canvas">
                  <Download size={16} color="var(--suprans-ink-tertiary)" strokeWidth={1.8} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-suprans-border">
          <p className="text-[13px] font-bold text-suprans-ink mb-3">Payments</p>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[11px] text-suprans-ink-tertiary">Total Amount</p>
              <p className="text-[15px] font-bold text-suprans-ink">{project.totalAmount}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-suprans-ink-tertiary">Amount Paid</p>
              <p className="text-[15px] font-bold text-green-600">{project.amountPaid}</p>
            </div>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--suprans-canvas)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${paidPct}%`, background: paidPct === 100 ? "#059669" : "var(--suprans-red)" }}
            />
          </div>
          <p className="text-[11px] text-suprans-ink-tertiary mt-1.5 text-right">{Math.round(paidPct)}% paid</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-suprans-border px-5 py-4">
        <button
          data-testid="btn-chat-team"
          onClick={() => navigate("/suprans/chat")}
          className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-[15px] font-bold text-white"
          style={{ background: "var(--suprans-red)" }}
        >
          <MessageCircle size={18} color="white" strokeWidth={2} />
          Chat with your team
        </button>
      </div>
    </div>
  );
}

function TimelineComponent({ stageIndex, completed }: { stageIndex: number; completed: boolean }) {
  const effectiveIndex = completed ? STAGE_LABELS.length - 1 : stageIndex;

  return (
    <div className="flex items-start">
      {STAGE_LABELS.map((label, i) => {
        const isDone = i < effectiveIndex || completed;
        const isCurrent = i === effectiveIndex && !completed;
        const StageIcon = STAGE_ICONS[i];

        return (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            {i < STAGE_LABELS.length - 1 && (
              <div
                className="absolute top-4 left-1/2 right-0 h-0.5"
                style={{
                  background: isDone ? "var(--suprans-red)" : "var(--suprans-border)",
                  zIndex: 0,
                }}
              />
            )}
            <div
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center mb-1.5"
              style={{
                background: isDone ? "var(--suprans-red)" : isCurrent ? "var(--suprans-red-light)" : "var(--suprans-canvas)",
                border: isCurrent ? "2px solid var(--suprans-red)" : isDone ? "none" : "1.5px solid var(--suprans-border)",
              }}
            >
              {isDone ? (
                <CheckCircle size={16} color="white" strokeWidth={0} fill="white" />
              ) : isCurrent ? (
                <StageIcon size={14} color="var(--suprans-red)" strokeWidth={2} />
              ) : (
                <Circle size={14} color="var(--suprans-border)" strokeWidth={2} fill="none" />
              )}
            </div>
            <span
              className="text-[9px] font-semibold text-center leading-tight px-0.5"
              style={{
                color: isDone ? "var(--suprans-red)" : isCurrent ? "var(--suprans-ink)" : "var(--suprans-ink-tertiary)",
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
