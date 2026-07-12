"use client";

import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import PageHeader from "@/components/admin/ui/PageHeader";
import StaffManagementPanel from "@/components/admin/staff/StaffManagementPanel";
import DriversBottomStats from "@/components/admin/drivers/DriversBottomStats";
import StaffWeeklyAttendanceChart from "@/components/admin/staff/StaffWeeklyAttendanceChart";
import StaffWorkforceInsights from "@/components/admin/staff/StaffWorkforceInsights";
import RecentStaffActivity from "@/components/admin/staff/RecentStaffActivity";

const DEPT_HOURS = [
  { dept: "Kitchen", hours: 354, max: 400 },
  { dept: "Delivery", hours: 296, max: 400 },
  { dept: "Cashier", hours: 274, max: 400 },
  { dept: "Support", hours: 241, max: 400 },
  { dept: "Management", hours: 221, max: 400 },
];

// ─────────────────────────────────────────────
// Department Bar Chart
// ─────────────────────────────────────────────

function DeptBarChart() {
  return (
    <div className="space-y-2.5">
      {DEPT_HOURS.map((d) => (
        <div key={d.dept} className="flex items-center gap-2.5">
          <span className="text-xs text-zinc-400 w-24 flex-shrink-0">{d.dept}</span>
          <div className="flex-1 h-3.5 bg-[#252527] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#f9671a] transition-all"
              style={{ width: `${(d.hours / 400) * 100}%` }}
            />
          </div>
          <span className="text-xs text-zinc-300 w-16 text-right flex-shrink-0">{d.hours} Hrs</span>
        </div>
      ))}
      <div className="flex justify-between text-[10px] text-zinc-600 mt-1 pl-26" style={{ paddingLeft: 100 }}>
        {[0, 30, 60, 90, 120, 150].map((v) => <span key={v}>{v}</span>)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

export default function StaffManagementPage() {
  const metricCards = [
        {
        label: "Total Employees",
        value: "264",
        change: "+5.2%",
        positive: true
        },
        {
        label: "Active Today",
        value: "218",
        change: "+79%",
        positive: true
        },
        {
        label: "On Shift",
        value: "176",
        change: "+6.1%",
        positive: true
        },
        {
        label: "Absent Employees",
        value: "16",
        change: "+12.4%",
        positive: false
        }
  ]

  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">

      {/* ── Page Header ── */}
      <PageHeader title="Staff Management Panel" subtitle="Branch workforce operations and attendance overview" />

      {/* ── Top Metric Cards ── */}
      <MetricCardsRow metricCards={metricCards} />

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 gap-6">

        {/* LEFT — Staff Table Panel */}

        <StaffManagementPanel />

       
      </div>

      {/* ── Attendance & Workforce Analytics ── */}
      <div>
        <h2 className="text-base font-bold text-white mb-1">Attendance & Workforce Analytics</h2>
        <p className="text-xs text-zinc-500 mb-5">Combined Customer order and support interaction logs</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Dept Hours Bar Chart */}
          <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
            <p className="text-xs font-semibold text-white mb-4">Hours Worked Per Department (This Week)</p>
            <DeptBarChart />
          </div>

          {/* Weekly Attendance Trend */}
          <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
            <p className="text-xs font-semibold text-white mb-4">Weekly Attendance Trend</p>
            <StaffWeeklyAttendanceChart />
          </div>

          {/* Recent Staff Activity */}
          <RecentStaffActivity />
        </div>
      </div>

      {/* ── Bottom Stats Bar ── */}
     <DriversBottomStats />
    </div>
  );
}