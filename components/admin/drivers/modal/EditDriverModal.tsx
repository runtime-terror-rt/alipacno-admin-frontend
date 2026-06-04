"use client";

import { useState } from "react";
import { X, Save, Edit2 } from "lucide-react";
import { Driver, DriverStatus } from "../DriverOperationsPanel";

interface EditDriverModalProps {
  driver: Driver;
  onClose: () => void;
  onSave: (updatedDriver: Driver) => void;
}

export default function EditDriverModal({ driver, onClose, onSave }: EditDriverModalProps) {
  const [formData, setFormData] = useState<Driver>({ ...driver });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#1a1a1c] border border-zinc-800 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800/80 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Edit2 className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-black text-white">Edit Driver</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-xs font-bold text-white mb-1.5 block">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-white mb-1.5 block">Phone Number</label>
            <input 
              type="text" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Branch</label>
              <select 
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              >
                <option>Eltham</option>
                <option>Woodstock</option>
                <option>London</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Vehicle</label>
              <select 
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value as any })}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              >
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="car">Car</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-white mb-1.5 block">Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as DriverStatus })}
              className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
            >
              <option value="Available">Available</option>
              <option value="On Delivery">On Delivery</option>
              <option value="Break">Break</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 flex justify-end gap-3 rounded-b-3xl">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#121214] border border-zinc-700 rounded-xl text-sm font-bold text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm font-bold text-white transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}