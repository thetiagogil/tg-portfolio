"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { fill } from "@/lib/format";
import { Icon } from "./Icon";

// The full-screen image viewer. One viewer per page; any trigger opens it at its image's index.
const EVENT = "lightbox:open";

/** Wraps a framed image so it opens the viewer (crop marks show on hover and focus). */
export function LightboxTrigger({
  index,
  label,
  children,
}: {
  index: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="group lightbox-trigger"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={() =>
        window.dispatchEvent(new CustomEvent(EVENT, { detail: index }))
      }
    >
      {children}
    </button>
  );
}

export function Lightbox({
  images,
  title,
  labels,
}: {
  /** Image paths inside assets/, with their alt text. */
  images: { src: string; alt: string }[];
  title: string;
  labels: {
    dialog: string;
    close: string;
    previous: string;
    next: string;
    /** A template: "{n} of {total}". */
    counter: string;
  };
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const total = images.length;
  const go = (step: number) =>
    setIndex((i) => (i === null ? i : (i + step + total) % total));

  useEffect(() => {
    const open = (e: Event) => setIndex((e as CustomEvent<number>).detail);
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const current = index === null ? null : images[index];
  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={labels.dialog}
      onClose={() => setIndex(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {current && index !== null && (
        <div className="lightbox-in">
          <div className="lightbox-top wrap">
            <p className="lightbox-title">
              <span>{title}</span>
              <span className="an text-ink-3" aria-live="polite">
                {fill(labels.counter, { n: index + 1, total })}
              </span>
            </p>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setIndex(null)}
              autoFocus
            >
              <Icon name="x" />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>
          <div
            className="lightbox-stage"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIndex(null);
            }}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="lightbox-frame">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
              />
            </div>
          </div>
          {total > 1 && (
            <div className="lightbox-nav wrap">
              <button type="button" className="icon-btn" onClick={() => go(-1)}>
                <Icon name="left" />
                <span className="sr-only">{labels.previous}</span>
              </button>
              <button type="button" className="icon-btn" onClick={() => go(1)}>
                <Icon name="right" />
                <span className="sr-only">{labels.next}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
