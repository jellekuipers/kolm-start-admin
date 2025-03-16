interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className="p-4 border border-gray-200 rounded">{children}</div>;
}
