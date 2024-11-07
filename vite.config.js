import { defineConfig } from "vite";

export default defineConfig({
    build: {
        minify: true,
        sourcemap: true,
        lib: {
            entry: "./.src/index.js",
            name: "reckt",
            fileName: (format) => `reckt.${format}.js`,
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
