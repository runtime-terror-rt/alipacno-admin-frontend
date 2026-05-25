"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Coins,
  ShoppingBag,
  Phone,
  Users,
  Truck,
  User,
  Package,
  UtensilsCrossed,
  Megaphone,
  Tv,
  Settings,
  X,
  LogOut,
  BotMessageSquare
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  href: string;
}

// Menu Items matching the user's admin sidebar screenshot exactly
const ADMIN_MENU_ITEMS: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Earnings", icon: Coins, href: "/admin/earnings" },
  { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { name: "Call Logs", icon: Phone, href: "/admin/call-logs" },
  { name: "CRM", icon: Users, href: "/admin/crm" },
  { name: "Deliveries", icon: Truck, href: "/admin/deliveries" },
  { name: "Drivers", icon: User, href: "/admin/drivers" },
  { name: "Staff", icon: Users, href: "/admin/staff" },
  { name: "Inventory", icon: Package, href: "/admin/inventory" },
  { name: "Ai Insights", icon: BotMessageSquare , href: "/admin/ai-insights" },
  { name: "Menu", icon: UtensilsCrossed, href: "/admin/menus" },
  { name: "Marketing", icon: Megaphone, href: "/admin/marketing" },
  { name: "Signage", icon: Tv, href: "/admin/signage" },
  { name: "Settings", icon: Settings, href: "/admin/settings" }
];

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm border-r "
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-[#161618] z-50 flex flex-col justify-between border-r border-[#343436]
        transform transition-transform duration-300 md:translate-x-0 md:static md:h-screen shrink-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col flex-1 overflow-y-auto min-h-0">
          
          {/* 1. TOP LOGO: Centered round Pacino's logo, no text */}
          <div className="h-32 flex flex-col items-center justify-center relative px-6 mt-4">
            <Link href="/admin" className="relative group block w-24 h-24 transition-transform duration-500 hover:scale-105">
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
              {ADMIN_MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.name === "Dashboard" && pathname === "/admin");
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
                    <Icon className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-orange-500" : "text-zinc-500 group-hover:text-zinc-400"}`} />
                    <span className="text-sm tracking-wide">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

        </div>

        {/* 3. LOG OUT BUTTON AT BOTTOM (With exact orange accent bar and text) */}
        <div className="border-t border-zinc-900/60 bg-black/5 py-3">
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
    </>
  );
}
