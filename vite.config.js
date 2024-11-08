import { defineConfig } from "vite";

export default defineConfig({
    build: {
        minify: true,
        sourcemap: true,
        lib: {
            entry: "./.src/index.js",
            name: "rosana",
            fileName: (format) => `rosana.${format}.js`,
            formats: ["es", "cjs", "umd"],
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
