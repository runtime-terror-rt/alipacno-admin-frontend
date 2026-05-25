import { Bot, Brain, Zap } from 'lucide-react';
import Image from 'next/image';

const AISuggestionBanner = () => {
  return (
    <div className="relative bg-[#050505] border border-primary/80 rounded-2xl p-12 overflow-hidden ">
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#f9671a]/15 blur-xl pointer-events-none" />
      <div className="absolute right-6 top-1/2 -translate-y-1/2">
        <Image src="/admin/ai/ai-suggestion.png" alt="AI Suggestion" width={400} height={400} className="w-40 h-40 rounded-full object-cover" />
      </div>
      <div className="relative pr-20">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] flex gap-2 text-center items-center text-[#626262] font-bold uppercase tracking-wider">
            <Bot size={18} className="text-[#626262]" />
             AI Suggestion
          </span>
        </div>
        <p className="text-xl font-bold text-white">Burger Combo Deluxe demand increased 28% in Downtown area.</p>
        <p className="text-xs text-zinc-400 mt-1.5">
          <span className="text-[#f9671a] "> Recommendation:</span>  Run “Buy 1 Get 
          <span className="text-[#f9671a] "> Free Fries </span>
            ” campaign between 6PM–9PM 
        </p>
      </div>
    </div>
  )
}

export default AISuggestionBanner
