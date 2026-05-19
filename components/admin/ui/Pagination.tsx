import { ChevronDown,  ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
     <div className="flex flex-wrap items-center space-y-4 justify-between mt-4 pt-4 border-t border-zinc-800">
               <div className="flex flex-wrap space-y-2 w-full max-w-max items-center gap-4">
                 <p className="text-xs text-zinc-500">Showing 1 to 10 of 50 results</p>
                 <div className="flex items-center gap-2">
                  <button className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-lg bg-[#2A2A2C] text-zinc-400 hover:text-white transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
    
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button
                      key={p}
                      className={`cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${p === 1 ? "border border-primary text-primary" : "border border-zinc-600 text-zinc-400 hover:text-white"}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-lg bg-[#2A2A2C] text-zinc-400 hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                 </div>
               </div>
                <div className="flex items-center gap-1.5">

                  <div className="ml-2 flex items-center gap-1">
                    <button className="flex items-center gap-1 px-3 py-2.5 rounded-lg bg-[#1e1e1e] cursor-pointer text-zinc-400 text-xs hover:text-white transition-colors">
                      5/page <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
  );
}