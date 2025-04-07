const { build } = require('esbuild');
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html');


build({
    entryPoints: ['src/app.js'],
    bundle: true,
    outdir: 'dist',
    minify: true,
    loader: { '.png': 'dataurl' },
    plugins: [
        htmlPlugin({
            files: [{
                filename: 'index.html',
                entryPoints: ['src/app.js'],
            }],
        }),
        glsl({ minify: true }),
    ],
}).catch((error) => {
    console.error(error);
    process.exit(1);
});