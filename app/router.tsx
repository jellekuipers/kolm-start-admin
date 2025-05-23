import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import {
  createTRPCClient,
  loggerLink,
  httpBatchStreamLink,
} from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import superjson from "superjson";

import { DefaultCatchBoundary } from "~/components/error/default-catch-boundary";
import { NotFound } from "~/components/error/not-found";
import { Pending } from "~/components/ui/pending";
import { TRPCProvider } from "~/trpc/react";
import type { AppRouter } from "~/trpc/router";
import { getUrl } from "~/utils/get-url";

import { routeTree } from "./routeTree.gen";

const getRequestHeaders = createServerFn({ method: "GET" }).handler(
  async () => {
    const request = getWebRequest()!;
    const headers = new Headers(request.headers);

    return Object.fromEntries(headers);
  },
);

export function createRouter() {
  const queryClient = new QueryClient();

  const trpcClient = createTRPCClient<AppRouter>({
    links: [
      loggerLink({
        enabled: (op) =>
          process.env.NODE_ENV === "development" ||
          (op.direction === "down" && op.result instanceof Error),
      }),
      httpBatchStreamLink({
        transformer: superjson,
        url: getUrl(),
        async headers() {
          return await getRequestHeaders();
        },
      }),
    ],
  });

  const trpc = createTRPCOptionsProxy<AppRouter>({
    client: trpcClient,
    queryClient,
  });

  const router = createTanStackRouter({
    context: { queryClient, trpc },
    routeTree,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    defaultPendingComponent: () => <Pending />,
    defaultPreload: "intent",
    scrollRestoration: true,
    Wrap: (props) => {
      return (
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          {props.children}
        </TRPCProvider>
      );
    },
  });

  return routerWithQueryClient(router, queryClient);
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
