type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { anlic: "text-base", suite: "text-xs", dot: "size-3" },
  md: { anlic: "text-lg md:text-xl", suite: "text-[10px] md:text-xs", dot: "size-5" },
  lg: { anlic: "text-2xl md:text-3xl", suite: "text-xs md:text-sm", dot: "size-6" },
};

export function BrandMark({ size = "md", showDot = true, className = "" }: BrandMarkProps) {
  const s = sizeMap[size];
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showDot && <div className={`${s.dot} bg-amber shrink-0`} />}
      <span className="flex items-baseline gap-1.5 leading-none">
        <span
          className={`${s.anlic} font-serif italic font-semibold tracking-tight text-foreground`}
          style={{ fontFamily: "var(--font-serif-display)" }}
        >
          Anlic
        </span>
        <span
          className={`${s.suite} font-mono uppercase tracking-[0.25em] text-steel`}
        >
          Suite
        </span>
      </span>
    </div>
  );
}
