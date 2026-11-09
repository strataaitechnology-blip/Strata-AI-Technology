"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent, KeyboardEvent, ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, ChevronDown, CircleAlert, CircleCheck, LoaderCircle, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceOptionFromId, serviceOptions } from "@/data/contact";
import { emptyContactValues, hasErrors, validateContact } from "@/lib/contact/validation";
import type { ContactApiResponse, ContactFieldErrors, ContactFormValues } from "@/types";
import { cn } from "@/lib/utils";

/* ── File attachment constants ──────────────────────────────── */
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "xls", "xlsx", "txt"];
const ALLOWED_EXTENSIONS_LABEL = "PDF, DOC, DOCX, XLS, XLSX, TXT";
const ACCEPT_ATTR = ".pdf,.doc,.docx,.xls,.xlsx,.txt";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-xl border border-border bg-background px-4 text-[0.95rem] text-foreground transition-all duration-200 placeholder:text-subtle hover:border-accent/40 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:outline-none";

/* ── Custom blue-highlighted service select ─────────────────── */
interface ServiceSelectProps {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
  id: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

const dropdownOptions = [
  { value: "", label: "Select a service" },
  ...serviceOptions.map((opt) => ({ value: opt, label: opt })),
];

function ServiceSelect({ value, onChange, hasError, id, ...aria }: ServiceSelectProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const displayLabel = value ? value : "Select a service";
  const isPlaceholder = !value;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setFocused(-1);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Keyboard navigation
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => {
        const next = !o;
        if (next) {
          const idx = dropdownOptions.findIndex((opt) => opt.value === value);
          setFocused(idx >= 0 ? idx : 0);
        } else {
          setFocused(-1);
        }
        return next;
      });
    } else if (e.key === "Escape") {
      setOpen(false);
      setFocused(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        const idx = dropdownOptions.findIndex((opt) => opt.value === value);
        setFocused(idx >= 0 ? idx : 0);
        return;
      }
      setFocused((f) => Math.min(f + 1, dropdownOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    } else if (e.key === "Tab") {
      setOpen(false);
      setFocused(-1);
    }
  }

  function onListKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => Math.min(f + 1, dropdownOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focused >= 0) {
        onChange(dropdownOptions[focused].value);
        setOpen(false);
        setFocused(-1);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setFocused(-1);
    }
  }

  // Scroll focused item into view
  useEffect(() => {
    if (!open || focused < 0) return;
    const el = listRef.current?.children[focused] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [focused, open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native input so form validation and standard form submit work */}
      <input
        type="hidden"
        name="service"
        value={value}
        required
        aria-required="true"
        id={id}
        {...(aria["aria-invalid"] ? { "aria-invalid": true } : {})}
        {...(aria["aria-describedby"] ? { "aria-describedby": aria["aria-describedby"] } : {})}
      />

      {/* Trigger button */}
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => {
          setOpen((o) => {
            const next = !o;
            if (next) {
              const idx = dropdownOptions.findIndex((opt) => opt.value === value);
              setFocused(idx >= 0 ? idx : 0);
            } else {
              setFocused(-1);
            }
            return next;
          });
        }}
        onKeyDown={onKeyDown}
        className={cn(
          inputBase,
          "flex h-12 cursor-pointer items-center justify-between pr-11 text-left",
          hasError ? "border-danger" : "border-border-strong",
          isPlaceholder ? "text-subtle" : "text-foreground",
          open && "border-accent ring-2 ring-accent/20"
        )}
      >
        <span>{displayLabel}</span>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          aria-label="Select a service"
          onKeyDown={onListKeyDown}
          tabIndex={-1}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-64 overflow-y-auto rounded-xl border border-border bg-background py-1.5 shadow-lg"
        >
          {dropdownOptions.map((option, i) => {
            const isSelected = option.value === value;
            const isFocused = i === focused;
            return (
              <li
                key={option.value || "__placeholder"}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setFocused(i)}
                onMouseLeave={() => setFocused(-1)}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  setFocused(-1);
                }}
                className={cn(
                  "flex cursor-pointer items-center justify-between px-4 py-2.5 text-[0.95rem] select-none transition-colors",
                  isFocused
                    ? "bg-[#2563eb] text-white"
                    : isSelected
                      ? "bg-blue-50 text-[#2563eb] font-medium dark:bg-blue-950/40 dark:text-blue-300"
                      : "text-foreground hover:bg-[#2563eb] hover:text-white"
                )}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isFocused ? "text-white" : "text-[#2563eb] dark:text-blue-300"
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ── Field wrapper ─────────────────────────────────────────── */
interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

function Field({ id, label, optional, error, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-foreground">
        {label}
        {optional ? <span className="text-xs font-normal text-subtle">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ── Main form ─────────────────────────────────────────────── */
export function ContactForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<ContactFormValues>(() => ({
    ...emptyContactValues,
    service: serviceOptionFromId(searchParams.get("service") ?? undefined) ?? "",
  }));
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [delivered, setDelivered] = useState(false);

  /* ── Attachment state ─────────────────────────────────────── */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFileError("");
    if (!file) {
      setAttachedFile(null);
      return;
    }
    // Validate extension
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setFileError(`Unsupported file type ".${ext}". Please attach a ${ALLOWED_EXTENSIONS_LABEL} file.`);
      e.target.value = "";
      setAttachedFile(null);
      return;
    }
    // Validate size
    if (file.size > MAX_FILE_BYTES) {
      setFileError(`File is too large (${formatBytes(file.size)}). Maximum allowed size is 10 MB.`);
      e.target.value = "";
      setAttachedFile(null);
      return;
    }
    setAttachedFile(file);
  }

  function removeAttachment() {
    setAttachedFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value } as ContactFormValues;
    setValues(next);
    if (submitted) setErrors(validateContact(normalize(next)));
    if (status === "error") setStatus("idle");
  }

  function onServiceChange(value: string) {
    const next = { ...values, service: value };
    setValues(next);
    if (submitted) setErrors(validateContact(normalize(next)));
    if (status === "error") setStatus("idle");
  }

  function onBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name as keyof ContactFormValues;
    const fieldError = validateContact(normalize(values))[name];
    setErrors((current) => {
      const next = { ...current };
      if (fieldError) next[name] = fieldError;
      else delete next[name];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const trimmed = normalize(values);
    const found = validateContact(trimmed);
    setSubmitted(true);
    setErrors(found);

    if (hasErrors(found)) {
      setStatus("idle");
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const honeypot = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

      // Build FormData so we can include the optional file attachment
      const fd = new FormData();
      fd.append("fullName", trimmed.fullName);
      fd.append("email", trimmed.email);
      fd.append("phone", trimmed.phone);
      fd.append("company", trimmed.company);
      fd.append("service", trimmed.service);
      fd.append("message", trimmed.message);
      fd.append("website", honeypot);
      if (attachedFile) fd.append("attachment", attachedFile, attachedFile.name);

      const response = await fetch("/api/contact", {
        method: "POST",
        // No Content-Type header — browser sets it with the correct boundary
        body: fd,
      });
      const data = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (response.ok && data?.ok) {
        setDelivered(Boolean(data.delivered));
        setFeedback(data.message);
        setStatus("success");
        return;
      }

      if (data?.errors) setErrors(data.errors);
      setFeedback(data?.message ?? "Something went wrong while sending your inquiry. Please try again.");
      setStatus("error");
    } catch {
      setFeedback("We could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  function reset() {
    setValues({ ...emptyContactValues });
    setErrors({});
    setSubmitted(false);
    setStatus("idle");
    setFeedback("");
    setAttachedFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[26rem] flex-col items-start justify-center gap-5">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CircleCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="text-2xl font-semibold text-foreground">{delivered ? "Message Sent!" : "Message Received!"}</h3>
        <p className="max-w-md text-muted">{feedback || "Thank you for reaching out. We will review your request and get back to you within 24 hours."}</p>
        <Button variant="secondary" onClick={reset}>
          Send another message
        </Button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const invalid = (name: keyof ContactFormValues) => Boolean(errors[name]);
  const fieldProps = (name: keyof ContactFormValues) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    suppressHydrationWarning: true,
    "aria-invalid": invalid(name) || undefined,
    "aria-describedby": invalid(name) ? `contact-${name}-error` : undefined,
    className: cn(inputBase, invalid(name) ? "border-danger" : "border-border-strong"),
  });

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === "submitting"} suppressHydrationWarning className="grid gap-5 sm:grid-cols-2">
      {submitted && errorCount > 0 ? (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger sm:col-span-2">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Please check {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} and try again.
        </p>
      ) : null}

      <Field id="contact-fullName" label="Your Name" error={errors.fullName}>
        <input type="text" autoComplete="name" required aria-required="true" placeholder="Your name" {...fieldProps("fullName")} className={cn(fieldProps("fullName").className, "h-12")} />
      </Field>

      <Field id="contact-email" label="Email Address" error={errors.email}>
        <input type="email" autoComplete="email" inputMode="email" required aria-required="true" placeholder="name@company.com" {...fieldProps("email")} className={cn(fieldProps("email").className, "h-12")} />
      </Field>

      <Field id="contact-phone" label="Phone Number" optional error={errors.phone}>
        <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+1 (555) 000-0000" {...fieldProps("phone")} className={cn(fieldProps("phone").className, "h-12")} />
      </Field>

      <Field id="contact-company" label="Company / Business Name" optional error={errors.company}>
        <input type="text" autoComplete="organization" placeholder="Your business name" {...fieldProps("company")} className={cn(fieldProps("company").className, "h-12")} />
      </Field>

      <Field id="contact-service" label="Service You Need" error={errors.service} className="sm:col-span-2">
        <ServiceSelect
          id="contact-service"
          value={values.service}
          onChange={onServiceChange}
          hasError={invalid("service")}
          aria-invalid={invalid("service") || undefined}
          aria-describedby={invalid("service") ? "contact-service-error" : undefined}
        />
      </Field>

      <Field id="contact-message" label="How Can We Help?" error={errors.message} className="sm:col-span-2">
        <textarea rows={6} required aria-required="true" placeholder="Tell us about your project, what you want to achieve, or any questions you have." {...fieldProps("message")} className={cn(fieldProps("message").className, "resize-y py-3 leading-relaxed")} />
      </Field>

      {/* ── File Attachment ──────────────────────────────────── */}
      <div className="sm:col-span-2">
        {/* Hidden native file input */}
        <input
          ref={fileInputRef}
          id="contact-attachment"
          type="file"
          accept={ACCEPT_ATTR}
          className="sr-only"
          aria-label="Attach a document (optional)"
          onChange={handleFileChange}
          disabled={status === "submitting"}
        />

        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-foreground">
            Attach Document
          </span>
          <span className="text-xs font-normal text-subtle">Optional</span>
        </div>

        {/* Attach button — shown when no file selected */}
        {!attachedFile && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={status === "submitting"}
            className={cn(
              "mt-2 flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-border-strong bg-background px-4 py-3 text-sm text-muted transition-all duration-200",
              "hover:border-accent/50 hover:bg-accent/5 hover:text-accent-text",
              "disabled:cursor-not-allowed disabled:opacity-60"
            )}
          >
            <Paperclip className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Click to attach a file</span>
            <span className="ml-auto text-xs text-subtle">{ALLOWED_EXTENSIONS_LABEL} · Max 10 MB</span>
          </button>
        )}

        {/* Selected file pill — shown once a file is chosen */}
        {attachedFile && (
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
            <Paperclip className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{attachedFile.name}</p>
              <p className="text-xs text-subtle">{formatBytes(attachedFile.size)}</p>
            </div>
            <button
              type="button"
              onClick={removeAttachment}
              disabled={status === "submitting"}
              aria-label="Remove attachment"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-subtle transition-colors hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* File validation error */}
        {fileError && (
          <p className="mt-2 flex items-start gap-1.5 text-sm text-danger">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {fileError}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {status === "error" ? (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger sm:col-span-2">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {feedback}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto sm:min-w-44">
          {status === "submitting" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </Button>
        <p className="text-xs leading-relaxed text-subtle sm:max-w-[16rem]">
          By sending this form you agree to our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-accent-text">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function normalize(values: ContactFormValues): ContactFormValues {
  return {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    company: values.company.trim(),
    service: values.service,
    message: values.message.trim(),
  };
}
