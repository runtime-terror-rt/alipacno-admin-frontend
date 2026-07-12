"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  BotMessageSquare,
  ChevronDown,
  Monitor,
  Globe,
  Plus,
  LucideIcon,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface SubItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  href: string;
  subItems?: SubItem[];
}

const ADMIN_MENU_ITEMS: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Earnings", icon: Coins, href: "/admin/earnings" },
  { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { name: "Call Logs", icon: Phone, href: "/admin/call-logs" },
  { name: "CRM", icon: Users, href: "/admin/crm" },
  { name: "Deliveries", icon: Truck, href: "/admin/deliveries" },
  { name: "Drivers", icon: User, href: "/admin/drivers" },
  { name: "Staff", icon: Users, href: "/admin/staff" },
  {
    name: "Inventory",
    icon: Package,
    href: "/admin/inventory",
    subItems: [
      { name: "Inventory", icon: Monitor, href: "/admin/inventory" },
      { name: "Items conversions", icon: Globe, href: "/admin/inventory/items-conversions" },
      { name: "Add stock", icon: Plus, href: "/admin/inventory/add-stock" },
      { name: "Menu item", icon: UtensilsCrossed, href: "/admin/inventory/menu-item" },
      { name: "Add menu item", icon: Plus, href: "/admin/inventory/add-menu-item" },
    ],
  },
  { name: "Ai Insights", icon: BotMessageSquare, href: "/admin/ai-insights" },
  { name: "Marketing", icon: Megaphone, href: "/admin/marketing" },
  { name: "Signage", icon: Tv, href: "/admin/signage" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Sync dropdown state with current pathname:
  // - open dropdown if on a matching sub-route
  // - collapse dropdown if navigated away from all sub-routes
  useEffect(() => {
    setOpenMenus((prev) => {
      const next: string[] = [];
      ADMIN_MENU_ITEMS.forEach((item) => {
        if (!item.subItems) return;
        const isOnThisGroup = item.subItems.some(
          (sub) => pathname === sub.href
        ) || pathname === item.href;
        if (isOnThisGroup) {
          // Keep / add this group open
          next.push(item.name);
        }
        // If not on this group, don't add → it collapses automatically
      });
      // Only update state if something actually changed (avoid infinite loop)
      const changed =
        next.length !== prev.filter((n) =>
          ADMIN_MENU_ITEMS.some((i) => i.name === n && i.subItems)
        ).length ||
        next.some((n) => !prev.includes(n));
      return changed ? next : prev;
    });
  }, [pathname]);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleParentWithChildren = (item: MenuItem) => {
    const isCurrentlyOpen = openMenus.includes(item.name);
    if (isCurrentlyOpen) {
      // Already open → just collapse
      setOpenMenus((prev) => prev.filter((n) => n !== item.name));
    } else {
      // Closed → navigate to default page and open dropdown
      router.push(item.href);
      setOpenMenus((prev) => [...prev, item.name]);
    }
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-[#161618] z-50 flex flex-col justify-between border-r border-[#343436]
          transform transition-transform duration-300 md:translate-x-0 md:static md:h-screen shrink-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col flex-1 overflow-y-auto min-h-0">

          {/* LOGO */}
          <div className="flex flex-col items-center justify-center relative px-6 py-3 border-b border-[#343436]">
            <Link
              href="/admin"
              className="relative group block w-24 h-24 transition-transform duration-500 hover:scale-105"
            >
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

          {/* NAV LINKS */}
          <div className="py-6 flex-1">
            <nav className="space-y-0.5">
              {ADMIN_MENU_ITEMS.map((item) => {
                const hasSubItems = !!item.subItems;
                const isDropdownOpen = openMenus.includes(item.name);
                const isSubActive =
                  item.subItems?.some((sub) => pathname === sub.href) ?? false;
                const isActive =
                  (!hasSubItems &&
                    (pathname === item.href ||
                      (item.name === "Dashboard" && pathname === "/admin"))) ||
                  (hasSubItems && isSubActive);
                const Icon = item.icon;

                return (
                  <div key={item.name} className="flex flex-col">

                    {/* ── Parent row ── */}
                    {hasSubItems ? (
                      /* Clickable button: navigates to parent href + opens dropdown */
                      <button
                        onClick={() => handleParentWithChildren(item)}
                        className={`
                          w-full flex items-center justify-between py-3 pr-4 transition-all group select-none cursor-pointer
                          ${isActive
                            ? "border-l-4 border-orange-500 pl-4 bg-[#252525]/90 text-orange-500 font-bold"
                            : "border-l-4 border-transparent pl-4 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/10"
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3.5">
                          <Icon
                            className={`h-[18px] w-[18px] shrink-0 transition-colors ${isActive
                              ? "text-orange-500"
                              : "text-zinc-500 group-hover:text-zinc-300"
                              }`}
                          />
                          <span className="text-sm tracking-wide">{item.name}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isDropdownOpen
                            ? "rotate-180 text-orange-500"
                            : "text-zinc-500 group-hover:text-zinc-300"
                            }`}
                        />
                      </button>
                    ) : (
                      /* Normal link for items without children */
                      <Link
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
                        <Icon
                          className={`h-[18px] w-[18px] shrink-0 transition-colors ${isActive
                            ? "text-orange-500"
                            : "text-zinc-500 group-hover:text-zinc-300"
                            }`}
                        />
                        <span className="text-sm tracking-wide">{item.name}</span>
                      </Link>
                    )}

                    {/* ── Submenu dropdown ── */}
                    {hasSubItems && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen
                          ? "max-h-72 opacity-100"
                          : "max-h-0 opacity-0"
                          }`}
                      >
                        <div className="flex flex-col py-1 space-y-0.5">
                          {item.subItems!.map((sub) => {
                            const isSubItemActive = pathname === sub.href;
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                  flex items-center gap-3 py-2.5 pl-5 pr-4 text-[13px] tracking-wide transition-all rounded-sm mx-2
                                  ${isSubItemActive
                                    ? "text-orange-500 font-medium bg-orange-500/10"
                                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/20"
                                  }
                                `}
                              >
                                <SubIcon
                                  className={`h-[15px] w-[15px] shrink-0 ${isSubItemActive
                                    ? "text-orange-500"
                                    : "text-zinc-600"
                                    }`}
                                />
                                <span>{sub.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

        </div>

        {/* LOG OUT */}
        <div className="border-t border-zinc-900/60 bg-black/5 py-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center space-x-3.5 py-3 pr-4 border-l-4 border-orange-500 pl-4 bg-orange-500/5 text-orange-500 font-bold hover:bg-orange-500/10 transition-all group"
          >
            <LogOut className="h-[18px] w-[18px] text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm tracking-wide">Log out</span>
          </Link>
        </div>

      </aside>
    </>
  );
}
