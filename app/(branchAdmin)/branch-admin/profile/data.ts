export interface IntegrationItem {
  id: string;
  name: string;
  logoType: "uber" | "deliveroo" | "stripe" | "twilio" | "google";
  connected: boolean;
}

export interface TimelineEvent {
  id: string;
  activity: string;
  timestamp: string;
}

export interface NotificationPreference {
  id: string;
  title: string;
  subtitle: string;
  iconType: "bell" | "home" | "alert" | "car" | "marketing" | "summary";
  enabled: boolean;
}

export interface AdminProfileDetails {
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  lastLogin: string;
  accountStatus: "ACTIVE" | "INACTIVE";
  twoFactorActive: boolean;
  avatarUrl?: string;
}

export const ADMIN_PROFILE_DATA: AdminProfileDetails = {
  name: "Jesse Hayden",
  role: "Branch Manager",
  email: "debra.holt@example.com",
  phone: "(555) 123-4567",
  address: "NW1 6XE, London,221B Baker Street,Marylebone",
  lastLogin: "MAY 07, 2024 10:30 AM",
  accountStatus: "ACTIVE",
  twoFactorActive: true,
};

export const ROLE_MODULES = [
  { name: "Dashboard", enabled: true },
  { name: "Orders", enabled: true },
  { name: "CRM", enabled: true },
  { name: "Deliveries", enabled: true },
  { name: "Drivers", enabled: true },
  { name: "Staff", enabled: true },
  { name: "Inventory", enabled: true },
  { name: "Menu", enabled: true },
  { name: "Marketing", enabled: true },
  { name: "Signage", enabled: true },
  { name: "Settings", enabled: true },
  { name: "Reports", enabled: true },
  { name: "Billing", enabled: true },
  { name: "Integrations", enabled: true },
];

export const CONNECTED_INTEGRATIONS: IntegrationItem[] = [
  { id: "uber-eats", name: "Uber Eats", logoType: "uber", connected: true },
  { id: "deliveroo", name: "Deliveroo", logoType: "deliveroo", connected: true },
  { id: "stripe", name: "Stripe", logoType: "stripe", connected: true },
  { id: "twilio", name: "Twilio (SMS)", logoType: "twilio", connected: true },
  { id: "google-maps", name: "Google Maps", logoType: "google", connected: true },
];

export const ACTIVITY_TIMELINE: TimelineEvent[] = [
  { id: "act-1", activity: "You updated Richmond branch settings", timestamp: "May 07, 2024 10:30 AM" },
  { id: "act-2", activity: "Approved manager access for John Smith", timestamp: "May 06, 2024 04:15 PM" },
  { id: "act-3", activity: "Created new marketing campaign \"Weekend Offer\"", timestamp: "May 06, 2024 02:45 PM" },
  { id: "act-4", activity: "Exported revenue report for April 2024", timestamp: "May 05, 2024 11:20 AM" },
  { id: "act-5", activity: "Changed system notification settings", timestamp: "May 05, 2024 08:10 AM" },
  { id: "act-6", activity: "Added new admin user: Sarah Johnson", timestamp: "May 04, 2024 05:30 PM" },
  { id: "act-7", activity: "Updated delivery radius for 3 branches", timestamp: "May 04, 2024 03:25 PM" },
];

export const NOTIFICATION_PREFERENCES: NotificationPreference[] = [
  { id: "order-alerts", title: "Order Alerts", subtitle: "Order Alerts", iconType: "bell", enabled: true },
  { id: "branch-alerts", title: "Branch Alerts", subtitle: "(SMS, Email)", iconType: "home", enabled: false },
  { id: "low-stock", title: "Low Stock Alerts", subtitle: "(Email)", iconType: "alert", enabled: true },
  { id: "driver-accidents", title: "Driver Accidents", subtitle: "(SMS, Email)", iconType: "car", enabled: true },
  { id: "marketing-reports", title: "Marketing Reports", subtitle: "(Email)", iconType: "marketing", enabled: true },
  { id: "daily-summary", title: "Daily Summary", subtitle: "(Email)", iconType: "summary", enabled: false },
];
