import React from 'react';
import Image from 'next/image'; // Keeps your Next.js Image component optimization

// Mock Data structure based on the schema
const RECENT_DRIVERS_DATA = [
  {
    time: "08:12 AM",
    driver: "Alex Rider",
    orderId: "#ORD-9921",
    branch: "Eltham (EL01)",
    status: "On Delivery",
    color: "#e67e22", // Amber / Orange
    image: "/admin/avatar/default.png",
  },
  {
    time: "08:45 AM",
    driver: "Cody Fisher",
    orderId: "#ORD-9844",
    branch: "Sidcup (SD02)",
    status: "Completed",
    color: "#2ecc71", // Green
    image: "/admin/avatar/default.png",
  },
  {
    time: "09:15 AM",
    driver: "Jane Cooper",
    orderId: "#ORD-9511",
    branch: "Romford (RM1)",
    status: "At Restaurant",
    color: "#f1c40f", // Yellow
    image: "/admin/avatar/default.png",
  },
  {
    time: "10:02 AM",
    driver: "Robert Fox",
    orderId: "#ORD-9210",
    branch: "Eltham (EL01)",
    status: "Offline",
    color: "#7f8c8d", // Gray
    image: "/admin/avatar/default.png",
  },
];

// Extracted internal Status Badge component following the same visual rules
function ActivityStatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span 
      className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide text-center border w-28 block truncate transition-all"
      style={{ 
        borderColor: color, 
        color: color,
        backgroundColor: `${color}0d` // 5% Alpha tint layer
      }}
    >
      {status}
    </span>
  );
}

export default function RecentDriverActivity() {
  return (
    <div className="bg-[#18181a] border border-[#2e2e30] rounded-2xl p-6 select-none max-w-4xl w-full">
      <h3 className="text-sm font-semibold text-zinc-100 mb-5">
        Recent Driver Activity
      </h3>

      <div className="flex flex-col gap-1.5">
        {RECENT_DRIVERS_DATA.map((activity, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[auto_auto_1fr_1fr_auto] items-center gap-x-6 py-2.5 border-b border-[#2e2e30]/40 last:border-0 text-xs"
          >
            {/* Status Dot Indicator */}
            <div className="flex items-center justify-center">
              <div 
                className="w-3.5 h-3.5 rounded-full border-2 border-[#18181a]" 
                style={{ backgroundColor: activity.color }}
              />
            </div>

            {/* Profile Avatar & Timestamp */}
            <div className="flex items-center gap-3 min-w-[110px]">
              <Image 
                src={activity.image} 
                alt={activity.driver} 
                width={34} 
                height={34} 
                className="rounded-full object-cover border border-zinc-800 flex-shrink-0 h-8 w-8" 
              />
              <span className="font-semibold text-zinc-400 tracking-wide">
                {activity.time}
              </span>
            </div>

            {/* Driver Identity */}
            <div className="truncate font-bold text-zinc-100 tracking-wide">
              {activity.driver}
            </div>

            {/* Contextual Logs (Order ID & Branch Location) */}
            <div className="text-zinc-400 font-medium truncate flex items-center gap-2">
              <span className="text-zinc-500 font-semibold">{activity.orderId}</span>
              <span className="text-zinc-600 text-[10px]">•</span>
              <span>{activity.branch}</span>
            </div>

            {/* Component Status Pillar */}
            <div className="flex justify-end min-w-[100px]">
              <ActivityStatusBadge status={activity.status} color={activity.color} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}