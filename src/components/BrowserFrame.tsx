import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * A minimal "device" frame — browser chrome + a mouse-tracked 3D tilt —
 * used to present real work instead of describing it in prose.
 */
export default function BrowserFrame({
  url,
  href,
  children,
}: {
  url: string;
  href?: string | null;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<CSSProperties>({});

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      transform: `perspective(1200px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) scale(1.015)`,
    });
  }

  function onLeave() {
    setTilt({ transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)" });
  }

  const content = (
    <>
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 truncate rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] tracking-wide text-white/62">
          {url}
        </span>
        {href && (
          <span className="ml-auto shrink-0 text-[10px] font-medium text-transparent transition group-hover:text-[var(--theme-primary)]">
            Visit <FiArrowUpRight className="ml-0.5 inline-block h-3 w-3" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="relative overflow-hidden">{children}</div>
    </>
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)", ...tilt }}
      className="group will-change-transform"
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden rounded-xl border border-white/10 bg-[#0b0912] shadow-[0_40px_90px_-35px_rgba(0,0,0,0.75)] transition-shadow group-hover:shadow-[0_50px_110px_-30px_color-mix(in_srgb,var(--theme-primary)_35%,transparent)]"
        >
          {content}
        </a>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0912] shadow-[0_40px_90px_-35px_rgba(0,0,0,0.75)]">
          {content}
        </div>
      )}
    </div>
  );
}
