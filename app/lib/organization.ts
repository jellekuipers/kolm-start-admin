import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import slugify from "slugify";
import { z } from "zod";

import { auth } from "~/lib/auth";

export const createOrganization = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string(),
      slug: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    const organization = await auth.api.createOrganization({
      headers,
      body: {
        name: data.name,
        slug: data.slug
          ? slugify(data.slug, { lower: true })
          : slugify(data.name, { lower: true }),
      },
    });

    return organization;
  });

export const listOrganizations = createServerFn({ method: "GET" }).handler(
  async () => {
    const { headers } = getWebRequest()!;

    const organizations = await auth.api.listOrganizations({
      headers,
    });

    return organizations;
  },
);

export const getFullOrganization = createServerFn({ method: "GET" })
  .validator(
    z.object({
      organizationId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    const organization = await auth.api.getFullOrganization({
      headers,
      query: {
        organizationId: data.organizationId,
      },
    });

    return organization;
  });

export const updateOrganization = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().optional(),
      organizationId: z.string(),
      logo: z.string().optional(),
      slug: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    const organizations = await auth.api.updateOrganization({
      headers,
      body: {
        data: {
          name: data.name,
          logo: data.logo,
          slug: data.slug
            ? slugify(data.slug)
            : data.name
              ? slugify(data.name)
              : undefined,
        },
        organizationId: data.organizationId,
      },
    });

    return organizations;
  });

export const deleteOrganization = createServerFn({ method: "POST" })
  .validator(
    z.object({
      organizationId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    await auth.api.deleteOrganization({
      headers,
      body: {
        organizationId: data.organizationId,
      },
    });
  });

export const removeMember = createServerFn({ method: "POST" })
  .validator(
    z.object({
      organizationId: z.string(),
      memberIdOrEmail: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()!;

    await auth.api.removeMember({
      headers,
      body: {
        memberIdOrEmail: data.memberIdOrEmail,
        organizationId: data.organizationId,
      },
    });
  });

export const organizationsQueryOptions = () =>
  queryOptions({
    queryKey: ["organizations"],
    queryFn: async () => await listOrganizations(),
  });

export const organizationQueryOptions = ({
  organizationId,
}: {
  organizationId: string;
}) =>
  queryOptions({
    queryFn: async () =>
      await getFullOrganization({ data: { organizationId } }),
    queryKey: ["organizations", organizationId],
  });
