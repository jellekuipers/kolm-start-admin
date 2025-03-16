import { Icon } from "@phosphor-icons/react";

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
          <div className="text-slate-600 font-medium uppercase text-sm">
            {title}
          </div>
          <Icon className="[svg]:fill-slate-500" size={18} />
        </div>
        <div className="font-bold text-2xl">{count}</div>
      </div>
    </Card>
  );
}
