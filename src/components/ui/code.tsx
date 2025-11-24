interface CodeProps {
  children: React.ReactNode;
}

export function Code({ children }: CodeProps) {
  return (
    <code className="inline-flex rounded bg-muted px-2 py-1 text-xs">
      {children}
    </code>
  );
}
