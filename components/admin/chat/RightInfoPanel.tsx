import { Conversation, Member, members} from "@/app/(admin)/admin/chat/page";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

const sharedMediaColors = ["#c0392b", "#e67e22", "#27ae60", "#2980b9"];

const sharedMediaImages = [
  "/admin/chat/pizza.jpg",
  "/admin/chat/burger.jpg",
  "/admin/chat/media3.jpg",
  "/admin/chat/media4.jpg",
];

function MembersPanel({ conversation }: { conversation: Conversation }) {
  return (
    <div className="bg-[#1E1E20] border border-[#353535] rounded-[20px] p-4 flex flex-col gap-5">
      {/* Active conversation header */}
      <div className="flex items-center gap-4 bg-[#f9671a]/5 rounded-lg px-3 py-3">
        <div className="w-10 h-10 rounded-full bg-[#f9671a]/10 border border-[#f9671a] flex items-center justify-center text-[#f9671a] shrink-0">
          <span className="text-[11px] font-bold">BR</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#fff7f3] font-medium text-[16px]">
            {conversation.name}
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00a706] rounded-full" />
            <span className="text-[#00a706] text-[12px]">Online</span>
          </div>
        </div>
      </div>

      {/* Members list header */}
      <div className="flex items-center justify-between">
        <span className="text-white text-[12px]">Members (8)</span>
        <button className="text-[#f9671a] text-[12px] hover:underline">
          View All
        </button>
      </div>

      {/* Members */}
      <div className="flex flex-col divide-y divide-[#343436]">
        {members.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}
      </div>

      <p className="text-[#626262] text-[12px] text-right">+4 more members</p>
    </div>
  );
}

function MemberRow({ member }: { member: Member }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-[#3d3d3d] flex items-center justify-center text-white text-[13px] font-semibold">
            {/* {member.initials} */}
            <Image src="/admin/avatar/default.png" alt={member.name} width={40} height={40} />
          </div>
        </div>

        <div className="flex flex-col w-[175px]">
          <span className="text-[#fff7f3] font-medium text-[15px]">{member.name}</span>
          <span className="text-[#626262] text-[12px]">{member.role}</span>
        </div>
      </div>

      {/* Online indicator */}
      {member.online && (
        <span className="w-2.5 h-2.5 bg-[#00a706] rounded-full shrink-0" />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Shared media panel
// ─────────────────────────────────────────────


function SharedMediaPanel() {
  return (
    <div className="bg-[#1E1E20] border border-[#353535] rounded-[20px] p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[#fff7f3] font-medium text-[18px]">Shared Media</span>
        <button className="text-[#f9671a] text-[12px] hover:underline">
          View All
        </button>
      </div>

      {/* Media grid */}
      <SharedMediaGrid />
    </div>
  );
}

function SharedMediaGrid() {
  return (
    <div className="grid grid-cols-4 gap-2 h-[70px]">
      {sharedMediaImages.slice(0, 3).map((image, i) => (
        <div
          key={i}
          className="rounded-xl flex items-center justify-center"
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        >
          <ImageIcon size={20} className="text-white/60" />
        </div>
      ))}

      {/* +12 overlay tile */}
      <div className="relative rounded-xl overflow-hidden bg-[#3d3d3d]">
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <span className="text-white text-[12px] font-medium">+12</span>
        </div>
      </div>
    </div>
  );
}

export default function RightInfoPanel({ conversation }: { conversation: Conversation }) {
  return (
    <div className="w-[372px] shrink-0 flex flex-col gap-6 overflow-y-auto">
      <MembersPanel conversation={conversation} />
      <SharedMediaPanel />
    </div>
  );
}