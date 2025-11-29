"use client";

import Image from 'next/image';
import { useId, useState } from 'react';

type ZoomableImageProps = {
  src: string;
  alt: string;
  maxZoom?: number;
  minZoom?: number;
  initialZoom?: number;
  priority?: boolean;
};

export default function ZoomableImage({
  src,
  alt,
  maxZoom = 5,
  minZoom = 1,
  initialZoom = 1.2,
  priority = false,
}: ZoomableImageProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const sliderId = useId();

  const clampedZoom = Math.min(Math.max(zoom, minZoom), maxZoom);

  return (
    <div className="space-y-3">
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="group block rounded-2xl border border-white/10 bg-slate-950/40 p-2 transition hover:border-white/40"
        title="Open full diagram in a new tab"
      >
        <span className="sr-only">Open {alt} in a new tab</span>
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900/60 lg:h-96">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-contain transition-transform duration-300 ease-out"
            style={{ transform: `scale(${clampedZoom})` }}
            priority={priority}
          />
        </div>
      </a>
      <label htmlFor={sliderId} className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
        Zoom control
        <input
          id={sliderId}
          type="range"
          min={minZoom}
          max={maxZoom}
          step={0.1}
          value={clampedZoom}
          onChange={(event) => setZoom(parseFloat(event.target.value))}
          className="flex-1 accent-cyan-400"
        />
        <span className="text-sm font-semibold text-white">{Math.round(clampedZoom * 100)}%</span>
      </label>
    </div>
  );
}
