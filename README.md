# FSB — Fragen Sie Bot (German Cuisine Assistant)

FSB is a lightweight Next.js web app that answers questions about German cuisine—recipes, ingredients, substitutions, timing, portions, and more. It features a clean UI with animated chat bubbles, a typing indicator, and smooth scrolling. Chat history **persists across page navigation** (Home ↔ Chat) and **resets on browser reload**.

## Documentation
![FSB Home Screenshot](home.png)
![FSB Home Screenshot](try.png)
![FSB Home Screenshot](how_to_use.png)

## ✨ Features

- Next.js App Router + TypeScript
- Tailwind CSS with custom palette (`--fsb-green`, `--fsb-cream`, `--fsb-sand`)
- Animated chat bubbles (send/receive + shimmer while sending)
- Typing indicator (“Analyzing…” + bouncing dots)
- Smooth, brand-matching scrollbar
- Sticky navbar & footer; footer stays without extra scrolling
- Chat history persistence with **Zustand** (in-memory; resets on reload)
- API route proxy (`/api/ask`) to a secured backend (e.g., Railway) using `x-api-key`

