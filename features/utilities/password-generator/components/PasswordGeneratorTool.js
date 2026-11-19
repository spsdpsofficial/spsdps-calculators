"use client";

import { useId, useState } from "react";
import { CopyButton, ErrorText, primaryButton } from "@/components/tools/ui";
import { MAX_LENGTH, MIN_LENGTH, generatePassword, strengthLabel } from "../calculations/calculate";

const TOGGLES = [
  ["upper", "Uppercase letters (A–Z)"],
  ["lower", "Lowercase letters (a–z)"],
  ["digits", "Numbers (0–9)"],
  ["symbols", "Symbols (!@#$…)"],
  ["avoidAmbiguous", "Avoid look-alike characters (I, l, 1, O, 0)"],
];

/** Secure random password generator. The password is created in the browser and is never sent or stored. */
export default function PasswordGeneratorTool() {
  const id = useId();
  const [options, setOptions] = useState({ length: 16, upper: true, lower: true, digits: true, symbols: true, avoidAmbiguous: false });
  const [result, setResult] = useState(null);

  const generate = (next = options) => setResult(generatePassword(next));
  const update = (patch) => {
    const next = { ...options, ...patch };
    setOptions(next);
    if (result) generate(next); // keep the shown password in step with the options
  };

  return (
    <div className="space-y-4" role="group" aria-label="Password generator">
      <div className="rounded-xl border bg-card-alt p-4" aria-live="polite">
        <p className="mb-1 text-sm text-muted">Your password</p>
        <p className="min-h-8 break-all font-mono text-xl text-ink" data-testid="password">
          {result?.password ?? "Press Generate"}
        </p>
        {result?.password && (
          <p className="mt-2 text-sm text-muted">
            Strength: <strong className="text-ink">{strengthLabel(result.entropyBits)}</strong> (about {Math.round(result.entropyBits)} bits)
          </p>
        )}
      </div>
      <ErrorText>{result?.error}</ErrorText>

      <div>
        <label htmlFor={`${id}-len`} className="mb-1 block text-sm font-medium text-ink">Length: {options.length}</label>
        <input
          id={`${id}-len`}
          type="range"
          min={MIN_LENGTH}
          max={MAX_LENGTH}
          value={options.length}
          onChange={(e) => update({ length: Number(e.target.value) })}
          className="w-full accent-[var(--accent)]"
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {TOGGLES.map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={options[key]} onChange={(e) => update({ [key]: e.target.checked })} className="size-4 accent-[var(--accent)]" />
            {label}
          </label>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={primaryButton} onClick={() => generate()}>Generate</button>
        <CopyButton text={result?.password ?? ""} label="Copy password" />
      </div>
    </div>
  );
}
