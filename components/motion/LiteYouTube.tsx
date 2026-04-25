"use client";

import { useState } from "react";

type Props = {
  /** YouTube video ID. */
  id: string;
  /** Accessible title for the video. */
  title: string;
  /** Optional Tailwind class on the wrapper. */
  className?: string;
};

/**
 * Lite YouTube embed — shows a thumbnail facade until the user clicks play.
 * Saves ~600KB of iframe + tracking until the play action.
 *
 * Strategy:
 * 1. Render a YouTube hi-res thumbnail with a play button overlay.
 * 2. On click, swap to the real iframe (autoplay=1).
 */
export default function LiteYouTube({ id, title, className = "" }: Props) {
  const [active, setActive] = useState(false);

  // Use the high-res thumbnail; YouTube serves multiple sizes
  const thumb = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const fallbackThumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  if (active) {
    return (
      <div className={`lite-yt ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className={`lite-yt ${className} group`}
      aria-label={`Play: ${title}`}
    >
      <img
        src={thumb}
        alt=""
        loading="lazy"
        className="lite-yt__thumb"
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement;
          if (t.src !== fallbackThumb) t.src = fallbackThumb;
        }}
      />
      {/* Dim gradient for legibility */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
      />
      {/* Play button */}
      <span aria-hidden="true" className="lite-yt__btn">
        ▶
      </span>
      {/* Title overlay (shown at bottom) */}
      <span className="absolute bottom-0 left-0 right-0 p-4 text-cream text-left text-xs sm:text-sm tracking-wide line-clamp-2 leading-snug">
        {title}
      </span>
    </button>
  );
}
