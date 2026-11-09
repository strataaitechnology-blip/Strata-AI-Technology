import { consoleProvider } from "./providers/console";
import { noneProvider } from "./providers/none";
import { createNodemailerProvider } from "./providers/nodemailer";
import { createResendProvider } from "./providers/resend";
import { createWeb3FormsProvider } from "./providers/web3forms";
import type { ContactProvider } from "./types";

/**
 * Picks the delivery provider from CONTACT_PROVIDER or auto-detects by available keys.
 *
 *   web3forms  (recommended) → emails via Web3Forms (needs WEB3FORMS_ACCESS_KEY)
 *   nodemailer              → emails via Gmail SMTP + App Password
 *   resend                  → emails via Resend (needs RESEND_API_KEY)
 *   console                 → dev only: logs inquiry to server console
 *   none                    → reports delivery is not configured
 */
export function getContactProvider(): ContactProvider {
  const choice = (process.env.CONTACT_PROVIDER ?? "").trim().toLowerCase();

  if (choice === "resend") {
    return createResendProvider() ?? (process.env.NODE_ENV === "development" ? consoleProvider : noneProvider);
  }
  if (choice === "web3forms") {
    return createWeb3FormsProvider() ?? (process.env.NODE_ENV === "development" ? consoleProvider : noneProvider);
  }
  if (choice === "nodemailer") {
    return createNodemailerProvider() ?? (process.env.NODE_ENV === "development" ? consoleProvider : noneProvider);
  }
  if (choice === "console") {
    return process.env.NODE_ENV === "production" ? noneProvider : consoleProvider;
  }

  // Auto-detect: if RESEND_API_KEY is present, use Resend
  const autoResend = createResendProvider();
  if (autoResend) return autoResend;

  // Auto-detect: if WEB3FORMS_ACCESS_KEY is present, use Web3Forms
  const autoWeb3Forms = createWeb3FormsProvider();
  if (autoWeb3Forms) return autoWeb3Forms;

  // Auto-detect: if GMAIL_APP_PASSWORD is present, use Nodemailer
  const autoNodemailer = createNodemailerProvider();
  if (autoNodemailer) return autoNodemailer;

  return process.env.NODE_ENV === "development" ? consoleProvider : noneProvider;
}

export type { ContactPayload, ContactProvider, ContactSendResult } from "./types";
