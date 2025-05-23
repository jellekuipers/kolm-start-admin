import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, setResponseStatus } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { member } from "~/db/schema";
import { auth } from "~/lib/auth";
import { db } from "~/db";
import type { MemberRole } from "~/types";

export const addMember = createServerFn({ method: "POST" })
  .validator(
    z.object({
      organizationId: z.string(),
      memberRole: z.string(),
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    await auth.api.addMember({
      headers,
      body: {
        organizationId: data.organizationId,
        role: data.memberRole as MemberRole,
        userId: data.userId,
      },
    });
  });

export const getMembersByUserById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      userId: z.string(),
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

    const members = await db.query.member.findMany({
      where: eq(member.userId, data.userId),
      with: {
        organization: true,
      },
    });

    return members;
  });

export const updateMemberRole = createServerFn({ method: "POST" })
  .validator(
    z.object({
      memberId: z.string(),
      organizationId: z.string(),
      role: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    await auth.api.updateMemberRole({
      headers,
      body: {
        memberId: data.memberId,
        organizationId: data.organizationId,
        role: data.role as MemberRole,
      },
    });
  });

export const membersQueryOptions = ({ userId }: { userId: string }) =>
  queryOptions({
    queryFn: async () => await getMembersByUserById({ data: { userId } }),
    queryKey: ["members", userId],
  });
