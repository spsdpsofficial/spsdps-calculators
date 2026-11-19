"use client";

import { useId, useState } from "react";
import { ErrorText, controlClass, primaryButton, secondaryButton } from "@/components/tools/ui";
import { MAX_DICE, MAX_FLIPS, SIDES, flipCoins, rollDice } from "../calculations/calculate";

/** Dice roller and coin flipper using secure random numbers. Runs only when you press a button. */
export default function DiceRollerTool() {
  const id = useId();
  const [mode, setMode] = useState("dice");
  const [count, setCount] = useState("2");
  const [sides, setSides] = useState("6");
  const [result, setResult] = useState(null);

  function roll() {
    const n = Number(count);
    setResult(mode === "dice" ? { type: "dice", ...rollDice({ count: n, sides: Number(sides) }) } : { type: "coin", ...flipCoins({ count: n }) });
  }

  return (
    <div className="space-y-4" role="group" aria-label="Dice roller and coin flip">
      <div role="tablist" aria-label="Mode" className="inline-flex rounded-lg border bg-card p-1">
        {[["dice", "Roll dice"], ["coin", "Flip coin"]].map(([key, label]) => (
          <button key={key} type="button" role="tab" aria-selected={mode === key} onClick={() => { setMode(key); setResult(null); setCount(key === "dice" ? "2" : "1"); }} className={`rounded-md px-4 py-1.5 text-sm font-medium ${mode === key ? "bg-accent text-accent-ink" : "text-ink"}`}>{label}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-count`} className="mb-1 block text-sm font-medium text-ink">{mode === "dice" ? `Number of dice (1–${MAX_DICE})` : `Number of flips (1–${MAX_FLIPS})`}</label>
          <input id={`${id}-count`} inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value)} className={controlClass} />
        </div>
        {mode === "dice" && (
          <div>
            <label htmlFor={`${id}-sides`} className="mb-1 block text-sm font-medium text-ink">Sides on each die</label>
            <select id={`${id}-sides`} value={sides} onChange={(e) => setSides(e.target.value)} className={controlClass}>
              {SIDES.map((s) => <option key={s} value={s}>{`d${s}`}</option>)}
            </select>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={primaryButton} onClick={roll}>{mode === "dice" ? "Roll" : "Flip"}</button>
        <button type="button" className={secondaryButton} onClick={() => setResult(null)} disabled={!result}>Clear</button>
      </div>
      <div aria-live="polite">
        <ErrorText>{result?.error}</ErrorText>
        {result?.type === "dice" && !result.error && (
          <div className="rounded-xl border bg-card-alt p-4">
            <p className="mb-2 text-sm text-muted">Total (possible range {result.min}–{result.max})</p>
            <p className="text-4xl font-semibold text-ink" data-testid="total">{result.total}</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Individual rolls">
              {result.rolls.map((r, i) => <li key={i} className="min-w-10 rounded-lg border bg-card px-3 py-1 text-center font-semibold text-ink">{r}</li>)}
            </ul>
          </div>
        )}
        {result?.type === "coin" && !result.error && (
          <div className="rounded-xl border bg-card-alt p-4">
            <p className="text-sm text-muted">{result.flips.length === 1 ? "Result" : `${result.heads} heads, ${result.tails} tails`}</p>
            <p className="break-words text-2xl font-semibold text-ink" data-testid="flips">{result.flips.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
