import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userRoleEnum } from "@/lib/enums";
import { logger } from "@/utils/logger";

async function main() {
  await auth.api.createUser({
    body: {
      email: "admin@kolm.start",
      name: "Admin User",
      password: "password1234",
      role: userRoleEnum.admin,
    },
  });
}

main()
  .then(() => db.$disconnect())
  .catch(async (error) => {
    logger({
      level: "error",
      message: "seed_error",
      data: error,
    });

    await db.$disconnect();

    process.exit(1);
  });
