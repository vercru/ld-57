import * as esbuild from 'esbuild';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import { glsl } from 'esbuild-plugin-glsl-include';

esbuild.build({
    entryPoints: ['src/app.js'],
    bundle: true,
    outdir: 'dist',
    minify: false,
    loader: { '.png': 'dataurl' },
    plugins: [
        htmlPlugin({
            files: [{
                filename: 'index.html',
                entryPoints: ['src/app.js'],
            }],
        }),
        glsl(),
    ],
}).catch((error) => {
    console.error(error);
    process.exit(1);
});