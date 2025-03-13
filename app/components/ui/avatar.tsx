interface AvatarProps {
  alt?: string;
  fallback: string;
  src: string | undefined;
}

export function Avatar({ alt, fallback, src }: AvatarProps) {
  return (
    <div className="rounded flex items-center justify-center size-10 bg-gray-100 shrink-0 overflow-hidden">
      {src ? (
        <img alt={alt ?? ""} src={src} />
      ) : (
        <span className="font-medium">{fallback}</span>
      )}
    </div>
  );
}
