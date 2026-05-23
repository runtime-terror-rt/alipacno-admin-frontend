"use client";

import { statCardsData } from "@/app/(admin)/admin/signage/data";
import SignageStatCard from "@/components/admin/signage/SignageStatCard";
import SignageTable from "@/components/admin/signage/SignageTable";
import { ContentOverview, UpcomingSchedules } from "@/components/admin/signage/SignageWidgets";

export default function SignagePage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
          Signage
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1 font-semibold">
          Track Total orders, total revenue, avg order value, phone orders count.
        </p>
      </div>

      {/* Top Stat Cards matching MetricCard style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCardsData.map((card) => (
          <SignageStatCard key={card.id} card={card} />
        ))}
      </div>

      {/* Digital Signage Management Table */}
      <SignageTable />

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentOverview />
        <UpcomingSchedules />
      </div>
    </div>
  );
}
