// app/api/ask/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";

type BackendResponse =
  | string
  | {
      text?: string;
      answer?: string;
      result?: string;
      message?: string;
      output?: string;
      // backend bisa kirim field lain
      [k: string]: unknown;
    };

function normalizeText(data: BackendResponse): string {
  if (typeof data === "string") return data;
  return (
    data.text ??
    data.answer ??
    data.result ??
    data.message ??
    data.output ??
    JSON.stringify(data ?? {})
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { prompt?: string };
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      return Response.json({ error: "Missing prompt" }, { status: 400 });
    }

    const url = process.env.FSB_API_URL;
    const apiKey = process.env.FSB_API_KEY;
    if (!url || !apiKey) {
      return Response.json({ error: "Server not configured" }, { status: 500 });
    }

    // throw bila URL tidak valid // eslint-disable-next-line no-new
    new URL(url);

    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      // backend kamu minta "question", bukan "prompt"
      body: JSON.stringify({ question: prompt }),
    });

    if (!upstream.ok) {
      const txt = await upstream.text().catch(() => "");
      return Response.json(
        { error: `Upstream ${upstream.status}`, detail: txt },
        { status: upstream.status }
      );
    }

    const raw: unknown = await upstream.json().catch(() => ({}));
    const text = normalizeText(raw as BackendResponse);

    return Response.json({ text });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return Response.json(
      { error: "Server error", detail: message },
      { status: 500 }
    );
  }
}
