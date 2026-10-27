import { consoleProvider } from "./providers/console";
import { noneProvider } from "./providers/none";
import { createNodemailerProvider } from "./providers/nodemailer";
import { createResendProvider } from "./providers/resend";
import type { ContactProvider } from "./types";

/**
 * Picks the delivery provider from CONTACT_PROVIDER.
 *
 *   none       (default) → reports honestly that delivery is not configured
 *   console    (dev only) → logs the inquiry to the server console
 *   nodemailer            → emails via Gmail SMTP + App Password (needs the GMAIL_* variables)
 *   resend                → emails via Resend (needs the RESEND_* variables)
 *
 * Add a new provider by implementing `ContactProvider` and adding a case here.
 */
export function getContactProvider(): ContactProvider {
  const choice = (process.env.CONTACT_PROVIDER ?? "none").trim().toLowerCase();

  switch (choice) {
    case "console":
      return process.env.NODE_ENV === "production" ? noneProvider : consoleProvider;
    case "nodemailer":
      return createNodemailerProvider() ?? noneProvider;
    case "resend":
      return createResendProvider() ?? noneProvider;
    default:
      return noneProvider;
  }
}

export type { ContactPayload, ContactProvider, ContactSendResult } from "./types";
