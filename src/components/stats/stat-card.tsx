import type { Icon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

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
          <div
            className={twMerge(
              "text-xs font-medium text-gray-600 uppercase",
              "dark:text-gray-300",
            )}
          >
            {title}
          </div>
          <Icon
            className={twMerge(
              "[svg]:fill-gray-500",
              "dark:[svg]:fill-gray-400",
            )}
            size={16}
          />
        </div>
        <div className="text-2xl font-bold">{count}</div>
      </div>
    </Card>
  );
}
