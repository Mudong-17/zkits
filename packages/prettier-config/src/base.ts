import type { Config } from "prettier";

const base: Config = {
  plugins: [
    "prettier-plugin-packagejson",
    "prettier-plugin-multiline-arrays",
    "prettier-plugin-organize-imports",
    "prettier-plugin-prisma",
    "prettier-plugin-tailwindcss",
  ],
  printWidth: 120,
  proseWrap: "never",
  singleQuote: true,
  trailingComma: "all",
};

export default base;
