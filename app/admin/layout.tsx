"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Bell,
  Store
} from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";

export default function SuperAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [systemAlert, setSystemAlert] = useState(true);

  return (
    <div className="min-h-screen bg-[#09090b] flex text-zinc-100 antialiased font-sans">
      
      {/* SEPARATED SUPER ADMIN SIDEBAR COMPONENT */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen relative">
        
        {/* TOP BAR */}
        <header className="h-20 bg-[#121214]/90 backdrop-blur-md border-b border-zinc-800/80 flex items-center justify-between px-4 sm:px-6 md:px-8 z-30">
          
          {/* Left items: Mobile menu button, Uptime metrics */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="hidden sm:flex flex-col">
              <div className="flex items-center text-xs text-zinc-400 space-x-2 font-medium">
                <Activity className="h-3.5 w-3.5 text-emerald-500" />
                <span>Global Uptime Status:</span>
                <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md text-[10px]">
                  99.9% Uptime
                </span>
              </div>
            </div>
          </div>

          {/* Right items: Notifications, Profile */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* System Notification bell */}
            {systemAlert && (
              <div className="relative">
                <button 
                  onClick={() => {
                    alert("System Alert: Chicago Cloud Gate branch reports high volume (+40% traffic today). All devices operating normally.");
                    setSystemAlert(false);
                  }}
                  className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 relative cursor-pointer"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500" />
                </button>
              </div>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-zinc-800/60 transition-all focus:outline-none"
              >
                {/* User avatar mockup */}
                <div className="relative w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                    SJ
                  </div>
                </div>
                
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight">Sarah Jenkins</span>
                  <span className="text-[10px] text-zinc-400 leading-none">Global Administrator</span>
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
                      <p className="text-xs font-bold text-white truncate">sarah.j@pacinos.com</p>
                    </div>
                    <Link 
                      href="/admin/settings" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <User className="h-3.5 w-3.5 text-zinc-500" />
                      <span>Admin Profile</span>
                    </Link>
                    <Link 
                      href="/branch-admin" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-orange-400 hover:bg-orange-500/10 transition-colors"
                    >
                      <Store className="h-3.5 w-3.5 text-orange-500" />
                      <span>Switch to Branch POS</span>
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
