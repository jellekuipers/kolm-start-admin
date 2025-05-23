import type { member, organization, team, user } from "~/db/schema";
import type { auth } from "~/lib/auth";

export type Account = {
  id: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  scopes: string[];
};

export type User = typeof user.$inferSelect;
export type AuthOrganization = typeof organization.$inferSelect;
export type ORMOrganization = typeof auth.$Infer.Organization;
export type SessionUser = typeof auth.$Infer.Session.user;
export type Invitation = {
  organizationName: string;
  organizationSlug: string;
  inviterEmail: string;
  id: string;
  email: string;
  status: InvitationStatus;
  expiresAt: Date;
  organizationId: string;
  role: string;
  inviterId: string;
  teamId?: string | undefined;
};
export type InvitationStatus = "pending" | "accepted" | "rejected" | "canceled";

export type Member = typeof member.$inferSelect;
export type OrganizationMember = {
  id: string;
  organizationId: string;
  role: "member" | "admin" | "owner";
  createdAt: Date;
  userId: string;
  user: {
    email: string;
    name: string;
    image?: string | undefined;
  };
};

export type Team = typeof team.$inferSelect;

export type MemberRole = "admin" | "member" | "owner";
export type Role = "admin" | "user";
