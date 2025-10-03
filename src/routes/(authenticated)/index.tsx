import { UsersIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/container";
import { StatCard } from "@/components/stats/stat-card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getUserCountQueryOptions } from "@/queries/user";

export const Route = createFileRoute("/(authenticated)/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) =>
    await queryClient.ensureQueryData(getUserCountQueryOptions()),
});

function RouteComponent() {
  const { t } = useTranslation();
  const { data: userCount } = useSuspenseQuery(getUserCountQueryOptions());

  return (
    <Container>
      <div className="space-y-8">
        <div className="space-y-4">
          <Heading level={1}>{t("navigation.dashboard")}</Heading>
          <Separator />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            count={userCount}
            icon={UsersIcon}
            title={t("navigation.users")}
          />
        </div>
      </div>
    </Container>
  );
}
