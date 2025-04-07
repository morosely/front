import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }

  },
  server: {
    proxy: {
      '/api': {//获取路径包含/api的请求
        target: 'http://localhost:8080',//后台服务器所在的源
        channgeOrigin: true,//是否修改源
        rewrite: (path) => path.replace(/^\/api/, '') //'/api'替换成''
      },
      '/images': {//获取路径包含/upload的请求
        target: 'http://localhost:8080',//后台服务器所在的源
        channgeOrigin: true,//是否修改源
        rewrite: (path) => path
      }
    }
  }

})
