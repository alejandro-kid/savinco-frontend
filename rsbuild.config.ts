import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
// By default, Rsbuild automatically exposes variables with PUBLIC_ prefix
export default defineConfig({
  plugins: [pluginReact()],
});
