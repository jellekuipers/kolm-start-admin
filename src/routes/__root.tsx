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
    <html dir={direction} lang={locale} suppressHydrationWarning={true}>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col text-slate-800 antialiased">
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
