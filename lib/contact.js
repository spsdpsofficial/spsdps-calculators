import { siteConfig } from "@/lib/constants/site";

export const CONTACT_TOPICS = [
  "Correction or wrong result",
  "Feedback or suggestion",
  "Tool request",
  "Question",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validate the contact form. Returns an object of field → message (empty when valid). */
export function validateContact(values) {
  const errors = {};
  const name = (values.name || "").trim();
  const email = (values.email || "").trim();
  const message = (values.message || "").trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!CONTACT_TOPICS.includes(values.topic)) errors.topic = "Please choose a topic.";
  if (message.length < 10) errors.message = "Please write at least a short message (10 characters).";
  if (message.length > 3000) errors.message = "Please keep the message under 3,000 characters.";
  return errors;
}

/** Plain-text email body from the form values. */
export function buildBody(values) {
  const lines = [
    `Name: ${values.name.trim()}`,
    `Reply to: ${values.email.trim()}`,
    `Topic: ${values.topic}`,
  ];
  if ((values.page || "").trim()) lines.push(`Page: ${values.page.trim()}`);
  lines.push("", values.message.trim());
  return lines.join("\n");
}

export function buildSubject(values) {
  return `[${siteConfig.shortName}] ${values.topic}`;
}

/** mailto: link addressed only to the site contact email. */
export function buildMailto(values, to = siteConfig.contactEmail) {
  return `mailto:${to}?subject=${encodeURIComponent(buildSubject(values))}&body=${encodeURIComponent(buildBody(values))}`;
}

/** Gmail web compose link addressed only to the site contact email. */
export function buildGmailLink(values, to = siteConfig.contactEmail) {
  const q = new URLSearchParams({ view: "cm", fs: "1", to, su: buildSubject(values), body: buildBody(values) });
  return `https://mail.google.com/mail/?${q.toString()}`;
}
