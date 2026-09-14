import { useTransform, type MotionValue } from "framer-motion";

/**
 * Helpers for slicing a story's single 0–1 playhead into per-element windows.
 *
 * Keeping every element on one playhead is what stops the diagram drifting out
 * of step with the numbered list beneath it, and it makes Replay a single
 * `set(0)` rather than a fan-out of timers.
 */

/** Colour roles, resolved through the live theme so all four themes drive them. */
export const ROLE = {
  /** Raw input arriving: a live call, an unqualified list. */
  incoming: "var(--theme-sky)",
  /** The system acting: outreach sent, an appointment booked. */
  action: "var(--theme-primary)",
  /** A person taking over. */
  human: "var(--theme-secondary)",
  /** Confirmed, closed, succeeded. */
  success: "var(--theme-tertiary)",
  /** Inert scaffolding. */
  idle: "rgba(255,255,255,.34)",
} as const;

/** A 0–1 ramp across `[start, end]` of the parent playhead. */
export function useWindow(progress: MotionValue<number>, start: number, end: number) {
  return useTransform(progress, [start, end], [0, 1], { clamp: true });
}

/**
 * A 0–1 ramp that rises, holds, then falls — for anything that should appear
 * and later hand off, like a "live" indicator.
 */
export function usePulse(
  progress: MotionValue<number>,
  start: number,
  peak: number,
  end: number,
) {
  return useTransform(progress, [start, peak, end], [0, 1, 0], { clamp: true });
}

/** Maps a window onto an arbitrary output range. */
export function useRange(
  progress: MotionValue<number>,
  start: number,
  end: number,
  from: number,
  to: number,
) {
  return useTransform(progress, [start, end], [from, to], { clamp: true });
}
