"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cloud,
  Printer,
  Laptop,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Sliders,
  MapPin
} from "lucide-react";
import BranchSidebar from "@/components/BranchSidebar";


export default function BranchAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live ticking clock for top header
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      // Format as: "Tue, May 17, 09:53:17 AM" (from screenshot format)
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      setCurrentTime(date.toLocaleDateString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] flex text-zinc-100 antialiased font-sans">
      
      {/* SEPARATED BRANCH SIDEBAR COMPONENT */}
      <BranchSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen relative">
        
        {/* TOP BAR */}
        <header className="h-20 bg-[#121214]/90 backdrop-blur-md border-b border-zinc-800/80 flex items-center justify-between px-4 sm:px-6 md:px-8 z-30">
          
          {/* Left items: Mobile menu button, Branch details */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="hidden sm:flex flex-col">
              <div className="flex items-center text-xs text-zinc-400 space-x-1.5 font-medium">
                <MapPin className="h-3.5 w-3.5 text-orange-500" />
                <span>Nearest Branch:</span>
                <span className="text-orange-500 font-bold">Cloud Gate (The Heart, Chicago)</span>
              </div>
              <span className="text-[11px] text-zinc-500 mt-0.5 font-bold tracking-wide">
                {currentTime || "Tue, May 17, 09:53:17 AM"}
              </span>
            </div>
          </div>

          {/* Right items: Device connection statuses, profile */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Status indicators */}
            <div className="hidden lg:flex items-center space-x-4 border-r border-zinc-800/60 pr-6">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-400">
                <Cloud className="h-3.5 w-3.5 text-zinc-500" />
                <span>Cloud</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-400">
                <Printer className="h-3.5 w-3.5 text-zinc-500" />
                <span>Printer</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-400">
                <Laptop className="h-3.5 w-3.5 text-zinc-500" />
                <span>Terminal</span>
              </div>
              <div className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold text-green-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1" />
                Connected
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-zinc-800/60 transition-all focus:outline-none"
              >
                {/* User avatar mockup */}
                <div className="relative w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                    AC
                  </div>
                </div>
                
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight">Alan Catlach</span>
                  <span className="text-[10px] text-zinc-400 leading-none">Branch Manager</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400 hidden md:block" />
              </button>

              {profileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setProfileOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2.5 w-48 bg-[#161619] border border-zinc-800 rounded-xl shadow-xl py-1.5 z-20 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-zinc-800/40">
                      <p className="text-xs text-zinc-400">Signed in as</p>
                      <p className="text-xs font-bold text-white truncate">alan.catlach@pacinos.com</p>
                    </div>
                    <Link 
                      href="/branch-admin/settings" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <User className="h-3.5 w-3.5 text-zinc-500" />
                      <span>My Profile</span>
                    </Link>
                    <Link 
                      href="/admin" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-orange-400 hover:bg-orange-500/10 transition-colors"
                    >
                      <Sliders className="h-3.5 w-3.5 text-orange-500" />
                      <span>Switch to Super Admin</span>
                    </Link>
                    <div className="border-t border-zinc-800/40 my-1" />
                    <Link 
                      href="/" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5 text-red-400" />
                      <span>Logout</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY VIEWPORT */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0c] relative">
          {/* Subtle mesh background glows for content */}
          <div className="mesh-glow absolute top-20 right-10 opacity-15 pointer-events-none" />
          <div className="mesh-glow absolute bottom-10 left-10 opacity-10 pointer-events-none" />
          
          <div className="p-4 sm:p-6 md:p-8">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
