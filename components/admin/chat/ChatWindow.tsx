
import { Conversation, Message } from "@/app/(admin)/admin/chat/page";
import {
  Paperclip,
  Smile,
  Mail,
  Mic,
  Send,
  Video,
  Phone,
  CheckCheck,
} from "lucide-react";

function ChatHeader({ conversation }: { conversation: Conversation }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-[#f9671a]/5 rounded-t-[20px] border-b border-[#343436]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#f9671a]/10 border border-[#f9671a] flex items-center justify-center text-[#f9671a]">
          <span className="text-[11px] font-bold">BR</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#fff7f3] font-medium text-[18px]">
            {conversation.name}
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00a706] rounded-full" />
            <span className="text-[#00a706] text-[12px]">Online</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-[#626262]">
        <button className="hover:text-white transition-colors">
          <Video size={22} />
        </button>
        <button className="hover:text-white transition-colors">
          <Phone size={22} />
        </button>
      </div>
    </div>
  );
}

function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-[#3d3d3d]" />
      <span className="text-[#fff7f3] text-[12px] px-3 py-1.5 rounded-full border border-[#626262] bg-[#3d3d3d]">
        {label}
      </span>
      <div className="flex-1 h-px bg-[#3d3d3d]" />
    </div>
  );
}

function NewMessageDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-[#f9671a]/30" />
      <span className="text-[#f9671a] text-[12px] px-3 py-1.5 rounded-full border border-[#f9671a] bg-[#452d21]">
        New message
      </span>
      <div className="flex-1 h-px bg-[#f9671a]/30" />
    </div>
  );
}

function ChatBubble({ message }: { message: Message }) {
  if (message.isOwn) {
    return (
      <div className="flex justify-end">
        <div className="flex flex-col gap-2 items-end max-w-[60%]">
          <div className="bg-[#3d3d3d]/40 rounded-xl px-4 py-3 flex flex-col gap-2">
            <p className="text-[#fff7f3] text-[14px] leading-relaxed whitespace-nowrap">
              {message.text}
            </p>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-[#9c9c9c] text-[12px]">{message.time}</span>
              {message.isRead && (
                <CheckCheck size={14} className="text-[#f9671a]" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4">
      {/* Avatar */}
      <div className="w-[60px] h-[60px] rounded-full bg-[#3d3d3d] flex items-center justify-center shrink-0 overflow-hidden">
        <span className="text-white font-semibold text-[16px]">MD</span>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[#f9671a] text-[14px]">{message.sender}</p>
          <div className="bg-[#101010] rounded-xl px-4 py-3">
            <p className="text-[#fff7f3] text-[14px] leading-relaxed">
              {message.text}
            </p>
          </div>
        </div>
        <span className="text-[#9c9c9c] text-[12px] shrink-0 mt-1 opacity-90">
          {message.time}
        </span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[40px] h-[40px] rounded-full bg-[#3d3d3d] flex items-center justify-center shrink-0">
        <span className="text-white text-[11px] font-semibold">MD</span>
      </div>
      <div className="flex items-center gap-3 bg-transparent rounded-xl px-4 py-3">
        <span className="text-[#fff7f3] text-[14px]">Mark D. is typing...</span>
        {/* Animated dots */}
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-[#626262] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border-t border-[#3d3d3d] m-4 border rounded-xl bg-[##26262680] flex flex-col gap-3">
      {/* Text area */}
      <div className="px-4 pt-3 min-h-[60px]">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          className="w-full bg-transparent text-[14px] text-white placeholder-[#626262] resize-none outline-none leading-relaxed"
          rows={2}
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 pb-3">
        <div className="flex items-center gap-4 text-[#626262]">
          <button className="hover:text-white transition-colors">
            <Smile size={22} />
          </button>
          <button className="hover:text-white transition-colors">
            <Paperclip size={22} />
          </button>
          <button className="hover:text-white transition-colors">
            <Mail size={22} />
          </button>
          <button className="hover:text-white transition-colors">
            <Mic size={22} />
          </button>
        </div>

        <button className="w-8 h-8 bg-[#f9671a] rounded-lg flex items-center justify-center hover:bg-[#e5601a] transition-colors">
          <Send size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default function ChatWindow({
  conversation,
  messages,
  inputValue,
  setInputValue,
  isTyping,
}: {
  conversation: Conversation;
  messages: Message[];
  inputValue: string;
  setInputValue: (v: string) => void;
  isTyping: boolean;
}) {
  return (
    <div className="flex-1 bg-[#1E1E20] border border-[#353535] rounded-[20px] flex flex-col overflow-hidden">
      {/* Chat header */}
      <ChatHeader conversation={conversation} />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-8 p-5">
        {/* Date divider */}
        <DateDivider label="Today" />

        {/* Messages before new-message divider */}
        {messages.slice(0, 6).map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {/* New message divider */}
        <NewMessageDivider />

        {/* Messages after divider */}
        {messages.slice(6).map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Message input */}
      <MessageInput value={inputValue} onChange={setInputValue} />
    </div>
  );
}