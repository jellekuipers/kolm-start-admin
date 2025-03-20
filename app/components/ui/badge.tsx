interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <div className="inline-flex rounded bg-indigo-50 px-2 py-0.5 text-sm font-medium text-indigo-700">
      {children}
    </div>
  );
}
