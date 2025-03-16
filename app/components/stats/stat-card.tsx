import { Card } from "~/components/ui/card";

interface StatCardProps {
  count: number;
  title: string;
}

export function StatCard({ count, title }: StatCardProps) {
  return (
    <Card>
      <div className="space-y-4">
        <div className="text-gray-600 font-medium uppercase">{title}</div>
        <div className="font-bold text-2xl">{count}</div>
      </div>
    </Card>
  );
}
