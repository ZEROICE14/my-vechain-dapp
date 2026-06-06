import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: "#e8f5ff" },
          100: { value: "#c3e0ff" },
          200: { value: "#9bcbff" },
          300: { value: "#6eb4ff" },
          400: { value: "#4a9fff" },
          500: { value: "#2d8bff" },
          600: { value: "#1a73e8" },
          700: { value: "#1259c0" },
          800: { value: "#0d4299" },
          900: { value: "#092d70" },
        },
        vechain: {
          teal:  { value: "#00c2cb" },
          green: { value: "#00e676" },
        },
      },
      fonts: {
        heading: { value: "'Space Mono', monospace" },
        body:    { value: "'DM Sans', sans-serif" },
        mono:    { value: "'Space Mono', monospace" },
      },
      radii: {
        card: { value: "16px" },
      },
    },
    semanticTokens: {
      colors: {
        "bg.canvas": {
          value: { base: "#f7fafc", _dark: "#0d1117" },
        },
        "bg.card": {
          value: { base: "#ffffff", _dark: "#161b22" },
        },
        "bg.subtle": {
          value: { base: "#edf2f7", _dark: "#21262d" },
        },
        "border.default": {
          value: { base: "#e2e8f0", _dark: "#30363d" },
        },
        "text.primary": {
          value: { base: "#1a202c", _dark: "#e6edf3" },
        },
        "text.muted": {
          value: { base: "#718096", _dark: "#8b949e" },
        },
        "accent.teal": {
          value: { base: "#00a3ab", _dark: "#00c2cb" },
        },
        "accent.green": {
          value: { base: "#00b85e", _dark: "#00e676" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
