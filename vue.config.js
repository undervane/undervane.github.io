var path = require('path');

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/addons/icons')
      }
    }
  }
};