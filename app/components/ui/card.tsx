interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg">{children}</div>
  );
}
