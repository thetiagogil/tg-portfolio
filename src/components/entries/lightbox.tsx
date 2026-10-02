"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { fill } from "@/lib/i18n";

export const LIGHTBOX_OPEN_EVENT = "lightbox:open";

const SWIPE_PX = 48;

type LightboxProps = {
  images: { src: string; alt: string }[];
  title: string;
  labels: {
    dialog: string;
    close: string;
    previous: string;
    next: string;
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
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-paper p-0 text-ink backdrop:bg-paper"
      aria-label={labels.dialog}
      onClose={close}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      {image && index !== null && (
        <div className="grid h-full animate-[fade_0.3s_ease_both] grid-rows-[auto_minmax(0,1fr)_auto]">
          <div className="wrap flex h-(--header-h) items-center justify-between gap-4 border-b border-line">
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
            <div className="relative size-full max-w-360">
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
            <div className="wrap flex h-(--header-h) items-center justify-between border-t border-line">
              <IconButton icon="left" label={labels.previous} onClick={() => go(-1)} />
              <IconButton icon="right" label={labels.next} onClick={() => go(1)} />
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
