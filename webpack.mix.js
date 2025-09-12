const mix = require('laravel-mix');

if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps().webpackConfig({devtool: 'source-map'});
}

mix.setPublicPath('assets/dist')
    .setResourceRoot('/wp-content/themes/farm-26/assets/dist');

mix.js('assets/js/app.js', 'app.js')
    .less('assets/less/styles.less', 'styles.css');