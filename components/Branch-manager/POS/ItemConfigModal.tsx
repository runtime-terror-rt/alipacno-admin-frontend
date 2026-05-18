"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, Check, X, Heart } from "lucide-react";
import { Product } from "../../../app/(branchAdmin)/branch-admin/pos/data";

interface ItemConfigModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (qty: number, optionsStr: string, customPrice: number) => void;
}

export default function ItemConfigModal({
  product,
  onClose,
  onAddToCart,
}: ItemConfigModalProps) {
  // Configured Option states
  const [modalSize, setModalSize] = useState<string>("regular");
  const [modalCooking, setModalCooking] = useState<string>("Rare");
  const [modalSpice, setModalSpice] = useState<string>("Mild");
  const [modalToppings, setModalToppings] = useState<string[]>(["truffle"]);
  const [modalExtras, setModalExtras] = useState<string[]>([]);
  const [modalRemoved, setModalRemoved] = useState<string[]>(["No Pepper"]);
  const [modalNote, setModalNote] = useState<string>("");
  const [modalQty, setModalQty] = useState<number>(1);

  // Dynamic calculated item configuration total in modal
  const modalTotal =
    (product.price +
      (modalSize === "medium" ? 4 : modalSize === "large" ? 8 : 0) +
      modalToppings.length * 4 +
      modalExtras.length * 4) *
    modalQty;

  const handleConfirmAddToCart = () => {
    // Build options string exactly matching selected options
    const optionsArray = [];
    optionsArray.push(`Size: ${modalSize.charAt(0).toUpperCase() + modalSize.slice(1)}`);
    optionsArray.push(`Cooking: ${modalCooking}`);
    optionsArray.push(`Spice: ${modalSpice}`);

    if (modalToppings.length > 0) {
      const topLabels = modalToppings.map((t) => {
        if (t === "truffle") return "Truffle Butter";
        if (t === "foie") return "Foie Gras";
        if (t === "bacon") return "Crispy Bacon";
        if (t === "egg") return "Fried Egg";
        return t;
      });
      optionsArray.push(`Toppings: ${topLabels.join(", ")}`);
    }

    if (modalExtras.length > 0) {
      const extLabels = modalExtras.map((e) => {
        if (e === "garlic") return "Garlic Bread";
        if (e === "sauce") return "Béarnaise Sauce";
        if (e === "lobster") return "Lobster Tail";
        if (e === "mash") return "Mashed Potatoes";
        if (e === "fries") return "French Fries";
        return e;
      });
      optionsArray.push(`Extras: ${extLabels.join(", ")}`);
    }

    if (modalRemoved.length > 0) {
      optionsArray.push(`Removed: ${modalRemoved.join(", ")}`);
    }

    const optionsStr = optionsArray.join(" | ");

    // Unit price calculation: base + size (+4/8) + toppings (+4 each) + extras (+4 each)
    const singleUnitPrice =
      product.price +
      (modalSize === "medium" ? 4 : modalSize === "large" ? 8 : 0) +
      modalToppings.length * 4 +
      modalExtras.length * 4;

    onAddToCart(modalQty, optionsStr, singleUnitPrice);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#18181A] border border-zinc-850 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row gap-5 relative">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 h-8 w-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition border border-zinc-800 cursor-pointer z-10"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Left Food Image */}
          <div className="relative w-full sm:w-56 h-40 rounded-2xl overflow-hidden shrink-0 border border-zinc-850">
            {/* Rating pill */}
            <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-black text-orange-400">
              ★ {product.rating}
            </span>
            {/* Heart fav */}
            <button className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-red-500 transition border border-zinc-800/40">
              <Heart className="h-4 w-4" />
            </button>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Details */}
          <div className="space-y-2.5 flex-1 pr-8">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {product.name}
            </h2>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold text-zinc-400">
              <span>Distance: 2.3 km</span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
              <span>
                Estimated Time: <span className="text-orange-500">25–30 mins</span>
              </span>
            </div>

            <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
              Premium center-cut steak grilled to perfection with garlic herb butter. Tender, juicy, and rich in flavor.
            </p>

            <div className="text-2xl font-black text-orange-500 pt-1">
              £{product.price.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Choose Size */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
              Choose Size
            </h3>
            <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[9px] font-black uppercase">
              Required
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "regular", label: "Regular", sub: "5-inch", add: 0 },
              { id: "medium", label: "Medium", sub: "8-inch", add: 4 },
              { id: "large", label: "Large", sub: "12-inch", add: 8 },
            ].map((size) => {
              const isSelected = modalSize === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => setModalSize(size.id)}
                  className={`
                    w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center
                    ${
                      isSelected
                        ? "bg-gradient-to-r from-[#FE5000]/10 to-[#FF8C00]/5 border-[#FE5000]/40 text-white"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  <div>
                    <span className="block text-sm font-black text-white">
                      {size.label}
                    </span>
                    <span className="block text-[10px] text-zinc-550 mt-0.5 font-bold">
                      {size.sub}{" "}
                      {size.add > 0 && (
                        <span className="text-orange-500/80">
                          +{size.add.toFixed(2)}
                        </span>
                      )}
                    </span>
                  </div>

                  <div
                    className={`
                    h-5 w-5 rounded-full flex items-center justify-center border
                    ${
                      isSelected
                        ? "bg-orange-500 border-orange-600 text-white"
                        : "border-zinc-700 bg-transparent"
                    }
                  `}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3px]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cooking Preference */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
            Cooking Preference
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {["Rare", "Medium-Rare", "Medium", "Medium-Well", "Well-Done"].map(
              (pref) => {
                const isSelected = modalCooking === pref;
                return (
                  <button
                    key={pref}
                    onClick={() => setModalCooking(pref)}
                    className={`
                      px-4.5 py-2 rounded-full text-xs font-black uppercase border transition cursor-pointer
                      ${
                        isSelected
                          ? "bg-orange-500/10 text-orange-450 border-orange-500/40"
                          : "bg-zinc-900 border-zinc-855 text-zinc-400 hover:text-white"
                      }
                    `}
                  >
                    {pref}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Spice Level */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
            Spice Level
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {["Mild", "Medium", "Hot"].map((spice) => {
              const isSelected = modalSpice === spice;
              return (
                <button
                  key={spice}
                  onClick={() => setModalSpice(spice)}
                  className={`
                    px-4.5 py-2 rounded-full text-xs font-black uppercase border transition cursor-pointer
                    ${
                      isSelected
                        ? "bg-orange-500/10 text-orange-450 border-orange-500/40"
                        : "bg-zinc-900 border-zinc-855 text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  {spice}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modify Toppings */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
            Modify Toppings
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: "truffle", label: "Truffle Butter", add: 4 },
              { id: "foie", label: "Foie Gras", add: 4 },
              { id: "bacon", label: "Crispy Bacon", add: 4 },
              { id: "egg", label: "Fried Egg", add: 4 },
            ].map((top) => {
              const isSelected = modalToppings.includes(top.id);
              return (
                <button
                  key={top.id}
                  onClick={() => {
                    if (isSelected) {
                      setModalToppings(modalToppings.filter((t) => t !== top.id));
                    } else {
                      setModalToppings([...modalToppings, top.id]);
                    }
                  }}
                  className={`
                    px-4.5 py-2.5 rounded-full text-xs font-black uppercase border transition cursor-pointer
                    ${
                      isSelected
                        ? "bg-orange-500/10 text-orange-455 border-orange-500/40"
                        : "bg-zinc-900 border-zinc-855 text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  {top.label}{" "}
                  <span className="text-[10px] text-zinc-550 ml-1">
                    +{top.add.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add Extras */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
            Add Extras
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: "garlic", label: "Garlic Bread", add: 4 },
              { id: "sauce", label: "Béarnaise Sauce", add: 4 },
              { id: "lobster", label: "Lobster Tail", add: 4 },
              { id: "mash", label: "Mashed Potatoes", add: 4 },
              { id: "fries", label: "French Fries", add: 4 },
            ].map((ext) => {
              const isSelected = modalExtras.includes(ext.id);
              return (
                <button
                  key={ext.id}
                  onClick={() => {
                    if (isSelected) {
                      setModalExtras(modalExtras.filter((e) => e !== ext.id));
                    } else {
                      setModalExtras([...modalExtras, ext.id]);
                    }
                  }}
                  className={`
                    px-4.5 py-2.5 rounded-full text-xs font-black uppercase border transition cursor-pointer
                    ${
                      isSelected
                        ? "bg-orange-500/10 text-orange-455 border-orange-500/40"
                        : "bg-zinc-900 border-zinc-855 text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  {ext.label}{" "}
                  <span className="text-[10px] text-zinc-550 ml-1">
                    +{ext.add.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Remove Ingredients */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
            Remove Ingredients
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {["No Butter", "No Salt", "No Pepper", "No Herbs"].map((ing) => {
              const isSelected = modalRemoved.includes(ing);
              return (
                <button
                  key={ing}
                  onClick={() => {
                    if (isSelected) {
                      setModalRemoved(modalRemoved.filter((i) => i !== ing));
                    } else {
                      setModalRemoved([...modalRemoved, ing]);
                    }
                  }}
                  className={`
                    px-4.5 py-2.5 rounded-full text-xs font-black uppercase border transition flex items-center gap-1.5 cursor-pointer
                    ${
                      isSelected
                        ? "bg-orange-500/10 text-orange-400 border-orange-500/40"
                        : "bg-zinc-900 border-zinc-855 text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  <span>{ing}</span>
                  {isSelected && <X className="h-3 w-3 stroke-[3px]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Instructions */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
            Special Instructions
          </h3>
          <textarea
            placeholder="Any special requests?"
            value={modalNote}
            onChange={(e) => setModalNote(e.target.value)}
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-855 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-orange-500 transition-colors resize-none"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-855">
          
          {/* Quantity selectors */}
          <div className="flex items-center space-x-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-1 shrink-0">
            <button
              onClick={() => setModalQty(Math.max(1, modalQty - 1))}
              className="h-9 w-9 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-black text-white px-2 w-5 text-center">
              {modalQty}
            </span>
            <button
              onClick={() => setModalQty(modalQty + 1)}
              className="h-9 w-9 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleConfirmAddToCart}
            className="flex-1 ml-4 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center justify-center space-x-1.5 transition-all shadow-lg shadow-orange-500/10 cursor-pointer"
          >
            <span>Add to Cart - £{modalTotal.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
