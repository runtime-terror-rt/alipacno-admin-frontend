"use client";

import { ChevronRight, Zap, Brain,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import AiStats from "@/components/admin/ai-insights/AiStats";
import AISuggestionBanner from "@/components/admin/ai-insights/AISuggestionBanner";
import TopSellingProducts from "@/components/admin/ai-insights/TopSellingProducts";
import AiTopCustomers from "@/components/admin/ai-insights/AiTopCustomers";
import AiTopOrderingAreas from "@/components/admin/ai-insights/AiTopOrderingAreas";
import AIRecommendedCampaigns from "@/components/admin/ai-insights/AIRecommendedCampaigns";

export default function AIInsightsPage() {
  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">

      {/* ── Page Header ── */}
      <PageHeader title="AI Insights & Suggestions" subtitle="AI-powered inventory and marketing recommendations to grow your business." />    

      {/* ── Hero Cards Row ── */}
      <AiStats />

      {/* ── AI Suggestion Banner ── */}
      <AISuggestionBanner />

      {/* ── Top Selling Products ── */}
      <TopSellingProducts />

      {/* ── Bottom Tables Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Top Customers */}
        <AiTopCustomers />

        {/* Top Ordering Areas */}
        <AiTopOrderingAreas />
      </div>

      {/* ── AI Recommended Campaigns ── */}
      <AIRecommendedCampaigns />
    </div>
  );
}