// app/how-to-use/page.tsx
import Link from "next/link";

export default function HowToUse() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 space-y-8">
      <header className="space-y-3 text-center">
        <h1 className="fsb-title">How To Use</h1>
        <p className="fsb-sub">Ask about German cuisine.</p>
      </header>

      {/* Quick Start */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-center">Quick Start</h2>
        <ol className="list-decimal pl-5 space-y-1 opacity-90">
          <li>
            Open <Link href="/chat" className="underline">Chat</Link>.
          </li>
          <li>Type your question, then press <kbd>Enter</kbd> or click <b>Send</b>.</li>
          <li>Wait for <b>Analyzing…</b> and the <b>typing</b> indicator, then read the reply.</li>
          <li>Chat history persists when navigating pages and resets on browser reload.</li>
        </ol>
      </section>

      {/* Example Queries */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-center">Example Queries</h2>
        <ul className="list-disc pl-5 space-y-1 opacity-90">
          <li>“what german dessert that have a type of any fruit as one of ingredient?”</li>
          <li>“Find all beverages that are non alcoholic, carbonated, and is not a juice or coffee”</li>
          <li>“Find all vegetarian main courses from Bavaria that do not contain spinach”</li>
          <li>“I want to eat chicken or beef for breakfast, where can i get them”</li>
          <li>“What are sweet dishes i can eat for dinner”</li>
        </ul>
      </section>

      {/* Go to Chat */}
      <div className="pt-2 text-center">
        <Link
          href="/chat"
          className="inline-block rounded-lg bg-[var(--fsb-cream)] text-[var(--fsb-green)] px-6 py-3 font-medium hover:opacity-90 transition"
        >
          Open Chat
        </Link>
      </div>
    </main>
  );
}
