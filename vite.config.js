import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    minify: 'terser',
    treeshake: true,
    rollupoptions: {
      output: {
        manualChunks(id){
          if(id.includes('node_modules')){
            return 'vendor';
        }
      }
    }
  },
}
})
