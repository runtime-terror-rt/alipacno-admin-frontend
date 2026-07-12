"use client";

import { useState } from 'react';
import Pagination from '../ui/Pagination';
import { Search, Pencil, Trash2, X, Save } from 'lucide-react';

function StatusBadge({ status }: { status: Campaign["status"] }) {
  const map = {
    Completed: "bg-green-500/15 text-green-400 border-green-500/30",
    Active:    "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Failed:    "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status]}`}>{status}</span>;
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
        active ? "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a]/50" : "bg-[#1f1f21] text-zinc-400 hover:text-white border border-transparent"
      }`}
    >{label}</button>
  );
}

interface Campaign {
  name: string;
  preview: string;
  target: string;
  sentOn: string;
  delivered: string;
  deliveredPct: string;
  replies: number;
  status: "Completed" | "Active" | "Failed";
}

const INITIAL_CAMPAIGNS: Campaign[] = [
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,856", deliveredPct: "94%", replies: 245, status: "Completed" },
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,856", deliveredPct: "94%", replies: 245, status: "Completed" },
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,856", deliveredPct: "94%", replies: 245, status: "Completed" },
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,950", deliveredPct: "94%", replies: 245, status: "Completed" },
  { name: "TODAY'S SPECIAL OFFER", preview: "Get 20% OFF On All Burgers Today...", target: "All Customers", sentOn: "May 07, 2024 10:30 AM", delivered: "2,606", deliveredPct: "94%", replies: 245, status: "Completed" },
];

interface EditCampaignModalProps {
  campaign: Campaign;
  onClose: () => void;
  onSave: (updated: Campaign) => void;
}

function EditCampaignModal({ campaign, onClose, onSave }: EditCampaignModalProps) {
  const [form, setForm] = useState<Campaign>({ ...campaign });

  function field<K extends keyof Campaign>(key: K, value: Campaign[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Pencil size={16} className="text-[#f9671a]" />
            <h2 className="text-base font-bold text-white">Edit Campaign</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Campaign Name</label>
            <input
              value={form.name}
              onChange={(e) => field("name", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Message Preview</label>
            <textarea
              value={form.preview}
              onChange={(e) => field("preview", e.target.value)}
              rows={3}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Target Audience</label>
            <input
              value={form.target}
              onChange={(e) => field("target", e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => field("status", e.target.value as Campaign["status"])}
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer"
            >
              <option value="Completed">Completed</option>
              <option value="Active">Active</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-2 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-medium hover:text-white hover:border-zinc-500 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f9671a] text-white text-sm font-semibold hover:bg-[#e05a15] transition-colors shadow-lg shadow-[#f9671a]/20"
          >
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

interface DeleteCampaignModalProps {
  campaign: Campaign;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteCampaignModal({ campaign, onClose, onConfirm }: DeleteCampaignModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-zinc-700/60 rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Delete Campaign{" "}
            <span className="text-[#f9671a]">{campaign.name}</span>?
          </p>
          <p className="text-xs text-zinc-500 mt-1.5">
            This action will permanently delete the campaign records. This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-medium hover:text-white hover:border-zinc-500 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const MarketingPanel = () => {
  const [activeTab, setActiveTab] = useState("SMS Marketing");
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null);
  const [deleteCampaign, setDeleteCampaign] = useState<Campaign | null>(null);

  function handleSave(updated: Campaign) {
    // Match by name or some unique fields since preview might change
    setCampaigns((prev) => prev.map((c) => (c.name === editCampaign?.name && c.sentOn === editCampaign?.sentOn ? updated : c)));
  }

  function handleDelete(target: Campaign) {
    setCampaigns((prev) => prev.filter((c) => !(c.name === target.name && c.sentOn === target.sentOn)));
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Communications & Marketing</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Manage SMS, Email campaigns and marketing communications.</p>
        </div>

        {/* Search + Tabs */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#1f1f21] border border-[#2e2e30] rounded-xl px-3 py-2.5 flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="text-zinc-500 flex-shrink-0" />
            <input type="text" placeholder="Search order Id, customer, phone..." className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {["SMS Marketing", "Email Marketing", "Campaigns"].map((t) => (
              <TabBtn key={t} label={t} active={activeTab === t} onClick={() => setActiveTab(t)} />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 bg-[#1a1a1c] border border-[#2e2e30] rounded-xl px-5 py-3 flex-wrap">
          {[
            { label: "TOTAL SMS SENT", value: "12,842", color: "text-white" },
            { label: "DELIVERED",       value: "12,216 (95.1%)", color: "text-green-400" },
            { label: "FAILED",          value: "632 (4.9%)",     color: "text-red-400" },
            { label: "REPLIES",         value: "1,024 (8.0%)",   color: "text-blue-400" },
            { label: "OPT-OUTS",        value: "120 (0.9%)",     color: "text-zinc-400" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[9px] text-zinc-500 uppercase tracking-wide">{s.label}</p>
              <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Campaign Table */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#2e2e30]">
                  {["CAMPAIGN NAME","MESSAGE PREVIEW","TARGET","SENT ON","DELIVERED","REPLIES","STATUS","ACTION"].map((h) => (
                    <th key={h} className="text-left text-zinc-500 font-medium py-3 px-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2e2e30]/60">
                {campaigns.map((c, i) => (
                  <tr key={`${c.name}-${i}`} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="py-3 px-4 text-white font-medium whitespace-nowrap text-xs">{c.name}</td>
                    <td className="py-3 px-4 text-zinc-400 max-w-[180px] truncate">{c.preview}</td>
                    <td className="py-3 px-4 text-zinc-300 whitespace-nowrap">{c.target}</td>
                    <td className="py-3 px-4 text-zinc-400 whitespace-nowrap">{c.sentOn}</td>
                    <td className="py-3 px-4">
                      <span className="text-green-400 font-semibold">{c.delivered} </span>
                      <span className="text-zinc-500">({c.deliveredPct})</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-300">{c.replies}</td>
                    <td className="py-3 px-4"><StatusBadge status={c.status} /></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditCampaign(c)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-[#f9671a] hover:bg-[#f9671a]/10 transition-colors"
                          title="Edit Campaign"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteCampaign(c)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Campaign"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 pb-4">
            <Pagination />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editCampaign && (
        <EditCampaignModal
          campaign={editCampaign}
          onClose={() => setEditCampaign(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {deleteCampaign && (
        <DeleteCampaignModal
          campaign={deleteCampaign}
          onClose={() => setDeleteCampaign(null)}
          onConfirm={() => handleDelete(deleteCampaign)}
        />
      )}
    </>
  );
}

export default MarketingPanel;
