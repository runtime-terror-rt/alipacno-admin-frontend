"use client";

import { useState } from "react";
import { Pencil, Trash2, X, Save } from "lucide-react";
import Image from "next/image";

export type OrderStatus = "Completed" | "Preparing" | "On Delivery" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  phone: string;
  image: string;
  branch: string;
  orderType: string;
  amount: string;
  payment: string;
  status: OrderStatus;
  driver: string;
  time: string;
  date: string;
}

interface OrdersTableProps {
  ORDERS: Order[];
  selectedRows: number[];
  toggleRow: (index: number) => void;
}


const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  Completed:    { label: "Completed",   className: "bg-green-500/10 text-green-400 border border-green-500/20" },
  Preparing:    { label: "Preparing",   className: "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a]/20" },
  "On Delivery":{ label: "On Delivery", className: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  Cancelled:    { label: "Cancel",      className: "bg-red-500/10 text-red-400 border border-red-500/20" },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

interface EditModalProps {
  order: Order;
  onClose: () => void;
  onSave: (updated: Order) => void;
}

function EditOrderModal({ order, onClose, onSave }: EditModalProps) {
  const [form, setForm] = useState<Order>({ ...order });

  function field(name: keyof Order, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-xl shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Pencil size={16} className="text-[#f9671a]" />
            <h2 className="text-base font-bold text-white">Edit Order</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 grid grid-cols-2 gap-x-5 gap-y-4">

          {/* Customer Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Customer Name</label>
            <input
              value={form.customer}
              onChange={(e) => field("customer", e.target.value)}
              className="bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => field("phone", e.target.value)}
              className="bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          {/* Branch */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Branch</label>
            <select
              value={form.branch}
              onChange={(e) => field("branch", e.target.value)}
              className="appearance-none bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer"
            >
              {["Eltham","Downtown","Romford","Sidcup"].map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>

          {/* Order Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Order Type</label>
            <select
              value={form.orderType}
              onChange={(e) => field("orderType", e.target.value)}
              className="appearance-none bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer"
            >
              {["Delivery","Collection","Dine In"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Amount</label>
            <input
              value={form.amount}
              onChange={(e) => field("amount", e.target.value)}
              className="bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Payment Method</label>
            <select
              value={form.payment}
              onChange={(e) => field("payment", e.target.value)}
              className="appearance-none bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer"
            >
              {["Card","Cash"].map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => field("status", e.target.value as OrderStatus)}
              className="appearance-none bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer"
            >
              {(["Completed","Preparing","On Delivery","Cancelled"] as OrderStatus[]).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Driver */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Driver</label>
            <input
              value={form.driver}
              onChange={(e) => field("driver", e.target.value)}
              className="bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-2">
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
  orderId: string;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteConfirmModal({ orderId, onClose, onConfirm }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Delete Order{" "}
            <span className="text-[#f9671a]">{orderId}</span>?
          </p>
          <p className="text-xs text-zinc-500 mt-1.5">This action cannot be undone.</p>
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


const OrdersTable = ({ ORDERS: initialOrders, selectedRows, toggleRow }: OrdersTableProps) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [editOrder, setEditOrder]   = useState<Order | null>(null);
  const [deleteOrder, setDeleteOrder] = useState<Order | null>(null);

  function handleSave(updated: Order) {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  }

  function handleDelete(id: string) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  const HEADERS = [
    "ORDER ID", "CUSTOMER", "BRANCH", "ORDER TYPE",
    "AMOUNT", "PAYMENT", "STATUS", "DRIVER", "TIME", "ACTION",
  ];

  return (
    <>
      <div className="w-full overflow-x-auto rounded-xl border border-[#353535] bg-[#1e1e1e]/20">
        <table className="w-full text-sm border-collapse">

          {/* ── Head ── */}
          <thead>
            <tr className="bg-[#3D3D3A] border-b border-zinc-800/80 [&>th:first-child]:rounded-tl-xl [&>th:last-child]:rounded-tr-xl">
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="text-left text-xs text-gray-100 font-semibold py-4 pr-4 first:pl-4 whitespace-nowrap tracking-wider uppercase align-middle"
                >
                  {h === "ORDER ID" ? (
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        className="rounded bg-zinc-700 border-zinc-600 text-[#f9671a] focus:ring-0 cursor-pointer"
                        readOnly
                      />
                      <span>{h}</span>
                    </div>
                  ) : h}
                </th>
              ))}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody className="divide-y divide-zinc-800/60">
            {orders.map((order, i) => (
              <tr key={`${order.id}-${i}`} className="hover:bg-zinc-800/30 transition-colors">

                {/* ORDER ID */}
                <td className="py-3.5 pr-4 pl-4 align-middle">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(i)}
                      onChange={() => toggleRow(i)}
                      className="rounded bg-gray-900 border-zinc-600 text-[#f9671a] focus:ring-0 cursor-pointer"
                    />
                    <span className="text-[#f9671a] text-xs font-semibold tracking-wide">{order.id}</span>
                  </div>
                </td>

                {/* CUSTOMER */}
                <td className="py-3.5 pr-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
                      <Image src={order.image} alt={order.customer} fill sizes="36px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white whitespace-nowrap">{order.customer}</p>
                      <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{order.phone}</p>
                    </div>
                  </div>
                </td>

                {/* BRANCH */}
                <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">{order.branch}</td>

                {/* ORDER TYPE */}
                <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">{order.orderType}</td>

                {/* AMOUNT */}
                <td className="py-3.5 pr-4 text-xs font-semibold text-white align-middle whitespace-nowrap">{order.amount}</td>

                {/* PAYMENT */}
                <td className="py-3.5 pr-4 align-middle whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-4 rounded-sm flex-shrink-0 ${order.payment === "Card" ? "bg-gradient-to-r from-zinc-600 to-zinc-500" : "bg-zinc-700"} flex items-center justify-center border border-zinc-600/30`}>
                      <div className="w-2.5 h-1.5 rounded-sm bg-zinc-400/40" />
                    </div>
                    <span className="text-xs font-medium text-zinc-300">{order.payment}</span>
                  </div>
                </td>

                {/* STATUS */}
                <td className="py-3.5 pr-4 align-middle">
                  <StatusBadge status={order.status} />
                </td>

                {/* DRIVER */}
                <td className="py-3.5 pr-4 align-middle">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
                      <Image src={order.image} alt={order.driver} fill sizes="28px" className="object-cover" />
                    </div>
                    <span className="text-xs font-medium text-zinc-300 whitespace-nowrap">{order.driver}</span>
                  </div>
                </td>

                {/* TIME */}
                <td className="py-3.5 pr-4 align-middle whitespace-nowrap">
                  <p className="text-xs font-medium text-zinc-300">{order.time}</p>
                  <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{order.date}</p>
                </td>

                {/* ACTION — pencil + trash */}
                <td className="py-3.5 pr-4 align-middle">
                  <div className="flex items-center gap-1.5">
                    {/* Edit */}
                    <button
                      onClick={() => setEditOrder(order)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-[#f9671a] hover:bg-[#f9671a]/10 transition-colors"
                      title="Edit order"
                    >
                      <Pencil size={14} />
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => setDeleteOrder(order)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete order"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editOrder && (
        <EditOrderModal
          order={editOrder}
          onClose={() => setEditOrder(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {deleteOrder && (
        <DeleteConfirmModal
          orderId={deleteOrder.id}
          onClose={() => setDeleteOrder(null)}
          onConfirm={() => handleDelete(deleteOrder.id)}
        />
      )}
    </>
  );
};

export default OrdersTable;