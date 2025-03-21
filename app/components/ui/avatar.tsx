import { tv } from "tailwind-variants";

interface AvatarProps {
  alt?: string;
  className?: string;
  fallback: string;
  size?: 8 | 10 | 16;
  src: string | undefined;
}

const avatarStyles = tv({
  base: "flex shrink-0 items-center justify-center overflow-hidden bg-indigo-50 text-indigo-700",
  variants: {
    size: {
      8: "size-8 rounded-sm text-sm",
      10: "size-10 rounded text-base",
      16: "size-16 rounded-lg text-2xl",
    },
  },
  defaultVariants: {
    size: 10,
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
