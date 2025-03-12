interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <div className="bg-gray-200 rounded px-2 py-1 text-sm inline-flex">
      {children}
    </div>
  );
}
