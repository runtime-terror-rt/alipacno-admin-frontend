"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Utensils,
  DollarSign,
  Check,
  ChevronLeft,
  Printer,
  Laptop,
  Smartphone,
  CreditCard,
  CheckCircle2,
  Truck,
  Heart,
  X
} from "lucide-react";
import { CartItem, Product, PRODUCTS } from "./data";

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [activeCategory, setActiveCategory] = useState("Steaks");
  const [orderType, setOrderType] = useState<
    "delivery" | "collection" | "dine_in" | "table"
  >("delivery");

  // Happy Hour Countdown timer
  const [timeLeft, setTimeLeft] = useState("03h : 22m : 31s");

  // Payment Processing Modal States
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<
    "select" | "cash" | "card" | "success"
  >("select");
  const [selectedMethod, setSelectedMethod] = useState<
    "cash" | "card" | "digital" | null
  >(null);

  // Cash payment variables
  const [amountReceived, setAmountReceived] = useState<string>("120");
  const [quickActive, setQuickActive] = useState<number | null>(20); // default matching user screenshot

  // Item detail configuration modal states
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState<string>("regular");
  const [modalCooking, setModalCooking] = useState<string>("Rare");
  const [modalSpice, setModalSpice] = useState<string>("Mild");
  const [modalToppings, setModalToppings] = useState<string[]>(["truffle"]);
  const [modalExtras, setModalExtras] = useState<string[]>([]);
  const [modalRemoved, setModalRemoved] = useState<string[]>(["No Pepper"]);
  const [modalNote, setModalNote] = useState<string>("");
  const [modalQty, setModalQty] = useState<number>(1);

  // Reset modal state on select
  useEffect(() => {
    if (selectedDetailProduct) {
      setModalSize("regular");
      setModalCooking("Rare");
      setModalSpice("Mild");
      setModalToppings(["truffle"]);
      setModalExtras([]);
      setModalRemoved(["No Pepper"]);
      setModalNote("");
      setModalQty(1);
    }
  }, [selectedDetailProduct]);

  // Dynamic calculated item configuration total in modal
  const modalTotal = selectedDetailProduct
    ? (selectedDetailProduct.price +
       (modalSize === "medium" ? 4 : modalSize === "large" ? 8 : 0) +
       modalToppings.length * 4 +
       modalExtras.length * 4) * modalQty
    : 0;

  useEffect(() => {
    // Basic countdown simulation
    const interval = setInterval(() => {
      const parts = timeLeft.split(" : ");
      let h = parseInt(parts[0]);
      let m = parseInt(parts[1]);
      let s = parseInt(parts[2]);

      if (s > 0) s--;
      else {
        s = 59;
        if (m > 0) m--;
        else {
          m = 59;
          if (h > 0) h--;
        }
      }

      const pad = (n: number) => n.toString().padStart(2, "0");
      setTimeLeft(`${pad(h)}h : ${pad(m)}m : ${pad(s)}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Cart helper functions
  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.product.id === product.id && item.option === "Medium Rare, Bone Marrow Butter");
    if (existing) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id && item.option === "Medium Rare, Bone Marrow Butter"
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        { product, quantity: 1, option: "Medium Rare, Bone Marrow Butter" },
      ]);
    }
  };

  // Add highly detailed custom configured item from modal pop-up to cart
  const handleAddConfiguredToCart = () => {
    if (!selectedDetailProduct) return;
    
    // Build options string exactly matching selected options
    const optionsArray = [];
    optionsArray.push(`Size: ${modalSize.charAt(0).toUpperCase() + modalSize.slice(1)}`);
    optionsArray.push(`Cooking: ${modalCooking}`);
    optionsArray.push(`Spice: ${modalSpice}`);
    
    if (modalToppings.length > 0) {
      const topLabels = modalToppings.map(t => {
        if (t === "truffle") return "Truffle Butter";
        if (t === "foie") return "Foie Gras";
        if (t === "bacon") return "Crispy Bacon";
        if (t === "egg") return "Fried Egg";
        return t;
      });
      optionsArray.push(`Toppings: ${topLabels.join(", ")}`);
    }

    if (modalExtras.length > 0) {
      const extLabels = modalExtras.map(e => {
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
    const singleUnitPrice = selectedDetailProduct.price + 
      (modalSize === "medium" ? 4 : modalSize === "large" ? 8 : 0) + 
      modalToppings.length * 4 + 
      modalExtras.length * 4;

    const existing = cart.find(
      (item) => item.product.id === selectedDetailProduct.id && item.option === optionsStr
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.product.id === selectedDetailProduct.id && item.option === optionsStr
            ? { ...item, quantity: item.quantity + modalQty }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          product: selectedDetailProduct,
          quantity: modalQty,
          option: optionsStr,
          customPrice: singleUnitPrice
        }
      ]);
    }

    setSelectedDetailProduct(null);
  };

  const updateQuantity = (productId: string, optionStr: string, delta: number) => {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.product.id === productId && item.option === optionStr) {
              const newQty = item.quantity + delta;

              // remove item if quantity becomes 0
              if (newQty <= 0) return null;

              return {
                ...item,
                quantity: newQty,
              };
            }

            return item;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  // Calculations: Fully dynamic based on customPrice or base product price!
  const subtotal = cart.reduce((acc, curr) => acc + (curr.customPrice || curr.product.price) * curr.quantity, 0);
  const vat = 2.0;
  const total = subtotal;

  // Handle Checkout Click
  const handleProceedCheckout = () => {
    if (cart.length === 0) {
      alert("Your order cart is empty!");
      return;
    }
    setPaymentStep("select");
    setIsPaymentOpen(true);
  };

  // Cash amount quick buttons helper
  const handleQuickCash = (val: number) => {
    setQuickActive(val);
    setAmountReceived(val.toString());
  };

  const parsedReceived = parseFloat(amountReceived) || 0;
  const changeDue = Math.max(0, parsedReceived - total);

  // Trigger simulated card processing
  const handleCardSelect = () => {
    setSelectedMethod("card");
    setPaymentStep("card");
    setTimeout(() => {
      setPaymentStep("success");
    }, 2000);
  };

  // Finalize order
  const handleCompleteOrder = () => {
    setCart([]);
    setIsPaymentOpen(false);
    alert("Order #6829 sent successfully to kitchen display terminal (KDS)!");
  };

  return (
    <div className="space-y-6  relative animate-fadeIn">
      {/* Happy Hour Promo Timer and Selection Pills */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 border-b border-zinc-800/40 pb-5">
        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            "Steaks",
            "Starters",
            "Sides",
            "Drinks",
            "Desserts",
            "Lunch Special",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer
                ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-500/10"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Products on Left, Cart on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CATALOG PANEL (8 Cols) */}
        <div
          className={`space-y-6 transition-all duration-300 ${
            cart.length > 0 ? "lg:col-span-8" : "lg:col-span-12"
          }`}
        >
          {/* Happy Hour Timer Promo Banner */}
          <div className="bg-orange-500/5 border border-orange-500/15 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="h-10 w-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20 text-orange-500 font-bold">
                %
              </div>
              
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-base font-bold text-zinc-400">Happy Hour pricing:</span>
              <span className="text-sm font-black text-orange-500 py-1.5 rounded-lg">
                {timeLeft}
              </span>
              <span className="text-[10px] font-black uppercase bg-orange-500 text-white px-2 py-1 rounded-md shadow-sm">
                35% OFF
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Most popular Steaks
            </h3>
            <button className="text-xs font-bold text-zinc-400 hover:text-white px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl">
              Sort by Popular
            </button>
          </div>

          {/* Steaks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {PRODUCTS.map((prod) => {
              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedDetailProduct(prod)}
                  className={` rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden
                    hover:bg-zinc-900/70 cursor-pointer
                  `}
                >
                  {/* Product Card Image Container */}
                  <div className="relative w-full h-40 bg-zinc-900 rounded-xl overflow-hidden mb-4 border border-zinc-800">
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />

                    {/* Star Rating Badge */}
                    <span className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[9px] font-extrabold text-orange-400 flex items-center">
                      ★ {prod.rating}
                    </span>

                    {/* Floating Heart Favorite Badge (Row 2 and Row 3) */}
                    {parseInt(prod.id) > 4 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); }}
                        className="absolute top-2.5 right-2.5 z-20 h-6.5 w-6.5 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-red-500 transition-colors"
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </button>
                    )}

                    {/* Render exact food image asset from public folder */}
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {prod.name}
                    </h4>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-sm font-black text-orange-500">
                        £{prod.price}
                      </span>
                      <span className="text-[10px] font-medium text-zinc-500 line-through">
                        £{prod.originalPrice}
                      </span>
                      <span className="text-[9px] font-bold text-zinc-400">
                        /portion
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(prod);
                    }}
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center space-x-1 shadow-md shadow-orange-500/5 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add to cart</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ORDER CARTS PANEL */}
        {cart.length > 0 && (
          <div className="lg:col-span-4">
            <div className="bg-[#16161A] border border-zinc-800 rounded-3xl p-5 h-full flex flex-col justify-between">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-white" />
                    <h3 className="text-white font-semibold text-sm">
                      Order Carts
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                    {cart.length} ITEMS
                  </span>
                </div>

                {/* Cart Items */}
                <div className="mt-5 space-y-5">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 items-start"
                    >
                      {/* Image */}
                      <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <h4 className="text-white text-sm font-semibold leading-tight">
                            {item.product.name}
                          </h4>

                          <span className="text-orange-500 text-sm font-bold">
                            £{((item.customPrice || item.product.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <p className="text-[11px] text-zinc-500 mt-1 truncate">
                          {item.option}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.option, -1)}
                            className="h-6 w-6 rounded-md border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 transition"
                          >
                            <Minus className="h-3 w-3" />
                          </button>

                          <span className="text-white text-sm font-medium w-3 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.product.id, item.option, 1)}
                            className="h-6 w-6 rounded-md border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 transition"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Summary */}
              <div className="mt-8 border-t border-zinc-800 pt-5">
                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-white">£{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>Delivery fee</span>
                    <span className="text-white">Free</span>
                  </div>

                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>Incl. VAT</span>
                    <span className="text-white">£{vat.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-zinc-800">
                    <span className="text-white text-2xl font-semibold">
                      Total
                    </span>

                    <span className="text-orange-500 text-3xl font-black">
                      £{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Order Type */}
                <div className="mt-7">
                  <h4 className="text-white font-semibold text-lg mb-4">
                    Order Type
                  </h4>

                  <div className="grid grid-cols-4 gap-3">
                    {[
                      {
                        id: "delivery",
                        label: "Delivery",
                        icon: Truck,
                      },
                      {
                        id: "collection",
                        label: "Collection",
                        icon: ShoppingBag,
                      },
                      {
                        id: "dine_in",
                        label: "Dine-In",
                        icon: Utensils,
                      },
                      {
                        id: "table",
                        label: "Table Order",
                        icon: Laptop,
                      },
                    ].map((type) => {
                      const Icon = type.icon;
                      const isActive = orderType === type.id;

                      return (
                        <button
                          key={type.id}
                          onClick={() => setOrderType(type.id as any)}
                          className={`relative rounded-2xl p-3 h-24 flex flex-col items-center justify-center transition-all border
                  ${
                    isActive
                      ? "bg-orange-500/10 border-orange-500"
                      : "bg-zinc-800/60 border-zinc-700"
                  }`}
                        >
                          {isActive && (
                            <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-orange-500" />
                          )}

                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center mb-2
                    ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "bg-zinc-700 text-zinc-300"
                    }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          <span className="text-[11px] text-white font-medium text-center leading-tight">
                            {type.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full mt-7 bg-orange-500 hover:bg-orange-600 transition-all rounded-full py-4 text-white font-bold text-sm"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CHECKOUT WIZARD PAYMENTS MODAL */}
      {isPaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPaymentOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#161618] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-scaleUp">
            {/* Header title */}
            <div className="p-5 border-b border-zinc-800/40 flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Payment Processing
              </h3>
              <button
                onClick={() => setIsPaymentOpen(false)}
                className="h-7 w-7 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* STEP 1: PAYMENT METHOD SELECT */}
            {paymentStep === "select" && (
              <div className="p-6 space-y-6">
                <div className="bg-zinc-900/60 border border-zinc-850 rounded-xl p-5 text-center space-y-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Total Amount
                  </span>
                  <p className="text-3xl font-black text-orange-500">
                    £{total.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                    Select Payment Method
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Cash Select */}
                    <button
                      onClick={() => setPaymentStep("cash")}
                      className="p-5 bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 hover:bg-zinc-850 rounded-xl flex flex-col items-center justify-center text-center space-y-3 transition-all group cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/25 group-hover:scale-110 transition-transform">
                        <DollarSign className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white">
                          Cash
                        </span>
                        <span className="text-[9px] text-zinc-500 font-semibold">
                          Instant Change
                        </span>
                      </div>
                    </button>

                    {/* Card Terminal Select */}
                    <button
                      onClick={handleCardSelect}
                      className="p-5 bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 hover:bg-zinc-850 rounded-xl flex flex-col items-center justify-center text-center space-y-3 transition-all group cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/25 group-hover:scale-110 transition-transform">
                        <CreditCard className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white">
                          Card
                        </span>
                        <span className="text-[9px] text-zinc-500 font-semibold">
                          Stripe Terminal
                        </span>
                      </div>
                    </button>

                    {/* Digital Pay Select */}
                    <button
                      onClick={() => {
                        setSelectedMethod("digital");
                        setPaymentStep("card");
                        setTimeout(() => setPaymentStep("success"), 2000);
                      }}
                      className="p-5 bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 hover:bg-zinc-850 rounded-xl flex flex-col items-center justify-center text-center space-y-3 transition-all group cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/25 group-hover:scale-110 transition-transform">
                        <Smartphone className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white">
                          Digital
                        </span>
                        <span className="text-[9px] text-zinc-500 font-semibold">
                          Apple/Google Pay
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: CASH BILL INPUT SCREEN */}
            {paymentStep === "cash" && (
              <div className="p-6 space-y-5">
                <div className="bg-zinc-900/60 border border-zinc-850 rounded-xl p-5 text-center relative">
                  <button
                    onClick={() => setPaymentStep("select")}
                    className="absolute top-4 left-4 text-[10px] font-bold text-orange-500 hover:text-orange-400 flex items-center space-x-1 cursor-pointer"
                  >
                    <ChevronLeft className="h-3 w-3" />
                    <span>Change Payment Method</span>
                  </button>

                  <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-3">
                    Total Amount
                  </span>
                  <p className="text-3xl font-black text-orange-500">
                    £{total.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Amount Received
                    </label>
                    <input
                      type="text"
                      value={amountReceived}
                      onChange={(e) => setAmountReceived(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-base font-extrabold text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 50, 100].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleQuickCash(val)}
                        className={`
                          py-2 rounded-xl text-xs font-black border transition-all cursor-pointer
                          ${
                            quickActive === val
                              ? "bg-orange-500/10 border-orange-500 text-orange-500 shadow-md"
                              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                          }
                        `}
                      >
                        £{val}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setQuickActive(null);
                      setAmountReceived(total.toFixed(2));
                    }}
                    className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Exact Amount (£{total.toFixed(2)})
                  </button>
                </div>

                <div className="p-4 bg-zinc-900/40 border border-zinc-850 rounded-xl flex justify-between items-center">
                  <span className="text-xs text-zinc-400 font-semibold">
                    Change Due:
                  </span>
                  <span
                    className={`text-lg font-black ${parsedReceived >= total ? "text-emerald-500" : "text-amber-500"}`}
                  >
                    {parsedReceived >= total
                      ? `£${changeDue.toFixed(2)}`
                      : "Insufficient Cash"}
                  </span>
                </div>

                <button
                  onClick={() => setPaymentStep("success")}
                  disabled={parsedReceived < total}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:hover:bg-orange-500 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg shadow-orange-500/10 transition-all text-center cursor-pointer"
                >
                  Complete Cash Payment
                </button>
              </div>
            )}

            {/* STEP 3: CARD TERMINAL AUTHORIZING */}
            {paymentStep === "card" && (
              <div className="p-6 text-center space-y-6">
                <div className="bg-zinc-900/60 border border-zinc-850 rounded-xl p-5 text-center">
                  <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Total Amount
                  </span>
                  <p className="text-2xl font-black text-white">
                    £{total.toFixed(2)}
                  </p>
                </div>

                <div className="py-8 flex flex-col items-center justify-center space-y-4">
                  <div className="h-16 w-16 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
                  <div>
                    <p className="text-sm font-extrabold text-white">
                      Waiting for Stripe terminal...
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Please tap, insert, or swipe card on reader device
                    </p>
                  </div>
                </div>

                <div className="flex justify-center space-x-2 text-xs text-zinc-500">
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md">
                    USB Connect
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-md">
                    Online
                  </span>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS VIEW */}
            {paymentStep === "success" && (
              <div className="p-6 text-center space-y-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/25 rounded-full flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-black text-white">
                    Payment Successful!
                  </h4>
                  <p className="text-xs text-zinc-400">Order #6829 completed</p>
                </div>

                <div className="p-5 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl max-w-sm mx-auto space-y-1">
                  <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest">
                    Change Due
                  </span>
                  <p className="text-3xl font-black text-emerald-500">
                    £{changeDue.toFixed(2)}
                  </p>
                </div>

                <div className="flex space-x-3.5 pt-4">
                  <button
                    onClick={() => alert("Receipt printed successfully.")}
                    className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/10 transition-all cursor-pointer"
                  >
                    Complete Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ITEM DETAIL CONFIGURATION MODAL */}
      {selectedDetailProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#18181A] border border-zinc-850 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row gap-5 relative">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDetailProduct(null)}
                className="absolute top-0 right-0 h-8 w-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition border border-zinc-800 cursor-pointer z-10"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Left Food Image */}
              <div className="relative w-full sm:w-56 h-40 rounded-2xl overflow-hidden shrink-0 border border-zinc-850">
                {/* Rating pill */}
                <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-black text-orange-400">
                  ★ {selectedDetailProduct.rating}
                </span>
                {/* Heart fav */}
                <button className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-red-500 transition border border-zinc-800/40">
                  <Heart className="h-4 w-4" />
                </button>
                <Image 
                  src={selectedDetailProduct.image} 
                  alt={selectedDetailProduct.name} 
                  fill 
                  className="object-cover" 
                />
              </div>

              {/* Right Details */}
              <div className="space-y-2.5 flex-1 pr-8">
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedDetailProduct.name}
                </h2>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold text-zinc-400">
                  <span>Distance: 2.3 km</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                  <span>Estimated Time: <span className="text-orange-500">25–30 mins</span></span>
                </div>

                <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                  Premium center-cut filet mignon grilled to perfection with garlic herb butter. Tender, juicy, and rich in flavor.
                </p>

                <div className="text-2xl font-black text-orange-500 pt-1">
                  £{selectedDetailProduct.price.toFixed(2)}
                </div>
              </div>

            </div>

            {/* Choose Size */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Choose Size</h3>
                <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[9px] font-black uppercase">Required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "regular", label: "Regular", sub: "5-inch", add: 0 },
                  { id: "medium", label: "Medium", sub: "8-inch", add: 4 },
                  { id: "large", label: "Large", sub: "12-inch", add: 8 }
                ].map((size) => {
                  const isSelected = modalSize === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setModalSize(size.id)}
                      className={`
                        w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center
                        ${isSelected
                          ? "bg-gradient-to-r from-[#FE5000]/10 to-[#FF8C00]/5 border-[#FE5000]/40 text-white"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                        }
                      `}
                    >
                      <div>
                        <span className="block text-sm font-black text-white">{size.label}</span>
                        <span className="block text-[10px] text-zinc-500 mt-0.5 font-bold">
                          {size.sub} {size.add > 0 && <span className="text-orange-500/80">+{size.add.toFixed(2)}</span>}
                        </span>
                      </div>

                      <div className={`
                        h-5 w-5 rounded-full flex items-center justify-center border
                        ${isSelected 
                          ? "bg-orange-500 border-orange-600 text-white" 
                          : "border-zinc-700 bg-transparent"
                        }
                      `}>
                        {isSelected && <Check className="h-3 w-3 stroke-[3px]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cooking Preference */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Cooking Preference</h3>
              <div className="flex flex-wrap gap-2.5">
                {["Rare", "Medium-Rare", "Medium", "Medium-Well", "Well-Done"].map((pref) => {
                  const isSelected = modalCooking === pref;
                  return (
                    <button
                      key={pref}
                      onClick={() => setModalCooking(pref)}
                      className={`
                        px-4.5 py-2 rounded-full text-xs font-black uppercase border transition cursor-pointer
                        ${isSelected
                          ? "bg-orange-500/10 text-orange-400 border-orange-500/40"
                          : "bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white"
                        }
                      `}
                    >
                      {pref}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spice Level */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Spice Level</h3>
              <div className="flex flex-wrap gap-2.5">
                {["Mild", "Medium", "Hot"].map((spice) => {
                  const isSelected = modalSpice === spice;
                  return (
                    <button
                      key={spice}
                      onClick={() => setModalSpice(spice)}
                      className={`
                        px-4.5 py-2 rounded-full text-xs font-black uppercase border transition cursor-pointer
                        ${isSelected
                          ? "bg-orange-500/10 text-orange-450 border-orange-500/40"
                          : "bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white"
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
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Modify Toppings</h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { id: "truffle", label: "Truffle Butter", add: 4 },
                  { id: "foie", label: "Foie Gras", add: 4 },
                  { id: "bacon", label: "Crispy Bacon", add: 4 },
                  { id: "egg", label: "Fried Egg", add: 4 }
                ].map((top) => {
                  const isSelected = modalToppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      onClick={() => {
                        if (isSelected) {
                          setModalToppings(modalToppings.filter(t => t !== top.id));
                        } else {
                          setModalToppings([...modalToppings, top.id]);
                        }
                      }}
                      className={`
                        px-4.5 py-2.5 rounded-full text-xs font-black uppercase border transition cursor-pointer
                        ${isSelected
                          ? "bg-orange-500/10 text-orange-450 border-orange-500/40"
                          : "bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white"
                        }
                      `}
                    >
                      {top.label} <span className="text-[10px] text-zinc-550 ml-1">+{top.add.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add Extras */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Add Extras</h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { id: "garlic", label: "Garlic Bread", add: 4 },
                  { id: "sauce", label: "Béarnaise Sauce", add: 4 },
                  { id: "lobster", label: "Lobster Tail", add: 4 },
                  { id: "mash", label: "Mashed Potatoes", add: 4 },
                  { id: "fries", label: "French Fries", add: 4 }
                ].map((ext) => {
                  const isSelected = modalExtras.includes(ext.id);
                  return (
                    <button
                      key={ext.id}
                      onClick={() => {
                        if (isSelected) {
                          setModalExtras(modalExtras.filter(e => e !== ext.id));
                        } else {
                          setModalExtras([...modalExtras, ext.id]);
                        }
                      }}
                      className={`
                        px-4.5 py-2.5 rounded-full text-xs font-black uppercase border transition cursor-pointer
                        ${isSelected
                          ? "bg-orange-500/10 text-orange-450 border-orange-500/40"
                          : "bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white"
                        }
                      `}
                    >
                      {ext.label} <span className="text-[10px] text-zinc-550 ml-1">+{ext.add.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Remove Ingredients */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Remove Ingredients</h3>
              <div className="flex flex-wrap gap-2.5">
                {["No Butter", "No Salt", "No Pepper", "No Herbs"].map((ing) => {
                  const isSelected = modalRemoved.includes(ing);
                  return (
                    <button
                      key={ing}
                      onClick={() => {
                        if (isSelected) {
                          setModalRemoved(modalRemoved.filter(i => i !== ing));
                        } else {
                          setModalRemoved([...modalRemoved, ing]);
                        }
                      }}
                      className={`
                        px-4.5 py-2.5 rounded-full text-xs font-black uppercase border transition flex items-center gap-1.5 cursor-pointer
                        ${isSelected
                          ? "bg-orange-500/10 text-orange-400 border-orange-500/40"
                          : "bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white"
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
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Special Instructions</h3>
              <textarea
                placeholder="Any special requests?"
                value={modalNote}
                onChange={(e) => setModalNote(e.target.value)}
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-850 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-850">
              
              {/* Quantity selectors */}
              <div className="flex items-center space-x-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-1 shrink-0">
                <button 
                  onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                  className="h-9 w-9 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-black text-white px-2 w-5 text-center">{modalQty}</span>
                <button 
                  onClick={() => setModalQty(modalQty + 1)}
                  className="h-9 w-9 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddConfiguredToCart}
                className="flex-1 ml-4 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center justify-center space-x-1.5 transition-all shadow-lg shadow-orange-500/10 cursor-pointer"
              >
                <span>Add to Cart - £{modalTotal.toFixed(2)}</span>
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
