import "dotenv/config";
import { env, type PrismaConfig } from "prisma/config";

export default {
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  schema: "prisma/schema.prisma",
} satisfies PrismaConfig;
