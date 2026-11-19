"use client";

import { useEffect, useState } from "react";

/**
 * "Install app" button. Shown only when the browser says the site can be installed
 * (the `beforeinstallprompt` event, available in Chrome, Edge and Android browsers).
 * Safari on iPhone has no such event: people use Share → Add to Home Screen instead.
 */
export default function InstallButton({ className = "" }) {
  const [promptEvent, setPromptEvent] = useState(null);

  useEffect(() => {
    const onPrompt = (event) => {
      event.preventDefault(); // keep the event so the prompt opens only when the visitor asks
      setPromptEvent(event);
    };
    const onInstalled = () => setPromptEvent(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!promptEvent) return null;

  async function install() {
    try {
      await promptEvent.prompt();
    } finally {
      setPromptEvent(null); // an event can be used only once
    }
  }

  return (
    <button type="button" onClick={install} className={`rounded-lg border border-white/30 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 ${className}`}>
      Install app
    </button>
  );
}
