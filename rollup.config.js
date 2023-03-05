import fs from "fs";
import { defineConfig } from "rollup";
import { rimraf } from "rimraf";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";

const clean = (dir) => {
  return {
    name: "clean",

    buildStart: async () => {
      await rimraf(dir);
    },
  };
};

const html = () => {
  return {
    name: "html",

    closeBundle: async () => {
      const html = fs.readFileSync("./index.html");
      const script = fs.readFileSync("./dist/js/ui.js");

      fs.writeFileSync(
        "dist/index.html",
        `${html}\n<script>\n${script}</script>\n`
      );
    },
  };
};

const config = defineConfig(() => {
  const dir = "dist";

  return {
    input: ["src/plugin/plugin.ts", "src/ui/ui.tsx"],

    output: {
      dir: dir,
      format: "esm",

      entryFileNames: "js/[name].js",
    },

    plugins: [
      clean(dir),
      commonjs(),
      nodeResolve(),
      typescript(),
      html(),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.BUILD),
        preventAssignment: true,
      }),
      terser({
        compress: process.env.BUILD === "production",
      }),
    ],
  };
});

export default config;
