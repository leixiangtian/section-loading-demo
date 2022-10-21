module.exports = {
  //标题title
  chainWebpack: config => {
      config.plugin('html').tap(args => {
          args[0].title = 'demo'
          return args
      });
  }
}