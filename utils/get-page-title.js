import { config } from 'config'

const getPageTitle = (title) => (
  title ? `${config.siteTitle} | ${title}` : config.siteTitle
)

export default getPageTitle
