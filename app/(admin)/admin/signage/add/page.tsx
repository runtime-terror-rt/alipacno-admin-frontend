"use client";

import { ReactNode } from "react";
import { useState } from "react";
import {
    Image as ImageIcon,
    Video,
    ListVideo,
    UploadCloud,
    ChevronDown,
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
} from "lucide-react";
import InputField from "@/components/admin/ui/InputField";
import SelectField from "@/components/admin/ui/SelectField";
import TextareaField from "@/components/admin/ui/TextareaField";
import Image from "next/image";


interface CardProps {
    title?: string;
    right?: ReactNode;
    children: ReactNode;
    className?: string;
}

function Card({ title, right, children, className = "" }: CardProps) {
    return (
        <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-5 ${className}`}>
            {title && (
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    {right}
                </div>
            )}
            {children}
        </div>
    );
}

interface FieldProps {
    label: string;
    children: ReactNode;
}

function Field({ label, children }: FieldProps) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs text-zinc-500">{label}</label>
            {children}
        </div>
    );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full text-white  border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-orange-500/60 transition-colors"
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium  transition-colors ${checked
                ? " border-orange-500/50 text-white"
                : ""
                }`}
        >
            <span
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${checked ? "border-orange-500" : "border-zinc-600"
                    }`}
            >
                {checked && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
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
                className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "border-orange-500" : "border-zinc-700"
                    }`}
            >
                {checked && <span className="w-2 h-2 rounded-full bg-orange-500" />}
            </span>
            <span>
                <p className={`text-sm font-medium ${checked ? "text-white" : "text-zinc-400"}`}>{label}</p>
                {sub && <p className="text-[11px] text-zinc-600">{sub}</p>}
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
                className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "bg-orange-500 border-orange-500" : "border-zinc-700 bg-zinc-950"
                    }`}
            >
                {checked && <CheckCircle2 size={11} className="text-zinc-950" strokeWidth={3} />}
            </button>
            <span className={`text-xs ${checked ? "text-white" : "text-zinc-400"}`}>{label}</span>
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
        <div className="flex items-start justify-between gap-3 py-2  border-zinc-800/70 last:border-0">
            <span className="flex items-center gap-1.5 text-xs text-zinc-500 flex-shrink-0">
                {icon}
                {label}
            </span>
            <span className={`text-xs font-medium text-right ${valueClass}`}>{value}</span>
        </div>
    );
}

const BRANCHES = [
    "All Branch",
    "Downtown Branch",
    "All Uptown Branch",
    "Airport Road Branch",
    "Eltham Branch",
    "Richmond Branch",
];

export default function SignageContentForm() {
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
        <div className="min-h-screen  text-white p-5 md:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold">Add New Signage Content</h1>
                <p className="text-xs text-zinc-500 mt-1">Upload and schedule content across your digital screens.</p>
            </div>

            {/* Top row: Content Information + Screen Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Content Information */}
                <Card title="Content Information" className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                            label="Content Name"
                            placeholder="Enter content name"
                            value={contentName}
                            onChange={(val) => setContentName(val)}
                        />
                        <Field label="Content Type">
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
                        </Field>
                    </div>

                    {/* Upload area */}
                    <div className="mt-4 space-y-1.5">
                        <label className="text-xs text-zinc-500">Upload Content</label>
                        <div className="border border-dashed border-zinc-700 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
                            <div className="flex flex-col items-center justify-center text-center gap-1.5 flex-1 py-3">
                                <UploadCloud size={22} className="text-zinc-600 mb-1" />
                                <p className="text-sm font-medium text-zinc-300">Drag &amp; Drop your file here</p>
                                <button type="button" className="text-xs text-orange-400 hover:text-orange-300 font-medium">
                                    or click to browse
                                </button>
                                <p className="text-[10px] text-zinc-600">JPG, PNG, MP4 · Max Size: 100 MB</p>
                            </div>

                            <div className="flex items-center gap-4 flex-1 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-5">
                                <div className="w-20 h-14 rounded-lg flex-shrink-0 overflow-hidden relative bg-gradient-to-br from-orange-600 via-red-600 to-yellow-500">
                                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black tracking-tight text-white/90 text-center leading-tight px-1">
                                        <Image src='/admin/Signage/bunhy-buger.png' alt="Signage Preview" width={600} height={600} className="h-full  w-full object-cover " />
                                    </span>
                                </div>
                                <div className="text-xs space-y-1 min-w-0">
                                    <div className="flex justify-between gap-3">
                                        <span className="text-zinc-500">File Name</span>
                                        <span className="text-zinc-200 truncate">burger_promo_2026.jpg</span>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <span className="text-zinc-500">File Size</span>
                                        <span className="text-zinc-200">2.4 MB</span>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <span className="text-zinc-500">Resolution</span>
                                        <span className="text-zinc-200">1920 × 1080</span>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <span className="text-zinc-500">Dimensions</span>
                                        <span className="text-zinc-200">16:9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Details */}
                    <div className="mt-5 pt-5 border-t border-zinc-800">
                        <p className="text-xs font-semibold text-zinc-400 mb-3">Content Details</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <div className="mt-4">
                            <TextareaField
                                label="Description"
                                placeholder="Briefly describe the content details..."
                                rows={2}
                                value={description}
                                onChange={(val) => setDescription(val)}
                            />
                        </div>
                    </div>
                </Card>

                {/* Screen Preview */}
                <Card title="Screen Preview">
                    <div className="rounded-xl overflow-hidden relative h-60 bg-gradient-to-br from-zinc-800 via-orange-900/40 to-red-900/40 border border-zinc-800">
                        <Image src='/admin/Signage/bunhy-buger.png' alt="Signage Preview" width={600} height={600} className="h-full  w-full object-cover " />
                    </div>
                    <div className="mt-4 space-y-0.5 ">
                        <ReviewRow icon={<Maximize2 size={12} />} label="Resolution" value="1920 × 1080 16:9" />
                        <ReviewRow icon={<Ratio size={12} />} label="Aspect Ratio" value="16:9" />
                        <ReviewRow icon={<HardDrive size={12} />} label="File Size" value="2.4 MB" />
                        <ReviewRow icon={<FileType size={12} />} label="Type" value="burger_promo_2026.jpg" />
                    </div>
                </Card>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Screen Assignment */}
               <Card title="Screen Assignment">
  {/* Header Row */}
  <div className="flex items-center justify-between mb-5">
    <p className="text-sm font-medium text-white">Select Branch</p>

    <button className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
      <span>Select Screen Groups</span>
      <ChevronDown size={15} className="text-zinc-500" />
    </button>
  </div>

  {/* Branch List */}
  <div className="max-h-72 overflow-y-auto pr-2 space-y-1 custom-scrollbar">
    {BRANCHES.map((branch) => (
    <RadioPill
      key={branch}
      label={branch}
      checked={selectedBranches.includes(branch)}
      onClick={() => toggleBranch(branch)}
    />
  ))}
  </div>
</Card>

                {/* Schedule */}
               <Card title="Schedule">
  <div className="grid lg:grid-cols-[30%_1px_60%] gap-6">
    {/* Left Side */}
    <div>
      <p className="text-xs text-zinc-500 mb-3">Display Type</p>

      <div className="space-y-4">
        <Radio
          label="Publish Now"
          checked={displayType === "Publish Now"}
          onClick={() => setDisplayType("Publish Now")}
        />

        <Radio
          label="Schedule later"
          checked={displayType === "Schedule later"}
          onClick={() => setDisplayType("Schedule later")}
        />
      </div>
    </div>

    {/* Vertical Divider */}
    <div className="hidden lg:block  bg-zinc-800" />

    {/* Right Side */}
    <div className="grid sm:grid-cols-2 gap-4">
      {/* Start Date */}
      <Field label="Start Date">
        <div className="relative">
          <input
            type="date"
            defaultValue="2026-05-07"
            className="w-full h-11 rounded-lg bg-[#1d1d1f] border border-zinc-700 px-4 pr-2 text-sm text-white outline-none focus:border-[#f9671a]"
          />
        </div>
      </Field>

      {/* Start Time */}
      <Field label="Start Time">
        <div className="relative">
          <input
            type="time"
            defaultValue="10:00"
            className="w-full h-11 rounded-lg bg-[#1d1d1f] border border-zinc-700 px-4 pr-2 text-sm text-white outline-none focus:border-[#f9671a]"
          />
        </div>
      </Field>

      {/* End Date */}
      <Field label="End Date">
        <div className="relative">
          <input
            type="date"
            defaultValue="2026-05-31"
            className="w-full h-11 rounded-lg bg-[#1d1d1f] border border-zinc-700 px-4 pr-2 text-sm text-white outline-none focus:border-[#f9671a]"
          />
        </div>
      </Field>

      {/* End Time */}
      <Field label="End Time">
        <div className="relative">
          <input
            type="time"
            defaultValue="23:59"
            className="w-full h-11 rounded-lg bg-[#1d1d1f] border border-zinc-700 px-4 pr-2 text-sm text-white outline-none focus:border-[#f9671a]"
          />
        </div>
      </Field>
    </div>
  </div>

  {/* Divider */}
  <div className="my-6 border-t border-zinc-800" />

  {/* Recurrence */}
  <div>
    <p className="text-xs text-zinc-500 mb-3">Recurrence</p>

    <div className="flex flex-wrap gap-5">
      {["Daily", "Weekdays", "Weekends", "Custom"].map((item) => (
        <Radio
          key={item}
          label={item}
          checked={recurrence === item}
          onClick={() => setRecurrence(item)}
        />
      ))}
    </div>
  </div>
</Card>

                {/* Review & Publish */}
                <Card title="Review &amp; Publish">
                    <div className="space-y-0.5">
                        <ReviewRow icon={<FileText size={12} />} label="Content" value={title} />
                        <ReviewRow icon={<ImageIcon size={12} />} label="Type" value={contentType} />
                        <ReviewRow icon={<MapPin size={12} />} label="Branches" value={`${selectedBranches.length} Selected`} />
                        <ReviewRow icon={<Layers size={12} />} label="Screens" value="2 Groups (18 Screens)" />
                        <ReviewRow icon={<Clock size={12} />} label="Schedule" value="7 May – 31 May, 2026" />
                        <ReviewRow
                            icon={<MonitorPlay size={12} />}
                            label="Status"
                            value={
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-green-500/15 text-green-400 border border-green-500/30">
                                    Ready To Publish
                                </span>
                            }
                        />
                    </div>
                </Card>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
                {/* <button className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium hover:text-white transition-colors">
                    Save Draft
                </button> */}
                <button className="flex text-white items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500  text-sm font-bold hover:bg-orange-400 transition-colors">
                    Publish Content →
                </button>
            </div>
        </div>
    );
}
