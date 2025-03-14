import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { StatCard } from "~/components/stats/stat-card";
import { Container } from "~/components/ui/container";
import { Flex } from "~/components/ui/flex";
import { Grid } from "~/components/ui/grid";
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
    <Container size="3">
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="4">
          <Heading>Dashboard</Heading>
          <Separator size="4" />
        </Flex>
        <Grid columns={{ initial: "1", md: "4" }} gap="4">
          <StatCard count={users} title="Users" />
          <StatCard count={organizations} title="Organizations" />
        </Grid>
      </Flex>
    </Container>
  );
}
