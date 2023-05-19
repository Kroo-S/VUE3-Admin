import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

//默认path属性
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({

  //设置resolve,alias表示别名，用～指定src路径
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")    // src = ~
    }
  },

  //跨域代理
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },

  plugins: [vue(), WindiCSS()],
})
