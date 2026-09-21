import type { ContactPayload, ContactProvider } from "../types";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function buildText(payload: ContactPayload): string {
  return [
    `Name: ${singleLine(payload.fullName)}`,
    `Email: ${singleLine(payload.email)}`,
    `Phone: ${payload.phone ? singleLine(payload.phone) : "—"}`,
    `Company: ${payload.company ? singleLine(payload.company) : "—"}`,
    `Service: ${singleLine(payload.service)}`,
    "",
    payload.message,
  ].join("\n");
}

/**
 * Sends the inquiry through the Resend REST API using `fetch` (no SDK needed).
 * Requires RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL. The
 * "from" address must belong to a domain verified in your Resend account.
 * Returns null when the environment is incomplete.
 */
export function createResendProvider(env: NodeJS.ProcessEnv = process.env): ContactProvider | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.split(",").map((address) => address.trim()).filter(Boolean);
  const from = env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || to.length === 0 || !from) return null;

  return {
    name: "resend",
    async send(payload) {
      try {
        const response = await fetch(RESEND_ENDPOINT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
            reply_to: payload.email,
            subject: `New inquiry: ${singleLine(payload.service)} — ${singleLine(payload.fullName)}`,
            text: buildText(payload),
          }),
          signal: AbortSignal.timeout(10_000),
        });

        if (!response.ok) {
          console.error("[contact:resend] Provider responded with", response.status);
          return {
            ok: false,
            code: "provider_error",
            message: "We could not send your inquiry right now. Please try again in a moment.",
          };
        }
        return { ok: true, delivered: true };
      } catch (error) {
        console.error("[contact:resend] Request failed", error);
        return {
          ok: false,
          code: "provider_error",
          message: "We could not send your inquiry right now. Please try again in a moment.",
        };
      }
    },
  };
}
