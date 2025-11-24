import { tv } from "tailwind-variants";

interface AvatarProps {
  alt: string;
  fallback: string;
  size?: 8 | 10 | 16;
  src?: string;
}

const avatar = tv({
  base: "flex shrink-0 items-center justify-center overflow-hidden bg-accent text-accent-foreground",
  variants: {
    size: {
      8: "size-8 rounded-sm text-sm",
      10: "size-10 rounded text-base",
      16: "size-16 rounded-lg text-2xl",
    },
  },
});

export function Avatar({ alt, fallback, size = 10, src }: AvatarProps) {
  return (
    <div className={avatar({ size })}>
      {src ? (
        <img alt={alt} src={src} />
      ) : (
        <span className="font-medium">{fallback}</span>
      )}
    </div>
  );
}
