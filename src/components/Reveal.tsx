import { Fragment, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ComponentType, ElementType, ReactNode } from "react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

/**
 * `motion.create` builds a new component type, so calling it during render
 * would give React a different type on every pass and remount the subtree.
 * Cached per tag instead.
 */
type AnyMotionComponent = ComponentType<Record<string, unknown>>;

const motionCache = new Map<ElementType, AnyMotionComponent>();

function motionTag(tag: ElementType) {
  const cached = motionCache.get(tag);
  if (cached) return cached;
  // The cache is keyed by tag, so the props each call site passes are checked
  // at that call site rather than here; a single generic signature covering
  // every intrinsic element is not expressible.
  const created = motion.create(tag as string) as unknown as AnyMotionComponent;
  motionCache.set(tag, created);
  return created;
}

/**
 * Staged entrances for a block of content.
 *
 * The page used to move whole sections — scaling, rotating and fading the
 * container, text included — which is why it read as generic parallax. Nothing
 * a reader is trying to read should shrink or grey out. This instead holds the
 * container still and staggers the *elements* inside it: eyebrow, rule,
 * heading, body, then cards.
 *
 * Everything is driven by variants so a parent `Reveal` can orchestrate any
 * depth of children without each one needing its own viewport observer.
 */

/** Default rhythm between staggered children, in seconds. */
const STAGGER = 0.07;

export const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER, delayChildren: 0.05 } },
};

/** The workhorse: a short rise with a soft focus-in. */
export const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** For small type — the blur is cheap here and reads as a lens settling. */
export const itemSoft: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** A rule or underline that draws itself in from the left. */
export const itemLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Cards dealt like a hand — used by the work grid. */
export const itemCard: Variants = {
  hidden: { opacity: 0, y: 34, rotate: -1.4, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.66, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Small chips that pop rather than glide. */
export const itemChip: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 26 },
  },
};

type RevealProps = {
  children: ReactNode;
  /** Seconds between children. Raise for a slower, more deliberate cascade. */
  stagger?: number;
  /** Seconds before the first child moves. */
  delay?: number;
  /** How much of the block must be visible before it plays. */
  amount?: number;
  /** Replay every time it scrolls into view instead of only the first time. */
  repeat?: boolean;
  className?: string;
  as?: ElementType;
};

/**
 * Wraps a block and plays its `item`-variant descendants in sequence when it
 * scrolls into view.
 */
export function Reveal({
  children,
  stagger = STAGGER,
  delay = 0.05,
  amount = 0.25,
  repeat = false,
  className,
  as: Tag = "div",
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = useMemo(() => motionTag(Tag), [Tag]);

  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  style?: ComponentPropsWithoutRef<"h2">["style"];
  /** Seconds between words. */
  stagger?: number;
  id?: string;
};

/**
 * A heading that wipes up word by word from behind a mask.
 *
 * Words rather than lines: where the text wraps is not knowable at render time,
 * but a per-word mask produces the same effect at any width and needs no
 * measurement pass and no text-splitting dependency.
 *
 * The clip box carries a little bottom padding pulled back by an equal negative
 * margin, so descenders are not sliced off by the mask.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  style,
  stagger = 0.035,
  id,
}: RevealTextProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = useMemo(() => motionTag(Tag), [Tag]);
  const words = useMemo(() => text.split(" "), [text]);

  if (reduced) {
    return (
      <Tag id={id} className={className} style={style}>
        {text}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {words.map((word, index) => (
        // Words repeat within a heading, so the index has to be part of the key.
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: "0%",
                  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* A real space between clip boxes, so words do not glue together. */}
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}

/** A single staggered child. Defaults to the workhorse rise. */
export function RevealItem({
  children,
  variants = item,
  className,
  as: Tag = "div",
  ...rest
}: {
  /** Optional so a `RevealItem` can be a bare decorative rule. */
  children?: ReactNode;
  variants?: Variants;
  className?: string;
  as?: ElementType;
} & Record<string, unknown>) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = useMemo(() => motionTag(Tag), [Tag]);

  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <MotionTag className={className} variants={variants} {...rest}>
      {children}
    </MotionTag>
  );
}
