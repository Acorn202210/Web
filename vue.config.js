const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
