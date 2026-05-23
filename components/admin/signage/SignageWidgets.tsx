"use client";

import { contentOverviewData, upcomingSchedulesData } from "@/app/(admin)/admin/signage/data";

export function ContentOverview() {
  const { total, items } = contentOverviewData;

  return (
    <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl h-full flex flex-col">
      <h3 className="text-sm font-black text-white mb-6">Content Overview</h3>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 flex-1">
        {/* Custom Donut Chart via conic-gradient */}
        <div className="relative h-36 w-36 sm:h-40 sm:w-40 shrink-0">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                #10b981 0% 60%, 
                #f97316 60% 75%, 
                #3b82f6 75% 90%, 
                #ef4444 90% 100%
              )`
            }}
          />
          {/* Inner circle for donut hole */}
          <div className="absolute inset-3 rounded-full bg-[#121214] flex flex-col items-center justify-center border-4 border-[#161618]">
            <span className="text-3xl font-black text-white leading-none">{total}</span>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full sm:w-auto flex-1 space-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                <span className="font-semibold text-zinc-400">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-white">{item.value}</span>
                <span className="text-zinc-500 font-semibold text-[10px]">({item.percentage})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function UpcomingSchedules() {
  return (
    <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl h-full flex flex-col">
      <h3 className="text-sm font-black text-white mb-6">Upcoming Schedules</h3>
      
      <div className="space-y-4 flex-1">
        {upcomingSchedulesData.map((schedule, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-xs font-bold text-white w-20">{schedule.time}</span>
            
            <div className="flex-1 px-4">
              <p className="text-xs font-black text-white">{schedule.title}</p>
              <p className="text-[10px] text-zinc-500 font-semibold">{schedule.count}</p>
            </div>
            
            <span className="text-[10px] font-bold text-zinc-500 bg-[#161618] border border-zinc-800 px-3 py-1 rounded-lg">
              {schedule.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
