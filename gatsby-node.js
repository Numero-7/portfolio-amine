const path = require('path')
const copy = require('copy')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const getAliases = () => {
  const aliases = {
    '@root': __dirname, // Alias root for easier access in modules
    'pixi.js': 'pixi.js/lib/core' // We only want to use the core of Pixi.js to reduce bundle size.
  }

  // Setup aliases for all folders in src/
  ;['components', 'layouts', 'pages', 'sass', 'utils', 'values'].forEach(
    (folder) => { aliases[`@${folder}`] = path.join(__dirname, `src/${folder}`) }
  )

  return aliases
}

exports.modifyWebpackConfig = function (data) {
  const { config, stage } = data
  config._config.resolve.alias = getAliases() // eslint-disable-line

  if (stage === 'build-javascript') {
    config.plugin('webpack-bundle-analyzer', BundleAnalyzerPlugin, [{
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, 'webpack-bundle-analyzer-report.html')
    }])
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
      {
        loader: 'image-webpack-loader',
        query: {
          progressive: true,
          optimizationLevel: 7,
          interlaced: false,
          pngquant: { quality: '65-90', speed: 4 },
          mozjpeg: { quality: 65 }
        }
      }
    ]
  })

  return config
}

exports.onPostBuild = function (_, callback) {
  copy('./CNAME', './public/', callback)
}
