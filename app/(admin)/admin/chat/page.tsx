"use client";

import { useState } from "react";
import {
  ImageIcon,
} from "lucide-react";
import ConversationListPanel from "@/components/admin/chat/ConversationListPanel";
import ChatWindow from "@/components/admin/chat/ChatWindow";
import RightInfoPanel from "@/components/admin/chat/RightInfoPanel";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ChatTabType = "All" | "Unread" | "Branch";

export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  isBranch: boolean;
  online: boolean;
  avatarInitials?: string;
  avatarColor?: string;
}

export interface Message {
  id: string;
  sender: string;
  senderRole?: string;
  text: string;
  time: string;
  isOwn: boolean;
  isRead?: boolean;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  online: boolean;
  initials: string;
}

// ─────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────

export const conversations: Conversation[] = [
  { id: "1", name: "Downtown Branch", preview: "New stock received for today,", time: "10:32 AM", unread: 3, isBranch: true, online: true },
  { id: "2", name: "John Smith", preview: "Can you approve the refund?", time: "10:32 AM", unread: 1, isBranch: false, online: true, avatarInitials: "JS", avatarColor: "#3d4f6e" },
  { id: "3", name: "Emily Johnson", preview: "New stock received for today,", time: "10:32 AM", unread: 3, isBranch: false, online: true, avatarInitials: "EJ", avatarColor: "#6e3d5a" },
  { id: "4", name: "Central Park Store", preview: "Inventory audit completed this morning.", time: "10:35 AM", unread: 0, isBranch: true, online: true },
  { id: "5", name: "Michael Lee", preview: "Requesting update on shipment delays.", time: "10:37 AM", unread: 0, isBranch: false, online: true, avatarInitials: "ML", avatarColor: "#3d6e5a" },
  { id: "6", name: "Samantha Green", preview: "Scheduled maintenance for next week.", time: "10:38 AM", unread: 0, isBranch: false, online: true, avatarInitials: "SG", avatarColor: "#6e5a3d" },
  { id: "7", name: "Uptown Outlet", preview: "Seasonal sale starts tomorrow.", time: "10:40 AM", unread: 0, isBranch: true, online: true },
  { id: "8", name: "David Kim", preview: "Client feedback received, please review.", time: "10:42 AM", unread: 0, isBranch: false, online: true, avatarInitials: "DK", avatarColor: "#3d3d6e" },
  { id: "9", name: "Olivia Martinez", preview: "New promotional materials delivered.", time: "10:43 AM", unread: 0, isBranch: false, online: true, avatarInitials: "OM", avatarColor: "#5a3d6e" },
  { id: "10", name: "Eastside Depot", preview: "Restocked popular items after weekend.", time: "10:45 AM", unread: 0, isBranch: true, online: true },
  { id: "11", name: "Chris Brown", preview: "Meeting rescheduled to Thursday.", time: "10:47 AM", unread: 0, isBranch: false, online: true, avatarInitials: "CB", avatarColor: "#6e3d3d" },
  { id: "12", name: "Grace Wilson", preview: "Updated product catalog is ready.", time: "10:48 AM", unread: 0, isBranch: false, online: true, avatarInitials: "GW", avatarColor: "#4a6e3d" },
];

export const messages: Message[] = [
  { id: "1", sender: "Mark D. (Manager)", senderRole: "Manager", text: "Good morning team!", time: "3:58 PM", isOwn: false },
  { id: "2", sender: "Mark D. (Manager)", senderRole: "Manager", text: "How are today's operations going?", time: "3:58 PM", isOwn: false },
  { id: "3", sender: "Me", text: "Good morning! Everything is running smoothly.", time: "3:58 PM", isOwn: true, isRead: true },
  { id: "4", sender: "Me", text: "We received the new stock this morning.", time: "3:58 PM", isOwn: true, isRead: true },
  { id: "5", sender: "Mark D. (Manager)", senderRole: "Manager", text: "Great to hear! Please ensure the new items are updated in the system.", time: "3:58 PM", isOwn: false },
  { id: "6", sender: "Me", text: "Sure! I will update right away.", time: "3:58 PM", isOwn: true, isRead: true },
  // "New message" divider follows
  { id: "7", sender: "Mark D. (Manager)", senderRole: "Manager", text: "Great to hear! Please ensure the new items are updated in the system.", time: "3:58 PM", isOwn: false },
];

export const members: Member[] = [
  { id: "1", name: "John Smith", role: "Manager", online: true, initials: "JS" },
  { id: "2", name: "Lisa Parker", role: "Shift Supervisor", online: true, initials: "LP" },
  { id: "3", name: "Tom James", role: "Assistant Manager", online: true, initials: "TJ" },
  { id: "4", name: "James Wilson", role: "Cashier", online: true, initials: "JW" },
];

// ─────────────────────────────────────────────
// Chat page
// ─────────────────────────────────────────────

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<ChatTabType>("All");
  const [selectedConvId, setSelectedConvId] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [isTyping] = useState(true);

  const activeConv = conversations.find((c) => c.id === selectedConvId)!;

  return (
    <main className="flex gap-4 p-4 w-full h-full">
          {/* Conversations list panel */}
          <ConversationListPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedConvId={selectedConvId}
            setSelectedConvId={setSelectedConvId}
          />

          {/* Chat window */}
          <ChatWindow
            conversation={activeConv}
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isTyping={isTyping}
          />

          {/* Right sidebar: members + media */}
          <RightInfoPanel conversation={activeConv} />
    </main>
  );
}