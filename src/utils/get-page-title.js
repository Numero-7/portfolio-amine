import { siteTitle } from '@root/gatsby-config'

const getPageTitle = title => (
  title ? `${siteTitle} | ${title}` : siteTitle
)

export default getPageTitle
