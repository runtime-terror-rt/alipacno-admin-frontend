import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import AlertItem from "../ui/AlertItem";

export interface Alert {
  type: "error" | "warning" | "info";
  title: string;
  description: string;
}

const alerts: Alert[] = [
  {
    type: "error",
    title: "Lagging Target: Airport Plaza",
    description: "Sales -18% vs daily baseline. Action recommended.",
  },
  {
    type: "warning",
    title: "AOV Warning: Downtown",
    description: "Avg Order Value dropped to £24.20 (System Floor: £26).",
  },
  {
    type: "info",
    title: "Stock Alert: Riverside",
    description: "Low stock on 3 core SKUs. Reorder threshold reached.",
  },
];

export default function RightSidebarWidgets() {
  return (
    <aside className="w-full xl:w-[260px] min-w-0 shrink-0 flex flex-col gap-4">
      <OperationalAlertsWidget />

      <ProfitSummaryWidget />

      <NewCampaignPulseWidget />

      <InfrastructureSyncWidget />
    </aside>
  );
}

// ─────────────────────────────────────────────
// Operational Alerts Widget
// ─────────────────────────────────────────────

function OperationalAlertsWidget() {
  return (
    <div className="bg-[#26262680] border border-[#343436] rounded-xl p-4 flex flex-col gap-4 min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-white font-semibold text-[14px]">
          Operational Alerts
        </p>

        <span className="bg-[#B45151] shrink-0 text-white text-[10px] font-bold px-2 py-1 rounded-md">
          3 CRITICAL
        </span>
      </div>

      {/* Alerts */}
      <div className="flex flex-col gap-3">
        {alerts.map((alert, i) => (
          <AlertItem key={i} alert={alert} />
        ))}
      </div>

      {/* Button */}
      <button className="w-full border border-[#3d3d3d] text-[#FCDBD9] hover:text-white text-[11px] font-semibold py-2 rounded-lg tracking-widest transition-colors">
        DISMISS ALL
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Profit Summary Widget
// ─────────────────────────────────────────────

function ProfitSummaryWidget() {
  return (
    <div className="bg-[#26262680] border border-[#343436] rounded-xl p-4 flex flex-col gap-3 min-w-0 overflow-hidden">
      <p className="text-[#FCDBD9] text-[10px] tracking-widest uppercase">
        Profit Summary (Estimated)
      </p>

      <div className="flex items-start justify-between gap-4">
        <p className="text-primary text-lg font-bold whitespace-nowrap">
          £5,102.40
        </p>

        <div className="flex flex-col items-end text-right">
          <p className="text-[#FCDBD9] font-semibold text-sm">
            27.6% Margin
          </p>

          <p className="text-[#626262] text-[11px]">
            After Labor & COGS
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Campaign Pulse Widget
// ─────────────────────────────────────────────

function NewCampaignPulseWidget() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#343436] bg-[#1A1A1ACC] min-w-0">
      {/* Image */}
      <Image
        src="/admin/dashboard/campaign-pulse.png"
        alt="Campaign Pulse"
        width={400}
        height={400}
        className="w-full h-auto object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <p className="text-white font-semibold text-md">
          New Campaign Pulse
        </p>

        <button className="text-[#F9671A] text-sm font-semibold tracking-widest underline underline-offset-4 uppercase mt-2">
          VIEW ANALYTICS
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Infrastructure Sync Widget
// ─────────────────────────────────────────────

function InfrastructureSyncWidget() {
  return (
    <div className="bg-[#26262680] border border-[#343436] rounded-xl p-4 flex flex-col gap-4 min-w-0 overflow-hidden">
      {/* Icon */}
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#4EDEA31A] text-[#00A706]">
        <CircleCheckBig size={26} />
      </div>

      {/* Content */}
      <div>
        <p className="text-white font-semibold text-[13px]">
          Infrastructure Sync
        </p>

        <p className="text-[#626262] text-[11px] leading-relaxed mt-1">
          All 14 node locations reporting 0.02s latency.
          Cloud POS gateway stable.
        </p>
      </div>

      {/* Status */}
      <div>
        <p className="text-[#00A706] text-xl font-bold leading-none">
          100%
        </p>

        <p className="text-[#00A706] text-sm font-semibold tracking-wide mt-1">
          UPTIME
        </p>
      </div>
    </div>
  );
}