import { Phone } from "lucide-react";

interface CallLogEntry {
  time: string;
  duration: string;
  date: string;
  customer: string;
  phone: string;
  branch: string;
  tag: string;
  tagVariant: "orange" | "red" | "purple";
}

const HISTORY_LOGS: CallLogEntry[] = [
  { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Older Placed", tagVariant: "orange" },
  { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Older Placed", tagVariant: "orange" },
  { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Older Placed", tagVariant: "red" },
  { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Older Placed", tagVariant: "orange" },
  { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Order Converted", tagVariant: "purple" },
];
const OrderHistoryCallLogs = () => {
  return (
    <div>
        <h2 className="text-sm font-semibold text-white mb-1">Order History & Call Logs</h2>
        <p className="text-xs text-zinc-500 mb-4">Combined Customer order and support interaction logs</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {HISTORY_LOGS.map((log, i) => (
            <div key={i} className="bg-[#1a1a1c] border border-[#2e2e30] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={11} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{log.time}</p>
                  <p className="text-xs text-zinc-500">Call Duration: {log.duration}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400">{log.date}</p>
              <div>
                <p className="text-xs font-semibold text-white">{log.customer}</p>
                <p className="text-xs text-zinc-500">{log.phone}</p>
              </div>
              <p className="text-xs text-zinc-400">{log.branch}</p>
              <button className={`w-full cursor-pointer py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                log.tagVariant === "purple" ? "bg-[#9747FF1A] text-white border-[#9747FF]"
                : log.tagVariant === "red" ? "bg-[#FF2D491A] border-red-500 text-red-500"
                : "border-[#00A706] text-[#00A706] bg-[#00A7061A]"
              }`}>
                {log.tag}
              </button>
            </div>
          ))}
        </div>
      </div>
  )
}

export default OrderHistoryCallLogs
