"use client";

import { useState } from "react";
import {
  Search, Plus, Download, Pencil, Trash2,
  X, Save, ChevronDown, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────

type EmployeeStatus = "Active" | "On Break" | "Off Duty" | "Absent";
type EmployeeRole   = "Manager" | "Cashier" | "Driver" | "Kitchen";
type ShiftType      = "Morning 8AM–4PM" | "Evening 4PM–12AM" | "Night 12AM–8AM";

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

const INITIAL_EMPLOYEES: Employee[] = [
  { id: "AFD-9921", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Manager", status: "Active",   shift: "Morning 8AM–4PM",  timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
  { id: "AFD-9321", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Cashier", status: "On Break",  shift: "Evening 4PM–12AM", timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
  { id: "AFD-9922", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Driver",  status: "Off Duty",  shift: "Night 12AM–8AM",   timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
  { id: "AFD04921", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Kitchen", status: "On Break",  shift: "Evening 4PM–12AM", timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
  { id: "AFD-9923", name: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham", role: "Driver",  status: "Absent",    shift: "Night 12AM–8AM",   timeIn: "07:58 AM", timeOut: "04:02 PM", hoursWorked: "8:07 hrs" },
];

// ─────────────────────────────────────────────
// Shared Atoms
// ─────────────────────────────────────────────

function StatusBadge({ status }: { status: EmployeeStatus }) {
  const map: Record<EmployeeStatus, string> = {
    Active:     "bg-green-500/15 text-green-400 border-green-500/30",
    "On Break": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    "Off Duty": "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    Absent:     "bg-red-500/15 text-red-400 border-red-500/30",
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
    Driver:  "text-purple-400",
    Kitchen: "text-green-400",
  };
  return <span className={`text-xs font-semibold ${map[role]}`}>{role}</span>;
}

function FilterPill({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap border ${
        active
          ? "bg-[#f9671a]/10 text-[#f9671a] border-[#f9671a]/50"
          : "bg-[#1f1f21] text-zinc-400 hover:text-white border-[#2e2e30]"
      }`}
    >
      {label}
    </button>
  );
}

function DropPill({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1f1f21] border border-[#2e2e30] text-zinc-400 hover:text-white text-xs font-medium transition-colors whitespace-nowrap">
      {label} <ChevronDown size={12} />
    </button>
  );
}

function SelectField({
  label, value, onChange, children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-zinc-400 font-medium">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer pr-8"
        >
          {children}
        </select>
        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-zinc-400 font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
      />
    </div>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-[#2e2e30]">
      <p className="text-xs text-zinc-500">Showing 1 to 10 of 50 results</p>
      <div className="flex items-center gap-1.5">
        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#252527] text-zinc-400 hover:text-white"><ChevronLeft size={13} /></button>
        {[1,2,3,4,5].map((p) => (
          <button key={p} className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium ${p === 1 ? "bg-[#f9671a] text-white" : "bg-[#252527] text-zinc-400 hover:text-white"}`}>{p}</button>
        ))}
        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#252527] text-zinc-400 hover:text-white"><ChevronRight size={13} /></button>
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#252527] text-zinc-400 text-xs hover:text-white ml-1">5/page <ChevronDown size={11} /></button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Edit Employee Modal
// ─────────────────────────────────────────────

interface EditModalProps {
  employee: Employee;
  onClose: () => void;
  onSave: (updated: Employee) => void;
}

function EditEmployeeModal({ employee, onClose, onSave }: EditModalProps) {
  const [form, setForm] = useState<Employee>({ ...employee });

  function field<K extends keyof Employee>(key: K, value: Employee[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Pencil size={16} className="text-[#f9671a]" />
            <h2 className="text-base font-bold text-white">Edit Employee</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Full Name */}
          <TextField label="Full Name" value={form.name} onChange={(v) => field("name", v)} />

          {/* Phone Number */}
          <TextField label="Phone Number" value={form.phone} onChange={(v) => field("phone", v)} />

          {/* Branch + Role */}
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Branch" value={form.branch} onChange={(v) => field("branch", v)}>
              {["Eltham","Downtown","Romford","Sidcup","Greenwich"].map((b) => <option key={b}>{b}</option>)}
            </SelectField>
            <SelectField label="Role" value={form.role} onChange={(v) => field("role", v as EmployeeRole)}>
              {(["Manager","Cashier","Driver","Kitchen"] as EmployeeRole[]).map((r) => <option key={r}>{r}</option>)}
            </SelectField>
          </div>

          {/* Shift + Status */}
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Shift" value={form.shift} onChange={(v) => field("shift", v as ShiftType)}>
              {(["Morning 8AM–4PM","Evening 4PM–12AM","Night 12AM–8AM"] as ShiftType[]).map((s) => <option key={s}>{s}</option>)}
            </SelectField>
            <SelectField label="Status" value={form.status} onChange={(v) => field("status", v as EmployeeStatus)}>
              {(["Active","On Break","Off Duty","Absent"] as EmployeeStatus[]).map((s) => <option key={s}>{s}</option>)}
            </SelectField>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-2 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-medium hover:text-white hover:border-zinc-500 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f9671a] text-white text-sm font-semibold hover:bg-[#e05a15] transition-colors shadow-lg shadow-[#f9671a]/20"
          >
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Delete Confirmation Modal
// ─────────────────────────────────────────────

interface DeleteModalProps {
  employee: Employee;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteConfirmModal({ employee, onClose, onConfirm }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Delete Employee{" "}
            <span className="text-[#f9671a]">{employee.id}</span>?
          </p>
          <p className="text-xs text-zinc-500 mt-1.5">
            <span className="text-zinc-300 font-medium">{employee.name}</span> will be permanently removed from the system. This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-medium hover:text-white hover:border-zinc-500 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Panel
// ─────────────────────────────────────────────

const COLUMNS = [
  "EMPLOYEE ID","EMPLOYEE","BRANCH","ROLE",
  "STATUS","SHIFT","TIME IN","TIME OUT","HOURS WORKED","ACTION",
];

const ROLE_TABS = ["All Staff","Managers","Cashiers","Driver","Kitchen"];

export default function StaffManagementPanel() {
  const router = useRouter();
  const [employees, setEmployees]   = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [activeRole, setActiveRole] = useState("All Staff");
  const [editEmp, setEditEmp]       = useState<Employee | null>(null);
  const [deleteEmp, setDeleteEmp]   = useState<Employee | null>(null);

  function handleSave(updated: Employee) {
    setEmployees((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  }

  function handleDelete(id: string) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <>
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">

        {/* Header */}
        <div>
          <h2 className="text-base font-bold text-white">Staff Management Panel</h2>
          <p className="text-xs text-zinc-500">Branch workforce operations and attendance overview</p>
        </div>

        {/* Role tabs + Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {ROLE_TABS.map((t) => (
            <FilterPill key={t} label={t} active={activeRole === t} onClick={() => setActiveRole(t)} />
          ))}
          <div className="flex items-center gap-2 ml-1 flex-wrap">
            <DropPill label="Branch" />
            <DropPill label="Role" />
            <DropPill label="Shift" />
            <DropPill label="Status" />
          </div>
        </div>

        {/* Search + Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#252527] border border-[#2e2e30] rounded-xl px-3 py-2.5 flex-1 min-w-[200px]">
            <Search size={14} className="text-zinc-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search employee, ID, branch..."
              className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full"
            />
          </div>
          <button
            onClick={() => router.push("/admin/settings")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f9671a] text-white text-sm font-medium hover:bg-[#e05a15] transition-colors whitespace-nowrap"
          >
            <Plus size={14} /> Add Employee
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#2e2e30] text-zinc-400 text-sm font-medium hover:text-white transition-colors whitespace-nowrap">
            <Download size={14} /> Export Excel
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2e2e30]">
                {COLUMNS.map((h) => (
                  <th key={h} className="text-left text-zinc-500 font-medium pb-3 pr-3 whitespace-nowrap">
                    {h === "EMPLOYEE ID" ? (
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded bg-zinc-700 border-zinc-600" readOnly />
                        {h}
                      </div>
                    ) : h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#2e2e30]/60">
              {employees.map((emp, i) => (
                <tr key={`${emp.id}-${i}`} className="hover:bg-zinc-800/20 transition-colors">

                  {/* Employee ID */}
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-zinc-700 border-zinc-600" readOnly />
                      <span className="text-[#f9671a] font-medium whitespace-nowrap">{emp.id}</span>
                    </div>
                  </td>

                  {/* Employee */}
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {emp.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-medium whitespace-nowrap">{emp.name}</p>
                        <p className="text-zinc-500 text-[10px]">{emp.phone}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 pr-3 text-zinc-300">{emp.branch}</td>
                  <td className="py-3 pr-3"><RoleBadge role={emp.role} /></td>
                  <td className="py-3 pr-3"><StatusBadge status={emp.status} /></td>
                  <td className="py-3 pr-3 text-zinc-400 whitespace-nowrap text-[10px]">{emp.shift}</td>
                  <td className="py-3 pr-3 text-zinc-300 whitespace-nowrap">{emp.timeIn}</td>
                  <td className="py-3 pr-3 text-zinc-300 whitespace-nowrap">{emp.timeOut}</td>
                  <td className="py-3 pr-3 text-white font-medium whitespace-nowrap">{emp.hoursWorked}</td>

                  {/* ACTION — pencil + trash */}
                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setEditEmp(emp)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-[#f9671a] hover:bg-[#f9671a]/10 transition-colors"
                        title="Edit employee"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteEmp(emp)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete employee"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination />
      </div>

      {/* Edit Modal */}
      {editEmp && (
        <EditEmployeeModal
          employee={editEmp}
          onClose={() => setEditEmp(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {deleteEmp && (
        <DeleteConfirmModal
          employee={deleteEmp}
          onClose={() => setDeleteEmp(null)}
          onConfirm={() => handleDelete(deleteEmp.id)}
        />
      )}
    </>
  );
}