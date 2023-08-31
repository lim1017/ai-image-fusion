import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// add this to plugins for testing, TODO solution
// "babel-plugin-transform-import-meta"
