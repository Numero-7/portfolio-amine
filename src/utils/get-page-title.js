import { siteTitle } from '../../gatsby-config'

const getPageTitle = title => (
  title ? `${siteTitle} | ${title}` : siteTitle
)

export default getPageTitle
