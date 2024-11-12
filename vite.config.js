import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    build: {
        minify: false,
        sourcemap: true,
        lib: {
            entry: "./.src/index.ts",
            name: "rosana",
            fileName: (format) => `rosana.${format}.js`,
            formats: ["es", "umd"],
        },

        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
        output: {
            beautify: false,
            comments: "some",
            preserve_annotations: true,
            semicolons: true,
        },
    },
});
