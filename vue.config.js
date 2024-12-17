const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/video-juegos-vue/' // Reemplaza con el nombre de tu repositorio de GitHub
      : '/'
})