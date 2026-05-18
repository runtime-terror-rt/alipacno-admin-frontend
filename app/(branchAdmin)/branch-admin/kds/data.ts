export interface KDSItem {
  name: string;
  quantity: number;
  options?: string[];
}

export interface KDSOrder {
  id: string;
  time: string;
  timer: string;
  type: "Dine In" | "Collection" | "Delivery";
  station: "Grill" | "Fryer" | "Drinks" | "Dessert";
  items: KDSItem[];
  note?: string;
  notified?: boolean;
  status: "new" | "preparing" | "delayed";
}

export const KDS_STATIONS = [
  { id: "all", label: "All Station", count: 12 },
  { id: "grill", label: "Grill Station", count: 5 },
  { id: "fryer", label: "Fryer Station", count: 3 },
  { id: "drinks", label: "Drinks Station", count: 2 },
  { id: "dessert", label: "Dessert Station", count: 2 }
];

export const INITIAL_KDS_ORDERS: KDSOrder[] = [
  // COLUMN 1: New Orders
  {
    id: "#1024",
    time: "09:43 AM",
    timer: "9:21",
    type: "Dine In",
    station: "Grill",
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
    station: "Grill",
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
    station: "Fryer",
    note: "Please make sure they are crispy",
    status: "new",
    items: [
      { name: "Chicken Wings", quantity: 12, options: ["Buffalo sauce", "Extra spicy"] }
    ]
  },

  // COLUMN 2: Preparing
  {
    id: "#1025",
    time: "09:40 AM",
    timer: "12:21",
    type: "Collection",
    station: "Fryer",
    status: "preparing",
    items: [
      { name: "Cheeseburger", quantity: 3, options: ["No onions", "Extra cheese", "Well done"] },
      { name: "French Fries", quantity: 3, options: ["Large"] }
    ]
  },
  {
    id: "#1026",
    time: "09:33 AM",
    timer: "19:21",
    type: "Delivery",
    station: "Grill",
    status: "preparing",
    items: [
      { name: "BBQ Ribs", quantity: 1, options: ["Extra sauce on side"] },
      { name: "Coleslaw", quantity: 1 },
      { name: "Cornbread", quantity: 2 }
    ]
  },

  // COLUMN 3: Delayed
  {
    id: "#1027",
    time: "09:30 AM",
    timer: "22:21",
    type: "Dine In",
    station: "Grill",
    status: "delayed",
    items: [
      { name: "Grilled Chicken", quantity: 2, options: ["With vegetables"] }
    ]
  },
  {
    id: "#1028",
    time: "09:26 AM",
    timer: "26:21",
    type: "Collection",
    station: "Fryer",
    notified: true,
    status: "delayed",
    items: [
      { name: "Fish & Chips", quantity: 2, options: ["Extra tartar sauce"] }
    ]
  }
];
