"use client";

import { useState } from "react";
import { 
  Clock, 
  MapPin, 
  Check, 
  AlertTriangle,
  Play,
  Truck,
  PhoneCall,
  UserCheck
} from "lucide-react";
import { INITIAL_ORDERS, Order, ORDER_KDS_STATS } from "./data";

export default function OrdersKanbanPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Kanban Column Definitions
  const COLUMNS = [
    { key: "new", label: "New Orders", buttonText: "Start Preparing", color: "bg-orange-500 hover:bg-orange-600 text-white" },
    { key: "kitchen", label: "In Kitchen", buttonText: "Mark as Ready", color: "bg-emerald-500 hover:bg-emerald-600 text-white" },
    { key: "ready", label: "Ready for dispatch", buttonText: "Assign Driver", color: "bg-blue-500 hover:bg-blue-600 text-white" },
    { key: "delivery", label: "Out for delivery", buttonText: "Call Rider", color: "bg-emerald-500 hover:bg-emerald-600 text-white" },
    { key: "completed", label: "Completed", buttonText: null, color: "" }
  ];

  // Move order to the next KDS stage
  const handleNextStage = (orderId: string, currentStatus: Order["status"]) => {
    let nextStatus: Order["status"] = currentStatus;
    if (currentStatus === "new") nextStatus = "kitchen";
    else if (currentStatus === "kitchen") nextStatus = "ready";
    else if (currentStatus === "ready") nextStatus = "delivery";
    else if (currentStatus === "delivery") nextStatus = "completed";

    setOrders(
      orders.map(order => 
        order.id === orderId 
          ? { ...order, status: nextStatus, timer: "0:00" } 
          : order
      )
    );
  };

  // Helper to determine Dine In/Collection/Delivery styles
  const getTypeBadgeStyles = (type: Order["type"]) => {
    switch (type) {
      case "Dine In":
        return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
      case "Collection":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Delivery":
        return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      
      {/* Top Banner Stats */}
      <div className="w-full bg-[#121214] border border-zinc-800/80 rounded-2xl p-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-zinc-300">
        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2.5 animate-pulse" />
          <span>Avg Prep: </span>
          <span className="text-emerald-500 ml-1.5">{ORDER_KDS_STATS.avgPrep}</span>
        </div>
        
        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-white mr-2.5" />
          <span>Active: </span>
          <span className="text-white ml-1.5">{ORDER_KDS_STATS.active}</span>
        </div>

        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-amber-500 mr-2.5 animate-pulse" />
          <span>Delayed: </span>
          <span className="text-amber-500 ml-1.5">{ORDER_KDS_STATS.delayed}</span>
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4.5 items-start">
        {COLUMNS.map((col) => {
          const colOrders = orders.filter(o => o.status === col.key);
          return (
            <div 
              key={col.key} 
              className="bg-[#121214]/65 border border-zinc-850 rounded-2xl p-3.5 space-y-4 min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex justify-between items-center pb-2.5 border-b border-zinc-850">
                <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">{col.label}</span>
                <span className="h-6 w-6 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-black text-zinc-400 flex items-center justify-center">
                  {colOrders.length}
                </span>
              </div>

              {/* Column Orders list */}
              <div className="space-y-3.5">
                {colOrders.map((order) => {
                  // If timer is > 10 mins, mark red (delayed)
                  const minutes = parseInt(order.timer.split(":")[0]);
                  const isDelayed = minutes >= 10;
                  
                  return (
                    <div 
                      key={order.id} 
                      className="bg-zinc-900/90 border border-zinc-850 hover:border-zinc-700/80 transition-all rounded-xl p-3.5 space-y-3.5"
                    >
                      {/* Card Header */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-black text-white">{order.id}</span>
                          <span className="text-[10px] text-zinc-500 font-bold">{order.time}</span>
                        </div>

                        {/* Ticking Timer Badge */}
                        <div className={`
                          flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[10px] font-black tracking-wide border
                          ${isDelayed 
                            ? "bg-red-500/10 text-red-400 border-red-500/20" 
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }
                        `}>
                          <Clock className="h-3 w-3" />
                          <span>{order.timer}</span>
                        </div>
                      </div>

                      {/* Order Type Badge */}
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${getTypeBadgeStyles(order.type)}`}>
                        {order.type}
                      </span>

                      {/* Order Items */}
                      <div className="space-y-2 border-t border-b border-zinc-800/40 py-2.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-xs">
                            <div className="flex items-start">
                              <span className="text-orange-500 font-black mr-1.5">{item.quantity}x</span>
                              <span className="text-white font-extrabold leading-tight">{item.name}</span>
                            </div>
                            
                            {item.options && (
                              <ul className="text-[10px] text-zinc-500 list-disc list-inside mt-0.5 ml-4.5 space-y-0.5 font-bold">
                                {item.options.map((opt, oIdx) => (
                                  <li key={oIdx}>{opt}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Allergy or Customer Notes */}
                      {order.note && (
                        <div className="bg-orange-500/5 border border-orange-500/10 p-2.5 rounded-lg text-[9px] font-extrabold text-orange-400 leading-normal">
                          {order.note}
                        </div>
                      )}

                      {/* Column Action Trigger button */}
                      {col.buttonText && (
                        <button
                          onClick={() => handleNextStage(order.id, order.status)}
                          className={`w-full py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${col.color}`}
                        >
                          {col.key === "new" && <Play className="h-3 w-3" />}
                          {col.key === "kitchen" && <Check className="h-3 w-3 stroke-[3px]" />}
                          {col.key === "ready" && <UserCheck className="h-3 w-3" />}
                          {col.key === "delivery" && <PhoneCall className="h-3 w-3" />}
                          <span>{col.buttonText}</span>
                        </button>
                      )}
                    </div>
                  );
                })}

                {colOrders.length === 0 && (
                  <div className="h-36 border border-dashed border-zinc-800/60 rounded-2xl flex flex-col items-center justify-center text-center p-4">
                    <span className="text-[10px] font-bold text-zinc-650 uppercase tracking-widest">No Active Orders</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
