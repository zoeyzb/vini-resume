import { motion, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

/**
 * A text label positioned in a diagram's viewBox coordinates, but rendered as
 * HTML rather than as SVG `<text>`.
 *
 * SVG text scales with the viewBox. These cards render anywhere from ~320px on
 * a phone to ~520px on a desktop against a 660-unit viewBox, which meant a
 * 13-unit label arrived on screen at 10px on a laptop and **6.4px on a phone** —
 * far below anything readable. Every label in these diagrams was effectively
 * invisible on mobile.
 *
 * Positioning as a percentage of the frame keeps the label pinned to the same
 * point in the drawing, while the font size stays in real CSS pixels and does
 * not shrink with the card. It also lets long labels wrap, which SVG text
 * cannot do at all.
 *
 * This relies on the frame's aspect ratio matching the viewBox exactly, which
 * `StoryCanvas` guarantees by deriving the container's `aspect-ratio` from the
 * same numbers.
 */

export type Frame = { w: number; h: number };

export function Label({
  frame,
  x,
  y,
  children,
  align = "center",
  opacity,
  className = "",
  width,
}: {
  /** The scene's viewBox dimensions. */
  frame: Frame;
  /** Anchor point, in viewBox units. */
  x: number;
  y: number;
  children: ReactNode;
  /** Which part of the label sits on the anchor. */
  align?: "center" | "start" | "end";
  /** Drives the label's fade, usually the same window as its shape. */
  opacity?: MotionValue<number>;
  className?: string;
  /** Optional max width, in viewBox units, so long labels wrap predictably. */
  width?: number;
}) {
  const translate =
    align === "center" ? "translate(-50%, -50%)" : align === "end" ? "translate(-100%, -50%)" : "translate(0, -50%)";

  return (
    <motion.span
      className={`pointer-events-none absolute block leading-tight ${className}`}
      style={{
        left: `${(x / frame.w) * 100}%`,
        top: `${(y / frame.h) * 100}%`,
        transform: translate,
        maxWidth: width ? `${(width / frame.w) * 100}%` : undefined,
        textAlign: align === "center" ? "center" : align === "end" ? "right" : "left",
        opacity,
      }}
    >
      {children}
    </motion.span>
  );
}
