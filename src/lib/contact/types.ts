import type { ContactFormValues } from "@/types";

export type ContactPayload = ContactFormValues;

export type ContactSendResult =
  | { ok: true; delivered: boolean }
  | { ok: false; code: "not_configured" | "provider_error"; message: string };

/**
 * A ContactProvider is the ONLY thing the API route knows about delivery.
 * To connect another service (SendGrid, Postmark, SMTP, a CRM, Slack…),
 * implement this interface and register it in ./index.ts.
 */
export interface ContactProvider {
  readonly name: string;
  send(payload: ContactPayload): Promise<ContactSendResult>;
}
