import flatten from './flatten'

const getAllPagesAssets = pages => (
  flatten(
    pages
      .map(page => page.data.assets)
      .filter(asset => asset)
  )
)

export default getAllPagesAssets
