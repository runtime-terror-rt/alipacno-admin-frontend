"use client";

import DetailsOrderedItem from "@/components/admin/call-details/DetailsOrderedItem";
import {
  ArrowLeft, Phone, CheckCircle, XCircle,
  ShoppingBag, PhoneCall, Truck, ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────
interface OrderDetailsItem {
  name: string;
  qty: string;
  unitPrice: string;
  subTotal: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const ORDER_ITEMS: OrderDetailsItem[] = [
  { name: "Premium Conversion Pack", qty: "01", unitPrice: "£32.50", subTotal: "£32.50" },
];

// ── Progress Step ──────────────────────────────────────────────────────────
function Step({
  icon,
  label,
  sub,
  active,
  done,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  active?: boolean;
  done?: boolean;
  last?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
            done || active
              ? "border-[#f9671a] bg-[#f9671a]/15 text-[#f9671a]"
              : "border-[#2e2e30] bg-[#1a1a1c] text-zinc-500"
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="min-w-0">
        <p className={`text-xs font-semibold ${done || active ? "text-white" : "text-zinc-500"}`}>{label}</p>
        <p className="text-[10px] text-zinc-500 truncate">{sub}</p>
      </div>
      {!last && (
        <div className="flex-1 mx-3 h-px bg-[#2e2e30] relative">
          <div className={`absolute inset-y-0 left-0 bg-[#f9671a] transition-all ${done ? "w-full" : "w-0"}`} />
        </div>
      )}
    </div>
  );
}

// ── Info Block ─────────────────────────────────────────────────────────────
function InfoRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 last:border-t last:border-[#2e2e30]">
      <span className="text-xs text-zinc-500 flex-shrink-0">{label}</span>
      <span className={`text-xs font-medium text-right ${accent ? "text-white font-bold" : "text-zinc-200"}`}>{value}</span>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function OrderDetailsPage() {
  const router = useRouter();
  return (
    <div className="flex-1  min-h-screen text-white p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 cursor-pointer rounded-lg bg-[#252527] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
        </button>
        <div>
          <h1 className="text-lg font-bold">Order Details</h1>
          <p className="text-xs text-zinc-500">Orders ID: #UK1042</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
        <div className="flex items-center gap-2 flex-wrap">
          <Step icon={<ShoppingBag size={14} />} label="Order Received" sub="08:40 PM • Via Web Conversion" done />
          <Step icon={<PhoneCall size={14} />} label="Call Connected" sub="08:42 PM • Duration:04:12" active />
          <Step icon={<Truck size={14} />} label="Out for Delivery" sub="Delivery In Progress" last />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#252527] border border-[#2e2e30] text-white text-sm font-medium hover:border-[#f9671a]/50 transition-colors">
          <Phone size={14} className="text-[#f9671a]" /> Call Customer
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#252527] border border-[#2e2e30] text-white text-sm font-medium hover:border-green-500/50 transition-colors">
          <CheckCircle size={14} className="text-green-400" /> Mark Complete
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors">
          <XCircle size={14} /> Cancel Order
        </button>
      </div>

      {/* 3-column info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Order Info */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Order Info</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f9671a]/15 text-[#f9671a] border border-[#f9671a]/30">Prepare</span>
          </div>
          <InfoRow label="Order ID" value="#UK1042" />
          <InfoRow label="Order Time" value="08:45 PM" />
          <InfoRow label="Date" value="12 May, 2026" />
          <div className="mt-3 pt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-white">Total Amount</span>
            <span className="text-sm font-bold text-white">£32.50</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Customer Info</h3>
            <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">S</div>
          </div>
          <InfoRow label="Customer Name" value="Sarah Mitchell" />
          <InfoRow label="Phone Number" value="+44 7700 900123" />
          <InfoRow label="Delivery Address" value="7 Elm Street, Woodstock, OX7 1ER" />
        </div>

        {/* Call Info */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Call Info</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/30">Answered</span>
          </div>
          <InfoRow label="Call Time" value="08:42 PM" />
          <InfoRow label="Call Duration" value="04:12" />
        </div>
      </div>

      {/* Ordered Items */}
     <DetailsOrderedItem ORDER_ITEMS={ORDER_ITEMS} />
    </div>
  );
}