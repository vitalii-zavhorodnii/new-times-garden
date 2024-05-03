import { build } from 'esbuild';
import clean from 'esbuild-plugin-clean';
import copy from 'esbuild-plugin-copy';
import inlineImage from 'esbuild-plugin-inline-image';

let msgPhaser = {
  name: 'msg-phaser',
  setup(build) {
    build.onEnd(() => {
      process.stdout.write(`✨ Done ✨\n`);
    });
  }
};

const builder = async () => {
  await build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['chrome58', 'safari11'],
    outfile: './dist/bundle.min.js',
    plugins: [
      clean({
        patterns: ['./dist/*', './public/bundle.min.js']
      }),
      inlineImage({
        namespace: 'assets'
      }),
      copy({
        assets: [
          { from: './public/index.html', to: './' },
          { from: './public/tonconnect-manifest.json', to: './' },
          { from: './public/favicon.png', to: './' },
          { from: './public/css/*', to: './css/' },
          { from: './public/fonts/*', to: './fonts/' },
          { from: './public/telegram/*', to: './telegram/' },
          { from: './public/assets/**/*', to: './assets/' }
        ]
      }),
      msgPhaser
    ],
    define: {
      'process.env.NODE_ENV': '"production"',
      'process.env.BACKEND_LINK': '"https://newtimesgarden.online/api"',
      'process.env.TON_ADDRESS':
        '"UQC0hk5rQ9QAr6rFz6c_gIdwJ4izVHYOfLh9Vb8g6QEQcRiG"',
      'process.env.MANIFEST_URL':
        '"https://newtimesgarden.online/tonconnect-manifest.json"'
    }
  });
};
builder();
