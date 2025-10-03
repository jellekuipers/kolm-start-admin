import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
  },
  client: {
    VITE_BASE_URL: z.url(),
  },
  clientPrefix: "VITE_",
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
  },
  onInvalidAccess: (variable: string) => {
    console.error(
      `Attempted to access a server-side environment variable on the client: ${variable}`,
    );
    throw new Error(
      "Attempted to access a server-side environment variable on the client",
    );
  },
});
