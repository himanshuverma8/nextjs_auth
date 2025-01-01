import { dirname } from "path";
import { fileURLToPath } from "url";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tsEslintParser from "@typescript-eslint/parser";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tsEslintParser,
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
