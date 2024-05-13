import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const phasermsg = () => {
  return {
    name: 'phasermsg',
    buildStart() {
      process.stdout.write(`Building for production...\n`);
    },
    buildEnd() {
      const line = '---------------------------------------------------------';
      const msg = `❤️❤️❤️ Tell us about your game! - games@phaser.io ❤️❤️❤️`;
      process.stdout.write(`${line}\n${msg}\n${line}\n`);

      process.stdout.write(`✨ Done ✨\n`);
    }
  };
};

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, '../src/ui').replace(/\\/g, '/'),
      '@assets': path.resolve(__dirname, '../public/assets').replace(/\\/g, '/'),
      '@game': path.resolve(__dirname, '../src/game').replace(/\\/g, '/'),
      '@scenes': path.resolve(__dirname, '../src/game/scenes').replace(/\\/g, '/'),
      '@entities': path.resolve(__dirname, '../src/game/entities').replace(/\\/g, '/'),
      '@services': path.resolve(__dirname, '../src/services').replace(/\\/g, '/'),
      '@queries': path
        .resolve(__dirname, '../src/services/queries')
        .replace(/\\/g, '/'),
      '@models': path.resolve(__dirname, '../src/services/models').replace(/\\/g, '/'),
      '@constants': path.resolve(__dirname, '../src/constants').replace(/\\/g, '/'),
      '@helpers': path.resolve(__dirname, '../src/helpers').replace(/\\/g, '/'),
      '@mappers': path.resolve(__dirname, '../src/mappers').replace(/\\/g, '/'),
      '@interfaces': path.resolve(__dirname, '../src/interfaces').replace(/\\/g, '/')
    }
  },
  plugins: [react(), phasermsg()],
  logLevel: 'info',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2
      },
      mangle: true,
      format: {
        comments: false
      }
    }
  }
});
