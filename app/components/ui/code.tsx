interface CodeProps {
  children: React.ReactNode;
}

export function Code({ children }: CodeProps) {
  return (
    <code className="bg-slate-100 rounded px-2 py-1 text-sm inline-flex">
      {children}
    </code>
  );
}
