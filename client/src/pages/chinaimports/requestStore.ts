import { useEffect, useState } from "react";
import thumbMerinoWool from "@assets/suprans/products/merino-wool-sweaters.png";
import thumbCeramicMugs from "@assets/suprans/products/ceramic-coffee-mugs.png";
import thumbLedLights from "@assets/suprans/products/led-strip-lights.png";

export type RequestStatus =
  | "Submitted"
  | "Agent Assigned"
  | "Sourcing"
  | "Quotes Shared"
  | "Confirmed"
  | "Shipped"
  | "Delivered";

export const STATUS_ORDER: RequestStatus[] = [
  "Submitted",
  "Agent Assigned",
  "Sourcing",
  "Quotes Shared",
  "Confirmed",
  "Shipped",
  "Delivered",
];

export const STATUS_COLOR: Record<RequestStatus, { bg: string; fg: string }> = {
  Submitted: { bg: "#FEF0F0", fg: "#F03B3B" },
  "Agent Assigned": { bg: "#EDE9FE", fg: "#7C3AED" },
  Sourcing: { bg: "#DBEAFE", fg: "#2563EB" },
  "Quotes Shared": { bg: "#FEF3C7", fg: "#D97706" },
  Confirmed: { bg: "#CFFAFE", fg: "#0891B2" },
  Shipped: { bg: "#E0E7FF", fg: "#4F46E5" },
  Delivered: { bg: "#D1FAE5", fg: "#059669" },
};

export interface SourcingRequest {
  id: string;
  productName: string;
  imageSource: "camera" | "upload" | "url" | null;
  image: string | null;
  requirements: string;
  quantity: string;
  unit: string;
  shippingSpeed: "air" | "sea" | null;
  targetPrice: string;
  currentPrice: string;
  currentPriceLink: string;
  purpose: string;
  status: RequestStatus;
  createdAt: number;
  agent?: { name: string; role: string };
}

const seeded: SourcingRequest[] = [
  {
    id: "REQ-1042",
    productName: "Merino Wool Sweaters (Autumn 2026)",
    imageSource: "upload",
    image: thumbMerinoWool,
    requirements: "Mid-weight merino, 60% wool blend. Sizes S–XXL, 4 colorways. Need OEKO-TEX certified suppliers.",
    quantity: "5000",
    unit: "pcs",
    shippingSpeed: "sea",
    targetPrice: "₹650/pc",
    currentPrice: "₹780/pc",
    currentPriceLink: "https://example.com/sweaters",
    purpose: "Restocking for winter retail collection across 12 stores.",
    status: "Quotes Shared",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    agent: { name: "Priya Sharma", role: "Sourcing Manager" },
  },
  {
    id: "REQ-1038",
    productName: "Ceramic Coffee Mugs — Matte Glaze",
    imageSource: "upload",
    image: thumbCeramicMugs,
    requirements: "350ml capacity, matte black & cream finishes, dishwasher safe. Custom logo decal on one side.",
    quantity: "12000",
    unit: "pcs",
    shippingSpeed: "sea",
    targetPrice: "₹85/pc",
    currentPrice: "",
    currentPriceLink: "",
    purpose: "House-brand café range launch.",
    status: "Sourcing",
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
    agent: { name: "Raj Patel", role: "Logistics Coordinator" },
  },
  {
    id: "REQ-1029",
    productName: "LED Strip Lights — Smart RGB (5m)",
    imageSource: "url",
    image: thumbLedLights,
    requirements: "WiFi + Bluetooth, app-controlled, 24V. CE & RoHS compliant. White & RGB modes.",
    quantity: "3000",
    unit: "units",
    shippingSpeed: "air",
    targetPrice: "₹420/unit",
    currentPrice: "₹560/unit",
    currentPriceLink: "https://example.com/led-strips",
    purpose: "Diwali season e-commerce listing.",
    status: "Agent Assigned",
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
    agent: { name: "Arjun Singh", role: "Account Manager" },
  },
];

let store: SourcingRequest[] = [...seeded];
let nextIdCounter = 1043;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function getRequests(): SourcingRequest[] {
  return store;
}

export function getRequestById(id: string): SourcingRequest | undefined {
  return store.find((r) => r.id === id);
}

export function addRequest(input: Omit<SourcingRequest, "id" | "status" | "createdAt">): SourcingRequest {
  const id = `REQ-${nextIdCounter++}`;
  const newReq: SourcingRequest = {
    ...input,
    id,
    status: "Submitted",
    createdAt: Date.now(),
  };
  store = [newReq, ...store];
  notify();
  return newReq;
}

export function cancelRequest(id: string) {
  store = store.filter((r) => r.id !== id);
  notify();
}

export function useRequests(): SourcingRequest[] {
  const [, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick((t) => t + 1);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);
  return store;
}
