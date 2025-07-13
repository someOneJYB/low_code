import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8089',  // 目标后端地址
        changeOrigin: true,               // 解决跨域问题
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },

  plugins: [tsconfigPaths(), react()],

  css: {
    modules: {
      hashPrefix: "prefix",
    },

    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
