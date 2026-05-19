import { CalendarDays } from "lucide-react";

export default function TargetTrackingCard() {
  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 flex flex-col gap-4 h-full">
      <h3 className="text-white text-base font-semibold">Target Tracking</h3>

      {/* Today */}
      <div className="rounded-xl border border-[#2e2e30] p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white text-sm font-semibold">Today</p>
            <p className="text-xs text-zinc-500 mt-0.5">Today's Target vs Actual</p>
          </div>
          <CalendarDays size={15} className="text-zinc-500 mt-0.5" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">Progress</span>
          <span className="text-xs font-semibold text-white">82%</span>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full w-[82%] bg-[#f9671a] rounded-full" />
        </div>
        <p className="text-xs text-zinc-500">£2000 / £3000 target</p>
      </div>

      {/* This Week */}
      <div className="rounded-xl border border-[#2e2e30] p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white text-sm font-semibold">This Week</p>
            <p className="text-xs text-zinc-500 mt-0.5">Weekly Target Progress</p>
          </div>
          <CalendarDays size={15} className="text-zinc-500 mt-0.5" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">Progress</span>
          <span className="text-xs font-semibold text-white">64%</span>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full w-[64%] bg-zinc-300 rounded-full" />
        </div>
        <p className="text-xs text-zinc-500">£5000 / £10000 target</p>
      </div>
    </div>
  );
}