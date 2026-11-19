"use client";

import { useEffect } from "react";
import { SW_PATH } from "@/lib/pwa/config";

/**
 * Registers the service worker after the page has loaded. Production builds only, so development hot
 * reloading is never served from a cache. Registration failures are logged, never shown to visitors.
 */
export default function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return undefined;
    const register = () => navigator.serviceWorker.register(SW_PATH, { scope: "/" }).catch((error) => console.warn("Service worker registration failed:", error));
    if (document.readyState === "complete") register();
    else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
    return undefined;
  }, []);
  return null;
}
