const path = require('path')
const copy = require('copy')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.modifyWebpackConfig = function (config, stage) {
  if (stage !== 'develop-html') {
    config._config.resolve.alias = { // eslint-disable-line
      // Requiring the server version of react-dom is hardcoded in Gatsby’s developement server. We
      // only want to alias react when building the site for production.
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      // We only use the core of Pixi.js, which reduces bundle size.
      'pixi.js': 'pixi.js/lib/core'
    }
  }

  // if (stage === 'build-javascript') {
  //  config.plugin('webpack-bundle-analyzer', BundleAnalyzerPlugin, [{
  //    openAnalyzer: false,
  //    analyzerMode: 'static',
  //    reportFilename: path.join(__dirname, 'webpack-bundle-analyzer-report.html')
  //  }])
  // }

  // Modify existing loader to ignore css files loaded after the first render
  // that are stored in the /static/ folder (e.g. the base64 css fonts).
  config.removeLoader('css')
  config.loader('css', {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(['css?minimize', 'postcss']),
    exclude: [/\.module\.css$/, /static/]
  })

  // Adds CSS (only those that are in the /static/ folder) to the existing file loader.
  // Put all those files in a /static/ folder on build.
  config.removeLoader('file-loader')
  config.loader('file-loader', {
    test: /static\/.*.(css|ico|eot|otf|webp|ttf)(\?.*)?$/,
    loader: 'file?name=[path][name].[ext]?[hash]'
  })

  config.removeLoader('images')
  config.loader('images', {
    test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
    loaders: [
      'file?name=[path][name].[ext]',
      'image-webpack-loader?{ progressive: true, optimizationLevel: 7, interlaced: false, pngquant: { quality: "65-90", speed: 4 }, mozjpeg: { quality: 65 } }' // eslint-disable-line
    ]
  })

  return config
}

exports.postBuild = function (pages, callback) {
  copy('./CNAME', './public/', callback)
}
