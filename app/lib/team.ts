import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, setResponseStatus } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { team } from "~/db/schema";
import { auth } from "~/lib/auth";
import { db } from "~/db";

export const createTeam = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string(),
      organizationId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    const team = await auth.api.createTeam({
      headers,
      body: {
        name: data.name,
        organizationId: data.organizationId,
      },
    });

    return team;
  });

export const listTeams = createServerFn({ method: "GET" })
  .validator(
    z.object({
      organizationId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    const session = await auth.api.getSession({
      headers,
      query: {
        disableCookieCache: true,
      },
    });

    if (!session) {
      setResponseStatus(401);

      throw new Error("UNAUTHORIZED");
    }

    const teams = await db.query.team.findMany({
      where: eq(team.organizationId, data.organizationId),
    });

    return teams;
  });

export const updateTeam = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().optional(),
      teamId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    const teams = await auth.api.updateTeam({
      headers,
      body: {
        data: {
          name: data.name,
        },
        teamId: data.teamId,
      },
    });

    return teams;
  });

export const removeTeam = createServerFn({ method: "POST" })
  .validator(
    z.object({
      organizationId: z.string(),
      teamId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    await auth.api.removeTeam({
      headers,
      body: {
        organizationId: data.organizationId,
        teamId: data.teamId,
      },
    });
  });

export const teamsQueryOptions = ({
  enabled = true,
  organizationId,
}: {
  enabled?: boolean;
  organizationId: string;
}) =>
  queryOptions({
    enabled,
    queryFn: async () => await listTeams({ data: { organizationId } }),
    queryKey: ["teams", organizationId],
  });
