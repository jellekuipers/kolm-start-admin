import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { DefaultCatchBoundary } from "@/components/error/default-catch-boundary";
import { Toast } from "@/components/ui/toast";
import { ThemeProvider } from "@/context/theme";
import i18n from "@/lib/i18n";
import { getServerSession } from "@/server/session";
import appCss from "@/styles/app.css?url";

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
      {
        title: "kolm start admin",
        description:
          "A TanStack Start + better-auth admin starter with Prisma ORM, React Aria, Tailwind, i18next.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <DefaultCatchBoundary {...props} />
        </div>
      </RootDocument>
    );
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <RootDocument>
          <Toast />
          <Outlet />
        </RootDocument>
      </ThemeProvider>
    </I18nextProvider>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className={twMerge(
          "flex min-h-screen flex-col text-gray-800 bg-white antialiased",
          "dark:text-white dark:bg-gray-900",
        )}
      >
        {children}
        {import.meta.env.DEV ? (
          <TanStackDevtools
            plugins={[
              {
                name: "TanStack Query",
                render: <ReactQueryDevtoolsPanel />,
              },
              {
                name: "TanStack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}
