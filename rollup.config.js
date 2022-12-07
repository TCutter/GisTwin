import resolve from "rollup-plugin-node-resolve";
// import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

const packages = require("./package.json");
const ModuleName = "GisTwin";

const builds = [
  {
    input: "src/index.js",
    output: {
      file: `dist/${packages.name}.js`,
      format: "umd",
      name: ModuleName,
    },
    plugins: [resolve()],
  },
  {
    input: "src/index.js",
    output: {
      file: `dist/${packages.name}.min.js`,
      format: "umd",
      name: ModuleName,
    },
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
      }),
      uglify(),
    ],
  },
  {
    input: "src/index.js",
    output: {
      file: `dist/${packages.name}.module.js`,
      format: "esm",
    },
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
      }),
      uglify(),
    ],
  },
];

export default (args) => (args.configTest ? builds[0] : builds);