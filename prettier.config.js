export default {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/components/(.*)$",
    "^~/db/(.*)$",
    "^~/lib/(.*)$",
    "^~/styles/(.*)$",
    "^~/trpc/(.*)$",
    "^~/utils/(.*)$",
    "^~/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: false,
  tailwindFunctions: ["tv"],
};
