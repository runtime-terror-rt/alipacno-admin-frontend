import { CheckCircle, Goal, Mail, MessageSquare, Plus, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AutomationFlow() {
  const router = useRouter()
  const steps = [
    { icon: <Goal  size={20} className="" />, label: "CUSTOMER TRIGGER" },
    { icon: <Mail size={20} className="" />, label: "EMAIL SEGMENT" },
    { icon: <MessageSquare size={20} className="" />, label: "A/B OFFER SPLIT" },
    { icon: <CheckCircle size={20} className="" />, label: "CONVERSION TAG" },
  ];

  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg bg-yellow-500/15 flex items-center justify-center">
              <Zap size={12} className="text-yellow-400" />
            </div>
            <h2 className="text-sm font-bold text-white">Marketing Automation Flow</h2>
          </div>
          <p className="text-xs text-zinc-500">Automate offers, follow-up emails, and connect your marketing tools seamlessly.</p>
        </div>
        <button onClick={()=>router.push('/admin/marketing/create-flow')} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f9671a] text-white text-sm font-medium hover:bg-[#e05a15] transition-colors whitespace-nowrap">
          <Plus size={14} /> Create New Flow
        </button>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 bg-[#F9671A1A] py-4 rounded-xl">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${i === 0 ? "border-[#f9671a] bg-[#f9671a]" : "border-[#FFFFFF33]  bg-[#D3E4FE33]"}`}>
                {step.icon}
              </div>
              <span className={`text-[10px] font-bold tracking-wider text-center text-white`}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-1 h-0.5 bg-gradient-to-r from-[#f9671a]/50 to-[#2e2e30]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
