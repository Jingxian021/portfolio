import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 相对基址：放在 username.github.io 根目录或任意子目录都能直接运行
export default defineConfig({
  base: './',
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.PNG', '**/*.WEBP'],
  plugins: [react()],
  build: {
    assetsInlineLimit: 0
  }
})
