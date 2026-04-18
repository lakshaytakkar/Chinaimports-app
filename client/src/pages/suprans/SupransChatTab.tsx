import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  ArrowLeft,
  Paperclip,
  Mic,
  Send,
  Play,
  FileText,
  Plus,
  X,
  Check,
  CheckCheck,
} from "lucide-react";

type DateGroup = "Today" | "Yesterday" | "This week";

interface Conversation {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
  lastMessage: string;
  lastMessageType: "text" | "voice" | "file";
  timestamp: string;
  dateGroup: DateGroup;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  type: "text" | "voice" | "file";
  content: string;
  sent: boolean;
  time: string;
  read?: boolean;
  duration?: string;
  fileName?: string;
  fileSize?: string;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Sourcing Manager",
    initials: "PS",
    avatarColor: "#7C3AED",
    lastMessage: "I've sent the updated quotation for review",
    lastMessageType: "text",
    timestamp: "11:42 AM",
    dateGroup: "Today",
    unread: 3,
    online: true,
  },
  {
    id: "2",
    name: "Raj Patel",
    role: "Logistics Coordinator",
    initials: "RP",
    avatarColor: "#0891B2",
    lastMessage: "Voice note · 0:38",
    lastMessageType: "voice",
    timestamp: "10:15 AM",
    dateGroup: "Today",
    unread: 1,
    online: true,
  },
  {
    id: "3",
    name: "Meera Iyer",
    role: "Customs Officer",
    initials: "MI",
    avatarColor: "#D97706",
    lastMessage: "Commercial Invoice - Final.pdf",
    lastMessageType: "file",
    timestamp: "9:03 AM",
    dateGroup: "Today",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Arjun Singh",
    role: "Account Manager",
    initials: "AS",
    avatarColor: "#059669",
    lastMessage: "Your shipment has been cleared at customs",
    lastMessageType: "text",
    timestamp: "Yesterday",
    dateGroup: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Suprans Team",
    role: "General Support",
    initials: "ST",
    avatarColor: "#F03B3B",
    lastMessage: "Welcome to Suprans! How can we help today?",
    lastMessageType: "text",
    timestamp: "Mon",
    dateGroup: "This week",
    unread: 0,
    online: true,
  },
  {
    id: "6",
    name: "Divya Nair",
    role: "Quality Inspector",
    initials: "DN",
    avatarColor: "#BE185D",
    lastMessage: "Inspection report has been attached",
    lastMessageType: "file",
    timestamp: "Mon",
    dateGroup: "This week",
    unread: 0,
    online: false,
  },
  {
    id: "7",
    name: "Vikram Gupta",
    role: "Payments Team",
    initials: "VG",
    avatarColor: "#2563EB",
    lastMessage: "Your payment of ₹2,40,000 was confirmed",
    lastMessageType: "text",
    timestamp: "Sun",
    dateGroup: "This week",
    unread: 0,
    online: false,
  },
  {
    id: "8",
    name: "Ananya Krishnan",
    role: "Storage Coordinator",
    initials: "AK",
    avatarColor: "#0F766E",
    lastMessage: "Warehouse slot confirmed for next Tuesday",
    lastMessageType: "text",
    timestamp: "Sat",
    dateGroup: "This week",
    unread: 0,
    online: false,
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "m1", type: "text", content: "Hi! We're ready to proceed with the order for the autumn collection.", sent: false, time: "10:02 AM", read: true },
    { id: "m2", type: "text", content: "Great. Can you share the updated MOQ for the knit fabrics?", sent: true, time: "10:05 AM", read: true },
    { id: "m3", type: "voice", content: "", sent: false, time: "10:10 AM", duration: "0:52" },
    { id: "m4", type: "text", content: "Thank you for the voice note! I'll review and get back shortly.", sent: true, time: "10:14 AM", read: true },
    { id: "m5", type: "file", content: "", sent: false, time: "11:38 AM", fileName: "Quotation_Q3_2025.pdf", fileSize: "342 KB" },
    { id: "m6", type: "text", content: "I've sent the updated quotation for review", sent: false, time: "11:42 AM" },
  ],
  "2": [
    { id: "m1", type: "text", content: "The shipment left Shanghai port on Tuesday.", sent: false, time: "9:00 AM", read: true },
    { id: "m2", type: "text", content: "Excellent! What's the expected arrival at JNPT?", sent: true, time: "9:04 AM", read: true },
    { id: "m3", type: "voice", content: "", sent: false, time: "10:15 AM", duration: "0:38" },
  ],
  "3": [
    { id: "m1", type: "text", content: "All clearance docs are ready.", sent: false, time: "8:45 AM", read: true },
    { id: "m2", type: "text", content: "Can you send the commercial invoice?", sent: true, time: "8:58 AM", read: true },
    { id: "m3", type: "file", content: "", sent: false, time: "9:03 AM", fileName: "Commercial Invoice - Final.pdf", fileSize: "218 KB" },
  ],
  "4": [
    { id: "m1", type: "text", content: "Your shipment has been cleared at customs", sent: false, time: "Yesterday", read: true },
  ],
  "5": [
    { id: "m1", type: "text", content: "Welcome to Suprans! How can we help today?", sent: false, time: "Mon", read: true },
  ],
  "6": [
    { id: "m1", type: "text", content: "Inspection passed — 98% acceptance rate.", sent: false, time: "Mon", read: true },
    { id: "m2", type: "file", content: "", sent: false, time: "Mon", fileName: "Inspection_Report_Lot42.xlsx", fileSize: "512 KB" },
  ],
  "7": [
    { id: "m1", type: "text", content: "Your payment of ₹2,40,000 was confirmed", sent: false, time: "Sun", read: true },
    { id: "m2", type: "text", content: "Thank you! Please share the receipt.", sent: true, time: "Sun", read: true },
  ],
  "8": [
    { id: "m1", type: "text", content: "Hi! We have warehouse space available from 22nd.", sent: false, time: "Sat", read: true },
    { id: "m2", type: "text", content: "Warehouse slot confirmed for next Tuesday", sent: false, time: "Sat", read: true },
  ],
};

const SERVICE_TILES = [
  { id: "sourcing", emoji: "🔍", label: "Sourcing" },
  { id: "shipping", emoji: "🚢", label: "Shipping" },
  { id: "customs", emoji: "🛃", label: "Customs" },
  { id: "quality", emoji: "✅", label: "Quality" },
  { id: "storage", emoji: "🏭", label: "Storage" },
  { id: "payments", emoji: "💳", label: "Payments" },
  { id: "documents", emoji: "📄", label: "Documents" },
  { id: "other", emoji: "💬", label: "Other" },
];

const DATE_GROUPS: DateGroup[] = ["Today", "Yesterday", "This week"];

export default function SupransChatTab() {
  const [view, setView] = useState<"list" | "chat">("list");
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [showNewConv, setShowNewConv] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [view, selectedConv]);

  const handleOpenChat = (conv: Conversation) => {
    setSelectedConv(conv);
    setView("chat");
  };

  const handleBack = () => {
    setView("list");
    setSelectedConv(null);
    setInputText("");
  };

  const handleSend = () => {
    if (!inputText.trim() || !selectedConv) return;
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      type: "text",
      content: inputText.trim(),
      sent: true,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setMessagesMap((prev) => ({
      ...prev,
      [selectedConv.id]: [...(prev[selectedConv.id] ?? []), newMsg],
    }));
    setInputText("");
  };

  if (view === "chat" && selectedConv) {
    const messages = messagesMap[selectedConv.id] ?? [];
    return (
      <ChatDetail
        conv={selectedConv}
        messages={messages}
        inputText={inputText}
        setInputText={setInputText}
        onBack={handleBack}
        onSend={handleSend}
        messagesEndRef={messagesEndRef}
      />
    );
  }

  return (
    <>
      <ConversationList
        conversations={CONVERSATIONS}
        onOpenChat={handleOpenChat}
        onNewConv={() => setShowNewConv(true)}
      />
      {showNewConv && <NewConversationModal onClose={() => setShowNewConv(false)} />}
    </>
  );
}

function ConversationList({
  conversations,
  onOpenChat,
  onNewConv,
}: {
  conversations: Conversation[];
  onOpenChat: (c: Conversation) => void;
  onNewConv: () => void;
}) {
  return (
    <div className="flex flex-col h-full bg-suprans-canvas">
      <div className="bg-white px-5 pt-5 pb-3 border-b border-suprans-border shrink-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[22px] font-black text-suprans-ink tracking-tight">Suprans</span>
          <button data-testid="btn-notifications" className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-suprans-canvas">
            <Bell size={22} color="var(--suprans-ink)" strokeWidth={1.8} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-suprans-red" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-suprans-canvas rounded-xl px-3 h-[38px] border border-suprans-border">
            <Search size={15} color="var(--suprans-ink-tertiary)" strokeWidth={2} />
            <input
              data-testid="input-search"
              type="text"
              placeholder="Search conversations…"
              className="flex-1 bg-transparent text-[13px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none"
            />
          </div>
          <div className="h-[38px] px-4 flex items-center rounded-xl text-[12px] font-semibold text-suprans-red border border-suprans-border bg-suprans-red-light shrink-0">
            All
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {DATE_GROUPS.map((group) => {
          const items = conversations.filter((c) => c.dateGroup === group);
          if (!items.length) return null;
          return (
            <div key={group}>
              <div className="px-5 pt-4 pb-1">
                <span className="text-[11px] font-semibold text-suprans-ink-tertiary uppercase tracking-wider">{group}</span>
              </div>
              {items.map((conv, idx) => (
                <ConversationRow
                  key={conv.id}
                  conv={conv}
                  isLast={idx === items.length - 1}
                  onClick={() => onOpenChat(conv)}
                />
              ))}
            </div>
          );
        })}
        <div className="h-4" />
      </div>

      <button
        data-testid="btn-new-conversation"
        onClick={onNewConv}
        className="absolute bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "var(--suprans-red)" }}
      >
        <Plus size={26} color="white" strokeWidth={2.5} />
      </button>
    </div>
  );
}

function ConversationRow({
  conv,
  isLast,
  onClick,
}: {
  conv: Conversation;
  isLast: boolean;
  onClick: () => void;
}) {
  return (
    <button
      data-testid={`conv-row-${conv.id}`}
      onClick={onClick}
      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/60 active:bg-white/80 text-left"
    >
      <div className="relative shrink-0">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-[15px] font-bold text-white"
          style={{ background: conv.avatarColor }}
        >
          {conv.initials}
        </div>
        {conv.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[14px] font-semibold text-suprans-ink truncate">{conv.name}</span>
          <span className="text-[11px] text-suprans-ink-tertiary shrink-0 ml-2">{conv.timestamp}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 min-w-0">
            {conv.lastMessageType === "voice" && (
              <div className="flex items-center gap-1 text-suprans-ink-tertiary">
                <Mic size={12} strokeWidth={2} />
              </div>
            )}
            {conv.lastMessageType === "file" && (
              <FileText size={12} color="var(--suprans-ink-tertiary)" strokeWidth={2} />
            )}
            <span className="text-[13px] text-suprans-ink-secondary truncate">{conv.lastMessage}</span>
          </div>
          {conv.unread > 0 && (
            <span
              className="ml-2 min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
              style={{ background: "var(--suprans-red)" }}
            >
              {conv.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ChatDetail({
  conv,
  messages,
  inputText,
  setInputText,
  onBack,
  onSend,
  messagesEndRef,
}: {
  conv: Conversation;
  messages: Message[];
  inputText: string;
  setInputText: (v: string) => void;
  onBack: () => void;
  onSend: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-suprans-canvas">
      <div className="bg-white px-4 pt-4 pb-3 border-b border-suprans-border flex items-center gap-3 shrink-0">
        <button data-testid="btn-back" onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-suprans-canvas">
          <ArrowLeft size={20} color="var(--suprans-ink)" strokeWidth={2} />
        </button>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0"
          style={{ background: conv.avatarColor }}
        >
          {conv.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-semibold text-suprans-ink truncate">{conv.name}</span>
            {conv.online && <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />}
          </div>
          <span className="text-[11px] text-suprans-ink-tertiary">{conv.online ? "Online" : conv.role}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-suprans-border px-3 py-3 flex items-end gap-2 shrink-0">
        <button data-testid="btn-attach" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-suprans-canvas shrink-0">
          <Paperclip size={20} color="var(--suprans-ink-tertiary)" strokeWidth={1.8} />
        </button>
        <textarea
          data-testid="input-message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          rows={1}
          className="flex-1 bg-suprans-canvas rounded-2xl px-4 py-2.5 text-[14px] text-suprans-ink placeholder:text-suprans-ink-tertiary outline-none resize-none border border-suprans-border focus:border-suprans-red transition-colors leading-[1.4] max-h-[96px]"
          style={{ overflowY: "auto" }}
        />
        <button data-testid="btn-mic" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-suprans-canvas shrink-0">
          <Mic size={20} color="var(--suprans-ink-tertiary)" strokeWidth={1.8} />
        </button>
        <button
          data-testid="btn-send"
          onClick={onSend}
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-opacity"
          style={{
            background: inputText.trim() ? "var(--suprans-red)" : "var(--suprans-border)",
            opacity: inputText.trim() ? 1 : 0.6,
          }}
        >
          <Send size={17} color="white" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isSent = msg.sent;

  if (msg.type === "voice") {
    return (
      <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
        <div
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl max-w-[72%] ${
            isSent ? "rounded-br-sm" : "rounded-bl-sm bg-white border border-suprans-border"
          }`}
          style={isSent ? { background: "var(--suprans-red)" } : {}}
        >
          <button className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: isSent ? "rgba(255,255,255,0.25)" : "var(--suprans-red-light)" }}>
            <Play size={14} color={isSent ? "white" : "var(--suprans-red)"} fill={isSent ? "white" : "var(--suprans-red)"} strokeWidth={0} />
          </button>
          <Waveform sent={isSent} />
          <span className={`text-[11px] shrink-0 ${isSent ? "text-white/70" : "text-suprans-ink-tertiary"}`}>{msg.duration}</span>
        </div>
        <MessageTime time={msg.time} sent={isSent} read={msg.read} />
      </div>
    );
  }

  if (msg.type === "file") {
    return (
      <div className={`flex flex-col ${isSent ? "items-end" : "items-start"}`}>
        <div
          className={`flex items-center gap-3 px-3 py-3 rounded-2xl max-w-[80%] ${
            isSent ? "rounded-br-sm" : "rounded-bl-sm bg-white border border-suprans-border"
          }`}
          style={isSent ? { background: "var(--suprans-red)" } : {}}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: isSent ? "rgba(255,255,255,0.2)" : "var(--suprans-red-light)" }}>
            <FileText size={18} color={isSent ? "white" : "var(--suprans-red)"} strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-[13px] font-semibold truncate ${isSent ? "text-white" : "text-suprans-ink"}`}>{msg.fileName}</p>
            <p className={`text-[11px] ${isSent ? "text-white/70" : "text-suprans-ink-tertiary"}`}>{msg.fileSize}</p>
          </div>
          <Paperclip size={15} color={isSent ? "rgba(255,255,255,0.7)" : "var(--suprans-ink-tertiary)"} strokeWidth={1.8} />
        </div>
        <MessageTime time={msg.time} sent={isSent} read={msg.read} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isSent ? "items-end" : "items-start"}`}>
      <div
        className={`px-4 py-2.5 rounded-2xl max-w-[80%] ${
          isSent ? "rounded-br-sm" : "rounded-bl-sm bg-white border border-suprans-border"
        }`}
        style={isSent ? { background: "var(--suprans-red)" } : {}}
      >
        <p className={`text-[14px] leading-[1.45] ${isSent ? "text-white" : "text-suprans-ink"}`}>{msg.content}</p>
      </div>
      <MessageTime time={msg.time} sent={isSent} read={msg.read} />
    </div>
  );
}

function MessageTime({ time, sent, read }: { time: string; sent: boolean; read?: boolean }) {
  return (
    <div className="flex items-center gap-1 mt-0.5 px-1">
      <span className="text-[10px] text-suprans-ink-tertiary">{time}</span>
      {sent && (
        read
          ? <CheckCheck size={12} color="var(--suprans-red)" strokeWidth={2.2} />
          : <Check size={12} color="var(--suprans-ink-tertiary)" strokeWidth={2.2} />
      )}
    </div>
  );
}

function Waveform({ sent }: { sent: boolean }) {
  const heights = [4, 8, 14, 10, 16, 6, 12, 10, 7, 14, 9, 5, 13, 8, 4];
  return (
    <div className="flex items-center gap-[2px] h-5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full"
          style={{
            height: h,
            background: sent ? "rgba(255,255,255,0.7)" : "var(--suprans-red)",
            opacity: i < 8 ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

function NewConversationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: 24 }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <span className="text-[16px] font-bold text-suprans-ink">Start a conversation about…</span>
          <button data-testid="btn-close-modal" onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-suprans-canvas">
            <X size={18} color="var(--suprans-ink)" strokeWidth={2} />
          </button>
        </div>
        <div className="px-5 grid grid-cols-4 gap-3">
          {SERVICE_TILES.map((tile) => (
            <button
              key={tile.id}
              data-testid={`service-tile-${tile.id}`}
              onClick={onClose}
              className="flex flex-col items-center gap-2 py-3"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px]"
                style={{ background: "var(--suprans-canvas)", border: "1.5px solid var(--suprans-border)" }}
              >
                {tile.emoji}
              </div>
              <span className="text-[11px] font-medium text-suprans-ink-secondary text-center leading-tight">{tile.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
