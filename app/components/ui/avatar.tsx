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
  base: "flex items-center justify-center bg-indigo-50 text-indigo-700 shrink-0 overflow-hidden",
  variants: {
    size: {
      "8": "size-8 text-sm rounded-sm",
      "10": "size-10 text-base rounded",
      "12": "size-12 text-lg rounded-lg",
      "16": "size-16 text-2xl rounded-lg",
      "20": "size-20 text-3xl rounded-lg",
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
