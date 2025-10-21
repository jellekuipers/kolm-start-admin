import { createIsomorphicFn } from "@tanstack/react-start";

type LogLevel = "debug" | "info" | "warn" | "error";

export const logger = createIsomorphicFn()
  .server((level: LogLevel, message: string, data?: unknown) => {
    const timestamp = new Date().toISOString();

    if (process.env.NODE_ENV === "development") {
      console[level](`[${timestamp}] [${level.toUpperCase()}]`, message, data);
    } else {
      console.log(
        JSON.stringify({
          data,
          environment: process.env.NODE_ENV,
          level,
          message,
          service: "kolm-start-admin",
          timestamp,
        }),
      );
    }
  })
  .client((level: LogLevel, message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      console[level](`[CLIENT] [${level.toUpperCase()}]`, message, data);
    } else {
      // console[level](`[CLIENT] [${level.toUpperCase()}]`, message, data);
    }
  });
