import { serviceOptions } from "@/data/contact";
import type { ContactFieldErrors, ContactFormValues } from "@/types";

export const emptyContactValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s.-]{7,25}$/;

/** Coerce unknown input (e.g. parsed JSON) into trimmed form values. */
export function normalizeContactValues(input: unknown): ContactFormValues {
  const source = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const read = (key: keyof ContactFormValues) =>
    typeof source[key] === "string" ? (source[key] as string).trim() : "";

  return {
    fullName: read("fullName"),
    email: read("email"),
    phone: read("phone"),
    company: read("company"),
    service: read("service"),
    message: read("message"),
  };
}

/**
 * Validate the contact form. Shared by the browser (instant feedback) and the
 * API route (authoritative check), so both always agree.
 */
export function validateContact(values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!values.fullName) errors.fullName = "Enter your full name.";
  else if (values.fullName.length < 2) errors.fullName = "Your name must be at least 2 characters.";
  else if (values.fullName.length > 100) errors.fullName = "Your name must be 100 characters or fewer.";

  if (!values.email) errors.email = "Enter your email address.";
  else if (values.email.length > 254 || !EMAIL_PATTERN.test(values.email))
    errors.email = "Enter a valid email address, like name@company.com.";

  if (values.phone && !PHONE_PATTERN.test(values.phone))
    errors.phone = "Use digits, spaces and + ( ) - . only, between 7 and 25 characters.";

  if (values.company.length > 120) errors.company = "Company must be 120 characters or fewer.";

  if (!values.service) errors.service = "Select the service you need.";
  else if (!serviceOptions.includes(values.service)) errors.service = "Select one of the listed services.";

  if (!values.message) errors.message = "Tell us a little about your project.";
  else if (values.message.length < 10) errors.message = "Your message must be at least 10 characters.";
  else if (values.message.length > 4000) errors.message = "Your message must be 4,000 characters or fewer.";

  return errors;
}

export const hasErrors = (errors: ContactFieldErrors): boolean => Object.keys(errors).length > 0;
