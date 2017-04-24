const isProjectPage = page => (
  page.file.dirname === 'projects' && page.file.name !== 'index'
)

export default isProjectPage
