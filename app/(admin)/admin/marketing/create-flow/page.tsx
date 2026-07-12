"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Upload, X, Zap, FileText } from "lucide-react";
import ToastNotification from "@/components/admin/ui/ToastNotification";
import SelectField from "@/components/admin/ui/SelectField";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import Toggle from "@/components/admin/ui/Toggle";
import UploadZone from "@/components/admin/Marketing/UploadZone";

export default function CreateAutomationFlowPage() {
  const router = useRouter();

  // Input Form Component Controlled States
  const [gender, setGender] = useState("");
  const [postCode, setPostCode] = useState("");
  const [marketingType, setMarketingType] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [flowActive, setFlowActive] = useState(true);

  // Dynamic Trigger Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerNotification = (fieldLabel: string, value: string) => {
    setToastMessage(`Workflow value configured: ${fieldLabel} assigned as "${value}"`);
  };

  return (
    <div className="flex-1 min-h-screen text-white select-none">
      {/* ── Top Header Bar ── */}
      <div className="flex items-start justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-lg bg-[#1c1c1e] border border-[#2e2e30]/60 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <h1 className="text-base font-bold text-zinc-100 tracking-wide">Create New Automation Flow</h1>
            <p className="text-[11px] text-zinc-500 font-medium mt-0.5">Configure your workflow metrics to auto dispatch customer logs.</p>
          </div>
        </div>

        {/* Dynamic Context Toast Placement */}
        {toastMessage && (
          <ToastNotification
            message={toastMessage} 
            onClose={() => setToastMessage(null)} 
          />
        )}
      </div>

      {/* ── Primary Main Form Card Wrapper ── */}
      <div className="mx-6 mb-6 bg-[#18181a] border border-[#2e2e30] rounded-2xl p-7 space-y-6">
        
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#2e2e30]/70">
          <div className="w-7 h-7 rounded-xl bg-[#f9671a]/10 flex items-center justify-center border border-[#f9671a]/10">
            <Zap size={13} className="text-[#f9671a]" />
          </div>
          <h2 className="text-sm font-bold text-zinc-100 tracking-wide">New Automation Flow Summary</h2>
        </div>

        {/* Row 1 Grid Selection Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <SelectField 
            label="Gender" 
            placeholder="Select Gender" 
            options={["All Demographics", "Male", "Female"]}
            value={gender}
            onChange={(val) => { setGender(val); triggerNotification("Gender", val); }}
          />
          <SelectField 
            label="Post Code" 
            placeholder="Select Area Sector" 
            options={["Eltham (EL01)", "Sidcup (SD02)", "Romford (RM01)"]}
            value={postCode}
            onChange={(val) => { setPostCode(val); triggerNotification("Post Code Zone", val); }}
          />
          <SelectField 
            label="Marketing Type" 
            placeholder="Select Type Channel" 
            options={["SMS Campaign", "Email Dispatcher", "In-App Push Banner"]}
            value={marketingType}
            onChange={(val) => { setMarketingType(val); triggerNotification("Marketing Type", val); }}
          />
        </div>

        {/* Row 2 Title Input Field & Target Operational Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5 items-start">
          <InputField
            label="Campaign Title" 
            placeholder="Enter descriptive campaign name" 
            value={campaignTitle}
            onChange={(val) => setCampaignTitle(val)}
          />
          <div className="flex flex-col gap-2 sm:min-w-[240px]">
            <label className="text-xs font-bold text-zinc-400 tracking-wide">Period</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="mm/dd/yy"
                className="w-full bg-[#1c1c1e] border border-[#2e2e30] rounded-xl pl-9 pr-4 py-3 text-xs font-semibold text-zinc-100 placeholder-zinc-600 outline-none focus:border-[#f9671a]/50 transition-all"
              />
            </div>
            <p className="text-[10px] text-zinc-500 font-medium">Select the activation date window parameters for this flow.</p>
          </div>
        </div>

        {/* Campaign Description Text Area Input Field */}
        <TextareaField
          label="Campaign Description Details"
          placeholder="Briefly describe the target objectives, pipeline logic constraints, and custom operational milestones..."
          rows={4}
          value={description}
          onChange={(val) => setDescription(val)}
        />

        {/* Refactored Image Upload Preview Zone */}
        <UploadZone file={attachedFile} onFileChange={setAttachedFile} />

        {/* Operational Flow Integration Status */}
        <div className="flex items-center gap-4 bg-[#1c1c1e] border border-[#2e2e30]/80 rounded-xl px-5 py-3.5">
          <span className="text-xs font-bold text-zinc-300 tracking-wide">Flow Integration Status:</span>
          <Toggle checked={flowActive} onChange={setFlowActive} />
          <span className={`text-xs font-bold tracking-wider uppercase transition-colors duration-200 ${
            flowActive ? "text-emerald-500" : "text-zinc-500"
          }`}>
            {flowActive ? "Active State" : "Inactive State"}
          </span>
        </div>
      </div>

      {/* ── Action Footer Submission Panel Buttons ── */}
      <div className="flex items-center justify-end gap-3 px-6 pb-8">
        <button
          onClick={() => router.back()}
          className="px-5 py-3 rounded-xl bg-[#1c1c1e] border border-[#2e2e30] text-zinc-400 hover:text-zinc-100 text-xs font-semibold tracking-wide transition-all"
        >
          Cancel
        </button>
        <button 
          // onClick={() => console.log("Submit Automation Flow Data", { gender, postCode, marketingType, campaignTitle, period, description, attachedFile, flowActive })}
          onClick={() =>triggerNotification("Submit Automation Flow Data","Submit Automation Flow Data")}
           
          className="px-6 py-3 rounded-xl bg-[#f9671a] text-white text-xs font-bold tracking-wide hover:bg-[#e05a15] transition-colors shadow-xl shadow-[#f9671a]/10"
        >
          Create Automation Flow
        </button>
      </div>
    </div>
  );
}