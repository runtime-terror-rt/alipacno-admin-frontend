"use client";

import { useState } from "react";
import {
  Clock,
  Utensils,
  Flame,
  Layers,
  Wine,
  IceCream,
  Play,
  Check,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
} from "lucide-react";
import { INITIAL_KDS_ORDERS, KDS_STATIONS, KDSOrder } from "./data";
import { ORDER_KDS_STATS } from "../orders/data";

export default function KDSPage() {
  const [activeStation, setActiveStation] = useState("all");
  const [orders, setOrders] = useState<KDSOrder[]>(INITIAL_KDS_ORDERS);

  // KDS Column definitions
  const KDS_COLUMNS = [
    {
      key: "new",
      label: "New Orders",
      buttonText: "Start Preparing",
      color: "bg-[#EA580C] hover:bg-orange-600 text-white",
    },
    {
      key: "preparing",
      label: "Preparing",
      buttonText: "Mark as Ready",
      color: "bg-[#00A706] hover:bg-emerald-600 text-white",
    },
    {
      key: "delayed",
      label: "Delayed:",
      buttonText: "Complete",
      color:
        "bg-[#6B7280] hover:bg-zinc-750 text-zinc-300 border border-zinc-700",
    },
  ];

  // Helper station icons
  const getStationIcon = (stationId: string) => {
    switch (stationId) {
      case "all":
        return Layers;
      case "grill":
        return Flame;
      case "fryer":
        return Utensils;
      case "drinks":
        return Wine;
      case "dessert":
        return IceCream;
      default:
        return Layers;
    }
  };

  // State transitions
  const handleStageTransition = (
    orderId: string,
    currentStatus: KDSOrder["status"],
  ) => {
    if (currentStatus === "new") {
      setOrders(
        orders.map((o) =>
          o.id === orderId ? { ...o, status: "preparing" } : o,
        ),
      );
    } else if (currentStatus === "preparing") {
      setOrders(
        orders.map((o) =>
          o.id === orderId ? { ...o, status: "delayed", timer: "20:00" } : o,
        ),
      );
    } else {
      // Completed, remove from active display
      setOrders(orders.filter((o) => o.id !== orderId));
    }
  };

  // Filter orders by active station tab selection
  const filteredOrders = orders.filter((order) => {
    if (activeStation === "all") return true;
    return order.station.toLowerCase() === activeStation;
  });

    const getTypeBadgeStyles = (type: KDSOrder["type"]) => {
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
      <div className="w-full bg-[#15803D1A] border border-[#15803D4D] rounded-2xl p-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-zinc-300">
        <div className="flex items-center text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2.5 animate-pulse" />
          <span className="text-[#22C55E]">Avg Prep: </span>
          <span className="text-[#22C55E] ml-1.5">
            {ORDER_KDS_STATS.avgPrep}
          </span>
        </div>

        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-white mr-2.5" />
          <span>Active: </span>
          <span className="text-white ml-1.5">{ORDER_KDS_STATS.active}</span>
        </div>

        <div className="flex items-center text-sm">
          <span className="h-2 w-2 rounded-full bg-amber-500 mr-2.5 animate-pulse" />
          <span className="text-[#F59E0B]">Delayed: </span>
          <span className="text-[#F59E0B] ml-1.5">
            {ORDER_KDS_STATS.delayed}
          </span>
        </div>
      </div>

      {/* Station Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {KDS_STATIONS.map((station) => {
          const Icon = getStationIcon(station.id);
          const isActive = activeStation === station.id;
          return (
            <button
              key={station.id}
              onClick={() => setActiveStation(station.id)}
              className={`
                px-4.5 py-2.5 rounded-full text-xs font-black transition-all flex items-center space-x-2 border cursor-pointer
                ${
                  isActive
                    ? "bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-500/10"
                    : "bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-100"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span>{station.label}</span>
              <span
                className={`
                h-5 px-1.5 rounded-full text-[10px] font-black flex items-center justify-center
                ${isActive ? "bg-white/20 text-white" : "bg-zinc-150 text-zinc-650"}
              `}
              >
                {station.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* KDS Stage Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {KDS_COLUMNS.map((col) => {
          const colOrders = filteredOrders.filter((o) => o.status === col.key);
          return (
            <div 
              key={col.key} 
              className=" rounded-2xl space-y-4.5 min-h-125"

            >
              {/* Column Header */}
              <div className="flex justify-between border border-[#343435] items-center p-3 rounded-t-xl bg-[#1A1A1C] ">
                <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  {col.label}
                </span>
                <span className="h-6 w-6 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-black text-zinc-400 flex items-center justify-center">
                  {colOrders.length}
                </span>
              </div>

              {/* Orders in Column */}
              <div className="space-y-4">
                {colOrders.map((order) => {
                  const isDelayedCol = order.status === "delayed";
                  return (
                    <div
                      key={order.id}
                      className="bg-[#2D2D30] border border-[#343435] hover:border-zinc-700/80 transition-all rounded-xl p-4 space-y-4"
                    >
                      {/* Top Header */}
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-1 items-center space-x-2">
                          <span className="text-lg font-black text-white">
                            {order.id}
                          </span>
                          {/* Order Type Badge */}
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-xs font-extrabold uppercase ${getTypeBadgeStyles(order.type)}`}
                          >
                            {order.type}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="text-xs text-zinc-500 font-bold">
                            {order.time}
                          </div>
                          {/* Ticking Timer Badge */}
                          <div
                            className={`
                          flex items-center space-x-1 px-2 py-0.5 rounded-lg text-sm font-black tracking-wide border
                          ${
                            isDelayedCol
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }
                        `}
                          >
                            <Clock className="h-3 w-3" />
                            <span>{order.timer}</span>
                          </div>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="space-y-2 border-t border-b border-[#343435] py-2.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm bg-[#1E1E20] p-2">
                            <div className="flex items-start">
                              <span className="text-[#EA580C] font-black mr-2">
                                {item.quantity}x
                              </span>
                              <span className="text-white font-extrabold leading-tight">
                                {item.name}
                              </span>
                            </div>
                            {item.options && (
                              <ul className="text-[10px] text-zinc-500 list-disc list-inside mt-1 ml-5 space-y-0.5 font-bold">
                                {item.options.map((opt, oIdx) => (
                                  <li key={oIdx}>{opt}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Allergy/Customer Notes */}
                      {order.note && (
                        <div className="bg-orange-500/5 border border-orange-500/15 p-2.5 rounded-lg text-[9px] font-extrabold text-orange-400">
                          {order.note}
                        </div>
                      )}

                      {/* Customer Notified green banner */}
                      {order.notified && (
                        <div className="bg-emerald-500/5 border border-emerald-500/15 p-2.5 rounded-lg text-[9px] font-black text-emerald-400 flex items-center space-x-1.5">
                          <Smartphone className="h-3.5 w-3.5 text-emerald-450" />
                          <span>Customer notified</span>
                        </div>
                      )}

                      {/* Column Stage Buttons */}
                      <button
                        onClick={() =>
                          handleStageTransition(order.id, order.status)
                        }
                        className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${col.color}`}
                      >
                        {col.key === "new" && <Play className="h-3.5 w-3.5" />}
                        {col.key === "preparing" && (
                          <Check className="h-3.5 w-3.5 stroke-[3px]" />
                        )}
                        {col.key === "delayed" && (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                        <span>{col.buttonText}</span>
                      </button>
                    </div>
                  );
                })}

                {colOrders.length === 0 && (
                  <div className="h-36 border border-dashed border-zinc-800/60 rounded-2xl flex flex-col items-center justify-center text-center p-4">
                    <span className="text-[10px] font-bold text-zinc-650 uppercase tracking-widest">
                      No Active Work
                    </span>
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
