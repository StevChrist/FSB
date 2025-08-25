import Link from "next/link";

export default function Home() {
  return (
    // ⬇️ grid + h-full untuk ambil tinggi penuh dari <main> di layout
    <main className="flex-1 grid place-items-center h-full px-5">
      {/* Hero/heading */}
      {/* ⬇️ section cukup wrapper biasa */}
      <section className="text-center w-full max-w-6xl mx-auto">
        <div className="space-y-8">
          <h1 className="fsb-title">FRAGEN SIE BOT</h1>
          <p className="fsb-sub max-w-3xl mx-auto">
            Your personal culinary guide to exploring the richness of German cuisine.
            <br />
            Simply type in your question and get instant answers about German recipes and ingredients.
          </p>
          <div>
            <Link
              href="/chat"
              className="inline-block rounded-lg bg-[var(--fsb-cream)] text-[var(--fsb-green)] px-6 py-3 font-medium"
            >
              ASK FSB
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
