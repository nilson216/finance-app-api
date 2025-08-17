import js from "@eslint/js";
import globals from "globals";
import standard from "eslint-config-standard";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: [
      js.configs.recommended, // base do ESLint
      standard,               // regras do StandardJS
      prettier                // desativa conflitos entre ESLint e Prettier
    ],
    languageOptions: {
      globals: globals.browser
    }
  }
]);
