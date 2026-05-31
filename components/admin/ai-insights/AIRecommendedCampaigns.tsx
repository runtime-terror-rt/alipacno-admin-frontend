import React from "react";

interface Campaign {
  tag: string;
  tagColor: string; // Tailored specifically for the solid background pills
  title: string;
  sub: string;
  desc?: string;
  targetArea: string;
  estReach: string;
  estUpsell: string;
  isActive?: boolean; // To handle the special active border on the first card
}

const AI_CAMPAIGNS: Campaign[] = [
  {
    tag: "Recommended",
    tagColor: "bg-[#f9671a]/10 text-[#f9671a]",
    title: "Burger Combo Offer",
    sub: "Buy 1 Burger Combo",
    desc: "Get Free Fries",
    targetArea: "Downtown Ethan",
    estReach: "8,250 people",
    estUpsell: "8,250 people",
    isActive: true, // Matches the orange active border in the image
  },
  {
    tag: "High Impact",
    tagColor: "bg-purple-950/40 text-purple-400",
    title: "Weekend Pizza Deal",
    sub: "20% OFF on Large Pizza",
    targetArea: "All Area",
    estReach: "12,500 people",
    estUpsell: "8,250 people",
  },
  {
    tag: "Recover Customer",
    tagColor: "bg-blue-950/40 text-blue-400",
    title: "We Miss You Offer",
    sub: "15% OFF for inactive customers",
    targetArea: "Downtown Ethan",
    estReach: "8,250 people",
    estUpsell: "8,250 people",
  },
  {
    tag: "Loyalty Boost",
    tagColor: "bg-green-950/40 text-green-500",
    title: "VIP Loyalty Reward",
    sub: "Free Dessert on Silver Order",
    targetArea: "Downtown Ethan",
    estReach: "8,250 people",
    estUpsell: "8,250 people",
  },
];

const AIRecommendedCampaigns = () => {
  return (
    <div className="w-full p-8 text-font-sans">
      <div className="pb-6">
        <h2 className="text-lg font-semibold text-white tracking-wide">
          AI Recommended Campaigns
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {AI_CAMPAIGNS.map((c, i) => (
          <div
            key={i}
            // bg-[#1d1d22] 
            className={`rounded-2xl p-6 flex flex-col justify-between min-h-[240px] border transition-all duration-200 ${
              c.isActive
                ? "border-[#f9671a]"
                : "border-[#28282c] hover:border-zinc-700"
            }`}
          >
            {/* Top / Content Section */}
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-lg text-xs font-medium mb-5 ${c.tagColor}`}
              >
                {c.tag}
              </span>
              
              <h3 className="text-base font-medium text-zinc-100 tracking-tight">
                {c.title}
              </h3>
              <p className="text-xs text-zinc-500 mt-1.5 font-normal">
                {c.sub}
              </p>
              {c.desc && (
                <p className="text-xs text-zinc-500 mt-1 font-normal">
                  {c.desc}
                </p>
              )}
            </div>

            {/* Bottom Metrics Grid Row */}
            <div className="pt-4 mt-6 border-t border-zinc-800/60 grid grid-cols-3 gap-2">
              <div>
                <p className="text-[11px] text-zinc-600 block mb-1">Target Area</p>
                <p className="text-[11px] text-zinc-300 font-medium truncate">
                  {c.targetArea}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-600 block mb-1">Est. Reach</p>
                <p className="text-[11px] text-zinc-300 font-medium whitespace-nowrap">
                  {c.estReach}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-600 block mb-1">Est. Upsell</p>
                <p className="text-[11px] text-zinc-300 font-medium whitespace-nowrap">
                  {c.estUpsell}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendedCampaigns;