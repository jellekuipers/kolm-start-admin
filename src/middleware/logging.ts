import { createMiddleware } from "@tanstack/react-start";

import { logger } from "@/utils/logger";

export const loggingMiddleware = createMiddleware({ type: "function" })
  .middleware([
    createMiddleware({ type: "function" })
      .client(async ({ next }) => {
        const clientTime = new Date();

        return await next({
          context: {
            clientTime,
          },
          sendContext: {
            clientTime,
          },
        });
      })
      .server(async ({ context, next }) => {
        const serverTime = new Date();

        logger({
          level: "info",
          message: "server_req_res",
          data: {
            serverTime,
            durationToServer:
              serverTime.getTime() - context.clientTime.getTime(),
          },
        });

        return await next({
          sendContext: {
            serverTime,
            durationToServer:
              serverTime.getTime() - context.clientTime.getTime(),
          },
        });
      }),
  ])
  .client(async ({ next }) => {
    const result = await next();

    const now = new Date();

    logger({
      level: "info",
      message: "client_req_res",
      data: {
        duration: result.context.clientTime.getTime() - now.getTime(),
        durationToServer: result.context.durationToServer,
        durationFromServer: now.getTime() - result.context.serverTime.getTime(),
      },
    });

    return result;
  });
