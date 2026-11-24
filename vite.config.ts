import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const proxyTarget = env.VITE_API_PROXY_TARGET;

  return {
    plugins: [react()],
    server: {
      port: 5173,
      // 개발 중 /api 요청을 백엔드 서버로 넘겨줍니다 (CORS 설정 없이 개발 가능)
      proxy: proxyTarget
        ? { "/api": { target: proxyTarget, changeOrigin: true } }
        : undefined,
    },
  };
});
