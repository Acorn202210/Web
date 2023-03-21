const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: '../Server/ServerProject/src/main/resources/static',
  publicPath: '/project/',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/project/api': {
        target: 'http://34.64.166.55:9000/',
        ws: true,
        changeOrigin: true
      },
    }
  }
})
