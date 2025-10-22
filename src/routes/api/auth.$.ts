import { createFileRoute } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";

import { auth } from "@/lib/auth";

const handler = createServerOnlyFn(({ request }: { request: Request }) => {
  return auth.handler(request);
});

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
    },
  },
});
