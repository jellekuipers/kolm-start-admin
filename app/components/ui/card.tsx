interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">{children}</div>
  );
}
