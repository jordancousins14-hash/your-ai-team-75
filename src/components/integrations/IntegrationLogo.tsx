import { INTEGRATION_REGISTRY } from "./registry";

type Props = {
  /** Key from INTEGRATION_REGISTRY or a display name string */
  slug: string;
  /** Hex color without # — overrides registry default when provided */
  color?: string;
  /** Alt text — defaults to slug */
  name?: string;
  /** Size in pixels (width = height). Defaults to 28. */
  size?: number;
  className?: string;
};

export function IntegrationLogo({ slug, color, name, size = 28, className = "" }: Props) {
  const entry = INTEGRATION_REGISTRY[slug];
  const resolvedColor = color ?? entry?.brandColor ?? "888888";
  const resolvedName  = name  ?? entry?.name      ?? slug;

  return (
    <span className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <img
        src={`https://cdn.simpleicons.org/${slug}/${resolvedColor}`}
        alt={`${resolvedName} logo`}
        width={size}
        height={size}
        loading="lazy"
        className="object-contain"
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.style.display = "none";
          const fb = img.nextElementSibling as HTMLElement | null;
          if (fb) fb.style.display = "flex";
        }}
      />
      {/* Monogram fallback */}
      <span
        aria-hidden
        className="absolute inset-0 hidden items-center justify-center text-[10px] font-bold"
        style={{ color: `#${resolvedColor}` }}
      >
        {resolvedName.charAt(0).toUpperCase()}
      </span>
    </span>
  );
}
