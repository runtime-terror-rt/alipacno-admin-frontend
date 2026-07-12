"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Image as ImageIcon,
    Video,
    ListVideo,
    UploadCloud,
    Maximize2,
    Ratio,
    HardDrive,
    FileType,
    MapPin,
    Layers,
    MonitorPlay,
    Clock,
    FileText,
    CheckCircle2,
    Calendar,
    Monitor,
    Send,
} from "lucide-react";
import InputField from "@/components/admin/ui/InputField";
import SelectField from "@/components/admin/ui/SelectField";
import TextareaField from "@/components/admin/ui/TextareaField";

// ── Reusable primitives (theme-matched) ─────────────────────────────────
interface FieldProps {
    label: string;
    children: ReactNode;
}

function Field({ label, children }: FieldProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xs font-bold text-zinc-400 tracking-wide">{label}</label>
            {children}
        </div>
    );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full bg-[#1c1c1e] border border-[#2e2e30] rounded-xl px-4 py-3 text-xs font-semibold text-zinc-100 placeholder-zinc-600 outline-none focus:border-[#f9671a]/50 transition-all"
        />
    );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className="w-full bg-[#1c1c1e] border border-[#2e2e30] rounded-xl px-4 py-3 text-xs font-semibold text-zinc-100 placeholder-zinc-600 outline-none focus:border-[#f9671a]/50 transition-all resize-none leading-relaxed"
        />
    );
}

interface RadioPillProps {
    label: string;
    icon?: ReactNode;
    checked: boolean;
    onClick: () => void;
}

function RadioPill({ label, icon, checked, onClick }: RadioPillProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide border transition-all ${checked
                    ? "bg-[#f9671a]/10 border-[#f9671a]/30 text-[#f9671a]"
                    : "bg-[#1c1c1e] border-[#2e2e30] text-zinc-400 hover:text-zinc-200"
                }`}
        >
            <span
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${checked ? "border-[#f9671a]" : "border-zinc-600"
                    }`}
            >
                {checked && <span className="w-1.5 h-1.5 rounded-full bg-[#f9671a]" />}
            </span>
            {icon}
            {label}
        </button>
    );
}

interface RadioProps {
    label: string;
    sub?: string;
    checked: boolean;
    onClick: () => void;
}

function Radio({ label, sub, checked, onClick }: RadioProps) {
    return (
        <button type="button" onClick={onClick} className="flex items-start gap-2.5 text-left">
            <span
                className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "border-[#f9671a]" : "border-zinc-700"
                    }`}
            >
                {checked && <span className="w-2 h-2 rounded-full bg-[#f9671a]" />}
            </span>
            <span>
                <p className={`text-xs font-bold tracking-wide ${checked ? "text-zinc-100" : "text-zinc-400"}`}>{label}</p>
                {sub && <p className="text-[10px] text-zinc-500 font-medium mt-0.5">{sub}</p>}
            </span>
        </button>
    );
}

interface CheckboxProps {
    label: string;
    checked: boolean;
    onClick: () => void;
}

function Checkbox({ label, checked, onClick }: CheckboxProps) {
    return (
        <label className="flex items-center gap-2.5 py-1.5 cursor-pointer select-none">
            <button
                type="button"
                onClick={onClick}
                className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "bg-[#f9671a] border-[#f9671a]" : "border-zinc-700 bg-[#1c1c1e]"
                    }`}
            >
                {checked && <CheckCircle2 size={11} className="text-white" strokeWidth={3} />}
            </button>
            <span className={`text-xs font-semibold ${checked ? "text-zinc-100" : "text-zinc-400"}`}>{label}</span>
        </label>
    );
}

interface ReviewRowProps {
    icon: ReactNode;
    label: string;
    value: ReactNode;
    valueClass?: string;
}

function ReviewRow({ icon, label, value, valueClass = "text-zinc-200" }: ReviewRowProps) {
    return (
        <div className="flex items-start justify-between gap-3 py-2.5 border-b border-[#2e2e30]/70 last:border-0">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 flex-shrink-0 tracking-wide">
                {icon}
                {label}
            </span>
            <span className={`text-[11px] font-bold text-right ${valueClass}`}>{value}</span>
        </div>
    );
}

function SectionHeader({ icon, title }: { icon: ReactNode; title: string }) {
    return (
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#2e2e30]/70">
            <div className="w-7 h-7 rounded-xl bg-[#f9671a]/10 flex items-center justify-center border border-[#f9671a]/10">
                {icon}
            </div>
            <h2 className="text-sm font-bold text-zinc-100 tracking-wide">{title}</h2>
        </div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────
const BRANCHES = [
    "All Branch",
    "Downtown Branch",
    "All Uptown Branch",
    "Airport Road Branch",
    "Eltham Branch",
    "Richmond Branch",
];

export default function SignageContentForm() {
    const router = useRouter();
    const [contentType, setContentType] = useState("Image");
    const [displayType, setDisplayType] = useState("Schedule later");
    const [recurrence, setRecurrence] = useState("Daily");
    const [selectedBranches, setSelectedBranches] = useState(["Downtown Branch", "Eltham Branch", "Richmond Branch"]);
    const [contentName, setContentName] = useState("Summer Burger Promo 2026");
    const [title, setTitle] = useState("Summer Burger Promotion");
    const [description, setDescription] = useState("Buy 1 get 1 free burger combo, limited time offer!");
    const [campaignTag, setCampaignTag] = useState("Summer Offer");

    const toggleBranch = (b: string) =>
        setSelectedBranches((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

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
                        <h1 className="text-base font-bold text-zinc-100 tracking-wide">Add New Signage Content</h1>
                        <p className="text-[11px] text-zinc-500 font-medium mt-0.5">Upload and schedule content across your digital screens.</p>
                    </div>
                </div>
            </div>

            {/* ── Primary Main Form Card ── */}
            <div className="mx-6 mb-6 bg-[#18181a] border border-[#2e2e30] rounded-2xl p-7 space-y-6">

                {/* Content Information */}
                <SectionHeader icon={<FileText size={13} className="text-[#f9671a]" />} title="Content Information" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                        label="Content Name"
                        placeholder="Enter content name"
                        value={contentName}
                        onChange={(val) => setContentName(val)}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-400 tracking-wide">Content Type</label>
                        <div className="flex items-center gap-2 flex-wrap pt-1">
                            <RadioPill
                                label="Image"
                                icon={<ImageIcon size={12} />}
                                checked={contentType === "Image"}
                                onClick={() => setContentType("Image")}
                            />
                            <RadioPill
                                label="Video"
                                icon={<Video size={12} />}
                                checked={contentType === "Video"}
                                onClick={() => setContentType("Video")}
                            />
                            <RadioPill
                                label="Playlist"
                                icon={<ListVideo size={12} />}
                                checked={contentType === "Playlist"}
                                onClick={() => setContentType("Playlist")}
                            />
                        </div>
                    </div>
                </div>

                {/* Upload Zone */}
                <div className="flex flex-col gap-2 select-none">
                    <label className="text-xs font-bold text-zinc-400 tracking-wide">Upload Content</label>
                    <div className="border border-dashed border-[#2e2e30] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 bg-[#1c1c1e] hover:border-[#f9671a]/40 hover:bg-[#f9671a]/5 transition-all cursor-pointer">
                        <div className="flex flex-col items-center justify-center text-center gap-1.5 flex-1 py-3">
                            <div className="w-11 h-11 rounded-xl bg-[#262629] flex items-center justify-center">
                                <UploadCloud size={18} className="text-zinc-400" />
                            </div>
                            <p className="text-xs text-zinc-300 font-medium">
                                <span className="text-[#f9671a] hover:underline">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-[10px] text-zinc-500 font-medium">JPG, PNG, MP4 · Max Size: 100 MB</p>
                        </div>

                        <div className="flex items-center gap-4 flex-1 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-[#2e2e30] pt-4 sm:pt-0 sm:pl-5">
                            <div className="w-20 h-14 rounded-lg flex-shrink-0 overflow-hidden relative bg-gradient-to-br from-[#f9671a] via-red-600 to-yellow-500">
                                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black tracking-tight text-white/90 text-center leading-tight px-1">
                                    BUNHY BUGER
                                </span>
                            </div>
                            <div className="text-[11px] space-y-1 min-w-0">
                                <div className="flex justify-between gap-3">
                                    <span className="text-zinc-500 font-medium">File Name</span>
                                    <span className="text-zinc-200 font-semibold truncate">burger_promo_2026.jpg</span>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <span className="text-zinc-500 font-medium">File Size</span>
                                    <span className="text-zinc-200 font-semibold">2.4 MB</span>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <span className="text-zinc-500 font-medium">Resolution</span>
                                    <span className="text-zinc-200 font-semibold">1920 × 1080</span>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <span className="text-zinc-500 font-medium">Dimensions</span>
                                    <span className="text-zinc-200 font-semibold">16:9</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Details */}
                <div className="pt-5 border-t border-[#2e2e30]/70">
                    <div className="flex items-center gap-2.5 pb-3">
                        <div className="w-7 h-7 rounded-xl bg-[#f9671a]/10 flex items-center justify-center border border-[#f9671a]/10">
                            <FileText size={13} className="text-[#f9671a]" />
                        </div>
                        <h2 className="text-sm font-bold text-zinc-100 tracking-wide">Content Details</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField
                            label="Title"
                            placeholder="Enter content title"
                            value={title}
                            onChange={(val) => setTitle(val)}
                        />
                        <SelectField
                            label="Campaign Tag"
                            placeholder="Select Campaign Tag"
                            options={["Summer Offer", "Winter Special", "New Launch"]}
                            value={campaignTag}
                            onChange={setCampaignTag}
                        />
                    </div>
                    <div className="mt-5">
                        <TextareaField
                            label="Description"
                            placeholder="Briefly describe the content details..."
                            rows={2}
                            value={description}
                            onChange={(val) => setDescription(val)}
                        />
                    </div>
                </div>

                {/* Screen Preview */}
                <div className="pt-5 border-t border-[#2e2e30]/70">
                    <div className="flex items-center gap-2.5 pb-3">
                        <div className="w-7 h-7 rounded-xl bg-[#f9671a]/10 flex items-center justify-center border border-[#f9671a]/10">
                            <Monitor size={13} className="text-[#f9671a]" />
                        </div>
                        <h2 className="text-sm font-bold text-zinc-100 tracking-wide">Screen Preview</h2>
                    </div>
                    <div className="rounded-xl overflow-hidden relative h-40 bg-gradient-to-br from-[#2e2e30] via-[#f9671a]/20 to-red-900/30 border border-[#2e2e30]">
                        <div className="absolute inset-0 flex flex-col justify-between p-3">
                            <span className="text-[9px] font-semibold text-[#f9671a] tracking-wide">RESTAURANT · BUNHY BUGER</span>
                            <div>
                                <p className="text-xl font-black text-white leading-none">BUNHY<br />BUGER</p>
                                <span className="inline-block mt-1 text-[9px] font-bold bg-[#f9671a] text-white px-1.5 py-0.5 rounded">
                                    50% OFF
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 bg-[#1c1c1e] border border-[#2e2e30] rounded-xl px-4 py-2">
                        <ReviewRow icon={<Maximize2 size={12} />} label="Resolution" value="1920 × 1080 16:9" />
                        <ReviewRow icon={<Ratio size={12} />} label="Aspect Ratio" value="16:9" />
                        <ReviewRow icon={<HardDrive size={12} />} label="File Size" value="2.4 MB" />
                        <ReviewRow icon={<FileType size={12} />} label="Type" value="burger_promo_2026.jpg" />
                    </div>
                </div>

                {/* Screen Assignment */}
                <div className="pt-5 border-t border-[#2e2e30]/70">
                    <div className="flex items-center gap-2.5 pb-3">
                        <div className="w-7 h-7 rounded-xl bg-[#f9671a]/10 flex items-center justify-center border border-[#f9671a]/10">
                            <MonitorPlay size={13} className="text-[#f9671a]" />
                        </div>
                        <h2 className="text-sm font-bold text-zinc-100 tracking-wide">Screen Assignment</h2>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-medium mb-2 tracking-wide">Select Branch</p>
                    <div className="bg-[#1c1c1e] border border-[#2e2e30] rounded-xl p-4 max-h-44 overflow-y-auto pr-1">
                        {BRANCHES.map((b) => (
                            <Checkbox key={b} label={b} checked={selectedBranches.includes(b)} onClick={() => toggleBranch(b)} />
                        ))}
                    </div>
                </div>

                {/* Schedule */}
                <div className="pt-5 border-t border-[#2e2e30]/70">
                    <div className="flex items-center gap-2.5 pb-3">
                        <div className="w-7 h-7 rounded-xl bg-[#f9671a]/10 flex items-center justify-center border border-[#f9671a]/10">
                            <Clock size={13} className="text-[#f9671a]" />
                        </div>
                        <h2 className="text-sm font-bold text-zinc-100 tracking-wide">Schedule</h2>
                    </div>

                    <p className="text-[11px] text-zinc-500 font-medium mb-2 tracking-wide">Display Type</p>
                    <div className="flex items-center gap-6 mb-5">
                        <Radio label="Publish Now" checked={displayType === "Publish Now"} onClick={() => setDisplayType("Publish Now")} />
                        <Radio label="Schedule later" checked={displayType === "Schedule later"} onClick={() => setDisplayType("Schedule later")} />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <Field label="Start Date">
                            <div className="relative">
                                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                                <input
                                    type="date"
                                    defaultValue="2026-05-07"
                                    className="w-full bg-[#1c1c1e] border border-[#2e2e30] rounded-xl pl-9 pr-4 py-3 text-xs font-semibold text-zinc-100 placeholder-zinc-600 outline-none focus:border-[#f9671a]/50 transition-all"
                                />
                            </div>
                        </Field>
                        <Field label="Start Time">
                            <TextInput type="time" defaultValue="10:00" />
                        </Field>
                        <Field label="End Date">
                            <div className="relative">
                                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                                <input
                                    type="date"
                                    defaultValue="2026-05-31"
                                    className="w-full bg-[#1c1c1e] border border-[#2e2e30] rounded-xl pl-9 pr-4 py-3 text-xs font-semibold text-zinc-100 placeholder-zinc-600 outline-none focus:border-[#f9671a]/50 transition-all"
                                />
                            </div>
                        </Field>
                        <Field label="End Time">
                            <TextInput type="time" defaultValue="23:59" />
                        </Field>
                    </div>

                    <div className="mt-5 pt-5 border-t border-[#2e2e30]/70">
                        <p className="text-[11px] text-zinc-500 font-medium mb-2 tracking-wide">Recurrence</p>
                        <div className="flex items-center gap-4 flex-wrap">
                            {["Daily", "Weekdays", "Weekends", "Custom"].map((r) => (
                                <Radio key={r} label={r} checked={recurrence === r} onClick={() => setRecurrence(r)} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Review & Publish */}
                <div className="pt-5 border-t border-[#2e2e30]/70">
                    <div className="flex items-center gap-2.5 pb-3">
                        <div className="w-7 h-7 rounded-xl bg-[#f9671a]/10 flex items-center justify-center border border-[#f9671a]/10">
                            <Layers size={13} className="text-[#f9671a]" />
                        </div>
                        <h2 className="text-sm font-bold text-zinc-100 tracking-wide">Review &amp; Publish</h2>
                    </div>
                    <div className="bg-[#1c1c1e] border border-[#2e2e30] rounded-xl px-4 py-2">
                        <ReviewRow icon={<FileText size={12} />} label="Content" value={title} />
                        <ReviewRow icon={<ImageIcon size={12} />} label="Type" value={contentType} />
                        <ReviewRow icon={<MapPin size={12} />} label="Branches" value={`${selectedBranches.length} Selected`} />
                        <ReviewRow icon={<Layers size={12} />} label="Screens" value="2 Groups (18 Screens)" />
                        <ReviewRow icon={<Clock size={12} />} label="Schedule" value="7 May – 31 May, 2026" />
                        <ReviewRow
                            icon={<MonitorPlay size={12} />}
                            label="Status"
                            value={
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 tracking-wide">
                                    Ready To Publish
                                </span>
                            }
                        />
                    </div>
                </div>
            </div>

            {/* ── Action Footer ── */}
            <div className="flex items-center justify-end gap-3 px-6 pb-8">
                <button
                    onClick={() => router.back()}
                    className="px-5 py-3 rounded-xl bg-[#1c1c1e] border border-[#2e2e30] text-zinc-400 hover:text-zinc-100 text-xs font-semibold tracking-wide transition-all"
                >
                    Save Draft
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f9671a] text-white text-xs font-bold tracking-wide hover:bg-[#e05a15] transition-colors shadow-xl shadow-[#f9671a]/10">
                    <Send size={13} />
                    Publish Content
                </button>
            </div>
        </div>
    );
}
