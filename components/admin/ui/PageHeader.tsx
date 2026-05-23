"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeader({
    title = "HQ Overview",
    subtitle = "All branches · Real-time performance",
    backButton = false
  }: {
    title?: string;
    subtitle?: string;
    backButton?: boolean;
}) {

  const router = useRouter();
  return (
    <div className="flex flex-col gap-1">
     
      <h1 className="text-lg font-bold text-white flex gap-2 text-center items-center">
        
        {
        backButton && (<button
        onClick={()=>router.back()}
        className="w-7 h-7   rounded-lg bg-[#252527] flex items-center justify-center text-[#FFF7F3] hover:text-white">
          <ChevronLeft size={14} className="text-primary" />
        </button>
        )
      }

         {title}</h1>
      <p className="text-[#626262] text-[14px]">
        {subtitle}
      </p>
    </div>
  );
}