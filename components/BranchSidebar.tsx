"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MonitorPlay,
  ShoppingBag,
  Tv,
  Package,
  Truck,
  Users,
  BarChart3,
  Coins,
  Settings,
  X,
  LogOut,
  Phone
} from "lucide-react";

interface BranchSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  href: string;
}

const MENU_ITEMS: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/branch-admin" },
  { name: "POS", icon: MonitorPlay, href: "/branch-admin/pos" },
  { name: "Orders", icon: ShoppingBag, href: "/branch-admin/orders" },
  { name: "Call Logs", icon: Phone, href: "/branch-admin/call-logs" },
  { name: "KDS", icon: Tv, href: "/branch-admin/kds" },
  { name: "Inventory", icon: Package, href: "/branch-admin/inventory" },
  { name: "Deliveries", icon: Truck, href: "/branch-admin/deliveries" },
  { name: "Staff", icon: Users, href: "/branch-admin/staff" },
  { name: "Income Reports", icon: BarChart3, href: "/branch-admin/income-reports" },
  { name: "Settings", icon: Settings, href: "/branch-admin/settings" }
];

export default function BranchSidebar({ isOpen, setIsOpen }: BranchSidebarProps) {
  const pathname = usePathname();

  return (
    <div className=" border-r border-[#343436]">
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#343436] z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-[#1e1e20] z-50 flex flex-col justify-between 
        transform transition-transform duration-300 md:translate-x-0 md:static md:h-screen shrink-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col flex-1 overflow-y-auto min-h-0">

          {/* 1. TOP LOGO: Centered round Pacino's logo, no text */}
          <div className="h-32 flex flex-col items-center border-b border-[#343436] justify-center relative px-6 mt-4">
            <Link href="/branch-admin" className="relative group block w-24 h-24 transition-transform duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/25 transition-all w-24 h-24" />
              <Image
                src="/logo.png"
                alt="Pacino's Logo"
                fill
                className="object-contain drop-shadow-[0_4px_12px_rgba(249,115,22,0.15)]"
                priority
              />
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 2. NAVIGATION LINKS */}
          <div className="py-6 flex-1">
            <nav className="space-y-0.5">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.name === "Dashboard" && pathname === "/branch-admin");
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      w-full flex items-center space-x-3.5 py-3 pr-4 transition-all group select-none
                      ${isActive
                        ? "border-l-4 border-orange-500 pl-4 bg-[#252525]/90 text-orange-500 font-bold"
                        : "border-l-4 border-transparent pl-4 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/10"
                      }
                    `}
                  >
                    <Icon className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-orange-500" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                    <span className="text-sm tracking-wide">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

        </div>

        {/* 3. LOG OUT BUTTON AT BOTTOM (With exact orange accent bar and text) */}
        <div className=" py-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center space-x-3.5 py-3 pr-4 border-l-4 border-orange-500 pl-4 bg-orange-500/5 text-orange-500 font-bold hover:bg-orange-500/10 transition-all group"
          >
            <LogOut className="h-4.5 w-4.5 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm tracking-wide">Log out</span>
          </Link>
        </div>

      </aside>
    </div>
  );
}
