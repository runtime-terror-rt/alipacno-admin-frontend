export interface StatMetric {
  label: string;
  value: string;
  change: string;
}

export interface StatGroup {
  title: string;
  iconName: string;
  metrics: StatMetric[];
}

export interface TopProduct {
  name: string;
  soldCount: number;
  revenue: number;
  percent: number;
}

export interface PaymentMethod {
  name: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface HourlyLog {
  id: string;
  type: string;
  payment: string;
  status: string;
  time: string;
  prepTime: number;
  revenue: number;
  efficiency: number; // 0 to 100
}

export const INCOME_STATS: StatGroup[] = [
  {
    title: "Sales Analytics",
    iconName: "dollar",
    metrics: [
      { label: "Total Revenue", value: "£3,842.50", change: "+12.5%" },
      { label: "Average Order", value: "£30.25", change: "+5.2%" },
      { label: "Orders Count", value: "127", change: "+8.3%" },
    ],
  },
  {
    title: "Product Performance",
    iconName: "package",
    metrics: [
      { label: "Top Seller", value: "Ribeye Steak", change: "45 sold" },
      { label: "Categories Active", value: "6", change: "+1" },
      { label: "Avg Items/Order", value: "3.2", change: "+0.4" },
    ],
  },
  {
    title: "Customer Insights",
    iconName: "users",
    metrics: [
      { label: "New Customers", value: "23", change: "+15.0%" },
      { label: "Returning Rate", value: "68%", change: "+3.2%" },
      { label: "Loyalty Members", value: "1,245", change: "+42" },
    ],
  },
  {
    title: "Operations",
    iconName: "clock",
    metrics: [
      { label: "Avg Prep Time", value: "12 min", change: "-2 min" },
      { label: "Order Accuracy", value: "98.5%", change: "+1.2%" },
      { label: "Staff Hours", value: "156", change: "+3" },
    ],
  },
];

export const TOP_PRODUCTS: TopProduct[] = [
  { name: "Ribeye Steak", soldCount: 45, revenue: 1305.55, percent: 90 },
  { name: "Margherita Pizza", soldCount: 38, revenue: 493.82, percent: 75 },
  { name: "Caesar Salad", soldCount: 36, revenue: 305.66, percent: 55 },
  { name: "French Fries", soldCount: 52, revenue: 259.48, percent: 45 },
  { name: "Chicken Wings", soldCount: 28, revenue: 279.72, percent: 35 },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { name: "Card", percentage: 67, amount: 2595.0, color: "bg-purple-650" },
  { name: "Cash", percentage: 32, amount: 1247.5, color: "bg-emerald-500" },
  { name: "Digital Wallet", percentage: 1, amount: 45.0, color: "bg-blue-500" },
];

export const HOURLY_PERFORMANCE: HourlyLog[] = [
  {
    id: "#FD-8821",
    type: "Delivery",
    payment: "Card",
    status: "Completed",
    time: "11:00",
    prepTime: 5,
    revenue: 142.5,
    efficiency: 95,
  },
  {
    id: "#FD-8821",
    type: "Delivery",
    payment: "Cash",
    status: "Preparing",
    time: "12:00",
    prepTime: 18,
    revenue: 142.5,
    efficiency: 65,
  },
  {
    id: "#FD-8821",
    type: "Delivery",
    payment: "Cash",
    status: "On Delivery",
    time: "13:00",
    prepTime: 22,
    revenue: 142.5,
    efficiency: 55,
  },
  {
    id: "#FD-8821",
    type: "Delivery",
    payment: "Card",
    status: "Cancel",
    time: "14:00",
    prepTime: 26,
    revenue: 142.5,
    efficiency: 30,
  },
  {
    id: "#FD-8821",
    type: "Delivery",
    payment: "Card",
    status: "Completed",
    time: "16:00",
    prepTime: 18,
    revenue: 142.5,
    efficiency: 78,
  },
  {
    id: "#FD-8821",
    type: "Delivery",
    payment: "Card",
    status: "Completed",
    time: "17:00",
    prepTime: 12,
    revenue: 142.5,
    efficiency: 88,
  },
  {
    id: "#FD-8821",
    type: "Delivery",
    payment: "Card",
    status: "Completed",
    time: "18:00",
    prepTime: 27,
    revenue: 142.5,
    efficiency: 45,
  },
];
