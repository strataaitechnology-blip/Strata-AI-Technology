import { NextResponse } from "next/server";
import { getContactProvider } from "@/lib/contact";
import { hasErrors, normalizeContactValues, validateContact } from "@/lib/contact/validation";
import { isRateLimited } from "@/lib/rate-limit";
import type { ContactApiResponse } from "@/types";
import type { ContactAttachment } from "@/lib/contact/types";

export const runtime = "nodejs";

/** 10 MB — same limit enforced on the client */
const MAX_FILE_BYTES = 10 * 1024 * 1024;

/** Allowed MIME types for attachments */
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
]);

/** Allowed file extensions (secondary guard) */
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx", "xls", "xlsx", "txt"]);

function json(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  // 1. Rate limiting
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwarded || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(clientKey)) {
    return json({ ok: false, message: "Too many inquiries from this connection. Please try again later." }, 429);
  }

  // 2. Parse multipart form data (supports both with and without file)
  let formData: FormData;
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) {
      formData = await request.formData();
    } else {
      // Fallback: JSON submissions (no attachment) — keep backward compatibility
      const raw = await request.json().catch(() => null);
      if (!raw || typeof raw !== "object") {
        return json({ ok: false, message: "The request could not be read. Please try again." }, 400);
      }
      // Convert to FormData-like object using plain object lookup
      const rawObj = raw as Record<string, unknown>;
      // Handle honeypot
      if (typeof rawObj.website === "string" && rawObj.website.trim() !== "") {
        return json({ ok: true, delivered: false, message: "Thank you. Your inquiry has been received." }, 200);
      }
      const values = normalizeContactValues(rawObj);
      const errors = validateContact(values);
      if (hasErrors(errors)) {
        return json({ ok: false, message: "Please check the highlighted fields and try again.", errors }, 422);
      }
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
  } catch {
    return json({ ok: false, message: "The request could not be read. Please try again." }, 400);
  }

  // 3. Honeypot check
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json({ ok: true, delivered: false, message: "Thank you. Your inquiry has been received." }, 200);
  }

  // 4. Extract form fields
  const raw: Record<string, unknown> = {};
  for (const key of ["fullName", "email", "phone", "company", "service", "message"]) {
    const val = formData.get(key);
    raw[key] = typeof val === "string" ? val : "";
  }

  // 5. Validate form fields
  const values = normalizeContactValues(raw);
  const errors = validateContact(values);
  if (hasErrors(errors)) {
    return json({ ok: false, message: "Please check the highlighted fields and try again.", errors }, 422);
  }

  // 6. Process optional file attachment
  let attachment: ContactAttachment | undefined;
  const fileField = formData.get("attachment");

  if (fileField && fileField instanceof File && fileField.size > 0) {
    // Size check
    if (fileField.size > MAX_FILE_BYTES) {
      return json(
        { ok: false, message: "The attached file exceeds the 10 MB limit. Please attach a smaller file." },
        413
      );
    }

    // Extension check
    const ext = fileField.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return json(
        {
          ok: false,
          message: `File type ".${ext}" is not allowed. Please attach a PDF, DOC, DOCX, XLS, XLSX, or TXT file.`,
        },
        415
      );
    }

    // MIME type check (browsers set this; treat as secondary signal)
    const mime = fileField.type || "application/octet-stream";
    // Allow octet-stream as a fallback for browsers that don't set MIME
    if (mime !== "application/octet-stream" && !ALLOWED_MIME_TYPES.has(mime)) {
      return json(
        { ok: false, message: "The attached file type is not permitted. Please use PDF, DOC, DOCX, XLS, XLSX, or TXT." },
        415
      );
    }

    // Read file bytes
    try {
      const arrayBuffer = await fileField.arrayBuffer();
      attachment = {
        filename: fileField.name,
        content: Buffer.from(arrayBuffer),
        contentType: mime,
      };
    } catch {
      return json({ ok: false, message: "We could not read the attached file. Please try again." }, 400);
    }
  }

  // 7. Send via provider
  const provider = getContactProvider();
  const result = await provider.send({ ...values, attachment });

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
