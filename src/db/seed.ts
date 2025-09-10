import "dotenv/config";

import { eq } from "drizzle-orm";

import { db } from "~/db";
import { user } from "~/db/schema";
import { auth } from "~/lib/auth";
import { userRoleEnum } from "~/types/enums";

async function main() {
  const adminUser = await auth.api.signUpEmail({
    body: {
      email: "admin@kolm.start",
      name: "Admin",
      password: "password1234",
    },
  });

  await db
    .update(user)
    .set({ role: userRoleEnum.admin })
    .where(eq(user.id, adminUser.user.id));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Done seeding admin user.");
    process.exit(0);
  });
