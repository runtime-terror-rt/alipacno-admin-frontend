"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical, Plus, Edit2, Trash2, X, Save } from "lucide-react";
import Image from "next/image";
import { signageTableData } from "@/app/(admin)/admin/signage/data";

interface SignageItem {
  id: string;
  name: string;
  resolution: string;
  image: string;
  branch: string;
  status: string;
  updatedTime: string;
  updatedDate: string;
}

interface EditSignageModalProps {
  signage: SignageItem;
  onClose: () => void;
  onSave: (updated: SignageItem) => void;
}

function EditSignageModal({ signage, onClose, onSave }: EditSignageModalProps) {
  const [form, setForm] = useState<SignageItem>({ ...signage });

  function field<K extends keyof SignageItem>(key: K, value: SignageItem[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Edit2 size={16} className="text-[#f9671a]" />
            <h2 className="text-base font-bold text-white">Edit Signage Screen</h2>
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
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Screen/Location Name</label>
            <input
              value={form.name}
              onChange={(e) => field("name", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Resolution</label>
            <input
              value={form.resolution}
              onChange={(e) => field("resolution", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Branch</label>
            <input
              value={form.branch}
              onChange={(e) => field("branch", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => field("status", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Offline">Offline</option>
            </select>
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

interface DeleteSignageModalProps {
  signage: SignageItem;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteSignageModal({ signage, onClose, onConfirm }: DeleteSignageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Delete Signage Screen{" "}
            <span className="text-[#f9671a]">{signage.name}</span>?
          </p>
          <p className="text-xs text-zinc-500 mt-1.5">
            This screen record will be permanently deleted. This action cannot be undone.
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

export default function SignageTable() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [signageList, setSignageList] = useState<SignageItem[]>(signageTableData);
  const [editSignage, setEditSignage] = useState<SignageItem | null>(null);
  const [deleteSignage, setDeleteSignage] = useState<SignageItem | null>(null);

  const toggleDropdown = (id: string) => {
    if (openDropdown === id) setOpenDropdown(null);
    else setOpenDropdown(id);
  };

  function handleSave(updated: SignageItem) {
    setSignageList((prev) => prev.map((item) => item.id === updated.id ? updated : item));
  }

  function handleDelete(id: string) {
    setSignageList((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <>
      <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-visible">
        <div className="mb-6">
          <h2 className="text-lg font-black text-white">Digital Signage Management</h2>
          <p className="text-zinc-500 text-xs font-semibold mt-1">
            Manage and display content across all in-store screens
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-20">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search order id, customer, phone..."
              className="w-full bg-[#161618] border border-zinc-800 focus:border-zinc-700 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-white outline-none transition-colors"
            />
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            <div className="relative shrink-0">
              <select className="appearance-none bg-[#161618] border border-zinc-800 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-zinc-300 outline-none hover:border-zinc-700 transition-colors cursor-pointer">
                <option>All Branches</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            </div>
            <div className="relative shrink-0">
              <select className="appearance-none bg-[#161618] border border-zinc-800 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-zinc-300 outline-none hover:border-zinc-700 transition-colors cursor-pointer">
                <option>All Screen Groups</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            </div>
            <div className="relative shrink-0">
              <select className="appearance-none bg-[#161618] border border-zinc-800 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-zinc-300 outline-none hover:border-zinc-700 transition-colors cursor-pointer">
                <option>All Status</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-orange-500/50 hover:bg-orange-500/10 text-orange-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shrink-0">
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 px-6 pb-20">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-y border-zinc-800/80 text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-[#1c1c1e]">
                <th className="py-4 px-4 w-[35%]">SCREEN / LOCATION</th>
                <th className="py-4">BRANCH</th>
                <th className="py-4">STATUS</th>
                <th className="py-4">UPDATED</th>
                <th className="py-4">UPDATED</th>
                <th className="py-4 text-right px-4">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs font-semibold">
              {signageList.map((row) => (
                <tr key={row.id} className="hover:bg-[#161618] transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-16 bg-zinc-800 rounded overflow-hidden shrink-0 relative">
                         {/* Placeholder Image using next/image. If it fails, bg-zinc-800 shows */}
                         <Image src={row.image} alt={row.name} layout="fill" objectFit="cover" />
                      </div>
                      <div className="flex flex-col space-y-0.5">
                        <span className="text-white font-bold text-xs">{row.name}</span>
                        <span className="text-zinc-500 text-[10px]">{row.resolution}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-zinc-300">{row.branch}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      row.status === "Active" 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                        : "bg-orange-500/10 border-orange-500/20 text-orange-500"
                    }`}>
                      {row.status === "Active" && <span className="mr-0.5">+</span>}
                      <span>{row.status}</span>
                    </span>
                  </td>
                  <td className="py-4 text-zinc-500 leading-tight">
                    <span className="text-white font-bold block">{row.updatedTime}</span>
                    <span className="text-[10px]">{row.updatedDate}</span>
                  </td>
                  <td className="py-4 text-zinc-500 leading-tight">
                    <span className="text-white font-bold block">{row.updatedTime}</span>
                    <span className="text-[10px]">{row.updatedDate}</span>
                  </td>
                  <td className="py-4 text-right px-4 relative z-10">
                    <button 
                      onClick={() => toggleDropdown(row.id)}
                      className="p-2 text-zinc-500 hover:text-white transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 ml-auto" />
                    </button>
                    
                    {openDropdown === row.id && (
                      <>
                        {/* Invisible overlay to close dropdown */}
                        <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                        
                        <div className="absolute right-8 top-10 w-32 bg-[#1c1c1e] border border-zinc-800 rounded-xl shadow-xl py-1 z-50 animate-fadeIn">
                          <button
                            onClick={() => { setEditSignage(row); setOpenDropdown(null); }}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-bold text-white hover:bg-[#2c2c2e] transition-colors cursor-pointer"
                          >
                            <Edit2 className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => { setDeleteSignage(row); setOpenDropdown(null); }}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editSignage && (
        <EditSignageModal
          signage={editSignage}
          onClose={() => setEditSignage(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {deleteSignage && (
        <DeleteSignageModal
          signage={deleteSignage}
          onClose={() => setDeleteSignage(null)}
          onConfirm={() => handleDelete(deleteSignage.id)}
        />
      )}
    </>
  );
}
