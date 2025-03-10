import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";

import { db } from "~/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    autoSignIn: false,
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [
    admin(),
    organization({
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.BETTER_AUTH_URL}/invitations/${data.id}`;

        console.log({
          email: data.email,
          invitedByEmail: data.inviter.user.email,
          invitedByUsername: data.inviter.user.name,
          inviteLink,
          teamName: data.organization.name,
        });
      },
      teams: {
        enabled: true,
      },
    }),
  ],
});
