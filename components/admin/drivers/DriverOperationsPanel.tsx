"use client";

import { useState } from "react";
import {
  Star, Bike, Search, CloudUpload, PlusCircle,
  Pencil, Trash2, X, Save, ChevronDown,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import Image from "next/image";


type DriverStatus = "Available" | "On Delivery" | "Break" | "Offline";

interface Driver {
  id: string;
  name: string;
  phone: string;
  branch: string;
  earnings: string;
  deliveries: number;
  status: DriverStatus;
  rating: number;
  ratingChange: string;
  ratingPositive: boolean;
  vehicle: "bike" | "car" | "scooter";
  image?: string;
}

const INITIAL_DRIVERS: Driver[] = [
  { id: "#d006 4448", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£32.00", deliveries: 20, status: "Available",   rating: 4.9, ratingChange: "+4%", ratingPositive: true,  vehicle: "bike",    image: "/admin/avatar/cody.png" },
  { id: "#d006 4449", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£28.00", deliveries: 13, status: "On Delivery",  rating: 4.2, ratingChange: "-2%", ratingPositive: false, vehicle: "scooter", image: "/admin/avatar/cody.png" },
  { id: "#d006 4450", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£33.00", deliveries: 72, status: "Break",        rating: 3.8, ratingChange: "+1%", ratingPositive: true,  vehicle: "bike",    image: "/admin/avatar/cody.png" },
  { id: "#d006 4451", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£34.00", deliveries: 69, status: "Available",   rating: 4.5, ratingChange: "+3%", ratingPositive: true,  vehicle: "car",     image: "/admin/avatar/cody.png" },
  { id: "#d006 4452", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£29.00", deliveries: 69, status: "Available",   rating: 4.1, ratingChange: "+2%", ratingPositive: true,  vehicle: "scooter", image: "/admin/avatar/cody.png" },
];


function DriverStatusBadge({ status }: { status: DriverStatus }) {
  const map: Record<DriverStatus, string> = {
    Available:    "bg-green-500/15 text-green-400 border-green-500/30",
    "On Delivery":"bg-blue-500/15 text-blue-400 border-blue-500/30",
    Break:        "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Offline:      "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${map[status]}`}>
      {status}
    </span>
  );
}

function FilterPill({
  label, active, onClick,
}: { label: string; active?: boolean; onClick?: () => void }) {
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

interface EditDriverModalProps {
  driver: Driver;
  onClose: () => void;
  onSave: (updated: Driver) => void;
}

function EditDriverModal({ driver, onClose, onSave }: EditDriverModalProps) {
  const [form, setForm] = useState<Driver>({ ...driver });

  function field<K extends keyof Driver>(key: K, value: Driver[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Pencil size={16} className="text-[#f9671a]" />
            <h2 className="text-base font-bold text-white">Edit Driver</h2>
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
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Full Name</label>
            <input
              value={form.name}
              onChange={(e) => field("name", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => field("phone", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          {/* Branch + Vehicle */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 font-medium">Branch</label>
              <div className="relative">
                <select
                  value={form.branch}
                  onChange={(e) => field("branch", e.target.value)}
                  className="w-full appearance-none bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer pr-8"
                >
                  {["Eltham","Downtown","Romford","Sidcup","Greenwich"].map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 font-medium">Vehicle</label>
              <div className="relative">
                <select
                  value={form.vehicle}
                  onChange={(e) => field("vehicle", e.target.value as Driver["vehicle"])}
                  className="w-full appearance-none bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer pr-8"
                >
                  <option value="bike">Bike</option>
                  <option value="scooter">Scooter</option>
                  <option value="car">Car</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Status</label>
            <div className="relative">
              <select
                value={form.status}
                onChange={(e) => field("status", e.target.value as DriverStatus)}
                className="w-full appearance-none bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer pr-8"
              >
                {(["Available","On Delivery","Break","Offline"] as DriverStatus[]).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            </div>
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


interface DeleteModalProps {
  driverId: string;
  driverName: string;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteConfirmModal({ driverId, driverName, onClose, onConfirm }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Delete Driver{" "}
            <span className="text-[#f9671a]">{driverId}</span>?
          </p>
          <p className="text-xs text-zinc-500 mt-1.5">
            <span className="text-zinc-300 font-medium">{driverName}</span> will be permanently removed. This action cannot be undone.
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

export default function DriverOperationsPanel() {
  const [drivers, setDrivers]     = useState<Driver[]>(INITIAL_DRIVERS);
  const [activeStatus, setActiveStatus] = useState("All");
  const [activePeriod, setActivePeriod] = useState("TODAY");
  const [editDriver, setEditDriver]     = useState<Driver | null>(null);
  const [deleteDriver, setDeleteDriver] = useState<Driver | null>(null);

  const statusTabs = ["All", "On Delivery", "Available", "Break", "Offline"];
  const periodTabs = ["TODAY", "YESTERDAY", "THIS WEEK", "LAST WEEK", "MTD", "6MD", "YTD"];

  function handleSave(updated: Driver) {
    setDrivers((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  }

  function handleDelete(id: string) {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
  }

  const TABLE_HEADERS = [
    "DRIVER ID", "ORDER NAME", "BRANCH", "EARNINGS",
    "DELIVERIES", "STATUS", "PERFORMANCE", "VEHICLE", "ACTION",
  ];

  return (
    <>
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">

        {/* Title */}
        <div>
          <h2 className="text-sm font-semibold text-white">Driver Operations Panel</h2>
          <p className="text-xs text-zinc-500">Live driver activity and delivery tracking.</p>
        </div>

        {/* Status + Period tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {statusTabs.map((t) => (
              <FilterPill key={t} label={t} active={activeStatus === t} onClick={() => setActiveStatus(t)} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {periodTabs.map((t) => (
              <FilterPill key={t} label={t} active={activePeriod === t} onClick={() => setActivePeriod(t)} />
            ))}
          </div>
        </div>

        {/* Search + Filters + Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 bg-[#252527] border border-[#2e2e30] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
            <Search size={14} className="text-zinc-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search driver Id, name, phone..."
              className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none flex-1"
            />
          </div>
          {["Branch", "Driver Status", "Team", "Sort"].map((f) => (
            <DropPill key={f} label={f} />
          ))}
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#f9671a]/50 text-[#f9671a] text-xs font-medium hover:bg-[#f9671a]/10 transition-colors whitespace-nowrap">
            <PlusCircle size={12} /> Add Driver
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2e2e30] text-zinc-400 text-xs font-medium hover:text-white transition-colors whitespace-nowrap">
            <CloudUpload size={12} /> Export Csv
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2e2e30]">
                {TABLE_HEADERS.map((h) => (
                  <th
                    key={h}
                    className="text-left text-zinc-500 font-medium pb-2.5 pr-4 whitespace-nowrap"
                  >
                    {h === "DRIVER ID" ? (
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded bg-zinc-700" readOnly />
                        {h}
                      </div>
                    ) : h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#2e2e30]/60">
              {drivers.map((d, i) => (
                <tr key={`${d.id}-${i}`} className="hover:bg-zinc-800/20 transition-colors">

                  {/* Driver ID */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-zinc-700" readOnly />
                      <span className="text-[#f9671a] font-medium whitespace-nowrap">{d.id}</span>
                    </div>
                  </td>

                  {/* Name */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={d.image || "/admin/avatar/default.png"}
                        alt={d.name}
                        width={28}
                        height={28}
                        className="rounded-full object-cover flex-shrink-0"
                      />
                      <div>
                        <p className="text-white font-medium whitespace-nowrap">{d.name}</p>
                        <p className="text-zinc-500 text-[10px]">{d.phone}</p>
                      </div>
                    </div>
                  </td>

                  {/* Branch */}
                  <td className="py-3 pr-4 text-zinc-300">{d.branch}</td>

                  {/* Earnings */}
                  <td className="py-3 pr-4 text-white font-semibold">{d.earnings}</td>

                  {/* Deliveries */}
                  <td className="py-3 pr-4 text-zinc-300">{d.deliveries}</td>

                  {/* Status */}
                  <td className="py-3 pr-4"><DriverStatusBadge status={d.status} /></td>

                  {/* Performance */}
                  <td className="py-3 pr-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-white font-semibold">{d.rating}</span>
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      </div>
                      <span className={`text-[10px] font-medium ${d.ratingPositive ? "text-green-400" : "text-red-400"}`}>
                        {d.ratingChange}
                      </span>
                    </div>
                  </td>

                  {/* Vehicle */}
                  <td className="py-3 pr-4">
                    <Bike size={14} className="text-[#f9671a]" />
                  </td>

                  {/* ACTION — pencil + trash */}
                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setEditDriver(d)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-[#f9671a] hover:bg-[#f9671a]/10 transition-colors"
                        title="Edit driver"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteDriver(d)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete driver"
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
      {editDriver && (
        <EditDriverModal
          driver={editDriver}
          onClose={() => setEditDriver(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {deleteDriver && (
        <DeleteConfirmModal
          driverId={deleteDriver.id}
          driverName={deleteDriver.name}
          onClose={() => setDeleteDriver(null)}
          onConfirm={() => handleDelete(deleteDriver.id)}
        />
      )}
    </>
  );
}