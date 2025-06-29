import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  server: {
    historyApiFallback: true
  },
  build: {
    outDir: "dist"
  }
});
