import { twMerge } from "tailwind-merge";

interface AvatarProps {
  alt?: string;
  className?: string;
  fallback: string;
  size?: "8" | "10" | "12" | "16" | "20";
  src: string | undefined;
}

export function Avatar({
  alt,
  className,
  fallback,
  size = "12",
  src,
}: AvatarProps) {
  return (
    <div
      className={twMerge(
        "rounded-lg flex items-center justify-center bg-sky-50 text-sky-950/50 shrink-0 overflow-hidden",
        size === "8" && "size-8 text-sm",
        size === "10" && "size-10 text-base",
        size === "12" && "size-12 text-lg",
        size === "16" && "size-16 text-2xl",
        size === "20" && "size-20 text-3xl",
        className,
      )}
    >
      {src ? (
        <img alt={alt ?? ""} src={src} />
      ) : (
        <span className="font-medium">{fallback}</span>
      )}
    </div>
  );
}
