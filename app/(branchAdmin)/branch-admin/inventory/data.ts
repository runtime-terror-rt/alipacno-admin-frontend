export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  minStock: string;
  price: string;
  status: "In Stock" | "Low Stock" | "Out Of Stock";
}

export interface InventoryStat {
  label: string;
  value: string;
  iconName: "box" | "trend-up" | "alert-triangle" | "alert-circle";
  iconColor: string;

  // Added for MetricCard
  change: string;
  positive: boolean;
  note?: string;
}

export const INVENTORY_STATS: InventoryStat[] = [
  {
    label: "Total Items",
    value: "6",
    iconName: "box",
    iconColor:
      "text-blue-500 bg-blue-500/10 border border-blue-500/20",
    change: "+12.5%",
    positive: true,
    note: "vs last period",
  },

  {
    label: "In Stock",
    value: "3",
    iconName: "trend-up",
    iconColor:
      "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20",
    change: "+5.2%",
    positive: true,
    note: "Healthy inventory",
  },

  {
    label: "Low Stock",
    value: "2",
    iconName: "alert-triangle",
    iconColor:
      "text-amber-500 bg-amber-500/10 border border-amber-500/20",
    change: "-2.4%",
    positive: false,
    note: "Needs restock",
  },

  {
    label: "Out of Stock",
    value: "1",
    iconName: "alert-circle",
    iconColor:
      "text-red-500 bg-red-500/10 border border-red-500/20",
    change: "-1.1%",
    positive: false,
    note: "Critical shortage",
  },
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "i1",
    name: "Ribeye Steak",
    category: "Meat",
    quantity: "45 kg",
    minStock: "20 kg",
    price: "£18.99",
    status: "In Stock",
  },
  {
    id: "i2",
    name: "Chicken Breast",
    category: "Meat",
    quantity: "8 kg",
    minStock: "15 kg",
    price: "£6.99",
    status: "Low Stock",
  },
  {
    id: "i3",
    name: "Tomatoes",
    category: "Vegetables",
    quantity: "0 kg",
    minStock: "10 kg",
    price: "£2.49",
    status: "Out Of Stock",
  },
  {
    id: "i4",
    name: "Mozzarella Cheese",
    category: "Dairy",
    quantity: "25 kg",
    minStock: "10 kg",
    price: "£8.99",
    status: "In Stock",
  },
  {
    id: "i5",
    name: "Lettuce",
    category: "Vegetables",
    quantity: "12 kg",
    minStock: "8 kg",
    price: "£1.99",
    status: "In Stock",
  },
  {
    id: "i6",
    name: "Olive Oil",
    category: "Condiments",
    quantity: "4 L",
    minStock: "5 L",
    price: "£12.99",
    status: "Low Stock",
  },
];