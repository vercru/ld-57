const esbuild = require('esbuild');
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html');

esbuild.build({
    entryPoints: ['src/app.js'],
    bundle: true,
    outdir: 'dist',
    minify: true,
    loader: { '.png': 'dataurl' },
    plugins: [htmlPlugin({
        files: [{
            filename: 'index.html',
            entryPoints: ['src/app.js']
        }]
    })]
}).catch((error) => {
    console.error(error);
    process.exit(1);
});