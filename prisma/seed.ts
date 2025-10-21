import { PrismaClient } from '@prisma/client';

import { auth } from '@/lib/auth';
import { userRoleEnum } from '@/lib/enums';
import { logger } from '@/utils/logger';

const db = new PrismaClient();

async function main() {
  await auth.api.createUser({
    body: {
      email: 'admin@kolm.start',
      name: 'Admin User',
      password: 'password1234',
      role: userRoleEnum.admin,
    },
  });
}

main()
  .then(() => db.$disconnect())
  .catch(async (error) => {
    logger({
      level: 'error',
      message: 'Seed',
      data: error,
    });

    await db.$disconnect();

    process.exit(1);
  });
