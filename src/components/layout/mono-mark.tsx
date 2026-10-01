/** The TG monogram: a circle with T and G. */
export function MonoMark() {
  return (
    <svg className="mono-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" strokeWidth="2.5" />
      <g fill="none" strokeWidth="4" strokeLinecap="square">
        <path d="M13 22.5h13M19.5 22.5v19" />
        <path d="M47.78 25.89A9.5 9.5 0 1 0 50 32h-8" />
      </g>
    </svg>
  );
}
