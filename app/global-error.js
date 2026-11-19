"use client";

// Last-resort boundary: it replaces the root layout, so it carries its own minimal styles.
export default function GlobalError({ reset }) {
  return (
    <html lang="en-IN">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "4rem 1rem", textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <p>The site hit an unexpected problem. Please try again.</p>
        <button
          type="button"
          onClick={() => reset()}
          style={{ padding: "0.75rem 1.25rem", fontSize: "1rem", cursor: "pointer" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
