import { createFileRoute } from "@tanstack/react-router";
import { Plus, Mic, Paperclip, Send, MessageSquare, Users, Hash } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/forums")({
  head: () => ({
    meta: [{ title: "Forums — Altos" }],
  }),
  component: ForumsPage,
});

type Forum = {
  id: string;
  title: string;
  description: string;
  participants: string[];
  messageCount: number;
  lastActivity: string;
};

const sampleForums: Forum[] = [
  {
    id: "1",
    title: "Q2 Growth Strategy",
    description: "Debating expansion into EU markets. CoS is weighing logistics costs vs revenue opportunity.",
    participants: ["Morgan (CoS)", "Alex (Logistics)", "Jordan (Sentiment)"],
    messageCount: 23,
    lastActivity: "10 min ago",
  },
  {
    id: "2",
    title: "Packaging Redesign",
    description: "Customer feedback suggests sustainable packaging could improve brand perception by 15%.",
    participants: ["Jordan (Sentiment)", "Alex (Logistics)"],
    messageCount: 8,
    lastActivity: "2 hrs ago",
  },
  {
    id: "3",
    title: "Amazon Listing Optimisation",
    description: "Competitor analysis shows keyword gaps in top 5 SKUs.",
    participants: ["Morgan (CoS)"],
    messageCount: 5,
    lastActivity: "Yesterday",
  },
];

function ForumsPage() {
  const [activeForum, setActiveForum] = useState<Forum | null>(null);

  return (
    <div className="flex h-[calc(100dvh-3rem)] lg:h-[calc(100dvh)] flex-col lg:flex-row">
      {/* Forum list */}
      <div className={`border-b lg:border-b-0 lg:border-r border-border lg:w-80 shrink-0 flex flex-col ${activeForum ? "hidden lg:flex" : "flex"}`}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <h1 className="font-heading text-lg font-bold text-foreground">Forums</h1>
          <button className="flex items-center gap-1.5 rounded-md bg-amber px-3 py-1.5 text-xs font-medium text-background hover:bg-amber/90 transition-colors">
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>

        <div className="flex-1 overflow-auto p-2 space-y-1">
          {sampleForums.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveForum(f)}
              className={`w-full rounded-lg border p-3 text-left transition-colors ${
                activeForum?.id === f.id
                  ? "border-amber/40 bg-amber/5"
                  : "border-transparent hover:bg-card"
              }`}
            >
              <div className="flex items-center gap-2">
                <Hash className="h-3.5 w-3.5 text-amber" />
                <span className="text-sm font-medium text-foreground truncate">{f.title}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{f.description}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" /> {f.messageCount}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {f.participants.length}
                </span>
                <span className="ml-auto">{f.lastActivity}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Forum detail / chat */}
      <div className={`flex-1 flex flex-col ${!activeForum ? "hidden lg:flex" : "flex"}`}>
        {activeForum ? (
          <ForumChat forum={activeForum} onBack={() => setActiveForum(null)} />
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="mx-auto h-10 w-10 opacity-30" />
              <p className="mt-3 text-sm">Select a forum to view the discussion</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ForumChat({ forum, onBack }: { forum: Forum; onBack: () => void }) {
  const [message, setMessage] = useState("");

  const sampleMessages = [
    { id: 1, author: "Morgan (CoS)", text: "I've reviewed the logistics costs for EU expansion. The margins are tight but the market opportunity is significant. Alex, what's your assessment on fulfilment partners?", time: "10:32 AM" },
    { id: 2, author: "Alex (Logistics)", text: "We have two viable 3PL options in the Netherlands. Shipping costs would increase ~22% but delivery times improve from 8 days to 3. I'd argue the conversion rate uplift justifies this.", time: "10:45 AM" },
    { id: 3, author: "Jordan (Sentiment)", text: "I'm seeing strong demand signals from EU customers in our social mentions. However, returns on cross-border orders are 3x domestic. We need to factor that into the cost model.", time: "11:02 AM" },
    { id: 4, author: "Morgan (CoS)", text: "Good points from both sides. Here's my summary for you, Boss: the opportunity is real but we need to nail the returns process first. I'd recommend a limited pilot with 5 SKUs before full rollout. Want me to draft a plan?", time: "11:15 AM" },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground lg:hidden">
          ← Back
        </button>
        <Hash className="h-4 w-4 text-amber" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{forum.title}</p>
          <p className="text-xs text-muted-foreground">{forum.participants.join(", ")}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {sampleMessages.map((m) => (
          <div key={m.id} className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber/10 text-xs font-bold text-amber">
              {m.author.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-foreground">{m.author}</span>
                <span className="text-xs text-muted-foreground">{m.time}</span>
              </div>
              <p className="mt-1 text-sm text-foreground/90">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="border-t border-border p-4">
        <div className="flex items-end gap-2 rounded-lg border border-border bg-card p-2">
          <button className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Voice recording">
            <Mic className="h-4 w-4" />
          </button>
          <button className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Attach file">
            <Paperclip className="h-4 w-4" />
          </button>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Talk to your team..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            disabled={!message.trim()}
            className="shrink-0 rounded-md bg-amber p-2 text-background disabled:opacity-30 hover:bg-amber/90 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Voice, text, docs, or forwarded emails — your team will pick it up.
        </p>
      </div>
    </>
  );
}
