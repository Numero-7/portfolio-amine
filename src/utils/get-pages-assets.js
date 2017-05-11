import flattenDeep from 'lodash/flattenDeep'
import isProjectPage from './is-project-page'

const getPagesAssets = pages => (
  flattenDeep(
    pages
      .map(page => (
        isProjectPage(page)
          ? page.data.images.concat([page.data.cover, page.data.intro])
          : page.data.assets
      ))
      .filter(asset => asset) // Removes the falsy values from the array.
  )
)

export default getPagesAssets
