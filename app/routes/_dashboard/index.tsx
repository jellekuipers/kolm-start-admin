import {
  Network as NetworkIcon,
  Users as UsersIcon,
} from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Container } from "~/components/layout/container";
import { StatCard } from "~/components/stats/stat-card";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { useTRPC } from "~/trpc/react";

export const Route = createFileRoute("/_dashboard/")({
  component: RouteComponent,
  loader: async ({ context }) =>
    await context.queryClient.prefetchQuery(
      context.trpc.stats.getStats.queryOptions(),
    ),
});

function RouteComponent() {
  const trpc = useTRPC();
  const {
    data: { organizations, users },
  } = useSuspenseQuery(trpc.stats.getStats.queryOptions());

  return (
    <Container>
      <div className="space-y-8">
        <div className="space-y-4">
          <Heading level={1}>Dashboard</Heading>
          <Separator />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard count={users} icon={UsersIcon} title="Users" />
          <StatCard
            count={organizations}
            icon={NetworkIcon}
            title="Organizations"
          />
        </div>
      </div>
    </Container>
  );
}
