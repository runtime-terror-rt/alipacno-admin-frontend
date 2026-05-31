
import {
  TrendingUp,
  Clock,
  AlertCircle,
  Star,
  Bike,
  Store,
  CloudUpload,
  Award,
} from "lucide-react";
import Button from "../ui/Button";

function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const colors = ["bg-orange-500", "bg-purple-500", "bg-blue-500", "bg-green-500", "bg-pink-500"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-${size} h-${size} rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}


// ── Mini Sparkline SVG ─────────────────────────────────────────────────────
function Sparkline({ color = "#E8833A" }: { color?: string }) {
  const points = "0,30 20,20 40,25 60,10 80,15 100,5 120,12";
  return (
    <svg viewBox="0 0 120 40" className="w-full h-10" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


const OrderOperationalInsights = () => {
  return (
    <div className="space-y-4 bg-[#1C1C1E] rounded-xl p-5 border border-[#353535]">
            <h2 className="text-base font-semibold text-white">Operational Insights</h2>

            {/* Peak Order Hour */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Bike className="w-4 h-4 text-[#E8833A]" />
                  <span className="text-xs font-semibold text-white">Peak Order Hour</span>
                </div>
                <span className="text-sm font-bold text-[#E8833A]">07 PM</span>
              </div>
              <Sparkline />
              <p className="text-xs text-zinc-500 mt-1">324 Orders</p>
            </div>

            {/* Most Active Branch */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-4 h-4 text-[#E8833A]" />
                <span className="text-xs font-semibold text-white">Most Active Branch</span>
              </div>
              <p className="text-sm text-white font-medium">Eltham (ELO1)</p>
              <p className="text-xs text-zinc-500 mb-2">649 Orders</p>
              <div className="w-full h-1.5 rounded-full bg-zinc-700">
                <div className="h-1.5 rounded-full bg-[#E8833A]" style={{ width: "34.8%" }} />
              </div>
              <p className="text-xs text-zinc-500 mt-1">34.8%</p>
            </div>

            {/* Average Delivery Time */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#E8833A]" />
                <span className="text-xs font-semibold text-white">Average Delivery Time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">28.6 mins</span>
                <span className="text-xs text-green-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> 6.3%
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-2">vs last period</p>
              <div className="w-full h-1.5 rounded-full bg-zinc-700">
                <div className="h-1.5 rounded-full bg-[#E8833A]" style={{ width: "34.8%" }} />
              </div>
              <p className="text-xs text-zinc-500 mt-1">34.8%</p>
            </div>

            {/* Failed Orders */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-semibold text-white">Failed Orders Today</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">8 Orders</span>
                <span className="text-xs text-red-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3 rotate-180" /> 2.1%
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-2">vs yesterday</p>
              <div className="w-full h-1.5 rounded-full bg-zinc-700">
                <div className="h-1.5 rounded-full bg-red-500" style={{ width: "34.8%" }} />
              </div>
              <p className="text-xs text-zinc-500 mt-1">34.8%</p>
            </div>

            {/* Top Driver */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-success" />
                <span className="text-xs font-semibold text-white">Top Driver Performance</span>
              </div>
              <div className="flex items-center gap-3">
                <Avatar name="Alex Rider" size={9} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Alex Rider</p>
                  <p className="text-xs text-zinc-500">24 Deliveries</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-success">4.9</span>
                  <Star className="w-4 h-4 text-success fill-success" />
                </div>
              </div>
              <div className="mt-2 w-full h-1 rounded-full bg-zinc-700">
                <div className="h-1 rounded-full bg-[#E8833A]" style={{ width: "90%" }} />
              </div>
            </div>

            {/* View All Insights CTA */}
            <Button>
  V           View All Insights
            </Button>

            {/* Stats list */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl divide-y divide-zinc-800">
              {[
                { label: "Total calls", value: 128 },
                { label: "Converted Orders", value: 96 },
                { label: "Missed Calls", value: 14 },
                { label: "Phone Orders", value: 38 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-xs text-zinc-400">{item.label}</span>
                  <span className="text-xs font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
  )
}

export default OrderOperationalInsights;
