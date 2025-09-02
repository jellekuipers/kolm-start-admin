import type { user } from "~/db/schema";

export type User = typeof user.$inferSelect;
export type Account = {
  id: string;
  providerId: string;
  createdAt: Date;
  accountId: string;
};
