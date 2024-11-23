import { defineConfig } from "vite";
import ts from "rollup-plugin-typescript2";
import path from "path";

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "./.src/index.ts"), // Entry point of your library
            name: "rosana", // Global variable name for UMD
            fileName: (format) => `rosana.${format}.js`, // File name pattern
            formats: ["umd"], // Output format
        },
        outDir: "dist", // Directory for output files
        rollupOptions: {
            external: ["dependency1", "dependency2"], // Mark these dependencies as external
            output: {
                globals: {
                    dependency1: "Dependency1GlobalName", // UMD global for dependency1
                    dependency2: "Dependency2GlobalName", // UMD global for dependency2
                },
            },
        },
        minify: false, // Disable minification
        terserOptions: {
            mangle: false, // Prevent variable name changes
            compress: false, // Disable compression optimizations
        },
    },
    plugins: [
        ts({
            tsconfig: "./tsconfig.json", // Specify tsconfig path
            clean: true, // Clean cache before rebuild
            check: false, // Suppress TypeScript type checking if desired
        }),
    ],
});
