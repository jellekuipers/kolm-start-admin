import { tv } from "tailwind-variants";

import { focusRing } from "~/utils/classes";

interface AvatarProps {
  alt?: string;
  className?: string;
  fallback: string;
  size?: "8" | "10" | "12" | "16" | "20";
  src: string | undefined;
}

const avatarStyles = tv({
  extend: focusRing,
  base: "flex shrink-0 items-center justify-center overflow-hidden bg-indigo-50 text-indigo-700",
  variants: {
    size: {
      "8": "size-8 rounded-sm text-sm",
      "10": "size-10 rounded text-base",
      "12": "size-12 rounded-lg text-lg",
      "16": "size-16 rounded-lg text-2xl",
      "20": "size-20 rounded-lg text-3xl",
    },
  },
  defaultVariants: {
    size: "12",
  },
});

export function Avatar({ alt, fallback, size, src }: AvatarProps) {
  return (
    <div className={avatarStyles({ size })}>
      {src ? (
        <img alt={alt ?? ""} src={src} />
      ) : (
        <span className="font-medium">{fallback}</span>
      )}
    </div>
  );
}
