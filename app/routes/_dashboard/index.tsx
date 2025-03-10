import { Container, Flex, Grid, Heading, Separator } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { StatCard } from "~/components/ui/stat-card";
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
