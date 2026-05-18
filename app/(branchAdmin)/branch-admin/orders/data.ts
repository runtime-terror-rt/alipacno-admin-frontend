export interface OrderItem {
  name: string;
  quantity: number;
  options?: string[];
}

export interface Order {
  id: string;
  time: string;
  timer: string;
  type: "Dine In" | "Collection" | "Delivery";
  items: OrderItem[];
  note?: string;
  status: "new" | "kitchen" | "ready" | "delivery" | "completed";
}

export const INITIAL_ORDERS: Order[] = [
  // COLUMN 1: New Orders
  {
    id: "#1024",
    time: "09:43 AM",
    timer: "9:21",
    type: "Dine In",
    note: "Customer allergic to mushrooms",
    status: "new",
    items: [
      { name: "Ribeye Steak", quantity: 2, options: ["Medium-rare", "Extra garlic butter"] },
      { name: "Caesar Salad", quantity: 1, options: ["No croutons"] }
    ]
  },
  {
    id: "#1030",
    time: "09:45 AM",
    timer: "7:21",
    type: "Dine In",
    status: "new",
    items: [
      { name: "T-Bone Steak", quantity: 1, options: ["Medium", "Peppercorn sauce"] },
      { name: "Baked Potato", quantity: 1, options: ["Sour cream", "Chives"] }
    ]
  },
  {
    id: "#1031",
    time: "09:46 AM",
    timer: "6:21",
    type: "Collection",
    note: "Please make sure they are crispy",
    status: "new",
    items: [
      { name: "Chicken Wings", quantity: 12, options: ["Buffalo sauce", "Extra spicy"] }
    ]
  },

  // COLUMN 2: In Kitchen
  {
    id: "#1025",
    time: "09:40 AM",
    timer: "7:21",
    type: "Collection",
    status: "kitchen",
    items: [
      { name: "Cheeseburger", quantity: 3, options: ["No onions", "Extra cheese", "Well done"] },
      { name: "French Fries", quantity: 3, options: ["Large"] }
    ]
  },
  {
    id: "#1026",
    time: "09:33 AM",
    timer: "7:21",
    type: "Delivery",
    status: "kitchen",
    items: [
      { name: "BBQ Ribs", quantity: 1, options: ["Extra sauce on side"] },
      { name: "Coleslaw", quantity: 1 },
      { name: "Cornbread", quantity: 2 }
    ]
  },

  // COLUMN 3: Ready for dispatch
  {
    id: "#1027",
    time: "09:30 AM",
    timer: "22:21",
    type: "Dine In",
    status: "ready",
    items: [
      { name: "Grilled Chicken", quantity: 2, options: ["With vegetables"] }
    ]
  },
  {
    id: "#1028",
    time: "09:26 AM",
    timer: "7:21",
    type: "Collection",
    status: "ready",
    items: [
      { name: "Fish & Chips", quantity: 2, options: ["Extra tartar sauce"] }
    ]
  },
  {
    id: "#1027-2",
    time: "09:30 AM",
    timer: "22:21",
    type: "Dine In",
    status: "ready",
    items: [
      { name: "Grilled Chicken", quantity: 2, options: ["With vegetables"] }
    ]
  },
  {
    id: "#1027-3",
    time: "09:30 AM",
    timer: "6:21",
    type: "Dine In",
    status: "ready",
    items: [
      { name: "Grilled Chicken", quantity: 2, options: ["With vegetables"] }
    ]
  },

  // COLUMN 4: Out for delivery
  {
    id: "#1029",
    time: "09:23 AM",
    timer: "29:21",
    type: "Delivery",
    status: "delivery",
    items: [
      { name: "Margherita Pizza", quantity: 1, options: ["Extra basil"] }
    ]
  },
  {
    id: "#1029-2",
    time: "09:23 AM",
    timer: "29:21",
    type: "Delivery",
    status: "delivery",
    items: [
      { name: "Margherita Pizza", quantity: 1, options: ["Extra basil"] }
    ]
  },
  {
    id: "#1029-3",
    time: "09:23 AM",
    timer: "29:21",
    type: "Delivery",
    status: "delivery",
    items: [
      { name: "Margherita Pizza", quantity: 1, options: ["Extra basil"] }
    ]
  },

  // COLUMN 5: Completed
  {
    id: "#1029-completed",
    time: "09:23 AM",
    timer: "29:21",
    type: "Delivery",
    status: "completed",
    items: [
      { name: "Margherita Pizza", quantity: 1, options: ["Extra basil"] }
    ]
  }
];

export const ORDER_KDS_STATS = {
  avgPrep: "8m 30s",
  active: 12,
  delayed: 2
};
