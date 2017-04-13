import flatten from './flatten'
import isProjectPage from './is-project-page'

const getPagesAssets = pages => (
  flatten(
    pages
      .map(page => (
        isProjectPage(page)
          ? page.data.images.concat(page.data.thumbnail)
          : page.data.assets
      ))
      .filter(asset => asset) // Removes the falsy values from the array.
  )
)

export default getPagesAssets
