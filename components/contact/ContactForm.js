"use client";

import { useState } from "react";
import { CONTACT_TOPICS, buildGmailLink, buildMailto, validateContact } from "@/lib/contact";

const EMPTY = { name: "", email: "", topic: CONTACT_TOPICS[0], page: "", message: "" };
const field =
  "mt-1.5 w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function ContactForm({ email }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [links, setLinks] = useState(null);
  const [copied, setCopied] = useState(false);

  const set = (key) => (event) => {
    setValues((v) => ({ ...v, [key]: event.target.value }));
    setLinks(null);
  };

  function onSubmit(event) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setLinks(null);
      return;
    }
    setLinks({ mailto: buildMailto(values, email), gmail: buildGmailLink(values, email) });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const err = (key) =>
    errors[key] ? (
      <p id={`${key}-err`} className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
        {errors[key]}
      </p>
    ) : null;
  const aria = (key) => ({ "aria-invalid": errors[key] ? true : undefined, "aria-describedby": errors[key] ? `${key}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ink">
          Your name
          <input className={field} value={values.name} onChange={set("name")} autoComplete="name" maxLength={80} {...aria("name")} />
          {err("name")}
        </label>
        <label className="block text-sm font-semibold text-ink">
          Your email
          <input className={field} type="email" value={values.email} onChange={set("email")} autoComplete="email" maxLength={120} {...aria("email")} />
          {err("email")}
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-ink">
        Topic
        <select className={field} value={values.topic} onChange={set("topic")} {...aria("topic")}>
          {CONTACT_TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {err("topic")}
      </label>
      <label className="mt-4 block text-sm font-semibold text-ink">
        Page or tool (optional)
        <input className={field} value={values.page} onChange={set("page")} placeholder="e.g. /finance/emi-calculator/" maxLength={200} />
      </label>
      <label className="mt-4 block text-sm font-semibold text-ink">
        Message
        <textarea className={`${field} min-h-36`} value={values.message} onChange={set("message")} maxLength={3000} {...aria("message")} />
        {err("message")}
      </label>
      <p className="mt-3 text-xs text-muted">
        Please do not include PAN, Aadhaar, bank details or passwords. Nothing is sent by this website: the button prepares an email to {email} that you send yourself.
      </p>
      <button type="submit" className="mt-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        Prepare my email
      </button>

      <div aria-live="polite">
        {links && (
          <div className="mt-5 rounded-xl border border-line bg-page p-4">
            <p className="text-sm font-semibold text-ink">Your message is ready. Choose how to send it:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={links.mailto} className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold !text-white !no-underline">Open in email app</a>
              <a href={links.gmail} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold !text-ink !no-underline">Open in Gmail</a>
              <button type="button" onClick={copyEmail} className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink">
                {copied ? "Copied" : "Copy email address"}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
