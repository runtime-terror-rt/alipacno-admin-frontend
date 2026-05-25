import { ChevronRight, Zap } from "lucide-react";

export default function BestBranchBanner() {
  return (
    <div className="bg-[#1E1E20] border border-[#343436] rounded-xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-sm bg-primary border border-[#f9671a]/30 flex items-center justify-center text-[#f9671a]">
          <Zap size={20}  className="text-white fill-white"/>
        </div>
        <div>
          <p className="text-xl text-primary font-bold tracking-widest uppercase">
            Best Branch Today
          </p>
          <p className="text-[#626262] font-semibold text-sm">
            Eltham (EL01) — £1,320 revenue — 12.5% above target!
          </p>
        </div>
      </div>
      <ChevronRight size={20} className="text-[#626262]" />
    </div>
  );
}