import { defineConfig } from 'vite'
import mdPlugin, { Mode } from 'vite-plugin-markdown'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin(), mdPlugin({ mode: Mode.MARKDOWN as any })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  publicDir: 'public',
})
