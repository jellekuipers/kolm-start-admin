import "dotenv/config";

import { faker } from "@faker-js/faker";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { auth } from "~/lib/auth";

import { user as userSchema } from "./schema";

async function main() {
  const users = Array.from({ length: 1500 }, () => ({
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    image: faker.image.avatarGitHub(),
  }));

  for (const user of users) {
    const createdUser = await auth.api.signUpEmail({
      body: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    await db
      .update(userSchema)
      .set({ image: user.image })
      .where(eq(userSchema.id, createdUser.user.id));
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Done seeding dev users");
    process.exit(0);
  });
