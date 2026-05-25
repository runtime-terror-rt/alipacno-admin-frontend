"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  User,
  LogOut,
  Bell,
  MapPin,
  Cloud,
  Printer,
  Terminal,
  Wifi,
  
} from "lucide-react";
import BranchSidebar from "@/components/BranchSidebar";

export default function BranchAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [systemAlert, setSystemAlert] = useState(true);

  // Helper to format pathname to title
  const getPageTitle = () => {
    const path = pathname.split("/").pop();
    if (!path || path === "branch-admin") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ");
  };

  return (
    <div className="min-h-screen bg-[#1e1e20] flex text-zinc-100 antialiased font-sans">
      {/* SEPARATED BRANCH ADMIN SIDEBAR COMPONENT */}
      <BranchSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen relative">
        {/* TOP BAR */}
        <header className="h-17 bg-[#1e1e20] border-b border-[#343436] flex items-center justify-between px-4 md:px-6 relative z-30">
          {/* LEFT */}
          <div className="flex items-center gap-6 min-w-0">
            {/* Mobile Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-zinc-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Branch */}
            <div className="flex items-center gap-2 text-base  whitespace-nowrap">
              <span className=""><MapPin size={16}/></span>

              <span>Nearest Branch:</span>

              <span className="text-[#F9671A] text-base font-semibold">
                Cloud Gate (The Bean), Chicago
              </span>
            </div>

            {/* Time */}
            <div className="hidden lg:flex text-base text-zinc-300 font-medium">
              Tue, May 12, 09:53:17 AM
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* STATUS PILLS */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md   text-xs text-[#9CA3AF]">
                <div className=" rounded-full text-[#00C950]" ><Cloud size={16}/></div>
                Cloud
              </div>

              <div className="flex items-center gap-1 px-2 py-1 rounded-md ] text-xs text-[#9CA3AF]">
                <div className=" rounded-full text-[#00C950]"><Printer size={16}/></div> 
                Printer
              </div>

              <div className="flex items-center gap-1 px-2 py-1 rounded-md  text-xs text-[#9CA3AF]">
                <div className=" rounded-full text-[#00C950]"><Terminal size={16}/></div> 
                Terminal
              </div>
            </div>

            {/* CONNECTED BADGE */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg border border-[#22C55E] bg-[#15803D33]">
              <div className=" rounded-full text-[#22C55E] animate-pulse"><Wifi size={16}/></div> 

              <span className="text-[11px] font-semibold text-[#22C55E]">
                Connected
              </span>
            </div>

            {/* Notification */}
            <button className="relative text-zinc-500 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />

              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500" />
            </button>

            {/* PROFILE */}
            <div className="relative pl-2">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <div className="hidden md:flex flex-col text-right leading-tight">
                  <span className="text-base font-semibold text-white">
                    Alan Cattach
                  </span>

                  <span className="text-xs text-[#9CA3AF]">
                    Branch Manager
                  </span>
                </div>

                <div className="w-7 h-7 rounded-full overflow-hidden border border-zinc-700 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-[10px] font-bold text-white">
                  AC
                </div>

                <ChevronDown className="w-3 h-3 text-zinc-500 hidden md:block" />
              </button>

              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileOpen(false)}
                  />

                  <div className="absolute right-0 mt-3 w-52 bg-[#17181b] border border-zinc-800 rounded-xl shadow-2xl py-2 z-20">
                    <div className="px-4 pb-2 border-b border-zinc-800">
                      <p className="text-[10px] text-zinc-500">Signed in as</p>

                      <p className="text-[11px] font-semibold text-white truncate">
                        alan.cattach@pacinos.com
                      </p>
                    </div>

                    <Link
                      href="/branch-admin/profile"
                      className="flex items-center gap-2 px-4 py-2 text-[11px] text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      My Profile
                    </Link>

                    <Link
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 text-[11px] text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY VIEWPORT */}
        <main className="flex-1 overflow-y-auto bg-[#1e1e20] relative">
         

          <div className="p-4 sm:p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
