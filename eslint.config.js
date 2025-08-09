import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
    // Base recommended rules from ESLint
    js.configs.recommended,

    {
        ignores: [
            'node_modules',
            'client/.dist',
            'client/dist',
            'build',
            '.vercel'
        ],
    },
    
    // Common settings for all files
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        ignores: [
            "node_modules/",
            ".vercel/",
            "dist/",
            "build/",
            "coverage/",
        ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            eqeqeq: ["error", "always"],
            curly: ["error", "all"],
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
    },

    // Backend (Node.js)
    {
        files: ["server/**/*.{js,ts}"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-console": "off",
            "no-process-exit": "off",
        },
    },

    // Frontend (React)
    {
        files: ["client/**/*.{js,jsx,ts,tsx}"],
        plugins: {
            react,
            "react-hooks": reactHooks,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "react/react-in-jsx-scope": "off"
        },
    },
];
