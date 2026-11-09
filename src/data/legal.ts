import type { LegalSection } from "@/types";

/**
 * LEGAL DOCUMENT TEMPLATES
 * ------------------------------------------------------------------
 * These are starting templates, not legal advice. Bracketed items such as
 * [Legal entity name] are placeholders. Have a qualified legal professional
 * review and complete both documents before the site goes live.
 */
export const LEGAL_REVIEW_NOTICE =
  "This page is a template that has not yet been reviewed by a legal professional. Bracketed items are placeholders to be completed before publication.";

export const privacySections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      "This Privacy Policy explains how [Legal entity name] (\"STRATA AI Technologies\", \"we\", \"us\") collects, uses and protects personal information when you visit this website or contact us through it.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    paragraphs: [
      "We only collect the information needed to run this website and respond to you.",
    ],
    list: [
      "Information you submit through the contact form: your name, email address, phone number (optional), company (optional), the service you are interested in, and your message.",
      "Your theme preference (light, dark or system), stored in your browser's local storage so the site remembers your choice. It is not sent to us.",
      "Standard technical data that hosting infrastructure may record, such as IP address, browser type and request time, used for security and reliability.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    paragraphs: ["We use the information above to:"],
    list: [
      "Respond to your inquiry and discuss a potential project.",
      "Operate, secure and improve this website.",
      "Meet legal obligations where they apply.",
    ],
  },
  {
    id: "cookies-and-analytics",
    title: "Cookies and analytics",
    paragraphs: [
      "This website does not currently set advertising or tracking cookies. If analytics or similar tools are added in the future, this section will be updated and, where required, your consent will be requested first. [Update this section if analytics are added.]",
    ],
  },
  {
    id: "sharing",
    title: "Sharing your information",
    paragraphs: [
      "We do not sell your personal information. We may share it with service providers who help us operate the website or deliver email (for example, our hosting and email delivery providers), and only as needed for those purposes, or where the law requires it. [List providers once selected.]",
    ],
  },
  {
    id: "retention",
    title: "Retention",
    paragraphs: [
      "We keep inquiry details only for as long as needed to respond to you and to keep reasonable business records. [Specify retention period.]",
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "We take reasonable technical and organizational measures to protect information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    paragraphs: [
      "Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, or to object to certain processing. To make a request, contact us using the details below. [Adapt to applicable laws, e.g. GDPR or CCPA.]",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The date at the top of this page shows when it was last revised.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "Questions about this policy can be sent to [Contact email] or to [Registered address].",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    paragraphs: [
      "By accessing or using this website you agree to these Terms & Conditions. If you do not agree, please do not use the website.",
    ],
  },
  {
    id: "use-of-website",
    title: "Use of the website",
    paragraphs: ["You agree to use this website lawfully and not to:"],
    list: [
      "Attempt to gain unauthorized access to the website, its servers or connected systems.",
      "Interfere with or disrupt the website's operation or security.",
      "Submit false, misleading or unlawful information through the contact form.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "Unless stated otherwise, the content, design, logos and code of this website are owned by or licensed to [Legal entity name] and are protected by applicable intellectual property laws. You may not copy, reproduce or redistribute them without written permission.",
    ],
  },
  {
    id: "services",
    title: "Services and engagements",
    paragraphs: [
      "Information on this website describes our services in general terms and is not an offer. Any project is governed by a separate written agreement that sets out scope, fees, timelines and ownership.",
    ],
  },
  {
    id: "placeholder-content",
    title: "Sample content",
    paragraphs: [
      "Where this website shows sample projects, sample team profiles or sample testimonials, they are clearly marked as placeholders and do not describe real clients, people or results. [Remove this section once all sample content has been replaced.]",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    paragraphs: [
      "This website may link to third-party websites. We do not control them and are not responsible for their content or practices.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    paragraphs: [
      "The website is provided on an \"as is\" and \"as available\" basis. To the fullest extent permitted by law, we make no warranties about its accuracy, availability or fitness for a particular purpose.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, [Legal entity name] is not liable for any indirect or consequential loss arising from your use of this website. Nothing in these terms excludes liability that cannot be excluded by law.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of [Governing jurisdiction], and disputes are subject to the courts of that jurisdiction.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. Continued use of the website after a change means you accept the updated terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: ["Questions about these terms can be sent to [Contact email]."],
  },
];

