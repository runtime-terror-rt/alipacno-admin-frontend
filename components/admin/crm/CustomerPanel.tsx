"use client";

import { useState } from "react";
import { CalendarRange, ChevronRight, MessageSquare, Phone, X, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────

interface MenuItem {
  name: string;
  orders: number;
  image: string;
}

const MENU_ITEMS: MenuItem[] = [
  { name: "Cheeseburger", orders: 11, image: "/admin/food/cheeseburger.png" },
  { name: "Chicken Wrap", orders: 7, image: "/admin/food/media3.jpg" },
  { name: "Large Fries", orders: 7, image: "/admin/food/pizza.jpg" },
  { name: "Cheeseburger", orders: 11, image: "/admin/food/cheeseburger.png" },
  { name: "Cheeseburger", orders: 11, image: "/admin/food/cheeseburger.png" },
  { name: "Chicken Wrap", orders: 7, image: "/admin/food/media3.jpg" },
  { name: "Chicken Wrap", orders: 7, image: "/admin/food/media3.jpg" },
];

// ─────────────────────────────────────────────
// Add Note Modal
// ─────────────────────────────────────────────

interface AddNoteModalProps {
  customerName: string;
  onClose: () => void;
  onSave: (note: string) => void;
}

function AddNoteModal({ customerName, onClose, onSave }: AddNoteModalProps) {
  const [note, setNote] = useState("");

  function handleSave() {
    if (note.trim()) {
      onSave(note.trim());
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5">
          <div className="flex items-center gap-2.5">
            <CalendarRange size={16} className="text-[#f9671a]" />
            <h2 className="text-base font-bold text-white">Add Note</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-5 space-y-3">
          <p className="text-sm text-zinc-400">
            Add a note for <span className="font-bold text-white">{customerName}</span>
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your note here... (e.g., Customer prefers no onions, allergic to nuts, etc.)"
            rows={6}
            className="w-full bg-[#141414] border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#f9671a]/50 focus:ring-1 focus:ring-[#f9671a]/10 transition-all resize-none"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-1 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-medium hover:text-white hover:border-zinc-500 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-700 border border-zinc-600 text-white text-sm font-semibold hover:bg-zinc-600 transition-colors"
          >
            <Save size={14} /> Save Note
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Customer Panel
// ─────────────────────────────────────────────

export default function CustomerPanel() {
  const router = useRouter();
  const [showAddNote, setShowAddNote] = useState(false);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const CUSTOMER_NAME = "Cody";

  function handleSaveNote(note: string) {
    setSavedNotes((prev) => [...prev, note]);
  }

  function handleSendMessage() {
    router.push("/admin/chat");
  }

  return (
    <>
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Image
            src="/admin/avatar/cody.png"
            alt={CUSTOMER_NAME}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-bold text-white">{CUSTOMER_NAME}</p>
            <p className="text-xs text-zinc-500">07881 234 587</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-500/10 text-green-400 border border-green-500/30">
            Regular
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f9671a]/15 text-[#f9671a] border border-[#f9671a]/30">
            VIP
          </span>
          <button className="ml-auto text-xs text-zinc-400 hover:text-white transition-colors">
            View All
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 border-b border-[#2e2e30] bg-[#36363A] p-3 rounded-xl">
          {["History", "1 Missed Call", "23 orders"].map((t, i) => (
            <div
              key={t}
              className={`text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${i === 0 ? "text-white" : "text-zinc-500 hover:text-white"
                }`}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Order history row */}
        <div className="bg-[#252527] border border-zinc-700 rounded-xl p-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-zinc-400">Sun, Apr 21</p>
            <button className="text-xs text-zinc-400 hover:text-white transition-colors">
              View All
            </button>
          </div>
          <div className="rounded-xl p-3 flex items-center gap-2">
            <Phone size={13} className="text-[#f9671a]" />
            <div className="flex-1">
              <p className="text-xs text-white font-medium">Phone Order</p>
              <p className="text-xs text-zinc-500">10:45 PM</p>
            </div>
            <span className="text-xs font-semibold text-white">£39.50</span>
          </div>
          <div className="mt-2 pl-3 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Delivered</span>
            <span className="text-xs font-semibold text-[#f9671a]">£16.20</span>
          </div>
        </div>

        {/* Saved Notes preview (if any) */}
        {savedNotes.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-white">Notes</p>
            {savedNotes.map((note, i) => (
              <div
                key={i}
                className="bg-[#252527] border border-zinc-700/50 rounded-xl px-3 py-2 text-xs text-zinc-300 leading-relaxed"
              >
                {note}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Add Note */}
          <button
            onClick={() => setShowAddNote(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#252527] border border-[#2e2e30] text-zinc-300 text-xs font-medium hover:text-white hover:border-zinc-500 transition-all"
          >
            <CalendarRange size={13} className="text-[#f9671a]" />
            Add note
          </button>

          {/* Send Message → /admin/chat */}
          <button
            onClick={handleSendMessage}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#f9671a] text-white text-xs font-semibold hover:bg-[#e05a15] transition-colors shadow-md shadow-[#f9671a]/20"
          >
            <MessageSquare size={13} />
            Send Message
          </button>
        </div>

        {/* Most Ordered Items */}
        <div>
          <p className="text-xs font-semibold text-white mb-3">Most Ordered Items</p>
          <div className="space-y-2">
            {MENU_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{item.name}</p>
                  <p className="text-[10px] text-zinc-500">{item.orders} orders</p>
                </div>
                <ChevronRight size={13} className="text-zinc-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      {showAddNote && (
        <AddNoteModal
          customerName={CUSTOMER_NAME}
          onClose={() => setShowAddNote(false)}
          onSave={handleSaveNote}
        />
      )}
    </>
  );
}