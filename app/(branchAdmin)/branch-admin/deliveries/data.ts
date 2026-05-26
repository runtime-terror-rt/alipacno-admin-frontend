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
  status: "Preparing" | "Ready" | "Out for Delivery" | "Delivered" | "Late" |"Driver Assigned" |"Ready for Dispatch";
  timerState: "overdue" | "warning" | "good";
}

export const DELIVERY_STATS: DeliveryStat[] = [
  { label: "Active Deliveries", value: "12/30", change: "+12.4%", isPositive: true },
  { label: "Late Order", value: "3", change: "25% of active", isPositive: true },
  { label: "Avg Delivery Time", value: "3 mins", change: "25% of active", isPositive: false },
  { label: "Delivery Today", value: "3 mins", change: "25% of active", isPositive: false },
  { label: "Completed Delivery", value: "18 Orders", change: "25% of active", isPositive: true },
];

// Eltham, Victoria, Australia coordinates (Center: -37.7214, 145.1488)
export const PACINOS_CENTER: LatLng = { lat: -37.7214, lng: 145.1488 };

export const MAP_ROUTES: MapRoute[] = [
  {
    id: "route-1",
    driverId: 1,
    timeLabel: "12 min",
    distanceLabel: "3.2 km",
    color: "#3b82f6", // blue
    status: "on-time",
    nodes: [
      PACINOS_CENTER,
      { lat: -37.7120, lng: 145.1420 },
      { lat: -37.7050, lng: 145.1320 },
      { lat: -37.6980, lng: 145.1200 },
      { lat: -37.6912, lng: 145.1030 }, // ELTHAM NORTH
    ],
    destinationName: "ELTHAM NORTH",
  },
  {
    id: "route-2",
    driverId: 2,
    timeLabel: "18 min",
    distanceLabel: "5.6 km",
    color: "#10b981", // green
    status: "on-time",
    nodes: [
      PACINOS_CENTER,
      { lat: -37.7150, lng: 145.1250 },
      { lat: -37.7100, lng: 145.0950 },
      { lat: -37.7082, lng: 145.0430 }, // BUNDOORA
    ],
    destinationName: "BUNDOORA",
  },
  {
    id: "route-3",
    driverId: 3,
    timeLabel: "16 min",
    distanceLabel: "4.1 km",
    color: "#a855f7", // purple
    status: "at-risk",
    nodes: [
      PACINOS_CENTER,
      { lat: -37.7250, lng: 145.1320 },
      { lat: -37.7280, lng: 145.1100 },
      { lat: -37.7001, lng: 145.1010 }, // GREENSBOROUGH
    ],
    destinationName: "GREENSBOROUGH",
  },
  {
    id: "route-4",
    driverId: 4,
    timeLabel: "2 min",
    distanceLabel: "Overdue",
    color: "#ef4444", // red
    status: "late",
    nodes: [
      PACINOS_CENTER,
      { lat: -37.7320, lng: 145.1120 },
      { lat: -37.7400, lng: 145.0800 },
      { lat: -37.7250, lng: 145.0160 }, // RESERVOIR
    ],
    destinationName: "RESERVOIR",
  },
  {
    id: "route-5",
    driverId: 5,
    timeLabel: "14 min",
    distanceLabel: "3.8 km",
    color: "#f97316", // orange
    status: "on-time",
    nodes: [
      PACINOS_CENTER,
      { lat: -37.7250, lng: 145.1620 },
      { lat: -37.7320, lng: 145.1850 },
      { lat: -37.7450, lng: 145.2100 }, // MILL PARK
    ],
    destinationName: "MILL PARK",
  },
];

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
