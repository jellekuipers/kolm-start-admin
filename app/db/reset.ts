import { reset } from "drizzle-seed";

import { db } from "~/db";

import * as schema from "./schema";

async function main() {
  await reset(db, schema);

  return;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Done resetting the database.");
    process.exit(0);
  });
