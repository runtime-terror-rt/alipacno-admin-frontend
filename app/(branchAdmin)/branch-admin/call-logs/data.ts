export interface CallStat {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}

export interface CallLog {
  id: string;
  time: string;
  callNumber: string;
  customer: string;
  duration: string;
  status: "Answered" | "Missed";
  outcome: string;
  linkedOrder?: string;
  postcode: string;
  actionText: "View Order" | "Call Back";
}

export interface ConvertedOrder {
  id: string;
  time: string;
  callNumber: string;
  customer: string;
  duration: string;
  orderNumber: string;
  orderType: "Delivery" | "Collection" | "Dine-In";
  status: "Completed" | "Preparing" | "Cancelled";
  postcode: string;
}

export interface OrderHistoryCallLog {
  id: string;
  time: string;
  date: string;
  duration: string;
  customer: string;
  branchName: string;
  phone: string;
  actionText: "Older Placed" | "Order Converted";
  isSuccess: boolean;
}

export const CALL_STATS: CallStat[] = [
  { label: "TOTAL CALLS", value: "50", change: "+12.5%", isPositive: true, subtext: "vs last period" },
  { label: "Call Converted", value: "30", change: "+2.1%", isPositive: true, subtext: "vs last period" },
  { label: "Missed Calls", value: "20", change: "+2.1%", isPositive: true, subtext: "vs last period" },
  { label: "CONVERSION RATE", value: "24.8%", change: "-0.8%", isPositive: false, subtext: "vs last period" },
  { label: "AVG. CALL DURATION", value: "04:42", change: "+5.4%", isPositive: true, subtext: "Labor + COGS" }
];

export const CALL_LOGS: CallLog[] = [
  {
    id: "1",
    time: "08:40 PM",
    callNumber: "+44 3050 244896",
    customer: "Sarah Mitchell",
    duration: "04:12",
    status: "Answered",
    outcome: "#4589 (£300)",
    linkedOrder: "#UK1042 (£300)",
    postcode: "NW1 6XE",
    actionText: "View Order"
  },
  {
    id: "2",
    time: "08:40 PM",
    callNumber: "+44 3050 244896",
    customer: "Sarah Mitchell",
    duration: "04:12",
    status: "Missed",
    outcome: "Missed Call",
    linkedOrder: "#4589 (£300)",
    postcode: "NW1 6XE",
    actionText: "Call Back"
  },
  {
    id: "3",
    time: "08:40 PM",
    callNumber: "+44 3050 244896",
    customer: "Sarah Mitchell",
    duration: "04:12",
    status: "Answered",
    outcome: "#4589 (£300)",
    linkedOrder: "#4589 (£300)",
    postcode: "NW1 6XE",
    actionText: "Call Back"
  },
  {
    id: "4",
    time: "08:40 PM",
    callNumber: "+44 3050 244896",
    customer: "Sarah Mitchell",
    duration: "04:12",
    status: "Missed",
    outcome: "Missed Call",
    linkedOrder: "#4589 (£300)",
    postcode: "NW1 6XE",
    actionText: "Call Back"
  },
  {
    id: "5",
    time: "08:40 PM",
    callNumber: "+44 3050 244896",
    customer: "Sarah Mitchell",
    duration: "04:12",
    status: "Answered",
    outcome: "No Order",
    linkedOrder: "#4589 (£300)",
    postcode: "NW1 6XE",
    actionText: "Call Back"
  }
];

export const CONVERTED_ORDERS: ConvertedOrder[] = [
  {
    id: "c1",
    time: "08:40 PM",
    callNumber: "+44 3050 244896",
    customer: "Sarah Mitchell",
    duration: "04:12",
    orderNumber: "#4589 (£300)",
    orderType: "Delivery",
    status: "Completed",
    postcode: "NW1 6XE"
  },
  {
    id: "c2",
    time: "08:40 PM",
    callNumber: "+44 3050 244896",
    customer: "Sarah Mitchell",
    duration: "04:12",
    orderNumber: "#4589 (£600)",
    orderType: "Delivery",
    status: "Completed",
    postcode: "NW1 6XE"
  },
  {
    id: "c3",
    time: "08:40 PM",
    callNumber: "+44 3050 244896",
    customer: "Sarah Mitchell",
    duration: "04:12",
    orderNumber: "#4589 (£500)",
    orderType: "Delivery",
    status: "Completed",
    postcode: "NW1 6XE"
  }
];

export const HISTORY_CALLS: OrderHistoryCallLog[] = [
  {
    id: "h1",
    time: "09:42 AM",
    date: "May 04, 2026",
    duration: "02:18",
    customer: "Brooklyn Simmons",
    branchName: "Eltham (£1,010)",
    phone: "(312) 555-0192",
    actionText: "Older Placed",
    isSuccess: true
  },
  {
    id: "h2",
    time: "09:42 AM",
    date: "May 04, 2026",
    duration: "02:18",
    customer: "Brooklyn Simmons",
    branchName: "Eltham (£1,010)",
    phone: "(312) 555-0192",
    actionText: "Older Placed",
    isSuccess: true
  },
  {
    id: "h3",
    time: "09:42 AM",
    date: "May 04, 2026",
    duration: "02:18",
    customer: "Brooklyn Simmons",
    branchName: "Eltham (£1,010)",
    phone: "(312) 555-0192",
    actionText: "Older Placed",
    isSuccess: false
  },
  {
    id: "h4",
    time: "09:42 AM",
    date: "May 04, 2026",
    duration: "02:18",
    customer: "Brooklyn Simmons",
    branchName: "Eltham (£1,010)",
    phone: "(312) 555-0192",
    actionText: "Older Placed",
    isSuccess: true
  },
  {
    id: "h5",
    time: "09:42 AM",
    date: "May 04, 2026",
    duration: "02:18",
    customer: "Brooklyn Simmons",
    branchName: "Eltham (£1,010)",
    phone: "(312) 555-0192",
    actionText: "Order Converted",
    isSuccess: true
  }
];
