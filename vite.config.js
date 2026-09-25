import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/TripDesk_B2B/",
  server: { port: 5173 },
});
