import { Conversation, conversations, ChatTabType } from "@/app/(admin)/admin/chat/page";
import { Search, Store } from "lucide-react";

function TabButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 text-[14px] font-medium transition-colors ${
        active
          ? "border-b-2 border-[#f9671a] text-[#f9671a]"
          : "text-[#626262] hover:text-white"
      }`}
    >
      {label}
      {count !== undefined && (
        <span
          className={`px-2 py-0.5 rounded-full text-[12px] font-medium ${
            active ? "bg-[#f9671a]/10 text-[#f9671a]" : "text-[#626262]"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function ConversationItem({
  conv,
  selected,
  onClick,
}: {
  conv: Conversation;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start justify-between px-4 py-3 text-left transition-colors ${
        selected ? "bg-[#f9671a]/5" : "hover:bg-[#3d3d3d]/30"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <ConversationAvatar conv={conv} />
          {conv.online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00a706] rounded-full border-2 border-[##26262680]" />
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col w-[175px]">
          <span className="text-[#fff7f3] font-medium text-[15px] leading-5 truncate">
            {conv.name}
          </span>
          <span className="text-[#626262] text-[12px] leading-5 truncate">
            {conv.preview}
          </span>
        </div>
      </div>

      {/* Right side: time + badge */}
      <div className="flex flex-col items-end gap-1 shrink-0 w-14">
        <span className="text-[#626262] text-[12px]">{conv.time}</span>
        {conv.unread > 0 && (
          <span className="bg-[#f9671a] text-white text-[10px] font-medium rounded-full px-1.5 py-0.5 leading-none">
            {conv.unread}
          </span>
        )}
      </div>
    </button>
  );
}

function ConversationAvatar({ conv }: { conv: Conversation }) {
  if (conv.isBranch) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#f9671a]/10 border border-[#f9671a] flex items-center justify-center text-[#f9671a]">
        <span className="text-[11px] font-bold">
          <Store size={18} />
        </span>
      </div>
    );
  }
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-semibold"
      style={{ backgroundColor: conv.avatarColor || "#3d3d3d" }}
    >
      {conv.avatarInitials}
    </div>
  );
}

export default function ConversationListPanel({
  activeTab,
  setActiveTab,
  selectedConvId,
  setSelectedConvId,
}: {
  activeTab: ChatTabType;
  setActiveTab: (t: ChatTabType) => void;
  selectedConvId: string;
  setSelectedConvId: (id: string) => void;
}) {
  const tabs: ChatTabType[] = ["All", "Unread", "Branch"];

  return (
    <div className="w-[372px] shrink-0 bg-[#1E1E20] border border-[#353535] rounded-[20px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-white font-semibold text-[22px]">Conversations</h2>

        {/* Search bar */}
        <div className="flex items-center gap-3 border border-[#3d3d3d] rounded-lg px-3 py-2">
          <Search size={18} className="text-[#626262]" />
          <span className="text-[#626262] text-[14px]">Search Conversations</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              label={tab}
              count={tab === "All" ? 32 : tab === "Unread" ? 32 : undefined}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conv={conv}
            selected={conv.id === selectedConvId}
            onClick={() => setSelectedConvId(conv.id)}
          />
        ))}
      </div>
    </div>
  );
}