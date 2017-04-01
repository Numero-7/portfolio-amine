const ExtractTextPlugin = require('extract-text-webpack-plugin')

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

  if (stage === 'build-css') {
    config.removeLoader('css')
    config.loader('css', {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(['css?minimize', 'postcss']),
      exclude: [/\.module\.css$/, /static/]
    })

    config.removeLoader('file-loader')
    config.loader('file-loader', {
      test: /static\/.*.(css|ico|eot|otf|webp|ttf)(\?.*)?$/,
      loader: 'file?name=[path][name].[ext]?[hash]'
    })
  }

  return config
}
