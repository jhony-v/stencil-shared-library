import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from '@vitejs/plugin-react';

module.exports = defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "engine",
      fileName: "index",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom/client"],
    },
  },
});
