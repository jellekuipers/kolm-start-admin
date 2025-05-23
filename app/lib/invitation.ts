import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, setResponseStatus } from "@tanstack/react-start/server";
import { eq, or } from "drizzle-orm";
import { z } from "zod";

import { invitation } from "~/db/schema";
import { auth } from "~/lib/auth";
import { db } from "~/db";
import type { InvitationStatus, MemberRole } from "~/types";

export const createInvitation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string(),
      organizationId: z.string(),
      role: z.string(),
      teamId: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    await auth.api.createInvitation({
      headers,
      body: {
        email: data.email,
        organizationId: data.organizationId,
        role: data.role as MemberRole,
        teamId: data.teamId,
      },
    });
  });

export const listInvitations = createServerFn({ method: "GET" }).handler(
  async () => {
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

    const invitations = await db.query.invitation.findMany({
      where: or(
        eq(invitation.inviterId, session.user.id),
        eq(invitation.email, session.user.email),
      ),
      with: {
        organization: true,
        user: true,
      },
    });

    return invitations.map((invitation) => ({
      email: invitation.email,
      expiresAt: invitation.expiresAt,
      id: invitation.id,
      inviterEmail: invitation.user.email,
      inviterId: invitation.user.id,
      organizationId: invitation.organizationId,
      organizationName: invitation.organization.name,
      organizationSlug: invitation.organization.slug ?? "",
      role: invitation.role ?? "",
      status: invitation.status as InvitationStatus,
      ...(invitation.teamId
        ? {
            teamId: invitation.teamId,
          }
        : {}),
    }));
  },
);

export const getInvitation = createServerFn({ method: "GET" })
  .validator(
    z.object({
      invitationId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    const invitation = await auth.api.getInvitation({
      headers,
      query: {
        id: data.invitationId,
      },
    });

    return invitation;
  });

export const acceptInvitation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      invitationId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    await auth.api.acceptInvitation({
      headers,
      body: {
        invitationId: data.invitationId,
      },
    });
  });

export const cancelInvitation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      invitationId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    await auth.api.cancelInvitation({
      headers,
      body: {
        invitationId: data.invitationId,
      },
    });
  });

export const rejectInvitation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      invitationId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    await auth.api.rejectInvitation({
      headers,
      body: {
        invitationId: data.invitationId,
      },
    });
  });

export const invitationsQueryOptions = () =>
  queryOptions({
    queryFn: async () => await listInvitations(),
    queryKey: ["invitations"],
  });

export const invitationQueryOptions = ({
  invitationId,
}: {
  invitationId: string;
}) =>
  queryOptions({
    queryFn: async () => await getInvitation({ data: { invitationId } }),
    queryKey: ["invitations", invitationId],
  });
