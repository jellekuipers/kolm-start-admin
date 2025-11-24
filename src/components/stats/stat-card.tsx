import type { Icon } from "@phosphor-icons/react";

import { Card } from "@/components/ui/card";

interface StatCardProps {
  count: number;
  icon: Icon;
  title: string;
}

export function StatCard({ count, icon, title }: StatCardProps) {
  const Icon = icon;

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="font-medium text-muted-foreground text-xs uppercase">
            {title}
          </div>
          <Icon className="[svg]:fill-muted-foreground" size={16} />
        </div>
        <div className="font-bold text-2xl">{count}</div>
      </div>
    </Card>
  );
}
