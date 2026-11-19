import { MARK_ASPECT, MARK_PATH, MARK_VIEWBOX } from "@/lib/brand/mark";

/** The SD monogram. Takes its colour from the surrounding text colour. */
export function LogoMark({ className = "h-8", title }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      style={{ aspectRatio: MARK_ASPECT }}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
    >
      <path fill="currentColor" fillRule="evenodd" d={MARK_PATH} />
    </svg>
  );
}
