import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import betterTailwind from "eslint-plugin-better-tailwindcss";

// The house style in docs/CODE.md, enforced where a rule can do it.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          pathGroups: [{ pattern: "@/**", group: "internal" }],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "never",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "react/function-component-definition": [
        "error",
        { namedComponents: "function-declaration", unnamedComponents: "arrow-function" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "no-nested-ternary": "error",
      // Breathing room: a blank line before a return and after a group of declarations.
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let"], next: "*" },
        { blankLine: "any", prev: ["const", "let"], next: ["const", "let"] },
      ],
    },
  },
  // Tailwind classes in their standard spelling (Tailwind's own canonical list), each written once. Both fix themselves
  // on save and with `npm run lint -- --fix`.
  {
    plugins: { "better-tailwindcss": betterTailwind },
    settings: { "better-tailwindcss": { entryPoint: "src/app/globals.css", rootFontSize: 16 } },
    rules: {
      "better-tailwindcss/enforce-canonical-classes": "error",
      "better-tailwindcss/no-duplicate-classes": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "next-env.d.ts", "docs/**"]),
]);
