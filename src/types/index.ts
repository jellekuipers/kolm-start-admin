import type { user } from "~/db/schema";
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
export type SessionUser = typeof auth.$Infer.Session.user;
export type Role = "admin" | "user";
