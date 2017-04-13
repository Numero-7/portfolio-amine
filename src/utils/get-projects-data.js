import isProjectPage from './is-project-page'

const getProjectsData = pages => (
  pages
    .filter(page => isProjectPage(page))
    .map(page => Object.assign(page.data, { path: page.path }))
    .sort((a, b) => a.order - b.order)
)

export default getProjectsData
