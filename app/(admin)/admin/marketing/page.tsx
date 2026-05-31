"use client";

import {
  Plus, Mail, MessageSquare, ChevronRight as ChevRight, ArrowLeft,
} from "lucide-react";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import MarketingPanel from "@/components/admin/Marketing/MarketingPanel";
import AutomationFlow from "@/components/admin/Marketing/AutomationFlow";
import MarketingOverviewDonutChart from "@/components/admin/Marketing/MarketingOverviewDonutChart";
import CampaignSummary from "@/components/admin/Marketing/CampaignSummary";


export default function MarketingPage() {
  const marketingStats = [
        {
          label:"Total SMS Sent"   ,       value:"12,842", change:"+20% of active", positive:true
        },
        {
          label:"TOTAL EMAILS SENT"  ,     value:"8,156" , change:"+28% of active" ,positive:true
        },
        {
          label:"ACTIVE CAMPAIGNS"   ,     value:"24"  ,   change:"+20% of active", positive:true
        },
        {
          label:"TOTAL CUSTOMERS REACHED", value:"46,921", change:"+20% of active" , positive:true
        }
  ]

  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-2">
        <button className="w-7 h-7 rounded-lg bg-[#252527] flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={14} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">Marketing Campaign Hub</h1>
        </div>
      </div>

      <MetricCardsRow metricCards={marketingStats} />

      {/* Automation Flow */}
      <AutomationFlow />

      {/* Communications & Marketing */}
      <MarketingPanel />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Marketing Overview Donut */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Marketing Overview</h3>
          <MarketingOverviewDonutChart />
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-1 divide-y divide-[#2e2e30]">
            {[
              { icon: <Plus size={12} className="text-[#f9671a]" />, label: "Create New Campaign" },
              { icon: <MessageSquare size={12} className="text-[#f9671a]" />, label: "Send Bulk SMS" },
              { icon: <Mail size={12} className="text-[#f9671a]" />, label: "Send Email Campaign" },
            ].map((action) => (
              <button key={action.label} className="w-full flex items-center justify-between py-3 text-sm text-zinc-400 hover:text-white transition-colors group">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#f9671a]/10 flex items-center justify-center group-hover:bg-[#f9671a]/20 transition-colors">
                    {action.icon}
                  </div>
                  {action.label}
                </div>
                <ChevRight size={14} className="text-zinc-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Summary */}
        <CampaignSummary />
      </div>
    </div>
  );
}