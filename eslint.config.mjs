import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(["vendor/**/*", "node_modules/**"]),

  {
    extends: compat.extends("eslint:recommended", "prettier"),
    plugins: {
      prettier,
      vue,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        _: true,
      },
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "vue/require-default-prop": 0,
      "vue/singleline-html-element-content-newline": 0,
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "no-useless-escape": "off",
      "no-unused-vars": [
        "off",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
]);
