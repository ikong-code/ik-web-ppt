import { defineConfig, normalizePath } from "vite"
import react from "@vitejs/plugin-react"
import autoprefixer from "autoprefixer"

import path from "path"

const variablePath = normalizePath(
  path.resolve("./src/assets/style/variable.scss")
)

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~antd": "antd",
    },
  },
  plugins: [react()],
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
  // css 相关的配置
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
      less: {
        javascriptEnabled: true,
      },
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }) as any,
      ],
    },
  },
})
