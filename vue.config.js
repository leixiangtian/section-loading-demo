module.exports = {
  //标题title
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'section-loading'
      return args
    });
  },
  publicPath: '/section-loading/',
}