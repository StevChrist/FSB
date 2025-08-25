"use client";

import { useEffect, useRef, useState } from "react";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  status?: "sending" | "sent";
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [msgs, isThinking]);

  async function send() {
    const q = input.trim();
    if (!q || isThinking) return;

    const userId = crypto.randomUUID();
    const placeholderId = crypto.randomUUID();

    // Tambahkan bubble user (sending) + placeholder assistant
    setMsgs((m) => [
      ...m,
      { id: userId, role: "user", text: q, status: "sending" },
      { id: placeholderId, role: "assistant", text: "Analyzing…" },
    ]);
    setInput("");
    setIsThinking(true);

    try {
      // Panggil proxy server-side
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: q }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        const detail = payload?.detail ? `\n${payload.detail}` : "";
        throw new Error(`HTTP ${res.status}: ${payload?.error ?? "Error"}${detail}`);
      }

      const data = (await res.json()) as { text?: string };
      const answer = (data?.text ?? "").trim();

      // 1) user bubble -> sent
      setMsgs((m) =>
        m.map((x) => (x.id === userId ? { ...x, status: "sent" } : x))
      );

      // 2) ganti placeholder assistant dengan hasil
      setMsgs((m) =>
        m.map((x) =>
          x.id === placeholderId
            ? { ...x, text: answer || "(no content)" }
            : x
        )
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);

      // user bubble tetap jadi "sent"
      setMsgs((m) =>
        m.map((x) => (x.id === userId ? { ...x, status: "sent" } : x))
      );

      // placeholder assistant -> bubble error
      setMsgs((m) =>
        m.map((x) =>
          x.id === placeholderId
            ? {
                ...x,
                text: `⚠️ Request failed\n${msg}`,
              }
            : x
        )
      );
    } finally {
      setIsThinking(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  return (
    <main className="mx-auto max-w-6xl px-5">
      {/* LIST */}
      <section className="pt-6">
        <div
          ref={listRef}
          className="nice-scroll min-h-[60vh] max-h-[70vh] overflow-y-auto pr-1 space-y-4"
        >
          {msgs.length === 0 ? (
            <div className="h-[55vh] grid place-items-center text-center opacity-80">
              <div>
                <div className="text-xl font-semibold mb-1">
                  Ask anything about German cuisine
                </div>
                <div className="text-sm">
                  Type your question, then press <kbd>Enter</kbd> ⏎
                </div>
              </div>
            </div>
          ) : (
            msgs.map((m) => {
              const isUser = m.role === "user";
              const base =
                "bubble max-w-[80%] px-4 py-3 rounded-2xl leading-relaxed text-sm md:text-base";
              const theme = isUser
                ? "bg-[var(--fsb-cream)] text-[var(--fsb-green)]"
                : "bg-[rgba(233,227,213,.08)] text-[var(--fsb-cream)]";
              const anim =
                isUser
                  ? `bubble-outgoing ${m.status === "sending" ? "bubble-sending" : ""}`
                  : "bubble-incoming";
              return (
                <div
                  key={m.id}
                  className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`${base} ${theme} ${anim}`}>
                    <pre className="whitespace-pre-wrap break-words">{m.text}</pre>
                  </div>
                </div>
              );
            })
          )}

          {/* Typing indicator */}
          {isThinking && (
            <div className="w-full flex justify-start">
              <TypingIndicator />
            </div>
          )}
        </div>
      </section>

      {/* INPUT */}
      <section id="query" className="sticky bottom-4 mt-4">
        <div className="flex items-center gap-3">
          <input
            className="fsb-input"
            placeholder="type your question …"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isThinking}
          />
          <button
            onClick={send}
            disabled={isThinking}
            aria-label="Send"
            title="Send"
            className="shrink-0 rounded-full px-4 py-3 bg-[var(--fsb-cream)] text-[var(--fsb-green)] font-bold hover:opacity-90 transition"
          >
            {isThinking ? "…" : "➤"}
          </button>
        </div>
      </section>
    </main>
  );
}

function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-[rgba(233,227,213,.08)]">
      <div className="typing-dots">
        <span></span><span></span><span></span>
      </div>
      <span className="text-sm opacity-80">FSB is typing…</span>
    </div>
  );
}
