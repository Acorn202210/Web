const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: '../Server/ServerProject/src/main/resources/static',
  publicPath: '/project/',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/project/api': {
        target: 'http://localhost:9000',
        ws: true,
        changeOrigin: true
      },
    }
  }
})