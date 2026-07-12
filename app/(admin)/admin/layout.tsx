"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  ChevronDown,
  User,
  LogOut,
  Bell,
  Store,
  ChevronRight,
  Search,
  Heart,
  MessageCircleMore,
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [systemAlert, setSystemAlert] = useState(true);
  const router = useRouter();

  return (
    <div className="min-h-screen  bg-[#1e1e20] flex text-zinc-100 antialiased font-sans">
      {/* SEPARATED SUPER ADMIN SIDEBAR COMPONENT */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen relative">
        {/* TOP BAR */}
        <header className="h-20 bg-[#1e1e20] backdrop-blur-md border-b border-[#343436] flex items-center justify-between px-4 sm:px-6 md:px-8 z-30">
          {/* Left items: Mobile menu button, Uptime metrics */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="hidden sm:flex flex-col">
              <div className="flex items-center text-sm text-zinc-400 space-x-2 font-medium">
                <span className="text-primary flex ">Pacinos HQ </span>
                <ChevronRight className="h-4 w-4 text-white" />
                <span className="text-white capitalize ">  {pathname.split("/").pop()}</span>
              </div>
            </div>
          </div>

          {/* Right items: Notifications, Profile */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => console.log("Search clicked")}
              className="p-2 text-zinc-500 hover:text-white rounded-xl hover:bg-zinc-800 cursor-pointer transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Love / Favorites Button */}
            <button
              onClick={() => console.log("Love clicked")}
              className="p-2 text-zinc-500 hover:text-red-500 rounded-xl hover:bg-zinc-800 cursor-pointer transition-colors"
              aria-label="Favorites"
            >
              <Heart className="h-5 w-5" />
            </button>

            {/* System Notification bell */}
            {systemAlert && (
              <div className="relative">
                <Link
                  href="/admin/notifications"
                  className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 relative cursor-pointer block"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500" />
                  <span className="absolute -top-1 -right-1 h-3.5 w-3.5 flex items-center justify-center rounded-full bg-orange-500 text-[8px] font-bold text-white border-2 border-[#121214]">
                    1
                  </span>
                </Link>
              </div>
            )}

            {/* Messages Button */}
            <button
              onClick={() => router.push("/admin/chat")}
              className="p-2 text-zinc-500 hover:text-white rounded-xl hover:bg-zinc-800 relative cursor-pointer transition-colors"
              aria-label="Messages"
            >
              <MessageCircleMore className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 flex items-center justify-center rounded-full bg-orange-500 text-[8px] font-bold text-white border-2 border-[#121214]">
                1
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-zinc-800/60 transition-all focus:outline-none"
              >

                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight">
                    Sarah Jenkins
                  </span>
                  <span className="text-[10px] text-zinc-400 leading-none">
                    Global Administrator
                  </span>
                </div>

                {/* User avatar mockup */}
                <div className="relative w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                    SJ
                  </div>
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
                      <p className="text-xs font-bold text-white truncate">
                        sarah.j@pacinos.com
                      </p>
                    </div>
                    <Link
                      href="/admin/profile"
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
          {/* <div className="mesh-glow absolute top-20 right-10 opacity-15 pointer-events-none" />
          <div className="mesh-glow absolute bottom-10 left-10 opacity-10 pointer-events-none" /> */}

          <div className="p-2 bg-[#1e1e20]">{children}</div>
        </main>
      </div>
    </div>
  );
}
