import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "154.49.137.44", // Set the host to your desired IP
    port: 5173, // Specify the port
    open: true, // Automatically open the browser
  },
});
