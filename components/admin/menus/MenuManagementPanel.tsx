"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  Download,
  Pencil,
  Trash2,
  X,
  Save,
} from "lucide-react";

import Pagination from "../ui/Pagination";
import DateFiltersBar from "../ui/DateFilterBar";
import FilterDropdown from "../ui/FilterDropdown";
import Button from "../ui/Button";
import Image from "next/image";

type MenuStatus =
  | "Available"
  | "Out of Stock"
  | "Hidden";

interface MenuItem {
  customer: string; // Item Name
  phone: string;    // Category Name
  modifierId: string; // MOD ID
  price: string;
  modifiers: number;
  status: MenuStatus;
  availableAt: string;
  updated: string;
  updatedDate: string;
  image: string;
}

const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    customer: "Chicken Burger",
    phone: "Fast Food",
    modifierId: "#MOD-001",
    price: "£12.00",
    modifiers: 4,
    status: "Available",
    availableAt: "All Branches",
    updated: "2 mins ago",
    updatedDate: "12 May 2026",
    image: "/admin/avatar/default.png"
  },
  {
    customer: "Cheese Pizza",
    phone: "Pizza",
    modifierId: "#MOD-002",
    price: "£18.00",
    modifiers: 2,
    status: "Out of Stock",
    availableAt: "Downtown",
    updated: "10 mins ago",
    updatedDate: "12 May 2026",
    image: "/admin/avatar/default.png"
  },
  {
    customer: "Chicken Wings",
    phone: "Snacks",
    modifierId: "#MOD-003",
    price: "£9.00",
    modifiers: 5,
    status: "Hidden",
    availableAt: "Eltham",
    updated: "1 hour ago",
    updatedDate: "11 May 2026",
    image: "/admin/avatar/default.png"
  },
  {
    customer: "Chicken Burger",
    phone: "Fast Food",
    modifierId: "#MOD-001",
    price: "£12.00",
    modifiers: 4,
    status: "Available",
    availableAt: "All Branches",
    updated: "2 mins ago",
    updatedDate: "12 May 2026",
    image: "/admin/avatar/default.png"
  },
  {
    customer: "Cheese Pizza",
    phone: "Pizza",
    modifierId: "#MOD-002",
    price: "£18.00",
    modifiers: 2,
    status: "Out of Stock",
    availableAt: "Downtown",
    updated: "10 mins ago",
    updatedDate: "12 May 2026",
    image: "/admin/avatar/default.png"
  },
];

function StatusBadge({
  status,
}: {
  status: MenuStatus;
}) {
  const styles: Record<MenuStatus, string> = {
    Available:
      "bg-green-500/15 text-green-400 border-green-500/30",

    "Out of Stock":
      "bg-red-500/15 text-red-400 border-red-500/30",

    Hidden:
      "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap ${styles[status]}`}
    >
      {status}
    </span>
  );
}

interface EditMenuModalProps {
  item: MenuItem;
  onClose: () => void;
  onSave: (updated: MenuItem) => void;
}

function EditMenuModal({ item, onClose, onSave }: EditMenuModalProps) {
  const [form, setForm] = useState<MenuItem>({ ...item });

  function field<K extends keyof MenuItem>(key: K, value: MenuItem[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Pencil size={16} className="text-[#f9671a]" />
            <h2 className="text-base font-bold text-white">Edit Menu Item</h2>
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
            <label className="text-xs text-zinc-400 font-medium">Item Name</label>
            <input
              value={form.customer}
              onChange={(e) => field("customer", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Category</label>
            <input
              value={form.phone}
              onChange={(e) => field("phone", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 font-medium">Price</label>
              <input
                value={form.price}
                onChange={(e) => field("price", e.target.value)}
                className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 font-medium">Modifiers</label>
              <input
                type="number"
                value={form.modifiers}
                onChange={(e) => field("modifiers", parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => field("status", e.target.value as MenuStatus)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer"
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Available At</label>
            <input
              value={form.availableAt}
              onChange={(e) => field("availableAt", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
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

interface DeleteMenuModalProps {
  item: MenuItem;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteMenuModal({ item, onClose, onConfirm }: DeleteMenuModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Delete Menu Item{" "}
            <span className="text-[#f9671a]">{item.customer}</span>?
          </p>
          <p className="text-xs text-zinc-500 mt-1.5">
            This item will be permanently removed from the menu. This action cannot be undone.
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

export default function MenuManagementPanel() {
  const [activeTab, setActiveTab] = useState("All");
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null);

  const tabs = [
    "All",
    "Popular",
    "Available",
    "Out of Stock",
    "Hidden",
  ];

  const columns = [
    "ITEM",
    "CATEGORY",
    "PRICE",
    "MODIFIERS",
    "STATUS",
    "AVAILABLE AT",
    "UPDATED",
    "ACTION",
  ];

  function handleSave(updated: MenuItem) {
    setMenuItems((prev) => prev.map((item) => (item.customer === editItem?.customer && item.modifierId === editItem?.modifierId ? updated : item)));
  }

  function handleDelete(target: MenuItem) {
    setMenuItems((prev) => prev.filter((item) => !(item.customer === target.customer && item.modifierId === target.modifierId)));
  }

  return (
    <>
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
        {/* Header */}
        <div>
          <h2 className="text-base font-bold text-white">
            Menu Management
          </h2>

          <p className="text-xs text-zinc-500">
            Manage categories, items, pricing and
            availability
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <DateFiltersBar
            tabs={tabs}
            //   value={activeTab}
            onChange={setActiveTab}
          />

          <div className="flex items-center gap-2 flex-wrap">
            <FilterDropdown label="All Categories" />
            <FilterDropdown label="All Branches" />
            <FilterDropdown label="All Status" />
          </div>
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
              placeholder="Search menu items..."
              className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full"
            />
          </div>

          <Button className="px-4 py-2.5 flex items-center gap-1.5 w-fit">
            <Plus size={14} />
            Add Item
          </Button>

          <Button
            variant="ghost"
            className="px-4 py-2.5 flex items-center gap-1.5 w-fit"
          >
            <RefreshCw size={14} />
            Bulk Update
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
              {menuItems.map((item, i) => (
                <tr
                  key={`${item.customer}-${i}`}
                  className="hover:bg-zinc-800/20 transition-colors"
                >
                  {/* Item */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <Image src={item.image} alt={item.customer} width={44} height={44} />

                      <div>
                        <p className="text-white font-medium whitespace-nowrap">
                          {item.customer}
                        </p>

                        <p className="text-zinc-500 text-[10px]">
                          {item.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        className="rounded bg-zinc-700"
                        readOnly
                      />

                      <span className="text-[#f9671a] font-medium">
                        {item.modifierId}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 pr-4 text-white font-medium whitespace-nowrap">
                    {item.price}
                  </td>

                  {/* Modifiers */}
                  <td className="py-3 pr-4 text-zinc-300">
                    {item.modifiers}
                  </td>

                  {/* Status */}
                  <td className="py-3 pr-4">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Available */}
                  <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">
                    {item.availableAt}
                  </td>

                  {/* Updated */}
                  <td className="py-3 pr-4">
                    <p className="text-zinc-300 whitespace-nowrap">
                      {item.updated}
                    </p>

                    <p className="text-zinc-500 text-[10px]">
                      {item.updatedDate}
                    </p>
                  </td>

                  {/* Action */}
                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setEditItem(item)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-[#f9671a] hover:bg-[#f9671a]/10 transition-colors"
                        title="Edit Item"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteItem(item)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Item"
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
      {editItem && (
        <EditMenuModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {deleteItem && (
        <DeleteMenuModal
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
          onConfirm={() => handleDelete(deleteItem)}
        />
      )}
    </>
  );
}