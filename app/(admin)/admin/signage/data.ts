export const statCardsData = [
  {
    id: 1,
    label: "Total Screens",
    value: "48",
    change: "8.4%",
    positive: true,
  },
  {
    id: 2,
    label: "Active Screens",
    value: "42",
    change: "12.4%",
    positive: true,
  },
  {
    id: 3,
    label: "Scheduled Contents",
    value: "24",
    change: "12.4%",
    positive: true,
  },
  {
    id: 4,
    label: "Total Impressions",
    value: "124.5 K",
    change: "12.4%",
    positive: true,
  },
];

export const signageTableData = [
  {
    id: "1",
    name: "Main Counter Screen 1",
    resolution: "1920 × 1080",
    image: "/admin/Signage/signage1.png", // Assume images exist or fallback
    branch: "Downtown Branch",
    status: "Active",
    updatedTime: "09:42 AM",
    updatedDate: "May 04 2026",
  },
  {
    id: "2",
    name: "Kitchen Display",
    resolution: "(312) 555-0192", // from screenshot
    image: "/admin/Signage/signage2.png",
    branch: "Uptown Branch",
    status: "Active",
    updatedTime: "09:42 AM",
    updatedDate: "May 04 2026",
  },
  {
    id: "3",
    name: "Drive Thru Screen",
    resolution: "1920 × 1080",
    image: "/admin/Signage/signage3.png",
    branch: "Uptown Branch",
    status: "Active",
    updatedTime: "09:42 AM",
    updatedDate: "May 04 2026",
  },
  {
    id: "4",
    name: "Dining Area Screen",
    resolution: "1920 × 1080",
    image: "/admin/Signage/signage4.png",
    branch: "Airport Road Branch",
    status: "Scheduled",
    updatedTime: "09:42 AM",
    updatedDate: "May 04 2026",
  },
  {
    id: "5",
    name: "Dessert Screen",
    resolution: "1920 × 1080",
    image: "/admin/Signage/signage5.png",
    branch: "Airport Road Branch",
    status: "Active",
    updatedTime: "09:42 AM",
    updatedDate: "May 04 2026",
  },
];

export const contentOverviewData = {
  total: 128,
  items: [
    { label: "Images", value: 62, percentage: "88.2%", color: "bg-emerald-500" },
    { label: "Videos", value: 32, percentage: "6.1%", color: "bg-orange-500" },
    { label: "Playlists", value: 20, percentage: "4.1%", color: "bg-blue-500" },
    { label: "Others", value: 12, percentage: "1.6%", color: "bg-red-500" },
  ]
};

export const upcomingSchedulesData = [
  { time: "10:00 AM", title: "Veg Items", count: "42 items", status: "Today" },
  { time: "12:00 PM", title: "Spic Items", count: "42 items", status: "Today" },
  { time: "03:00 PM", title: "Modifier Groups", count: "42 items", status: "Today" },
];
