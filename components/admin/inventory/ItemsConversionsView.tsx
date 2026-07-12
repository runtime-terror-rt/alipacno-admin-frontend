"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronDown, List, Plus } from "lucide-react";
import { toast } from "sonner";

function InputField({ label, placeholder, defaultValue, value, onChange }: { label?: string, placeholder?: string, defaultValue?: string, value?: string, onChange?: (e: any) => void }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-semibold text-zinc-300">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className="bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors w-full"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange, defaultValue }: { label?: string, value?: string, options?: string[], onChange?: (e: any) => void, defaultValue?: string }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-semibold text-zinc-300">{label}</label>}
      <div className="relative">
        <select
          className="appearance-none bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors w-full"
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
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

export default function ItemsConversionsView() {
  const [rawMaterials, setRawMaterials] = useState<string[]>(["Flour", "Potato", "Beef", "Chicken Breast", "Minced Beef"]);

  // Raw Material Form State
  const [rawName, setRawName] = useState("");
  const [rawUnit, setRawUnit] = useState("KG");
  
  // Prepared Item Form State
  const [prepName, setPrepName] = useState("");
  const [prepMadeFrom, setPrepMadeFrom] = useState("Flour");
  const [prepUnit, setPrepUnit] = useState("PCS");
  const [prepPackSize, setPrepPackSize] = useState("");
  const [prepYieldsQty, setPrepYieldsQty] = useState("");

  const [tableData, setTableData] = useState([
    { id: 1, image: "/admin/dashboard/inventory-8.png", name: "Mozzarella Stick", madeFrom: "Potato", packSize: "7", packUnit: "KG", yieldQty: "21", yieldUnit: "PCS", ratio: "7 Kg -> 50 PCS" },
    { id: 2, image: "/admin/dashboard/inventory-6.png", name: "Chicken Breast (portion)", madeFrom: "Chicken Breast", packSize: "5", packUnit: "KG", yieldQty: "21", yieldUnit: "PCS", ratio: "7 Kg -> 50 PCS" },
    { id: 3, image: "/admin/dashboard/inventory-1.png", name: "Minced Beef", madeFrom: "Minced Beef", packSize: "7", packUnit: "KG", yieldQty: "21", yieldUnit: "PCS", ratio: "7 Kg -> 50 PCS" },
  ]);

  const handleAddRawMaterial = () => {
    if (!rawName.trim()) {
      toast.error("Please enter a raw material name.");
      return;
    }
    setRawMaterials((prev) => [...prev, rawName]);
    toast.success(`"${rawName}" added successfully!`);
    setRawName("");
  };

  const handleAddPreparedItem = () => {
    if (!prepName.trim()) {
      toast.error("Please enter a prepared item name.");
      return;
    }
    
    const newItem = {
      id: Date.now(),
      image: "/admin/dashboard/inventory-8.png",
      name: prepName,
      madeFrom: prepMadeFrom,
      packSize: prepPackSize || "1",
      packUnit: "KG",
      yieldQty: prepYieldsQty || "1",
      yieldUnit: prepUnit,
      ratio: `${prepPackSize || "1"} KG -> ${prepYieldsQty || "1"} ${prepUnit}`
    };

    setTableData((prev) => [...prev, newItem]);
    toast.success(`"${prepName}" added successfully!`);
    
    setPrepName("");
    setPrepPackSize("");
    setPrepYieldsQty("");
  };

  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">
      
      <div>
        <h1 className="text-xl font-bold text-white">Inventory Items and conversions</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Nothing here is fixed — edit any ratio, or add a brand new raw material or prepared item.
        </p>
      </div>

      {/* ── Add new raw material ── */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl p-5 space-y-5">
        <h2 className="text-base font-bold text-white">Add new raw material</h2>
        
        <FileUploadBox 
          label="Upload Image" 
          uploadedImage="/admin/dashboard/inventory-2.png" 
          uploadedName="Potato_image.png" 
          uploadedSize="23.5MB" 
        />

      

     

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputField label="Name" value={rawName} onChange={(e) => setRawName(e.target.value)} />
          <SelectField label="Unit" value={rawUnit} options={["KG", "PCS", "LITER"]} onChange={(e) => setRawUnit(e.target.value)} />
          <InputField label="Low stock threshold" />
        </div>

           <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-semibold text-zinc-300">Description</label>
          <textarea
            placeholder="Write here..."
            className="bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors w-full min-h-[80px]"
          />
        </div>

        <button onClick={handleAddRawMaterial} className="px-5 py-2 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-white text-sm font-semibold cursor-pointer">
          <Plus size={16} />
          Add raw material
        </button>
      </div>

      {/* ── Add new prepared item ── */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl p-5 space-y-5">
        <h2 className="text-base font-bold text-white">Add new prepared item (with its own conversion)</h2>

        <FileUploadBox 
          label="Upload Image" 
          uploadedImage="/admin/dashboard/inventory-8.png" 
          uploadedName="Mozzarella Stick.png" 
          uploadedSize="23.5MB" 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputField label="Name" value={prepName} onChange={(e) => setPrepName(e.target.value)} />
          <SelectField label="Made from" value={prepMadeFrom} options={rawMaterials} onChange={(e) => setPrepMadeFrom(e.target.value)} />
          <SelectField label="Unit" value={prepUnit} options={["PCS", "KG", "LITER"]} onChange={(e) => setPrepUnit(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputField label="Pack size used" placeholder="e.g. 7" value={prepPackSize} onChange={(e) => setPrepPackSize(e.target.value)} />
          <InputField label="Yields qty" placeholder="e.g. 100" value={prepYieldsQty} onChange={(e) => setPrepYieldsQty(e.target.value)} />
          <InputField label="Low stock threshold" placeholder="e.g. 3" />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-semibold text-zinc-300">Description</label>
          <textarea
            placeholder="Write here..."
            className="bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors w-full min-h-[80px]"
          />
        </div>

        <button onClick={handleAddPreparedItem} className="px-5 py-2 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-white text-sm font-semibold cursor-pointer">
          <Plus size={16} />
          Add prepared item
        </button>
      </div>

      {/* ── Conversions Table ── */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1C1C1C] border-b border-[#343436]">
                {["Image", "Item Name", "Made from", "Pack size used", "Yields qty", "Ratio", "Actions"].map((h) => (
                  <th key={h} className="text-left text-zinc-400 text-xs font-semibold px-5 py-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e30]/60">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-5 py-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#2a2a2c] relative">
                      <Image src={row.image} alt={row.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-white font-medium whitespace-nowrap">{row.name}</td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <SelectField value={row.madeFrom} options={rawMaterials} />
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-20"><InputField defaultValue={row.packSize} placeholder="e.g. 5" /></div>
                      <div className="w-20"><SelectField defaultValue={row.packUnit} options={["KG", "PCS"]} /></div>
                    </div>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-20"><InputField defaultValue={row.yieldQty} placeholder="e.g. 20" /></div>
                      <div className="w-20"><SelectField defaultValue={row.yieldUnit} options={["PCS", "KG"]} /></div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-zinc-400 text-xs whitespace-nowrap">{row.ratio}</td>
                  <td className="px-5 py-3">
                    <button className="px-5 py-1.5 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-white text-xs font-semibold cursor-pointer">
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
