import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import mdPlugin, { Mode } from 'vite-plugin-markdown'

export default defineConfig({
  plugins: [solidPlugin(), mdPlugin({ mode: Mode.MARKDOWN as any })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
