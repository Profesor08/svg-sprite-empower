import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import tsconfigPaths from "vite-tsconfig-paths";

const skipWarnings = ["MODULE_LEVEL_DIRECTIVE", "INVALID_ANNOTATION"];

// https://vitejs.dev/config/
export default defineConfig((env) => {
  return {
    root: "./",
    plugins: [reactRefresh(), viteSingleFile(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ["./src/ui/style/"],
        },
      },
    },

    build: {
      target: "esnext",
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      cssCodeSplit: false,
      outDir: "./dist",
      minify: env.mode === "production",
      rollupOptions: {
        input: ["./index.html"],

        output: {
          inlineDynamicImports: true,
        },

        onwarn(warning, warn) {
          if (
            warning.code !== undefined &&
            skipWarnings.includes(warning.code)
          ) {
            return;
          }

          warn(warning);
        },
      },
    },
  };
});
