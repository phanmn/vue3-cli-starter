// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('static', path.resolve(__dirname, 'static'));
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        if (!options) {
          options = {};
        }

        options['transformAssetUrls'] = {
          img: ['src', 'data-src'],
          image: 'xlink:href',
          Lottie: 'poster',
          SvgRender: 'src',
        };

        return options;
      });
  },
};
