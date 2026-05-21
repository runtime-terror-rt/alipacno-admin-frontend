import React from 'react'

interface OrderDetailsItem {
  name: string;
  qty: string;
  unitPrice: string;
  subTotal: string;
}

const DetailsOrderedItem = ({ ORDER_ITEMS }: { ORDER_ITEMS: OrderDetailsItem[] }) => {
  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Ordered Items</h3>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-[#2D2D30] text-gray-400">
              {["ITEM NAME", "QUANTITY", "UNIT PRICE", "SUB-TOTAL"].map((h) => (
                <th 
                  key={h} 
                  className="text-left text-[11px] font-semibold py-3.5 pr-4 first:pl-4 last:pr-4 whitespace-nowrap tracking-wider uppercase align-middle first:rounded-l-lg last:rounded-r-lg"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {/* Item Rows */}
            {ORDER_ITEMS.map((item, i) => (
              <tr key={i} className="bg-[#1A1A1C] border border-[#2e2e30] hover:bg-zinc-800/10 transition-colors">
                <td className="py-4 pr-4 pl-4 text-xs font-medium text-zinc-300  rounded-l-xl align-middle">
                  {item.name}
                </td>
                <td className="py-4 pr-4 text-xs font-medium text-zinc-400  align-middle whitespace-nowrap">
                  {item.qty}
                </td>
                <td className="py-4 pr-4 text-xs font-medium text-zinc-300  align-middle whitespace-nowrap">
                  {item.unitPrice}
                </td>
                <td className="py-4 pr-4 last:pr-4 text-xs font-medium text-zinc-300  rounded-r-xl align-middle whitespace-nowrap">
                  {item.subTotal}
                </td>
              </tr>
            ))}
            
            {/* VAT Box Row */}
            <tr className="bg-[#1A1A1C]">
              <td colSpan={2} className="py-4 pr-4 pl-4 rounded-l-xl " />
              <td className="py-4 pr-4 text-xs font-medium text-zinc-400  align-middle whitespace-nowrap">
                Vat (%)
              </td>
              <td className="py-4 pr-4 last:pr-4 text-xs font-medium text-zinc-300  rounded-r-xl align-middle whitespace-nowrap">
                £0.50
              </td>
            </tr>

            {/* Total Box Row */}
            <tr className="bg-[#1A1A1C]">
              <td colSpan={2} className="py-4 pr-4 pl-4 rounded-l-xl " />
              <td className="py-4 pr-4 text-xs font-semibold text-white  align-middle whitespace-nowrap">
                Total
              </td>
              <td className="py-4 pr-4 last:pr-4 text-sm font-bold text-white  rounded-r-xl align-middle whitespace-nowrap">
                £33
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DetailsOrderedItem