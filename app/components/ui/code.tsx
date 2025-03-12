interface CodeProps {
  children: React.ReactNode;
}

export function Code({ children }: CodeProps) {
  return (
    <code className="bg-gray-200 rounded px-2 py-1">{children}</code>
  );
}
