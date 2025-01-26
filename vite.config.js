import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            innerscope: "/Dist/+innerscope.js", 
        },
    },
});
