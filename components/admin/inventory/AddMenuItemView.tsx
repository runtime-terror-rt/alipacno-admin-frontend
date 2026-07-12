"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown, List, X } from "lucide-react";

function InputField({ label, placeholder, defaultValue }: { label?: string, placeholder?: string, defaultValue?: string }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-semibold text-zinc-300">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors w-full"
      />
    </div>
  );
}

function SelectField({ label, value, options }: { label?: string, value?: string, options?: string[] }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-semibold text-zinc-300">{label}</label>}
      <div className="relative">
        <select
          className="appearance-none bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors w-full cursor-pointer"
          defaultValue={value}
        >
          {options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );
}

function FileUploadBox({ label, uploadedImage: initialImage, uploadedName: initialName, uploadedSize: initialSize }: { label: string, uploadedImage?: string, uploadedName?: string, uploadedSize?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [fileName, setFileName] = useState<string | null>(initialName || null);
  const [fileSize, setFileSize] = useState<string | null>(initialSize || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setFileName(selectedFile.name);
      setFileSize((selectedFile.size / (1024 * 1024)).toFixed(2) + "MB");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    setFileName(null);
    setFileSize(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-1.5 w-full sm:w-1/2">
      <label className="text-xs font-semibold text-zinc-300">{label}</label>
      <div className="flex items-center gap-4">
        {/* Upload Dropzone */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-4 bg-[#2a2a2c] border border-dashed border-[#4a4a4c] rounded-lg px-4 py-4 w-full cursor-pointer hover:border-orange-500 transition-colors"
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/webp" 
            className="hidden" 
          />
          <div className="w-10 h-10 bg-[#3a3a3c] rounded-lg flex items-center justify-center shrink-0">
             <List className="text-zinc-400" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white font-medium">Drag and drop or <span className="underline">Choose File</span></span>
            <span className="text-xs text-zinc-500">JPEG, PNG, WEBP formats, up to 50MB</span>
          </div>
        </div>

        {/* Uploaded File Preview */}
        {preview && (
          <div className="flex items-center gap-3 bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg p-2 pr-4 shrink-0 relative">
            <div className="w-12 h-12 rounded-md overflow-hidden relative bg-[#1e1e20]">
              <Image src={preview} alt="Uploaded" fill className="object-cover" unoptimized={file !== null} />
            </div>
            <div className="flex flex-col pr-6">
              <span className="text-sm font-semibold text-white truncate max-w-[120px]" title={fileName || ""}>{fileName}</span>
              <span className="text-xs text-zinc-500">{fileSize}</span>
            </div>
            <button 
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AddMenuItemView() {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Minced Beef", icon: "/admin/dashboard/inventory-1.png", qty: "1", unit: "2" },
    { id: 2, name: "Flour", icon: "/admin/dashboard/inventory-2.png", qty: "1", unit: "2" },
  ]);

  const removeIngredient = (id: number) => {
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Add new menu item</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Configure item details and its recipe.
        </p>
      </div>

      {/* Main Details Card */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl p-5 space-y-5">
        <FileUploadBox 
          label="Upload Image" 
          uploadedImage="/admin/dashboard/inventory-2.png" 
          uploadedName="Mixed Munchbox.png" 
          uploadedSize="23.5MB" 
        />

        <InputField label="Item name" placeholder="Mixed Munchbox" />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-semibold text-zinc-300">Description</label>
          <textarea
            placeholder="Write here..."
            className="bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors w-full min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField label="Category" value="Burgers" options={["Burgers", "Munchbox", "Pizza"]} />
          <InputField label="Price" placeholder="£ 0.00" />
        </div>
      </div>

      {/* Recipe Card */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl p-5 space-y-6">
        <div>
          <h2 className="text-base font-bold text-white">Recipe (ingredients used per unit sold)</h2>
          <p className="text-zinc-500 text-[13px] mt-0.5">
            Drives automatic stock deduction on every sale.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-5 w-full border-b border-[#343436] pb-6">
          <div className="flex-[2] min-w-[200px]">
            <SelectField label="Select item" value="Minced Beef" options={["Minced Beef", "Flour", "Potato"]} />
          </div>
          <div className="flex-1 min-w-[150px]">
            <InputField label="Qty per unit" placeholder="e.g. 1" />
          </div>
          <div className="flex-1 min-w-[150px]">
            <InputField label="Unit" placeholder="e.g. 2" />
          </div>
          <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-white text-sm font-semibold cursor-pointer h-[38px] whitespace-nowrap">
            Add Ingredient
          </button>
        </div>

        {/* Added Ingredients List */}
        <div className="space-y-0">
          {ingredients.map((ing) => (
            <div key={ing.id} className="flex items-center justify-between py-3 border-b border-[#343436]/60 last:border-0">
              <div className="flex items-center gap-3 w-[45%]">
                <div className="w-8 h-8 rounded overflow-hidden relative bg-[#2a2a2c]">
                  <Image src={ing.icon} alt={ing.name} fill className="object-cover" />
                </div>
                <span className="text-[13px] font-medium text-white">{ing.name}</span>
              </div>
              <div className="w-[20%] text-[13px] text-zinc-300">
                {ing.qty}
              </div>
              <div className="w-[35%] flex justify-between items-center pr-2">
                <span className="text-[13px] text-zinc-300">{ing.unit}</span>
                <button 
                  onClick={() => removeIngredient(ing.id)}
                  className="text-red-500 hover:text-red-400 transition-colors p-1"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 pt-2">
        <button className="px-8 py-2.5 bg-transparent hover:bg-zinc-800 transition-colors rounded-full text-white text-sm font-semibold cursor-pointer whitespace-nowrap">
          Cancel
        </button>
        <button className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-white text-sm font-semibold cursor-pointer whitespace-nowrap">
          Save menu item
        </button>
      </div>

    </div>
  );
}
