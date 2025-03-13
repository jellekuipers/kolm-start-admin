interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <div className="bg-gray-100 rounded px-1.5 py-0.5 text-sm inline-flex font-medium">
      {children}
    </div>
  );
}
