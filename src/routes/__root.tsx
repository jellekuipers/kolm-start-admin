import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { I18nProvider, useLocale } from "react-aria-components";

import { DefaultCatchBoundary } from "~/components/error/default-catch-boundary";
import { getServerSession } from "~/server/session";
import appCss from "~/styles/app.css?url";
import { ReactQueryDevtools, TanStackRouterDevtools } from "~/utils/dev-tools";
import { seo } from "~/utils/seo";

const SHOW_ROUTER_DEVTOOLS = false;
const SHOW_REACT_QUERY_DEVTOOLS = false;

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async () => {
    const session = await getServerSession();

    return { auth: session };
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
          "A TanStack Start + better-auth admin starter with Prisma ORM, tRPC, React Aria",
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
    <I18nProvider locale="en-US">
      <RootDocument>
        <Outlet />
      </RootDocument>
    </I18nProvider>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  const { locale, direction } = useLocale();

  return (
    <html suppressHydrationWarning={true} lang={locale} dir={direction}>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col text-slate-800 antialiased">
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
