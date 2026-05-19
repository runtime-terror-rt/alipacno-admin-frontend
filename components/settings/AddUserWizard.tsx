import { useState } from "react";
import { Eye, EyeOff, X, Check, ChevronRight, ChevronDown, Edit2, ImageIcon } from "lucide-react";

export const MODULE_LIST = [
  { id: "dashboard", name: "Dashboard", desc: "View dashboard and analytics" },
  { id: "orders", name: "Orders", desc: "View and manage orders" },
  { id: "deliveries", name: "Deliveries", desc: "View and manage deliveries" },
  { id: "crm", name: "CRM", desc: "View and manage customers" },
  { id: "staff", name: "Staff", desc: "View and manage staff" },
  { id: "inventory", name: "Inventory", desc: "View and manage inventory" },
  { id: "menu", name: "Menu", desc: "View and manage menu items" },
  { id: "marketing", name: "Marketing", desc: "Access marketing tools" },
  { id: "reports", name: "Reports", desc: "View and export reports" },
  { id: "settings", name: "Settings", desc: "Access system settings" },
];

export default function AddUserWizard({ 
  onClose, 
  onConfirm 
}: { 
  onClose: () => void, 
  onConfirm: (user: any) => void 
}) {
  const [addUserStep, setAddUserStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  
  const [newUser, setNewUser] = useState<any>({
    name: "",
    username: "",
    email: "",
    phone: "",
    role: "Manager",
    branch: "All",
    permissions: MODULE_LIST.reduce((acc, mod) => ({ ...acc, [mod.id]: "NONE" }), {}),
  });

  const updateNewUserPermission = (moduleId: string, level: string) => {
    setNewUser((prev: any) => ({
      ...prev,
      permissions: {
        ...(prev.permissions || {}),
        [moduleId]: level,
      },
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#1a1a1c] border border-zinc-800 rounded-3xl shadow-2xl relative my-8">
        <div className="p-6 border-b border-zinc-800/80 flex justify-between items-center sticky top-0 bg-[#1a1a1c] z-10 rounded-t-3xl">
          <h2 className="text-lg font-black text-white">Add New User</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard Stepper Header */}
        <div className="flex items-center justify-center space-x-4 py-8 border-b border-zinc-800/60 bg-[#121214]">
          {/* Step 1 */}
          <div className="flex items-center space-x-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
              addUserStep > 1 ? "bg-emerald-500 text-white" : addUserStep === 1 ? "bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "bg-zinc-800 text-zinc-500"
            }`}>
              {addUserStep > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <span className={`text-xs font-black ${addUserStep >= 1 ? (addUserStep > 1 ? "text-emerald-500" : "text-orange-500") : "text-zinc-500"}`}>
              User Information
            </span>
          </div>
          <div className={`w-16 h-0.5 ${addUserStep > 1 ? "bg-emerald-500/50" : "bg-zinc-800"}`} />
          
          {/* Step 2 */}
          <div className="flex items-center space-x-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
              addUserStep > 2 ? "bg-emerald-500 text-white" : addUserStep === 2 ? "bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "bg-zinc-800 text-zinc-500"
            }`}>
              {addUserStep > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <span className={`text-xs font-black ${addUserStep >= 2 ? (addUserStep > 2 ? "text-emerald-500" : "text-orange-500") : "text-zinc-500"}`}>
              Roll & Permissions
            </span>
          </div>
          <div className={`w-16 h-0.5 ${addUserStep > 2 ? "bg-emerald-500/50" : "bg-zinc-800"}`} />

          {/* Step 3 */}
          <div className="flex items-center space-x-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
              addUserStep === 3 ? "bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "bg-zinc-800 text-zinc-500"
            }`}>
              3
            </div>
            <span className={`text-xs font-black ${addUserStep === 3 ? "text-orange-500" : "text-zinc-500"}`}>
              Review & Confirm
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-[#121214] rounded-b-3xl">
          
          {/* STEP 1: USER INFORMATION */}
          {addUserStep === 1 && (
            <div className="max-w-3xl mx-auto bg-[#161618] border border-zinc-800/80 rounded-2xl p-6 animate-fadeIn">
              <div className="mb-6">
                <h3 className="text-base font-black text-white">User Information</h3>
                <p className="text-[11px] text-zinc-500 font-semibold mt-1">Inter basic details of the new user</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white">User Information<span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter full name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full bg-[#121214] border border-orange-500/50 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white">User Name<span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter user name"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    className="w-full bg-[#121214] border border-zinc-800 focus:border-zinc-700 rounded-xl px-4 py-3 text-xs text-white outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white">Email Address<span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    placeholder="Enter email address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full bg-[#121214] border border-zinc-800 focus:border-zinc-700 rounded-xl px-4 py-3 text-xs text-white outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white">Temporary Password<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="*******"
                      className="w-full bg-[#121214] border border-zinc-800 focus:border-zinc-700 rounded-xl px-4 py-3 pr-10 text-xs text-white outline-none transition-colors"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white">Phone Number<span className="text-red-500">*</span></label>
                  <div className="flex bg-[#121214] border border-zinc-800 focus-within:border-zinc-700 rounded-xl overflow-hidden transition-colors">
                    <div className="flex items-center px-3 border-r border-zinc-800 bg-[#161618]">
                      <span className="text-xs text-zinc-400">+61</span>
                      <ChevronDown className="h-3 w-3 text-zinc-500 ml-1" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="088 4354 5669"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full bg-transparent px-4 py-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white">Profile Picture</label>
                  <div className="w-full bg-[#121214] border border-dashed border-zinc-700 hover:border-orange-500/50 rounded-xl p-6 flex flex-col items-center justify-center transition-colors cursor-pointer group">
                    <span className="text-xs font-bold text-white">Upload picture</span>
                    <span className="text-[10px] text-zinc-500 mt-1">JPG,PNG Up to 2mb</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#121214] border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setAddUserStep(2)}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-bold text-white transition-colors shadow-lg shadow-orange-500/20"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ROLL & PERMISSIONS */}
          {addUserStep === 2 && (
            <div className="bg-[#161618] border border-zinc-800/80 rounded-2xl p-6 animate-fadeIn">
              <div className="mb-6">
                <h3 className="text-base font-black text-white">Roll & Permissions</h3>
                <p className="text-[11px] text-zinc-500 font-semibold mt-1">Assign a role to the user and configure permissions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left side selectors */}
                <div className="md:col-span-4 space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white">Select Role<span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                        className="appearance-none w-full bg-[#121214] border border-orange-500/50 rounded-xl py-3 pl-4 pr-10 text-xs font-semibold text-white outline-none transition-colors cursor-pointer"
                      >
                        <option>Super Admin</option>
                        <option>Admin</option>
                        <option>Manager</option>
                        <option>Staff</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white">Select Branch<span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        value={newUser.branch}
                        onChange={(e) => setNewUser({...newUser, branch: e.target.value})}
                        className="appearance-none w-full bg-[#121214] border border-zinc-800 focus:border-zinc-700 rounded-xl py-3 pl-4 pr-10 text-xs font-semibold text-white outline-none transition-colors cursor-pointer"
                      >
                        <option>All</option>
                        <option>Eltham</option>
                        <option>Woodstock</option>
                        <option>London</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Right side permissions table */}
                <div className="md:col-span-8 bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-[#1c1c1e] border-b border-zinc-800">
                      <tr className="text-[9px] font-black text-white uppercase tracking-widest">
                        <th className="py-3 px-4">MODULES</th>
                        <th className="py-3 px-4 text-center">FULL ACCESS</th>
                        <th className="py-3 px-4 text-center">READ ONLY</th>
                        <th className="py-3 px-4 text-center">NO ACCESS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-xs">
                      {MODULE_LIST.map((mod) => (
                        <tr key={mod.id} className="hover:bg-[#161618] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-6 w-6 rounded bg-zinc-800/50 border border-zinc-700 flex items-center justify-center shrink-0">
                                <div className="h-3 w-3 bg-zinc-600 rounded-sm" />
                              </div>
                              <div>
                                <p className="font-bold text-white">{mod.name}</p>
                                <p className="text-[10px] text-zinc-500 mt-0.5">{mod.desc}</p>
                              </div>
                            </div>
                          </td>
                          {["FULL", "READ", "NONE"].map((level) => (
                            <td key={level} className="py-3 px-4 text-center">
                              <label className="relative inline-flex items-center justify-center cursor-pointer group">
                                <input 
                                  type="radio" 
                                  name={`mod-${mod.id}`}
                                  className="sr-only"
                                  checked={newUser.permissions?.[mod.id] === level}
                                  onChange={() => updateNewUserPermission(mod.id, level)}
                                />
                                <div className={`h-4 w-4 rounded-full border-2 transition-colors flex items-center justify-center ${
                                  newUser.permissions?.[mod.id] === level 
                                    ? "border-orange-500" 
                                    : "border-zinc-600 group-hover:border-zinc-400"
                                }`}>
                                  {newUser.permissions?.[mod.id] === level && (
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                  )}
                                </div>
                              </label>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-zinc-800/80">
                <button 
                  onClick={() => setAddUserStep(1)}
                  className="px-6 py-2.5 bg-[#121214] border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={() => setAddUserStep(3)}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-bold text-white transition-colors shadow-lg shadow-orange-500/20"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & CONFIRM */}
          {addUserStep === 3 && (
            <div className="animate-fadeIn">
              
              {/* Top 3 Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* User Info */}
                <div className="bg-[#161618] border border-zinc-800/80 rounded-2xl p-5 relative">
                  <h4 className="text-sm font-black text-white mb-4">User Information</h4>
                  <button onClick={() => setAddUserStep(1)} className="absolute top-4 right-4 text-orange-500 hover:text-orange-400">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Full Name</span>
                      <span className="text-white font-bold">{newUser.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Username</span>
                      <span className="text-white font-bold">{newUser.username || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Email Address</span>
                      <span className="text-white font-bold">{newUser.email || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Phone Number</span>
                      <span className="text-white font-bold">{newUser.phone || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Role & Access */}
                <div className="bg-[#161618] border border-zinc-800/80 rounded-2xl p-5 relative">
                  <h4 className="text-sm font-black text-white mb-4">Role & Access</h4>
                  <button onClick={() => setAddUserStep(2)} className="absolute top-4 right-4 text-orange-500 hover:text-orange-400">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Role</span>
                      <span className="text-white font-bold">{newUser.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Role Description</span>
                      <span className="text-white font-bold text-right max-w-[120px]">Manage daily operations and staff</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Access Level</span>
                      <span className="text-emerald-500 font-bold">Custom</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Total Permissions</span>
                      <span className="text-white font-bold">15/25</span>
                    </div>
                  </div>
                </div>

                {/* Branch Access */}
                <div className="bg-[#161618] border border-zinc-800/80 rounded-2xl p-5 relative">
                  <h4 className="text-sm font-black text-white mb-4">Branch Access</h4>
                  <button onClick={() => setAddUserStep(2)} className="absolute top-4 right-4 text-orange-500 hover:text-orange-400">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Access Type</span>
                      <span className="text-orange-500 font-bold">{newUser.branch === "All" ? "All Branch" : "Specific"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-bold">Branches</span>
                      <span className="text-emerald-500 font-bold">{newUser.branch === "All" ? "24" : "1"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modules Summary Table */}
              <div className="bg-[#161618] border border-zinc-800/80 rounded-2xl p-6 relative">
                <h4 className="text-sm font-black text-white mb-4">Modules & Permissions (25 total)</h4>
                <button onClick={() => setAddUserStep(2)} className="absolute top-6 right-6 text-orange-500 hover:text-orange-400">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>

                <div className="bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden mt-4">
                  <table className="w-full text-left">
                    <thead className="bg-[#1c1c1e] border-b border-zinc-800">
                      <tr className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                        <th className="py-3 px-4">MODULES</th>
                        <th className="py-3 px-4 text-center">FULL ACCESS</th>
                        <th className="py-3 px-4 text-center">READ ONLY</th>
                        <th className="py-3 px-4 text-center">NO ACCESS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-xs">
                      {MODULE_LIST.map((mod) => (
                        <tr key={mod.id} className="hover:bg-[#161618] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-6 w-6 rounded bg-zinc-800/50 border border-zinc-700 flex items-center justify-center shrink-0">
                                <div className="h-3 w-3 bg-zinc-600 rounded-sm" />
                              </div>
                              <div>
                                <p className="font-bold text-white">{mod.name}</p>
                                <p className="text-[10px] text-zinc-500 mt-0.5">{mod.desc}</p>
                              </div>
                            </div>
                          </td>
                          {["FULL", "READ", "NONE"].map((level) => (
                            <td key={level} className="py-3 px-4 text-center">
                              <div className={`mx-auto h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                                newUser.permissions?.[mod.id] === level ? "border-orange-500" : "border-zinc-700"
                              }`}>
                                {newUser.permissions?.[mod.id] === level && (
                                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                                )}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                  <button 
                    onClick={() => setAddUserStep(2)}
                    className="px-6 py-2.5 bg-[#121214] border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => onConfirm(newUser)}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-bold text-white transition-colors shadow-lg shadow-orange-500/20"
                  >
                    <span>Confirm & Create User</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
