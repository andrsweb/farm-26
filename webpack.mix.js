// ESM header to get require, __dirname
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const from = p => path.resolve(__dirname, p);

const mix = require('laravel-mix');

if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps().webpackConfig({devtool: 'source-map'});
}

mix.setPublicPath('assets/dist')
    .setResourceRoot('/wp-content/themes/farm-26/assets/dist');

mix.js(from('assets/js_source/app.js'), 'app.js')
    .less(from('assets/less/styles.less'), 'styles.css')

mix.webpackConfig({
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
    },
});