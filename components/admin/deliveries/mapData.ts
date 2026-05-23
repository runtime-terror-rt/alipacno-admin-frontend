export interface DeliveryStat {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapRoute {
  id: string;
  driverId: number;
  timeLabel: string;
  distanceLabel: string;
  color: string;
  status: "on-time" | "at-risk" | "late" | "completed";
  nodes: LatLng[];
  destinationName: string;
}

export interface LiveOrder {
  id: string;
  customerName: string;
  address: string;
  price: string;
  timeLabel: string;
  status: "Preparing" | "Ready" | "Out for Delivery" | "Delivered" | "Late";
  timerState: "overdue" | "warning" | "good";
}

export const DELIVERY_STATS: DeliveryStat[] = [
  { label: "Active Deliveries", value: "12/30", change: "+12.4%", isPositive: true },
  { label: "Late Order", value: "3", change: "25% of active", isPositive: false },
  { label: "Avg Delivery Time", value: "3 mins", change: "25% of active", isPositive: false },
  { label: "Delivery Today", value: "3 mins", change: "25% of active", isPositive: false },
  { label: "Completed Delivery", value: "18 Orders", change: "25% of active", isPositive: true },
];

// Eltham, Victoria, Australia coordinates (Center Point Hub configuration)
export const PACINOS_CENTER: LatLng = { lat: -37.7214, lng: 145.1488 };

export const LIVE_ORDERS: LiveOrder[] = [
  {
    id: "#10482",
    customerName: "Ahmed Khan",
    address: "23 Court Road, SE9 5NP",
    price: "£23.80",
    timeLabel: "2 MIN OVERDUE",
    status: "Out for Delivery",
    timerState: "overdue",
  },
  {
    id: "#10483",
    customerName: "Sarah Jenkins",
    address: "45 Park Lane, SE9 2PP",
    price: "£18.50",
    timeLabel: "12 MINS REMAINING",
    status: "Out for Delivery",
    timerState: "good",
  },
  {
    id: "#10484",
    customerName: "Michael Chang",
    address: "12 High Street, SE9 1AB",
    price: "£34.20",
    timeLabel: "8 MINS REMAINING",
    status: "Ready",
    timerState: "warning",
  },
  {
    id: "#10485",
    customerName: "Emma Watson",
    address: "88 Crown Court, SE9 4XX",
    price: "£29.90",
    timeLabel: "5 MINS REMAINING",
    status: "Preparing",
    timerState: "warning",
  },
  {
    id: "#10486",
    customerName: "David Beckham",
    address: "77 Beckham Way, SE9 9GG",
    price: "£42.00",
    timeLabel: "22 MINS REMAINING",
    status: "Preparing",
    timerState: "good",
  },
];