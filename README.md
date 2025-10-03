<div align="center">
  <a href="https://github.com/jellekuipers/kolm-start">
    <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">kolm start admin</h3>

  <p align="center">
    A TanStack Start + better-auth admin starter with Prisma ORM, React Aria, i18next.
    <br />
    <a href="https://github.com/jellekuipers/kolm-start-admin/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/jellekuipers/kolm-start-admin/issues/new?labels=feature-request">Request Feature</a>
  </p>
</div>

## About The Project

A `@tanstack/react-start` + `better-auth` admin starter, with `prisma`, `react-aria-components`, `i18next`.

- `@tanstack/react-start`
- `better-auth`
- `i18next`
- `prisma`
- `@tanstack/react-form`
- `react-aria-components`
- `biome.js`

Check out <a href="https://github.com/jellekuipers/kolm-start">kolm-start</a>, for a `@tanstack/react-start` starter with `tRPC`, `drizzle-orm`, `better-auth` and `tailwindcss`.

For a version with `@radix-ui/themes`, check out the `radix-themes` branch.

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
4. Create a `.env` with the following values
   ```sh
   DATABASE_URL="file:./dev.db"
   VITE_BASE_URL=http://localhost:3000
   ```
5. Initialize database
   ```sh
   npm run db:push
   ```
6. (optional in development) Seed the database with an admin user
   ```sh
   npm run db:seed
   ```
7. Start the dev server
   ```sh
   npm run dev
   ```

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
- [Prisma ORM](https://www.prisma.io/)
- [better-auth](https://www.better-auth.com/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/index.html)
- [create-t3-app](https://github.com/t3-oss/create-t3-app)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
