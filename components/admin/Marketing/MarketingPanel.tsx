"use client";

import { useState } from 'react'
import Pagination from '../ui/Pagination'
import { MoreVertical, Search } from 'lucide-react';

function StatusBadge({ status }: { status: Campaign["status"] }) {
  const map = {
    Completed: "bg-green-500/15 text-green-400 border-green-500/30",
    Active:    "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Failed:    "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status]}`}>{status}</span>;
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
        active ? "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a]/50" : "bg-[#1f1f21] text-zinc-400 hover:text-white border border-transparent"
      }`}
    >{label}</button>
  );
}

interface Campaign {
  name: string;
  preview: string;
  target: string;
  sentOn: string;
  delivered: string;
  deliveredPct: string;
  replies: number;
  status: "Completed" | "Active" | "Failed";
}

const CAMPAIGNS: Campaign[] = [
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,856", deliveredPct: "94%", replies: 245, status: "Completed" },
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,856", deliveredPct: "94%", replies: 245, status: "Completed" },
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,856", deliveredPct: "94%", replies: 245, status: "Completed" },
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,950", deliveredPct: "94%", replies: 245, status: "Completed" },
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,606", deliveredPct: "94%", replies: 245, status: "Completed" },
];

const MarketingPanel = () => {
  const [activeTab, setActiveTab] = useState("SMS Marketing");
  return (
    <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Communications & Marketing</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Manage SMS, Email campaigns and marketing communications.</p>
        </div>

        {/* Search + Tabs */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#1f1f21] border border-[#2e2e30] rounded-xl px-3 py-2.5 flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="text-zinc-500 flex-shrink-0" />
            <input type="text" placeholder="Search order Id, customer, phone..." className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {["SMS Marketing", "Email Marketing", "Campaigns"].map((t) => (
              <TabBtn key={t} label={t} active={activeTab === t} onClick={() => setActiveTab(t)} />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 bg-[#1a1a1c] border border-[#2e2e30] rounded-xl px-5 py-3 flex-wrap">
          {[
            { label: "TOTAL SMS SENT", value: "12,842", color: "text-white" },
            { label: "DELIVERED",       value: "12,216 (95.1%)", color: "text-green-400" },
            { label: "FAILED",          value: "632 (4.9%)",     color: "text-red-400" },
            { label: "REPLIES",         value: "1,024 (8.0%)",   color: "text-blue-400" },
            { label: "OPT-OUTS",        value: "120 (0.9%)",     color: "text-zinc-400" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[9px] text-zinc-500 uppercase tracking-wide">{s.label}</p>
              <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Campaign Table */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#2e2e30]">
                  {["CAMPAIGN NAME","MESSAGE PREVIEW","TARGET","SENT ON","DELIVERED","REPLIES","STATUS","ACTION"].map((h) => (
                    <th key={h} className="text-left text-zinc-500 font-medium py-3 px-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2e2e30]/60">
                {CAMPAIGNS.map((c, i) => (
                  <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="py-3 px-4 text-white font-medium whitespace-nowrap text-xs">{c.name}</td>
                    <td className="py-3 px-4 text-zinc-400 max-w-[180px] truncate">{c.preview}</td>
                    <td className="py-3 px-4 text-zinc-300 whitespace-nowrap">{c.target}</td>
                    <td className="py-3 px-4 text-zinc-400 whitespace-nowrap">{c.sentOn}</td>
                    <td className="py-3 px-4">
                      <span className="text-green-400 font-semibold">{c.delivered} </span>
                      <span className="text-zinc-500">({c.deliveredPct})</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-300">{c.replies}</td>
                    <td className="py-3 px-4"><StatusBadge status={c.status} /></td>
                    <td className="py-3 px-4">
                      <button className="p-1.5 rounded-lg hover:bg-[#252527] text-zinc-400 hover:text-white transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 pb-4">
            <Pagination />
          </div>
        </div>
      </div>
  )
}

export default MarketingPanel;
