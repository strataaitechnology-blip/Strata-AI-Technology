import type { ContactPayload, ContactProvider } from "../types";

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export function createWeb3FormsProvider(
  env: NodeJS.ProcessEnv = process.env
): ContactProvider | null {
  const accessKey = env.WEB3FORMS_ACCESS_KEY?.trim();

  if (!accessKey) {
    return null;
  }

  return {
    name: "web3forms",

    async send(payload: ContactPayload) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New Website Inquiry — ${singleLine(payload.service || "General Inquiry")}`,
            from_name: "STRATA Technologies Website",
            name: singleLine(payload.fullName),
            email: singleLine(payload.email),
            phone: payload.phone ? singleLine(payload.phone) : undefined,
            company: payload.company ? singleLine(payload.company) : undefined,
            service: singleLine(payload.service),
            message: payload.message,
          }),
        });

        const data = (await response.json().catch(() => null)) as {
          success?: boolean;
          message?: string;
        } | null;

        if (response.ok && data?.success) {
          return { ok: true, delivered: true };
        }

        console.error("[contact:web3forms] Error from Web3Forms:", data?.message);
        return {
          ok: false,
          code: "provider_error",
          message:
            data?.message ||
            "We could not send your inquiry right now. Please try again in a moment.",
        };
      } catch (error) {
        console.error("[contact:web3forms] Network error:", error);
        return {
          ok: false,
          code: "provider_error",
          message: "Failed to connect to the email service. Please try again in a moment.",
        };
      }
    },
  };
}

