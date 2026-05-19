"use client";

import React from 'react';
import { 
  Sliders, 
  CalendarClock, 
  GitFork, 
  Coins 
} from 'lucide-react';

interface ActionCard {
  label: string;
  desc: string;
  icon: React.ReactNode;
}

// Integrated true dataset mapping matching your structural configuration exactly
const BOTTOM_CARDS: ActionCard[] = [
  { 
    label: "Modifier Groups",     
    desc: "Manage toppings, sizes, extras with individual pricing",
    icon: <Sliders size={13} className="text-[#f9671a]" />
  },
  { 
    label: "Schedule Availability", 
    desc: "Set menu available time for each item",
    icon: <CalendarClock size={13} className="text-[#f9671a]" />
  },
  { 
    label: "Branch Menu Control",  
    desc: "Enable / disable items per branch",
    icon: <GitFork size={13} className="text-[#f9671a]" />
  },
  { 
    label: "Bulk Price Update",    
    desc: "Update prices in bulk across categories",
    icon: <Coins size={13} className="text-[#f9671a]" />
  },
];

export default function QuickActionGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full select-none">
      {BOTTOM_CARDS.map((card) => (
        <button 
          key={card.label}
          className="bg-[#18181a] border border-[#2e2e30] rounded-xl p-4 flex items-start gap-3 text-left outline-none hover:border-[#f9671a]/40 focus-visible:border-[#f9671a]/40 transition-all duration-200 group"
        >
          {/* Custom double-circle nested icon frame wrapper matching image_31c26b */}
          <div className="w-9 h-9 rounded-full border border-[#f9671a]/30 bg-[#f9671a]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f9671a]/10 transition-colors">
            <div className="w-7 h-7 rounded-full border border-[#f9671a]/40 flex items-center justify-center">
              {card.icon}
            </div>
          </div>

          {/* Action Header Card Copy context */}
          <div className="flex flex-col min-w-0 mt-0.5">
            <p className="text-xs font-bold text-zinc-100 tracking-wide mb-1 group-hover:text-white transition-colors">
              {card.label}
            </p>
            <p className="text-[11px] text-zinc-500 font-medium leading-normal line-clamp-2">
              {card.desc}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}