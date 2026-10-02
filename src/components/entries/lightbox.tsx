"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { fill } from "@/lib/i18n";

/** One viewer per page; a trigger opens it with this event, carrying the image's index. */
export const LIGHTBOX_OPEN_EVENT = "lightbox:open";

const SWIPE_PX = 48;

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

export function Lightbox({ images, title, labels }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const total = images.length;
  const image = index === null ? null : images[index];

  function go(step: number) {
    setIndex((current) => (current === null ? current : (current + step + total) % total));
  }

  function close() {
    setIndex(null);
  }

  useEffect(() => {
    const open = (event: Event) => setIndex((event as CustomEvent<number>).detail);

    window.addEventListener(LIGHTBOX_OPEN_EVENT, open);

    return () => window.removeEventListener(LIGHTBOX_OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    const dialog = ref.current;

    if (!dialog) return;

    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  return (
    <dialog
      ref={ref}
      className="bg-paper text-ink backdrop:bg-paper fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 p-0"
      aria-label={labels.dialog}
      onClose={close}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      {image && index !== null && (
        <div className="grid h-full animate-[fade_0.3s_ease_both] grid-rows-[auto_minmax(0,1fr)_auto]">
          <div className="wrap border-line flex h-(--header-h) items-center justify-between gap-4 border-b">
            <p className="flex items-baseline gap-4 text-[15px] font-medium">
              <span>{title}</span>
              <span className="an text-ink-3" aria-live="polite">
                {fill(labels.counter, { n: index + 1, total })}
              </span>
            </p>
            <IconButton icon="x" label={labels.close} onClick={close} autoFocus />
          </div>

          <div
            className="grid min-h-0 place-items-center px-(--gutter) py-6"
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
            <div className="relative size-full max-w-[90rem]">
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>

          {total > 1 && (
            <div className="wrap border-line flex h-(--header-h) items-center justify-between border-t">
              <IconButton icon="left" label={labels.previous} onClick={() => go(-1)} />
              <IconButton icon="right" label={labels.next} onClick={() => go(1)} />
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
