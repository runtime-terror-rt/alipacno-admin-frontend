import { CloudUpload, Search } from "lucide-react"
import DateFiltersBar from "../ui/DateFilterBar"
import FilterDropdown from "../ui/FilterDropdown"
import Pagination from "../ui/Pagination"
import CustomerTable from "./CustomerTable"
import { Customer } from "@/app/(admin)/admin/crm/page"


// ── Mock Data ──────────────────────────────────────────────────────────────
const CUSTOMERS: Customer[] = [
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Regular","VIP"], action: "View Order" },
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Regular","VIP"], action: "Call Back" },
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Regular","VIP"], action: "Call Back" },
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Loyalty"], action: "Ext#4446" },
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Loyalty"], action: "View Order" },
];


const CrmTable = () => {
  return (
     <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-white">CRM</h2>
              <p className="text-xs text-zinc-500">Manage customers, leads, and sales interactions in one smart platform.</p>
            </div>

            {/* Sub-filter row */}
            <div className="flex flex-wrap items-center gap-2">

              <DateFiltersBar 
              tabs={["Today","Weekly","Monthly","Custom Range"]}
              />
              <FilterDropdown label="Visits" />
              <FilterDropdown label="Driver" />
              <FilterDropdown label="Order" />
              <FilterDropdown label="VIP" />
              <FilterDropdown label="Tags" />
              <FilterDropdown label="New" />
            </div>

            {/* Search + Export */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-[#252527] border border-[#2e2e30] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
                <Search size={14} className="text-zinc-500" />
                <input type="text" placeholder="Search order Id, customer, phone..." className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none flex-1" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#f9671a]/50 text-[#f9671a] text-xs font-medium hover:bg-[#f9671a]/10 transition-colors whitespace-nowrap">
                <CloudUpload size={12} /> Export CSV
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2e2e30] text-zinc-400 text-xs font-medium hover:text-white transition-colors whitespace-nowrap">
                <CloudUpload size={12} /> Export Excel
              </button>
            </div>

            <CustomerTable rows={CUSTOMERS} />
            <Pagination />
          </div>
  )
}

export default CrmTable;