"use client";

import { Phone, PhoneMissed } from "lucide-react";
import Button from "@/components/admin/ui/Button";
import { CallLog, CallStatus, CallOutcome } from "./CallLogsPanel";

interface CallLogsTableProps {
  logs: CallLog[];
  onViewOrder: (id: string) => void;
  onCallBack: (number: string) => void;
}

// ── Call Status Badge ──────────────────────────────────────────────────────
function CallStatusBadge({ status }: { status: CallStatus }) {
  return status === "Answered" ? (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/25">
      Answered
    </span>
  ) : (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/15 text-[#FF2D49] border border-red-500/25">
      Missed
    </span>
  );
}

// ── Outcome Badge ──────────────────────────────────────────────────────────
function OutcomeBadge({ outcome }: { outcome: CallOutcome }) {
  if (outcome === "Missed Call") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-[#FF2D49] font-medium">
        <PhoneMissed size={12} /> Missed Call
      </span>
    );
  }
  if (outcome === "No Order") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium">
        <Phone size={12} /> No Order
      </span>
    );
  }
  return <span className="text-xs text-green-400 font-semibold tracking-wide">{outcome}</span>;
}

const CallLogsTable = ({ logs, onViewOrder, onCallBack }: CallLogsTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/80 bg-[#1e1e1e]/20">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#3D3D3A] border-b border-zinc-800/80 [&>th:first-child]:rounded-tl-xl [&>th:last-child]:rounded-tr-xl">
            {["TIME", "CALL NUMBER", "CUSTOMER", "DURATION", "CALL STATUS", "OUTCOME", "LINKED ORDER", "POSTCODE", "ACTION"].map((h) => (
              <th 
                key={h} 
                className="text-left text-xs text-gray-100 font-semibold py-4 pr-4 first:pl-4 last:pr-4 whitespace-nowrap tracking-wider uppercase align-middle"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="divide-y divide-zinc-800/60">
          {logs.map((row, i) => (
            <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
              {/* TIME */}
              <td className="py-3.5 pr-4 pl-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                {row.time}
              </td>

              {/* CALL NUMBER */}
              <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                {row.number}
              </td>

              {/* CUSTOMER */}
              <td className="py-3.5 pr-4 text-xs font-semibold text-white align-middle whitespace-nowrap">
                {row.customer}
              </td>

              {/* DURATION */}
              <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                {row.duration}
              </td>

              {/* CALL STATUS */}
              <td className="py-3.5 pr-4 align-middle">
                <CallStatusBadge status={row.status} />
              </td>

              {/* OUTCOME */}
              <td className="py-3.5 pr-4 align-middle whitespace-nowrap">
                <OutcomeBadge outcome={row.outcome} />
              </td>

              {/* LINKED ORDER */}
              <td className="py-3.5 pr-4 text-xs font-semibold text-white align-middle whitespace-nowrap">
                {row.linkedOrder}
              </td>

              {/* POSTCODE */}
              <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                {row.postcode}
              </td>

              {/* ACTION */}
              <td className="py-3.5 pr-4 last:pr-4 align-middle text-right whitespace-nowrap">
                {i === 0 ? (
                  <Button onClick={() => onViewOrder("2")} variant="table">
                    View Order
                  </Button>
                ) : (
                  <Button onClick={() => onCallBack(row.number)} variant="table">
                    Call Back
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallLogsTable;