import React from 'react';
import { 
  Boxes, 
  Wallet, 
  Clock, 
  Star, 
  AlertTriangle, 
  Users2, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';

const DriversBottomStats = () => {
  const stats = [
    {
      label: "Total Deliveries",
      value: "1.642",
      icon: <Boxes className="w-4 h-4 text-[#e67e22]" />,
      change: "12.3%",
      isPositive: true,
    },
    {
      label: "Avg Earnings Per Driver",
      value: "£64.2",
      icon: <Wallet className="w-4 h-4 text-[#e67e22]" />,
      change: "8.3%",
      isPositive: true,
    },
    {
      label: "Avg Delivery Time",
      value: "28.6 Mins",
      icon: <Clock className="w-4 h-4 text-[#e67e22]" />,
      change: "6.3%",
      isPositive: false, // Green down arrow implies improvement in time
    },
    {
      label: "Top Rated Driver",
      value: "Alex Rider",
      rating: "4.9",
      subtext: "24 Deliveries",
      icon: <Star className="w-4 h-4 text-[#e67e22]" />,
      isDriverCard: true,
    },
    {
      label: "Delayed Orders",
      value: "7",
      icon: <AlertTriangle className="w-4 h-4 text-[#e67e22]" />,
      change: "6.3%",
      isPositive: false, // Green down arrow implies improvement in delays
    },
    {
      label: "Available Riders",
      value: "48",
      icon: <Users2 className="w-4 h-4 text-[#e67e22]" />,
      change: "4.3%",
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 mt-6 md:grid-cols-3 lg:grid-cols-6 gap-y-4 items-center bg-[#18181a] p-4 rounded-xl border border-[#2e2e30] select-none">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex items-start gap-2.5 px-3 w-full ${
            index !== 0 ? "lg:border-l lg:border-[#2e2e30]" : ""
          }`}
        >
          {/* Icon Container */}
          <div className="mt-0.5 flex-shrink-0">{stat.icon}</div>

          {/* Content Container */}
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-medium text-zinc-400 truncate tracking-wide">
              {stat.label}
            </span>

            {stat.isDriverCard ? (
              /* Unique layout for Top Rated Driver */
              <div className="flex flex-col mt-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-zinc-100 truncate">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-medium text-zinc-400">
                    ({stat.rating})
                  </span>
                  <Star className="w-3 h-3 fill-[#e67e22] text-[#e67e22] flex-shrink-0" />
                </div>
                <span className="text-[10px] text-zinc-500 mt-0.5">
                  {stat.subtext}
                </span>
              </div>
            ) : (
              /* Standard Metric Layout */
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-zinc-100">
                  {stat.value}
                </span>
                {stat.change && (
                  <span className="flex items-center text-[10px] font-semibold text-emerald-500">
                    {stat.isPositive ? (
                      <ArrowUp className="w-2.5 h-2.5 mr-0.5 stroke-[3]" />
                    ) : (
                      <ArrowDown className="w-2.5 h-2.5 mr-0.5 stroke-[3]" />
                    )}
                    {stat.change}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DriversBottomStats;