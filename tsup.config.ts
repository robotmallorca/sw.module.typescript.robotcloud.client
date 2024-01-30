import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/robotCloudApi.ts", "src/robotCloudClient.ts", "src/helpers/index.ts"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
});