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

  if (!values.fullName) errors.fullName = "Please enter your name.";
  else if (values.fullName.length < 2) errors.fullName = "Your name must be at least 2 characters.";
  else if (values.fullName.length > 100) errors.fullName = "Your name must be 100 characters or fewer.";

  if (!values.email) errors.email = "Please enter your email address.";
  else if (values.email.length > 254 || !EMAIL_PATTERN.test(values.email))
    errors.email = "Please enter a valid email address (e.g. name@company.com).";

  if (values.phone && !PHONE_PATTERN.test(values.phone))
    errors.phone = "Please enter a valid phone number.";

  if (values.company.length > 120) errors.company = "Company name must be 120 characters or fewer.";

  if (!values.service) errors.service = "Please select the service you are interested in.";
  else if (!serviceOptions.includes(values.service)) errors.service = "Please choose one of the listed services.";

  if (!values.message) errors.message = "Please tell us a little about your project or inquiry.";
  else if (values.message.length < 10) errors.message = "Your message must be at least 10 characters.";
  else if (values.message.length > 4000) errors.message = "Your message must be 4,000 characters or fewer.";

  return errors;
}

export const hasErrors = (errors: ContactFieldErrors): boolean => Object.keys(errors).length > 0;
