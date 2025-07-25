import type { Icon } from "@phosphor-icons/react";

import { Card } from "~/components/ui/card";

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
          <div className="text-xs font-medium text-slate-600 uppercase">
            {title}
          </div>
          <Icon className="[svg]:fill-slate-500" size={16} />
        </div>
        <div className="text-2xl font-bold">{count}</div>
      </div>
    </Card>
  );
}
