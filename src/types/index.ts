import type { user } from "~/db/schema";

export type Account = {
  id: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  scopes: string[];
};

export type User = typeof user.$inferSelect;
export type Role = "user" | "admin" | ("user" | "admin")[];
