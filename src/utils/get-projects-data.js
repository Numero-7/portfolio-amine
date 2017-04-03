const getProjectsData = pages => (
  pages
    .filter(page => page.file.dirname === 'projects')
    .map(page => Object.assign(page.data, { path: page.path }))
)

export default getProjectsData
