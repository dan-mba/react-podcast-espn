import globals from "globals";
import pluginReact from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["build/**/*"],
    extends: [
      js.configs.recommended,
      pluginReact.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax support
        },
      },
    },
    rules: {
    },
  }
);