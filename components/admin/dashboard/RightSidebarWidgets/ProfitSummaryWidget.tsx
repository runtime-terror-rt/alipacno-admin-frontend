export default function ProfitSummaryWidget() {
  return (
    <div className="bg-[#1E1E20] border border-[#343436] rounded-xl p-4 flex flex-col gap-3 min-w-0 overflow-hidden">
      <p className="text-[#FCDBD9] text-[10px] tracking-widest uppercase">
        Profit Summary (Estimated)
      </p>

      <div className="flex items-start justify-between gap-4">
        <p className="text-primary text-lg font-bold whitespace-nowrap">
          £5,102.40
        </p>

        <div className="flex flex-col items-end text-right">
          <p className="text-[#FCDBD9] font-semibold text-sm">
            27.6% Margin
          </p>

          <p className="text-[#FCDBD9] text-[11px]">
            After Labor & COGS
          </p>
        </div>
      </div>
    </div>
  );
}