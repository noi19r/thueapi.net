import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import obfuscator from 'rollup-plugin-obfuscator'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',

        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'build'
  },

  plugins: [
    vue(),
    {
      ...obfuscator({
        fileOptions: {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.5,
          identifierNamesGenerator: 'hexadecimal',
          rotateStringArray: true,
          shuffleStringArray: true,
          splitStrings: true,
          splitStringsChunkLength: 4,
          stringArray: true,
          stringArrayEncoding: ['base64'],
          stringArrayThreshold: 1,
          stringArrayWrappersCount: 2,
          transformObjectKeys: true
        },
        include: ['**/*.js', '**/*.jsx']
      }),
      apply: 'build',
      enforce: 'post'
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
