import { PrismaClient } from "@prisma/client";

import { auth } from "~/lib/auth";

import {
  userRoleEnum,
} from "~/lib/enums";

const db = new PrismaClient();

async function main() {
  await auth.api.createUser({
    body: {
      email: "admin@kolm.start",
      name: "Admin User",
      password: 'password1234',
      role: userRoleEnum.admin,
    },
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
