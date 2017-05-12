const ExtractTextPlugin = require('extract-text-webpack-plugin')
const copy = require('copy')

exports.modifyWebpackConfig = function (config, stage) {
  // Requiring the server version of React-dom is hardcoded right now
  // in the development server. So we’ll just avoid loading Preact there
  // for now.
  if (stage !== 'develop-html') {
    config._config.resolve.alias = { // eslint-disable-line
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }

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
      'image-webpack-loader?{ progressive: true, optimizationLevel: 7, interlaced: false, pngquant: { quality: "65-90", speed: 4 }, mozjpeg: { quality: 65 } }', // eslint-disable-line
    ],
  })

  return config
}

exports.postBuild = function (pages, callback) {
  copy('./CNAME', './public/', callback)
}
