"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the message only; never log user-entered values.
    console.error("Page error:", error?.message);
  }, [error]);

  return (
    <div role="alert" className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-ink">Something went wrong</h1>
      <p className="mt-4 text-muted">
        This page ran into an unexpected problem. Nothing you entered was saved or sent anywhere.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-accent px-5 py-3 font-semibold text-accent-ink hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
