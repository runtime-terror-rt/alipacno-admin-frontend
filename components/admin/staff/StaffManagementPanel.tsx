import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
} from "lucide-react";

import Pagination from "../ui/Pagination";
import DateFiltersBar from "../ui/DateFilterBar";
import FilterDropdown from "../ui/FilterDropdown";
import Button from "../ui/Button";

// ─────────────────────────────────────────────
// Types & Mock Data
// ─────────────────────────────────────────────

type EmployeeStatus = "Active" | "On Break" | "Off Duty" | "Absent";
type EmployeeRole = "Manager" | "Cashier" | "Driver" | "Kitchen";
type ShiftType = "Morning 8AM–4PM" | "Evening 4PM–12AM" | "Night 12AM–8AM";

interface Employee {
  id: string;
  name: string;
  phone: string;
  branch: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  shift: ShiftType;
  timeIn: string;
  timeOut: string;
  hoursWorked: string;
}

const EMPLOYEES: Employee[] = [
  { id: "AFD-9921", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Manager", status: "Active", shift: "Morning 8AM–4PM", timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
  { id: "AFD-9321", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Cashier", status: "On Break", shift: "Evening 4PM–12AM", timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
  { id: "AFD-9921", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Driver", status: "Off Duty", shift: "Night 12AM–8AM", timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
  { id: "AFD04921", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Kitchen", status: "On Break", shift: "Evening 4PM–12AM", timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
  { id: "AFD-9921", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Driver", status: "Absent", shift: "Night 12AM–8AM", timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
];


function StatusBadge({ status }: { status: EmployeeStatus }) {
  const map: Record<EmployeeStatus, string> = {
    Active: "bg-green-500/15 text-green-400 border-green-500/30",
    "On Break": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    "Off Duty": "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    Absent: "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status]}`}>
      {status}
    </span>
  );
}

function RoleBadge({ role }: { role: EmployeeRole }) {
  const map: Record<EmployeeRole, string> = {
    Manager: "text-[#f9671a]",
    Cashier: "text-blue-400",
    Driver: "text-purple-400",
    Kitchen: "text-green-400",
  };
  return <span className={`text-xs font-semibold ${map[role]}`}>{role}</span>;
}

export default function StaffManagementPanel() {
  const [activeRole, setActiveRole] = useState("All");

const roleTabs = ["All Staff", "Managers", "Cashiers", "Driver", "Kitchen"];

  const columns = [
    "EMPLOYEE ID",
    "EMPLOYEE",
    "BRANCH",
    "ROLE",
    "STATUS",
    "SHIFT",
    "TIME IN",
    "TIME OUT",
    "HOURS WORKED",
    "ACTION",
  ];

  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-white">
          Staff Management Panel
        </h2>

        <p className="text-xs text-zinc-500">
          Branch workforce operations and attendance overview
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <DateFiltersBar
          tabs={roleTabs}
        //   value={activeRole}
          onChange={setActiveRole}
        />

        <FilterDropdown label="Branch" />
        <FilterDropdown label="Role" />
        <FilterDropdown label="Shift" />
        <FilterDropdown label="Status" />
      </div>

      {/* Search + Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-[#252527] border border-[#2e2e30] rounded-xl px-3 py-2.5 flex-1 min-w-[200px]">
          <Search
            size={14}
            className="text-zinc-500 flex-shrink-0"
          />

          <input
            type="text"
            placeholder="Search employee, ID, branch..."
            className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full"
          />
        </div>

        <Button className="px-4 py-2.5 flex items-center gap-1.5 w-fit">
          <Plus size={14} />
          Add Employee
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
                  className="text-left text-zinc-500 font-medium pb-3 pr-3 whitespace-nowrap"
                >
                  {h === "EMPLOYEE ID" ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded bg-zinc-700 border-zinc-600"
                        readOnly
                      />
                      {h}
                    </div>
                  ) : (
                    h
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#2e2e30]/60">
            {EMPLOYEES.map((emp, i) => (
              <tr
                key={i}
                className="hover:bg-zinc-800/20 transition-colors"
              >
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded bg-zinc-700 border-zinc-600"
                      readOnly
                    />

                    <span className="text-[#f9671a] font-medium whitespace-nowrap">
                      {emp.id}
                    </span>
                  </div>
                </td>

                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      B
                    </div>

                    <div>
                      <p className="text-white font-medium whitespace-nowrap">
                        {emp.name}
                      </p>

                      <p className="text-zinc-500 text-[10px]">
                        {emp.phone}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3 pr-3 text-zinc-300">
                  {emp.branch}
                </td>

                <td className="py-3 pr-3">
                  <RoleBadge role={emp.role} />
                </td>

                <td className="py-3 pr-3">
                  <StatusBadge status={emp.status} />
                </td>

                <td className="py-3 pr-3 text-zinc-400 whitespace-nowrap text-[10px]">
                  {emp.shift}
                </td>

                <td className="py-3 pr-3 text-zinc-300 whitespace-nowrap">
                  {emp.timeIn}
                </td>

                <td className="py-3 pr-3 text-zinc-300 whitespace-nowrap">
                  {emp.timeOut}
                </td>

                <td className="py-3 pr-3 text-white font-medium whitespace-nowrap">
                  {emp.hoursWorked}
                </td>

                <td className="py-3">
                  <button className="p-1 rounded-lg hover:bg-[#252527] text-zinc-400 hover:text-white transition-colors">
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