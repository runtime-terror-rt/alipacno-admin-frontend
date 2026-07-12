"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, Eye, Pencil, Trash2, X } from "lucide-react";

type RecipeItem = { name: string; unit: number; qty: number };

interface MenuItem {
  id: number;
  image: string;
  name: string;
  category: string;
  ingredients: string;
  price: string;
  recipe: string;
  description?: string;
  recipeItems?: RecipeItem[];
}

export default function MenuItemView() {
  const [search, setSearch] = useState("");

  const [viewItem, setViewItem] = useState<MenuItem | null>(null);

  const mockRecipeItems = [
    { name: "Minced Beef", unit: 2, qty: 1 },
    { name: "Flour", unit: 2, qty: 1 },
  ];
  
  const mockDescription = "The Mixed Munchbox refers to a loaded fast-food container—often a \"meat box\"—which typically includes a hearty combination of fries, sausages, meatballs, and chicken strips, topped with a blend of mayonnaise, BBQ, and special house sauces.";

  const MOCK_DATA: MenuItem[] = [
    { id: 1, image: "/admin/dashboard/inventory-1.png", name: "Classic Beef Burger", category: "Burgers", ingredients: "Minced Beef, Flour, Onion Rings...", price: "£8.50", recipe: "Linked", description: mockDescription, recipeItems: mockRecipeItems },
    { id: 2, image: "/admin/dashboard/inventory-2.png", name: "Mixed Munchbox", category: "Munchbox", ingredients: "Minced Beef, Flour, Onion Rings...", price: "£8.50", recipe: "Linked", description: mockDescription, recipeItems: mockRecipeItems },
    { id: 3, image: "/admin/dashboard/inventory-3.png", name: "Pizza Dough (medium)", category: "Pizza", ingredients: "Minced Beef, Flour, Onion Rings...", price: "£8.50", recipe: "Linked", description: mockDescription, recipeItems: mockRecipeItems },
    { id: 4, image: "/admin/dashboard/inventory-4.png", name: "Beef Patty", category: "Burgers", ingredients: "Minced Beef, Flour, Onion Rings...", price: "£8.50", recipe: "Linked", description: mockDescription, recipeItems: mockRecipeItems },
  ];

  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">
      
      <div>
        <h1 className="text-xl font-bold text-white">Menu Item</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Items and their recipe status.
        </p>
      </div>

      {/* Top Bar: Search, Filter, Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 w-full sm:w-[280px]">
            <Search size={16} className="text-zinc-500 shrink-0" />
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-[160px]">
            <select className="appearance-none bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors w-full cursor-pointer pr-8">
              <option value="">All Category</option>
              <option value="Burgers">Burgers</option>
              <option value="Munchbox">Munchbox</option>
              <option value="Pizza">Pizza</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        <Link 
          href="/admin/inventory/add-menu-item"
          className="px-5 py-2 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-white text-sm font-semibold cursor-pointer whitespace-nowrap w-full sm:w-auto text-center"
        >
          + Add New Item
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1C1C1C] border-b border-[#343436]">
                {["Image", "Item Name", "Category", "Ingredients", "Price", "Recipe", "Actions"].map((h) => (
                  <th key={h} className="text-left text-zinc-400 text-xs font-semibold px-5 py-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e30]/60">
              {MOCK_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-5 py-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#2a2a2c] relative border border-[#3a3a3c]">
                      <Image src={row.image} alt={row.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-white font-medium whitespace-nowrap">{row.name}</td>
                  <td className="px-5 py-3 text-zinc-300 whitespace-nowrap">{row.category}</td>
                  <td className="px-5 py-3 text-zinc-400 whitespace-nowrap">{row.ingredients}</td>
                  <td className="px-5 py-3 text-zinc-300 whitespace-nowrap">{row.price}</td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className="text-green-500">{row.recipe}</span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setViewItem(row)}
                        className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="text-orange-500 hover:text-orange-400 transition-colors cursor-pointer">
                        <Pencil size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-400 transition-colors cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#212121] rounded-2xl w-full max-w-[680px] overflow-hidden shadow-2xl border border-[#343436]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#343436]/50">
              <h2 className="text-lg font-bold text-white">{viewItem.name}</h2>
              <button 
                onClick={() => setViewItem(null)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 space-y-7">
              {/* Image */}
              <div className="w-28 h-28 rounded-xl overflow-hidden relative">
                <Image src={viewItem.image} alt={viewItem.name} fill className="object-cover" />
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-white font-semibold text-[13px] mb-1.5">Item name</p>
                  <p className="text-zinc-300 text-[13px]">{viewItem.name}</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-[13px] mb-1.5">Category</p>
                  <p className="text-zinc-300 text-[13px]">{viewItem.category}</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-[13px] mb-1.5">Price</p>
                  <p className="text-zinc-300 text-[13px]">{viewItem.price}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-white font-semibold text-[13px] mb-2.5">Description</p>
                <p className="text-zinc-300 text-[13px] leading-relaxed">
                  {viewItem.description || "No description available."}
                </p>
              </div>

              {/* Recipe */}
              <div>
                <p className="text-white font-semibold text-[13px] mb-2">Recipe (ingredients used per unit sold)</p>
                <div className="space-y-0">
                  {viewItem.recipeItems?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-[#343436]/60 last:border-0 text-[13px] text-zinc-300">
                      <span className="w-1/3">{item.name}</span>
                      <span className="w-1/3">Unit: {item.unit}</span>
                      <span className="w-1/3 text-left">Qty per unit: {item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
