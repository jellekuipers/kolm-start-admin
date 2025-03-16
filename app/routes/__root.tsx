import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { DefaultCatchBoundary } from "~/components/error/default-catch-boundary";
import { getServerSession } from "~/lib/session";
import appCss from "~/styles/app.css?url";
import { AppRouter } from "~/trpc/router";
import { ReactQueryDevtools, TanStackRouterDevtools } from "~/utils/dev-tools";
import { seo } from "~/utils/seo";

const SHOW_ROUTER_DEVTOOLS = false;
const SHOW_REACT_QUERY_DEVTOOLS = false;

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<AppRouter>;
}>()({
  beforeLoad: async () => {
    const session = await getServerSession();

    return { session };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "kolm start admin",
        description:
          "A TanStack Start + better-auth admin starter with Drizzle ORM, tRPC, React Aria",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen antialiased text-gray-800">
        {children}
        {SHOW_ROUTER_DEVTOOLS ? (
          <TanStackRouterDevtools position="bottom-right" />
        ) : null}
        {SHOW_REACT_QUERY_DEVTOOLS ? (
          <ReactQueryDevtools buttonPosition="bottom-left" />
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}
