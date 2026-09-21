import type { ContactProvider } from "../types";

/**
 * Default provider. It does NOT send anything and says so, so the website never
 * claims that an inquiry was delivered when no email service is connected.
 */
export const noneProvider: ContactProvider = {
  name: "none",
  async send() {
    return {
      ok: false,
      code: "not_configured",
      message:
        "The contact form is not connected to an email service yet. Please use the contact details on this page instead.",
    };
  },
};
