"use client";

import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent, ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceOptionFromId, serviceOptions } from "@/data/contact";
import { emptyContactValues, hasErrors, validateContact } from "@/lib/contact/validation";
import type { ContactApiResponse, ContactFieldErrors, ContactFormValues } from "@/types";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full border bg-background px-4 text-[0.95rem] text-foreground transition-colors placeholder:text-subtle hover:border-primary focus-visible:border-accent focus-visible:outline-none";

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

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value } as ContactFormValues;
    setValues(next);
    // Once the visitor has tried to submit, re-validate live so errors clear as they fix them.
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
      // Move focus to the first invalid field.
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const honeypot = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...trimmed, website: honeypot }),
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
  }

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[26rem] flex-col items-start justify-center gap-5">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CircleCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="text-2xl font-semibold text-foreground">{delivered ? "Inquiry sent" : "Inquiry received"}</h3>
        <p className="max-w-md text-muted">{feedback}</p>
        <Button variant="secondary" onClick={reset}>
          Send another inquiry
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
          Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} and try again.
        </p>
      ) : null}

      <Field id="contact-fullName" label="Full Name" error={errors.fullName}>
        <input type="text" autoComplete="name" required aria-required="true" {...fieldProps("fullName")} className={cn(fieldProps("fullName").className, "h-12")} />
      </Field>

      <Field id="contact-email" label="Email" error={errors.email}>
        <input type="email" autoComplete="email" inputMode="email" required aria-required="true" {...fieldProps("email")} className={cn(fieldProps("email").className, "h-12")} />
      </Field>

      <Field id="contact-phone" label="Phone" optional error={errors.phone}>
        <input type="tel" autoComplete="tel" inputMode="tel" {...fieldProps("phone")} className={cn(fieldProps("phone").className, "h-12")} />
      </Field>

      <Field id="contact-company" label="Company" optional error={errors.company}>
        <input type="text" autoComplete="organization" {...fieldProps("company")} className={cn(fieldProps("company").className, "h-12")} />
      </Field>

      <Field id="contact-service" label="Service Required" error={errors.service} className="sm:col-span-2">
        <div className="relative">
          <select required aria-required="true" {...fieldProps("service")} className={cn(fieldProps("service").className, "h-12 appearance-none pr-11", !values.service && "text-subtle")}>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option} className="text-foreground">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
        </div>
      </Field>

      <Field id="contact-message" label="Message" error={errors.message} className="sm:col-span-2">
        <textarea rows={6} required aria-required="true" placeholder="Tell us about your project, goals and timeline." {...fieldProps("message")} className={cn(fieldProps("message").className, "resize-y py-3 leading-relaxed")} />
      </Field>

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
            "Send Inquiry"
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
