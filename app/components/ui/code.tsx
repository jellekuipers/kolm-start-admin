interface CodeProps {
  children: React.ReactNode;
}

export function Code({ children }: CodeProps) {
  return (
    <code className="bg-gray-100 rounded px-2 py-1 text-xs inline-flex">
      {children}
    </code>
  );
}
