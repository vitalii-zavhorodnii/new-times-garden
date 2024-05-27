import inlineImage from 'esbuild-plugin-inline-image';
import esbuildServe from 'esbuild-serve';

esbuildServe(
  {
    logLevel: 'info',
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'public/bundle.min.js',
    plugins: [inlineImage()],
    define: {
      'process.env.NODE_ENV': '"development"',
      'process.env.BACKEND_LINK': '"http://192.168.2.100:4000/api"',
      'process.env.TON_ADDRESS':
        '"UQC0hk5rQ9QAr6rFz6c_gIdwJ4izVHYOfLh9Vb8g6QEQcRiG"',
      'process.env.MANIFEST_URL':
        '"https://newtimesgarden.online/tonconnect-manifest.json"',
      'process.env.DEFAULT_ID': '"410027537"'
    }
  },
  { root: 'public', port: 8080 }
);
