import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*", "./*/../*"],
        },
      ],
      // Garante que os imports seguem os aliases e estrutura definida
      "import/no-unresolved": "error",
    },
  }, // Add this line to satisfy the required parameter
});

const eslintConfig = [
  ...compat.extends(
    "eslint:recommended",
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended"
  ),
];

export default eslintConfig;
