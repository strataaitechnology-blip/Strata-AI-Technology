import { NextResponse } from "next/server";
import { getContactProvider } from "@/lib/contact";
import { hasErrors, normalizeContactValues, validateContact } from "@/lib/contact/validation";
import { isRateLimited } from "@/lib/rate-limit";
import type { ContactApiResponse } from "@/types";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;

function json(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  // 1. Basic abuse protection.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwarded || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(clientKey)) {
    return json({ ok: false, message: "Too many inquiries from this connection. Please try again later." }, 429);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, message: "Your message is too large to send." }, 413);
  }

  // 2. Parse the body.
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, message: "The request could not be read. Please try again." }, 400);
  }

  // 3. Honeypot: real visitors never fill this in. Pretend success, do nothing.
  if (typeof raw === "object" && raw !== null && "website" in raw && String((raw as Record<string, unknown>).website).trim() !== "") {
    return json({ ok: true, delivered: false, message: "Thank you. Your inquiry has been received." }, 200);
  }

  // 4. Validate on the server too — never trust the browser.
  const values = normalizeContactValues(raw);
  const errors = validateContact(values);
  if (hasErrors(errors)) {
    return json({ ok: false, message: "Please check the highlighted fields and try again.", errors }, 422);
  }

  // 5. Hand off to whichever provider is configured.
  const provider = getContactProvider();
  const result = await provider.send(values);

  if (!result.ok) {
    return json({ ok: false, message: result.message }, result.code === "not_configured" ? 503 : 502);
  }

  return json(
    {
      ok: true,
      delivered: result.delivered,
      message: result.delivered
        ? "Thank you! We have received your message and will get back to you within 24 hours."
        : "Development mode: your message was logged on the server, but no email was sent.",
    },
    200
  );
}
