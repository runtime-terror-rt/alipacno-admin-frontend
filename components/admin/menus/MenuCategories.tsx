import { ChevronRight, Plus } from "lucide-react";
import Image from "next/image";

type MenuItemStatus = "Completed" | "Preparing" | "On Delivery" | "Cancel";

interface MenuItem {
  customer: string;
  phone: string;
  modifierId: string;
  category: string;
  price: string;
  modifiers: string;
  status: MenuItemStatus;
  availableAt: string;
  updated: string;
  updatedDate: string;
}

interface Category {
  name: string;
  count: number;
  emoji: string;
  image:string;
}

interface OverviewRow {
  label: string;
  sub: string;
  value: number;
  change: string;
  sparkColor: string;
  sparkUp: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { customer: "Brooklyn Simmons", phone: "(312) 555-0192", modifierId: "#FD-9921", category: "Eltham", price: "£32.00", modifiers: "Eltham", status: "Completed",  availableAt: "Delivery", updated: "09:42 AM", updatedDate: "May 04 2026" },
  { customer: "Brooklyn Simmons", phone: "(312) 555-0192", modifierId: "#FD-9921", category: "Eltham", price: "£32.00", modifiers: "Eltham", status: "Preparing",   availableAt: "Delivery", updated: "09:42 AM", updatedDate: "May 04 2026" },
  { customer: "Brooklyn Simmons", phone: "(312) 555-0192", modifierId: "#FD-9921", category: "Eltham", price: "£32.00", modifiers: "Eltham", status: "On Delivery", availableAt: "Delivery", updated: "09:42 AM", updatedDate: "May 04 2026" },
  { customer: "Brooklyn Simmons", phone: "(312) 555-0192", modifierId: "#FD-9921", category: "Eltham", price: "£32.00", modifiers: "Eltham", status: "Cancel",      availableAt: "Delivery", updated: "09:42 AM", updatedDate: "May 04 2026" },
  { customer: "Brooklyn Simmons", phone: "(312) 555-0192", modifierId: "#FD-9921", category: "Eltham", price: "£32.00", modifiers: "Eltham", status: "Completed",  availableAt: "Delivery", updated: "09:42 AM", updatedDate: "May 04 2026" },
];

const CATEGORIES: Category[] = [
  { name: "Burgers",    count: 42, image: "/admin/food/cheeseburger.png" , emoji: "🍔" },
  { name: "Pizzas",     count: 26, image: "/admin/food/media3.jpg" , emoji: "🍕" },
  { name: "Sides",      count: 35, image: "/admin/food/media4.jpg" , emoji: "🍟" },
  { name: "Beverages",  count: 26, image: "/admin/food/media3.jpg" , emoji: "🥤" },
  { name: "Breakfast",  count: 12, image: "/admin/food/pizza.jpg" , emoji: "🍳" },
  { name: "Desserts",   count: 18, image: "/admin/food/media4.jpg" , emoji: "🍰" },
];

const OVERVIEW_ROWS: OverviewRow[] = [
  { label: "Veg Items",       sub: "42 Items", value: 56, change: "+7.1%", sparkColor: "#22c55e", sparkUp: true },
  { label: "Spic Items",      sub: "42 Items", value: 56, change: "+7.1%", sparkColor: "#ef4444", sparkUp: false },
  { label: "Modifier Groups", sub: "42 Items", value: 56, change: "+7.1%", sparkColor: "#f9671a", sparkUp: true },
];

const QUICK_ACTIONS = ["Total calls", "Converted Orders", "Missed Calls", "Phone Orders"];

function Spark({ color, up }: { color: string; up: boolean }) {
  const pts = up
    ? "0,20 10,16 20,12 30,8 40,10 50,4"
    : "0,4 10,8 20,12 30,10 40,16 50,20";
  return (
    <svg viewBox="0 0 50 24" className="w-12 h-5 flex-shrink-0">
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts}
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MenuCategories = () => {
  return (
    <div className="flex flex-col gap-5">

      {/* Categories */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">Categories</h2>
          <button className="flex items-center gap-1 text-xs text-[#f9671a] hover:underline">
            <Plus size={12} /> Add Category
          </button>
        </div>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="flex items-center gap-3">
                <Image  src={cat.image} alt={cat.name}  width={40} height={52} className="rounded-lg" />
              
              <div className="flex-1">
                <p className="text-xs font-medium text-white">{cat.name}</p>
                <p className="text-[10px] text-zinc-500">{cat.count} Items</p>
              </div>
              <span className="text-[10px] text-green-400 font-semibold">• Active</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Overview */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
        <h2 className="text-sm font-bold text-white mb-4">Menu Overview</h2>
        <div className="space-y-3">
          {OVERVIEW_ROWS.map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs font-medium text-white">{row.label}</p>
                <p className="text-[10px] text-zinc-500">{row.sub}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-white">{row.value}</p>
                <span className={`text-[10px] font-semibold ${row.sparkUp ? "text-green-400" : "text-red-400"}`}>↑ {row.change}</span>
              </div>
              <Spark color={row.sparkColor} up={row.sparkUp} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
        <h2 className="text-sm font-bold text-white mb-3">Quick Actions</h2>
        <div className="divide-y divide-[#2e2e30]">
          {QUICK_ACTIONS.map((action) => (
            <button key={action} className="w-full flex items-center justify-between py-2.5 text-xs text-zinc-400 hover:text-white transition-colors">
              {action}
              <ChevronRight size={13} className="text-zinc-600" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuCategories;
