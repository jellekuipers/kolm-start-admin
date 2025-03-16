interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="p-4 border border-slate-200 rounded-lg">{children}</div>
  );
}
