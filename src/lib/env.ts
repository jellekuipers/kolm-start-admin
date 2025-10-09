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
});
