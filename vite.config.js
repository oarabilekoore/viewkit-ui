import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            innerscope: "/build/+mod.js",
        },
    },
});
