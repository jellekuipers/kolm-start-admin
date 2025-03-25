<div align="center">
  <a href="https://github.com/jellekuipers/kolm-start">
    <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">kolm start admin</h3>

  <p align="center">
    A TanStack Start + better-auth admin starter with Drizzle ORM, tRPC, React Aria.
    <br />
    <a href="https://github.com/jellekuipers/kolm-start-admin/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/jellekuipers/kolm-start-admin/issues/new?labels=feature-request">Request Feature</a>
  </p>
</div>

## About The Project

A `@tanstack/react-start` + `better-auth` admin starter, with `drizzle-orm`, `tRPC`, `react-aria-components`.

This project is built with the `better-auth` framework, using its admin and organizations plugins as a starting point for user, organization, team and invitation management. While being fairly complete, it provides basic building blocks that can be customized to fit different needs.

This setup is built for flexibility, allowing you to use it as an admin starter for an app or extend it into a multi-tenancy user management system, depending on your needs.

I've kept this as minimal and unopinionated as possible, relying primarily on the built-in functionalities provided by the following packages:

- `@tanstack/react-start`
- `better-auth`
- `drizzle-orm`
- `tRPC`
- `@tanstack/react-form`
- `react-aria-components`

Check out <a href="https://github.com/jellekuipers/kolm-start">kolm-start</a>, for a `@tanstack/react-start` starter with `tRPC`, `drizzle-orm`, `better-auth` and `tailwindcss`.

For a version with `@radix-ui/themes`, check out the `radix-themes` branch.

Check out the `user-management-only` branch for a version without the `better-auth` organization plugin implemented.

## Getting Started

### Prerequisites

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo, or use the template
   ```sh
   git clone https://github.com/jellekuipers/kolm-start-admin.git
   ```
2. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Connect to your database in your `.env`
   ```sh
   DATABASE_URL=
   BETTER_AUTH_URL=
   ```
5. Initialize database

   ```sh
   npm run db:push
   ```

6. (optional in development) Seed the database with an admin user

   ```sh
   npm run db:seed
   ```

7. (optional in development) Seed the database with fake users

   ```sh
   npm run db:seed:dev
   ```

8. Start the dev server
   ```sh
   npm run dev
   ```

### Roles & permissions

To demonstrate role-based authentication, only users with the admin role (not the regular user role) can sign in. If you want to allow regular users to access the dashboard, you’ll need to make the following adjustments:

- In `app/routes/_dashboard.tsx` and `app/routes/auth.tsx`, check only for an active session instead of enforcing the admin role.
- In `app/routes/_dashboard/users.index.tsx`, specifically check for the admin role to restrict access to user management.
- In `app/routes/_dashboard/index.tsx`, modify the statistics display by changing the procedure type in `app/trpc/router/stats.ts` to `protectedProcedure`, and remove the user count if it shouldn't be visible to non-admins.

In order to send invitation emails, add your email configuration to `app/lib/auth.ts`. The `sendInvitationEmail` functionality currently only logs the data that is available for sending invitation emails.

See the [open issues](https://github.com/jellekuipers/kolm-start-admin/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [TanStack Start](https://tanstack.com/start/latest)
- [tRPC](https://trpc.io/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [better-auth](https://www.better-auth.com/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/index.html)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
