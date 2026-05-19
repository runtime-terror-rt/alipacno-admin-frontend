export interface StaffMember {
  id: string;
  name: string;
  avatar: string; // Initials or local gradient identifier
  role: string;
  clockIn: string;
  clockOut: string;
  hoursToday: string;
  sales: string;
  status: "On Duty" | "Off Duty";
}

export interface StaffStat {
  label: string;
  value: string;
  iconName: "user" | "clock" | "dollar" | "percent";
}

export const STAFF_STATS: StaffStat[] = [
  { label: "Clocked In", value: "20 / 25", iconName: "user" },
  { label: "Total Hours", value: "24.0h", iconName: "clock" },
  { label: "Staff Sales", value: "£2137.50", iconName: "dollar" },
  { label: "Commissions", value: "£106.88", iconName: "percent" }
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "#001",
    name: "Darlene Robertson",
    avatar: "DR",
    role: "Manager",
    clockIn: "09:00 AM",
    clockOut: "--:--",
    hoursToday: "5.5h",
    sales: "£1245.50",
    status: "On Duty"
  },
  {
    id: "#002",
    name: "Jerome Bell",
    avatar: "JB",
    role: "Chef",
    clockIn: "09:00 AM",
    clockOut: "--:--",
    hoursToday: "5.5h",
    sales: "£1245.50",
    status: "On Duty"
  },
  {
    id: "#003",
    name: "Arlene McCoy",
    avatar: "AM",
    role: "Server",
    clockIn: "09:00 AM",
    clockOut: "--:--",
    hoursToday: "--",
    sales: "--",
    status: "Off Duty"
  },
  {
    id: "#004",
    name: "Esther Howard",
    avatar: "EH",
    role: "Chef",
    clockIn: "09:00 AM",
    clockOut: "--:--",
    hoursToday: "5.5h",
    sales: "£1245.50",
    status: "On Duty"
  },
  {
    id: "#005",
    name: "Cameron Williamson",
    avatar: "CW",
    role: "Server",
    clockIn: "09:00 AM",
    clockOut: "--:--",
    hoursToday: "--",
    sales: "--",
    status: "Off Duty"
  },
  {
    id: "#006",
    name: "Lori James",
    avatar: "LJ",
    role: "Bartender",
    clockIn: "08:00 AM",
    clockOut: "--:--",
    hoursToday: "4.5h",
    sales: "£980.00",
    status: "On Duty"
  },
  {
    id: "#007",
    name: "Zachary Smith",
    avatar: "ZS",
    role: "Manager",
    clockIn: "09:00 AM",
    clockOut: "--:--",
    hoursToday: "6h",
    sales: "£1350.00",
    status: "On Duty"
  },
  {
    id: "#008",
    name: "Megan Jones",
    avatar: "MJ",
    role: "Server",
    clockIn: "09:00 AM",
    clockOut: "--:--",
    hoursToday: "5h",
    sales: "£1110.00",
    status: "On Duty"
  },
  {
    id: "#009",
    name: "Travis Turner",
    avatar: "TT",
    role: "Chef",
    clockIn: "09:00 AM",
    clockOut: "--:--",
    hoursToday: "6h",
    sales: "£1500.00",
    status: "On Duty"
  }
];
