import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { NotFound } from "~/components/error/not-found";
import { Pending } from "~/components/ui/pending";

import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const queryClient = new QueryClient();

  return routerWithQueryClient(
    createTanStackRouter({
      context: { queryClient },
      defaultNotFoundComponent: () => <NotFound />,
      defaultPendingComponent: () => <Pending />,
      defaultPreload: "intent",
      routeTree,
      scrollRestoration: true,
    }),
    queryClient,
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
