"use client";

import { useState } from "react";
import { X, Save, CalendarRange } from "lucide-react";

interface AddNoteModalProps {
  customerName: string;
  onClose: () => void;
  onSave: (note: string) => void;
}

export default function AddNoteModal({ customerName, onClose, onSave }: AddNoteModalProps) {
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!note.trim()) return;

    setIsSaving(true);
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      onSave(note.trim());
      setIsSaving(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#1a1a1c] border border-zinc-800 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800/80 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CalendarRange className="w-5 h-5 text-[#f9671a]" />
            <h2 className="text-lg font-black text-white">Add Note</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-zinc-400 mb-4">
            Add a note for <span className="text-white font-medium">{customerName}</span>
          </p>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your note here... (e.g., Customer prefers no onions, allergic to nuts, etc.)"
            rows={6}
            className="w-full bg-[#121214] border border-zinc-700 rounded-2xl px-4 py-3 text-sm text-white resize-y min-h-[140px] outline-none focus:border-[#f9671a] transition-colors"
          />
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
            disabled={!note.trim() || isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#f9671a] hover:bg-[#e05a10] disabled:bg-zinc-700 rounded-xl text-sm font-bold text-white transition-colors disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
}