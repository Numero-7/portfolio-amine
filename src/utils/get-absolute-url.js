import { siteURL } from '@root/gatsby-config'

const getAbsoluteURL = path => (
  siteURL + path
)

export default getAbsoluteURL
