import type { ContactFormValues } from "@/types";

export interface ContactAttachment {
  /** Original filename as provided by the browser. */
  filename: string;
  /** Raw binary content of the uploaded file. */
  content: Buffer;
  /** MIME type inferred from the upload. */
  contentType: string;
}

export type ContactPayload = ContactFormValues & {
  /** Optional file attached by the visitor. Present only when the user chose a file. */
  attachment?: ContactAttachment;
};

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
