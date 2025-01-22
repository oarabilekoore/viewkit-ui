import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            droidxl: "/Dist/index.js", // Adjust path based on the actual output location
        },
    },
});
