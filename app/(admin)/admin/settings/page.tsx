"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  Store,
  MapPin,
  Clock,
  Activity,
  X,
  CreditCard,
  Banknote,
  Percent,
  Settings as SettingsIcon,
  BellRing,
  AlertTriangle,
  Power,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Check,
  Edit2,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  User,
} from "lucide-react";
import AddUserWizard, { MODULE_LIST } from "@/components/settings/AddUserWizard";
import UserProfileView from "@/components/settings/UserProfileView";
import Image from "next/image";

type SystemTab = "Payment Settings" | "Notification Settings" | "User Roll Management";
type AccessLevel = "FULL" | "READ" | "NONE";

interface UserPermission {
  [moduleId: string]: AccessLevel;
}

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  branch: string;
  initials: string;
  isSaved: boolean;
  permissions: UserPermission;
}

const INITIAL_USERS: User[] = [
  { id: "1", name: "Afsana hamid mim", username: "afsana.mim", email: "afsana@example.com", phone: "088 4354 5669", role: "Super Admin", branch: "All", initials: "AH", isSaved: false, permissions: {} },
  { id: "2", name: "Nathana Reboucas", username: "nathana.r", email: "nathana@example.com", phone: "088 4354 5670", role: "Admin", branch: "All", initials: "NR", isSaved: false, permissions: {} },
  { id: "3", name: "Ethan Hu", username: "ethan.hu", email: "ethan@example.com", phone: "088 4354 5671", role: "Manager", branch: "All", initials: "EH", isSaved: false, permissions: {} },
  { id: "4", name: "Brock Wegner", username: "brock.w", email: "brock@example.com", phone: "088 4354 5672", role: "Staff", branch: "Eltham", initials: "BW", isSaved: false, permissions: {} },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SystemTab>("Payment Settings");
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  // Modals & Views State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  const handleCreateUser = (newUser: any) => {
    const createdUser: User = {
      id: Date.now().toString(),
      name: newUser.name || "Unknown User",
      username: newUser.username || "user",
      email: newUser.email || "",
      phone: newUser.phone || "",
      role: newUser.role || "Staff",
      branch: newUser.branch || "All",
      initials: (newUser.name || "U U").split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2),
      isSaved: false,
      permissions: newUser.permissions || {},
    };
    setUsers([...users, createdUser]);
    setIsAddUserModalOpen(false);
  };

  const handleSaveUser = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, isSaved: true } : u)));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  // If a user is being viewed, render the full-page User Profile view instead of Settings
  if (viewingUser) {
    return <UserProfileView user={viewingUser} onBack={() => setViewingUser(null)} />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
          Settings Management
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1 font-semibold">
          Manage System Settings Quickly and Efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Branch Management & System Settings */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          
          {/* 1. Branch Management Table Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
            <div className="mb-6">
              <h2 className="text-lg font-black text-white">Branch Management</h2>
              <p className="text-zinc-500 text-xs font-semibold mt-1">
                Add, edit and manage all branches from one place.
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search branch by name or ID..."
                  className="w-full bg-[#161618] border border-zinc-800 focus:border-zinc-700 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-white outline-none transition-colors"
                />
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                <div className="relative shrink-0">
                  <select className="appearance-none bg-[#161618] border border-zinc-800 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-zinc-300 outline-none hover:border-zinc-700 transition-colors cursor-pointer">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                </div>
                <div className="relative shrink-0">
                  <select className="appearance-none bg-[#161618] border border-zinc-800 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-zinc-300 outline-none hover:border-zinc-700 transition-colors cursor-pointer">
                    <option>All Cities</option>
                    <option>Woodstock</option>
                    <option>London</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-orange-500/50 hover:bg-orange-500/10 text-orange-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shrink-0">
                  <Plus className="h-4 w-4" />
                  <span>Add Branch</span>
                </button>
              </div>
            </div>

            {/* Table wrapper for horizontal scrolling on small screens */}
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-y border-zinc-800/80 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    <th className="py-4 font-black w-8">
                      <div className="h-4 w-4 rounded border border-zinc-700 bg-[#161618]" />
                    </th>
                    <th className="py-4">Branch ID</th>
                    <th className="py-4">Branch Name</th>
                    <th className="py-4 w-48">Address</th>
                    <th className="py-4">Phone</th>
                    <th className="py-4">Opening Hours</th>
                    <th className="py-4">Delivery Radius</th>
                    <th className="py-4">Min Order</th>
                    <th className="py-4">Tax Rate</th>
                    <th className="py-4">Status</th>
                    <th className="py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-xs font-semibold">
                  {[
                    { status: "Active" },
                    { status: "Active" },
                    { status: "Inactive" },
                    { status: "Active" },
                    { status: "Active" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#161618] transition-colors group">
                      <td className="py-4">
                        <div className="h-4 w-4 rounded border border-zinc-700 bg-[#161618] cursor-pointer" />
                      </td>
                      <td className="py-4 text-orange-500 font-bold">EL01</td>
                      <td className="py-4 text-zinc-300">Eltham-Led Office</td>
                      <td className="py-4 text-zinc-500 leading-tight">
                        <span className="line-clamp-2">7 Elm Street, Woodstock,<br />OX7 1ER</span>
                      </td>
                      <td className="py-4 text-zinc-500">+61 3 9123 4567</td>
                      <td className="py-4 text-zinc-300">10:00 AM - 11:00 PM</td>
                      <td className="py-4 text-zinc-300 text-center">6 KM</td>
                      <td className="py-4 text-zinc-300">£15.00</td>
                      <td className="py-4 text-zinc-300">£15.00</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          row.status === "Active" 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                            : "bg-red-500/10 border-red-500/20 text-red-500"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${row.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`} />
                          <span>{row.status}</span>
                        </span>
                      </td>
                      <td className="py-4 text-right text-zinc-600 group-hover:text-white transition-colors cursor-pointer">
                        <MoreVertical className="h-4 w-4 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-6 border-t border-zinc-800/80 text-xs font-semibold text-zinc-500 gap-4">
              <span>Showing 1 to 10 of 50 results</span>
              
              <div className="flex items-center space-x-1.5">
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-orange-500 text-orange-500 font-black">
                  1
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                  2
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                  3
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                  4
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                  5
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-[#161618] flex items-center justify-between min-w-[80px]">
                  <span>5/page</span>
                  <ChevronDown className="h-3.5 w-3.5 ml-2" />
                </span>
              </div>
            </div>

          </div>

          {/* 2. System Settings Tabs */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden min-h-[400px]">
            <div className="mb-6">
              <h2 className="text-lg font-black text-white">System Settings</h2>
              <p className="text-zinc-500 text-xs font-semibold mt-1">
                Configure global system preferences and integration's .
              </p>
            </div>

            {/* Tabs Header */}
            <div className="flex items-center space-x-6 border-b border-zinc-800/80 mb-6 relative">
              {(["Payment Settings", "Notification Settings", "User Roll Management"] as SystemTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-xs font-bold transition-colors relative ${
                    activeTab === tab ? "text-orange-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="animate-fadeIn">
              
              {/* Payment Settings Tab */}
              {activeTab === "Payment Settings" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                        {/* Mock Stripe Icon */}
                        <div className="h-6 w-6 rounded bg-[#635bff] text-white flex items-center justify-center font-black text-xs">S</div>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">Stripe (Card Payments)</h4>
                        <p className="text-xs text-zinc-500 font-semibold mt-0.5">Accept credit/debit card payments via Stripe</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-wider">
                        Enabled
                      </span>
                      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                        <Banknote className="h-5 w-5 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">Cash on Delivery</h4>
                        <p className="text-xs text-zinc-500 font-semibold mt-0.5">Accept cash payments on delivery</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-wider">
                        Enabled
                      </span>
                      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings Tab */}
              {activeTab === "Notification Settings" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors cursor-pointer group">
                    <span className="text-xs font-black text-white">Service Tax Rate</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs font-bold text-zinc-300">10%</span>
                      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors cursor-pointer group">
                    <span className="text-xs font-black text-white">Platform Commission</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs font-bold text-zinc-300">15%</span>
                      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
                    <span className="text-xs font-black text-white">Auto Accept Orders</span>
                    <div className="flex items-center space-x-4">
                      {/* Toggle Switch ON */}
                      <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-orange-500 focus:outline-none">
                        <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                      </button>
                      <ChevronRight className="h-4 w-4 text-zinc-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
                    <span className="text-xs font-black text-white">Low Stock Alerts</span>
                    <div className="flex items-center space-x-4">
                      {/* Toggle Switch ON */}
                      <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-orange-500 focus:outline-none">
                        <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                      </button>
                      <ChevronRight className="h-4 w-4 text-zinc-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
                    <span className="text-xs font-black text-white">Maintenance Mode</span>
                    <div className="flex items-center space-x-4">
                      {/* Toggle Switch OFF */}
                      <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-zinc-600 focus:outline-none">
                        <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                      </button>
                      <ChevronRight className="h-4 w-4 text-zinc-600" />
                    </div>
                  </div>
                </div>
              )}

              {/* User Roll Management Tab */}
              {activeTab === "User Roll Management" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setIsAddUserModalOpen(true)}
                      className="flex items-center space-x-2 px-4 py-2 border border-orange-500/50 hover:bg-orange-500/10 text-orange-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add User</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {users.map((user) => (
                      <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#161618] border border-zinc-800/80 rounded-2xl gap-4 group">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-[10px] font-black text-white uppercase shrink-0">
                            {user.initials}
                          </div>
                          <span className="text-xs font-black text-white">{user.name}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 sm:w-auto w-full">
                          <div className="relative flex-1 sm:w-48">
                            <select 
                              defaultValue={user.role}
                              className="appearance-none w-full bg-[#121214] border border-zinc-800 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-zinc-300 outline-none hover:border-zinc-700 transition-colors cursor-pointer"
                            >
                              <option value="Super Admin">Super Admin</option>
                              <option value="Admin">Admin</option>
                              <option value="Manager">Manager</option>
                              <option value="Staff">Staff</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                          </div>
                          
                          {/* Save Button changes to Eye when Saved */}
                          {user.isSaved ? (
                            <button 
                              onClick={() => setViewingUser(user)}
                              className="p-2 border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/50 rounded-xl transition-all shadow-[0_0_10px_rgba(59,130,246,0.1)] shrink-0"
                              title="View Profile"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleSaveUser(user.id)}
                              className="px-4 py-2 bg-[#121214] border border-zinc-800 hover:border-zinc-600 rounded-xl text-xs font-black text-zinc-300 transition-colors shrink-0"
                            >
                              Save
                            </button>
                          )}
                          
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Sidebars */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          
          {/* Branch Overview */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-sm font-black text-white mb-4">Branch Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl flex flex-col justify-between">
                <Store className="h-5 w-5 text-orange-500 mb-2" />
                <div>
                  <p className="text-[10px] font-bold text-zinc-500">Total Branches</p>
                  <p className="text-lg font-black text-white mt-0.5">24</p>
                  <p className="text-[10px] font-bold text-emerald-500 mt-0.5">5 Active</p>
                </div>
              </div>
              <div className="p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl flex flex-col justify-between">
                <MapPin className="h-5 w-5 text-orange-500 mb-2" />
                <div>
                  <p className="text-[10px] font-bold text-zinc-500">Total Cities</p>
                  <p className="text-lg font-black text-white mt-0.5">8</p>
                  <p className="text-[10px] font-bold text-zinc-500 mt-0.5">Across UK</p>
                </div>
              </div>
              <div className="p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl flex flex-col justify-between">
                <Activity className="h-5 w-5 text-orange-500 mb-2" />
                <div>
                  <p className="text-[10px] font-bold text-zinc-500">Avg. Delivery Radius</p>
                  <p className="text-lg font-black text-white mt-0.5">6.2 km</p>
                  <p className="text-[10px] font-bold text-zinc-500 mt-0.5">Across all branches</p>
                </div>
              </div>
              <div className="p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl flex flex-col justify-between">
                <Banknote className="h-5 w-5 text-orange-500 mb-2" />
                <div>
                  <p className="text-[10px] font-bold text-zinc-500">Avg. Min Order</p>
                  <p className="text-lg font-black text-white mt-0.5">$17.80</p>
                  <p className="text-[10px] font-bold text-zinc-500 mt-0.5">Across all branches</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-sm font-black text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { title: "Eltham branch updated", time: "May 07, 2026 10:30 AM" },
                { title: "Richmond branch settings changed", time: "May 07, 2026 10:30 AM" },
                { title: "Southbank branch activated", time: "May 07, 2026 10:30 AM" },
                { title: "Downtown branch details updated", time: "May 07, 2026 10:30 AM" }
              ].map((act, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-[#161618] border border-zinc-800/80 rounded-2xl">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Store className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white leading-tight">{act.title}</p>
                    <p className="text-[10px] font-bold text-zinc-500 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration's */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-sm font-black text-white mb-4">Integration's</h3>
            <div className="space-y-2 mb-4">
              {[
                { name: "Uber Eats", initial: "U", color: "bg-black text-white" },
                { name: "Just Eats", initial: "J", color: "bg-orange-600 text-white" },
                { name: "Deliveroo", initial: "D", color: "bg-[#00ccbc] text-white" },
              ].map((integ) => (
                <div key={integ.name} className="flex items-center justify-between p-3 bg-[#161618] border border-zinc-800/80 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className={`h-8 w-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${integ.color}`}>
                      {integ.initial}
                    </div>
                    <span className="text-xs font-black text-white">{integ.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-wider">
                      Connected
                    </span>
                    <ChevronRight className="h-4 w-4 text-zinc-600" />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 border border-orange-500/50 hover:bg-orange-500/10 text-orange-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              Manage Integrations
            </button>
          </div>

        </div>
      </div>
      {isAddUserModalOpen && (
        <AddUserWizard 
          onClose={() => setIsAddUserModalOpen(false)} 
          onConfirm={handleCreateUser} 
        />
      )}

    </div>
  );
}
