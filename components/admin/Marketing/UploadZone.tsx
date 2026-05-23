"use client";

import { FileText, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

interface UploadZoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export default function UploadZone({ file, onFileChange }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const processFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.size <= 5 * 1024 * 1024) {
        onFileChange(selectedFile);
      } else {
        alert("File size exceeds 5MB limit rule.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 select-none">
      <label className="text-xs font-bold text-zinc-400 tracking-wide">Attachment</label>
      
      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); }}
          className={`relative border border-dashed rounded-2xl flex flex-col items-center justify-center py-12 gap-3 cursor-pointer transition-all ${
            dragging
              ? "border-[#f9671a] bg-[#f9671a]/5"
              : "border-[#2e2e30] bg-[#1c1c1e] hover:border-[#f9671a]/40 hover:bg-[#f9671a]/5"
          }`}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input 
            id="file-upload" 
            type="file" 
            accept=".png,.jpg,.jpeg,.pdf" 
            className="hidden" 
            onChange={(e) => processFiles(e.target.files)}
          />
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${dragging ? "bg-[#f9671a]/15" : "bg-[#262629]"}`}>
            <Upload size={18} className={dragging ? "text-[#f9671a]" : "text-zinc-400"} />
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-300 font-medium">
              <span className="text-[#f9671a] hover:underline cursor-pointer">Click to upload</span> or drag and drop
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">PNG, JPG or PDF (max. 5MB)</p>
          </div>
        </div>
      ) : (
        <div className="bg-[#1c1c1e] border border-[#2e2e30] rounded-xl p-4 flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 min-w-0">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Upload preview" 
                className="w-12 h-12 rounded-lg object-cover border border-zinc-800 flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0 border border-zinc-700">
                <FileText size={20} />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-zinc-200 truncate">{file.name}</span>
              <span className="text-[10px] text-zinc-500 font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onFileChange(null); }}
            className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}