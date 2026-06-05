import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ["@better-auth/kysely-adapter"],
  },
  plugins: [tanstackStart(), tailwindcss(), react()],
});
