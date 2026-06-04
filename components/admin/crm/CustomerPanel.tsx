"use client";

import { CalendarRange, ChevronRight, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';
import AddNoteModal from "../models/AddNoteModal";

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

export default function CustomerPanel() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleAddNote = (note: string) => {
    // Here you can save the note to your backend or state
    console.log("New Note:", note);
    
    toast.success("Note added successfully", {
      duration: 4000,
      position: 'top-center',
    });
  };

  return (
    <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-2xl p-5 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image src="/admin/avatar/cody.png" alt="Cody" width={40} height={40} className="rounded-full" />
        <div>
          <p className="text-sm font-bold text-white">Cody</p>
          <p className="text-xs text-zinc-500">07881 234 587</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-success/10 text-success/70 border border-success/99">Regular</span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f9671a]/15 text-[#f9671a] border border-[#f9671a]/30">VIP</span>
        <button className="ml-auto text-xs text-zinc-400 hover:text-white">View All</button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#2e2e30] bg-[#36363A] p-3 rounded-xl">
        {["History", "1 Missed Call", "23 orders"].map((t, i) => (
          <div 
            key={t} 
            className={`text-xs font-medium transition-colors whitespace-nowrap ${i === 0 ? "text-white pb-2 -mb-2 border-b-2 border-[#f9671a]" : "text-zinc-500 hover:text-white"}`}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Order history row */}
      <div className="bg-[#252527] border border-zinc-700 rounded-xl p-2">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-zinc-400">Sun, Apr 21</p>
          <button className="text-xs text-zinc-400 hover:text-white">View All</button>
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

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          onClick={() => setShowNoteModal(true)}
        >
          <CalendarRange size={13} className="text-[#f9671a]" /> Add note
        </Button>
        
        <Button onClick={() => router.push("/admin/messages")} variant="ghost">
          <MessageSquare size={13} /> Send Message
        </Button>
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
                className="rounded-lg object-cover" 
              />
              <div className="flex-1">
                <p className="text-xs text-white">{item.name}</p>
                <p className="text-[10px] text-zinc-500">{item.orders} orders</p>
              </div>
              <ChevronRight size={13} className="text-zinc-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Add Note Modal */}
      {showNoteModal && (
        <AddNoteModal 
          customerName="Cody"
          onClose={() => setShowNoteModal(false)}
          onSave={handleAddNote}
        />
      )}
    </div>
  );
}