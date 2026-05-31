import AlertItem from "../../ui/AlertItem";

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


export default function OperationalAlertsWidget() {
  return (
    <div className="bg-[#1E1E20] border border-[#343436] rounded-xl p-4 flex flex-col gap-4 min-w-0 overflow-hidden">
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