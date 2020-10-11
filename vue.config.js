module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
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
