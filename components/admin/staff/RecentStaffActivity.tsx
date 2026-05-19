interface RecentActivity {
  time: string;
  description: string;
  branch: string;
  tag: string;
  color: string;
  avatar: string;
}

// Mock data typed out exactly from your provided UI snippet
const RECENT_ACTIVITIES : RecentActivity[] = [
  {
    time: "08:00 AM",
    description: "Alex Rider clocked in",
    branch: "Eltham (EL01)",
    tag: "Manager",
    color: "#e67e22", // Orange
    avatar: "/admin/avatar/default.png", // Replace with your actual user image path
  },
  {
    time: "08:05 AM",
    description: "Alex Rider clocked in",
    branch: "Sidcup (SD02)",
    tag: "Driver",
    color: "#2ecc71", // Green
    avatar: "/admin/avatar/default.png",
  },
  {
    time: "12:15 PM",
    description: "Cody Fisher on break",
    branch: "Romford (RM1)",
    tag: "Kitchen",
    color: "#7f8c8d", // Gray
    avatar: "/admin/avatar/default.png",
  },
  {
    time: "02:35 PM",
    description: "Smith overtime approved",
    branch: "Eltham (EL01)",
    tag: "On Delivery",
    color: "#f1c40f", // Yellow
    avatar: "/admin/avatar/default.png",
  },
  {
    time: "08:00 AM",
    description: "Lane completed shift",
    branch: "Eltham (EL01)",
    tag: "Shift Started",
    color: "#9b5de5", // Purple
    avatar: "/admin/avatar/default.png",
  },
];

const RecentStaffActivity = () => {
  return (
    <div className="bg-[#18181a] border border-[#2e2e30] rounded-2xl p-6 select-none max-w-4xl w-full">
      <h3 className="text-sm font-semibold text-zinc-100 mb-5">
        Recent Staff Activity
      </h3>
      
      <div className="flex flex-col gap-4">
        {RECENT_ACTIVITIES.map((activity, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[auto_auto_1fr_1fr_auto] items-center gap-x-6 text-xs text-zinc-200"
          >
            {/* Status Indicator Dot with white border ring */}
            <div className="flex items-center justify-center">
              <div 
                className="w-4 h-4 rounded-full border-2 border-[#18181a]" 
                style={{ backgroundColor: activity.color }}
              />
            </div>

            {/* Profile Picture & Timestamp */}
            <div className="flex items-center gap-3 min-w-[100px]">
              <img 
                src={activity.avatar} 
                alt="Staff Avatar" 
                className="w-9 h-9 rounded-full object-cover border border-zinc-700 flex-shrink-0"
              />
              <span className="font-semibold text-zinc-100 tracking-wide">
                {activity.time}
              </span>
            </div>

            {/* Event Log Description */}
            <div className="truncate text-zinc-300 font-medium">
              {activity.description}
            </div>

            {/* Location Branch Tag */}
            <div className="text-zinc-400 font-medium truncate">
              {activity.branch}
            </div>

            {/* Status Pill Badge */}
            <div className="flex justify-end min-w-[100px]">
              <span 
                className="px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-center border w-28 block truncate"
                style={{ 
                  borderColor: activity.color, 
                  color: activity.color,
                  backgroundColor: `${activity.color}0a` // 4% opacity background match
                }}
              >
                {activity.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentStaffActivity;