import {
  Search,
  Plus,
  Download,
  MoreVertical,
} from "lucide-react";

import Pagination from "../ui/Pagination";
import FilterDropdown from "../ui/FilterDropdown";
import Button from "../ui/Button";

type StockStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  branch: string;
  qty: number;
  unit: string;
  status: StockStatus;
  threshold: string;
  lastUpdate: string;
  emoji: string;
}

const ITEMS: InventoryItem[] = [
  {
    id: "#ITM-001",
    name: "Chicken Breast",
    category: "Meat",
    branch: "Eltham",
    qty: 120,
    unit: "KG",
    status: "In Stock",
    threshold: "50 KG",
    lastUpdate: "2 mins ago",
    emoji: "🍗",
  },
  {
    id: "#ITM-002",
    name: "Burger Bun",
    category: "Bakery",
    branch: "Downtown",
    qty: 18,
    unit: "PCS",
    status: "Low Stock",
    threshold: "25 PCS",
    lastUpdate: "12 mins ago",
    emoji: "🍔",
  },
  {
    id: "#ITM-003",
    name: "Cheese Slice",
    category: "Dairy",
    branch: "Eltham",
    qty: 0,
    unit: "PCS",
    status: "Out of Stock",
    threshold: "15 PCS",
    lastUpdate: "1 hour ago",
    emoji: "🧀",
  },
];

function StockBadge({
  status,
}: {
  status: StockStatus;
}) {
  const styles: Record<StockStatus, string> = {
    "In Stock":
      "bg-green-500/15 text-green-400 border-green-500/30",

    "Low Stock":
      "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",

    "Out of Stock":
      "bg-red-500/15 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function QtyDisplay({
  qty,
  status,
}: {
  qty: number;
  status: StockStatus;
}) {
  return (
    <span
      className={`font-semibold whitespace-nowrap ${
        status === "Out of Stock"
          ? "text-red-400"
          : status === "Low Stock"
          ? "text-yellow-400"
          : "text-white"
      }`}
    >
      {qty}
    </span>
  );
}

export default function StockTrackingPanel() {
  const columns = [
    "ITEM",
    "CATEGORY",
    "BRANCH",
    "STOCK QTY",
    "UNIT",
    "STATUS",
    "THRESHOLD",
    "LAST UPDATE",
    "ACTION",
  ];

  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white">
            Stock Tracking
          </h2>

          <p className="text-xs text-zinc-500">
            Track inventory availability, and stock
            levels
          </p>
        </div>

        {/* Team Avatars */}
        <div className="flex -space-x-2">
          {["bg-orange-500", "bg-purple-500"].map(
            (c, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full ${c} border-2 border-[#1a1a1c] flex items-center justify-center text-xs font-bold text-white`}
              >
                S
              </div>
            )
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown label="Categories" />
        <FilterDropdown label="Branch" />
        <FilterDropdown label="Stock Status" />
        <FilterDropdown label="Status" />
        <FilterDropdown label="Products" />
        <FilterDropdown label="Sales" />
      </div>

      {/* Search + Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-[#1f1f21] border border-[#2e2e30] rounded-xl px-3 py-2.5 flex-1 min-w-[180px]">
          <Search
            size={14}
            className="text-zinc-500 flex-shrink-0"
          />

          <input
            type="text"
            placeholder="Search categories, branch..."
            className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full"
          />
        </div>

        <Button className="px-4 py-2.5 flex items-center gap-1.5 w-fit">
          <Plus size={14} />
          Add Items
        </Button>

        <Button
          variant="ghost"
          className="px-4 py-2.5 flex items-center gap-1.5 w-fit"
        >
          <Download size={14} />
          Export Excel
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2e2e30]">
              {columns.map((h) => (
                <th
                  key={h}
                  className="text-left text-zinc-500 font-medium pb-3 pr-4 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#2e2e30]/60">
            {ITEMS.map((item, i) => (
              <tr
                key={i}
                className="hover:bg-zinc-800/20 transition-colors"
              >
                {/* Item */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl leading-none">
                      {item.emoji}
                    </span>

                    <div>
                      <p className="text-white font-medium whitespace-nowrap">
                        {item.name}
                      </p>

                      <p className="text-zinc-500 text-[10px]">
                        {item.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">
                  {item.category}
                </td>

                {/* Branch */}
                <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">
                  {item.branch}
                </td>

                {/* Qty */}
                <td className="py-3 pr-4">
                  <QtyDisplay
                    qty={item.qty}
                    status={item.status}
                  />
                </td>

                {/* Unit */}
                <td className="py-3 pr-4 text-zinc-400">
                  {item.unit}
                </td>

                {/* Status */}
                <td className="py-3 pr-4">
                  <StockBadge status={item.status} />
                </td>

                {/* Threshold */}
                <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">
                  {item.threshold}
                </td>

                {/* Last Update */}
                <td className="py-3 pr-4 text-zinc-400 whitespace-nowrap text-[10px]">
                  {item.lastUpdate}
                </td>

                {/* Action */}
                <td className="py-3">
                  <button className="p-1.5 rounded-lg hover:bg-[#252527] text-zinc-400 hover:text-white transition-colors">
                    <MoreVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
}