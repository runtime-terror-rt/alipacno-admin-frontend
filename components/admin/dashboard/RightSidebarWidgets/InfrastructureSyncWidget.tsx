import { CircleCheckBig } from "lucide-react";

export default function InfrastructureSyncWidget() {
  return (
    <div className="bg-[#1E1E20] border border-[#343436] rounded-xl p-4 flex flex-col gap-4 min-w-0 overflow-hidden">
      {/* Icon */}
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#4EDEA31A] text-[#00A706]">
        <CircleCheckBig size={26} />
      </div>

      {/* Content */}
      <div>
        <p className="text-white font-semibold text-base">
          Infrastructure Sync
        </p>

        <p className="text-[#626262] text-[12px] leading-relaxed mt-1">
          All 14 node locations reporting 0.02s latency.
          Cloud POS gateway stable.
        </p>
      </div>

      {/* Status */}
      <div>
        <p className="text-[#00A706] text-xl font-bold leading-none font-jetbrains">
          100%
        </p>

        <p className="text-[#00A706] text-sm font-semibold tracking-wide mt-1">
          UPTIME
        </p>
      </div>
    </div>
  );
}