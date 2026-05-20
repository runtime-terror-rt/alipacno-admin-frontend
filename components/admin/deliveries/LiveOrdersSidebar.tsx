import { ChevronDown, 
} from "lucide-react";
import LiveOrderCard from "./LiveOrderCard";

// ── Types & Data ───────────────────────────────────────────────────────────
export type OrderStatus = "Live Order" | "On Delivery" | "Ready" | "Preparing";

export interface ILiveOrder {
  id: string;
  customer: string;
  address: string;
  phone: string;
  eta: string;
  distance: string;
  status: OrderStatus;
  driver?: string;
}

const LIVE_ORDERS: ILiveOrder[] = [
  { id: "#P0980", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "12 min", distance: "2.4 km", status: "Live Order" },
  { id: "#P0980", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "9 min", distance: "1.8 km", status: "On Delivery" },
  { id: "#P0980", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "3 min", distance: "0.5 km", status: "Live Order" },
  { id: "#P0A62", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "5 min", distance: "1.2 km", status: "On Delivery" },
  { id: "#A1042", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "8 min", distance: "2.0 km", status: "Live Order" },
];

const LiveOrdersSidebar = () => {
  return (
     <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Live Orders</h2>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-500">Timestamp</span>
              <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1a1a1c] border border-[#2e2e30] text-zinc-400 text-xs hover:text-white">
                Routing <ChevronDown size={10} />
              </button>
            </div>
          </div>

          <div className="space-y-2 overflow-y-auto" style={{ maxHeight: 800 }}>
            {LIVE_ORDERS.map((order, i) => (
              <LiveOrderCard key={i} order={order} />
            ))}
          </div>
        </div>
  )
}

export default LiveOrdersSidebar;
