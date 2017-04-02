import flatten from './flatten'

const getPagesAssets = pages => (
  flatten(
    pages
      .map(page => page.data.assets)
      .filter(asset => asset)
  )
)

export default getPagesAssets
