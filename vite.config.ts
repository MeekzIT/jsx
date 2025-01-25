import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "46.202.189.245", // Set the host to your desired IP
    port: 5173, // Specify the port
    open: true, // This will open the browser automatically
  },
});
