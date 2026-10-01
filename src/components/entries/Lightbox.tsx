"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/lib/i18n";

// One viewer per page; any trigger opens it at its image's index.
const OPEN_EVENT = "lightbox:open";
const SWIPE_PX = 48;

type LightboxTriggerProps = {
  index: number;
  label: string;
  children: ReactNode;
};

type LightboxProps = {
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
};

/** Wraps a framed image so it opens the viewer (crop marks show on hover and focus). */
export function LightboxTrigger({ index, label, children }: LightboxTriggerProps) {
  return (
    <button
      type="button"
      className="group lightbox-trigger"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: index }))}
    >
      {children}
    </button>
  );
}

/** The full-screen image viewer: arrows, swipes and the arrow keys move through the images. */
export function Lightbox({ images, title, labels }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const total = images.length;
  const image = index === null ? null : images[index];

  useEffect(() => {
    const open = (event: Event) => setIndex((event as CustomEvent<number>).detail);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  function go(step: number) {
    setIndex((current) => (current === null ? current : (current + step + total) % total));
  }

  function close() {
    setIndex(null);
  }

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={labels.dialog}
      onClose={close}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      {image && index !== null && (
        <div className="lightbox-in">
          <div className="lightbox-top wrap">
            <p className="lightbox-title">
              <span>{title}</span>
              <span className="an text-ink-3" aria-live="polite">
                {fill(labels.counter, { n: index + 1, total })}
              </span>
            </p>
            <button type="button" className="icon-btn" onClick={close} autoFocus>
              <Icon name="x" />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>
          <div
            className="lightbox-stage"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const dx = event.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
              touchStartX.current = null;
            }}
          >
            <div className="lightbox-frame">
              <Image key={image.src} src={image.src} alt={image.alt} fill sizes="100vw" />
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
