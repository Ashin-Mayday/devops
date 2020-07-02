module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 指定生成index.html的路径，相对于（outputDir)。也可以是一个绝对路径
  indexPath: 'index.html',
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/php': {
        target: 'http://10.242.246.247',
        changeOrigin: true, // 跨域
        pathRewrite: { '^/php': '/devops/php' }
      }
    }
  }
}
