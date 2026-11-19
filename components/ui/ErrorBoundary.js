"use client";

import { Component } from "react";

/**
 * Wraps interactive calculators so a crash inside one tool shows a friendly message
 * while the rest of the page (explanations, FAQs, navigation) keeps working.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Log only the error: never log user-entered values (they may be financial or health data).
    console.error("Calculator crashed:", error?.message);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className="rounded-xl border border-danger bg-card p-6">
        <p className="font-semibold text-danger">This calculator hit an unexpected problem.</p>
        <p className="mt-2 text-sm text-muted">
          Your numbers were not saved or sent anywhere. Please try again; if it keeps happening, reload the page.
        </p>
        <button
          type="button"
          onClick={() => this.setState({ failed: false })}
          className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:opacity-90"
        >
          Try again
        </button>
      </div>
    );
  }
}
