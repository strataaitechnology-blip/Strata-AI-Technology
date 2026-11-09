import nodemailer from "nodemailer";
import type { ContactPayload, ContactProvider } from "../types";

/** Strip newlines to prevent header-injection attacks. */
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function buildHtml(payload: ContactPayload): string {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    dateStyle: "full",
    timeStyle: "short",
  });

  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 16px;font-weight:600;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">${label}</td>
      <td style="padding:10px 16px;color:#e2e8f0;font-size:15px;vertical-align:top;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Website Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f766e 0%,#0ea5e9 100%);padding:32px 40px;border-radius:12px 12px 0 0;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.7);">STRATA AI Technologies</p>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">New Website Inquiry</h1>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">
                Service: <strong>${singleLine(payload.service)}</strong>
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#1e293b;padding:0;border-radius:0 0 12px 12px;overflow:hidden;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${row("Full Name", singleLine(payload.fullName))}
                <tr><td colspan="2" style="height:1px;background:#334155;padding:0;"></td></tr>
                ${row("Email", `<a href="mailto:${singleLine(payload.email)}" style="color:#38bdf8;text-decoration:none;">${singleLine(payload.email)}</a>`)}
                <tr><td colspan="2" style="height:1px;background:#334155;padding:0;"></td></tr>
                ${row("Phone", payload.phone ? singleLine(payload.phone) : '<span style="color:#64748b;">—</span>')}
                <tr><td colspan="2" style="height:1px;background:#334155;padding:0;"></td></tr>
                ${row("Company", payload.company ? singleLine(payload.company) : '<span style="color:#64748b;">—</span>')}
                <tr><td colspan="2" style="height:1px;background:#334155;padding:0;"></td></tr>
                ${row("Service", singleLine(payload.service))}
                <tr><td colspan="2" style="height:1px;background:#334155;padding:0;"></td></tr>
                <tr>
                  <td style="padding:10px 16px;font-weight:600;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Message</td>
                  <td style="padding:10px 16px;color:#e2e8f0;font-size:15px;vertical-align:top;">
                    <div style="background:#0f172a;border:1px solid #334155;border-radius:8px;padding:14px 16px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
                  </td>
                </tr>
                <tr><td colspan="2" style="height:1px;background:#334155;padding:0;"></td></tr>
                ${row("Submitted", `${submittedAt} UTC`)}
              </table>

              <!-- Reply prompt -->
              <div style="padding:24px 24px 28px;border-top:1px solid #334155;">
                <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">
                  Reply directly to this email to respond to <strong style="color:#94a3b8;">${singleLine(payload.fullName)}</strong>
                  — the reply-to address is already set to their email.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#475569;">
                This email was sent by the STRATA AI Technologies website contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(payload: ContactPayload): string {
  const submittedAt = new Date().toUTCString();
  return [
    "New Website Inquiry — STRATA AI Technologies",
    "=".repeat(46),
    "",
    `Name:     ${singleLine(payload.fullName)}`,
    `Email:    ${singleLine(payload.email)}`,
    `Phone:    ${payload.phone ? singleLine(payload.phone) : "—"}`,
    `Company:  ${payload.company ? singleLine(payload.company) : "—"}`,
    `Service:  ${singleLine(payload.service)}`,
    "",
    "Message:",
    "-".repeat(46),
    payload.message,
    "-".repeat(46),
    "",
    `Submitted: ${submittedAt}`,
  ].join("\n");
}

/** Minimal HTML entity escape — enough for user-supplied strings in email bodies. */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sends inquiries via Nodemailer using Gmail SMTP with an App Password.
 *
 * Required environment variables:
 *   GMAIL_USER             — the Gmail account used to send (e.g. hello@company.com)
 *   GMAIL_APP_PASSWORD     — 16-character App Password (NOT your Gmail login password)
 *   CONTACT_RECEIVER_EMAIL — the inbox that receives the inquiry (may equal GMAIL_USER)
 *
 * Returns null when any required variable is missing so the caller can fall
 * back to the noneProvider without crashing.
 */
export function createNodemailerProvider(
  env: NodeJS.ProcessEnv = process.env
): ContactProvider | null {
  const user = env.GMAIL_USER?.trim() || "strataaitechnology@gmail.com";
  const pass = env.GMAIL_APP_PASSWORD?.trim();
  const to = env.CONTACT_RECEIVER_EMAIL?.trim() || "strataaitechnology@gmail.com";

  if (!pass) {
    return null;
  }

  // Lazy-create the transporter so it is only instantiated once the provider is used.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: { user, pass },
  });

  return {
    name: "nodemailer-gmail",

    async send(payload: ContactPayload) {
      try {
        await transporter.sendMail({
          from: `"STRATA AI Technologies Website" <${user}>`,
          to,
          replyTo: `"${singleLine(payload.fullName)}" <${singleLine(payload.email)}>`,
          subject: `New Website Inquiry — ${singleLine(payload.service)}`,
          text: buildText(payload),
          html: buildHtml(payload),
        });

        return { ok: true, delivered: true };
      } catch (error) {
        console.error("[contact:nodemailer] Failed to send email:", error);
        return {
          ok: false,
          code: "provider_error",
          message:
            "We could not send your inquiry right now. Please try again in a moment.",
        };
      }
    },
  };
}

