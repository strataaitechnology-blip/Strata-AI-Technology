import type { ContactPayload, ContactProvider } from "../types";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
          <tr>
            <td style="background:linear-gradient(135deg,#0a192f 0%,#2563eb 100%);padding:32px 40px;border-radius:12px 12px 0 0;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.7);">STRATA Technologies</p>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">New Website Inquiry</h1>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85);">
                Service: <strong>${singleLine(payload.service)}</strong>
              </p>
            </td>
          </tr>
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
              <div style="padding:24px;border-top:1px solid #334155;">
                <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
                  Reply directly to this email to respond to <strong style="color:#ffffff;">${singleLine(payload.fullName)}</strong>.
                </p>
              </div>
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
  return [
    `Name:    ${singleLine(payload.fullName)}`,
    `Email:   ${singleLine(payload.email)}`,
    `Phone:   ${payload.phone ? singleLine(payload.phone) : "—"}`,
    `Company: ${payload.company ? singleLine(payload.company) : "—"}`,
    `Service: ${singleLine(payload.service)}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

import fs from "fs";
import path from "path";

function readEnvVar(key: string, env: NodeJS.ProcessEnv): string | undefined {
  if (env[key]?.trim()) return env[key]?.trim();
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      const match = content.match(new RegExp(`^${key}\\s*=\\s*(.*)$`, "m"));
      if (match && match[1]?.trim()) {
        const val = match[1].trim();
        // Also populate process.env for subsequent calls
        env[key] = val;
        return val;
      }
    }
  } catch {}
  return undefined;
}

export function createResendProvider(env: NodeJS.ProcessEnv = process.env): ContactProvider | null {
  const apiKey = readEnvVar("RESEND_API_KEY", env);
  const toRaw = (readEnvVar("CONTACT_TO_EMAIL", env) || "strataaitechnology@gmail.com")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  const to = toRaw.length > 0 ? toRaw : ["strataaitechnology@gmail.com"];
  const from = readEnvVar("CONTACT_FROM_EMAIL", env) || "STRATA Technologies <onboarding@resend.dev>";

  if (!apiKey) return null;

  return {
    name: "resend",
    async send(payload) {
      try {
        // Build the request body — include attachment when present
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const emailBody: Record<string, any> = {
          from,
          to,
          reply_to: payload.email,
          subject: `New Website Inquiry — ${singleLine(payload.service)} (${singleLine(payload.fullName)})`,
          text: buildText(payload),
          html: buildHtml(payload),
        };

        if (payload.attachment) {
          emailBody.attachments = [
            {
              filename: payload.attachment.filename,
              // Resend expects base64-encoded content
              content: payload.attachment.content.toString("base64"),
            },
          ];
        }

        const response = await fetch(RESEND_ENDPOINT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailBody),
          signal: AbortSignal.timeout(15_000),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          console.error("[contact:resend] Provider error:", response.status, errData);
          return {
            ok: false,
            code: "provider_error",
            message: errData?.message || "We could not send your inquiry right now. Please try again in a moment.",
          };
        }
        return { ok: true, delivered: true };
      } catch (error) {
        console.error("[contact:resend] Request failed", error);
        return {
          ok: false,
          code: "provider_error",
          message: "We could not reach the email service right now. Please try again in a moment.",
        };
      }
    },
  };
}
