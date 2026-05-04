import React from "react";

/**
 * Base skeleton block with shimmer animation.
 * Uses a moving gradient overlay for the shimmer effect.
 */
export function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-800/40 ${className}`}
      style={style}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
          animation: "skeleton-shimmer 1.8s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/** Rounded circle skeleton (e.g. avatar) */
export function SkeletonCircle({ size = 40 }: { size?: number }) {
  return (
    <Skeleton
      className="rounded-full shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

/** Multi-line text skeleton */
export function SkeletonText({
  lines = 3,
  gap = 8,
  lastLineWidth = "60%",
}: {
  lines?: number;
  gap?: number;
  lastLineWidth?: string;
}) {
  return (
    <div className="space-y-0" style={{ gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3 rounded"
          style={{
            width: i === lines - 1 ? lastLineWidth : "100%",
            marginTop: i > 0 ? gap : 0,
          }}
        />
      ))}
    </div>
  );
}
