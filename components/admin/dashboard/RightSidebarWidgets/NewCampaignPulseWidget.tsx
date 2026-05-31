import Image from "next/image";

export default function NewCampaignPulseWidget() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#343436] bg-[#1A1A1ACC] min-w-0">
      {/* Image */}
      <Image
        src="/admin/dashboard/campaign-pulse.png"
        alt="Campaign Pulse"
        width={400}
        height={480}
        className="w-full h-auto object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#20161645] to-[#191C1D] " />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <p className="text-white font-semibold text-md">
          New Campaign Pulse
        </p>

        <button className="text-[#F9671A] text-sm font-semibold tracking-widest underline underline-offset-4 uppercase mt-2">
          VIEW ANALYTICS
        </button>
      </div>
    </div>
  );
}