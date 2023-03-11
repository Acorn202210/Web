const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
