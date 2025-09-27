import { z } from "zod";

export const userRole = z.enum(["admin", "user"]);
export type UserRole = z.infer<typeof userRole>;
export const userRoleEnum = userRole.enum;
