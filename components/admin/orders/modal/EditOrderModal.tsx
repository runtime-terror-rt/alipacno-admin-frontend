import { useState } from "react";
import { X, Save, Edit2 } from "lucide-react";
import toast from 'react-hot-toast';
import { Order } from "../OrderReportPanel";

interface EditOrderModalProps {
  order: Order;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
}

export default function EditOrderModal({ order, onClose, onSave }: EditOrderModalProps) {
  const [formData, setFormData] = useState<Order>({ ...order });

  const handleSave = () => {
    onSave(formData);
    toast.success(`Order ${formData.id} updated successfully`, {
      duration: 4000,
      position: 'top-center',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#1a1a1c] border border-zinc-800 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800/80 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Edit2 className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-black text-white">Edit Order</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Customer Name</label>
              <input 
                type="text" 
                value={formData.customer}
                onChange={(e) => setFormData({...formData, customer: e.target.value})}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Phone Number</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Branch</label>
              <select 
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              >
                <option>Eltham</option>
                <option>Woodstock</option>
                <option>London</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Order Type</label>
              <select 
                value={formData.orderType}
                onChange={(e) => setFormData({...formData, orderType: e.target.value})}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              >
                <option>Dine-in</option>
                <option>Takeaway</option>
                <option>Delivery</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Amount</label>
              <input 
                type="text" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Payment Method</label>
              <select 
                value={formData.payment}
                onChange={(e) => setFormData({...formData, payment: e.target.value})}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              >
                <option>Card</option>
                <option>Cash</option>
                <option>Online</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              >
                <option value="Preparing">Preparing</option>
                <option value="On Delivery">On Delivery</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-white mb-1.5 block">Driver</label>
              <input 
                type="text" 
                value={formData.driver}
                onChange={(e) => setFormData({...formData, driver: e.target.value})}
                className="w-full bg-[#121214] border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              />
            </div>
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