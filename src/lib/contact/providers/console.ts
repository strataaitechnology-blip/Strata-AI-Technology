import type { ContactProvider } from "../types";

/**
 * Development-only provider: prints the inquiry to the server console.
 * It reports `delivered: false` so the UI can state that no email was sent.
 */
export const consoleProvider: ContactProvider = {
  name: "console",
  async send(payload) {
    console.info("[contact:console] New inquiry (NOT emailed)\n", payload);
    return { ok: true, delivered: false };
  },
};
