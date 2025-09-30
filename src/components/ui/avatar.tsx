import { twMerge } from "tailwind-merge";

interface AvatarProps {
  alt?: string;
  className?: string;
  fallback: string;
  size?: 8 | 10 | 16;
  src?: string;
}

export function Avatar({
  alt,
  fallback,
  size = 10,
  src,
  className,
}: AvatarProps) {
  return (
    <div
      className={twMerge(
        "flex shrink-0 items-center justify-center overflow-hidden bg-indigo-50 text-indigo-700",
        size === 8 && "size-8 rounded-sm text-sm",
        size === 10 && "size-10 rounded text-base",
        size === 16 && "size-16 rounded-lg text-2xl",
        className,
      )}
    >
      {src ? (
        <img alt={alt} src={src} />
      ) : (
        <span className="font-medium">{fallback}</span>
      )}
    </div>
  );
}
