import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import basicSsl from "@vitejs/plugin-basic-ssl";
// https://vitejs.dev/config/

import constants from "./constants";

// basicSsl()

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    port: 8080,
    https: false,
    proxy: {
      "/media": {
        target: constants.server_path,
        changeOrigin: true,
        // secure: falsebasicSsl(,
        // rewrite: (path) => path.replace(/^\/m/, ""),
        // ws: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name) {
            const extension = assetInfo.name.split(".").at(1);
            if (extension === "css") {
              return `assets/${constants.css_file_name}.css`;
            } else return assetInfo.name;
          }
        },
        entryFileNames: `assets/${constants.js_file_name}`,
      },
    },
  },
});
