import {
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Check,
  Edit2,
  Bell,
  Store,
  AlertTriangle,
  Car,
  FileText,
  Calendar,
  ChevronLeft
} from "lucide-react";
import Image from "next/image";

// Reusable Switch Component for settings
const ToggleSwitch = ({ active }: { active: boolean }) => (
  <button className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${active ? "bg-orange-500" : "bg-zinc-600"}`}>
    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${active ? "translate-x-5" : "translate-x-0"}`} />
  </button>
);

export default function UserProfileView({ user, onBack }: { user: any, onBack: () => void }) {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Top Navigation */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-2 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
            {user?.name || "Jesse Hayden"}
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1 font-semibold">
            Manage User Profile and Preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-sm font-black text-white">Admin Profile</h2>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-zinc-700 hover:bg-zinc-800 text-white rounded-lg text-[10px] font-bold transition-colors">
                  <Edit2 className="h-3 w-3 text-orange-500" />
                  <span>Edit Profile</span>
                </button>
                <button className="p-1.5 border border-zinc-700 hover:bg-zinc-800 text-white rounded-lg transition-colors">
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-zinc-800 bg-zinc-900 shrink-0">
                <div className="h-full w-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-2xl font-black text-white uppercase">
                  {user?.initials || "JH"}
                </div>
              </div>
              <div className="text-center sm:text-left flex-1 space-y-2.5">
                <div>
                  <h3 className="text-lg font-black text-white leading-tight">{user?.name || "Jesse Hayden"}</h3>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded text-[9px] font-black uppercase text-orange-500 tracking-widest">
                    {user?.role || "SUPER ADMIN"}
                  </span>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center sm:justify-start space-x-2 text-[11px] text-zinc-400 font-semibold">
                    <Mail className="h-3 w-3 text-orange-500" />
                    <span>{user?.email || "debra.holt@example.com"}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 text-[11px] text-zinc-400 font-semibold">
                    <Phone className="h-3 w-3 text-orange-500" />
                    <span>{user?.phone || "(555) 123-4567"}</span>
                  </div>
                  <div className="flex items-start justify-center sm:justify-start space-x-2 text-[11px] text-zinc-400 font-semibold">
                    <MapPin className="h-3 w-3 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-left">NW1 6XE, London, 221B Baker Street, Marylebone</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-5 border-t border-zinc-800/80">
              <div className="text-center">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">LAST LOGIN</p>
                <p className="text-[10px] font-bold text-white">MAY 07, 2024 10:30 AM</p>
              </div>
              <div className="text-center border-l border-zinc-800/80">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">ACCOUNT STATUS</p>
                <div className="flex items-center justify-center space-x-1 text-[10px] font-bold text-emerald-500 uppercase">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>ACTIVE</span>
                </div>
              </div>
              <div className="text-center border-l border-zinc-800/80">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">2FA STATUS</p>
                <div className="flex items-center justify-center space-x-1 text-[10px] font-bold text-emerald-500 uppercase">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span>ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Role & Permissions Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-lg font-black text-white mb-6">Role & Permissions</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">ROLE</p>
                <h3 className="text-base font-bold text-white">{user?.role || "Super Admin"}</h3>
                <span className="inline-block mt-2 px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded text-[9px] font-black uppercase text-orange-500 tracking-widest">
                  FULL ACCESS
                </span>
              </div>

              <div>
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">DESCRIPTION</p>
                <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                  Full system access with complete control over all modules and settings.
                </p>
              </div>

              <div>
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3">MODULE ACCESS</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Dashboard", "Orders", "CRM", "Deliveries", 
                    "Drivers", "Staff", "Inventory", "Menu", 
                    "Marketing", "Signage", "Settings", "Reports",
                    "Billing", "Integrations"
                  ].map((mod) => (
                    <div key={mod} className="flex items-center space-x-2 bg-[#161618] border border-zinc-800 rounded-lg px-2 py-1.5">
                      <div className="h-3 w-3 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                        <Check className="h-2 w-2 text-[#121214] stroke-[3]" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-300">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connected Integrations Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black text-white">Connected Integrations</h2>
              <button className="px-3 py-1.5 border border-zinc-700 hover:bg-zinc-800 text-white rounded-lg text-[10px] font-bold transition-colors">
                Manage Integrations
              </button>
            </div>

            <div className="space-y-4">
              {[
                { name: "Uber Eats", color: "bg-black text-white" },
                { name: "Deliveroo", color: "bg-[#00ccbc] text-white" },
                { name: "Stripe", color: "bg-gradient-to-r from-blue-500 to-purple-500 text-white" },
                { name: "Twilio (SMS)", color: "bg-red-500 text-white" },
                { name: "Google Maps", color: "bg-white text-blue-500" },
              ].map((intg, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-black text-xs ${intg.color} shrink-0`}>
                      {intg.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-white">{intg.name}</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Connected
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full pointer-events-none group-hover:bg-orange-500/30 transition-all" />
              <Store className="h-5 w-5 text-orange-500 mb-3" />
              <p className="text-[11px] font-bold text-white">Managed Branches</p>
              <p className="text-xl font-black text-orange-500 mt-1 mb-3">24</p>
              <div className="flex items-center space-x-2 text-[10px] font-bold text-zinc-500">
                <span className="text-emerald-500 flex items-center">
                  ↗ 25% of active
                </span>
                <span className="pl-2 border-l border-zinc-700">vs last period</span>
              </div>
            </div>

            <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full pointer-events-none group-hover:bg-orange-500/30 transition-all" />
              <Store className="h-5 w-5 text-orange-500 mb-3" />
              <p className="text-[11px] font-bold text-white">Active Staff</p>
              <p className="text-xl font-black text-orange-500 mt-1 mb-3">156</p>
              <div className="flex items-center space-x-2 text-[10px] font-bold text-zinc-500">
                <span className="text-emerald-500 flex items-center">
                  ↗ 25% of active
                </span>
                <span className="pl-2 border-l border-zinc-700">vs last period</span>
              </div>
            </div>

            <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full pointer-events-none group-hover:bg-orange-500/30 transition-all" />
              <Store className="h-5 w-5 text-orange-500 mb-3" />
              <p className="text-[11px] font-bold text-white">Total Revenue Access</p>
              <p className="text-xl font-black text-orange-500 mt-1 mb-3">156</p>
              <div className="flex items-center space-x-2 text-[10px] font-bold text-zinc-500">
                <span className="text-emerald-500 flex items-center">
                  ↗ 25% of active
                </span>
                <span className="pl-2 border-l border-zinc-700">vs last period</span>
              </div>
            </div>
          </div>

          {/* Activity Timeline Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h2 className="text-lg font-black text-white mb-8">Activity Timeline</h2>
            
            <div className="relative border-l border-zinc-800 ml-3 space-y-8 pb-4">
              {[
                { title: "You updated Richmond branch settir", date: "May 07, 2024 10:30 AM" },
                { title: "Approved manager access for John Sm", date: "May 06, 2024 04:15 PM" },
                { title: "Created new marketing campaign \"Weekend O", date: "May 05, 2024 02:45 PM" },
                { title: "Exported revenue report for April 20", date: "May 05, 2024 11:20 AM" },
                { title: "Changed system notification settir", date: "May 05, 2024 09:10 AM" },
                { title: "Added new admin user: Sarah Johns", date: "May 04, 2024 05:30 PM" },
                { title: "Updated delivery radius for 3 branc!", date: "May 04, 2024 03:25 PM" }
              ].map((activity, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-orange-500 ring-4 ring-[#121214]" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                    <p className="text-xs font-bold text-white">{activity.title}</p>
                    <span className="text-[10px] text-zinc-500 font-bold">{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Preferences Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h2 className="text-lg font-black text-white mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              {[
                { icon: Bell, title: "Order Alerts", desc: "Order Alerts", active: true },
                { icon: Store, title: "Branch Alerts", desc: "(SMS, Email)", active: false },
                { icon: AlertTriangle, title: "Low Stock Alerts", desc: "(Email)", active: true },
                { icon: Car, title: "Driver Accidents", desc: "(SMS, Email)", active: true },
                { icon: FileText, title: "Marketing Reports", desc: "(Email)", active: true },
                { icon: Calendar, title: "Daily Summary", desc: "(Email)", active: false },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#161618] border border-zinc-800/80 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-xl border border-zinc-800 bg-[#121214] flex items-center justify-center shrink-0">
                      <pref.icon className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{pref.title}</p>
                      <p className="text-[10px] font-semibold text-zinc-500 mt-0.5">{pref.desc}</p>
                    </div>
                  </div>
                  <ToggleSwitch active={pref.active} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
