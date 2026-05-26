"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Check,
  CheckCircle2,
  Edit2,
  MoreVertical,
  Users,
  Coins,
  TrendingUp,
  Bell,
  Home,
  AlertTriangle,
  Car,
  BarChart3,
  FileText,
  ChevronRight,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  ADMIN_PROFILE_DATA,
  ROLE_MODULES,
  CONNECTED_INTEGRATIONS,
  ACTIVITY_TIMELINE,
  NOTIFICATION_PREFERENCES,
  IntegrationItem,
  TimelineEvent,
  NotificationPreference,
  AdminProfileDetails,
} from "./data";
import Image from "next/image";
import PageHeader from "@/components/admin/common/PageHeader";

export default function SettingsPage() {
  // State variables for interactive page behaviors
  const [profile, setProfile] =
    useState<AdminProfileDetails>(ADMIN_PROFILE_DATA);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editForm, setEditForm] =
    useState<AdminProfileDetails>(ADMIN_PROFILE_DATA);

  const [modules, setModules] = useState(ROLE_MODULES);
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);

  const [integrations, setIntegrations] = useState<IntegrationItem[]>(
    CONNECTED_INTEGRATIONS,
  );
  const [activities, setActivities] =
    useState<TimelineEvent[]>(ACTIVITY_TIMELINE);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [notifications, setNotifications] = useState<NotificationPreference[]>(
    NOTIFICATION_PREFERENCES,
  );

  // Profile actions
  const handleEditProfileClick = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setProfile(editForm);
    setIsEditing(false);

    // Add activity log dynamically
    const newActivity: TimelineEvent = {
      id: `act-${Date.now()}`,
      activity: "You updated your Admin Profile information",
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setActivities([newActivity, ...activities]);
  };

  // Toggle notification states
  const handleToggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextState = !n.enabled;

          // Log timeline event for system notifications setting
          const newActivity: TimelineEvent = {
            id: `act-${Date.now()}`,
            activity: `Changed ${n.title} notification setting to ${nextState ? "ON" : "OFF"}`,
            timestamp: new Date().toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          };
          setActivities([newActivity, ...activities]);

          return { ...n, enabled: nextState };
        }
        return n;
      }),
    );
  };

  // Toggle Integration connection state
  const handleToggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integ) => {
        if (integ.id === id) {
          const nextState = !integ.connected;

          // Add timeline entry
          const newActivity: TimelineEvent = {
            id: `act-${Date.now()}`,
            activity: `${nextState ? "Connected" : "Disconnected"} ${integ.name} integration`,
            timestamp: new Date().toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          };
          setActivities([newActivity, ...activities]);

          return { ...integ, connected: nextState };
        }
        return integ;
      }),
    );
  };

  // Customize module toggles
  const handleToggleModule = (name: string) => {
    setModules((prev) =>
      prev.map((m) => (m.name === name ? { ...m, enabled: !m.enabled } : m)),
    );
  };

  const handleApplyCustomAccess = () => {
    setIsCustomizing(false);

    // Add timeline activity
    const newActivity: TimelineEvent = {
      id: `act-${Date.now()}`,
      activity: `Customized branch access modules under ${profile.role}`,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setActivities([newActivity, ...activities]);
  };

  // Get matching notification icon
  const getNotificationIcon = (iconType: string) => {
    switch (iconType) {
      case "bell":
        return Bell;
      case "home":
        return Home;
      case "alert":
        return AlertTriangle;
      case "car":
        return Car;
      case "marketing":
        return BarChart3;
      case "summary":
        return FileText;
      default:
        return Bell;
    }
  };

  // Filter activities
  const filteredActivities = activities.filter((act) =>
    act.activity.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Settings"
          subtitle="Manage your branch credentials, connected services, and notifications"
        />
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Admin Profile */}
          <div className=" border border-zinc-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            {/* Subtle profile gradient mesh */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-orange-500/10 to-transparent blur-3xl opacity-50 pointer-events-none" />

            <div className="flex justify-between items-center pb-4 mb-6 border-b border-zinc-900/80 relative z-10">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center">
                Admin Profile
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleEditProfileClick}
                  className="px-3.5 py-1.5 bg-[#1a1a1c] hover:bg-[#252528] border border-orange-500/30 rounded-xl text-[10px] font-black uppercase tracking-wider text-orange-500 flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() =>
                    alert("Actions list: Download Backup, System Diagnostic")
                  }
                  className="p-1.5 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800/60 transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
              {/* Elegant custom SVG business avatar matching screenshot */}
              <div>
                <Image
                  src="/branch-admin/admin.png"
                  alt="Profile Avatar"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-4">
                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-xl font-black text-white">
                      {profile.name}
                    </h2>
                    <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/25 rounded-md text-[9px] font-black uppercase text-orange-500">
                      {profile.role}
                    </span>
                  </div>

                  {/* Icon contacts grid */}
                  <div className="grid grid-cols-1 gap-2 mt-3.5 text-xs text-zinc-400 font-semibold">
                    <div className="flex items-center justify-center sm:justify-start space-x-2.5">
                      <Mail className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                      <span className="truncate hover:text-white transition-colors">
                        {profile.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2.5">
                      <Phone className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                      <span className="hover:text-white transition-colors">
                        {profile.phone}
                      </span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2.5">
                      <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                      <span className="hover:text-white transition-colors text-left leading-tight max-w-sm">
                        {profile.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status Flags Footer Panel */}
            <div className="grid grid-cols-3 gap-2 pt-5 mt-6 border-t border-zinc-900/60 text-center relative z-10">
              <div className="space-y-1">
                <span className="block text-[8px] font-black text-zinc-550 uppercase tracking-widest leading-none">
                  Last Login
                </span>
                <span className="block text-[9px] sm:text-xs font-black text-white mt-1 uppercase">
                  {profile.lastLogin}
                </span>
              </div>
              <div className="space-y-1 border-x border-zinc-900/60 px-2">
                <span className="block text-[8px] font-black text-zinc-550 uppercase tracking-widest leading-none">
                  Account Status
                </span>
                <span className="inline-flex items-center justify-center space-x-1.5 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-black text-emerald-500 uppercase tracking-wider">
                    {profile.accountStatus}
                  </span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] font-black text-zinc-550 uppercase tracking-widest leading-none">
                  2FA Status
                </span>
                <span className="inline-flex items-center justify-center space-x-1 mt-1 text-emerald-500">
                  <CheckCircle2 className="h-3.5 w-3.5 fill-emerald-500/10 stroke-[2.5]" />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                    {profile.twoFactorActive ? "Active" : "Inactive"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Role & Permissions */}
          <div className="border border-zinc-800 rounded-3xl p-6 shadow-2xl relative">
            <div className="pb-4 mb-5 border-b border-zinc-900/80">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Role & Permissions
              </h3>
            </div>

            <div className="space-y-5 text-xs font-semibold">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-1">
                  <span className="block text-[8px] font-black text-zinc-550 uppercase tracking-widest leading-none">
                    Role
                  </span>
                  <h4 className="text-lg font-black text-white mt-1">
                    {profile.role}
                  </h4>
                </div>

                <button
                  onClick={() => setIsCustomizing(true)}
                  className="px-4 py-2.5 bg-[#121214] hover:bg-[#1a1a1c] border border-orange-500/30 text-orange-500 hover:text-orange-400 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition cursor-pointer self-start sm:self-auto"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Customize Access</span>
                </button>
              </div>

              <div className="space-y-1 pt-1">
                <span className="block text-[8px] font-black text-zinc-550 uppercase tracking-widest leading-none">
                  Description
                </span>
                <p className="text-zinc-400 mt-1.5 leading-relaxed font-semibold">
                  Full system access with complete control over all modules and
                  settings.
                </p>
              </div>

              {/* Module Access Pills Grid matching design perfectly */}
              <div className="space-y-2 pt-2">
                <span className="block text-[8px] font-black text-zinc-550 uppercase tracking-widest leading-none">
                  Module Access
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
                  {modules.map((mod) => (
                    <div
                      key={mod.name}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl  select-none ${
                        mod.enabled
                          ? "bg-[#23272D4D] border-[#23272D4D] text-white"
                          : "bg-zinc-900/30 border-zinc-900 text-zinc-500"
                      }`}
                    >
                      <div
                        className={`h-4.5 w-4.5 rounded-full flex items-center justify-center border shrink-0 ${
                          mod.enabled
                            ? "bg-[#10B981] border-emerald-500/20 text-black"
                            : "border-zinc-800 text-zinc-650"
                        }`}
                      >
                        <Check className="h-3 w-3 stroke-[3.5]" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider truncate">
                        {mod.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Connected Integrations */}
          <div className="border border-zinc-800 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 mb-5 border-b border-zinc-900/80">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Connected Integrations
                </h3>
              </div>
              <button
                onClick={() => alert("All integrations are fully configured.")}
                className="px-3.5 py-1.5 bg-[#1a1a1c] hover:bg-[#252528] border border-zinc-800 hover:border-zinc-700 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition cursor-pointer"
              >
                Manage Integrations
              </button>
            </div>

            {/* Integrations List with premium custom badges */}
            <div className="divide-y divide-zinc-900/60 text-xs font-semibold">
              {integrations.map((item) => {
                // Render custom premium brand shapes
                let brandMarkup = null;
                if (item.logoType === "uber") {
                  brandMarkup = (
                    <div className="w-8 h-8 rounded-xl bg-black border border-zinc-850 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[6px] font-black leading-none text-white tracking-widest">
                        UBER
                      </span>
                      <span className="text-[5px] font-bold text-emerald-450 mt-0.5 leading-none">
                        Eats
                      </span>
                    </div>
                  );
                } else if (item.logoType === "deliveroo") {
                  brandMarkup = (
                    <div className="w-8 h-8 rounded-xl bg-[#00cdbc]/10 border border-[#00cdbc]/25 flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-[#00cdbc] tracking-widest">
                        D
                      </span>
                    </div>
                  );
                } else if (item.logoType === "stripe") {
                  brandMarkup = (
                    <div className="w-8 h-8 rounded-xl bg-[#635bff]/10 border border-[#635bff]/25 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-black text-[#635bff] tracking-widest">
                        S
                      </span>
                    </div>
                  );
                } else if (item.logoType === "twilio") {
                  brandMarkup = (
                    <div className="w-8 h-8 rounded-xl bg-[#f22f46]/10 border border-[#f22f46]/25 flex items-center justify-center shrink-0">
                      <span className="text-[7px] font-black text-[#f22f46]">
                        twilio
                      </span>
                    </div>
                  );
                } else if (item.logoType === "google") {
                  brandMarkup = (
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center shrink-0">
                      <span className="text-xs select-none">📍</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-3.5">
                      {brandMarkup}
                      <span className="text-white text-xs font-black tracking-wider uppercase">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Connection pill switch */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                          item.connected
                            ? "bg-emerald-500/5 border-emerald-500/25 text-emerald-450"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500"
                        }`}
                      >
                        {item.connected ? "Connected" : "Disconnected"}
                      </span>

                      <button
                        onClick={() => handleToggleIntegration(item.id)}
                        className={`text-[10px] font-black uppercase tracking-wider underline cursor-pointer transition-colors ${
                          item.connected
                            ? "text-zinc-500 hover:text-rose-500"
                            : "text-orange-500 hover:text-orange-450"
                        }`}
                      >
                        {item.connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          {/* Mini Cards side-by-side row */}
         <div className="grid grid-cols-2 gap-4">

  {/* Staff access card */}
  <div className="bg-[#1E1E20] rounded-2xl border border-[#2e2e30] p-4 flex flex-col gap-4 relative overflow-hidden">
    
    {/* Background Decorative */}
    <div className="absolute right-0 top-0 w-40 h-40 opacity-90">
      <Image
        src="/admin/common/stats.svg"
        alt="Decorative arc"
        fill
        className="object-cover"
      />
    </div>

    {/* Top */}
    <div className="flex items-center justify-between relative z-10">
      <div className="w-9 h-9 rounded-md text-[#f9671a] bg-[#1E1E20] border border-[#FFFFFF1A] p-2 flex items-center justify-center">
        <Users size={20} />
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-1 relative z-10">
      <p className="text-gray-100 text-sm font-bold tracking-widest uppercase">
        Active Staff
      </p>

      <p className="text-sm font-bold text-[#A4542A] leading-none">
        156
      </p>
    </div>

    {/* Trend */}
    <div className="flex items-center gap-2 border border-[#3D3D3DAA] w-fit p-2 rounded-lg relative z-10">
      
      <div className="flex items-center gap-1 px-2 py-1 rounded-md">
        <TrendingUp
          size={28}
          className="p-1 rounded-lg text-[#0E8013] bg-green-500/10"
        />

        <span className="text-[13px] font-semibold text-[#00A706]">
          25%
        </span>
      </div>

      <div className="w-[2px] h-6 bg-[#3d3d3d]" />

      <span className="text-[#626262] text-[12px]">
        vs last period
      </span>
    </div>
  </div>

  {/* Revenue access card */}
  <div className="bg-[#1E1E20] rounded-2xl border border-[#2e2e30] p-4 flex flex-col gap-4 relative overflow-hidden">
    
    {/* Background Decorative */}
    <div className="absolute right-0 top-0 w-40 h-40 opacity-90">
      <Image
        src="/admin/common/stats.svg"
        alt="Decorative arc"
        fill
        className="object-cover"
      />
    </div>

    {/* Top */}
    <div className="flex items-center justify-between relative z-10">
      <div className="w-9 h-9 rounded-md text-[#f9671a] bg-[#1E1E20] border border-[#FFFFFF1A] p-2 flex items-center justify-center">
        <Coins size={20} />
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-1 relative z-10">
      <p className="text-gray-100 text-sm font-bold tracking-widest uppercase">
        Revenue Access
      </p>

      <p className="text-sm font-bold text-[#A4542A] leading-none">
        £45,890
      </p>
    </div>

    {/* Trend */}
    <div className="flex items-center gap-2 border border-[#3D3D3DAA] w-fit p-2 rounded-lg relative z-10">
      
      <div className="flex items-center gap-1 px-2 py-1 rounded-md">
        <TrendingUp
          size={28}
          className="p-1 rounded-lg text-[#0E8013] bg-green-500/10"
        />

        <span className="text-[13px] font-semibold text-[#00A706]">
          18%
        </span>
      </div>

      <div className="w-[2px] h-6 bg-[#3d3d3d]" />

      <span className="text-[#626262] text-[12px]">
        vs last period
      </span>
    </div>
  </div>
</div>

          {/* Card 4: Activity Timeline */}
          <div className=" border border-zinc-800 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-zinc-900/80 gap-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Activity Timeline
              </h3>

              {/* Timeline search bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#1a1a1c] border border-zinc-800 rounded-lg px-2.5 py-1.5 pl-7 text-[10px] text-white font-semibold outline-none focus:border-orange-500 transition-colors w-full sm:w-36"
                />
                <span className="absolute left-2.5 top-2.5">
                  <svg
                    className="w-2.5 h-2.5 text-zinc-550"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Vertical timeline matching screenshot perfectly */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 relative pl-3.5 border-l border-zinc-900">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((act) => (
                  <div
                    key={act.id}
                    className="relative group text-xs font-semibold"
                  >
                    {/* Timeline bullet */}
                    <span className="absolute -left-[19.5px] top-1 h-3 w-3 rounded-full bg-orange-500 border border-[#121214] group-hover:scale-115 transition-transform" />

                    <div className="flex justify-between items-start space-x-3">
                      <span className="text-zinc-300 group-hover:text-white transition-colors text-[11px] leading-tight">
                        {act.activity}
                      </span>
                      <span className="text-zinc-550 group-hover:text-zinc-400 transition-colors text-[9px] uppercase shrink-0 font-bold">
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-zinc-650">
                  No matching timeline activities found.
                </div>
              )}
            </div>
          </div>

          {/* Card 5: Notification Preferences */}
          <div className=" border border-zinc-800 rounded-3xl p-6 shadow-2xl relative">
            <div className="pb-4 mb-5 border-b border-zinc-900/80">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Notification Preferences
              </h3>
            </div>

            {/* Toggles list */}
            <div className="space-y-3.5">
              {notifications.map((pref) => {
                const Icon = getNotificationIcon(pref.iconType);

                return (
                  <div
                    key={pref.id}
                    className=" border border-zinc-900 hover:border-zinc-800 rounded-2xl p-4.5 flex justify-between items-center transition-all"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="h-8.5 w-8.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-white text-xs font-black uppercase tracking-wider truncate">
                          {pref.title}
                        </h4>
                        <p className="text-zinc-500 text-[10px] mt-0.5 font-bold truncate">
                          {pref.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      {/* Premium functional switch toggle */}
                      <button
                        onClick={() => handleToggleNotification(pref.id)}
                        className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          pref.enabled ? "bg-orange-500" : "bg-zinc-800"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            pref.enabled ? "translate-x-4.5" : "translate-x-0"
                          }`}
                        />
                      </button>

                      <ChevronRight className="h-4 w-4 text-zinc-550 shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDIT PROFILE DIALOG MODAL ================= */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#121214] border border-zinc-800 rounded-3xl p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Edit Admin Profile
              </h3>
              <p className="text-[11px] text-zinc-450 mt-1 font-semibold">
                Update Jesse Hayden's administrative details
              </p>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full bg-[#161618] border border-zinc-850 focus:border-orange-500 rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full bg-[#161618] border border-zinc-850 focus:border-orange-500 rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full bg-[#161618] border border-zinc-850 focus:border-orange-500 rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                  Office Address
                </label>
                <textarea
                  rows={2}
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({ ...editForm, address: e.target.value })
                  }
                  className="w-full bg-[#161618] border border-zinc-850 focus:border-orange-500 rounded-xl px-4 py-3 text-white focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 bg-[#161618] hover:bg-[#252528] border border-zinc-800 rounded-xl text-xs font-black uppercase tracking-wider text-zinc-400 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-black uppercase tracking-wider text-white transition shadow-lg shadow-orange-500/10 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CUSTOMIZE MODULE ACCESS DIALOG MODAL ================= */}
      {isCustomizing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-[#121214]  rounded-3xl p-6 space-y-6 shadow-2xl relative max-h-[85vh] flex flex-col">
            <button
              onClick={() => setIsCustomizing(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Customize Module Access
              </h3>
              <p className="text-[11px] text-zinc-450 mt-1 font-semibold">
                Enable or disable specific features for the {profile.role} role
              </p>
            </div>

            <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-2 gap-3 text-xs font-semibold py-2">
              {modules.map((mod) => (
                <button
                  key={mod.name}
                  onClick={() => handleToggleModule(mod.name)}
                  className={`flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${
                    mod.enabled
                      ? "bg-[#23272D4D] border-orange-555/35 text-white"
                      : "bg-[#161618] border-zinc-850/80 text-zinc-500"
                  }`}
                >
                  <span className="uppercase tracking-wider text-[10px] font-black">
                    {mod.name}
                  </span>
                  <div
                    className={`h-5 w-5 rounded-md flex items-center justify-center border transition-all ${
                      mod.enabled
                        ? "bg-orange-500 border-orange-600 text-white"
                        : "border-zinc-800 bg-zinc-950"
                    }`}
                  >
                    {mod.enabled && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex space-x-3 pt-4 border-t border-zinc-900">
              <button
                onClick={() => setModules(ROLE_MODULES)}
                className="py-3 px-4 bg-[#161618] hover:bg-[#252528] border border-zinc-800 rounded-xl text-xs font-black uppercase tracking-wider text-zinc-400 transition cursor-pointer"
              >
                Reset Default
              </button>
              <button
                onClick={handleApplyCustomAccess}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-black uppercase tracking-wider text-white transition shadow-lg shadow-orange-500/10 cursor-pointer"
              >
                Apply Custom Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
