import { StockEntry } from "@/app/(admin)/admin/inventory/add-stock/page";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function DistributionModal({
  entry,
  onClose,
}: {
  entry: StockEntry;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#2e2e30]">
          <h2 className="text-base font-bold text-white">DISTRIBUTION</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#252527] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Item preview */}
        <div className="px-5 py-4 border-b border-[#2e2e30]">
          <div className="flex items-center gap-3 bg-[#252527] rounded-xl p-3">
            <span className="text-2xl">{entry.emoji}</span>
            <div>
              <p className="text-sm font-bold text-white">{entry.name}</p>
              <p className="text-xs text-zinc-500">{entry.id} · {entry.unit}</p>
            </div>
          </div>
        </div>

        {/* Add Distribution Section */}
        <div className="px-5 py-4 border-b border-[#2e2e30]">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-1.5">BRANCH</label>
              <div className="bg-[#252527] border border-[#2e2e30] rounded-xl px-4 py-3 text-white text-sm">
                Raw Material
                {/* Replace with actual Select component if available */}
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-1.5">QTY</label>
              <input
                type="number"
                defaultValue="0.00"
                className="w-full bg-[#252527] border border-[#2e2e30] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#f9671a]/60"
              />
            </div>

            <button 
              onClick={() => toast.success("Added to distribution")}
              className="px-6 py-3 rounded-xl bg-[#f9671a] text-white text-sm font-semibold hover:bg-[#e05a15] transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Distribution Table */}
        <div className="overflow-auto max-h-[420px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#252527] border-b border-[#2e2e30]">
                <th className="px-5 py-3 text-left text-zinc-400 font-medium">DATE</th>
                <th className="px-5 py-3 text-left text-zinc-400 font-medium">BRANCH</th>
                <th className="px-5 py-3 text-left text-zinc-400 font-medium">INVOICE NO.</th>
                <th className="px-5 py-3 text-left text-zinc-400 font-medium">UNIT</th>
                <th className="px-5 py-3 text-right text-zinc-400 font-medium">QTY</th>
                <th className="px-5 py-3 text-right text-zinc-400 font-medium">UNIT COST</th>
                <th className="px-5 py-3 text-right text-zinc-400 font-medium">TOTAL COST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e30]">
              <tr className="hover:bg-[#252527]/50">
                <td className="px-5 py-3 text-zinc-300">5May,2026<br />8AM</td>
                <td className="px-5 py-3 text-white">Eltham</td>
                <td className="px-5 py-3 text-zinc-400">All Branches</td>
                <td className="px-5 py-3 text-zinc-400">PCS</td>
                <td className="px-5 py-3 text-right text-white">0</td>
                <td className="px-5 py-3 text-right text-white">50</td>
                <td className="px-5 py-3 text-right text-white">50</td>
              </tr>
              <tr className="hover:bg-[#252527]/50">
                <td className="px-5 py-3 text-zinc-300">5May,2026<br />8AM</td>
                <td className="px-5 py-3 text-white">Greenwich</td>
                <td className="px-5 py-3 text-zinc-400">All Branches</td>
                <td className="px-5 py-3 text-zinc-400">PCS</td>
                <td className="px-5 py-3 text-right text-white">0</td>
                <td className="px-5 py-3 text-right text-white">34</td>
                <td className="px-5 py-3 text-right text-white">34</td>
              </tr>
              {/* Add more rows dynamically as needed */}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-5 border-t border-[#2e2e30] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#252527] border border-[#2e2e30] text-zinc-300 text-sm hover:text-white transition-all mr-3"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              toast.success("Distributed successfully");
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#f9671a] text-white text-sm font-semibold hover:bg-[#e05a15] transition-colors shadow-lg shadow-[#f9671a]/20"
          >
            Distribute
          </button>
        </div>
      </div>
    </div>
  );
}