"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, Bot, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Message = {
  role: "user" | "model";
  content: string;
};

const STARTER_PROMPTS = [
  { label: "SaaS MVP Build info", text: "Tell me about Somanath's SaaS MVP development service." },
  { label: "AI projects he shipped", text: "Show me some AI projects Somanath has built." },
  { label: "Check booking slots", text: "What are Somanath's next available booking slots?" },
  { label: "Timeline & availability", text: "What is Somanath's typical timeline and availability?" },
];

function renderMessageContent(text: string) {
  // Convert markdown links [text](url) to JSX Links
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      const [, label, href] = match;
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 transition-colors font-medium"
          >
            {label}
          </a>
        );
      }
      return (
        <Link
          key={i}
          href={href}
          className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 transition-colors font-medium"
        >
          {label}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Hey! I'm Archon, an AI assistant built by Somanath to help visitors explore his work. I can answer questions about services, tech stack, case studies, availability, and process — so you can decide if he's the right fit for your project. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const executeChat = async (textToSend: string) => {
    if (isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get a response.");
      }

      setMessages([...updatedMessages, { role: "model", content: data.reply }]);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      // Refocus input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    await executeChat(text);
  };

  const handlePromptClick = async (promptText: string) => {
    await executeChat(promptText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-1 pb-2 min-h-0 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn("flex gap-2.5 items-start", message.role === "user" ? "justify-end" : "justify-start")}
          >
            {message.role === "model" ? (
              <div className="mt-0.5 flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                <Bot className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              </div>
            ) : null}
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm transition-all duration-200",
                message.role === "user"
                  ? "bg-zinc-800 border border-zinc-700/60 text-zinc-100 rounded-tr-sm"
                  : "bg-zinc-900/60 text-zinc-200 rounded-tl-sm border border-white/5"
              )}
            >
              {renderMessageContent(message.content)}
            </div>
            {message.role === "user" ? (
              <div className="mt-0.5 flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-zinc-850 border border-zinc-700 shadow-sm">
                <User className="h-3.5 w-3.5 text-zinc-400" />
              </div>
            ) : null}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 justify-start items-start">
            <div className="mt-0.5 flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
              <Bot className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-zinc-900/60 border border-white/5 px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2.5 text-xs text-red-400">
            {error}
          </div>
        )}

        {/* ChatGPT / Gemini style Starter prompt suggestions */}
        {messages.length === 1 && !isLoading && (
          <div className="mt-4 pt-2 grid grid-cols-2 gap-2">
            {STARTER_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlePromptClick(prompt.text)}
                className="group flex flex-col justify-between items-start rounded-xl border border-white/5 bg-white/[0.01] p-2.5 text-left text-[11px] text-zinc-400 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] hover:text-zinc-200 transition-all duration-200 cursor-pointer"
              >
                <span>{prompt.label}</span>
                <span className="mt-1 flex items-center gap-1 font-mono text-[9px] text-zinc-600 group-hover:text-emerald-500/70 transition-colors">
                  Ask AI <ArrowRight className="h-2 w-2" />
                </span>
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input controls */}
      <div className="mt-2 border-t border-white/5 pt-3">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            rows={1}
            maxLength={500}
            disabled={isLoading}
            className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-emerald-500/30 focus:bg-white/8 disabled:opacity-50 leading-relaxed"
            style={{ maxHeight: "70px", overflowY: "auto" }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-black transition-all hover:bg-emerald-400 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(16,185,129,0.15)]"
            aria-label="Send message"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
        <p className="mt-2 text-center text-[9px] text-zinc-700">
          Archon · AI guide by Somanath · Grounded in verified project data
        </p>
      </div>
    </div>
  );
}
