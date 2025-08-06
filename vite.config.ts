import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { imageToWebpPlugin } from "vite-plugin-image-to-webp";

export default defineConfig({
  base: "/portfolio/",
  assetsInclude: ["**/*.hwp"],
  plugins: [
    react(),
    imageToWebpPlugin({
      imageFormats: ["jpg", "jpeg", "png"],
      webpQuality: { quality: 80 },
      destinationFolder: "dist",
    }),

    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  server: {
    open: true,
    port: 3000,
    hmr: {
      overlay: false, // HMR 에러 오버레이 비활성화
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
