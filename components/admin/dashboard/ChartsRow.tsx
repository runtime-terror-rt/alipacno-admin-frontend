"use client";

import { BarChart2 } from "lucide-react";
import LineChart from "../ui/LineChart";
import BarChart from "../ui/BarChart";

export interface BranchData {
  name: string;
  color: string;
  values: number[]; // sales in £k
}

const branchSalesData: BranchData[] = [
  { name: "Bittman", color: "#f9671a", values: [7.2, 7.8, 7.1, 7.4, 7.3, 8.1] },
  { name: "Sidcup", color: "#3b82f6", values: [5.8, 6.1, 5.7, 6.3, 6.0, 6.5] },
  { name: "Romford", color: "#22c55e", values: [3.1, 3.5, 3.0, 3.2, 3.4, 3.7] },
  { name: "Dagenham", color: "#a855f7", values: [1.1, 1.3, 1.0, 1.1, 1.0, 1.2] },
];

const dates = ["May12", "May13", "May14", "May15", "May16", "May17"];

const revenueThisPeriod = [
  { branch: "Bittman", value: 7800 },
  { branch: "Sidcup", value: 6500 },
  { branch: "Romford", value: 3200 },
  { branch: "Dagenham", value: 2100 },
];

const revenueLastPeriod = [6200, 7200, 2800, 1900]; // matching order

export default function ChartsRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Branch Sales Trend - Line Chart */}
      <div className="bg-[#1E1E20] border border-[#343436] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg">Branch Sales Trend</h3>
            <p className="text-[#626262] text-sm">Last 6 Days</p>
          </div>
          <BarChart2 size={20} className="text-[#f9671a]" />
        </div>

        <LineChart data={branchSalesData} dates={dates} />
      </div>

      {/* Revenue Breakdown - Bar Chart */}
      <div className="bg-[#1E1E20] border border-[#343436] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg">Revenue Breakdown by Branch</h3>
            <p className="text-[#626262] text-sm">This Period vs Last Period</p>
          </div>
        </div>

        <BarChart
          branches={revenueThisPeriod.map(b => b.branch)} 
          thisPeriod={revenueThisPeriod.map(b => b.value)} 
          lastPeriod={revenueLastPeriod} 
        />
      </div>
    </div>
  );
}