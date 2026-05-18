"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  AlertCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  Download,
  CheckCircle2,
  CalendarDays,
  Smartphone,
  CreditCard,
  Wallet
} from "lucide-react";

type FilterType = "today" | "week" | "month" | "year";

export default function BranchAdminPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("today");
  const [exporting, setExporting] = useState(false);

  // Simulated export handler
  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert("Business Performance Report exported successfully!");
    }, 1200);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center">
            Welcome to dashboard
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5 font-medium">
            Detailed insights into your business performance
          </p>
        </div>

        {/* Filter Controls & Export */}
        <div className="flex items-center space-x-3.5 self-start md:self-auto">
          <div className="flex bg-[#121214] border border-zinc-800 p-1 rounded-xl">
            {(["today", "week", "month", "year"] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all
                  ${activeFilter === filter 
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/10" 
                    : "text-zinc-400 hover:text-white"
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center space-x-1.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-600/60 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-orange-500/10 transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{exporting ? "Exporting..." : "Export"}</span>
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* CARD 1: Revenue (Features high-fidelity orange mesh glow) */}
        <div className="relative overflow-hidden bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 group hover:border-orange-500/30 transition-all duration-300">
          {/* Glowing mesh overlay inside card */}
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%) pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Today&apos;s Revenue</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">£3842.50</p>
            </div>
            <div className="h-10 w-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
              <span className="text-lg font-bold text-orange-500">£</span>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs">
            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center">
              +12.5%
            </span>
            <span className="text-zinc-400 font-medium">vs yesterday</span>
          </div>
        </div>

        {/* CARD 2: Orders Today */}
        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 group hover:border-orange-500/30 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Orders Today</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">127</p>
            </div>
            <div className="h-10 w-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
              <ShoppingBag className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs">
            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
              +8.3%
            </span>
            <span className="text-zinc-400 font-medium">vs yesterday</span>
          </div>
        </div>

        {/* CARD 3: Average Order */}
        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 group hover:border-orange-500/30 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Average Order</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">£30.25</p>
            </div>
            <div className="h-10 w-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs">
            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
              +5.2%
            </span>
            <span className="text-zinc-400 font-medium">vs yesterday</span>
          </div>
        </div>

        {/* CARD 4: Active Customers */}
        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 group hover:border-orange-500/30 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Active Customers</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">1245</p>
            </div>
            <div className="h-10 w-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
              <Users className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs">
            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
              +3.0%
            </span>
            <span className="text-zinc-400 font-medium">vs yesterday</span>
          </div>
        </div>

      </div>

      {/* 3. MAIN DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMN 1: Alerts & Top Products (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          {/* Alerts & Actions */}
          <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 space-y-4.5 flex-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Alerts & Actions</h3>
            
            <div className="space-y-3">
              {/* Alert 1 */}
              <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-red-500/5 border border-red-500/10">
                <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">3 items are out of stock</p>
                  <button className="text-[10px] font-bold text-red-400 hover:text-red-300 underline mt-1 transition-colors">
                    View Inventory
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/10">
                <AlertTriangle className="h-4.5 w-4.5 text-orange-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">2 pending delivery assignments</p>
                  <button className="text-[10px] font-bold text-orange-400 hover:text-orange-300 underline mt-1 transition-colors">
                    Assign Deliveries
                  </button>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-sky-500/5 border border-sky-500/10">
                <Clock className="h-4.5 w-4.5 text-sky-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">5 orders in preparation queue</p>
                  <button className="text-[10px] font-bold text-sky-400 hover:text-sky-300 underline mt-1 transition-colors">
                    View KDS
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Products</h3>
              <BarChart3Icon className="h-4 w-4 text-orange-500" />
            </div>

            <div className="space-y-3.5">
              {/* Product 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Ribeye Steak <span className="text-zinc-500 font-normal">(25 sold)</span></span>
                  <span className="text-orange-500">£1065.55</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Margherita Pizza <span className="text-zinc-500 font-normal">(36 sold)</span></span>
                  <span className="text-orange-500">£493.82</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Caesar Salad <span className="text-zinc-500 font-normal">(34 sold)</span></span>
                  <span className="text-orange-500">£325.90</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>

              {/* Product 4 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">French Fries <span className="text-zinc-500 font-normal">(52 sold)</span></span>
                  <span className="text-orange-500">£208.45</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>

              {/* Product 5 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Chicken Wings <span className="text-zinc-500 font-normal">(28 sold)</span></span>
                  <span className="text-orange-500">£179.72</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* COLUMN 2: Sales Categories & Payments (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Sales by Category Donut Chart */}
          <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 space-y-4 flex flex-col flex-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sales by Category</h3>
            
            {/* Custom SVG Donut Chart */}
            <div className="relative flex items-center justify-center py-4 flex-1">
              <svg width="150" height="150" viewBox="0 0 100 100" className="-rotate-90">
                {/* Backring */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#27272a" strokeWidth="12" />
                
                {/* Pizza slice (41%) - length: 2*PI*R = 238.76. 41% of 238.76 = 97.89 */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke="#f97316" 
                  strokeWidth="12" 
                  strokeDasharray="97.89 238.76" 
                  strokeDashoffset="0"
                />

                {/* Burgers slice (25%) - 25% of 238.76 = 59.69 */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="12" 
                  strokeDasharray="59.69 238.76" 
                  strokeDashoffset="-97.89"
                />

                {/* Sides slice (17%) - 17% of 238.76 = 40.59 */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke="#a855f7" 
                  strokeWidth="12" 
                  strokeDasharray="40.59 238.76" 
                  strokeDashoffset="-157.58"
                />

                {/* Drinks slice (12%) - 12% of 238.76 = 28.65 */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="12" 
                  strokeDasharray="28.65 238.76" 
                  strokeDashoffset="-198.17"
                />

                {/* Others slice (5%) - 5% of 238.76 = 11.94 */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="12" 
                  strokeDasharray="11.94 238.76" 
                  strokeDashoffset="-226.82"
                />
              </svg>
              
              {/* Core Text Label inside SVG */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wide">Total Sales</span>
                <span className="text-lg font-black text-white">3,041</span>
              </div>
            </div>

            {/* Custom Interactive Legend matching the mockup list */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold py-1 border-t border-zinc-800/40">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#f97316]" />
                <span className="text-zinc-300">Pizza: <span className="text-white">1,720 (41%)</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                <span className="text-zinc-300">Burgers: <span className="text-white">1,152 (25%)</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#a855f7]" />
                <span className="text-zinc-300">Sides: <span className="text-white">578 (17%)</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />
                <span className="text-zinc-300">Drinks: <span className="text-white">284 (12%)</span></span>
              </div>
              <div className="flex items-center space-x-2 col-span-2">
                <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                <span className="text-zinc-300">Others: <span className="text-white">2 (5%)</span></span>
              </div>
            </div>

            {/* Bottom Special Badge */}
            <div className="mt-2 text-center bg-orange-500/10 border border-orange-500/20 rounded-lg py-1.5 text-[9px] font-bold text-orange-500 uppercase tracking-widest">
              Peak Performance: PIZZA HOUSE SPECIAL
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 space-y-4 flex flex-col justify-between flex-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Payment Methods</h3>
            
            <div className="space-y-3.5">
              {/* Method 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <CreditCard className="h-3.5 w-3.5 text-orange-500" />
                    <span>Card</span>
                  </div>
                  <span className="text-white">67%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "67%" }}></div>
                </div>
              </div>

              {/* Method 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Wallet className="h-3.5 w-3.5 text-orange-500" />
                    <span>Cash</span>
                  </div>
                  <span className="text-white">32%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "32%" }}></div>
                </div>
              </div>

              {/* Method 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Smartphone className="h-3.5 w-3.5 text-orange-500" />
                    <span>Digital Wallet</span>
                  </div>
                  <span className="text-white">1%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "1%" }}></div>
                </div>
              </div>
            </div>

            {/* Total Processed Footer */}
            <div className="pt-4 border-t border-zinc-800/40 flex justify-between items-center">
              <span className="text-xs text-zinc-400 font-semibold">Total Processed</span>
              <span className="text-base font-black text-orange-500">£3887.50</span>
            </div>
          </div>

        </div>

        {/* COLUMN 3: Recent Activity Feed (3 Cols) */}
        <div className="lg:col-span-3 bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 space-y-4.5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Recent Activity</h3>
            
            <div className="relative pl-4 space-y-5 border-l border-zinc-800">
              
              {/* Activity 1 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-orange-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">Order #127 completed</p>
                  <p className="text-[10px] text-orange-500 font-bold">£45.50</p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>2 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">Card payment processed</p>
                  <p className="text-[10px] text-emerald-500 font-bold">£62.75</p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>5 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-sky-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">New customer registered</p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>12 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Activity 4 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-amber-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">Stock alert: Tomatoes low</p>
                  <p className="text-[10px] text-amber-500 font-semibold">Remaining: 5kg</p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>18 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Activity 5 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-orange-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">Delivery #125 completed</p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>25 mins ago</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <button className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-wider rounded-xl flex items-center justify-center space-x-1.5 transition-all">
            <span>View Full activity logs</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

      </div>

    </div>
  );
}

// Inner helper component for Top Products icon
function BarChart3Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-4" />
    </svg>
  );
}
