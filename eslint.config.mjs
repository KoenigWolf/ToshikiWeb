import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // TypeScriptの厳格なルール
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      
      // Reactのルール
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // 一般的なコーディングスタイル
      "prefer-const": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    }
  },
  {
    // splash-cursorコンポーネントの特定のワーニングを無視するルール
    files: ["**/splash-cursor.tsx"],
    rules: {
      "prefer-const": "off", // アニメーションフレームIDなどは後で変更されるためletが必要
      "@typescript-eslint/no-explicit-any": "off", // WebGL関連の型に必要な場合あり
    }
  }
];

export default eslintConfig;
